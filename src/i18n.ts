import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { DEFAULT_LANGUAGE, LANGUAGES } from "./utils/constants";

const isClient = typeof window !== "undefined";

const instance = i18n.use(initReactI18next);

if (isClient) {
  instance.use(Backend).use(LanguageDetector);
}

instance.init({
  fallbackLng: DEFAULT_LANGUAGE,
  lng: DEFAULT_LANGUAGE,
  supportedLngs: [...LANGUAGES],
  debug: isClient,
  interpolation: {
    escapeValue: false,
  },
  ...(isClient && {
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
  }),
});

export default i18n;
