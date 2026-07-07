import { defineConfig } from "vite";
import HtmlCssPurgePlugin from "vite-plugin-purgecss";

export default defineConfig({
  base: "/nuevo_portafolio/",
  plugins: [
    HtmlCssPurgePlugin()
  ]
});