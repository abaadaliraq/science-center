import { connection } from "next/server";
import { access } from "node:fs/promises";
import path from "node:path";
import HistoricalBackground from "./HistoricalBackground";

export default async function HistoryTeaserLoader() {
  await connection();
  const available = await access(path.join(process.cwd(), "public", "images", "planetarium-current.jpg")).then(() => true, () => false);
  return <HistoricalBackground imageAvailable={available} />;
}
