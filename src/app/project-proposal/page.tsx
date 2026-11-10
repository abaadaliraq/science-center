import type { Metadata } from "next";
import { Suspense } from "react";
import ProjectProposalDetails from "@/components/proposal/ProjectProposalDetails";
import ProposalDetailsLoader from "@/components/proposal/ProposalDetailsLoader";
import { proposalContent } from "@/content/proposal";

export const metadata: Metadata = { title: proposalContent.ar.pageTitle, description: proposalContent.ar.heroDescription };

export default function ProjectProposalPage() {
  return <main id="main-content" tabIndex={-1}><Suspense fallback={<ProjectProposalDetails />}><ProposalDetailsLoader /></Suspense></main>;
}
