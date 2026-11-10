import type { Metadata } from "next";
import { Suspense } from "react";
import { OperationsDetails } from "@/components/operations/Operations";
import OperationsLoader from "@/components/operations/OperationsLoader";
import { operationsContent } from "@/content/operations";

export const metadata: Metadata = {
  title: operationsContent.ar.pageTitle,
  description: operationsContent.ar.summary,
};

export default function OperationsPage() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<OperationsDetails />}>
          <OperationsLoader view="details" />
        </Suspense>
      </main>
    </>
  );
}
