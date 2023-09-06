import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // server: {
  //   host: "176.96.243.168", // Add your host IP address here
  // },
  // build: {
  //   rollupOptions: {
  //     external: [
  //       "/path/to/external/module.es.js",
  //         "/src/layouts/AppLayout.vue"
  //     ]
  //   }
  // }
});
