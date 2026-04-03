"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Translations } from "./translations";
import { translations } from "./translations";

export type Lang = "en" | "pt" | "es";

const LANGS: Lang[] = ["en", "pt", "es"];

interface I18nContext {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const I18nCtx = createContext<I18nContext>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

const HTML_LANG: Record<Lang, string> = {
  en: "en",
  pt: "pt-BR",
  es: "es",
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && LANGS.includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = HTML_LANG[l];
  };

  return (
    <I18nCtx.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n() {
  return useContext(I18nCtx);
}
