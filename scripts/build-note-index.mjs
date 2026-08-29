import {mkdir, readdir, readFile, writeFile} from "node:fs/promises"
import path from "node:path"
import {pathToFileURL} from "node:url"

const normalizeReference = (reference) =>
  reference
    .trim()
    .replace(/\\/g, "/")
    .replace(/\.md$/i, "")
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .toLowerCase()

const stripQuotes = (value) => value.trim().replace(/^['"]|['"]$/g, "")

const extractAliases = (content) => {
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!frontmatter) return []

  const aliases = []
  let readingAliases = false

  for (const line of frontmatter[1].split(/\r?\n/)) {
    const property = line.match(/^([^:]+):\s*(.*)$/)
    if (property) {
      readingAliases = property[1].trim().toLowerCase() === "aliases"
      if (readingAliases && property[2]) {
        aliases.push(
          ...property[2]
            .replace(/^\[|\]$/g, "")
            .split(",")
            .map(stripQuotes)
            .filter(Boolean),
        )
      }
      continue
    }

    const listItem = line.match(/^\s*-\s*(.+)$/)
    if (readingAliases && listItem) aliases.push(stripQuotes(listItem[1]))
  }

  return [...new Set(aliases)]
}

const extractReferences = (content) => {
  const references = []
  const wikilinks = /\[\[([^\]]+)\]\]/g

  for (const match of content.matchAll(wikilinks)) {
    const target = match[1].split("|", 1)[0].split("#", 1)[0].trim()
    if (target) references.push(target)
  }

  return references
}

const listMarkdownFiles = async (directory) => {
  const entries = await readdir(directory, {withFileTypes: true})
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) return await listMarkdownFiles(entryPath)
      return entry.isFile() && entry.name.endsWith(".md") ? [entryPath] : []
    }),
  )

  return files.flat()
}

export const buildNoteIndex = async (
  notesDirectory = "notes",
  outputFile = "notes/index.json",
) => {
  const rootDirectory = process.cwd()
  const notesPath = path.resolve(rootDirectory, notesDirectory)
  const outputPath = path.resolve(rootDirectory, outputFile)
  const markdownFiles = (await listMarkdownFiles(notesPath)).filter(
    (filePath) => path.resolve(filePath) !== outputPath,
  )
  const notes = await Promise.all(
    markdownFiles.map(async (filePath) => {
      const content = await readFile(filePath, "utf8")
      const title = path.basename(filePath, ".md")
      const pathFromRoot = path
        .relative(rootDirectory, filePath)
        .split(path.sep)
        .join("/")
      const pathWithinNotes = path
        .relative(notesPath, filePath)
        .split(path.sep)
        .join("/")
      const pathWithoutExtension = pathFromRoot.replace(/\.md$/i, "")
      const relativePathWithoutExtension = pathWithinNotes.replace(/\.md$/i, "")

      return {
        title,
        path: pathFromRoot,
        pathWithoutExtension,
        relativePathWithoutExtension,
        aliases: extractAliases(content),
        references: extractReferences(content),
        referenced_by: [],
      }
    }),
  )

  const noteByReference = new Map()
  for (const note of notes) {
    for (const reference of [
      note.title,
      note.pathWithoutExtension,
      note.relativePathWithoutExtension,
      ...note.aliases,
    ]) {
      const normalizedReference = normalizeReference(reference)
      const existingNote = noteByReference.get(normalizedReference)
      if (existingNote && existingNote.title !== note.title) {
        throw new Error(`Ambiguous wiki-link reference: ${reference}`)
      }
      noteByReference.set(normalizedReference, note)
    }
  }

  for (const note of notes) {
    for (const reference of note.references) {
      const target = noteByReference.get(normalizeReference(reference))
      if (
        target &&
        target.title !== note.title &&
        !target.referenced_by.includes(note.title)
      ) {
        target.referenced_by.push(note.title)
      }
    }
  }

  const index = Object.fromEntries(
    notes
      .sort((left, right) => left.title.localeCompare(right.title))
      .map(
        ({
          title,
          path: notePath,
          pathWithoutExtension,
          relativePathWithoutExtension,
          aliases,
          referenced_by,
        }) => [
          title,
          {
            title,
            path: notePath,
            aliases,
            link_references: [
              ...new Set([
                title,
                pathWithoutExtension,
                relativePathWithoutExtension,
                ...aliases,
              ]),
            ],
            referenced_by,
          },
        ],
      ),
  )

  await mkdir(path.dirname(outputPath), {recursive: true})
  await writeFile(outputPath, `${JSON.stringify(index, null, 2)}\n`)
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  const [notesDirectory, outputFile] = process.argv.slice(2)
  await buildNoteIndex(notesDirectory, outputFile)
}
