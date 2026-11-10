"use client";

import { useEffect, type RefObject } from "react";

export default function useHistoryEntrance(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let revert = () => {};
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      void import("gsap").then(({ gsap }) => {
        if (cancelled) return;
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const text = root.querySelectorAll("[data-editorial-enter]");
          const images = root.querySelectorAll("[data-editorial-image]");
          if (text.length) gsap.fromTo(text, { opacity: .8, y: 12 }, {
            opacity: 1, y: 0, duration: .65, stagger: .08, ease: "power2.out", clearProps: "opacity,transform",
          });
          if (images.length) gsap.fromTo(images, { scale: 1.025 }, {
            scale: 1, duration: 1.2, ease: "power2.out", clearProps: "transform",
          });
        }, root);
        revert = () => media.revert();
      }).catch(() => { /* The unanimated content remains available. */ });
    }, { threshold: .1 });
    observer.observe(root);
    return () => { cancelled = true; observer.disconnect(); revert(); };
  }, [ref]);
}
