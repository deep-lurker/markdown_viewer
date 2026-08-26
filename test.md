# Markdown Viewer Test

This is a test file for the **Markdown Viewer** Chrome extension.

## GitHub Flavored Markdown Features

### Tables

| Feature | Supported |
|---------|-----------|
| Tables | Yes |
| Task Lists | Yes |
| Strikethrough | Yes |
| Fenced Code | Yes |
| Autolinks | Yes |

### Task Lists

- [x] Create manifest.json
- [x] Create content script
- [x] Create GitHub-style CSS
- [ ] Test in Chrome

### Code Blocks

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return { greeting: `Hello, ${name}` };
}
```

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b
```

### Inline Code

Use `npm install` to install dependencies, then run `npm start`.

### Blockquotes

> "The best way to predict the future is to invent it."
> — Alan Kay

### Strikethrough

This is ~~deleted text~~ and this is normal text.

### Links & Images

Visit [GitHub](https://github.com) for more information.

### Horizontal Rule

---

### Nested Lists

1. First item
   - Sub-item A
   - Sub-item B
2. Second item
   1. Sub-item 1
   2. Sub-item 2

### Emphasis

*italic* and **bold** and ***bold italic*** and ~~strikethrough~~
