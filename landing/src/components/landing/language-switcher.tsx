import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES } from "@/i18n";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return (
    <div className="flex items-center gap-1.5 text-[0.7rem] tracking-[0.04em]">
      {SUPPORTED_LOCALES.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-brand-muted select-none">|</span>}
          <a
            href={`/${locale}/`}
            className={`no-underline transition-opacity ${
              locale === currentLocale
                ? "font-bold text-brand-light"
                : "text-brand-muted hover:text-brand-light"
            }`}
          >
            {locale.toUpperCase()}
          </a>
        </span>
      ))}
    </div>
  );
}
