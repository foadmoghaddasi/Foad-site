import { UserError } from './errors.js';

export function createIntegrations({ api, fetch, FormData, InputFile, config, resolveCredential }) {
  const credentials = new Map();
  async function credential(name) {
    if (!credentials.has(name)) {
      const value = await resolveCredential(name);
      if (typeof value !== 'string' || !value) throw new UserError('کلید سرویس ذخیره نشده است؛ صفحهٔ تنظیمات بات را باز کنید.', 'CREDENTIAL_MISSING');
      credentials.set(name, value);
    }
    return credentials.get(name);
  }
  function repositoryPath() {
    if (!/^[a-zA-Z0-9_.-]+$/.test(config.githubOwner) || !/^[a-zA-Z0-9_.-]+$/.test(config.githubRepo)) {
      throw new UserError('نام مالک و مخزن GitHub تنظیم نشده است.', 'CONFIG_REQUIRED');
    }
    return `https://api.github.com/repos/${encodeURIComponent(config.githubOwner)}/${encodeURIComponent(config.githubRepo)}`;
  }
  async function github(path, options = {}) {
    const url = repositoryPath() + path;
    const token = await credential('GITHUB_TOKEN');
    const mutation = options.method && options.method !== 'GET';
    let response;
    try {
      response = await fetch(url, {
        ...options,
        headers: {
          Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}`,
          'User-Agent': 'foad-site-telegram-serverless',
          'X-GitHub-Api-Version': config.githubApiVersion, 'Content-Type': 'application/json',
        },
      });
    } catch {
      throw new UserError('پاسخ GitHub دریافت نشد؛ وضعیت را بررسی کنید.', 'GITHUB_NETWORK', Boolean(mutation));
    }
    if (!response.ok) {
      throw new UserError(`درخواست GitHub ناموفق بود (${response.status}).`, 'GITHUB_HTTP', Boolean(mutation && response.status >= 500));
    }
    if (response.status === 204) return null;
    try { return await response.json(); } catch {
      throw new UserError('پاسخ GitHub قابل خواندن نبود.', 'GITHUB_RESPONSE', Boolean(mutation));
    }
  }
  function validatePull(pr) {
    const repo = `${config.githubOwner}/${config.githubRepo}`.toLowerCase();
    if (!pr?.number || pr.head?.repo?.full_name?.toLowerCase() !== repo
      || pr.base?.repo?.full_name?.toLowerCase() !== repo
      || pr.base?.ref !== config.githubRef || !pr.head?.ref?.startsWith('article/')
      || !/^[a-f0-9]{40}$/.test(pr.head?.sha)) {
      throw new UserError('این Pull Request متعلق به مسیر انتشار مقاله نیست.', 'INVALID_PR');
    }
    return pr;
  }
  function validateRun(run) {
    if (!Number.isSafeInteger(run?.id) || run.event !== 'workflow_dispatch'
      || run.head_branch !== config.githubRef
      || run.path?.split('@')[0] !== `.github/workflows/${config.workflowFile}`) {
      throw new UserError('Workflow انتخاب‌شده معتبر نیست.', 'INVALID_RUN');
    }
    return run;
  }
  return {
    async ensureGithubReady() { repositoryPath(); await credential('GITHUB_TOKEN'); },
    async transcribe(voice) {
      if (voice.file_size > config.maxVoiceBytes) {
        throw new UserError('ویس باید حداکثر ۲۰ مگابایت باشد.', 'VOICE_LIMIT');
      }
      const token = await credential('OPENAI_API_KEY');
      const bytes = await api.getFileContent(voice.file_id);
      if (bytes.byteLength > config.maxVoiceBytes) throw new UserError('حجم ویس بیش از حد مجاز است.', 'VOICE_LIMIT');
      const form = new FormData();
      form.append('model', config.transcriptionModel);
      form.append('language', 'fa');
      form.append('response_format', 'json');
      form.append('file', new InputFile(bytes, 'voice.ogg', { type: 'audio/ogg' }));
      let response;
      try {
        response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: form,
        });
      } catch { throw new UserError('پاسخ تبدیل ویس دریافت نشد؛ ویس را دوباره بفرستید.', 'TRANSCRIPTION_NETWORK'); }
      if (!response.ok) throw new UserError(`تبدیل ویس ناموفق بود (${response.status}).`, 'TRANSCRIPTION_HTTP');
      const result = await response.json();
      if (typeof result.text !== 'string') throw new UserError('متن معتبری از ویس دریافت نشد.', 'TRANSCRIPTION_RESPONSE');
      return result.text;
    },
    async dispatch(topic) {
      const result = await github(`/actions/workflows/${encodeURIComponent(config.workflowFile)}/dispatches`, {
        method: 'POST', body: JSON.stringify({ ref: config.githubRef, inputs: { topic } }),
      });
      // Current version returns the exact ID. Never guess a run from timestamps.
      if (!Number.isSafeInteger(result?.workflow_run_id) || result.workflow_run_id < 1) {
        throw new UserError('ساخت ممکن است شروع شده باشد، اما شناسهٔ اجرا دریافت نشد؛ دوباره تأیید نکنید.', 'DISPATCH_UNCERTAIN', true);
      }
      return { workflowRunId: result.workflow_run_id, workflowUrl: result.html_url };
    },
    async getRun(id) {
      const run = validateRun(await github(`/actions/runs/${id}`));
      if (run.id !== id) throw new UserError('شناسهٔ Workflow با درخواست مطابقت ندارد.', 'INVALID_RUN');
      return run;
    },
    async findPull(runId) {
      const marker = new RegExp(`^- Workflow run:\\s*${runId}\\s*$`, 'm');
      // Bounded pagination; a missing PR can be checked again on the next update.
      for (let page = 1; page <= 3; page += 1) {
        const pulls = await github(`/pulls?state=all&sort=created&direction=desc&per_page=100&page=${page}`);
        const found = pulls.find((pr) => marker.test(pr.body ?? '') && pr.head?.ref?.startsWith('article/'));
        if (found) return validatePull(found);
        if (pulls.length < 100) break;
      }
      return null;
    },
    async getPull(number) {
      const pr = validatePull(await github(`/pulls/${number}`));
      if (pr.number !== number) throw new UserError('شمارهٔ PR با درخواست مطابقت ندارد.', 'INVALID_PR');
      return pr;
    },
    async merge(number, sha) {
      const result = await github(`/pulls/${number}/merge`, {
        method: 'PUT', body: JSON.stringify({ merge_method: 'squash', sha }),
      });
      if (result?.merged !== true) throw new UserError('GitHub ادغام مقاله را تأیید نکرد؛ دوباره وضعیت را بررسی کنید.', 'MERGE_NOT_CONFIRMED', true);
    },
    async reject(number, branch) {
      const result = await github(`/pulls/${number}`, { method: 'PATCH', body: JSON.stringify({ state: 'closed' }) });
      if (result?.state !== 'closed') throw new UserError('بستن PR هنوز تأیید نشده است؛ وضعیت را بررسی کنید.', 'REJECTION_UNCERTAIN', true);
      if (branch?.startsWith('article/') && branch !== config.githubRef) {
        try { await github(`/git/refs/heads/${encodeURIComponent(branch)}`, { method: 'DELETE' }); }
        catch { /* Closing the PR succeeds even when deleting the branch is unavailable. */ }
      }
    },
  };
}
