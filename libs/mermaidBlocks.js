// Mermaid integration for the Markdown Viewer.
//   ```mermaid
//   graph TD; A-->B;
//   ```
// Requires `mermaid` (libs/mermaid.min.js) and `marked` to be loaded first.
// Exposes:
//   window.mermaidCodeRenderer  — a marked `code` renderer override that emits
//     <pre class="mermaid"> for mermaid fences and falls back (returns false)
//     for every other language.
//   window.renderMermaidBlocks(root) — renders every unprocessed .mermaid block
//     found under `root` (defaults to document).
(function () {
  "use strict";

  var initialized = false;
  var counter = 0;

  function ensureInitialized() {
    if (initialized || typeof mermaid === "undefined") return;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "default",
    });
    initialized = true;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // marked renderer override. Return false for non-mermaid code so marked falls
  // back to its default (syntax-highlighted) code renderer.
  window.mermaidCodeRenderer = function (token) {
    var lang = (token.lang || "").trim().toLowerCase();
    if (lang !== "mermaid") return false;
    return '<pre class="mermaid">' + escapeHtml(token.text) + "</pre>";
  };

  window.renderMermaidBlocks = function (root) {
    if (typeof mermaid === "undefined") return;
    ensureInitialized();

    var scope = root || document;
    var blocks = scope.querySelectorAll("pre.mermaid:not([data-processed])");

    blocks.forEach(function (block) {
      var source = block.textContent;
      block.setAttribute("data-processed", "true");
      var id = "mermaid-svg-" + counter++;

      mermaid
        .render(id, source)
        .then(function (result) {
          block.innerHTML = result.svg;
          if (typeof result.bindFunctions === "function") {
            result.bindFunctions(block);
          }
        })
        .catch(function (err) {
          block.removeAttribute("data-processed");
          block.classList.add("mermaid-error");
          block.innerHTML =
            '<code class="mermaid-error-msg">Mermaid render error: ' +
            escapeHtml(err && err.message ? err.message : String(err)) +
            "</code>\n" +
            escapeHtml(source);
        });
    });
  };
})();
