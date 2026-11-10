"use client";

import Image from "next/image";
import { useState } from "react";
import { proposalImages, proposalContent, type ProposalImageKey } from "@/content/proposal";
import { useLanguage } from "../LanguageProvider";

export default function ProposalImage({ asset, version, alt, decorative = false, contain = false, parallax = false, priority = false, sizes = "(max-width: 800px) 100vw, 60vw" }: {
  asset: ProposalImageKey; version?: string; alt: string; decorative?: boolean; contain?: boolean; parallax?: boolean; priority?: boolean; sizes?: string;
}) {
  const { language } = useLanguage();
  const [failed, setFailed] = useState(false);
  const src = `/images/proposal/${proposalImages[asset]}${version ? `?v=${version}` : ""}`;
  return (
    <div className={`proposal-media${contain ? " proposal-media-contain" : ""}`}>
      {!decorative && (!version || failed) && <div className="proposal-image-empty" dir={language === "ar" ? "rtl" : "ltr"}><span>{proposalContent[language].imagePending}</span></div>}
      {version && !failed && <div className="proposal-photo" data-proposal-parallax={parallax && !contain ? "true" : undefined}>
        <Image src={src} alt={decorative ? "" : alt} fill sizes={sizes} preload={priority} style={{ objectFit: contain ? "contain" : "cover" }} onError={() => setFailed(true)} />
      </div>}
    </div>
  );
}
