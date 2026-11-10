"use client";

import Link from "next/link";
import { implementationContent } from "@/content/implementation";
import { useLanguage } from "./LanguageProvider";
import "./HomeFooter.css";

const copy = {
  ar: {
    name: "مجمع بغداد لعلوم الفضاء",
    description: "مقترح لإحياء القبة الفلكية التاريخية وتطوير وجهة متكاملة للتعليم والاستكشاف العلمي في بغداد.",
    project: "المشروع",
    studies: "الدراسات",
    foundations: "الجهات المقدمة",
    history: "نبذة عن القبة",
    proposal: "المشروع المقترح",
    operations: "نموذج التشغيل والإدارة",
    feasibility: "دراسة الجدوى المالية",
    sustainability: "الأثر التنموي والاستدامة",
    implementation: "استراتيجية التنفيذ والشراكات",
  },
  en: {
    name: "Baghdad Space Science Center",
    description: "A proposal to revitalize the historic planetarium and develop a destination for science education and exploration in Baghdad.",
    project: "The Project",
    studies: "Studies",
    foundations: "Presented By",
    history: "About the Planetarium",
    proposal: "Proposed Project",
    operations: "Operations and Management",
    feasibility: "Financial Feasibility Study",
    sustainability: "Development Impact and Sustainability",
    implementation: "Implementation Strategy and Partnerships",
  },
};

export default function HomeFooter() {
  const { language } = useLanguage();
  const text = copy[language];
  const { mismar, masdar } = implementationContent[language];

  return (
    <footer className="home-footer">
      <div className="home-footer-inner">
        <div className="home-footer-columns">
          <div className="home-footer-intro">
            <h2>{text.name}</h2>
            <p>{text.description}</p>
          </div>
          <nav aria-labelledby="home-footer-project">
            <h2 id="home-footer-project">{text.project}</h2>
            <ul>
              <li><Link href="#history">{text.history}</Link></li>
              <li><Link href="#project-proposal">{text.proposal}</Link></li>
              <li><Link href="#operations">{text.operations}</Link></li>
            </ul>
          </nav>
          <nav aria-labelledby="home-footer-studies">
            <h2 id="home-footer-studies">{text.studies}</h2>
            <ul>
              <li><Link href="#financial-feasibility">{text.feasibility}</Link></li>
              <li><Link href="/project-proposal#proposal-planning-title">{text.sustainability}</Link></li>
              <li><Link href="#implementation-partnerships">{text.implementation}</Link></li>
            </ul>
          </nav>
          <div className="home-footer-foundations">
            <h2>{text.foundations}</h2>
            <ul><li>{mismar.name}</li><li>{masdar.name}</li></ul>
          </div>
        </div>

        <p className="home-footer-copyright"><bdi lang="en" dir="ltr">© 2026 Baghdad Space Science Center — Project Proposal</bdi></p>
        <svg className="home-footer-wordmark" viewBox="0 0 1200 106" aria-hidden="true" focusable="false">
          <text x="6" y="86" textLength="1188" lengthAdjust="spacingAndGlyphs">BAGHDAD SPACE SCIENCE CENTER</text>
        </svg>
      </div>
    </footer>
  );
}
