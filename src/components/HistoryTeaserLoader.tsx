import { connection } from "next/server";
import { readPublicImageVersions } from "@/lib/public-image-versions";
import HistoricalBackground from "./HistoricalBackground";

export default async function HistoryTeaserLoader() {
  await connection();
  const { cover } = await readPublicImageVersions("", { cover: "planetarium-current.jpg" });
  return <HistoricalBackground imageVersion={cover} />;
}
