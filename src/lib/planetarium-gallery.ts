import "server-only";
import { readdir } from "node:fs/promises";
import path from "node:path";

export const historyGalleryNames = ["planetarium-01.jpg", "planetarium-02.jpg", "planetarium-03.jpg"] as const;

export async function readHistoryImages(): Promise<string[]> {
  try {
    const entries = await readdir(path.join(process.cwd(), "public", "images", "planetarium-history"), { withFileTypes: true });
    const available = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));
    return historyGalleryNames.filter((name) => available.has(name)).map((name) => `/images/planetarium-history/${name}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}
