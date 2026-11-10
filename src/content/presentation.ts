export type Language = "ar" | "en";

export const presentation = {
  ar: {
    title: ["مشروع إعادة إحياء القبة الفلكية", "وتطوير مركز بغداد لعلوم الفضاء"],
    location: "بغداد · متنزه الزوراء",
    creditsLabel: "مقترح مقدم من",
    foundations: ["مؤسسة مسمار للثقافة والتنمية المستدامة", "ومؤسسة مصدر للتنمية المستدامة"],
    historyTitle: "نبذة عن القبة الفلكية",
    history: "تُعد القبة الفلكية من المعالم العلمية والمعمارية المهمة في بغداد، وقد أدّت دوراً تعليمياً في التعريف بعلوم الفلك. ومع توقف نشاطها، تبرز الحاجة إلى إعادة إحيائها بما يحفظ قيمتها التاريخية ويعيد دورها في التعليم العلمي.",
    historyLink: "النبذة التاريخية",
    skipLink: "انتقل إلى المحتوى",
    languageLabel: "اختيار اللغة",
    pageTitle: "القبة الفلكية ومركز بغداد لعلوم الفضاء",
    description: "مقترح إعادة إحياء القبة الفلكية وتطوير مركز بغداد لعلوم الفضاء، مقدم من مؤسسة مسمار ومؤسسة مصدر.",
  },
  en: {
    title: ["Baghdad Planetarium", "Revitalization & Space Science Center"],
    location: "Baghdad · Al-Zawraa Park",
    creditsLabel: "Proposal Presented by",
    foundations: ["Mismar Foundation for Culture and Sustainable Development", "& Masdar Foundation for Sustainable Development"],
    historyTitle: "Historical Background",
    history: "The Baghdad Planetarium is an important scientific and architectural landmark with an educational role in introducing astronomy. Following the suspension of its activities, its revitalization is needed to preserve its historical value and restore its role in science education.",
    historyLink: "Historical Background",
    skipLink: "Skip to content",
    languageLabel: "Select language",
    pageTitle: "Baghdad Planetarium & Space Science Center",
    description: "A proposal for the Baghdad Planetarium Revitalization & Space Science Center, presented by Mismar Foundation and Masdar Foundation.",
  },
} as const;
