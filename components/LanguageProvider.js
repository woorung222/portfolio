"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);
const STORAGE_KEY = "portfolio-language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ko");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ko" || saved === "en") {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "ko" ? "ko" : "en";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "ko" ? "en" : "ko"))
    }),
    [language]
  );

  return (
    <LanguageContext.Provider value={value}>
      <button
        type="button"
        className="language-toggle"
        onClick={value.toggleLanguage}
        aria-label={language === "ko" ? "Switch language to English" : "한국어로 전환"}
      >
        <span className={language === "ko" ? "active" : ""}>KR</span>
        <span aria-hidden="true">/</span>
        <span className={language === "en" ? "active" : ""}>ENG</span>
      </button>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
