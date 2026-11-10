"use client";

import { useEffect, type RefObject } from "react";

/** Stagger the copy inside homepage banners. Images reveal when their files load. */
export default function useHomeBannerMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let revert = () => {};
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void import("gsap").then(({ gsap }) => {
        if (cancelled) return;
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const panel = root.querySelector(".home-banner-panel")?.getBoundingClientRect();
          const wide = window.matchMedia("(min-width: 701px)").matches;
          const side = panel && panel.left + panel.width / 2 < window.innerWidth / 2 ? -1 : 1;
          gsap.fromTo(root.querySelectorAll("[data-home-banner-enter]"), { x: wide ? side * 16 : 0, y: wide ? 5 : 10, opacity: .58 }, {
            x: 0, y: 0, opacity: 1, duration: .72, stagger: .075, ease: "power3.out", clearProps: "opacity,transform",
          });
        }, root);
        revert = () => media.revert();
      }).catch(() => { /* The static layout remains fully readable. */ });
    }, { threshold: .12 });
    observer.observe(root);
    return () => { cancelled = true; observer.disconnect(); revert(); };
  }, [ref]);
}
