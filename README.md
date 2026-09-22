# Markdown Viewer

A Chrome (Manifest V3) extension that renders `.md` / `.markdown` files as
GitHub-flavored markdown — with syntax highlighting, math, and Mermaid diagrams —
right in the browser. It works on local files and remote URLs, and also ships a
standalone editor/preview page.

## Why another markdown viewer?

This exists to solve one thing well: **rendering markdown instantly, with zero
launch cost.**

- **Paste-and-render for AI output.** AI chatbots hand you markdown on the
  clipboard. I wanted a tool where I just paste it in and it renders immediately —
  no file to save, no app to open.
- **Why not VS Code?** Too slow. Even a ~2-second cold start is 2 seconds I don't
  want to wait for something this small.
- **Instant open for local `.md` files.** Local AI-generated markdown files should
  open the moment I double-click them — not spin up VS Code or another heavy viewer.
- **The browser is always already open.** It runs 24/7 on my machine, so a browser
  extension is the fastest possible path to a rendered page — nothing to launch at all.

## Features

- **Auto-render** raw markdown pages (`file://` and `http(s)://`) into styled HTML
- **GitHub-flavored markdown** via [marked](https://github.com/markedjs/marked)
- **Syntax highlighting** via [highlight.js](https://highlightjs.org/)
- **Math** rendering via [KaTeX](https://katex.org/) (inline and display)
- **Mermaid diagrams** — ```` ```mermaid ```` fenced blocks render as diagrams
- **Raw ⇄ Rendered toggle** on auto-rendered pages
- **Standalone viewer/editor** — click the toolbar icon for a live editor + preview,
  or open a local `.md` file

## Installation (unpacked)

1. Clone this repo:
   ```bash
   git clone https://github.com/deep-lurker/markdown_viewer.git
   ```
2. Open `chrome://extensions` in Chrome.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** and select the cloned `markdown_viewer` folder.

> To render local `file://` markdown, enable **Allow access to file URLs** for the
> extension on the `chrome://extensions` details page.

## Usage

- **Local / remote `.md` files** — just open the file's URL; the content script
  detects raw markdown pages and renders them automatically. Use the **Raw** button
  to toggle back to the source.
- **Editor** — click the toolbar icon to open `viewer.html`, then type/paste
  markdown or use **Open .md file** to load one; the preview updates live.

## Project structure

```
manifest.json          MV3 manifest (content script + libs registration)
background.js           Service worker — opens viewer.html on icon click
content.js             Auto-renders raw markdown pages
viewer.html/.js/.css   Standalone editor + live preview
github-markdown.css    GitHub markdown styling
libs/                  Bundled marked, highlight.js, KaTeX, Mermaid + glue
  katexMarked.js         marked extension for KaTeX math
  mermaidBlocks.js       marked code-renderer override for Mermaid blocks
icons/                 Toolbar icons (16/48/128)
test.md                Sample document for manual testing
```

## Development

There is no build step — the extension loads the source directly. After editing
files, reload the extension from `chrome://extensions` (and reload any open
markdown tabs). Use `test.md` to exercise headings, code blocks, math, and Mermaid.
