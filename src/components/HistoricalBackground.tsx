"use client";

import Image from "next/image";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";
import { historyEditorial } from "@/content/historyEditorial";
import HomeSectionBanner from "./HomeSectionBanner";

export default function HistoricalBackground({ imageVersion }: { imageVersion?: string }) {
  const { language } = useLanguage();
  const copy = historyEditorial[language];
  const [failed, setFailed] = useState(false);
  return (
    <HomeSectionBanner id="history" titleId="history-title" theme="nebula" title={copy.title}
      summary={copy.summary.map((line) => <span key={line}>{line}</span>)} href="/planetarium-history" linkLabel={copy.explore}
      image={imageVersion && !failed ? (
        <div className="home-banner-image-inner"><Image src={`/images/planetarium-current.jpg?v=${imageVersion}`} alt={copy.imageAlt} fill sizes="(max-width: 700px) 100vw, 55vw" className="object-cover" onError={() => setFailed(true)} /></div>
      ) : <div className="home-banner-placeholder" dir={language === "ar" ? "rtl" : "ltr"}><span>{copy.imagePending}</span></div>}
    />
  );
}
