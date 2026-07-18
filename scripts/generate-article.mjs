import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");
const outputDirectory = path.join(root, "generated-articles");
const model = process.env.OPENAI_MODEL || "gpt-5-mini";

const fail = (message) => { throw new Error(message); };

const readEnvFile = async () => {
  try {
    const source = await readFile(envPath, "utf8");
    return Object.fromEntries(source.split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match || line.trimStart().startsWith("#")) return [];
      const value = match[2].replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, "$1$2");
      return [[match[1], value]];
    }));
  } catch (error) {
    if (error?.code === "ENOENT") return {};
    throw error;
  }
};

const nonEmptyText = (value, field) => {
  if (typeof value !== "string" || !value.trim()) fail(`فیلد «${field}» باید یک متن غیرخالی باشد.`);
  return value.trim();
};

const validateContent = (content, language) => {
  if (!Array.isArray(content) || content.length < 2) fail(`«${language}.content» باید حداقل دو بلوک داشته باشد.`);
  return content.map((block, index) => {
    const field = `${language}.content[${index}]`;
    if (!block || typeof block !== "object" || Array.isArray(block)) fail(`«${field}» معتبر نیست.`);
    if (block.type === "paragraph") return { type: "paragraph", text: nonEmptyText(block.text, `${field}.text`) };
    if (block.type === "heading") {
      if (block.level !== 2 && block.level !== 3) fail(`«${field}.level» باید 2 یا 3 باشد.`);
      return { type: "heading", text: nonEmptyText(block.text, `${field}.text`), level: block.level };
    }
    fail(`فقط بلوک‌های paragraph و heading مجاز هستند؛ «${field}» نامعتبر است.`);
  });
};

const validateArticle = (article) => {
  if (!article || typeof article !== "object" || Array.isArray(article)) fail("پاسخ مدل یک مقالهٔ معتبر نیست.");
  const slug = nonEmptyText(article.slug, "slug");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail("slug باید شامل حروف کوچک انگلیسی، عدد و خط تیره باشد.");
  if (!article.images || typeof article.images !== "object" || Array.isArray(article.images)) fail("فیلد «images» معتبر نیست.");
  const cover = nonEmptyText(article.images.cover, "images.cover");
  if (cover !== path.basename(cover) || !/\.(avif|gif|jpe?g|png|svg|webp)$/i.test(cover)) fail("images.cover باید نام یک فایل تصویر مجاز باشد.");
  const version = (value, language, direction) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) fail(`بخش «${language}» وجود ندارد.`);
    if (value.direction !== direction) fail(`direction نسخهٔ ${language} باید «${direction}» باشد.`);
    return {
      title: nonEmptyText(value.title, `${language}.title`),
      excerpt: nonEmptyText(value.excerpt, `${language}.excerpt`),
      category: nonEmptyText(value.category, `${language}.category`),
      publishedAt: nonEmptyText(value.publishedAt, `${language}.publishedAt`),
      readingTime: nonEmptyText(value.readingTime, `${language}.readingTime`),
      direction,
      content: validateContent(value.content, language),
    };
  };
  return { slug, images: { cover }, fa: version(article.fa, "fa", "rtl"), en: version(article.en, "en", "ltr") };
};

const contentBlockSchema = {
  anyOf: [
    {
      type: "object",
      properties: { type: { type: "string", enum: ["paragraph"] }, text: { type: "string", minLength: 1 } },
      required: ["type", "text"],
      additionalProperties: false,
    },
    {
      type: "object",
      properties: { type: { type: "string", enum: ["heading"] }, text: { type: "string", minLength: 1 }, level: { type: "number", enum: [2, 3] } },
      required: ["type", "text", "level"],
      additionalProperties: false,
    },
  ],
};

const articleSchema = {
  type: "object",
  properties: {
    slug: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    images: {
      type: "object",
      properties: { cover: { type: "string", pattern: "^[^/\\\\]+\\.(avif|gif|jpe?g|png|svg|webp)$" } },
      required: ["cover"],
      additionalProperties: false,
    },
    fa: {
      type: "object",
      properties: {
        title: { type: "string", minLength: 1 }, excerpt: { type: "string", minLength: 1 }, category: { type: "string", minLength: 1 },
        publishedAt: { type: "string", minLength: 1 }, readingTime: { type: "string", minLength: 1 }, direction: { type: "string", enum: ["rtl"] },
        content: { type: "array", minItems: 2, items: contentBlockSchema },
      },
      required: ["title", "excerpt", "category", "publishedAt", "readingTime", "direction", "content"],
      additionalProperties: false,
    },
    en: {
      type: "object",
      properties: {
        title: { type: "string", minLength: 1 }, excerpt: { type: "string", minLength: 1 }, category: { type: "string", minLength: 1 },
        publishedAt: { type: "string", minLength: 1 }, readingTime: { type: "string", minLength: 1 }, direction: { type: "string", enum: ["ltr"] },
        content: { type: "array", minItems: 2, items: contentBlockSchema },
      },
      required: ["title", "excerpt", "category", "publishedAt", "readingTime", "direction", "content"],
      additionalProperties: false,
    },
  },
  required: ["slug", "images", "fa", "en"],
  additionalProperties: false,
};

const getOutputText = (response) => {
  if (typeof response.output_text === "string" && response.output_text.trim()) return response.output_text;
  const text = response.output?.flatMap((item) => item.content ?? []).find((item) => item.type === "output_text")?.text;
  if (!text) fail("پاسخ متنی معتبری از OpenAI دریافت نشد.");
  return text;
};

const main = async () => {
  const topic = process.argv.slice(2).join(" ").trim();
  if (!topic) fail("موضوع مقاله را وارد کنید. نمونه: npm run article:generate -- \"طراحی سیستم\"");
  const env = await readEnvFile();
  const apiKey = process.env.OPENAI_API_KEY || env.OPENAI_API_KEY;
  if (!apiKey) fail("کلید OpenAI پیدا نشد. مقدار OPENAI_API_KEY را در فایل .env قرار دهید.");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      instructions: "Create one original, complete bilingual article for a product-design portfolio. Persian and English must be independently natural, professional versions of the same article, not literal translation. Return only schema-compliant JSON. Use 8–14 content blocks per language, including useful h2 headings and substantive paragraphs. Never generate, reference, or download images; set images.cover to cover.webp as a placeholder. Use a concise lowercase English slug shared by both versions. Use today's date appropriate to each language.",
      input: `Article topic: ${topic}`,
      max_output_tokens: 6000,
      text: { format: { type: "json_schema", name: "bilingual_article", strict: true, schema: articleSchema } },
    }),
  });
  if (!response.ok) fail(`درخواست OpenAI ناموفق بود (${response.status}): ${await response.text()}`);
  const generated = validateArticle(JSON.parse(getOutputText(await response.json())));
  await mkdir(outputDirectory, { recursive: true });
  const outputPath = path.join(outputDirectory, `${generated.slug}.json`);
  try { await readFile(outputPath); fail(`فایل «${path.relative(root, outputPath)}» از قبل وجود دارد.`); }
  catch (error) { if (error instanceof Error && error.message.includes("از قبل وجود دارد")) throw error; if (error?.code !== "ENOENT") throw error; }
  await writeFile(outputPath, `${JSON.stringify(generated, null, 2)}\n`, "utf8");
  console.log(`فایل مقاله ساخته شد: ${path.relative(root, outputPath)}`);
};

main().catch((error) => { console.error(`خطا: ${error instanceof Error ? error.message : "خطای نامشخص"}`); process.exitCode = 1; });
