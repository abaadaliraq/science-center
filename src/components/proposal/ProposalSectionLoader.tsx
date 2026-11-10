import { connection } from "next/server";
import { readProposalAssets } from "@/lib/proposal-assets";
import ProjectProposalSection from "./ProjectProposalSection";

export default async function ProposalSectionLoader() {
  await connection();
  return <ProjectProposalSection assets={await readProposalAssets()} />;
}
