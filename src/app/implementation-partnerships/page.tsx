import type { Metadata } from "next";
import { Suspense } from "react";
import { ImplementationDetails } from "@/components/implementation/Implementation";
import ImplementationLoader from "@/components/implementation/ImplementationLoader";
import { implementationContent } from "@/content/implementation";

export const metadata: Metadata = {
  title: implementationContent.ar.pageTitle,
  description: implementationContent.ar.intro,
};

export default function ImplementationPartnershipsPage() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<ImplementationDetails />}>
          <ImplementationLoader view="details" />
        </Suspense>
      </main>
    </>
  );
}
