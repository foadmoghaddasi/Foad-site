# Telegram article bot

این بات فقط موضوع را از پیام متنی یا ویس می‌گیرد و پس از تأیید کاربر، workflow با نام `Generate Bilingual Article` را در GitHub اجرا می‌کند.

## اجرا

```bash
cd telegram-bot
cp .env.example .env
npm start
```

مقدارهای لازم را در `.env` وارد کنید: `TELEGRAM_BOT_TOKEN`، `TELEGRAM_ALLOWED_USER_ID`، `OPENAI_API_KEY`، `GITHUB_TOKEN`، `GITHUB_OWNER` و `GITHUB_REPO`.

برای پیدا کردن `TELEGRAM_ALLOWED_USER_ID`، در تلگرام به ربات `@userinfobot` پیام بدهید و شناسهٔ عددی نمایش‌داده‌شده را در `.env` قرار دهید.

`GITHUB_TOKEN` باید اجازهٔ اجرای workflow (`Actions: write`) در مخزن مشخص‌شده را داشته باشد.
