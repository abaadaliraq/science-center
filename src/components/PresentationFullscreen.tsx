"use client";

import { useState, useSyncExternalStore } from "react";
import { useLanguage } from "./LanguageProvider";

function subscribe(onChange: () => void) {
  document.addEventListener("fullscreenchange", onChange);
  return () => document.removeEventListener("fullscreenchange", onChange);
}

function fullscreenState() {
  if (!document.fullscreenEnabled || typeof document.documentElement.requestFullscreen !== "function") return "unavailable";
  return document.fullscreenElement === document.documentElement ? "active" : "ready";
}

const serverState = () => "unavailable" as const;

export default function PresentationFullscreen() {
  const { language } = useLanguage();
  const state = useSyncExternalStore(subscribe, fullscreenState, serverState);
  const [failed, setFailed] = useState(false);
  const arabic = language === "ar";
  if (state === "unavailable") return null;

  const active = state === "active";
  const labels = arabic
    ? { enter: "عرض المشروع بملء الشاشة", exit: "الخروج من ملء الشاشة", error: "تعذّر تبديل وضع ملء الشاشة." }
    : { enter: "View project fullscreen", exit: "Exit fullscreen", error: "Could not switch fullscreen mode." };
  const label = active ? labels.exit : labels.enter;

  async function toggleFullscreen() {
    setFailed(false);
    try {
      if (active) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      setFailed(true);
    }
  }

  return (
    <div className="presentation-fullscreen">
      <button type="button" aria-label={label} title={label} onClick={toggleFullscreen}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={active ? "M9 3v6H3m12-6v6h6M3 15h6v6m12-6h-6v6" : "M3 9V3h6m6 0h6v6M3 15v6h6m6 0h6v-6"} />
        </svg>
      </button>
      {failed && <p role="status">{labels.error}</p>}
    </div>
  );
}
