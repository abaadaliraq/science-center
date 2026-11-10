"use client";

import { useEffect, useRef, useState } from "react";
import { proposalContent, proposalTourUrl } from "@/content/proposal";
import { useLanguage } from "../LanguageProvider";

export default function ProposalTour() {
  const { language } = useLanguage();
  const copy = proposalContent[language];
  const container = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "checking" | "loading" | "ready" | "unavailable">("idle");
  useEffect(() => {
    const target = container.current;
    if (!target) return;
    const abort = new AbortController();
    let cancelled = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setPhase("checking");
      void fetch("/api/proposal-tour", { signal: abort.signal, cache: "no-store" })
        .then((response) => response.ok ? response.json() : { allowed: false })
        .then((result) => { if (!cancelled) setPhase(result.allowed === true ? "loading" : "unavailable"); })
        .catch(() => { if (!cancelled) setPhase("unavailable"); });
    }, { rootMargin: "150px" });
    observer.observe(target);
    return () => { cancelled = true; observer.disconnect(); abort.abort(); };
  }, []);
  useEffect(() => {
    if (phase !== "loading") return;
    const timeout = window.setTimeout(() => setPhase("unavailable"), 20000);
    return () => window.clearTimeout(timeout);
  }, [phase]);
  return (
    <div ref={container} className="proposal-tour">
      <div className="proposal-tour-frame" aria-busy={phase === "checking" || phase === "loading"}>
        {(phase === "loading" || phase === "ready") && <iframe
          src={proposalTourUrl} title={copy.tourTitle} loading="lazy" allow="fullscreen; xr-spatial-tracking" allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin" onLoad={() => setPhase("ready")} onError={() => setPhase("unavailable")}
        />}
        {phase !== "ready" && <div className="proposal-tour-status" role="status">
          <span className="proposal-tour-mark" aria-hidden="true">↗</span>
          <p>{phase === "unavailable" ? copy.tourUnavailable : copy.tourLoading}</p>
        </div>}
      </div>
      <div className="proposal-tour-actions">
        <a className="proposal-link" href={proposalTourUrl} target="_blank" rel="noopener noreferrer">{copy.openTour}<span aria-hidden="true">↗</span></a>
        {phase === "ready" && <button type="button" className="proposal-tour-fallback" onClick={() => setPhase("unavailable")}>{copy.tourFallback}</button>}
      </div>
      <p className="proposal-note">{copy.tourNote}</p>
    </div>
  );
}
