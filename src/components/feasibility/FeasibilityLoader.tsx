import { readdir } from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import { feasibilityImages, type FeasibilityAssets } from "@/content/feasibility";
import { FeasibilityDetails, FeasibilitySection } from "./Feasibility";

async function readFeasibilityAssets(): Promise<FeasibilityAssets> {
  try {
    const directory = path.join(process.cwd(), "public", "images", "feasibility");
    const entries = await readdir(directory, { withFileTypes: true });
    const files = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));
    return { cover: files.has(feasibilityImages.cover), hero: files.has(feasibilityImages.hero) };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }
}

export default async function FeasibilityLoader({ view }: { view: "section" | "details" }) {
  await connection();
  const assets = await readFeasibilityAssets();
  return view === "section" ? <FeasibilitySection assets={assets} /> : <FeasibilityDetails assets={assets} />;
}
