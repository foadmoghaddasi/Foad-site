import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";
import { addArticleEntries } from "../lib/article-source.mjs";

const entries = {
  importLines: 'import regressionCover from "./regression-cover.svg";',
  fa: '  { slug: "parser-regression", title: "مقاله فارسی", direction: "rtl", cover: regressionCover }',
  en: '  { slug: "parser-regression", title: "English article", direction: "ltr", cover: regressionCover }',
};
const evaluate = (source) => {
  const parsed = ts.createSourceFile("articles.ts", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  assert.equal(parsed.parseDiagnostics.length, 0, "Edited source must remain valid TypeScript");
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports, require: (asset) => ({ default: asset }) });
  return exports;
};
const plain = (value) => JSON.parse(JSON.stringify(value));

const variants = [
  ["plain arrays", (items) => `[${items}]`],
  ["current satisfies/filter wrappers", (items) => `([${items}] satisfies Article[]).filter((article) => !hidden.has(article.slug))`],
  ["spacing, comments and misleading brackets", (items) => `( /* [ */ [\n${items}\n// ] [\n] /* ] */ satisfies /* [ */ Article[]\n).filter(/* ] */ (article) => !hidden.has(article.slug))`],
  ["type assertion and method chain", (items) => `(([${items}] as Article[])!).filter((article) => !hidden.has(article.slug)).slice()`],
  ["element access method and callback array", (items) => `([${items}] satisfies Article[])["filter"]((article) => !["hidden"].includes(article.slug))`],
];
const oldArticle = '{ slug: "old", title: `brackets ] ${["[", "]"].join("")}`, content: [{ items: ["[", "]"] }] }';
for (const [name, wrap] of variants) {
  for (const [ending, items] of [
    ["no trailing comma", `${oldArticle} // trailing comment ] [`],
    ["trailing comma", `${oldArticle}, /* ] [ */`],
    ["empty", "/* empty ] [ */"],
  ]) {
    test(`${name}: ${ending}`, () => {
      const source = `// export const articles: Article[] = [decoy]\n`
        + `type Article = any; const hidden = new Set(["hidden"]);\n`
        + `export const /* [ */ articles\n: Article[] = ${wrap(`\n${items}\n`)};\n`
        + `export const articlesEn : Article[] = ${wrap(`\n${items}\n`)};\n`;
      const before = evaluate(source);
      const next = addArticleEntries(source, entries);
      const after = evaluate(next);
      for (const [array, language] of [["articles", "fa"], ["articlesEn", "en"]]) {
        assert.deepEqual(plain(after[array].slice(0, -1)), plain(before[array]));
        assert.equal(after[array].at(-1).slug, "parser-regression");
        assert.equal(after[array].at(-1).title, language === "fa" ? "مقاله فارسی" : "English article");
      }
      assert.equal(next.split(entries.importLines).length - 1, 1);
      if (items.includes(oldArticle)) assert.equal(next.split(oldArticle).length - 1, 2);
    });
  }
}

test("imports are added after existing imports without rewriting their comments", () => {
  const source = 'import oldCover from "./old.svg"; // existing import comment\n'
    + 'export const articles = []; export const articlesEn = [];';
  const next = addArticleEntries(source, entries);
  assert.ok(next.startsWith('import oldCover from "./old.svg"; // existing import comment\n' + entries.importLines));
  evaluate(next);
});

test("missing, ambiguous, unsupported or malformed declarations fail safely", () => {
  for (const source of [
    'const decoy = "export const articles: Article[] = ["; export const articlesEn = [];',
    'export const articles = []; export const articles = []; export const articlesEn = [];',
    'export const articles = makeArticles([]); export const articlesEn = [];',
    'export const articles = other.filter(() => []); export const articlesEn = [];',
    'export const articles = []; export const articlesEn = loadArticles();',
    'export const articles = [; export const articlesEn = [];',
  ]) assert.throws(() => addArticleEntries(source, entries), /هیچ تغییری انجام نشد/);
});

test("real articles.ts preserves existing articles, filters and same-slug language lookup", async () => {
  const source = await readFile(new URL("../../src/content/articles.ts", import.meta.url), "utf8");
  const before = evaluate(source);
  const next = addArticleEntries(source, entries);
  const after = evaluate(next);
  for (const array of ["articles", "articlesEn"]) {
    assert.deepEqual(plain(after[array].slice(0, -1)), plain(before[array]));
  }
  assert.equal(after.getArticleBySlug("parser-regression", "fa").title, "مقاله فارسی");
  assert.equal(after.getArticleBySlug("parser-regression", "en").title, "English article");
  assert.equal(after.getArticleBySlug("test-bilingual-design-note", "fa"), undefined);
  assert.equal(after.getArticleBySlug("test-bilingual-design-note", "en"), undefined);
});
