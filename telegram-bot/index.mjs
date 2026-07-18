import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { randomUUID } from "node:crypto";

const directory = path.dirname(fileURLToPath(import.meta.url));
const pendingTopics = new Map();

const readEnvFile = async () => {
  try {
    const source = await readFile(path.join(directory, ".env"), "utf8");
    return Object.fromEntries(source.split(/\r?\n/).flatMap((line) => {
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
      if (!match || line.trimStart().startsWith("#")) return [];
      return [[match[1], match[2].replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, "$1$2")]];
    }));
  } catch (error) {
    if (error?.code === "ENOENT") return {};
    throw error;
  }
};

const fail = (message) => { throw new Error(message); };
const cleanTopic = (topic) => String(topic ?? "").replace(/\s+/g, " ").trim();

const main = async () => {
  const fileEnv = await readEnvFile();
  const config = Object.fromEntries(["TELEGRAM_BOT_TOKEN", "TELEGRAM_ALLOWED_USER_ID", "OPENAI_API_KEY", "GITHUB_TOKEN", "GITHUB_OWNER", "GITHUB_REPO"].map((key) => [key, process.env[key] || fileEnv[key]]));
  for (const [key, value] of Object.entries(config)) if (!value) fail(`متغیر محیطی ${key} تنظیم نشده است.`);

  const telegram = async (method, body = {}) => {
    const response = await fetch(`https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) throw new Error(payload.description || `خطای Telegram API (${response.status})`);
    return payload.result;
  };

  const send = (chatId, text, replyMarkup) => telegram("sendMessage", {
    chat_id: chatId,
    text,
    ...(replyMarkup ? { reply_markup: replyMarkup } : {}),
  });

  const isAllowed = (userId) => String(userId) === String(config.TELEGRAM_ALLOWED_USER_ID);

  const transcribeVoice = async (voice) => {
    const file = await telegram("getFile", { file_id: voice.file_id });
    const audioResponse = await fetch(`https://api.telegram.org/file/bot${config.TELEGRAM_BOT_TOKEN}/${file.file_path}`);
    if (!audioResponse.ok) throw new Error("دانلود فایل صوتی از تلگرام ناموفق بود.");
    const form = new FormData();
    form.set("model", "gpt-4o-mini-transcribe");
    form.set("language", "fa");
    form.set("response_format", "json");
    form.set("file", new Blob([await audioResponse.arrayBuffer()], { type: "audio/ogg" }), "voice.ogg");
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${config.OPENAI_API_KEY}` },
      body: form,
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(`تبدیل ویس به متن ناموفق بود (${response.status}).`);
    return cleanTopic(payload.text);
  };

  const askForConfirmation = async (chatId, userId, topic) => {
    if (!topic) throw new Error("متن قابل استفاده‌ای از پیام دریافت نشد.");
    const id = randomUUID().replaceAll("-", "").slice(0, 24);
    pendingTopics.set(id, { userId: String(userId), topic, expiresAt: Date.now() + 15 * 60 * 1000 });
    await send(chatId, `متن موضوع:\n\n${topic}\n\nآیا مقاله ساخته شود؟`, {
      inline_keyboard: [[
        { text: "تأیید و ساخت مقاله", callback_data: `article:confirm:${id}` },
        { text: "لغو", callback_data: `article:cancel:${id}` },
      ]],
    });
  };

  const triggerWorkflow = async (topic) => {
    const response = await fetch(`https://api.github.com/repos/${config.GITHUB_OWNER}/${config.GITHUB_REPO}/actions/workflows/generate-bilingual-article.yml/dispatches`, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${config.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ref: "main", inputs: { topic } }),
    });
    if (!response.ok) throw new Error(`اجرای Workflow گیت‌هاب ناموفق بود (${response.status}).`);
  };

  const handleMessage = async (message) => {
    if (!message?.from || !isAllowed(message.from.id)) return;
    try {
      if (message.text) {
        await askForConfirmation(message.chat.id, message.from.id, cleanTopic(message.text));
        return;
      }
      if (message.voice) {
        await send(message.chat.id, "ویس دریافت شد؛ در حال تبدیل به متن…");
        const topic = await transcribeVoice(message.voice);
        await askForConfirmation(message.chat.id, message.from.id, topic);
      }
    } catch (error) {
      await send(message.chat.id, `خطا: ${error instanceof Error ? error.message : "خطای نامشخص"}`);
    }
  };

  const handleCallback = async (callback) => {
    if (!callback?.from || !isAllowed(callback.from.id)) return;
    await telegram("answerCallbackQuery", { callback_query_id: callback.id });
    const [, action, id] = String(callback.data ?? "").split(":");
    const pending = pendingTopics.get(id);
    const chatId = callback.message?.chat?.id;
    if (!chatId) return;
    if (!pending || pending.userId !== String(callback.from.id) || pending.expiresAt < Date.now()) {
      if (id) pendingTopics.delete(id);
      await send(chatId, "این درخواست منقضی شده یا معتبر نیست.");
      return;
    }
    pendingTopics.delete(id);
    try {
      if (action === "cancel") {
        await send(chatId, "ساخت مقاله لغو شد.");
        return;
      }
      if (action !== "confirm") throw new Error("دستور تأیید معتبر نیست.");
      await triggerWorkflow(pending.topic);
      await send(chatId, "فرایند ساخت مقاله شروع شد.");
    } catch (error) {
      await send(chatId, `خطا: ${error instanceof Error ? error.message : "خطای نامشخص"}`);
    }
  };

  let offset = 0;
  console.log("Telegram bot is running.");
  while (true) {
    try {
      const updates = await telegram("getUpdates", { offset, timeout: 30, allowed_updates: ["message", "callback_query"] });
      for (const update of updates) {
        offset = update.update_id + 1;
        if (update.message) await handleMessage(update.message);
        if (update.callback_query) await handleCallback(update.callback_query);
      }
    } catch (error) {
      console.error(`Bot polling error: ${error instanceof Error ? error.message : "Unknown error"}`);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
};

main().catch((error) => {
  console.error(`Bot startup error: ${error instanceof Error ? error.message : "Unknown error"}`);
  process.exitCode = 1;
});
