"use client";

import { useRef } from "react";
import { useLanguage } from "./LanguageProvider";
import { historyContent } from "@/content/history";
import { historyEditorial } from "@/content/historyEditorial";
import HistoryLink from "./HistoryLink";
import useHistoryEntrance from "./useHistoryEntrance";

export default function HistoryDetailsHero() {
  const { language } = useLanguage();
  const banner = useRef<HTMLElement>(null);
  useHistoryEntrance(banner);
  return (
    <header ref={banner} className="history-detail-hero">
      <span className="detail-cover-number" aria-hidden="true">01</span>
      <div className="history-detail-hero-content">
        <div data-editorial-enter><HistoryLink href="/#history" className="history-back-link"><span aria-hidden="true">←</span>{historyEditorial[language].back}</HistoryLink></div>
        <h1 id="history-title" data-editorial-enter>{historyContent[language].title}</h1>
      </div>
    </header>
  );
}
