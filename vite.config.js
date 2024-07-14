import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import ViteRestart from "vite-plugin-restart"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ViteRestart({
      // changes in these paths will restart the server automatically
      restart: ["notes/**", "src/**", "public/**", "index.html", "config.json"],
    }),
    react(),
  ],
  build: {
    // needed for gh-pages deployment
    // see: <https://github.com/actions/upload-pages-artifact>
    outDir: "_site",
  },
  // needed for gh-pages deployment
  base: "./",
})
