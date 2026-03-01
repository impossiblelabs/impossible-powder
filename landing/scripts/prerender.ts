import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "../dist");
const template = readFileSync(resolve(distDir, "index.html"), "utf-8");

const { render } = await import(resolve(distDir, "server/entry-server.js"));

const SUPPORTED_LOCALES = ["en", "it"];
const DEFAULT_LOCALE = "en";
const SITE_URL = "https://impossiblepowders.com";

const hreflangTags = SUPPORTED_LOCALES.map(
  (l) => `  <link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/" />`,
).join("\n");
const xDefaultTag = `  <link rel="alternate" hreflang="x-default" href="${SITE_URL}/${DEFAULT_LOCALE}/" />`;

for (const locale of SUPPORTED_LOCALES) {
  const html: string = render(locale);

  const page = template
    .replace(/<html lang="\w+"/, `<html lang="${locale}"`)
    .replace("</head>", `${hreflangTags}\n${xDefaultTag}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outDir = resolve(distDir, locale);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "index.html"), page);
  console.log(`  ✓ dist/${locale}/index.html`);
}

// Root redirect with browser language detection
const redirectHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <script>
      (function () {
        var lang = (navigator.language || "").slice(0, 2).toLowerCase();
        var supported = ${JSON.stringify(SUPPORTED_LOCALES)};
        var locale = supported.indexOf(lang) !== -1 ? lang : "${DEFAULT_LOCALE}";
        window.location.replace("/" + locale + "/");
      })();
    </script>
    <meta http-equiv="refresh" content="0;url=/${DEFAULT_LOCALE}/" />
    <title>Redirecting…</title>
  </head>
  <body></body>
</html>`;

writeFileSync(resolve(distDir, "index.html"), redirectHtml);
console.log("  ✓ dist/index.html (redirect)");

// Clean SSR build artifacts
rmSync(resolve(distDir, "server"), { recursive: true, force: true });
console.log("  ✓ cleaned dist/server/");
