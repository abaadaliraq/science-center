import Hero from "@/components/Hero";
import HistoricalBackground from "@/components/HistoricalBackground";
import PresentationMotion from "@/components/PresentationMotion";
import { Suspense } from "react";
import HistoryTeaserLoader from "@/components/HistoryTeaserLoader";
import ProjectProposalSection from "@/components/proposal/ProjectProposalSection";
import ProposalSectionLoader from "@/components/proposal/ProposalSectionLoader";
import ProjectIntroduction from "@/components/ProjectIntroduction";
import { OperationsSection } from "@/components/operations/Operations";
import OperationsLoader from "@/components/operations/OperationsLoader";
import { FeasibilitySection } from "@/components/feasibility/Feasibility";
import FeasibilityLoader from "@/components/feasibility/FeasibilityLoader";
import { ImplementationSection } from "@/components/implementation/Implementation";
import ImplementationLoader from "@/components/implementation/ImplementationLoader";

export default function Home() {
  return (
    <main id="main-content" className="home-presentation" tabIndex={-1}>
      <Hero />
      <ProjectIntroduction />
      <Suspense fallback={<HistoricalBackground />}><HistoryTeaserLoader /></Suspense>
      <Suspense fallback={<ProjectProposalSection />}><ProposalSectionLoader /></Suspense>
      <Suspense fallback={<OperationsSection />}><OperationsLoader view="section" /></Suspense>
      <Suspense fallback={<FeasibilitySection />}><FeasibilityLoader view="section" /></Suspense>
      <Suspense fallback={<ImplementationSection />}><ImplementationLoader view="section" /></Suspense>
      <PresentationMotion />
    </main>
  );
}
