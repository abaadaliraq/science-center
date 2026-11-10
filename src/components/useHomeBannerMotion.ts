"use client";

import { useEffect, type RefObject } from "react";

/** Used only by the homepage banners; inner-page effects remain unchanged. */
export default function useHomeBannerMotion(ref: RefObject<HTMLElement | null>) {
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
          gsap.fromTo(root.querySelector("[data-home-banner-image]"), {
            scale: 1.025, opacity: .8,
          }, { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out", clearProps: "transform,opacity" });
          gsap.fromTo(root.querySelectorAll("[data-home-banner-enter]"), { y: 12, opacity: .6 }, { y: 0, opacity: 1, duration: .8, stagger: .09, ease: "power2.out", clearProps: "opacity,transform" });
        }, root);
        revert = () => media.revert();
      }).catch(() => { /* The static layout remains fully readable. */ });
    }, { threshold: .12 });
    observer.observe(root);
    return () => { cancelled = true; observer.disconnect(); revert(); };
  }, [ref]);
}
