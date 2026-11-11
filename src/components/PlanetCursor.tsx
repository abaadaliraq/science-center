"use client";

import { useEffect, useId, useRef } from "react";

const nativeCursor = 'iframe, video[controls], dialog[open], textarea, select, input:not([type="button"], [type="submit"], [type="checkbox"], [type="radio"])';
const controls = 'a[href], button:not(:disabled), summary, [role="button"], input:is([type="button"],[type="submit"],[type="checkbox"],[type="radio"])';

export default function PlanetCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLSpanElement>(null);
  const gradient = useId();

  useEffect(() => {
    const planet = cursor.current;
    const ripple = halo.current;
    if (!planet || !ripple) return;
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;
    let pulse: Animation | undefined;

    function hide() {
      cancelAnimationFrame(frame);
      frame = 0;
      root.classList.remove("planet-cursor-active");
      planet!.hidden = true;
      pulse?.cancel();
    }

    function move(event: PointerEvent) {
      const target = event.target;
      if (!pointer.matches || event.pointerType !== "mouse" || !(target instanceof Element) ||
        target.closest(nativeCursor) || (target instanceof HTMLElement && target.isContentEditable)) {
        hide();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      planet!.toggleAttribute("data-interactive", Boolean(target.closest(controls)));
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0;
        planet!.style.translate = x + "px " + y + "px";
        planet!.hidden = false;
        root.classList.add("planet-cursor-active");
      });
    }

    function press(event: PointerEvent) {
      if (event.pointerType !== "mouse") { hide(); return; }
      if (event.button !== 0 || planet!.hidden || typeof ripple!.animate !== "function") return;
      pulse?.cancel();
      pulse = ripple!.animate([{ opacity: .85, scale: .8 }, { opacity: 0, scale: 1.65 }], { duration: 350, easing: "ease-out" });
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget || (event.relatedTarget instanceof Element && event.relatedTarget.closest("iframe"))) hide();
    }

    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", press, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", hide);
    pointer.addEventListener("change", hide);
    return () => {
      hide();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", hide);
      pointer.removeEventListener("change", hide);
    };
  }, []);

  return (
    <div className="planet-cursor-layer" aria-hidden="true">
      <div ref={cursor} className="planet-cursor" hidden>
        <span ref={halo} className="planet-cursor-pulse" />
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <defs>
          <radialGradient id={gradient} cx=".33" cy=".27" r=".75">
            <stop stopColor="#c5d8ff" />
            <stop offset=".55" stopColor="#7185c1" />
            <stop offset="1" stopColor="#42335f" />
          </radialGradient>
        </defs>
        <circle cx="16" cy="16" r="9.5" fill={`url(#${gradient})`} stroke="#c2c9ee" strokeWidth=".6" />
        <g className="planet-cursor-orbit">
          <ellipse cx="16" cy="16" rx="14" ry="4.6" stroke="#e7cb91" strokeWidth="1" strokeDasharray="25 35" />
          <path d="M2 16a14 4.6 0 0 0 28 0" stroke="#f2dbad" strokeWidth="1.1" />
        </g>
        </svg>
      </div>
    </div>
  );
}
