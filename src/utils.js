import {useHref} from "react-router-dom"

import {WIKILINKSregex as WIKILINKSregex} from "obsidian-index-wikilinks/dist/lib/wikilinkRegex"

const FRONTMATTER_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/
const TAG_REGEX = /(?:^|[\s(])#([A-Za-z][\w/-]*)\b/gm

const normalizePropertyName = (name) =>
  name.toLowerCase().replace(/[\s_-]/g, "")

export const normalizeWikiLinkReference = (reference) =>
  reference
    .trim()
    .replace(/\\/g, "/")
    .replace(/\.md$/i, "")
    .normalize("NFC")
    .replace(/\s+/g, " ")
    .toLowerCase()

const normalizeTag = (tag) =>
  tag
    .trim()
    .replace(/^['"]|['"]$/g, "")
    .replace(/^#/, "")
    .toLowerCase()

const toDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined
  return Number.isNaN(Date.parse(`${value}T00:00:00`)) ? undefined : value
}

const parseTags = (value) =>
  value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map(normalizeTag)
    .filter(Boolean)

export const parseNoteContent = (content) => {
  const match = content.match(FRONTMATTER_REGEX)
  const frontmatter = match?.[1] ?? ""
  const body = match ? content.slice(match[0].length) : content
  const properties = {}
  let activeProperty

  for (const line of frontmatter.split(/\r?\n/)) {
    const property = line.match(/^([^:]+):\s*(.*)$/)
    if (property) {
      activeProperty = normalizePropertyName(property[1])
      properties[activeProperty] = property[2]
      continue
    }

    const listItem = line.match(/^\s*-\s*(.+)$/)
    if (listItem && activeProperty) {
      properties[activeProperty] = [properties[activeProperty], listItem[1]]
        .filter(Boolean)
        .join(",")
    }
  }

  const inlineTags = Array.from(body.matchAll(TAG_REGEX), (tag) => tag[1])
  const tags = [...parseTags(properties.tags ?? ""), ...inlineTags]
    .map(normalizeTag)
    .filter(Boolean)

  return {
    content: body,
    metadata: {
      created: toDate(properties.created ?? properties.datecreated ?? ""),
      updated: toDate(
        properties.updated ??
          properties.modified ??
          properties.datemodified ??
          "",
      ),
      tags: [...new Set(tags)],
    },
  }
}

export const formatNoteDate = (date) =>
  date
    ? new Intl.DateTimeFormat(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(`${date}T00:00:00`))
    : undefined

export const noteToMarkdownContent = (
  base,
  note,
  resolveNoteId = (id) => id,
) => {
  return `# ${note.title ?? ""}\n\n${note.content}`.replaceAll(
    WIKILINKSregex,
    (_match, index, _block, title) => {
      const noteId = resolveNoteId(index)
      return `[${title ?? index}](${base}/${encodeURIComponent(noteId)})`
    },
  )
}

export const useBase = () => {
  const base = useHref("/")
  return base === "/" ? "" : base
}
