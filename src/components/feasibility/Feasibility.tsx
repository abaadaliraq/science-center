"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { feasibilityContent, feasibilityImages, type FeasibilityAssets } from "@/content/feasibility";
import HistoryLink from "../HistoryLink";
import HomeSectionBanner from "../HomeSectionBanner";
import { useLanguage } from "../LanguageProvider";
import useProposalMotion from "../proposal/useProposalMotion";
import FinancialModel from "./FinancialModel";
import "./Feasibility.css";

function FeasibilityPhoto({ asset, version }: { asset: keyof FeasibilityAssets; version?: string }) {
  const { language } = useLanguage();
  const [failed, setFailed] = useState(false);
  return (
    <div className="feasibility-photo">
      {version && !failed ? (
        <Image
          src={`/images/feasibility/${feasibilityImages[asset]}?v=${version}`}
          alt=""
          fill
          sizes={asset === "hero" ? "100vw" : "(max-width: 700px) 100vw, 40vw"}
          preload={asset === "hero"}
          onError={() => setFailed(true)}
        />
      ) : <span className="feasibility-photo-empty">{feasibilityContent[language].missingImage}</span>}
    </div>
  );
}

export function FeasibilitySection({ assets = {} }: { assets?: FeasibilityAssets }) {
  const { language } = useLanguage();
  const copy = feasibilityContent[language];
  return (
    <HomeSectionBanner
      id="financial-feasibility"
      titleId="feasibility-section-title"
      theme="ochre"
      title={copy.title}
      summary={copy.summary}
      href="/financial-feasibility"
      linkLabel={copy.explore}
      image={<FeasibilityPhoto asset="cover" version={assets.cover} />}
    />
  );
}

export function FeasibilityDetails({ assets = {} }: { assets?: FeasibilityAssets }) {
  const { language } = useLanguage();
  const copy = feasibilityContent[language];
  const root = useRef<HTMLElement>(null);
  useProposalMotion(root);
  useEffect(() => { document.title = copy.pageTitle; }, [copy.pageTitle]);

  return (
    <section ref={root} className="feasibility-page" aria-labelledby="feasibility-title" data-history-transition>
      <header className="feasibility-hero">
        <FeasibilityPhoto asset="hero" version={assets.hero} />
        <div className="feasibility-inner" data-proposal-reveal>
          <HistoryLink href="/#financial-feasibility" className="feasibility-back">
            <span aria-hidden="true">←</span>{copy.back}
          </HistoryLink>
          <h1 id="feasibility-title">{copy.pageTitle}</h1>
        </div>
      </header>
      <div className="feasibility-inner feasibility-body">
        <p className="feasibility-note">{copy.preliminary}</p>
        <FinancialModel copy={copy} />
      </div>
    </section>
  );
}
