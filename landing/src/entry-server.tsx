import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import { createI18nInstance } from "./i18n";
import type { SupportedLocale } from "./i18n";
import App from "./App";

export function render(locale: SupportedLocale): string {
  const i18n = createI18nInstance(locale);
  return renderToString(
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </StrictMode>,
  );
}
