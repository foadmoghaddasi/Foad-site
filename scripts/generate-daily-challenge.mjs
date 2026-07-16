import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const challengePath = path.join(root, "src/content/daily-challenge.json");
const historyPath = path.join(root, "src/content/daily-challenges-history.json");

const localizedKeys = ["difficulty", "timebox", "category", "title", "scenario", "challenge", "hint"];

const localizedStringSchema = {
  type: "object",
  properties: {
    fa: { type: "string", minLength: 1 },
    en: { type: "string", minLength: 1 },
  },
  required: ["fa", "en"],
  additionalProperties: false,
};

const localizedListSchema = {
  type: "object",
  properties: {
    fa: { type: "array", items: { type: "string", minLength: 1 }, minItems: 3, maxItems: 3 },
    en: { type: "array", items: { type: "string", minLength: 1 }, minItems: 3, maxItems: 3 },
  },
  required: ["fa", "en"],
  additionalProperties: false,
};

const challengeSchema = {
  type: "object",
  properties: {
    date: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
    difficulty: localizedStringSchema,
    timebox: localizedStringSchema,
    category: localizedStringSchema,
    title: localizedStringSchema,
    scenario: localizedStringSchema,
    challenge: localizedStringSchema,
    constraints: localizedListSchema,
    deliverables: localizedListSchema,
    hint: localizedStringSchema,
  },
  required: [
    "date",
    "difficulty",
    "timebox",
    "category",
    "title",
    "scenario",
    "challenge",
    "constraints",
    "deliverables",
    "hint",
  ],
  additionalProperties: false,
};

const validateChallenge = (challenge) => {
  if (!challenge || typeof challenge !== "object") throw new Error("Challenge must be an object.");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(challenge.date ?? "")) throw new Error("Challenge date must be YYYY-MM-DD.");

  for (const key of localizedKeys) {
    if (!challenge[key] || typeof challenge[key].fa !== "string" || typeof challenge[key].en !== "string") {
      throw new Error(`${key} must contain non-empty fa and en strings.`);
    }
  }

  for (const key of ["constraints", "deliverables"]) {
    for (const language of ["fa", "en"]) {
      if (!Array.isArray(challenge[key]?.[language]) || challenge[key][language].length !== 3) {
        throw new Error(`${key}.${language} must contain exactly 3 items.`);
      }
    }
  }

  return challenge;
};

const getTehranDate = () => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tehran",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
};

const extractOutputText = (response) => {
  const texts = (response.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((item) => item.type === "output_text")
    .map((item) => item.text);
  if (!texts.length) throw new Error("OpenAI response did not contain output text.");
  return texts.join("\n").replace(/^```json\s*|\s*```$/g, "").trim();
};

const current = JSON.parse(await readFile(challengePath, "utf8"));

if (process.argv.includes("--validate")) {
  validateChallenge(current);
  console.log(`Weekly challenge is valid: ${current.date} — ${current.title.en}`);
  process.exit(0);
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OPENAI_API_KEY is required.");

const date = getTehranDate();
const history = JSON.parse(await readFile(historyPath, "utf8"));
const recentTitles = history.slice(-30);
const model = process.env.OPENAI_MODEL || "gpt-5.6-luna";

const instructions = `You create one practical weekly product-design exercise for a public portfolio website.
Return only valid JSON. Produce original, realistic, inclusive, non-sensitive scenarios suitable for designers at junior-to-mid level.
Avoid medical diagnosis, financial advice, weapons, politics, dark patterns, manipulative engagement, and ideas that require private user data.
The Persian and English content must be natural equivalents, not awkward literal translations.
The challenge should be completable in 45–120 minutes and teach problem framing, UX reasoning, accessibility, service design, interaction design, or product decision-making.
Never repeat or closely paraphrase a recent title.

Required JSON shape:
{
  "date": "YYYY-MM-DD",
  "difficulty": { "fa": "...", "en": "..." },
  "timebox": { "fa": "...", "en": "..." },
  "category": { "fa": "...", "en": "..." },
  "title": { "fa": "...", "en": "..." },
  "scenario": { "fa": "...", "en": "..." },
  "challenge": { "fa": "...", "en": "..." },
  "constraints": { "fa": ["...", "...", "..."], "en": ["...", "...", "..."] },
  "deliverables": { "fa": ["...", "...", "..."], "en": ["...", "...", "..."] },
  "hint": { "fa": "...", "en": "..." }
}`;

const input = `Create this week's challenge for ${date} in the Asia/Tehran timezone.
Recent challenges to avoid:
${recentTitles
  .map((item) => `- ${item.title?.en ?? item.titleEn} / ${item.title?.fa ?? item.titleFa}`)
  .join("\n")}`;

const response = await fetch("https://api.openai.com/v1/responses", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model,
    instructions,
    input,
    max_output_tokens: 2600,
    reasoning: { effort: "low" },
    text: {
      format: {
        type: "json_schema",
        name: "weekly_design_challenge",
        strict: true,
        schema: challengeSchema,
      },
    },
  }),
});

if (!response.ok) {
  throw new Error(`OpenAI request failed (${response.status}): ${await response.text()}`);
}

const result = await response.json();
const challenge = validateChallenge(JSON.parse(extractOutputText(result)));
challenge.date = date;

const archivedByKey = new Map();
for (const item of [...history, current]) {
  const titleEn = item.title?.en ?? item.titleEn;
  archivedByKey.set(`${item.date}:${titleEn}`, item);
}
const nextHistory = [...archivedByKey.values()].slice(-30);

await writeFile(challengePath, `${JSON.stringify(challenge, null, 2)}\n`);
await writeFile(historyPath, `${JSON.stringify(nextHistory, null, 2)}\n`);
console.log(`Generated weekly challenge with ${model}: ${challenge.title.en}`);
