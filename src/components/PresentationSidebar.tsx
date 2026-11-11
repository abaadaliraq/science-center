"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLanguage } from "./LanguageProvider";
import "./PresentationSidebar.css";

const sustainabilityAnchor = "proposal-planning-title";
const sections = [
  { id: "cover", icon: "M3 11 12 3l9 8M5 10v10h5v-6h4v6h5V10", ar: "الرئيسية", en: "Home" },
  { id: "history", icon: "M3 20h18M5 20v-4h14v4M5 16a7 7 0 0 1 14 0M12 9V6m-2 0h4", page: "/planetarium-history", ar: "القبة الفلكية | الإرث وفرصة الإحياء", en: "The Planetarium | Legacy and Opportunity" },
  { id: "project-proposal", icon: "M20 6H4v12h16zM8 6V3m8 15v3M8 10h8m-8 4h5", page: "/project-proposal", ar: "المشروع المقترح", en: "The Proposed Project" },
  { id: "operations", icon: "M5 3v4m0 4v10M12 3v10m0 4v4M19 3v2m0 4v12M2 7h6v4H2zm7 6h6v4H9zm7-8h6v4h-6z", page: "/operations", ar: "نموذج التشغيل والإدارة", en: "Operating and Management Model" },
  { id: "financial-feasibility", icon: "M4 4v16h16M8 15l4-4 3 2 5-6m-4 0h4v4", page: "/financial-feasibility", ar: "دراسة الجدوى المالية", en: "Financial Feasibility Study" },
  { id: sustainabilityAnchor, icon: "M20 4c-8 0-14 2-14 9a5 5 0 0 0 5 5c7 0 9-6 9-14ZM4 20l9-9", page: "/project-proposal", ar: "الأثر التنموي والاستدامة", en: "Development Impact and Sustainability" },
  { id: "implementation-partnerships", icon: "M10 13a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-2 2m2 6a4 4 0 0 0-6 0l-4 4a4 4 0 0 0 6 6l2-2", page: "/implementation-partnerships", ar: "استراتيجية التنفيذ والشراكات", en: "Implementation Strategy and Partnerships" },
] as const;

function SidebarIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export default function PresentationSidebar() {
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const [active, setActive] = useState("cover");
  const [expanded, setExpanded] = useState(true);
  const toggle = useRef<HTMLButtonElement>(null);
  const home = pathname === "/";
  const pageSection = sections.find(section => "page" in section && section.page === pathname)?.id;
  const arabic = language === "ar";

  useEffect(() => {
    if (!home && pathname !== "/project-proposal") return;

    let frame = 0;
    function update() {
      frame = 0;
      const readingLine = window.innerHeight * 0.4;
      if (!home) {
        const planning = document.getElementById(sustainabilityAnchor);
        setActive(planning && planning.getBoundingClientRect().top <= readingLine ? sustainabilityAnchor : "project-proposal");
        return;
      }

      let current: string = "cover";
      for (const section of sections) {
        if (section.id === sustainabilityAnchor) continue;
        const target = document.getElementById(section.id);
        if (target && target.getBoundingClientRect().top <= readingLine) current = section.id;
      }
      const scrollEnd = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollEnd > 0 && window.scrollY >= scrollEnd - 2 && document.getElementById("implementation-partnerships")) {
        current = "implementation-partnerships";
      }
      setActive(current);
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update);
    }

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const main = document.getElementById("main-content");
    const observer = new ResizeObserver(schedule);
    if (main) observer.observe(main);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [home, pathname]);

  const current = home || (pathname === "/project-proposal" && active === sustainabilityAnchor) ? active : pageSection;

  return (
    <nav
      className="presentation-sidebar"
      aria-label={arabic ? "أقسام العرض" : "Presentation sections"}
      data-expanded={expanded}
      onKeyDown={(event) => {
        if (event.key !== "Escape" || !expanded) return;
        event.preventDefault();
        setExpanded(false);
        toggle.current?.focus();
      }}
    >
      <button
        ref={toggle}
        type="button"
        className="presentation-sidebar-toggle"
        aria-expanded={expanded}
        aria-controls="presentation-sidebar-links"
        aria-label={arabic ? (expanded ? "طي قائمة الأقسام" : "فتح قائمة الأقسام") : (expanded ? "Collapse sections" : "Expand sections")}
        onClick={() => setExpanded(!expanded)}
      >
        <SidebarIcon path="M4 7h16M4 12h16M4 17h16" />
      </button>
      <div className="presentation-sidebar-collapse" inert={!expanded}>
        <div className="presentation-sidebar-content" id="presentation-sidebar-links">
          <ul>
            {sections.map((section, index) => {
              const planning = section.id === sustainabilityAnchor;
              const samePage = planning ? pathname === "/project-proposal" : home;
              const hash = "#" + section.id;
              const href = samePage ? hash : (planning ? "/project-proposal" : "/") + hash;
              return (
                <li key={section.id} style={{ "--sidebar-order": index } as CSSProperties}>
                  <Link href={href} aria-label={section[language]} aria-current={current === section.id ? "location" : undefined}>
                    <SidebarIcon path={section.icon} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <button type="button" aria-label={arabic ? "التبديل إلى الإنجليزية" : "Switch to Arabic"}
            onClick={() => setLanguage(arabic ? "en" : "ar")}>
            <SidebarIcon path="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
          </button>
        </div>
      </div>
    </nav>
  );
}