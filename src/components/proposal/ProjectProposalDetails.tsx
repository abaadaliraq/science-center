"use client";

import { useEffect } from "react";
import { useLanguage } from "../LanguageProvider";
import HistoryLink from "../HistoryLink";
import { proposalContent, type ProposalAssets, type ProposalImageKey } from "@/content/proposal";
import ProposalImage from "./ProposalImage";
import ProposalCounter from "./ProposalCounter";
import ProposalMasterplan from "./ProposalMasterplan";
import ProposalTour from "./ProposalTour";
import "./ProjectProposal.css";
import "../InstitutionalPages.css";

export default function ProjectProposalDetails({ assets = {}, domeVersions = {} }: {
  assets?: ProposalAssets;
  domeVersions?: Partial<Record<ProposalImageKey, string>>;
}) {
  const { language } = useLanguage();
  const copy = proposalContent[language];
  const cards = copy.interactiveCards;
  const componentGroups = [
    { title: copy.centerTitle, items: copy.components, className: "proposal-components-grid" },
    { title: copy.domesTitle, items: copy.domes, className: "proposal-domes-grid" },
  ];
  useEffect(() => { document.title = copy.pageTitle; }, [copy.pageTitle]);
  return (
    <section className="proposal-page" aria-labelledby="proposal-title">
      <header className="proposal-hero">
        <span className="detail-cover-number" aria-hidden="true">02</span>
        <div className="proposal-hero-content">
          <div data-proposal-reveal><HistoryLink href="/#project-proposal" className="proposal-back"><span aria-hidden="true">←</span>{copy.back}</HistoryLink></div>
          <h1 id="proposal-title" data-proposal-reveal>{copy.heroTitle}</h1>
        </div>
      </header>
      <div className="proposal-page-introduction"><p className="detail-cover-introduction" data-proposal-reveal>{copy.heroDescription}</p></div>

      <section className="proposal-block proposal-vision" aria-labelledby="proposal-vision-title">
        <div className="proposal-inner proposal-vision-grid">
          <div data-proposal-reveal>
            <div className="proposal-kicker"><span>01</span><span className="proposal-rule" /></div>
            <h2 id="proposal-vision-title">{copy.visionTitle}</h2>
            <p className="proposal-lead">{copy.vision}</p>
            <ol className="proposal-vision-route">{copy.visionSteps.map((step, index) => <li key={index}><span className="proposal-route-dot" aria-hidden="true" />{step}</li>)}</ol>
          </div>
          <div className="proposal-vision-image" data-proposal-reveal><ProposalImage asset="vision" version={assets.vision} alt={copy.visionTitle} parallax /></div>
        </div>
      </section>

      <section className="proposal-block proposal-site" aria-labelledby="proposal-site-title">
        <div className="proposal-inner">
          <header className="proposal-section-heading" data-proposal-reveal><div className="proposal-kicker"><span>02</span><span className="proposal-rule" /></div><h2 id="proposal-site-title">{copy.siteTitle}</h2></header>
          <ProposalMasterplan key={assets.masterplan} version={assets.masterplan} />
          <div className="proposal-expansion-grid proposal-zones">
            {copy.siteZones.map((zone) => <article key={zone.title} className="proposal-expansion-card" data-proposal-reveal><h3>{zone.title}</h3><p>{zone.description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="proposal-block proposal-components" aria-labelledby="proposal-components-title">
        <div className="proposal-inner">
          <header className="proposal-section-heading" data-proposal-reveal><div className="proposal-kicker"><span>03</span><span className="proposal-rule" /></div><h2 id="proposal-components-title">{copy.componentsTitle}</h2></header>
          {componentGroups.map((group) => (
            <div className="proposal-component-group" key={group.className}>
              <h3 className="proposal-group-title" data-proposal-reveal>{group.title}</h3>
              <div className={group.className}>{group.items.map((item, index) => {
                const isDome = group.className === "proposal-domes-grid";
                const version = isDome ? domeVersions[item.image] : assets[item.image];
                return (
                  <article key={item.image} data-proposal-asset={item.image} className={`proposal-component${isDome ? "" : ` proposal-component-${index + 1}`}`} data-proposal-reveal>
                    <div className="proposal-component-image">
                      <ProposalImage
                        key={version ?? item.image}
                        asset={item.image}
                        version={version}
                        alt={item.title}
                        parallax={item.image === "planetarium" || item.image === "gravity"}
                        sizes="(max-width: 800px) 100vw, 60vw"
                      />
                    </div>
                    <div className="proposal-component-copy">
                      <span className="proposal-component-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        {"cardsTopic" in item && <p className="proposal-dome-cards"><strong>{cards.label}</strong> — {item.cardsTopic}</p>}
                      </div>
                    </div>
                  </article>
                );
              })}</div>
              {group.className === "proposal-components-grid" && (
                <section className="proposal-planetarium-tour" aria-labelledby="proposal-planetarium-tour-title" data-proposal-reveal>
                  <h4 id="proposal-planetarium-tour-title">{copy.tourTitle}</h4>
                  <ProposalTour />
                </section>
              )}
              {group.className === "proposal-domes-grid" && (
                <section className="proposal-space-cards" aria-labelledby="proposal-space-cards-title" data-proposal-reveal>
                  <h4 id="proposal-space-cards-title">{cards.title}</h4>
                  <p className="proposal-lead">{cards.description}</p>
                  <figure className="proposal-space-cards-video">
                    <iframe
                      src="https://player.vimeo.com/video/1068098797?autoplay=0&controls=1"
                      title={cards.title}
                      loading="lazy"
                      allow="fullscreen; picture-in-picture; encrypted-media"
                      allowFullScreen
                    />
                    <figcaption>
                      <p className="proposal-note">{cards.reference}</p>
                      <a href="https://vimeo.com/1068098797" target="_blank" rel="noopener noreferrer">{cards.openVideo}</a>
                    </figcaption>
                  </figure>
                </section>
              )}
            </div>
          ))}
          <article className="proposal-component proposal-walkway" data-proposal-reveal>
            <div className="proposal-component-image"><ProposalImage key={assets.walkway} asset="walkway" version={assets.walkway} alt={copy.walkway.title} /></div>
            <div className="proposal-component-copy"><div><h3>{copy.walkway.title}</h3><p>{copy.walkway.description}</p></div></div>
          </article>
        </div>
      </section>

      <section className="proposal-block proposal-indicators" aria-labelledby="proposal-indicators-title">
        <div className="proposal-inner">
          <header className="proposal-section-heading" data-proposal-reveal><div className="proposal-kicker"><span>04</span><span className="proposal-rule" /></div><h2 id="proposal-indicators-title">{copy.indicatorsTitle}</h2></header>
          <dl className="proposal-indicator-grid">{copy.indicators.map((item, index) => <div key={index}><dt>{item.label}</dt><dd><ProposalCounter value={item.value} /></dd></div>)}</dl>
          <p className="proposal-note">{copy.indicatorsNote}</p>
        </div>
      </section>

      <section className="proposal-block proposal-investment" aria-labelledby="proposal-investment-title">
        <div className="proposal-inner">
          <header className="proposal-section-heading" data-proposal-reveal><div className="proposal-kicker"><span>05</span><span className="proposal-rule" /></div><h2 id="proposal-investment-title">{copy.investmentTitle}</h2></header>
          <dl className="proposal-expansion-grid proposal-investment-grid">
            {copy.investment.map((item) => <div key={item.amount} className="proposal-expansion-card" data-proposal-reveal><dt><bdi>{item.amount}</bdi> {copy.investmentUnit}</dt><dd>{item.description}</dd></div>)}
          </dl>
          <p className="proposal-note">{copy.investmentNote}</p>
        </div>
      </section>

      <section className="proposal-block proposal-planning" aria-labelledby="proposal-planning-title">
        <div className="proposal-inner">
          <header className="proposal-section-heading" data-proposal-reveal><div className="proposal-kicker"><span>06</span><span className="proposal-rule" /></div><h2 id="proposal-planning-title">{copy.planningTitle}</h2></header>
          <ul className="proposal-expansion-grid">{copy.planning.map((item) => <li key={item} className="proposal-expansion-card" data-proposal-reveal>{item}</li>)}</ul>
        </div>
      </section>

    </section>
  );
}
