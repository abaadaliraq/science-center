/** Planning inputs in USD. None of the operating assumptions are market-validated. */
export const financialAssumptions = {
  studyYears: 20,
  annualUniqueVisitors: 470_000,
  complexOperatingDays: 330,
  capital: {
    construction: [10_500_000, 0],
    planetarium: [7_000_000, 0],
    exhibits: [5_500_000, 0],
    domes: [0, 8_000_000],
    bridge: [0, 3_000_000],
    infrastructure: [3_500_000, 500_000],
    design: [3_500_000, 500_000],
  } satisfies Record<string, [number, number]>,
  staff: {
    management: { employees: 5, monthlySalary: 2_100 },
    research: { employees: 10, monthlySalary: 1_400 },
    showTechnicians: { employees: 14, monthlySalary: 1_200 },
    educators: { employees: 14, monthlySalary: 950 },
    visitorServices: { employees: 24, monthlySalary: 650 },
    maintenance: { employees: 12, monthlySalary: 950 },
    it: { employees: 6, monthlySalary: 1_300 },
    finance: { employees: 7, monthlySalary: 1_050 },
    events: { employees: 8, monthlySalary: 850 },
  },
  employerCostRate: 0.12,
  monthlyAllowancePerEmployee: 85,
  facilities: {
    planetarium: { participation: 0.40, days: null, price: 7 },
    museum: { participation: 0.47, days: null, price: 5 },
    vr: { participation: 0.19, days: null, price: 7 },
    gravity: { participation: 0.13, days: null, price: 6 },
    sun: { participation: 0.21, days: null, price: 4 },
    earth: { participation: 0.15, days: null, price: 3 },
    mars: { participation: 0.18, days: null, price: 4 },
    jupiter: { participation: 0.17, days: null, price: 4 },
    moon: { participation: 0.25, days: null, price: 6 },
    school: { participation: 0.12, days: 220, price: 5 },
  },
  retail: { leaseCount: 8, annualRentPerLease: 36_000 },
  spaces: { bookingsPerDay: 0.4, days: 260, price: 1_600 },
  operatingCosts: {
    utilities: 450_000,
    maintenance: 650_000,
    licenses: 230_000,
    securityCleaning: 360_000,
    insuranceAdministration: 180_000,
    marketing: 150_000,
    other: 210_000,
  },
  laterCapitalByYear: { 8: 1_200_000, 15: 1_500_000 } as Record<number, number>,
  // Null leaves an item unquantified rather than assuming a zero liability.
  annualCashTaxes: null as number | null,
  annualOtherCashNeeds: null as number | null,
};

type Assumptions = typeof financialAssumptions;

function entries<T extends object>(record: T) {
  return Object.entries(record) as [keyof T, T[keyof T]][];
}

const sum = (amounts: number[]) => amounts.reduce((total, amount) => total + amount, 0);
const roundMoney = (amount: number) => Math.round(amount * 100) / 100;

export function calculateFeasibility(input: Assumptions = financialAssumptions) {
  const capital = entries(input.capital).map(([key, [core, expansion]]) => ({ key, core, expansion, total: core + expansion }));
  const coreCapital = sum(capital.map((row) => row.core));
  const expansionCapital = sum(capital.map((row) => row.expansion));
  const investment = coreCapital + expansionCapital;

  const staff = entries(input.staff).map(([key, { employees, monthlySalary }]) => {
    const monthly = roundMoney(employees * monthlySalary);
    return { key, employees, monthlySalary, monthly, annual: roundMoney(monthly * 12) };
  });
  const employees = sum(staff.map((row) => row.employees));
  const monthlyPayroll = roundMoney(sum(staff.map((row) => row.monthly)));
  const annualPayroll = roundMoney(sum(staff.map((row) => row.annual)));
  const employerCost = roundMoney(annualPayroll * input.employerCostRate);
  const allowances = roundMoney(employees * input.monthlyAllowancePerEmployee * 12);
  const staffCost = roundMoney(annualPayroll + employerCost + allowances);

  const facilities = entries(input.facilities).map(([key, { participation, days: operatingDays, price }]) => {
    const days = operatingDays ?? input.complexOperatingDays;
    const annual = Math.round(input.annualUniqueVisitors * days / input.complexOperatingDays * participation);
    return { key, participation, days, price, annual, daily: days > 0 ? annual / days : 0, revenue: roundMoney(annual * price) };
  });
  const annualFacilityUses = sum(facilities.map((row) => row.annual));
  const retailRevenue = roundMoney(input.retail.leaseCount * input.retail.annualRentPerLease);
  const annualSpaceBookings = Math.round(input.spaces.bookingsPerDay * input.spaces.days);
  const spaceRevenue = roundMoney(annualSpaceBookings * input.spaces.price);
  const revenue = roundMoney(sum(facilities.map((row) => row.revenue)) + retailRevenue + spaceRevenue);

  const operatingExpenses = roundMoney(staffCost + sum(Object.values(input.operatingCosts)));
  const operatingCash = roundMoney(revenue - operatingExpenses);
  const hasFullFreeCashInputs = input.annualCashTaxes !== null && input.annualOtherCashNeeds !== null;

  let cumulative = -investment;
  let payback: number | null = null;
  const schedule = Array.from({ length: input.studyYears + 1 }, (_, year) => {
    const operating = year === 0 ? 0 : operatingCash;
    const capitalOutlay = year === 0 ? investment : input.laterCapitalByYear[year] ?? 0;
    const taxes = year === 0 ? 0 : input.annualCashTaxes;
    const other = year === 0 ? 0 : input.annualOtherCashNeeds;
    const net = roundMoney(operating - capitalOutlay - (taxes ?? 0) - (other ?? 0));
    const previous = cumulative;
    cumulative = year === 0 ? net : roundMoney(previous + net);
    if (year > 0 && payback === null && previous < 0 && cumulative >= 0) {
      payback = year - 1 + (-previous / net);
    }
    return { year, operating, capitalOutlay, taxes, other, net, cumulative };
  });

  return {
    capital, coreCapital, expansionCapital, investment,
    staff, employees, monthlyPayroll, annualPayroll, employerCost, allowances, staffCost,
    facilities, annualFacilityUses, retailRevenue, annualSpaceBookings, spaceRevenue, revenue,
    operatingExpenses, operatingCash, schedule, payback, hasFullFreeCashInputs,
  };
}
