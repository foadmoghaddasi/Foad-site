(() => {
  'use strict';

  const form = document.getElementById('credentials-form');
  const fields = document.getElementById('credentials-fields');
  const openai = document.getElementById('openai-key');
  const github = document.getElementById('github-token');
  const button = document.getElementById('save-credentials');
  const accessStatus = document.getElementById('access-status');
  const saveStatus = document.getElementById('save-status');
  const app = window.Telegram?.WebApp;
  let authorized = false;
  let busy = false;

  function clearFields() { openai.value = ''; github.value = ''; }
  function status(element, text, tone = '') {
    element.textContent = text;
    element.dataset.tone = tone;
  }
  function deny() {
    authorized = false;
    clearFields(); fields.disabled = true; form.hidden = true;
    status(accessStatus, 'دسترسی تأیید نشد. این صفحه را از Mini App همان بات و با حساب مالک باز کنید.', 'error');
  }
  clearFields();
  window.addEventListener('pagehide', clearFields);
  window.addEventListener('pageshow', clearFields);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!authorized || busy) return;
    const payload = { openaiApiKey: openai.value, githubToken: github.value };
    if (!payload.openaiApiKey && !payload.githubToken) {
      status(saveStatus, 'حداقل یک کلید جدید وارد کنید.', 'error');
      return;
    }
    busy = true; fields.disabled = true; button.textContent = 'Saving…';
    clearFields();
    const finish = (error, result) => {
      payload.openaiApiKey = ''; payload.githubToken = '';
      busy = false; button.textContent = 'Save Credentials';
      if (error) {
        if (error.type === 'UNAUTHORIZED' || ['UNAUTHORIZED', 'FORBIDDEN'].includes(error.parameters?.code)) deny();
        // Never render arbitrary SDK/server error text: it could contain input.
        status(saveStatus, 'ذخیره انجام نشد؛ دسترسی و ورودی را بررسی و دوباره وارد کنید.', 'error');
      } else if (result?.saved === true) {
        status(saveStatus, 'کلیدها ذخیره شدند. مقادیر ذخیره‌شده نمایش داده نمی‌شوند.', 'success');
      } else {
        status(saveStatus, 'تأیید ذخیره دریافت نشد؛ دوباره بررسی کنید.', 'error');
      }
      clearFields(); fields.disabled = !authorized;
    };
    try { app.Serverless.call('saveCredentials', payload, finish); }
    catch { finish({ type: 'REQUEST_FAILED' }); }
  });

  if (!app?.initData || typeof app.Serverless?.call !== 'function') { deny(); return; }
  app.ready();
  try {
    app.Serverless.call('credentialsAccess', {}, (error, result) => {
      if (error || result?.authorized !== true) { deny(); return; }
      authorized = true; form.hidden = false; fields.disabled = false;
      status(accessStatus, 'دسترسی مالک تأیید شد.', 'success');
    });
  } catch { deny(); }
})();
