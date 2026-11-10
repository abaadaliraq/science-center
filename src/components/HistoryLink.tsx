"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

export default function HistoryLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const router = useRouter();
  const link = useRef<HTMLAnchorElement>(null);
  const busy = useRef(false);
  const mounted = useRef(true);
  const cleanup = useRef(() => {});
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; cleanup.current(); }; }, []);
  return (
    <Link ref={link} href={href} className={className} onNavigate={(event) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      event.preventDefault();
      if (busy.current) return;
      busy.current = true;
      const root = link.current?.closest<HTMLElement>("[data-history-transition]");
      const navigate = () => { router.push(href); busy.current = false; };
      if (!root) { navigate(); return; }
      void import("gsap").then(({ gsap }) => {
        if (!mounted.current) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { navigate(); return; }
        const tween = gsap.to(root, { opacity: .65, duration: .18, ease: "power1.out", onComplete: () => {
          navigate();
          gsap.set(root, { clearProps: "opacity" });
        } });
        cleanup.current = () => { tween.kill(); root.style.removeProperty("opacity"); };
      }).catch(() => { if (mounted.current) navigate(); });
    }}>{children}</Link>
  );
}
