(function () {
  "use strict";

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
          '<input type="checkbox" disabled' + (checked ? " checked" : "") + "> "
        );
      },
    },
  });

  var editor = document.getElementById("editor");
  var preview = document.getElementById("preview");
  var main = document.getElementById("main");
  var editorPane = document.getElementById("editorPane");
  var openBtn = document.getElementById("openBtn");
  var backBtn = document.getElementById("backBtn");
  var fileInput = document.getElementById("fileInput");
  var filename = document.getElementById("filename");

  function highlightAll() {
    preview
      .querySelectorAll("pre code")
      .forEach(function (block) {
        hljs.highlightElement(block);
      });
  }

  function render(text) {
    preview.innerHTML = marked.parse(text || "");
    highlightAll();
  }

  // Landing mode: editable textarea + live preview.
  function showLanding() {
    main.classList.remove("md-file-mode");
    editorPane.hidden = false;
    backBtn.hidden = true;
    filename.hidden = true;
    filename.textContent = "";
    editor.focus();
    render(editor.value);
  }

  // File mode: read-only rendered view, editor hidden, back button shown.
  function showFile(name, text) {
    filename.textContent = name;
    filename.hidden = false;
    editorPane.hidden = true;
    main.classList.add("md-file-mode");
    backBtn.hidden = false;
    render(text);
  }

  editor.addEventListener("input", function () {
    render(editor.value);
  });

  openBtn.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    var file = fileInput.files && fileInput.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      showFile(file.name, String(reader.result || ""));
    };
    reader.readAsText(file);
    // Allow re-selecting the same file later.
    fileInput.value = "";
  });

  backBtn.addEventListener("click", showLanding);

  showLanding();
})();
