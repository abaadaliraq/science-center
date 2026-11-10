"use client";

import { createContext, useContext, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { presentation, type Language } from "@/content/presentation";

const storageKey = "science-center-language";
const changeEvent = "science-center-language-change";
let memoryLanguage: Language = "ar";
const serverLanguage = (): Language => "ar";

function getLanguage(): Language {
  try {
    const saved = window.localStorage.getItem(storageKey);
    return saved === "en" || saved === "ar" ? saved : memoryLanguage;
  } catch {
    return memoryLanguage;
  }
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, onChange);
  };
}

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
} | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  // Streamed Suspense children may hydrate after the provider restores localStorage.
  // Each consumer uses the same Arabic hydration snapshot before reading the saved choice.
  const language = useSyncExternalStore(subscribe, getLanguage, serverLanguage);
  if (!context) throw new Error("useLanguage requires LanguageProvider");
  return { ...context, language, content: presentation[language] };
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  // The server and first hydration render are always Arabic; storage is read on the client.
  const language = useSyncExternalStore(subscribe, getLanguage, serverLanguage);
  const anchor = useRef<{ element: HTMLElement; top: number } | null>(null);

  const setLanguage = (next: Language) => {
    if (next === language) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    const current = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
    });
    if (current) anchor.current = { element: current, top: current.getBoundingClientRect().top };
    memoryLanguage = next;
    try { window.localStorage.setItem(storageKey, next); } catch { /* Keep switching available if storage is blocked. */ }
    window.dispatchEvent(new Event(changeEvent));
  };

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.title = presentation[language].pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", presentation[language].description);
    if (anchor.current) {
      const { element, top } = anchor.current;
      window.scrollBy({ top: element.getBoundingClientRect().top - top, behavior: "instant" });
      anchor.current = null;
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <div className={`presentation ${language === "ar" ? "arabic" : "english"}`} lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
        <a className="skip-link" href="#main-content">{presentation[language].skipLink}</a>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}
