// User-approved references, checked against the claims they actually support.
export const historySources = [
  { id: "ministry", href: "https://964media.com/394460/" },
  { id: "university", href: "https://sc.uobaghdad.edu.iq/?p=14984" },
  { id: "press", href: "https://magazine.imn.iq/thqyqat/2576-%D9%82%D9%8F%D8%A8%D9%91%D9%8E%D8%A9-%D8%A8%D8%BA%D8%AF%D8%A7%D8%AF-%D8%A7%D9%84%D9%81%D9%84%D9%83%D9%8A%D8%A9-%D8%B3%D8%A7%D8%AD%D8%B1%D8%A9-%D8%A7%D9%84%D8%A3%D8%AC%D9%8A%D9%80%D9%80%D9%80.html" },
] as const;

export const historyContent = {
  ar: {
    title: "القبة الفلكية | الإرث وفرصة الإحياء",
    paragraphs: [
      "تُعد القبة الفلكية في متنزه الزوراء أحد أبرز المعالم العلمية والمعمارية في بغداد، وقد أُنشئت أواخر سبعينيات القرن الماضي لتكون وجهة تعليمية متخصصة في علوم الفلك والفضاء. وبعد تعرضها لأضرار وفقدان تجهيزاتها الأساسية، توقف نشاطها العلمي، لتبقى منشأة ذات أهمية تاريخية دون استثمار فعلي لإمكاناتها.",
      "شهدت السنوات الماضية محاولات رسمية لإعادة تأهيلها، حيث طرحت وزارة الشباب والرياضة مقترحات لإعادة تشغيلها، وشارك مختصون من قسم الفلك والفضاء في جامعة بغداد عام 2022 في مناقشة تحديث أجهزتها وتطوير مرافقها والمساحات المحيطة بها. ورغم هذه الجهود، لم تكتمل أعمال إعادة التأهيل.",
      "وتكشف المعلومات المنشورة عن تحدٍّ آخر يتعلق بالتوثيق الفني؛ إذ ورد قطر شاشة العرض بنحو 20 متراً في تقرير مجلة الشبكة العراقية، وهو قياس لا يكفي لتحديد قطر المبنى أو القبة الداخلية. كما لم يتوفر في المصادر المنشورة التي تمت مراجعتها رقم موثق للقدرة الاستيعابية الأصلية أو عدد المقاعد.",
      "إن محدودية هذه البيانات وغياب إتاحتها بصورة موحدة يبرزان الحاجة إلى إعداد توثيق هندسي وفني شامل للمنشأة، باعتباره خطوة أساسية تسبق إعادة التأهيل.",
      "ويمثل المشروع المقترح فرصة لإحياء هذا المعلم وتحويله إلى مركز متكامل لعلوم الفضاء، يجمع بين التعليم والتجارب العلمية التفاعلية والاستدامة التشغيلية، مع الحفاظ على هويته المعمارية والتاريخية.",
    ],
    factsLabel: "بيانات تاريخية وفنية",
    facts: [
      { label: "التاريخ", value: "1979–1981", description: "تاريخا التشييد والافتتاح الواردان في المصادر المنشورة." },
      { label: "الأبعاد", value: "نحو 20 متراً", unit: "متراً تقريباً", description: "قطر شاشة العرض وفق تقرير مجلة الشبكة العراقية؛ يحتاج إلى تحقق هندسي، ولا يحدد قطر المبنى أو القبة الداخلية." },
      { label: "القدرة الاستيعابية", value: "غير موثقة في المصادر المتاحة", description: "لم يُعثر على عدد مقاعد أصلي مؤكد ضمن المصادر المنشورة التي تمت مراجعتها." },
    ],
    note: "تشير محدودية المعلومات الفنية المنشورة وغياب بيانات القدرة الاستيعابية إلى الحاجة لتوثيق هندسي وفني رسمي، يشمل الأبعاد الفعلية والمخططات الأصلية وحالة المنشأة وطاقتها الاستيعابية.",
    sourcesLabel: "المصادر",
    sourceLabels: {
      ministry: "شبكة 964 — تصريحات وزارة الشباب والرياضة بشأن إعادة التأهيل.",
      university: "جامعة بغداد — ورشة مناقشة مشروع تأهيل القبة الفلكية.",
      press: "مجلة الشبكة العراقية — قبة بغداد الفلكية ساحرة الأجيال.",
    },
  },
  en: {
    title: "The Planetarium | Heritage & the Opportunity for Revitalization",
    paragraphs: [
      "The planetarium in Al-Zawraa Park is one of Baghdad’s most prominent scientific and architectural landmarks. Established in the late 1970s as a specialized educational destination for astronomy and space science, it later sustained damage and lost essential equipment. Its scientific activities ceased, leaving a historically significant facility whose potential remains unrealized.",
      "Recent years have seen official efforts toward rehabilitation. The Ministry of Youth and Sports put forward proposals to resume operations, and specialists from the University of Baghdad’s Department of Astronomy and Space participated in discussions in 2022 on upgrading its equipment, facilities, and surrounding areas. Despite these efforts, rehabilitation has not been completed.",
      "Published information reveals a further challenge in technical documentation. Al-Shabaka Al-Iraqiya magazine reported a projection screen diameter of approximately 20 metres, a measurement that does not establish the diameter of the building or the internal dome. The published sources reviewed also provided no documented figure for the original capacity or seating count.",
      "The limited data and the absence of consistently available information highlight the need for comprehensive engineering and technical documentation of the facility as an essential step before rehabilitation.",
      "The proposed project offers an opportunity to revive this landmark as an integrated space science center combining education, interactive scientific experiences, and operational sustainability while preserving its architectural and historical identity.",
    ],
    factsLabel: "Historical and technical information",
    facts: [
      { label: "History", value: "1979–1981", description: "The construction and inauguration dates cited in the published sources." },
      { label: "Dimensions", value: "Approximately 20 metres", unit: "metres, approx.", description: "The projection screen diameter reported by Al-Shabaka Al-Iraqiya magazine requires engineering verification and does not establish the building or internal dome diameter." },
      { label: "Capacity", value: "Not documented in available sources", description: "No confirmed original seating count was found in the published sources reviewed." },
    ],
    note: "Limited published technical information and the absence of capacity data indicate the need for official engineering and technical documentation covering actual dimensions, original drawings, the condition of the facility, and its capacity.",
    sourcesLabel: "Sources",
    sourceLabels: {
      ministry: "964 Network — Ministry of Youth and Sports statements on rehabilitation.",
      university: "University of Baghdad — workshop discussing the planetarium rehabilitation project.",
      press: "Al-Shabaka Al-Iraqiya magazine — Baghdad’s Planetarium, Enchanting Generations.",
    },
  },
} as const;
