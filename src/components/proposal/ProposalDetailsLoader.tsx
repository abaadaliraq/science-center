import { connection } from "next/server";
import { readProposalAssets, readProposalDomeVersions } from "@/lib/proposal-assets";
import ProjectProposalDetails from "./ProjectProposalDetails";

export default async function ProposalDetailsLoader() {
  await connection();
  const [assets, domeVersions] = await Promise.all([readProposalAssets(), readProposalDomeVersions()]);
  return <ProjectProposalDetails assets={assets} domeVersions={domeVersions} />;
}
