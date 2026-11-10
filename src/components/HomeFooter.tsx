"use client";

import Image from "next/image";
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
    top: "العودة إلى الأعلى",
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
    top: "Back to top",
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
            <div className="home-footer-brand">
              <div className="home-footer-marks" aria-hidden="true">
                <Image src="/images/logos/mismar-logo.png" width={42} height={42} alt="" />
                <Image src="/images/logos/masdar-logo.png" width={42} height={42} alt="" />
              </div>
              <h2>{text.name}</h2>
            </div>
            <p>{text.description}</p>
          </div>
          <nav aria-labelledby="home-footer-project">
            <h2 id="home-footer-project">{text.project}</h2>
            <ul>
              <li><Link href="/#history">{text.history}</Link></li>
              <li><Link href="/#project-proposal">{text.proposal}</Link></li>
              <li><Link href="/#operations">{text.operations}</Link></li>
            </ul>
          </nav>
          <nav aria-labelledby="home-footer-studies">
            <h2 id="home-footer-studies">{text.studies}</h2>
            <ul>
              <li><Link href="/#financial-feasibility">{text.feasibility}</Link></li>
              <li><Link href="/project-proposal#proposal-planning-title">{text.sustainability}</Link></li>
              <li><Link href="/#implementation-partnerships">{text.implementation}</Link></li>
            </ul>
          </nav>
          <div className="home-footer-foundations">
            <h2>{text.foundations}</h2>
            <ul><li>{mismar.name}</li><li>{masdar.name}</li></ul>
          </div>
        </div>

        <div className="home-footer-meta">
          <p className="home-footer-copyright"><bdi lang="en" dir="ltr">© 2026 Baghdad Space Science Center — Project Proposal</bdi></p>
          <a className="home-footer-credit" href="https://www.abaad-aliraq.com/" lang="en" dir="ltr">
            <Image src="/images/logos/abaad-aliraq-logo.png" width={28} height={28} alt="" />
            <span>by <strong>abaad aliraq</strong></span>
          </a>
          <a className="home-footer-top" href="#main-content">{text.top}</a>
        </div>
      </div>
    </footer>
  );
}
