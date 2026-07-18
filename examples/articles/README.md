# افزودن مقاله

فایل JSON را در هر مسیر دلخواه داخل پروژه قرار دهید و تصویرهای ارجاع‌شده در آن را داخل یک پوشهٔ جداگانه بگذارید. نام هر تصویر در JSON باید فقط نام فایل باشد، نه مسیر.

نمونهٔ دوزبانه را اجرا کنید:

```bash
npm run article:add -- examples/articles/test-bilingual-design-note.json --images examples/articles/test-bilingual-design-note-images
```

برای مقالهٔ خودتان:

```bash
npm run article:add -- content/my-article.json --images content/my-article-images
```

اسکریپت پیش از تغییر، نسخهٔ پشتیبان `articles.ts` را در `.article-backups/` می‌سازد. در صورت ناموفق‌بودن build، فایل محتوا و پوشهٔ تصویر تازه را برمی‌گرداند.
