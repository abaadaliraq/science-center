import type { Metadata } from "next";
import { Amiri, Alexandria, Montserrat, Noto_Sans } from "next/font/google";
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";
import PresentationSidebar from "@/components/PresentationSidebar";
import { presentation } from "@/content/presentation";

const amiri = Amiri({ variable: "--font-amiri", subsets: ["arabic"], weight: ["400", "700"], display: "swap" });
const notoSans = Noto_Sans({ variable: "--font-noto-sans", subsets: ["latin"], display: "swap" });
// An injected Arial fallback would capture Arabic glyphs before Alexandria.
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], display: "swap", adjustFontFallback: false, fallback: [] });
const alexandria = Alexandria({ variable: "--font-alexandria", subsets: ["arabic"], display: "swap" });

export const metadata: Metadata = {
  title: presentation.ar.pageTitle,
  description: presentation.ar.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={`${amiri.variable} ${notoSans.variable} ${montserrat.variable} ${alexandria.variable} antialiased`}>
      <body>
        <LanguageProvider><PresentationSidebar />{children}</LanguageProvider>
      </body>
    </html>
  );
}
