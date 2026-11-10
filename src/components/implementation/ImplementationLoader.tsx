import { readdir } from "node:fs/promises";
import path from "node:path";
import { connection } from "next/server";
import { implementationImages, type ImplementationAssets } from "@/content/implementation";
import { ImplementationDetails, ImplementationSection } from "./Implementation";

async function readImplementationAssets(): Promise<ImplementationAssets> {
  try {
    const directory = path.join(process.cwd(), "public", "images", "implementation");
    const entries = await readdir(directory, { withFileTypes: true });
    const files = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));
    return Object.fromEntries(Object.entries(implementationImages).map(([key, file]) => [key, files.has(file)]));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }
}

export default async function ImplementationLoader({ view }: { view: "section" | "details" }) {
  await connection();
  const assets = await readImplementationAssets();
  return view === "section" ? <ImplementationSection assets={assets} /> : <ImplementationDetails assets={assets} />;
}
