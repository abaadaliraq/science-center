"use client";

import { useEffect, useRef } from "react";

export default function ProposalCounter({ value }: { value: number }) {
  const element = useRef<HTMLSpanElement>(null);
  const finalValue = String(value).padStart(2, "0");
  useEffect(() => {
    const target = element.current;
    if (!target) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let played = false;
    const finish = () => { cancelAnimationFrame(frame); target.textContent = String(value).padStart(2, "0"); };
    const onPreference = () => { if (preference.matches) finish(); };
    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      if (played || !entries.some((entry) => entry.isIntersecting)) return;
      played = true;
      observer?.disconnect();
      if (preference.matches) return;
      let began: number | undefined;
      const tick = (now: number) => {
        began ??= now;
        const progress = Math.min((now - began) / 900, 1);
        target.textContent = String(Math.round(value * (1 - Math.pow(1 - progress, 3)))).padStart(2, "0");
        if (progress < 1) frame = requestAnimationFrame(tick); else finish();
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: .5 }) : null;
    observer?.observe(target);
    preference.addEventListener("change", onPreference);
    return () => { observer?.disconnect(); preference.removeEventListener("change", onPreference); finish(); };
  }, [value]);
  return <><span className="sr-only">{finalValue}</span><span ref={element} aria-hidden="true" dir="ltr">{finalValue}</span></>;
}
