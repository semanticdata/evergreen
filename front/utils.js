import { useHref } from "react-router-dom";

import { WIKILINKSregex as WIKILINKSregex } from "obsidian-index-wikilinks/dist/lib/wikilinkRegex";

export const noteToMarkdownContent = (base, note) => {
  return `# ${note.title ?? ""}\n\n${note.content}`.replaceAll(
    WIKILINKSregex,
    (_match, index, _block, title) => {
      return `[${title ?? index}](${base}/${encodeURIComponent(index)})`;
    },
  );
};

export const useBase = () => {
  const base = useHref("/");
  return base === "/" ? "" : base;
};
