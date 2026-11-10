export const operationsImages = {
  cover: "section-cover.jpg",
  hero: "hero.jpg",
  programs: "programs.jpg",
  revenue: "revenue.jpg",
  costs: "costs.jpg",
  sustainability: "sustainability.jpg",
} as const;

export type OperationsImage = keyof typeof operationsImages;
export type OperationsAssets = Partial<Record<OperationsImage, string>>;

export const operationsContent = {
  ar: {
    sectionTitle: "نموذج التشغيل والإدارة | استدامة ما بعد التنفيذ",
    summary: "يعتمد المشروع على نموذج تشغيلي يجمع بين الإدارة المؤسسية والشراكات العلمية والاستثمار في المرافق والخدمات، بهدف ضمان استمرارية الأنشطة التعليمية والثقافية وتحقيق إيرادات تدعم تشغيل مجمع بغداد لعلوم الفضاء وصيانته وتطويره.",
    explore: "استكشف التفاصيل",
    pageTitle: "نموذج تشغيل مستدام لمجمع بغداد لعلوم الفضاء",
    back: "العودة إلى قسم التشغيل والإدارة",
    imagePending: "الصورة غير متاحة حالياً",
    governance: {
      title: "الهيكل الإداري والتشغيلي",
      oversight: "جهة حكومية مختصة للإشراف والرقابة وفق الصلاحيات القانونية",
      management: "إدارة تشغيلية متخصصة للمجمع",
      partners: ["شراكات علمية مع الجامعات والمؤسسات التعليمية", "مشغّلون متخصصون للمرافق التجارية والخدمية"],
      note: "هيكل مقترح. تُحدَّد الجهة المشرفة والأدوار والصلاحيات وفق الإطار القانوني والاتفاقات المعتمدة.",
    },
    programs: {
      title: "آلية التشغيل",
      items: [
        "عروض فلكية مجدولة يومياً.",
        "زيارات مدرسية وجامعية منظمة بالحجز المسبق.",
        "برامج علمية وورش تعليمية.",
        "عروض مسرح القمر والفعاليات الثقافية.",
        "تشغيل المعارض والمرافق التجارية وفق جداول مستقلة.",
      ],
    },
    revenue: {
      title: "مصادر الإيرادات",
      hub: "إيرادات المجمع",
      items: [
        "تذاكر الدخول والعروض.",
        "الاشتراكات والبرامج التعليمية.",
        "تأجير المساحات وتنظيم الفعاليات.",
        "عوائد الكافيهات والمتاجر.",
        "الرعاية المؤسسية والشراكات التجارية.",
      ],
    },
    costs: {
      title: "المصاريف التشغيلية",
      items: [
        "الرواتب والكوادر المتخصصة.",
        "الطاقة والتكييف والخدمات.",
        "الصيانة الدورية والتجهيزات التقنية.",
        "تحديث المحتوى العلمي والتراخيص.",
        "الأمن والنظافة والتأمين والإدارة.",
      ],
    },
    sustainability: {
      title: "الاستدامة التشغيلية",
      items: [
        "تخصيص ميزانية سنوية للصيانة والتحديث.",
        "تنويع الإيرادات لتقليل الاعتماد على التذاكر.",
        "عقود تشغيل وصيانة واضحة.",
        "برامج تعليمية مستمرة بالشراكة مع المؤسسات الأكاديمية.",
        "متابعة الأداء المالي والتشغيلي بمؤشرات قابلة للقياس.",
      ],
    },
    kpi: {
      title: "مؤشرات الأداء المقترحة",
      note: "تُقاس هذه المؤشرات بعد بدء التشغيل.",
      items: [
        "عدد الزوار السنوي",
        "معدل إشغال العروض",
        "نسبة تغطية الإيرادات للمصاريف التشغيلية",
        "رضا الزوار والمؤسسات التعليمية",
      ],
    },
  },
  en: {
    sectionTitle: "Operations and Management | Long-Term Sustainability",
    summary: "The project combines institutional management, scientific partnerships, and investment in facilities and services to sustain educational and cultural programming. Revenue would support the operation, maintenance, and development of the Baghdad Space Science Complex.",
    explore: "Explore the details",
    pageTitle: "A Sustainable Operating Model for the Baghdad Space Science Complex",
    back: "Back to operations and management",
    imagePending: "Image currently unavailable",
    governance: {
      title: "Management and Operating Structure",
      oversight: "A competent government body for oversight and regulation within its legal remit",
      management: "A dedicated operations team for the complex",
      partners: ["Scientific partnerships with universities and educational institutions", "Specialist operators for commercial facilities and services"],
      note: "Proposed structure. The supervising body, roles, and powers would be defined by the legal framework and approved agreements.",
    },
    programs: {
      title: "Operating Schedule and Programs",
      items: [
        "Astronomy shows scheduled daily.",
        "School and university visits by advance reservation.",
        "Science programs and educational workshops.",
        "Moon Theater shows and cultural events.",
        "Independent schedules for exhibitions and commercial facilities.",
      ],
    },
    revenue: {
      title: "Revenue Sources",
      hub: "Complex revenue",
      items: [
        "Admission and show tickets.",
        "Subscriptions and educational programs.",
        "Venue hire and event organization.",
        "Proceeds from cafés and shops.",
        "Institutional sponsorship and commercial partnerships.",
      ],
    },
    costs: {
      title: "Operating Expenses",
      items: [
        "Payroll and specialist staff.",
        "Energy, air conditioning, and utilities.",
        "Routine maintenance and technical equipment.",
        "Science content updates and licensing.",
        "Security, cleaning, insurance, and administration.",
      ],
    },
    sustainability: {
      title: "Operational Sustainability",
      items: [
        "Set aside an annual budget for maintenance and upgrades.",
        "Diversify revenue to reduce reliance on ticket sales.",
        "Define responsibilities in operating and maintenance contracts.",
        "Run ongoing educational programs with academic partners.",
        "Track financial and operating performance using measurable indicators.",
      ],
    },
    kpi: {
      title: "Proposed Performance Indicators",
      note: "These indicators will be measured once operations begin.",
      items: [
        "Annual visitor count",
        "Show occupancy rate",
        "Share of operating expenses covered by revenue",
        "Visitor and educational institution satisfaction",
      ],
    },
  },
};
