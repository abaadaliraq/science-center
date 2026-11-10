/** Conservative check of the upstream framing policy. Unknown restrictions use the external link. */
export function tourHeadersAllowFrame(headers: Headers, parentOrigin: string, resourceOrigin: string): boolean {
  const options = headers.get("x-frame-options")?.toLowerCase() ?? "";
  if (options.includes("deny") || (options.includes("sameorigin") && parentOrigin !== resourceOrigin)) return false;
  const policies = headers.get("content-security-policy")?.split(",") ?? [];
  return policies.every((policy) => {
    const directive = policy.split(";").map((part) => part.trim()).find((part) => /^frame-ancestors(?:\s|$)/i.test(part));
    if (!directive) return true;
    const sources = directive.split(/\s+/).slice(1);
    if (sources.includes("'none'")) return false;
    return sources.some((source) => {
      if (source === "*") return true;
      if (source === "'self'") return parentOrigin === resourceOrigin;
      if (source === "http:" || source === "https:") return parentOrigin.startsWith(source);
      try { return new URL(source).origin === parentOrigin; } catch { return false; }
    });
  });
}
