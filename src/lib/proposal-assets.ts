import "server-only";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { proposalImages, type ProposalAssets, type ProposalImageKey } from "@/content/proposal";

export async function readProposalAssets(): Promise<ProposalAssets> {
  try {
    const entries = await readdir(path.join(process.cwd(), "public", "images", "proposal"), { withFileTypes: true });
    const available = new Set(entries.filter((entry) => entry.isFile()).map((entry) => entry.name));
    return Object.fromEntries(Object.entries(proposalImages).map(([key, file]) => [key as ProposalImageKey, available.has(file)]));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return {};
    throw error;
  }
}

export async function readProposalDomeVersions(): Promise<Partial<Record<ProposalImageKey, string>>> {
  // Keep Jupiter's own card when a second file is an exact copy of its artwork.
  const domes = ["jupiter", "sun", "earth", "mars", "moon"] as const;
  const versions = await Promise.all(domes.map(async (dome) => {
    try {
      const file = path.join(process.cwd(), "public", "images", "proposal", proposalImages[dome]);
      return createHash("sha256").update(await readFile(file)).digest("hex");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
      throw error;
    }
  }));
  const uniqueVersions = new Set<string>();
  const result: Partial<Record<ProposalImageKey, string>> = {};
  for (const [index, dome] of domes.entries()) {
    const version = versions[index];
    if (!version || uniqueVersions.has(version)) continue;
    uniqueVersions.add(version);
    result[dome] = version;
  }
  return result;
}
