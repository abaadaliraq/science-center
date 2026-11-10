"use client";

import { useLanguage } from "./LanguageProvider";
import { useEffect, type ReactNode } from "react";
import { historyContent, historySources } from "@/content/history";
import { historyEditorial } from "@/content/historyEditorial";
import CountUpValue from "./CountUpValue";
import "./HistoricalBackground.css";
import "./InstitutionalPages.css";

export default function PlanetariumHistoryDetails({ gallery, hero }: { gallery: ReactNode; hero: ReactNode }) {
  const { language } = useLanguage();
  const content = historyContent[language];
  useEffect(() => { document.title = content.title; }, [content.title]);
  return (
    <section className="history-details-page" aria-labelledby="history-title" data-history-transition>
      {hero}
      <div className="history-details-body"><div className="section-inner mx-auto history-detail-inner">
        <p className="detail-cover-introduction" data-reveal>{historyEditorial[language].heroSubtitle}</p>
        <div className="section-index flex items-center gap-5" data-reveal>
          <span>01</span><span className="section-rule grow" aria-hidden="true" />
        </div>
        <div className="history-detail-copy history-details-copy">
          {content.paragraphs.map((paragraph, index) => (
            <p key={index} className={index === 4 ? "history-detail-opportunity" : undefined} data-reveal>{paragraph}</p>
          ))}
        </div>

        <dl className="history-detail-cards" aria-label={content.factsLabel}>
          {content.facts.map((fact, index) => (
            <div className="history-detail-card" key={index} data-reveal>
              <dt className="history-detail-label">{fact.label}</dt>
              <dd className={`history-detail-value ${index === 2 ? "history-detail-textValue" : "history-detail-numericValue"}`}>
                {index < 2 ? (
                  <>
                    <span className="sr-only">{fact.value}</span>
                    <span className="history-detail-range" aria-hidden="true"><CountUpValue start={index === 0 ? 1979 : 20} end={index === 0 ? 1981 : undefined} /></span>
                    {"unit" in fact && <span className="history-detail-unit" aria-hidden="true">{fact.unit}</span>}
                  </>
                ) : fact.value}
              </dd>
              <dd className="history-detail-description">{fact.description}</dd>
            </div>
          ))}
        </dl>

        <aside className="history-detail-documentation" aria-label={content.sourcesLabel} data-reveal>
          <p>{content.note}</p>
          <div className="history-detail-sources">
            <span className="history-detail-sourcesLabel">{content.sourcesLabel}</span>
            <ul>
              {historySources.map((source) => (
                <li key={source.id}>
                  <a href={source.href} target="_blank" rel="noopener noreferrer">{content.sourceLabels[source.id]}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
        {gallery}
      </div></div>
    </section>
  );
}
