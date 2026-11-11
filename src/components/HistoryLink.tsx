"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useRef, type ReactNode } from "react";

type ReturnPosition = { anchor: string; pathname: string; offset: number };
let lastPosition: ReturnPosition | undefined;
let pendingPosition: ReturnPosition | undefined;

export function restorePresentationScroll(pathname: string) {
  if (!pendingPosition) return;
  const position = pendingPosition;
  pendingPosition = undefined;
  if (pathname !== "/") return;
  const frame = requestAnimationFrame(() => {
    const banner = document.getElementById(position.anchor);
    if (banner) window.scrollBy({ top: banner.getBoundingClientRect().top - position.offset, behavior: "instant" });
  });
  return () => cancelAnimationFrame(frame);
}

export default function HistoryLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const link = useRef<HTMLAnchorElement>(null);

  return (
    <Link ref={link} href={href} className={className} onNavigate={(event) => {
      const position = lastPosition;
      if (position?.pathname === pathname && href === "/#" + position.anchor) {
        event.preventDefault();
        pendingPosition = position;
        lastPosition = undefined;
        router.push(href, { scroll: false });
      } else if (pathname === "/" && href.startsWith("/") && !href.startsWith("/#")) {
        const banner = link.current?.closest(".home-section-banner");
        if (banner) lastPosition = {
          anchor: banner.id,
          pathname: new URL(href, window.location.href).pathname,
          offset: banner.getBoundingClientRect().top,
        };
      }
    }}>{children}</Link>
  );
}
