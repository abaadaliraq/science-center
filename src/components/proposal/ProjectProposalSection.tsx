"use client";

import { useLanguage } from "../LanguageProvider";
import HomeSectionBanner from "../HomeSectionBanner";
import { proposalContent, type ProposalAssets } from "@/content/proposal";
import ProposalImage from "./ProposalImage";
import "./ProjectProposal.css";

export default function ProjectProposalSection({ assets = {} }: { assets?: ProposalAssets }) {
  const { language } = useLanguage();
  const copy = proposalContent[language];
  return (
    <HomeSectionBanner id="project-proposal" titleId="proposal-section-title" theme="petrol" title={copy.sectionTitle}
      summary={copy.summary} href="/project-proposal" linkLabel={copy.explore}
      image={<ProposalImage asset="cover" available={assets.cover} alt={copy.coverAlt} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 60vw" />}
    />
  );
}
