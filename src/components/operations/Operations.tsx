"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { operationsContent, operationsImages, type OperationsAssets, type OperationsImage } from "@/content/operations";
import HistoryLink from "../HistoryLink";
import HomeSectionBanner from "../HomeSectionBanner";
import { useLanguage } from "../LanguageProvider";
import useProposalMotion from "../proposal/useProposalMotion";
import "./Operations.css";

const programIcons = [
  "M12 2v4m0 12v4M2 12h4m12 0h4M12 7l1.4 3.6L17 12l-3.6 1.4L12 17l-1.4-3.6L7 12l3.6-1.4L12 7Z",
  "M2 8l10-5 10 5-10 5L2 8Zm5 3v6l5 3 5-3v-6m4-2v7",
  "M9 3h6m-5 0v7l-5 8a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-8V3M8 15h8",
  "M3 4h18v12H3zM8 21h8m-4-5v5m-2-14 5 3-5 3z",
  "M3 8h18l-2-5H5L3 8Zm1 0v13h16V8M9 21v-7h6v7M3 8a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0",
];

function OperationsPhoto({ asset, version }: { asset: OperationsImage; version?: string }) {
  const { language } = useLanguage();
  const [failed, setFailed] = useState(false);
  const sizes = asset === "hero" ? "100vw" : "(max-width: 700px) 100vw, 40vw";

  return (
    <div className={`operations-photo operations-photo-${asset}`}>
      {version && !failed ? (
        <Image src={`/images/operations/${operationsImages[asset]}?v=${version}`} alt="" fill sizes={sizes} preload={asset === "hero"} onError={() => setFailed(true)} />
      ) : (
        <span className="operations-photo-empty">{operationsContent[language].imagePending}</span>
      )}
    </div>
  );
}

export function OperationsSection({ assets = {} }: { assets?: OperationsAssets }) {
  const { language } = useLanguage();
  const copy = operationsContent[language];

  return (
    <HomeSectionBanner
      id="operations"
      titleId="operations-section-title"
      theme="olive"
      title={copy.sectionTitle}
      summary={copy.summary}
      href="/operations"
      linkLabel={copy.explore}
      image={<OperationsPhoto asset="cover" version={assets.cover} />}
    />
  );
}

type BodyImage = Exclude<OperationsImage, "hero" | "cover">;

function OperationsBlock({ asset, title, version, children }: {
  asset: BodyImage;
  title: string;
  version?: string;
  children: ReactNode;
}) {
  return (
    <section className="operations-block" aria-labelledby={`operations-${asset}-title`} data-proposal-reveal>
      <div className="operations-block-copy">
        <h2 id={`operations-${asset}-title`}>{title}</h2>
        {children}
      </div>
      <div className="operations-block-visual">
        <OperationsPhoto asset={asset} version={version} />
      </div>
    </section>
  );
}

export function OperationsDetails({ assets = {} }: { assets?: OperationsAssets }) {
  const { language } = useLanguage();
  const copy = operationsContent[language];
  const root = useRef<HTMLElement>(null);
  useProposalMotion(root);
  useEffect(() => { document.title = copy.pageTitle; }, [copy.pageTitle]);

  return (
    <section ref={root} className="operations-page" aria-labelledby="operations-title" data-history-transition>
      <header className="operations-hero">
        <OperationsPhoto asset="hero" version={assets.hero} />
        <div className="operations-inner operations-hero-copy" data-proposal-reveal>
          <HistoryLink href="/#operations" className="operations-back">
            <span aria-hidden="true">←</span>{copy.back}
          </HistoryLink>
          <h1 id="operations-title">{copy.pageTitle}</h1>
        </div>
      </header>

      <div className="operations-inner operations-content">
        <section className="operations-governance" aria-labelledby="operations-governance-title" data-proposal-reveal>
          <h2 id="operations-governance-title">{copy.governance.title}</h2>
          <figure className="operations-org">
            <ul className="operations-org-tree">
              <li>
                <div className="operations-org-node">{copy.governance.oversight}</div>
                <ul className="operations-org-level">
                  <li>
                    <div className="operations-org-node operations-org-management">{copy.governance.management}</div>
                    <ul className="operations-org-partners">
                      {copy.governance.partners.map((item) => <li className="operations-org-node" key={item}>{item}</li>)}
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
            <figcaption>{copy.governance.note}</figcaption>
          </figure>
        </section>

        <div className="operations-blocks">
          <OperationsBlock asset="programs" title={copy.programs.title} version={assets.programs}>
            <ul className="operations-cards operations-programs">
              {copy.programs.items.map((item, index) => (
                <li key={item}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={programIcons[index]} />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </OperationsBlock>

          <OperationsBlock asset="revenue" title={copy.revenue.title} version={assets.revenue}>
            <figure className="operations-revenue">
              <figcaption>{copy.revenue.hub}</figcaption>
              <ul className="operations-revenue-sources">
                {copy.revenue.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </figure>
          </OperationsBlock>

          <OperationsBlock asset="costs" title={copy.costs.title} version={assets.costs}>
            <ul className="operations-cards operations-costs">
              {copy.costs.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </OperationsBlock>

          <OperationsBlock asset="sustainability" title={copy.sustainability.title} version={assets.sustainability}>
            <ul className="operations-steps">
              {copy.sustainability.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </OperationsBlock>
        </div>
      </div>

      <section className="operations-kpi" aria-labelledby="operations-kpi-title">
        <div className="operations-inner" data-proposal-reveal>
          <h2 id="operations-kpi-title">{copy.kpi.title}</h2>
          <p>{copy.kpi.note}</p>
          <ul className="operations-kpi-grid">
            {copy.kpi.items.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </section>
    </section>
  );
}
