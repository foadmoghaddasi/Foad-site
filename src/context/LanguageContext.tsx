import { createContext, useContext, useEffect, useState } from "react";

export type Language = "fa" | "en";

type LanguageContextValue = {
  language: Language;
  isFa: boolean;
  direction: "rtl" | "ltr";
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getInitialLanguage = (): Language => {
  const savedLanguage = localStorage.getItem("site-language");
  return savedLanguage === "en" || savedLanguage === "fa"
    ? savedLanguage
    : "en";
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const isFa = language === "fa";
  const direction = isFa ? "rtl" : "ltr";

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = direction;
    root.dataset.language = language;
    localStorage.setItem("site-language", language);
  }, [direction, language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        isFa,
        direction,
        toggleLanguage: () =>
          setLanguage((current) => (current === "fa" ? "en" : "fa")),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
