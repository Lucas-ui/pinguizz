import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  hmr: {
    protocol: "ws",
    host: "host.docker.internal",
    port: 5173,
  },
  watch: {
    usePolling: true,
    interval: 1000,
    binaryInterval: 3000,
  },
  preview: {
    allowedHosts: ["pinguiz.lan"],
  },
});
