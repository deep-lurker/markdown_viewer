// A marked extension that renders LaTeX math with KaTeX.
//   $$ ... $$  -> display (block) math
//   $ ... $    -> inline math
// Requires `katex` (libs/katex/katex.min.js) and `marked` to be loaded first.
// Exposes window.katexMarkedExtension for `marked.use(...)`.
(function () {
  "use strict";

  function renderMath(tex, displayMode) {
    try {
      return katex.renderToString(tex, {
        displayMode: displayMode,
        throwOnError: false,
      });
    } catch (e) {
      // Fall back to showing the raw source if KaTeX can't parse it.
      var esc = tex
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return "<code>" + (displayMode ? "$$" + esc + "$$" : "$" + esc + "$") + "</code>";
    }
  }

  var blockMath = {
    name: "blockMath",
    level: "block",
    start: function (src) {
      var i = src.indexOf("$$");
      return i < 0 ? undefined : i;
    },
    tokenizer: function (src) {
      var match = /^\$\$([\s\S]+?)\$\$/.exec(src);
      if (match) {
        return {
          type: "blockMath",
          raw: match[0],
          text: match[1].trim(),
        };
      }
    },
    renderer: function (token) {
      return renderMath(token.text, true);
    },
  };

  var inlineMath = {
    name: "inlineMath",
    level: "inline",
    start: function (src) {
      var i = src.indexOf("$");
      return i < 0 ? undefined : i;
    },
    tokenizer: function (src) {
      // Inline display: $$ ... $$ on a single line.
      var display = /^\$\$([^\n]+?)\$\$/.exec(src);
      if (display) {
        return {
          type: "inlineMath",
          raw: display[0],
          text: display[1].trim(),
          display: true,
        };
      }
      // Inline: $ ... $  — no line breaks, no leading/trailing space next to
      // the delimiter (avoids matching prose that merely contains dollars).
      var inline = /^\$(?![\s$])([^\n$]*?)(?<![\s])\$(?!\d)/.exec(src);
      if (inline) {
        return {
          type: "inlineMath",
          raw: inline[0],
          text: inline[1].trim(),
          display: false,
        };
      }
    },
    renderer: function (token) {
      return renderMath(token.text, !!token.display);
    },
  };

  window.katexMarkedExtension = { extensions: [blockMath, inlineMath] };
})();
