import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { chatDevPlugin } from "./scripts/chat-dev-plugin.mjs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), chatDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["lucide-react"],
        },
      },
    },
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
  },
}));
