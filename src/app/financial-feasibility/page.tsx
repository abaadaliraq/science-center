import type { Metadata } from "next";
import { Suspense } from "react";
import { FeasibilityDetails } from "@/components/feasibility/Feasibility";
import FeasibilityLoader from "@/components/feasibility/FeasibilityLoader";
import { feasibilityContent } from "@/content/feasibility";

export const metadata: Metadata = {
  title: feasibilityContent.ar.pageTitle,
  description: feasibilityContent.ar.summary,
};

export default function FinancialFeasibilityPage() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<FeasibilityDetails />}>
          <FeasibilityLoader view="details" />
        </Suspense>
      </main>
    </>
  );
}
