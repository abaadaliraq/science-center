import type { Metadata } from "next";
import { Suspense } from "react";
import PlanetariumHistoryDetails from "@/components/PlanetariumHistoryDetails";
import HistoryGalleryLoader from "@/components/HistoryGalleryLoader";
import HistoryGallery from "@/components/HistoryGallery";
import { historyContent } from "@/content/history";
import HistoryDetailsHero from "@/components/HistoryDetailsHero";
import HistoryDetailsHeroLoader from "@/components/HistoryDetailsHeroLoader";

export const metadata: Metadata = { title: historyContent.ar.title };

export default function PlanetariumHistoryPage() {
  return (
    <>
      <main id="main-content" tabIndex={-1}>
        <PlanetariumHistoryDetails
          hero={<Suspense fallback={<HistoryDetailsHero />}><HistoryDetailsHeroLoader /></Suspense>}
          gallery={<Suspense fallback={<HistoryGallery images={[]} loading />}><HistoryGalleryLoader /></Suspense>}
        />
      </main>
    </>
  );
}
