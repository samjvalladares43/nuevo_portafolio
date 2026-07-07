import { defineConfig } from "vite";
import { PurgeCSS } from "purgecss";

function purgeCssFromHtml() {
  return {
    name: "purge-css-from-html",
    apply: "build",

    async generateBundle(_, bundle) {
      const htmlContent = Object.values(bundle)
        .filter((file) => file.type === "asset" && file.fileName.endsWith(".html"))
        .map((file) => String(file.source))
        .join("\n");

      for (const file of Object.values(bundle)) {
        if (file.type === "asset" && file.fileName.endsWith(".css")) {
          const result = await new PurgeCSS().purge({
            content: [
              {
                raw: htmlContent,
                extension: "html"
              }
            ],
            css: [
              {
                raw: String(file.source)
              }
            ],
            defaultExtractor: (content) => content.match(/[\w-/:]+/g) || [],
            safelist: {
              standard: [
                "header",
                "logo",
                "nav-links",
                "btn-nav",
                "hero",
                "foto-perfil",
                "btn-primary",
                "section",
                "sobre-mi",
                "sobre-mi-contenido",
                "sobre-mi-texto",
                "sobre-mi-datos",
                "cards",
                "card",
                "skills",
                "contacto"
              ]
            }
          });

          file.source = result[0].css;
        }
      }
    }
  };
}

export default defineConfig({
  base: "/nuevo_portafolio/",
  plugins: [
    purgeCssFromHtml()
  ]
});