"use client";

import { useRef, type ReactNode } from "react";
import { useLanguage } from "./LanguageProvider";
import HistoryLink from "./HistoryLink";
import useHomeBannerMotion from "./useHomeBannerMotion";
import "./HomeSectionBanner.css";

type HomeSectionBannerProps = {
  id: string;
  titleId: string;
  theme: "nebula" | "petrol" | "indigo" | "olive" | "ochre";
  title: string;
  summary: ReactNode;
  image: ReactNode;
  href: string;
  linkLabel: string;
};

/** Reference proportions with distinct, restrained section colors. */
export default function HomeSectionBanner({ id, titleId, theme, title, summary, image, href, linkLabel }: HomeSectionBannerProps) {
  const { language } = useLanguage();
  const root = useRef<HTMLElement>(null);
  useHomeBannerMotion(root);
  return (
    <section ref={root} id={id} className={`home-section-banner home-banner-${theme}`} aria-labelledby={titleId} data-history-transition>
      <div className="home-banner-media"><div className="home-banner-visual" data-home-banner-image>{image}</div></div>
      <div className="home-banner-panel" dir={language === "ar" ? "rtl" : "ltr"}>
        <span className="home-banner-number" aria-hidden="true" />
        <div className="home-banner-content">
          <h2 id={titleId} data-home-banner-enter>{title}</h2>
          <span className="home-banner-rule" aria-hidden="true" data-home-banner-enter />
          <p className="home-banner-summary" data-home-banner-enter>{summary}</p>
          <div data-home-banner-enter><HistoryLink href={href} className="home-banner-link">{linkLabel}<span aria-hidden="true">↗</span></HistoryLink></div>
        </div>
      </div>
    </section>
  );
}
