# Adding an article

Add a new object to the `articles` array in `articles.ts`.

Every article needs a unique `slug`, title, excerpt, cover, metadata, direction,
and a `content` array. Content blocks are rendered in the same order in which
you add them, so quotes and images can appear anywhere.

Available blocks:

```ts
{ type: "paragraph", text: "..." }
{ type: "heading", text: "...", level: 2 }
{ type: "quote", text: "...", cite: "Optional source" }
{ type: "image", src: importedImage, alt: "...", caption: "...", wide: true }
{ type: "list", items: ["...", "..."], ordered: true }
{ type: "divider" }
```

Import article images at the top of `articles.ts` from `src/assets/images`.
Use `direction: "rtl"` for Persian and `direction: "ltr"` for English.
