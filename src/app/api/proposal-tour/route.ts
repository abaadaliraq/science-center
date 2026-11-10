import { proposalTourUrl } from "@/content/proposal";
import { tourHeadersAllowFrame } from "@/lib/proposal-tour-policy";

export async function GET(request: Request) {
  let response: Response | undefined;
  try {
    response = await fetch(proposalTourUrl, { method: "HEAD", cache: "no-store", signal: AbortSignal.timeout(6000) });
    if (response.status === 405) response = await fetch(proposalTourUrl, { cache: "no-store", signal: AbortSignal.timeout(6000) });
    const allowed = response.ok && tourHeadersAllowFrame(response.headers, new URL(request.url).origin, new URL(proposalTourUrl).origin);
    return Response.json({ allowed }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ allowed: false }, { headers: { "Cache-Control": "no-store" } });
  } finally {
    await response?.body?.cancel().catch(() => {});
  }
}
