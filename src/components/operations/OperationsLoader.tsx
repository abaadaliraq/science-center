import { readPublicImageVersions } from "@/lib/public-image-versions";
import { connection } from "next/server";
import { operationsImages } from "@/content/operations";
import { OperationsDetails, OperationsSection } from "./Operations";

export default async function OperationsLoader({ view }: { view: "section" | "details" }) {
  await connection();
  const assets = await readPublicImageVersions("operations", operationsImages);
  return view === "section" ? <OperationsSection assets={assets} /> : <OperationsDetails assets={assets} />;
}
