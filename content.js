(function () {
  "use strict";

  function isRawMarkdownPage() {
    var pre = document.querySelector("body > pre");
    if (pre && document.body.children.length === 1) return true;
    if (
      document.contentType === "text/plain" ||
      document.contentType === "text/markdown"
    )
      return true;
    return false;
  }

  if (!isRawMarkdownPage()) return;

  var rawText =
    document.body.querySelector("pre")?.textContent || document.body.textContent;

  if (window.katexMarkedExtension) {
    marked.use(window.katexMarkedExtension);
  }

  marked.use({
    gfm: true,
    breaks: false,
    pedantic: false,
    renderer: {
      checkbox: function ({ checked }) {
        return (
          '<input type="checkbox" disabled' +
          (checked ? " checked" : "") +
          "> "
        );
      },
    },
  });

  var rendered = marked.parse(rawText);

  document.head.innerHTML = "";

  var metaCharset = document.createElement("meta");
  metaCharset.setAttribute("charset", "utf-8");
  document.head.appendChild(metaCharset);

  var metaViewport = document.createElement("meta");
  metaViewport.name = "viewport";
  metaViewport.content = "width=device-width, initial-scale=1";
  document.head.appendChild(metaViewport);

  var title = document.createElement("title");
  title.textContent = decodeURIComponent(
    location.pathname.split("/").pop() || "Markdown Viewer"
  );
  document.head.appendChild(title);

  document.body.className = "";
  document.body.innerHTML = "";

  var wrapper = document.createElement("div");
  wrapper.className = "md-viewer-wrapper";

  var container = document.createElement("article");
  container.className = "markdown-body";
  container.innerHTML = rendered;

  var toggleBtn = document.createElement("button");
  toggleBtn.className = "md-toggle-btn";
  toggleBtn.textContent = "Raw";
  toggleBtn.title = "Toggle raw markdown";

  var showingRaw = false;
  toggleBtn.addEventListener("click", function () {
    showingRaw = !showingRaw;
    if (showingRaw) {
      container.textContent = rawText;
      container.style.whiteSpace = "pre-wrap";
      container.style.fontFamily = "monospace";
      toggleBtn.textContent = "Rendered";
    } else {
      container.innerHTML = rendered;
      container.style.whiteSpace = "";
      container.style.fontFamily = "";
      toggleBtn.textContent = "Raw";
      document.querySelectorAll("pre code[class*='language-']").forEach(function (block) {
        hljs.highlightElement(block);
      });
    }
  });

  wrapper.appendChild(toggleBtn);
  wrapper.appendChild(container);
  document.body.appendChild(wrapper);

  document.querySelectorAll("pre code[class*='language-']").forEach(function (block) {
    hljs.highlightElement(block);
  });
  document.querySelectorAll("pre code:not([class*='language-'])").forEach(function (block) {
    hljs.highlightElement(block);
  });
})();
