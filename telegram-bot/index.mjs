import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { randomUUID } from "node:crypto";

const directory = path.dirname(fileURLToPath(import.meta.url));
const pendingPath = path.join(directory, "data", "pending-articles.json");
const pendingTopics = new Map();
const activeMonitors = new Set();
const workflowFile = "generate-bilingual-article.yml";
const monitorInterval = 15_000;
const monitorTimeout = 10 * 60_000;
const defaultTranscriptionModel = "gpt-4o-mini-transcribe";

const fail = (message) => { throw new Error(message); };
const cleanTopic = (value) => String(value ?? "").replace(/\s+/g, " ").trim();
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

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

const loadPending = async () => {
  try {
    const stored = JSON.parse(await readFile(pendingPath, "utf8"));
    for (const [id, request] of Object.entries(stored)) pendingTopics.set(id, request);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
};

const savePending = async () => {
  await mkdir(path.dirname(pendingPath), { recursive: true });
  await writeFile(pendingPath, `${JSON.stringify(Object.fromEntries(pendingTopics), null, 2)}\n`, "utf8");
};

const main = async () => {
  const fileEnv = await readEnvFile();
  const config = Object.fromEntries(["TELEGRAM_BOT_TOKEN", "TELEGRAM_ALLOWED_USER_ID", "OPENAI_API_KEY", "GITHUB_TOKEN", "GITHUB_OWNER", "GITHUB_REPO"].map((key) => [key, process.env[key] || fileEnv[key]]));
  for (const [key, value] of Object.entries(config)) if (!value) fail(`متغیر محیطی ${key} تنظیم نشده است.`);
  const transcriptionModel = process.env.TRANSCRIPTION_MODEL || fileEnv.TRANSCRIPTION_MODEL || defaultTranscriptionModel;
  await loadPending();

  const telegram = async (method, body = {}) => {
    const response = await fetch(`https://api.telegram.org/bot${config.TELEGRAM_BOT_TOKEN}/${method}`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) throw new Error(payload.description || `خطای Telegram API (${response.status})`);
    return payload.result;
  };
  const send = (chatId, text, replyMarkup) => telegram("sendMessage", { chat_id: chatId, text, ...(replyMarkup ? { reply_markup: replyMarkup } : {}) });
  const isAllowed = (userId) => String(userId) === String(config.TELEGRAM_ALLOWED_USER_ID);
  const github = async (apiPath, options = {}) => {
    const response = await fetch(`https://api.github.com/repos/${config.GITHUB_OWNER}/${config.GITHUB_REPO}${apiPath}`, {
      ...options,
      headers: {
        Accept: "application/vnd.github+json", Authorization: `Bearer ${config.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json", ...(options.headers ?? {}),
      },
    });
    if (!response.ok) throw new Error(`GitHub API ناموفق بود (${response.status}).`);
    return response.status === 204 ? undefined : response.json();
  };
  const workflowRuns = () => github(`/actions/workflows/${workflowFile}/runs?event=workflow_dispatch&per_page=100`);

  const transcribeVoice = async (voice) => {
    const file = await telegram("getFile", { file_id: voice.file_id });
    const audioResponse = await fetch(`https://api.telegram.org/file/bot${config.TELEGRAM_BOT_TOKEN}/${file.file_path}`);
    if (!audioResponse.ok) throw new Error("دانلود فایل صوتی از تلگرام ناموفق بود.");
    const form = new FormData();
    form.set("model", transcriptionModel);
    form.set("language", "fa");
    form.set("response_format", "json");
    form.set("file", new Blob([await audioResponse.arrayBuffer()], { type: "audio/ogg" }), "voice.ogg");
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", { method: "POST", headers: { Authorization: `Bearer ${config.OPENAI_API_KEY}` }, body: form });
    const payload = await response.json();
    if (!response.ok) throw new Error(`تبدیل ویس به متن ناموفق بود (${response.status}).`);
    return cleanTopic(payload.text);
  };

  const findRun = async (request) => {
    const runs = await workflowRuns();
    const startedAfter = request.triggeredAt - 60_000;
    return runs.workflow_runs.find((run) => !request.knownRunIds.includes(run.id) && Date.parse(run.created_at) >= startedAfter);
  };
  const findPullRequest = async (runId) => {
    const pulls = await github("/pulls?state=open&sort=created&direction=desc&per_page=100");
    return pulls.find((pr) => pr.head?.ref?.startsWith("article/") && pr.body?.includes(`Workflow run: ${runId}`));
  };
  const metadataFromPullRequest = (pr) => {
    const value = (label) => pr.body?.match(new RegExp(`^- ${label}:\\s*(.+)$`, "m"))?.[1]?.trim() ?? "نامشخص";
    return { faTitle: value("Persian title"), enTitle: value("English title"), slug: value("Slug") };
  };
  const resultKeyboard = (id) => ({ inline_keyboard: [[
    { text: "تأیید و انتشار", callback_data: `review:approve:${id}` },
    { text: "رد مقاله", callback_data: `review:reject:${id}` },
  ]] });

  const monitorRequest = async (id) => {
    if (activeMonitors.has(id)) return;
    activeMonitors.add(id);
    try {
      while (Date.now() - (pendingTopics.get(id)?.triggeredAt ?? 0) < monitorTimeout) {
        const request = pendingTopics.get(id);
        if (!request || request.status !== "watching") return;
        const run = request.workflowRunId ? { id: request.workflowRunId, ...(await github(`/actions/runs/${request.workflowRunId}`)) } : await findRun(request);
        if (!run) { await sleep(monitorInterval); continue; }
        if (!request.workflowRunId) {
          request.workflowRunId = run.id;
          request.workflowUrl = run.html_url;
          await savePending();
        }
        if (run.status !== "completed") { await sleep(monitorInterval); continue; }
        if (run.conclusion !== "success") {
          request.status = "failed";
          await savePending();
          await send(request.chatId, `ساخت مقاله ناموفق بود.${request.workflowUrl ? `\n${request.workflowUrl}` : ""}`);
          return;
        }
        const pr = await findPullRequest(run.id);
        if (!pr) { await sleep(monitorInterval); continue; }
        const metadata = metadataFromPullRequest(pr);
        Object.assign(request, { status: "awaiting_review", prNumber: pr.number, prUrl: pr.html_url, branch: pr.head.ref, ...metadata });
        await savePending();
        await send(request.chatId, `ساخت مقاله موفق بود.\n\nعنوان فارسی: ${request.faTitle}\nعنوان انگلیسی: ${request.enTitle}\nslug: ${request.slug}\nBuild: موفق\nPull Request: ${request.prUrl}`, resultKeyboard(id));
        return;
      }
      const request = pendingTopics.get(id);
      if (request?.status === "watching") {
        request.status = "failed";
        await savePending();
        await send(request.chatId, "ساخت مقاله ناموفق بود. زمان انتظار به پایان رسید.");
      }
    } catch (error) {
      const request = pendingTopics.get(id);
      if (request) await send(request.chatId, `ساخت مقاله ناموفق بود.\n${error instanceof Error ? error.message : "خطای نامشخص"}`);
    } finally {
      activeMonitors.delete(id);
    }
  };

  const askForConfirmation = async (chatId, userId, topic) => {
    if (!topic) throw new Error("متن قابل استفاده‌ای از پیام دریافت نشد.");
    const id = randomUUID().replaceAll("-", "").slice(0, 24);
    pendingTopics.set(id, { userId: String(userId), chatId, topic, status: "confirming", expiresAt: Date.now() + 15 * 60_000 });
    await savePending();
    await send(chatId, `متن موضوع:\n\n${topic}\n\nآیا مقاله ساخته شود؟`, { inline_keyboard: [[{ text: "تأیید و ساخت مقاله", callback_data: `article:confirm:${id}` }, { text: "لغو", callback_data: `article:cancel:${id}` }]] });
  };

  const triggerWorkflow = async (topic) => {
    const runs = await workflowRuns();
    await github(`/actions/workflows/${workflowFile}/dispatches`, { method: "POST", body: JSON.stringify({ ref: "main", inputs: { topic } }) });
    return { knownRunIds: runs.workflow_runs.map((run) => run.id), triggeredAt: Date.now() };
  };

  const handleMessage = async (message) => {
    if (!message?.from || !isAllowed(message.from.id)) return;
    try {
      if (message.text) return await askForConfirmation(message.chat.id, message.from.id, cleanTopic(message.text));
      if (message.voice) {
        await send(message.chat.id, "ویس دریافت شد؛ در حال تبدیل به متن…");
        await askForConfirmation(message.chat.id, message.from.id, await transcribeVoice(message.voice));
      }
    } catch (error) { await send(message.chat.id, `خطا: ${error instanceof Error ? error.message : "خطای نامشخص"}`); }
  };

  const handleArticleCallback = async (action, id, request, chatId) => {
    if (request.status !== "confirming" || request.expiresAt < Date.now()) throw new Error("این درخواست منقضی شده یا معتبر نیست.");
    if (action === "cancel") {
      pendingTopics.delete(id);
      await savePending();
      await send(chatId, "ساخت مقاله لغو شد.");
      return;
    }
    if (action !== "confirm") throw new Error("دستور تأیید معتبر نیست.");
    Object.assign(request, { status: "watching", ...(await triggerWorkflow(request.topic)) });
    await savePending();
    await send(chatId, "فرایند ساخت مقاله شروع شد.");
    void monitorRequest(id);
  };
  const handleReviewCallback = async (action, id, request, chatId) => {
    if (request.status !== "awaiting_review" || !request.prNumber) throw new Error("این درخواست انتشار معتبر نیست.");
    const pr = await github(`/pulls/${request.prNumber}`);
    if (pr.state !== "open") throw new Error("این Pull Request دیگر باز نیست.");
    if (action === "approve") {
      if (pr.mergeable !== true) throw new Error("Pull Request فعلاً قابل Merge نیست.");
      await github(`/pulls/${request.prNumber}/merge`, { method: "PUT", body: JSON.stringify({ merge_method: "squash" }) });
      request.status = "merged";
      await savePending();
      await send(chatId, "مقاله تأیید شد و انتشار روی لیارا آغاز شد.");
      return;
    }
    if (action !== "reject") throw new Error("دستور انتشار معتبر نیست.");
    await github(`/pulls/${request.prNumber}`, { method: "PATCH", body: JSON.stringify({ state: "closed" }) });
    try { await github(`/git/refs/heads/${encodeURIComponent(request.branch)}`, { method: "DELETE" }); } catch { /* Closing the PR remains successful if branch deletion is unavailable. */ }
    request.status = "rejected";
    await savePending();
    await send(chatId, "مقاله رد و درخواست انتشار بسته شد.");
  };

  const handleCallback = async (callback) => {
    if (!callback?.from || !isAllowed(callback.from.id)) return;
    const chatId = callback.message?.chat?.id;
    await telegram("answerCallbackQuery", { callback_query_id: callback.id });
    if (!chatId) return;
    const [kind, action, id] = String(callback.data ?? "").split(":");
    const request = pendingTopics.get(id);
    if (!request || request.userId !== String(callback.from.id)) return await send(chatId, "این درخواست منقضی شده یا معتبر نیست.");
    try {
      if (kind === "article") await handleArticleCallback(action, id, request, chatId);
      else if (kind === "review") await handleReviewCallback(action, id, request, chatId);
      else throw new Error("دستور معتبر نیست.");
    } catch (error) { await send(chatId, `خطا: ${error instanceof Error ? error.message : "خطای نامشخص"}`); }
  };

  for (const [id, request] of pendingTopics) if (request.status === "watching") void monitorRequest(id);
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
    } catch (error) { console.error(`Bot polling error: ${error instanceof Error ? error.message : "Unknown error"}`); await sleep(3000); }
  }
};

main().catch((error) => { console.error(`Bot startup error: ${error instanceof Error ? error.message : "Unknown error"}`); process.exitCode = 1; });
