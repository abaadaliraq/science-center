"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const targets = '[data-reveal], .home-banner-visual img, main:not(.home-presentation) img:not(dialog img)';
const ease = "cubic-bezier(.22, 1, .36, 1)";

/** Reveals loaded images and editorial content, including sections streamed after navigation. */
export default function PresentationMotion() {
  const pathname = usePathname();
  const played = useRef(new WeakSet<Element>());

  useEffect(() => {
    if (!("IntersectionObserver" in window) || typeof Element.prototype.animate !== "function") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 701px)");
    const revealed = played.current;
    const animations = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;

    function register(element: Element) {
      if (!element.matches(targets) || revealed.has(element)) return;
      if (element instanceof HTMLImageElement && (!element.complete || !element.naturalWidth)) return;
      observer?.observe(element);
    }

    function registerTree(node: Node) {
      if (!(node instanceof Element)) return;
      register(node);
      node.querySelectorAll(targets).forEach(register);
    }

    function onLoad(event: Event) {
      if (event.target instanceof HTMLImageElement) register(event.target);
    }

    function stop() {
      observer?.disconnect();
      mutations?.disconnect();
      document.removeEventListener("load", onLoad, true);
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    }

    function configure() {
      stop();
      if (reduced.matches) return;

      observer = new IntersectionObserver((entries) => {
        for (const { target, isIntersecting, boundingClientRect } of entries) {
          if (!isIntersecting || revealed.has(target)) continue;
          observer?.unobserve(target);
          revealed.add(target);

          const image = target instanceof HTMLImageElement;
          const horizontal = wide.matches && (image || target.getAttribute("data-reveal") === "slide");
          const side = boundingClientRect.left + boundingClientRect.width / 2 < window.innerWidth / 2 ? -1 : 1;
          const fadeOnly = target.getAttribute("data-reveal") === "fade";
          const from = horizontal ? `translate3d(${side * (image ? 22 : 16)}px, 0, 0)`
            : fadeOnly ? "none" : `translate3d(0, ${image ? 12 : 10}px, 0)`;
          const animation = target.animate(
            [
              { opacity: image ? .58 : .65, transform: image ? `${from} scale(1.045)` : from },
              { opacity: 1, transform: "none" },
            ],
            { duration: image ? 960 : 630, easing: ease },
          );
          animations.add(animation);
          const release = () => animations.delete(animation);
          animation.addEventListener("finish", release, { once: true });
          animation.addEventListener("cancel", release, { once: true });
        }
      }, { threshold: .1 });

      document.querySelectorAll(targets).forEach(register);
      document.addEventListener("load", onLoad, true);
      mutations = new MutationObserver((records) => {
        for (const { addedNodes, removedNodes } of records) {
          addedNodes.forEach(registerTree);
          removedNodes.forEach((node) => {
            if (!(node instanceof Element) || node.isConnected) return;
            observer?.unobserve(node);
            node.querySelectorAll(targets).forEach((element) => observer?.unobserve(element));
          });
        }
      });
      mutations.observe(document.body, { childList: true, subtree: true });
    }

    configure();
    reduced.addEventListener("change", configure);
    return () => {
      stop();
      reduced.removeEventListener("change", configure);
    };
  }, [pathname]);

  return null;
}
