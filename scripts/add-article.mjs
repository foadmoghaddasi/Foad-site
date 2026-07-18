import { copyFile, lstat, mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const articlesPath = path.join(root, "src/content/articles.ts");
const imagesRoot = path.join(root, "src/assets/images/articles");
const backupsRoot = path.join(root, ".article-backups");
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);

const fail = (message) => { throw new Error(message); };
const text = (value, label) => {
  if (typeof value !== "string" || !value.trim()) fail(`فیلد «${label}» باید یک متن غیرخالی باشد.`);
  return value.trim();
};
const safeFileName = (value, label) => {
  if (typeof value !== "string" || value !== path.basename(value) || !imageExtensions.has(path.extname(value).toLowerCase())) {
    fail(`«${label}» باید فقط نام یک فایل تصویر مجاز باشد.`);
  }
  return value;
};

const validateContent = (content, imageKeys, label) => {
  if (!Array.isArray(content) || !content.length) fail(`«${label}.content» باید یک آرایهٔ غیرخالی باشد.`);
  const imageKey = (value, field) => {
    if (typeof value !== "string" || !imageKeys.has(value)) fail(`«${field}» باید یکی از کلیدهای images باشد.`);
    return value;
  };
  return content.map((block, index) => {
    const at = `${label}.content[${index}]`;
    if (!block || typeof block !== "object" || Array.isArray(block)) fail(`«${at}» معتبر نیست.`);
    if (block.type === "paragraph") return { type: "paragraph", text: text(block.text, `${at}.text`) };
    if (block.type === "heading") {
      const level = block.level ?? 2;
      if (level !== 2 && level !== 3) fail(`«${at}.level» فقط می‌تواند 2 یا 3 باشد.`);
      return { type: "heading", text: text(block.text, `${at}.text`), level };
    }
    if (block.type === "quote") {
      const next = { type: "quote", text: text(block.text, `${at}.text`) };
      if (block.cite !== undefined) next.cite = text(block.cite, `${at}.cite`);
      return next;
    }
    if (block.type === "list") {
      if (!Array.isArray(block.items) || !block.items.length) fail(`«${at}.items» باید یک آرایهٔ غیرخالی باشد.`);
      const next = { type: "list", items: block.items.map((item, itemIndex) => text(item, `${at}.items[${itemIndex}]`)) };
      if (block.ordered !== undefined) {
        if (typeof block.ordered !== "boolean") fail(`«${at}.ordered» باید true یا false باشد.`);
        next.ordered = block.ordered;
      }
      return next;
    }
    if (block.type === "divider") return { type: "divider" };
    if (block.type === "image") {
      const next = { type: "image", image: imageKey(block.image, `${at}.image`), alt: text(block.alt, `${at}.alt`) };
      if (block.caption !== undefined) next.caption = text(block.caption, `${at}.caption`);
      if (block.wide !== undefined) {
        if (typeof block.wide !== "boolean") fail(`«${at}.wide» باید true یا false باشد.`);
        next.wide = block.wide;
      }
      return next;
    }
    if (block.type === "gallery") {
      if (!Array.isArray(block.images) || !block.images.length) fail(`«${at}.images» باید یک آرایهٔ غیرخالی باشد.`);
      return { type: "gallery", images: block.images.map((image, imageIndex) => {
        const next = { image: imageKey(image?.image, `${at}.images[${imageIndex}].image`), alt: text(image?.alt, `${at}.images[${imageIndex}].alt`) };
        if (image.caption !== undefined) next.caption = text(image.caption, `${at}.images[${imageIndex}].caption`);
        return next;
      }) };
    }
    fail(`نوع «${block.type ?? "نامشخص"}» در «${at}» پشتیبانی نمی‌شود.`);
  });
};

const validateInput = (input) => {
  if (!input || typeof input !== "object" || Array.isArray(input)) fail("فایل JSON باید یک آبجکت مقاله باشد.");
  const slug = text(input.slug, "slug");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail("slug فقط باید شامل حروف کوچک انگلیسی، عدد و خط تیره باشد.");
  if (!input.images || typeof input.images !== "object" || Array.isArray(input.images)) fail("فیلد «images» باید یک آبجکت باشد.");
  const images = Object.fromEntries(Object.entries(input.images).map(([key, fileName]) => {
    if (!/^[a-z][a-zA-Z0-9]*$/.test(key)) fail("کلیدهای images باید با حرف انگلیسی شروع شوند.");
    return [key, safeFileName(fileName, `images.${key}`)];
  }));
  if (!images.cover) fail("فیلد «images.cover» الزامی است.");
  if (new Set(Object.values(images)).size !== Object.keys(images).length) fail("هر تصویر باید فقط یک بار در images تعریف شود.");
  const imageKeys = new Set(Object.keys(images));
  const version = (value, language, direction) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) fail(`بخش «${language}» الزامی است.`);
    if (value.direction !== direction) fail(`برای نسخهٔ ${language === "fa" ? "فارسی" : "انگلیسی"}، direction باید «${direction}» باشد.`);
    return {
      slug,
      title: text(value.title, `${language}.title`),
      excerpt: text(value.excerpt, `${language}.excerpt`),
      category: text(value.category, `${language}.category`),
      publishedAt: text(value.publishedAt, `${language}.publishedAt`),
      readingTime: text(value.readingTime, `${language}.readingTime`),
      cover: "__RAW__cover",
      ...(images.coverThumb ? { coverThumb: "__RAW__coverThumb" } : {}),
      direction,
      content: validateContent(value.content, imageKeys, language),
    };
  };
  return { slug, images, fa: version(input.fa, "fa", "rtl"), en: version(input.en, "en", "ltr") };
};

const identifier = (slug, key) => `${`${slug}-${key}`.split(/[^a-zA-Z0-9]+/).filter(Boolean).map((word, index) => index ? word[0].toUpperCase() + word.slice(1) : word.toLowerCase()).join("")}Image`;
const raw = (value) => `__ARTICLE_RAW_IDENTIFIER_${value}__`;
const renderArticle = (article, imports) => {
  const content = article.content.map((block) => {
    if (block.type === "image") { const { image, ...rest } = block; return { ...rest, src: raw(imports.get(image)) }; }
    if (block.type === "gallery") return { ...block, images: block.images.map(({ image, ...rest }) => ({ ...rest, src: raw(imports.get(image)) })) };
    return block;
  });
  return JSON.stringify({
    ...article,
    cover: raw(imports.get("cover")),
    ...(article.coverThumb ? { coverThumb: raw(imports.get("coverThumb")) } : {}),
    content,
  }, null, 2)
    .replace(/"__ARTICLE_RAW_IDENTIFIER_([A-Za-z_$][A-Za-z0-9_$]*)__"/g, "$1")
    .split("\n").map((line) => `    ${line}`).join("\n");
};
const matchingArrayEnd = (source, start, label) => {
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const character = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = "";
      continue;
    }
    if (character === '"' || character === "'" || character === "`") { quote = character; continue; }
    if (character === "[") depth += 1;
    if (character === "]") {
      depth -= 1;
      if (depth === 0) return index;
    }
  }
  fail(`ساختار آرایهٔ «${label}» در articles.ts ناقص است؛ براکت پایانی پیدا نشد و هیچ تغییری انجام نشد.`);
};
const appendToArticleArray = (source, declaration, label, code) => {
  const declarationIndex = source.indexOf(declaration);
  if (declarationIndex === -1) fail(`تعریف آرایهٔ «${label}» در articles.ts پیدا نشد؛ انتظار می‌رفت «${declaration}» وجود داشته باشد.`);
  const arrayStart = source.indexOf("[", declarationIndex + declaration.length - 1);
  if (arrayStart === -1) fail(`آرایهٔ «${label}» در articles.ts با «[» شروع نشده است؛ هیچ تغییری انجام نشد.`);
  const arrayEnd = matchingArrayEnd(source, arrayStart, label);
  const before = source.slice(0, arrayEnd);
  return `${before}${before.trimEnd().endsWith(",") ? "\n" : ",\n"}${code}\n${source.slice(arrayEnd)}`;
};
const runBuild = () => new Promise((resolve, reject) => {
  const child = spawn("npm", ["run", "build"], { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  child.on("error", reject);
  child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`build با کد ${code} ناموفق بود.`)));
});

const main = async () => {
  const [jsonArgument, flag, imagesArgument] = process.argv.slice(2);
  if (!jsonArgument || flag !== "--images" || !imagesArgument) fail("روش استفاده: npm run article:add -- مسیر/مقاله.json --images مسیر/پوشه-تصاویر");
  let input;
  try { input = JSON.parse(await readFile(path.resolve(root, jsonArgument), "utf8")); }
  catch (error) { fail(`فایل JSON خوانده نشد: ${error instanceof Error ? error.message : "خطای نامشخص"}`); }
  const article = validateInput(input);
  const source = await readFile(articlesPath, "utf8");
  const escapedSlug = article.slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp(`(?:slug|["']slug["'])\\s*:\\s*["']${escapedSlug}["']`).test(source)) fail(`مقاله‌ای با slug «${article.slug}» از قبل وجود دارد.`);
  const targetImagesDir = path.join(imagesRoot, article.slug);
  try { await lstat(targetImagesDir); fail(`پوشهٔ تصاویر «${article.slug}» از قبل وجود دارد.`); }
  catch (error) { if (error instanceof Error && error.message.includes("پوشهٔ تصاویر")) throw error; if (error?.code !== "ENOENT") throw error; }
  const sourceImagesDir = path.resolve(root, imagesArgument);
  const imports = new Map(Object.keys(article.images).map((key) => [key, identifier(article.slug, key)]));
  for (const [key, fileName] of Object.entries(article.images)) {
    const filePath = path.join(sourceImagesDir, fileName);
    try { if (!(await lstat(filePath)).isFile()) fail(`«${fileName}» باید فایل باشد.`); }
    catch (error) { if (error?.code === "ENOENT") fail(`تصویر «${fileName}» پیدا نشد.`); throw error; }
    if (new RegExp(`\\b${imports.get(key)}\\b`).test(source)) fail("نام import تصویر با import موجود تداخل دارد.");
  }
  const importLines = Object.entries(article.images).map(([key, fileName]) => `import ${imports.get(key)} from "../assets/images/articles/${article.slug}/${fileName}";`).join("\n");
  const typeMarker = "\nexport type ArticleBlock";
  if (!source.includes(typeMarker)) fail("محل درج importها در articles.ts پیدا نشد؛ انتظار می‌رفت export type ArticleBlock وجود داشته باشد.");
  let next = source.replace(typeMarker, `\n${importLines}\n${typeMarker}`);
  next = appendToArticleArray(next, "export const articles: Article[] = [", "articles", renderArticle(article.fa, imports));
  next = appendToArticleArray(next, "export const articlesEn: Article[] = [", "articlesEn", renderArticle(article.en, imports));
  const backupPath = path.join(backupsRoot, `articles.ts.${new Date().toISOString().replace(/[:.]/g, "-")}.bak`);
  const temporaryArticlesPath = `${articlesPath}.article-add-${process.pid}.tmp`;
  let changed = false;
  let createdImages = false;
  try {
    await mkdir(backupsRoot, { recursive: true });
    await writeFile(backupPath, source, "utf8");
    await mkdir(targetImagesDir);
    createdImages = true;
    for (const fileName of Object.values(article.images)) await copyFile(path.join(sourceImagesDir, fileName), path.join(targetImagesDir, fileName));
    await writeFile(temporaryArticlesPath, next, "utf8");
    await rename(temporaryArticlesPath, articlesPath);
    changed = true;
    await runBuild();
    console.log(`\nمقالهٔ دوزبانه «${article.slug}» با موفقیت اضافه شد.`);
  } catch (error) {
    if (changed) await writeFile(articlesPath, source, "utf8");
    await rm(temporaryArticlesPath, { force: true });
    if (createdImages) await rm(targetImagesDir, { recursive: true, force: true });
    console.error(`\nعملیات ناموفق بود و تغییرات بازگردانده شد: ${error instanceof Error ? error.message : "خطای نامشخص"}`);
    process.exitCode = 1;
  }
};

main().catch((error) => { console.error(`\nخطا: ${error instanceof Error ? error.message : "خطای نامشخص"}`); process.exitCode = 1; });
