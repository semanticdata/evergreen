import fs from "node:fs/promises"
import path from "node:path"

import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import ViteRestart from "vite-plugin-restart"

import {buildNoteIndex} from "./scripts/build-note-index.mjs"

const copyNotesPlugin = () => ({
  name: "copy-notes",
  async writeBundle() {
    const src = path.resolve("notes")
    const dest = path.resolve("_site", "notes")
    await fs.cp(src, dest, {recursive: true, force: true})
  },
})

const noteIndexPlugin = () => {
  let debounceTimer
  let rebuilding = false
  let rebuildQueued = false

  const isMarkdownNote = (root, filePath) => {
    const notesPath = path.resolve(root, "notes")
    const relativePath = path.relative(notesPath, filePath)
    return (
      relativePath.endsWith(".md") &&
      !relativePath.startsWith("..") &&
      !path.isAbsolute(relativePath)
    )
  }

  return {
    name: "note-index",
    async buildStart() {
      await buildNoteIndex()
    },
    configureServer(server) {
      const rebuild = async () => {
        if (rebuilding) {
          rebuildQueued = true
          return
        }

        rebuilding = true
        try {
          await buildNoteIndex()
          server.ws.send({type: "full-reload"})
        } catch (error) {
          server.config.logger.error(
            `[note-index] ${error instanceof Error ? error.stack : error}`,
          )
        } finally {
          rebuilding = false
          if (rebuildQueued) {
            rebuildQueued = false
            scheduleRebuild()
          }
        }
      }

      const scheduleRebuild = () => {
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(rebuild, 150)
      }

      const handleMarkdownChange = (filePath) => {
        if (isMarkdownNote(server.config.root, filePath)) scheduleRebuild()
      }

      server.watcher.on("add", handleMarkdownChange)
      server.watcher.on("change", handleMarkdownChange)
      server.watcher.on("unlink", handleMarkdownChange)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    noteIndexPlugin(),
    copyNotesPlugin(),
    ViteRestart({
      // changes in these paths will restart the server automatically
      restart: ["src/**", "public/**", "index.html", "config.json"],
    }),
    react(),
  ],
  build: {
    // needed for gh-pages deployment
    // see: <https://github.com/actions/upload-pages-artifact>
    outDir: "_site",
  },
  // needed for gh-pages deployment
  base: "/evergreen/",
})
