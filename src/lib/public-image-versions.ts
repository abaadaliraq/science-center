import "server-only";
import { stat } from "node:fs/promises";
import path from "node:path";

export async function readPublicImageVersions<Key extends string>(
  directory: string,
  files: Record<Key, string>,
): Promise<Partial<Record<Key, string>>> {
  const versions: Partial<Record<Key, string>> = {};
  await Promise.all((Object.keys(files) as Key[]).map(async (key) => {
    try {
      const metadata = await stat(path.join(process.cwd(), "public", "images", directory, files[key]));
      if (metadata.isFile()) versions[key] = [metadata.size, metadata.mtimeMs, metadata.ctimeMs].join("-");
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }));
  return versions;
}
