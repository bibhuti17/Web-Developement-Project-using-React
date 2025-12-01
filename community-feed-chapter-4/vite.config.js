import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        client: "src/entry-client.jsx",
      },
    },
  },
  ssr: {
    noExternal: ["react-helmet-async", "react-router-dom"],
  },
});
