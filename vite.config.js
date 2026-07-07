import { defineConfig } from "vite";
import { PurgeCSS } from "purgecss";

function purgeCssFromHtml() {
  return {
    name: "purge-css-from-html",
    apply: "build",

    async generateBundle(_, bundle) {
      const content = Object.values(bundle)
        .filter((file) => file.type === "asset" && file.fileName.endsWith(".html"))
        .map((file) => ({
          raw: String(file.source),
          extension: "html"
        }));

      for (const file of Object.values(bundle)) {
        if (file.type === "asset" && file.fileName.endsWith(".css")) {
          const result = await new PurgeCSS().purge({
            content,
            css: [
              {
                raw: String(file.source)
              }
            ]
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