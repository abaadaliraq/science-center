import { readPublicImageVersions } from "@/lib/public-image-versions";
import { connection } from "next/server";
import { implementationImages } from "@/content/implementation";
import { ImplementationDetails, ImplementationSection } from "./Implementation";

export default async function ImplementationLoader({ view }: { view: "section" | "details" }) {
  await connection();
  const assets = await readPublicImageVersions("implementation", implementationImages);
  return view === "section" ? <ImplementationSection assets={assets} /> : <ImplementationDetails assets={assets} />;
}
