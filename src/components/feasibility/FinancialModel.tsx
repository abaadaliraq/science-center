"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { feasibilityContent } from "@/content/feasibility";
import { calculateFeasibility, financialAssumptions } from "@/lib/feasibility-model";

type Copy = (typeof feasibilityContent)[keyof typeof feasibilityContent];
type TableRow = { label: string; values: ReactNode[]; emphasis?: boolean };
type CashSchedule = ReturnType<typeof calculateFeasibility>["schedule"];

const decimal = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 });
const percent = new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 2 });
const model = calculateFeasibility();

function amount(value: number, formatter = decimal) {
  return <bdi dir="ltr">{formatter.format(value)}</bdi>;
}

function DataTable({ label, columns, rows }: { label: string; columns: string[]; rows: TableRow[] }) {
  return (
    <div className="feasibility-table-scroll" role="region" aria-label={label} tabIndex={0}>
      <table>
        <caption className="sr-only">{label}</caption>
        <thead><tr>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
        <tbody>
          {rows.map(({ label, values, emphasis }) => (
            <tr key={label} className={emphasis ? "feasibility-total" : undefined}>
              <th scope="row">{label}</th>
              {values.map((value, index) => <td key={index}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FinancialCounter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalValue = decimal.format(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;
    let frame = 0;
    const finish = () => {
      cancelAnimationFrame(frame);
      element.textContent = finalValue;
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (preference.matches) return;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 700, 1);
        element.textContent = decimal.format(value * (1 - (1 - progress) ** 3));
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(element);
    preference.addEventListener("change", finish);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", finish);
      finish();
    };
  }, [finalValue, value]);

  return (
    <bdi dir="ltr">
      <span className="sr-only">{finalValue}</span>
      <span ref={ref} aria-hidden="true">{finalValue}</span>
    </bdi>
  );
}

function CashChart({ schedule, copy }: { schedule: CashSchedule; copy: Copy }) {
  const width = 600;
  const height = 180;
  const pad = 8;
  const horizon = schedule.length - 1;
  const values = schedule.map((row) => row.cumulative);
  const low = Math.min(0, ...values);
  const high = Math.max(0, ...values);
  const scale = high - low || 1;
  const x = (year: number) => pad + year / horizon * (width - 2 * pad);
  const y = (value: number) => pad + (high - value) / scale * (height - 2 * pad);
  const points = schedule.map(({ year, cumulative }) => `${x(year)},${y(cumulative)}`).join(" ");
  const ticks = [...new Set([0, Math.round(horizon / 4), Math.round(horizon / 2), Math.round(horizon * 3 / 4), horizon])];

  return (
    <figure className="feasibility-cash-chart">
      <figcaption>{copy.chart} · {copy.currency}</figcaption>
      <div className="feasibility-chart" dir="ltr" aria-hidden="true">
        <div className="feasibility-chart-axis">
          {high !== 0 && <span style={{ top: `${y(high) / height * 100}%` }}>{amount(high)}</span>}
          {(high === 0 || low === 0 || Math.min(high, -low) / scale >= 0.1) && (
            <span style={{ top: `${y(0) / height * 100}%` }}>{amount(0)}</span>
          )}
          {low !== 0 && <span style={{ top: `${y(low) / height * 100}%` }}>{amount(low)}</span>}
        </div>
        <div className="feasibility-chart-plot">
          <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
            <line x1={pad} y1={y(0)} x2={width - pad} y2={y(0)} className="feasibility-chart-zero" />
            <polyline points={points} className="feasibility-chart-line" />
          </svg>
          <div className="feasibility-chart-years">
            {ticks.map((year) => <span key={year} style={{ left: `${x(year) / width * 100}%` }}>{year}</span>)}
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function FinancialModel({ copy }: { copy: Copy }) {
  const usd = (value: number, unit: string = copy.currency) => <span className="feasibility-money">{amount(value)} {unit}</span>;
  const costKeys = Object.keys(financialAssumptions.operatingCosts) as (keyof Copy["costs"])[];
  const summary = [
    { label: copy.investment, value: model.investment, unit: copy.currency, tone: "investment" },
    { label: copy.annualRevenue, value: model.revenue, unit: copy.annualCurrency, tone: "revenue" },
    { label: copy.annualOpex, value: model.operatingExpenses, unit: copy.annualCurrency, tone: "expenses" },
    { label: copy.annualCash, value: model.operatingCash, unit: copy.annualCurrency, tone: "cash" },
    { label: copy.payback, value: model.payback, unit: copy.years, tone: "payback" },
  ];

  return (
    <>
      <section className="feasibility-block feasibility-overview" aria-labelledby="feasibility-overview" data-proposal-reveal>
        <h2 id="feasibility-overview">{copy.overview}</h2>
        <ul className="feasibility-kpis">
          {summary.map(({ label, value, unit, tone }) => (
            <li key={tone} data-tone={tone}>
              <span>{tone === "payback" ? <a href="#feasibility-recovery">{label}</a> : label}</span>
              {value === null ? <strong className="feasibility-no-payback">{copy.noPayback}</strong> : (
                <><strong><FinancialCounter value={value} /></strong><span>{unit}</span></>
              )}
              {tone === "payback" && !model.hasFullFreeCashInputs && <span>{copy.partialPayback}</span>}
            </li>
          ))}
        </ul>
      </section>

      <section className="feasibility-block feasibility-recovery" aria-labelledby="feasibility-recovery" data-proposal-reveal>
        <h2 id="feasibility-recovery">{copy.recoveryTitle}</h2>
        <p className="feasibility-note">{copy.horizon} · {amount(financialAssumptions.studyYears)} {copy.years}</p>
        <CashChart schedule={model.schedule} copy={copy} />
        <details className="feasibility-disclosure">
          <summary>{copy.yearlyTable}</summary>
          <DataTable
            label={copy.yearlyTable}
            columns={[copy.year, copy.operatingCash, copy.capitalOutlay, copy.taxes, copy.otherCash, copy.recoveryCash, copy.cumulative]}
            rows={model.schedule.map(({ year, operating, capitalOutlay, taxes, other, net, cumulative }) => ({
              label: decimal.format(year),
              values: [usd(operating), usd(capitalOutlay), taxes === null ? copy.unknown : usd(taxes), other === null ? copy.unknown : usd(other), usd(net), usd(cumulative)],
              emphasis: year === 0 || year === Math.ceil(model.payback ?? Infinity),
            }))}
          />
        </details>
        <p className="feasibility-note">{copy.recoveryNote}</p>
        <p className="feasibility-note">{copy.freeCashNote}</p>
        {!model.hasFullFreeCashInputs && <p className="feasibility-note">{copy.incompleteCash}</p>}
        <p className="feasibility-note">
          <a className="feasibility-method-link" href="https://openstax.org/books/principles-managerial-accounting/pages/11-2-evaluate-the-payback-and-accounting-rate-of-return-in-capital-investment-decisions">{copy.methodology}</a>
        </p>
      </section>

      <section className="feasibility-block" aria-labelledby="feasibility-capex" data-proposal-reveal>
        <h2 id="feasibility-capex">{copy.capitalTitle}</h2>
        <div className="feasibility-budget">
          <div className="feasibility-budget-bar" aria-hidden="true">
            <span style={{ flexGrow: model.coreCapital }} /><span style={{ flexGrow: model.expansionCapital }} />
          </div>
          <ul className="feasibility-budget-legend">
            <li><span />{copy.core} <strong>{usd(model.coreCapital)}</strong></li>
            <li><span />{copy.expansion} <strong>{usd(model.expansionCapital)}</strong></li>
          </ul>
        </div>
        <DataTable
          label={copy.capitalTitle}
          columns={[copy.line, copy.core, copy.expansion, copy.total]}
          rows={[
            ...model.capital.map(({ key, core, expansion, total }) => ({
              label: copy.capital[key], values: [usd(core), usd(expansion), usd(total)],
            })),
            { label: copy.total, values: [usd(model.coreCapital), usd(model.expansionCapital), usd(model.investment)], emphasis: true },
          ]}
        />
        <p className="feasibility-note">{copy.capitalNote}</p>
      </section>

      <section className="feasibility-block" aria-labelledby="feasibility-payroll" data-proposal-reveal>
        <h2 id="feasibility-payroll">{copy.payroll}</h2>
        <div className="feasibility-facts">
          <div><span>{copy.employees}</span><strong>{amount(model.employees)}</strong></div>
          <div><span>{copy.annualPayroll}</span><strong>{usd(model.annualPayroll)}</strong></div>
        </div>
        <DataTable
          label={copy.payroll}
          columns={[copy.role, copy.employees, copy.monthlySalary, copy.monthlyPayroll, copy.annualPayroll]}
          rows={[
            ...model.staff.map(({ key, employees, monthlySalary, monthly, annual }) => ({
              label: copy.staff[key], values: [amount(employees), usd(monthlySalary), usd(monthly), usd(annual)],
            })),
            { label: copy.total, values: [amount(model.employees), "—", usd(model.monthlyPayroll), usd(model.annualPayroll)], emphasis: true },
          ]}
        />
        <dl className="feasibility-payroll-extras">
          <div><dt>{copy.employerCost} · {amount(financialAssumptions.employerCostRate, percent)} {copy.employerBasis}</dt><dd>{usd(model.employerCost, copy.annualCurrency)}</dd></div>
          <div><dt>{copy.allowances} · {usd(financialAssumptions.monthlyAllowancePerEmployee)} {copy.allowanceBasis}</dt><dd>{usd(model.allowances, copy.annualCurrency)}</dd></div>
        </dl>
        <p className="feasibility-note">{copy.staffingNote}</p>
      </section>

      <section className="feasibility-block" aria-labelledby="feasibility-revenue" data-proposal-reveal>
        <h2 id="feasibility-revenue">{copy.revenueTitle}</h2>
        <div className="feasibility-facts">
          <div><span>{copy.uniqueVisitors}</span><strong>{amount(financialAssumptions.annualUniqueVisitors)}</strong></div>
          <div><span>{copy.paidUses}</span><strong>{amount(model.annualFacilityUses)}</strong></div>
        </div>
        <DataTable
          label={copy.revenueTitle}
          columns={[copy.facility, copy.participation, copy.daily, copy.days, copy.annual, copy.price, copy.facilityRevenue]}
          rows={[
            ...model.facilities.map(({ key, participation, daily, days, annual, price, revenue }) => ({
              label: copy.facilities[key], values: [amount(participation, percent), amount(daily), amount(days), amount(annual), usd(price), usd(revenue)],
            })),
            { label: copy.retail, values: ["—", "—", "—", <>{amount(financialAssumptions.retail.leaseCount)} {copy.leases}</>, <>{usd(financialAssumptions.retail.annualRentPerLease)} {copy.perLease}</>, usd(model.retailRevenue)] },
            { label: copy.spaces, values: ["—", amount(financialAssumptions.spaces.bookingsPerDay), amount(financialAssumptions.spaces.days), amount(model.annualSpaceBookings), usd(financialAssumptions.spaces.price), usd(model.spaceRevenue)] },
            { label: copy.total, values: ["—", "—", "—", "—", "—", usd(model.revenue)], emphasis: true },
          ]}
        />
        <p className="feasibility-note">{copy.facilityNote}</p>
        <p className="feasibility-note">{copy.retailNote}</p>
      </section>

      <section className="feasibility-block" aria-labelledby="feasibility-opex" data-proposal-reveal>
        <h2 id="feasibility-opex">{copy.opexTitle}</h2>
        <DataTable
          label={copy.opexTitle}
          columns={[copy.line, copy.annualCost]}
          rows={[
            { label: copy.staffCost, values: [usd(model.staffCost)] },
            ...costKeys.map((key) => ({ label: copy.costs[key], values: [usd(financialAssumptions.operatingCosts[key])] })),
            { label: copy.total, values: [usd(model.operatingExpenses)], emphasis: true },
          ]}
        />
        <p className="feasibility-note">{copy.opexNote}</p>
      </section>
    </>
  );
}
