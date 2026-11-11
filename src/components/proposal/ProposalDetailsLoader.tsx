import { connection } from "next/server";
import { readProposalDetailAssets, readProposalDomeVersions } from "@/lib/proposal-assets";
import ProjectProposalDetails from "./ProjectProposalDetails";

export default async function ProposalDetailsLoader() {
  await connection();
  const [assets, domeVersions] = await Promise.all([readProposalDetailAssets(), readProposalDomeVersions()]);
  return <ProjectProposalDetails assets={assets} domeVersions={domeVersions} />;
}
