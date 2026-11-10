"use client";

import Image from "next/image";
import { implementationContent } from "@/content/implementation";
import { useLanguage } from "./LanguageProvider";
import "./ProjectIntroduction.css";

const introduction = {
  ar: {
    label: "نبذة عن المشروع",
    title: "إحياء القبة الفلكية وتطوير مركز بغداد لعلوم الفضاء",
    lead: "مبادرة مشتركة من مؤسسة مسمار للثقافة والتنمية المستدامة ومؤسسة مصدر للتنمية المستدامة لإعادة تأهيل القبة الفلكية التاريخية في متنزه الزوراء ببغداد، وتطوير محيطها ليصبح مركزاً متكاملاً لعلوم الفضاء.",
    detail: "يقترح المشروع إعادة العروض الفلكية إلى القبة وتوسيع دورها التعليمي من خلال معارض تفاعلية وتجارب علمية وورش للطلبة والعائلات. ويشمل المقترح مرافق للترفيه وخدمة الزوار، مع مراعاة هوية القبة المعمارية ومتطلبات الاستدامة البيئية والتشغيلية.",
    partners: "الجهات المبادرة",
  },
  en: {
    label: "About the project",
    title: "Revitalizing the planetarium and developing the Baghdad Space Science Center",
    lead: "A joint initiative by Mismar Foundation for Culture and Sustainable Development and Masdar Foundation for Sustainable Development to rehabilitate the historic planetarium at Al-Zawraa Park in Baghdad and develop its surroundings into an integrated space science center.",
    detail: "The proposal would bring astronomy shows back to the dome and expand its educational role through interactive exhibitions, science experiences, and workshops for students and families. It also includes recreational and visitor facilities, with attention to the dome’s architectural identity and long-term environmental and operational sustainability.",
    partners: "Initiating foundations",
  },
} as const;

const foundations = [
  { id: "mismar", site: "www.mismar.ngo", href: "https://www.mismar.ngo/" },
  { id: "masdar", site: "masdarngo.vercel.app", href: "https://masdarngo.vercel.app/" },
] as const;

export default function ProjectIntroduction() {
  const { language } = useLanguage();
  const copy = introduction[language];
  const partners = implementationContent[language];
  return (
    <section id="project-introduction" className="project-introduction" lang={language} dir={language === "ar" ? "rtl" : "ltr"} aria-labelledby="project-introduction-title">
      <div className="project-introduction-inner">
        <div className="project-introduction-copy" data-reveal>
          <p className="project-introduction-label">{copy.label}</p>
          <h2 id="project-introduction-title">{copy.title}</h2>
          <p>{copy.lead}</p>
          <p>{copy.detail}</p>
        </div>
        <div className="project-introduction-foundations" data-reveal="slide">
          <svg className="project-introduction-orbits" viewBox="0 0 280 180" fill="none" aria-hidden="true" focusable="false">
            <g stroke="currentColor" transform="rotate(-28 178 62)">
              <ellipse cx="178" cy="62" rx="113" ry="37" />
              <ellipse cx="178" cy="62" rx="91" ry="59" />
              <ellipse cx="178" cy="62" rx="60" ry="77" />
            </g>
            <g fill="currentColor">
              <circle cx="178" cy="62" r="3" />
              <circle cx="218" cy="115" r="2.5" />
              <circle cx="75" cy="99" r="2" />
            </g>
          </svg>
          <h3>{copy.partners}</h3>
          <ul>
            {foundations.map(({ id, site, href }) => (
              <li key={id}>
                <a href={href}>
                  <span className="project-introduction-mark">
                    <Image src={`/images/logos/${id}-logo.png`} width={52} height={52} alt="" />
                  </span>
                  <span>
                    <strong>{partners[id].name}</strong>
                    <bdi dir="ltr">{site}</bdi>
                  </span>
                  <span className="project-introduction-arrow" aria-hidden="true">
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 15 15 5m-7 0h7v7" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
