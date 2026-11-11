"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { restorePresentationScroll } from "./HistoryLink";

const cover = ":is(.history-detail-hero, .proposal-hero, .operations-hero, .feasibility-hero, .implementation-hero)";
const split = ":is(.home-section-banner, .operations-block, .proposal-vision-grid, .proposal-walkway)";
const cards = ":is(.proposal-indicator-grid, .operations-kpi-grid, .operations-cards, .operations-revenue-sources, .feasibility-kpis, .implementation-technology-grid, .implementation-timeline, .implementation-decisions, .history-gallery-grid) > *";
const rule = ":is(.section-rule, .proposal-rule, .home-banner-rule)";
const images = "main img:not(#cover img, dialog img)";
const depth = ':is(.home-banner-number, [data-proposal-parallax="true"])';
const targets = [
  "[data-reveal]", "[data-proposal-reveal]", "#main-content :is(h2,h3)", images, cover, split, cards, rule, depth,
  ".feasibility-table-scroll tbody tr", ".feasibility-cash-chart", ".feasibility-budget", ".implementation-structure", ".operations-org", ".home-footer-decoration",
].join(", ");
const easing = "cubic-bezier(.22, 1, .36, 1)";

export default function PresentationMotion() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const played = useRef(new WeakSet<Element>());

  useEffect(() => {
    const previous = previousPath.current;
    previousPath.current = pathname;
    const cancelRestore = restorePresentationScroll(pathname);
    if (!("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") return cancelRestore;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 900px)");
    const revealed = played.current;
    let dispose = () => {};

    function configure() {
      dispose();
      if (reduced.matches) return;

      const running = new Set<Animation>();
      const depths = new Map<Element, () => void>();
      let disposed = false;
      let parallaxModules: Promise<[typeof import("gsap"), typeof import("gsap/ScrollTrigger")]> | undefined;

      function animate(element: Element | null, frames: Keyframe[], duration: number, delay = 0) {
        if (!element) return;
        const animation = element.animate(frames, { duration, delay, easing, fill: "backwards" });
        running.add(animation);
        const release = () => running.delete(animation);
        animation.addEventListener("finish", release, { once: true });
        animation.addEventListener("cancel", release, { once: true });
      }

      function fade(element: Element | null, x = 0, y = 16, delay = 0, opacity = .48) {
        animate(element, [{ opacity, translate: x + "px " + y + "px" }, { opacity: 1, translate: "0 0" }], 660, delay);
      }

      function addDepth(element: Element) {
        if (!wide.matches || depths.has(element)) return;
        const number = element.matches(".home-banner-number");
        const trigger = number ? element.closest(".home-section-banner") : element.parentElement;
        if (!trigger) return;
        parallaxModules ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
        void parallaxModules.then(([{ gsap }, { ScrollTrigger }]) => {
          if (disposed || !wide.matches || !element.isConnected || depths.has(element)) return;
          gsap.registerPlugin(ScrollTrigger);
          const context = gsap.context(() => {
            gsap.fromTo(element, { y: number ? -10 : -5, scale: number ? 1 : 1.025 }, {
              y: number ? 10 : 5, ease: "none",
              scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: .7 },
            });
          });
          depths.set(element, () => context.revert());
        }).catch(() => { /* Content remains in its original position. */ });
      }

      const observer = new IntersectionObserver((entries) => {
        const groups = new Map<Element, number>();
        for (const { target, isIntersecting, boundingClientRect } of entries) {
          const banner = target.matches(".home-section-banner");
          if (banner) target.toggleAttribute("data-motion-visible", isIntersecting);
          if (!isIntersecting || revealed.has(target)) continue;
          if (!banner) observer.unobserve(target);
          if (target.matches(depth)) { addDepth(target); continue; }
          revealed.add(target);
          const side = boundingClientRect.left + boundingClientRect.width / 2 < window.innerWidth / 2 ? -1 : 1;
          const group = target.parentElement;
          const index = group ? groups.get(group) ?? 0 : 0;
          if (group) groups.set(group, index + 1);
          const delay = Math.min(index, 4) * 55;

          if (target.matches(cover)) {
            const title = target.querySelector("h1");
            fade(title, 0, 19, 75);
            fade(target.querySelector("a"), 0, 8, 20, .65);
            animate(target.querySelector(".detail-cover-number"), [{ opacity: .12 }, { opacity: 1 }], 980, 100);
            animate(target.querySelector("img"), [{ scale: 1.045 }, { scale: 1 }], 1250);
          } else if (target.matches(split)) {
            const panel = target.querySelector(".home-banner-content, .operations-block-copy, .proposal-vision-grid > :first-child, .proposal-component-copy");
            const artwork = target.querySelector(".home-banner-visual, .operations-block-visual, .proposal-vision-image, .proposal-component-image");
            const artworkBounds = artwork?.getBoundingClientRect();
            const artworkSide = artworkBounds && artworkBounds.left + artworkBounds.width / 2 < window.innerWidth / 2 ? -1 : 1;
            animate(artwork, [{ opacity: .55, translate: (wide.matches ? artworkSide * 14 : 0) + "px 0", scale: 1.035 }, { opacity: 1, translate: "0 0", scale: 1 }], 920);
            animate(target.querySelector(".home-banner-number"), [{ opacity: .1 }, { opacity: 1 }], 1000, 80);
            fade(panel, wide.matches ? -artworkSide * 18 : 0, 13, 135);
          } else if (target.matches(rule)) {
            animate(target, [{ scale: ".15 1", opacity: .55 }, { scale: "1 1", opacity: 1 }], 760, 140);
          } else if (target.matches(images)) {
            animate(target, [{ opacity: .68, scale: 1.042, translate: (wide.matches ? side * 7 : 0) + "px 0" }, { opacity: 1, scale: 1, translate: "0 0" }], 850);
          } else if (target.matches(".feasibility-table-scroll tbody tr")) {
            animate(target, [{ opacity: .66 }, { opacity: 1 }], 420, delay);
          } else if (target.matches(".feasibility-cash-chart, .feasibility-budget, .implementation-structure, .operations-org, .home-footer-decoration")) {
            animate(target, [{ opacity: .25, translate: "0 12px" }, { opacity: 1, translate: "0 0" }], 900);
          } else {
            const horizontal = wide.matches && target.getAttribute("data-reveal") === "slide";
            fade(target, horizontal ? side * 18 : 0, target.getAttribute("data-reveal") === "fade" ? 0 : 15, delay);
          }
        }
      }, { rootMargin: "0px 0px -12px 0px" });

      function register(element: Element) {
        if (!element.matches(targets) || element.closest("dialog")) return;
        if (revealed.has(element) && !element.matches(".home-section-banner")) return;
        if (element.matches(depth) && !wide.matches) return;
        if (element.matches(".feasibility-block, .feasibility-inner")) return;
        if (element.matches("h2, h3") && !element.matches("[data-reveal], [data-proposal-reveal]") &&
          element.parentElement?.closest("[data-reveal], [data-proposal-reveal]") &&
          !element.closest(".feasibility-page")) return;
        if (element.matches(images) && element instanceof HTMLImageElement && (!element.complete || !element.naturalWidth)) return;
        if (!element.matches(cover) && element.closest(cover)) return;
        if (!element.matches(split) && element.closest(split) && !element.matches(rule + ", " + depth + ", " + cards)) return;
        observer.observe(element);
      }

      function registerTree(node: Node) {
        if (!(node instanceof Element)) return;
        register(node);
        node.querySelectorAll(targets).forEach(register);
      }

      function unregisterTree(node: Node) {
        if (!(node instanceof Element) || node.isConnected) return;
        observer.unobserve(node);
        node.querySelectorAll(targets).forEach((element) => observer.unobserve(element));
        for (const [element, revert] of depths) {
          if (node.contains(element)) { revert(); depths.delete(element); }
        }
      }

      const onLoad = (event: Event) => {
        if (event.target instanceof HTMLImageElement) register(event.target);
      };
      const mutations = new MutationObserver((records) => {
        for (const { addedNodes, removedNodes } of records) {
          addedNodes.forEach(registerTree);
          removedNodes.forEach(unregisterTree);
        }
      });

      document.querySelectorAll(targets).forEach(register);
      mutations.observe(document.body, { childList: true, subtree: true });
      document.addEventListener("load", onLoad, true);

      if (previous !== pathname) {
        animate(document.getElementById("main-content"), [{ opacity: .84 }, { opacity: 1 }], 260);
      }

      dispose = () => {
        disposed = true;
        observer.disconnect();
        mutations.disconnect();
        document.removeEventListener("load", onLoad, true);
        running.forEach((animation) => animation.cancel());
        depths.forEach((revert) => revert());
        document.querySelectorAll("[data-motion-visible]").forEach((element) => element.removeAttribute("data-motion-visible"));
      };
    }

    configure();
    reduced.addEventListener("change", configure);
    wide.addEventListener("change", configure);
    return () => {
      dispose();
      cancelRestore?.();
      reduced.removeEventListener("change", configure);
      wide.removeEventListener("change", configure);
    };
  }, [pathname]);

  return null;
}
