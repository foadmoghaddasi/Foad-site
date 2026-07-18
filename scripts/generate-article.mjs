import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const envPath = path.join(root, ".env");
const outputDirectory = path.join(root, "generated-articles");
const defaultModels = { article: "gpt-5-mini", image: "gpt-image-1-mini" };
const sitePalette = "deep navy #090B10, surface navy #11141B, electric blue #315EFB, periwinkle #7596FF, and cool sky blue #60A5FA";

const fail = (message) => { throw new Error(message); };
const nonEmptyText = (value, field) => {
  if (typeof value !== "string" || !value.trim()) fail(`فیلد «${field}» باید یک متن غیرخالی باشد.`);
  return value.trim();
};
const countWords = (blocks) => blocks.map((block) => block.text ?? "").join(" ").trim().split(/\s+/).filter(Boolean).length;

const readEnvFile = async () => {
  try {
    const source = await readFile(envPath, "utf8");
    return Object.fromEntries(source.split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match || line.trimStart().startsWith("#")) return [];
      return [[match[1], match[2].replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, "$1$2")]];
    }));
  } catch (error) { if (error?.code === "ENOENT") return {}; throw error; }
};

const validateContent = (content, language) => {
  if (!Array.isArray(content) || !content.length) fail(`«${language}.content» باید یک آرایهٔ غیرخالی باشد.`);
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
  if (!article.images || typeof article.images !== "object" || Array.isArray(article.images) || article.images.cover !== "cover.webp" || article.images.coverThumb !== "cover-thumb.webp") fail("images باید شامل cover.webp و cover-thumb.webp باشد.");
  const version = (value, language, direction) => {
    if (!value || typeof value !== "object" || Array.isArray(value) || value.direction !== direction) fail(`نسخهٔ ${language} معتبر نیست.`);
    const content = validateContent(value.content, language);
    const version = {
      title: nonEmptyText(value.title, `${language}.title`), excerpt: nonEmptyText(value.excerpt, `${language}.excerpt`),
      category: nonEmptyText(value.category, `${language}.category`), publishedAt: nonEmptyText(value.publishedAt, `${language}.publishedAt`),
      readingTime: nonEmptyText(value.readingTime, `${language}.readingTime`), direction, content,
    };
    return version;
  };
  const fa = version(article.fa, "fa", "rtl");
  const en = version(article.en, "en", "ltr");
  const brief = article.imageBrief;
  const briefFields = ["topic", "metaphor", "subjects", "composition", "style", "lighting", "palette", "forbidden"];
  if (!brief || typeof brief !== "object" || Array.isArray(brief) || briefFields.some((field) => typeof brief[field] !== "string" || !brief[field].trim())) fail("imageBrief معتبر نیست.");
  return { slug, images: { cover: "cover.webp", coverThumb: "cover-thumb.webp" }, fa, en, imageBrief: brief };
};

const contentBlockSchema = { anyOf: [
  { type: "object", properties: { type: { type: "string", enum: ["paragraph"] }, text: { type: "string", minLength: 1 } }, required: ["type", "text"], additionalProperties: false },
  { type: "object", properties: { type: { type: "string", enum: ["heading"] }, text: { type: "string", minLength: 1 }, level: { type: "number", enum: [2, 3] } }, required: ["type", "text", "level"], additionalProperties: false },
] };
const versionSchema = (direction) => ({ type: "object", properties: {
  title: { type: "string", minLength: 1 }, excerpt: { type: "string", minLength: 1 }, category: { type: "string", minLength: 1 }, publishedAt: { type: "string", minLength: 1 }, readingTime: { type: "string", minLength: 1 }, direction: { type: "string", enum: [direction] }, content: { type: "array", minItems: 1, items: contentBlockSchema },
}, required: ["title", "excerpt", "category", "publishedAt", "readingTime", "direction", "content"], additionalProperties: false });
const articleSchema = { type: "object", properties: {
  slug: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
  images: { type: "object", properties: { cover: { type: "string", enum: ["cover.webp"] }, coverThumb: { type: "string", enum: ["cover-thumb.webp"] } }, required: ["cover", "coverThumb"], additionalProperties: false },
  fa: versionSchema("rtl"), en: versionSchema("ltr"),
  imageBrief: { type: "object", properties: {
    topic: { type: "string", minLength: 1 }, metaphor: { type: "string", minLength: 1 }, subjects: { type: "string", minLength: 1 }, composition: { type: "string", minLength: 1 }, style: { type: "string", minLength: 1 }, lighting: { type: "string", minLength: 1 }, palette: { type: "string", minLength: 1 }, forbidden: { type: "string", minLength: 1 },
  }, required: ["topic", "metaphor", "subjects", "composition", "style", "lighting", "palette", "forbidden"], additionalProperties: false },
}, required: ["slug", "images", "fa", "en", "imageBrief"], additionalProperties: false };

const getOutputText = (response) => {
  if (typeof response.output_text === "string" && response.output_text.trim()) return response.output_text;
  const text = response.output?.flatMap((item) => item.content ?? []).find((item) => item.type === "output_text")?.text;
  if (!text) fail("پاسخ متنی معتبری از OpenAI دریافت نشد.");
  return text;
};
const existingSlugs = async () => {
  const source = await readFile(path.join(root, "src/content/articles.ts"), "utf8");
  return new Set([...source.matchAll(/(?:slug|["']slug["'])\s*:\s*["']([^"']+)["']/g)].map((match) => match[1]));
};
const setComputedMetadata = (article) => {
  const faDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Tehran" }).format(new Date());
  const enDate = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Tehran" }).format(new Date());
  article.fa.publishedAt = faDate;
  article.en.publishedAt = enDate;
  article.fa.readingTime = `${Math.max(1, Math.ceil(countWords(article.fa.content) / 200))} دقیقه مطالعه`;
  article.en.readingTime = `${Math.max(1, Math.ceil(countWords(article.en.content) / 220))} min read`;
  return article;
};
const logLengthWarnings = (article) => {
  if (countWords(article.fa.content) < 1200) console.warn("Warning: Generated Persian article is shorter than the preferred length.");
  if (countWords(article.en.content) < 1100) console.warn("Warning: Generated English article is shorter than the preferred length.");
};

const articleInstructions = "Create an original, complete bilingual analytical article for Product Designers and Developers. Return only schema-compliant JSON. Write in a professional, educational, direct, and research-minded editorial style: reasoned rather than promotional, with explanations of causes, consequences, constraints, and decisions. Never write like a generic SEO post, LinkedIn post, motivational text, listicle, literal translation, or shallow AI-generated content. Titles must be precise, descriptive, and non-clickbait. Excerpts must state the article's useful point. Use a concise lowercase SEO-friendly shared slug. Set images.cover to cover.webp and images.coverThumb to cover-thumb.webp. The script supplies final publishedAt and readingTime values, but provide non-empty schema values for them.\n\nPersian and English are natural, professional equivalents, never word-for-word translations. Aim for a complete, practical, and in-depth Persian article of roughly 1400–2200 words, with an English version of equivalent depth. This is an editorial goal, not a hard limit. Keep the same high-level section sequence and meaning in both languages, while allowing natural phrasing.\n\nBuild the content array in this order: (1) a heading for Summary / خلاصه followed by a 2–4 sentence paragraph that explains the topic, central conclusion, and reader takeaway without repeating the title; (2) a heading for In This Article / در این مقاله followed by a concise paragraph that names the main sections in order as a table of contents; (3) an Introduction / مقدمه that directly defines the problem, its relevance to product work, and the scope; (4) a Context or Scope / زمینه و دامنه that explains assumptions, affected people or teams, real-project constraints, and important variations; (5) several descriptive analytical sections; (6) Common Mistakes or Trade-offs / خطاهای رایج یا Trade-offها; (7) Practical Guidelines / راهنمای عملی; and (8) a Conclusion / جمع‌بندی that connects the reasoning and leaves one usable decision principle. Use multiple meaningful sections, not a two-sentence article.\n\nIn each analytical section, explain the concept or problem, why it happens, why it matters, its consequence for UX, Product Design, or Development, one concrete and plausible scenario, and a recommendation that follows from the analysis. Make cause-and-effect relationships explicit. Prefer realistic situations such as a Designer–Developer disagreement, Sprint time pressure, a Design System Component change, incomplete Handoff, mobile state loss, a complex User Flow, or tension between a Business Goal and a User Goal. Do not invent companies, studies, sources, quotes, statistics, or numerical research claims. If no source is supplied, base claims on general professional reasoning and experience without unsupported numbers.\n\nUse medium-length, readable paragraphs with one clear idea each. Avoid consecutive one-sentence paragraphs and long walls of text. The available content blocks are headings and paragraphs; make the In This Article section a concise paragraph rather than a fabricated list. Do not use filler, obvious definitions, exaggerated claims, jokes, slogans, or clichés including «در دنیای امروز»، «در عصر دیجیتال»، «همان‌طور که می‌دانیم»، and «امروزه فناوری نقش مهمی دارد».\n\nIn Persian, keep common technical terms in English rather than transliterating them: Product Design, UX, UI, Design System, UI Kit, Component, Design Token, User Flow, User Journey, User Research, Usability Test, Handoff, Developer, Front-end, Back-end, API, MVP, Prototype, Wireframe, Stakeholder, Sprint, Roadmap, Design Review, Accessibility, Cognitive Load, Interaction Cost, Affordance, and Discoverability. Briefly explain a less familiar term in parentheses on first use while retaining the English term. English titles and headings should start with standard uppercase letters.\n\nProvide an imageBrief derived from the title and excerpt with a clear visual metaphor, subjects, composition, style, lighting, palette, and forbidden elements.";

const requestArticle = async ({ apiKey, articleModel, topic }) => {
  const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({
    model: articleModel, instructions: articleInstructions,
    input: `Article topic: ${topic}`,
    max_output_tokens: 12000, text: { format: { type: "json_schema", name: "bilingual_article", strict: true, schema: articleSchema }, },
  }) });
  if (!response.ok) fail(`درخواست OpenAI ناموفق بود (${response.status}): ${await response.text()}`);
  return JSON.parse(getOutputText(await response.json()));
};
const generateArticle = async ({ apiKey, articleModel, topic }) => {
  const slugs = await existingSlugs();
  const article = setComputedMetadata(validateArticle(await requestArticle({ apiKey, articleModel, topic })));
  if (slugs.has(article.slug)) fail(`مقاله‌ای با slug «${article.slug}» از قبل وجود دارد.`);
  logLengthWarnings(article);
  return article;
};

const createCover = async ({ apiKey, imageModel, article, coverPath, coverThumbPath }) => {
  const brief = article.imageBrief;
  const prompt = `Editorial illustration for a personal product-design portfolio article. Article title: ${article.en.title}. Excerpt: ${article.en.excerpt}. Image brief — topic: ${brief.topic}; visual metaphor: ${brief.metaphor}; subjects: ${brief.subjects}; composition: ${brief.composition}; style: ${brief.style}; lighting: ${brief.lighting}; palette: ${brief.palette}. Match this website palette: ${sitePalette}. Create a clear, topic-specific visual metaphor, modern product-design aesthetic, clean horizontal composition, and place the primary subject off-center for card crops. Keep details restrained. Do not include text, letters, typography, logos, watermarks, unreadable UI, shiny robots, glowing brains, robotic hands, or stock-meeting people unless the topic explicitly requires them. Forbidden: ${brief.forbidden}.`;
  const response = await fetch("https://api.openai.com/v1/images/generations", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: imageModel, prompt, size: "1536x1024", quality: "medium" }) });
  if (!response.ok) fail(`تولید تصویر OpenAI ناموفق بود (${response.status}): ${await response.text()}`);
  const base64 = (await response.json()).data?.[0]?.b64_json;
  if (typeof base64 !== "string" || !base64) fail("تصویر معتبری از OpenAI دریافت نشد.");
  const image = Buffer.from(base64, "base64");
  if (!image.length) fail("فایل تصویر تولیدشده خالی است.");
  await sharp(image).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(coverPath);
  await sharp(image).resize({ width: 700, withoutEnlargement: true }).webp({ quality: 80 }).toFile(coverThumbPath);
  if ((await stat(coverPath)).size === 0 || (await stat(coverThumbPath)).size === 0) fail("فایل‌های cover.webp یا cover-thumb.webp خالی هستند.");
};

const main = async () => {
  const topic = process.argv.slice(2).join(" ").trim();
  if (!topic) fail("موضوع مقاله را وارد کنید. نمونه: npm run article:generate -- \"طراحی سیستم\"");
  const env = await readEnvFile();
  const apiKey = process.env.OPENAI_API_KEY || env.OPENAI_API_KEY;
  if (!apiKey) fail("کلید OpenAI پیدا نشد. مقدار OPENAI_API_KEY را در فایل .env قرار دهید.");
  const articleModel = process.env.ARTICLE_MODEL || env.ARTICLE_MODEL || process.env.OPENAI_MODEL || env.OPENAI_MODEL || defaultModels.article;
  const imageModel = process.env.IMAGE_MODEL || env.IMAGE_MODEL || defaultModels.image;
  console.log(`Article model: ${articleModel}`);
  console.log(`Image model: ${imageModel}`);
  const generated = await generateArticle({ apiKey, articleModel, topic });
  await mkdir(outputDirectory, { recursive: true });
  const outputPath = path.join(outputDirectory, `${generated.slug}.json`);
  const imagesDirectory = path.join(outputDirectory, `${generated.slug}-images`);
  const coverPath = path.join(imagesDirectory, "cover.webp");
  const coverThumbPath = path.join(imagesDirectory, "cover-thumb.webp");
  try { await readFile(outputPath); fail(`فایل «${path.relative(root, outputPath)}» از قبل وجود دارد.`); } catch (error) { if (error instanceof Error && error.message.includes("از قبل وجود دارد")) throw error; if (error?.code !== "ENOENT") throw error; }
  try { await stat(imagesDirectory); fail(`پوشهٔ «${path.relative(root, imagesDirectory)}» از قبل وجود دارد.`); } catch (error) { if (error instanceof Error && error.message.includes("از قبل وجود دارد")) throw error; if (error?.code !== "ENOENT") throw error; }
  let createdImagesDirectory = false;
  try {
    await mkdir(imagesDirectory);
    createdImagesDirectory = true;
    await createCover({ apiKey, imageModel, article: generated, coverPath, coverThumbPath });
    const { imageBrief, ...article } = generated;
    await writeFile(outputPath, `${JSON.stringify(article, null, 2)}\n`, "utf8");
  } catch (error) {
    if (createdImagesDirectory) await rm(imagesDirectory, { recursive: true, force: true });
    throw error;
  }
  console.log(`فایل مقاله ساخته شد: ${path.relative(root, outputPath)}`);
  console.log(`فایل کاور ساخته شد: ${path.relative(root, coverPath)}`);
  console.log(`فایل thumbnail ساخته شد: ${path.relative(root, coverThumbPath)}`);
};

main().catch((error) => { console.error(`خطا: ${error instanceof Error ? error.message : "خطای نامشخص"}`); process.exitCode = 1; });
