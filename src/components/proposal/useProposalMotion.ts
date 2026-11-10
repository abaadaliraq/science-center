"use client";

import { useEffect, type RefObject } from "react";

export default function useProposalMotion(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !("IntersectionObserver" in window)) return;
    let cancelled = false;
    let revert = () => {};
    let resize: ResizeObserver | undefined;
    let refreshFrame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          root.querySelectorAll<HTMLElement>("[data-proposal-reveal]").forEach((element) => {
            gsap.fromTo(element, { y: 15, opacity: .65 }, {
              y: 0, opacity: 1, duration: .72, ease: "power3.out", immediateRender: false,
              clearProps: "opacity,transform", scrollTrigger: { trigger: element, start: "top bottom-=30", once: true },
            });
          });
        }, root);
        media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
          root.querySelectorAll<HTMLElement>('[data-proposal-parallax="true"]').forEach((element) => {
            gsap.fromTo(element, { yPercent: -1, scale: 1.025 }, { yPercent: 1, scale: 1.025, ease: "none", scrollTrigger: { trigger: element.parentElement, start: "top bottom", end: "bottom top", scrub: .9 } });
          });
        }, root);
        revert = () => media.revert();
        resize = new ResizeObserver(() => {
          cancelAnimationFrame(refreshFrame);
          refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
        resize.observe(root);
        void document.fonts.ready.then(() => { if (!cancelled) ScrollTrigger.refresh(); });
      }).catch(() => { /* All content remains available without the optional effects. */ });
    }, { rootMargin: "150px" });
    observer.observe(root);
    return () => { cancelled = true; observer.disconnect(); resize?.disconnect(); cancelAnimationFrame(refreshFrame); revert(); };
  }, [ref]);
}
