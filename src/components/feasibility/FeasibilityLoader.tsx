import { readPublicImageVersions } from "@/lib/public-image-versions";
import { connection } from "next/server";
import { feasibilityImages } from "@/content/feasibility";
import { FeasibilityDetails, FeasibilitySection } from "./Feasibility";

export default async function FeasibilityLoader({ view }: { view: "section" | "details" }) {
  await connection();
  const assets = await readPublicImageVersions("feasibility", feasibilityImages);
  return view === "section" ? <FeasibilitySection assets={assets} /> : <FeasibilityDetails assets={assets} />;
}
