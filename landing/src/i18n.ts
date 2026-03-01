import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import it from "./locales/it/translation.json";

export const SUPPORTED_LOCALES = ["en", "it"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "en";

const resources = {
  en: { translation: en },
  it: { translation: it },
} as const;

export function createI18nInstance(locale: SupportedLocale) {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
  return instance;
}
