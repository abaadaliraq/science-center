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
      <div className="project-introduction-inner" data-reveal>
        <div className="project-introduction-copy">
          <p className="project-introduction-label">{copy.label}</p>
          <h2 id="project-introduction-title">{copy.title}</h2>
          <p>{copy.lead}</p>
          <p>{copy.detail}</p>
        </div>
        <div className="project-introduction-foundations">
          <h3>{copy.partners}</h3>
          <ul>
            {foundations.map(({ id, site, href }) => (
              <li key={id}>
                <a href={href}>
                  <Image src={`/images/logos/${id}-logo.png`} width={48} height={48} alt="" />
                  <span>
                    <strong>{partners[id].name}</strong>
                    <bdi dir="ltr">{site}</bdi>
                  </span>
                  <span className="project-introduction-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
