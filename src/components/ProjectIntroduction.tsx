"use client";

import { useLanguage } from "./LanguageProvider";
import "./ProjectIntroduction.css";

const introduction = {
  ar: {
    label: "تعريف المشروع",
    text: "مشروع مشترك تقدمه مؤسسة مسمار للثقافة والتنمية المستدامة ومؤسسة مصدر للتنمية المستدامة، يهدف إلى إعادة تأهيل القبة الفلكية في متنزه الزوراء ببغداد وتطوير محيطها إلى مركز متكامل لعلوم الفضاء، يجمع بين التعليم والتجارب العلمية التفاعلية والمرافق الترفيهية والخدمية، ضمن رؤية تعزز الاستدامة البيئية والتشغيلية.",
  },
  en: {
    label: "Project introduction",
    text: "A joint initiative by Mismar Foundation for Culture and Sustainable Development and Masdar Foundation for Sustainable Development to rehabilitate Baghdad’s historic planetarium at Al-Zawraa Park and develop its surroundings into an integrated space science center, combining education, interactive scientific experiences, and recreational facilities within an environmentally and operationally sustainable framework.",
  },
} as const;

export default function ProjectIntroduction() {
  const { language } = useLanguage();
  const copy = introduction[language];
  return (
    <section id="project-introduction" className="project-introduction" lang={language} dir={language === "ar" ? "rtl" : "ltr"} aria-label={copy.label}>
      <div className="project-introduction-inner" data-reveal>
        <span className="project-introduction-rule" aria-hidden="true" />
        <p>{copy.text}</p>
      </div>
    </section>
  );
}
