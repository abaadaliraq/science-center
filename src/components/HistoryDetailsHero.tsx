"use client";

import { useLanguage } from "./LanguageProvider";
import { historyContent } from "@/content/history";
import { historyEditorial } from "@/content/historyEditorial";
import HistoryLink from "./HistoryLink";

export default function HistoryDetailsHero() {
  const { language } = useLanguage();
  return (
    <header className="history-detail-hero">
      <span className="detail-cover-number" aria-hidden="true">01</span>
      <div className="history-detail-hero-content">
        <div><HistoryLink href="/#history" className="history-back-link"><span aria-hidden="true">←</span>{historyEditorial[language].back}</HistoryLink></div>
        <h1 id="history-title">{historyContent[language].title}</h1>
      </div>
    </header>
  );
}
