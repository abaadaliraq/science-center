"use client";

import { useEffect } from "react";

/** Native, progressive enhancement: content remains visible without JavaScript. */
export default function PresentationMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const hero = document.querySelector<HTMLElement>("[data-parallax]");
    let observer: IntersectionObserver | undefined;
    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      if (!hero || preference.matches || !desktop.matches) return;
      const height = hero.parentElement?.clientHeight ?? 0;
      if (window.scrollY <= height) {
        hero.style.setProperty("--parallax-y", `${Math.min(window.scrollY * 0.07, 40)}px`);
      }
    };
    const onScroll = () => {
      if (!frame && !preference.matches && desktop.matches) frame = requestAnimationFrame(updateParallax);
    };
    const configure = () => {
      observer?.disconnect();
      hero?.style.setProperty("--parallax-y", "0px");
      if (preference.matches || !("IntersectionObserver" in window)) {
        elements.forEach((element) => element.removeAttribute("data-pending"));
        return;
      }
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.removeAttribute("data-pending");
            observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      elements.forEach((element) => {
        // Never hide something the reader can already see, including anchor navigation.
        if (element.getBoundingClientRect().top > window.innerHeight) {
          element.setAttribute("data-pending", "true");
          observer?.observe(element);
        }
      });
      updateParallax();
    };
    configure();
    preference.addEventListener("change", configure);
    desktop.addEventListener("change", configure);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      preference.removeEventListener("change", configure);
      desktop.removeEventListener("change", configure);
      elements.forEach((element) => element.removeAttribute("data-pending"));
    };
  }, []);

  return null;
}
