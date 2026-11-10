"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { historyEditorial } from "@/content/historyEditorial";
import HomeSectionBanner from "./HomeSectionBanner";

export default function HistoricalBackground({ imageAvailable = false }: { imageAvailable?: boolean }) {
  const { language } = useLanguage();
  const copy = historyEditorial[language];
  const [failed, setFailed] = useState(false);
  return (
    <HomeSectionBanner id="history" titleId="history-title" theme="nebula" title={copy.title}
      summary={copy.summary.map((line) => <span key={line}>{line}</span>)} href="/planetarium-history" linkLabel={copy.explore}
      image={imageAvailable && !failed ? (
        <div className="home-banner-image-inner"><Image src="/images/planetarium-current.jpg" alt={copy.imageAlt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 60vw" className="object-cover" onError={() => setFailed(true)} /></div>
      ) : <div className="home-banner-placeholder" dir={language === "ar" ? "rtl" : "ltr"}><span>{copy.imagePending}</span></div>}
    />
  );
}
