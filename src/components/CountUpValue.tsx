"use client";

import { useEffect, useRef } from "react";

/** Animate a value or both range endpoints, keeping final text available without JavaScript. */
export default function CountUpValue({ start, end }: { start: number; end?: number }) {
  const element = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const target = element.current;
    if (!target) return;
    const finalValue = end === undefined ? `${start}` : `${start}–${end}`;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let played = false;

    const finish = () => {
      cancelAnimationFrame(frame);
      target.textContent = finalValue;
    };
    const onPreferenceChange = () => {
      if (preference.matches) finish();
    };
    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      if (played || !entries.some((entry) => entry.isIntersecting)) return;
      played = true;
      observer?.disconnect();
      if (preference.matches) return;
      let began: number | undefined;
      const tick = (now: number) => {
        began ??= now;
        const progress = Math.min((now - began) / 1000, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        target.textContent = end === undefined ? `${Math.round(start * eased)}` : `${Math.round(start * eased)}–${Math.round(end * eased)}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
        else finish();
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.5 }) : null;

    observer?.observe(target);
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", onPreferenceChange);
      finish();
    };
  }, [start, end]);

  const value = end === undefined ? String(start) : start + "–" + end;
  return (
    <span className="motion-number" aria-hidden="true" dir="ltr">
      <span>{value}</span><span ref={element}>{value}</span>
    </span>
  );
}
