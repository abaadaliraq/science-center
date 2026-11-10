import { readdir } from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import { operationsImages, type OperationsAssets } from "@/content/operations";
import { OperationsDetails, OperationsSection } from "./Operations";

async function readOperationsAssets(): Promise<OperationsAssets> {
  const directory = path.join(process.cwd(), "public", "images", "operations");
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const filenames = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));
    return Object.fromEntries(Object.entries(operationsImages).map(([key, filename]) => [key, filenames.has(filename)]));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }
}

export default async function OperationsLoader({ view }: { view: "section" | "details" }) {
  await connection();
  const assets = await readOperationsAssets();
  return view === "section" ? <OperationsSection assets={assets} /> : <OperationsDetails assets={assets} />;
}
