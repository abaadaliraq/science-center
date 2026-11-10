import { connection } from "next/server";
import { readHistoryImages } from "@/lib/planetarium-gallery";
import HistoryGallery from "./HistoryGallery";

export default async function HistoryGalleryLoader() {
  await connection();
  return <HistoryGallery images={await readHistoryImages()} />;
}
