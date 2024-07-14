import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import ViteRestart from "vite-plugin-restart"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteRestart({
      // changes in these paths will restart the server automatically
      restart: ["notes/**"],
    }),
    react(),
  ],
  build: {
    // default: dist
    // outDir: "_site",
  },
  // default: /
  // base: "./",
})
