import { UserError, publicError } from './errors.js';

const requestIdPattern = /^[a-zA-Z0-9_-]{1,40}$/;
const cleanTopic = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
const runMarker = (runId) => new RegExp(`^- Workflow run:\\s*${runId}\\s*$`, 'm');
const metadata = (pr) => {
  const value = (label) => (pr.body?.match(new RegExp(`^- ${label}:[ \\t]*(.+)$`, 'm'))?.[1]?.trim() ?? 'نامشخص').slice(0, 200);
  return {
    prNumber: pr.number, prUrl: pr.html_url, branch: pr.head.ref, headSha: pr.head.sha,
    faTitle: value('Persian title'), enTitle: value('English title'), slug: value('Slug'),
  };
};

export function createArticleBot({ api, store, services, config, now = () => Date.now() }) {
  const isAllowed = (userId) => /^\d+$/.test(String(config.allowedUserId))
    && String(userId) === String(config.allowedUserId);
  const send = (chatId, text, keyboard) => api.sendMessage({
    chat_id: chatId, text, ...(keyboard ? { reply_markup: { inline_keyboard: keyboard } } : {}),
  });
  const checkKeyboard = (id) => [[{ text: 'بررسی وضعیت', callback_data: `status:check:${id}` }]];
  const reviewKeyboard = (id, sha) => [
    [{ text: 'تأیید و انتشار', callback_data: `review:approve:${id}:${sha.slice(0, 12)}` }, { text: 'رد مقاله', callback_data: `review:reject:${id}:${sha.slice(0, 12)}` }],
    ...checkKeyboard(id),
  ];
  const confirmKeyboard = (id) => [[
    { text: 'تأیید و ساخت مقاله', callback_data: `article:confirm:${id}` },
    { text: 'لغو', callback_data: `article:cancel:${id}` },
  ]];
  async function transition(request, patch, notExpiredAt) {
    return store.transition(request.id, request.status, { ...patch, updatedAt: now() }, notExpiredAt);
  }
  async function owned(id, userId, chatId) {
    const request = requestIdPattern.test(id) ? await store.get(id) : null;
    if (!request || request.userId !== String(userId) || request.chatId !== chatId) {
      throw new UserError('این درخواست برای این کاربر و چت معتبر نیست.');
    }
    return request;
  }
  async function show(request) {
    const { chatId, id, status } = request;
    const footer = `\nشناسه درخواست: ${id}`;
    if (status === 'confirming') {
      if (request.expiresAt <= now()) {
        await transition(request, { status: 'expired' });
        return send(chatId, 'مهلت تأیید موضوع تمام شده است؛ موضوع را دوباره بفرستید.');
      }
      return send(chatId, `متن موضوع:\n\n${request.topic}\n\nآیا مقاله ساخته شود؟${footer}`, confirmKeyboard(id));
    }
    if (status === 'watching') {
      return send(chatId, `ساخت مقاله در حال اجراست. برای دریافت نتیجه «بررسی وضعیت» را بزنید.\n${request.workflowUrl ?? ''}${footer}`, checkKeyboard(id));
    }
    if (status === 'awaiting_review') {
      return send(chatId, `ساخت مقاله موفق بود.\n\nعنوان فارسی: ${request.faTitle}\nعنوان انگلیسی: ${request.enTitle}\nslug: ${request.slug}\nBuild: موفق\nPull Request: ${request.prUrl}${footer}`, reviewKeyboard(id, request.headSha));
    }
    const messages = {
      transcribing: 'ویس در حال تبدیل به متن است. اگر عملیات قطع شده، ویس را دوباره بفرستید.',
      dispatching: 'درخواست ساخت ثبت شده است. برای جلوگیری از ساخت تکراری دوباره اجرا نمی‌شود؛ وضعیت GitHub را بررسی کنید.',
      dispatch_uncertain: 'نتیجهٔ شروع ساخت قطعی نیست؛ دوباره ساخت را تأیید نکنید. پس از بررسی GitHub، با /attach شناسهٔ اجرای درست را متصل کنید.',
      merging: 'نتیجهٔ Merge هنوز قطعی نیست؛ با بررسی وضعیت، نتیجه از GitHub خوانده می‌شود.',
      rejecting: 'نتیجهٔ بستن PR هنوز قطعی نیست؛ وضعیت را بررسی کنید.',
      merged: 'مقاله Merge شد. نتیجهٔ انتشار لیارا باید جداگانه بررسی شود.',
      rejected: 'مقاله رد و Pull Request بسته شد.',
      failed: 'ساخت مقاله ناموفق بود؛ جزئیات را در GitHub بررسی کنید.',
      transcription_failed: 'تبدیل ویس انجام نشد؛ پس از رفع خطا ویس را دوباره بفرستید.',
      expired: 'مهلت تأیید موضوع تمام شده است؛ موضوع را دوباره بفرستید.',
      cancelled: 'ساخت مقاله لغو شد.',
    };
    return send(chatId, `${messages[status] ?? 'وضعیت درخواست مشخص نیست.'}${request.prUrl ? `\n${request.prUrl}` : ''}${request.workflowUrl ? `\n${request.workflowUrl}` : ''}${footer}`, checkKeyboard(id));
  }
  async function syncPull(request, pr) {
    if (!runMarker(request.workflowRunId).test(pr.body ?? '')) throw new UserError('این PR به اجرای ثبت‌شده مربوط نیست.', 'INVALID_PR');
    const status = pr.merged === true || pr.merged_at ? 'merged' : pr.state === 'closed' ? 'rejected'
      : ['merging', 'rejecting'].includes(request.status) ? request.status : 'awaiting_review';
    await transition(request, { ...metadata(pr), status, lastError: null });
    return store.get(request.id);
  }
  async function check(request) {
    if (request.status === 'watching') {
      const run = await services.getRun(request.workflowRunId);
      if (run.status !== 'completed') return show(request);
      if (run.conclusion !== 'success') {
        await transition(request, { status: 'failed', lastError: 'WORKFLOW_FAILED' });
      } else {
        const pr = await services.findPull(run.id);
        if (!pr) return send(request.chatId, 'ساخت تمام شده، اما PR هنوز پیدا نشده است؛ دوباره بررسی کنید.', checkKeyboard(request.id));
        return show(await syncPull(request, pr));
      }
    } else if (['awaiting_review', 'merging', 'rejecting'].includes(request.status) && request.prNumber) {
      return show(await syncPull(request, await services.getPull(request.prNumber)));
    }
    return show(await store.get(request.id));
  }
  async function createRequest(message, ctx) {
    const updateId = ctx?.update?.update_id;
    const id = Number.isSafeInteger(updateId) ? `u${updateId}` : `m${message.chat.id}_${message.message_id}`;
    if (!requestIdPattern.test(id) || (!Number.isSafeInteger(updateId) && !Number.isSafeInteger(message.message_id))) {
      throw new UserError('شناسهٔ پیام معتبر نیست.');
    }
    const voice = message.voice;
    let topic = voice ? '' : cleanTopic(message.text);
    if (!voice && (!topic || topic.length > config.maxTopicLength)) throw new UserError('موضوع باید بین ۱ تا ۲۵۰۰ کاراکتر باشد.');
    const timestamp = now();
    const request = {
      id, userId: String(message.from.id), chatId: message.chat.id, topic,
      status: voice ? 'transcribing' : 'confirming',
      createdAt: timestamp, updatedAt: timestamp, expiresAt: timestamp + config.confirmationTtlMs,
    };
    if (!await store.insert(request)) return show(await owned(id, message.from.id, message.chat.id));
    if (voice) {
      try {
        await send(request.chatId, 'ویس دریافت شد؛ در حال تبدیل به متن…');
        topic = cleanTopic(await services.transcribe(voice));
        if (!topic || topic.length > config.maxTopicLength) throw new UserError('متن ویس خالی یا طولانی است؛ موضوع کوتاه‌تری بفرستید.');
        await transition(request, { topic, status: 'confirming', expiresAt: now() + config.confirmationTtlMs });
      } catch (error) {
        await transition(request, { status: 'transcription_failed', lastError: error instanceof UserError ? error.code : 'TRANSCRIPTION_FAILED' });
        throw error;
      }
    }
    return show(await store.get(id));
  }
  async function confirm(request, action) {
    if (request.status !== 'confirming') return check(request);
    if (request.expiresAt <= now()) {
      await transition(request, { status: 'expired' });
      return show(await store.get(request.id));
    }
    if (action === 'cancel') {
      await transition(request, { status: 'cancelled' });
      return show(await store.get(request.id));
    }
    await services.ensureGithubReady();
    if (!await transition(request, { status: 'dispatching', confirmedAt: now(), lastError: null }, now())) {
      return show(await store.get(request.id));
    }
    try {
      const result = await services.dispatch(request.topic);
      await store.transition(request.id, 'dispatching', { ...result, status: 'watching', updatedAt: now() });
    } catch (error) {
      // A network failure may follow a successful dispatch. Never auto-retry it.
      await store.transition(request.id, 'dispatching', {
        status: error instanceof UserError && !error.uncertain ? 'confirming' : 'dispatch_uncertain',
        lastError: error instanceof UserError ? error.code : 'DISPATCH_UNCERTAIN', updatedAt: now(),
      });
      throw error;
    }
    return show(await store.get(request.id));
  }
  async function review(request, action, shownSha) {
    if (request.status !== 'awaiting_review' || !request.prNumber) return check(request);
    if (shownSha !== request.headSha?.slice(0, 12)) {
      throw new UserError('این دکمه مربوط به نسخهٔ قبلی PR است؛ وضعیت را بررسی و از دکمه‌های جدید استفاده کنید.', 'STALE_REVIEW');
    }
    await services.ensureGithubReady();
    const pr = await services.getPull(request.prNumber);
    if (!runMarker(request.workflowRunId).test(pr.body ?? '')) throw new UserError('PR به این درخواست مربوط نیست.', 'INVALID_PR');
    if (pr.state !== 'open' || pr.merged === true) return show(await syncPull(request, pr));
    if (pr.head.sha !== request.headSha) {
      const refreshed = await syncPull(request, pr);
      await send(request.chatId, 'محتوای PR بعد از نمایش قبلی تغییر کرده است؛ نسخهٔ جدید را بررسی و دوباره تصمیم بگیرید.');
      return show(refreshed);
    }
    if (action === 'approve' && pr.mergeable !== true) throw new UserError('PR فعلاً قابل Merge نیست؛ کمی بعد وضعیت را بررسی کنید.', 'NOT_MERGEABLE');
    const workingStatus = action === 'approve' ? 'merging' : 'rejecting';
    if (!await transition(request, { status: workingStatus, reviewDecision: action, reviewedAt: now(), lastError: null })) {
      return show(await store.get(request.id));
    }
    try {
      if (action === 'approve') await services.merge(request.prNumber, request.headSha);
      else await services.reject(request.prNumber, request.branch);
      await store.transition(request.id, workingStatus, { status: action === 'approve' ? 'merged' : 'rejected', updatedAt: now() });
    } catch (error) {
      await store.transition(request.id, workingStatus, {
        status: error instanceof UserError && !error.uncertain ? 'awaiting_review' : workingStatus,
        lastError: error instanceof UserError ? error.code : 'REVIEW_UNCERTAIN', updatedAt: now(),
      });
      throw error;
    }
    return show(await store.get(request.id));
  }
  async function attach(message, requestId, rawRunId) {
    const request = await owned(requestId, message.from.id, message.chat.id);
    const runId = Number(rawRunId);
    if (!['dispatching', 'dispatch_uncertain'].includes(request.status) || !Number.isSafeInteger(runId) || runId < 1) {
      throw new UserError('اتصال دستی فقط برای درخواست با نتیجهٔ شروع نامشخص مجاز است.');
    }
    const run = await services.getRun(runId);
    if (!Number.isFinite(Date.parse(run.created_at)) || Date.parse(run.created_at) < request.createdAt - 60_000) {
      throw new UserError('این اجرا قدیمی‌تر از درخواست مقاله است.');
    }
    await transition(request, { status: 'watching', workflowRunId: run.id, workflowUrl: run.html_url, lastError: null });
    return check(await store.get(request.id));
  }
  return {
    async message(message, ctx) {
      if (!message?.from || !isAllowed(message.from.id) || !Number.isSafeInteger(message.chat?.id)) return;
      try {
        const parts = message.text?.trim().split(/\s+/) ?? [];
        const command = parts[0]?.replace(/@[a-zA-Z0-9_]+$/, '');
        if (command === '/start') return send(message.chat.id, 'سلام! موضوع مقاله را به صورت متن یا ویس بفرست.\n/ping وضعیت بات\n/status وضعیت آخرین مقاله\n/status شناسه‌درخواست\n/attach شناسه‌درخواست شناسه‌اجرایGitHub');
        if (command === '/ping') return send(message.chat.id, 'بات فعاله ✅');
        if (command === '/status') {
          const request = parts[1] ? await owned(parts[1], message.from.id, message.chat.id) : await store.latest(message.from.id, message.chat.id);
          return request ? await check(request) : await send(message.chat.id, 'هنوز درخواستی ثبت نشده است.');
        }
        if (command === '/attach') return await attach(message, parts[1] ?? '', parts[2]);
        if (command?.startsWith('/')) return send(message.chat.id, 'دستور شناخته نشد؛ /start را بفرستید.');
        if (message.voice || message.text) return await createRequest(message, ctx);
      } catch (error) { return send(message.chat.id, `خطا: ${publicError(error)}`); }
    },
    async callback(callback) {
      if (!callback?.id) return;
      if (!callback.from || !isAllowed(callback.from.id)) {
        return api.answerCallbackQuery({ callback_query_id: callback.id, text: 'دسترسی مجاز نیست.' });
      }
      await api.answerCallbackQuery({ callback_query_id: callback.id });
      const chatId = callback.message?.chat?.id;
      if (!Number.isSafeInteger(chatId)) return;
      try {
        const match = String(callback.data ?? '').match(/^(article:(?:confirm|cancel)|status:check|review:(?:approve|reject)):([a-zA-Z0-9_-]{1,40})(?::([a-f0-9]{12}))?$/);
        if (!match) throw new UserError('دستور معتبر نیست.');
        const [kind, action] = match[1].split(':');
        const request = await owned(match[2], callback.from.id, chatId);
        if (kind === 'article') return await confirm(request, action);
        if (kind === 'review') return await review(request, action, match[3]);
        return await check(request);
      } catch (error) { return send(chatId, `خطا: ${publicError(error)}`); }
    },
  };
}
