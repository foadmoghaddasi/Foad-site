# Telegram article bot

این بات موضوع را از پیام متنی یا ویس می‌گیرد، پس از تأیید کاربر workflow `Generate Bilingual Article` را اجرا می‌کند و نتیجهٔ Pull Request را برای تأیید یا رد در تلگرام نمایش می‌دهد.

## اجرا

```bash
cd telegram-bot
cp .env.example .env
npm start
```

مقدارهای لازم را در `.env` وارد کنید: `TELEGRAM_BOT_TOKEN`، `TELEGRAM_ALLOWED_USER_ID`، `OPENAI_API_KEY`، `GITHUB_TOKEN`، `GITHUB_OWNER` و `GITHUB_REPO`.

برای پیدا کردن `TELEGRAM_ALLOWED_USER_ID`، در تلگرام به ربات `@userinfobot` پیام بدهید و شناسهٔ عددی نمایش‌داده‌شده را در `.env` قرار دهید.

`GITHUB_TOKEN` باید دسترسی‌های `Actions: read and write`، `Pull requests: read and write` و `Contents: read and write` در مخزن مشخص‌شده را داشته باشد.
