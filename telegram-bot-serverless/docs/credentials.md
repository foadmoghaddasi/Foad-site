# مدیریت کلیدها در Mini App

کلیدها طبق تصمیم کاربر در دیتابیس داخلی همان بات ذخیره می‌شوند. هیچ Liara، Gateway، سرویس جدید یا تغییر سایت React برای این بخش لازم نیست.
این پیاده‌سازی فعلاً فقط محلی و با دادهٔ ساختگی تست شده است؛ جدول ابری ساخته نشده و هیچ کلید واقعی وارد نشده است.

## فایل‌های این تغییر

- `tgcloud/schema.js`: جدول `bot_credentials` با CHECK برای محدودکردن نام به `OPENAI_API_KEY` و `GITHUB_TOKEN`.
- `tgcloud/lib/credentials.js`: خواندن کلید، اعتبارسنجی و upsert اتمی، بدون نمایش مقدار.
- `tgcloud/lib/credentials-endpoints.js`: کنترل مالک با context معتبر پلتفرم، پیش از دسترسی DB.
- `tgcloud/endpoints/credentialsAccess.js`: تأیید دسترسی صفحه؛ پاسخ فقط `{ authorized: true }`.
- `tgcloud/endpoints/saveCredentials.js`: ذخیره یا تعویض؛ پاسخ فقط `{ saved: true }`.
- `tgcloud/lib/runtime.js` و `integrations.js`: اتصال resolver دیتابیس به درخواست‌های سرویس‌ها و خطای روشن برای نبود کلید.
- `mini-app/index.html`، `settings.css` و `settings.js`: فرم و رفتار صفحه.
- `tgcloud.jsonc`: میزبانی پوشهٔ `mini-app/` و هدرهای امنیتی.
- `scripts/check.mjs`: بررسی فایل‌های Mini App هم اضافه شده است.
- `tests/helpers.mjs`، `article-bot.test.mjs`، `integrations.test.mjs`، `credentials.test.mjs` و `credentials-ui.test.mjs`: تست جدول، احراز هویت، تعویض، عدم افشا و اتصال به adapterها.
- `AGENTS.md`، `README.md`، این فایل و `migration.md`: هماهنگ‌سازی راهنما با تصمیم ذخیرهٔ کلید در DB.

## ساخت جدول و انتشار — این دستورها هنوز اجرا نشده‌اند

از ریشهٔ مخزن، ابتدا schema جدید را منتشر و جدول را با migration بسازید:

```bash
cd telegram-bot-serverless
npx tgcloud push tgcloud/schema.js
npx tgcloud migrate
```

ابتدا خروجی migration را بازبینی کنید. این schema علاوه بر `bot_credentials`، جدول درخواست‌های مقاله را نیز تعریف می‌کند؛ در صورت نبودن آن، ساخت آن هم پیشنهاد می‌شود.
پس از موفقیت migration، endpointها، resolver و صفحه را منتشر کنید:

```bash
npx tgcloud push
```

صفحه فایل‌های استاتیک آماده دارد و به Build یا نصب فریم‌ورک فرانت‌اند نیاز ندارد.
پروژه قبلاً با `tgcloud login` به بات اصلی وصل شده است؛ از اعتبار همان بات استفاده کنید.
مرجع: [استقرار](https://core.telegram.org/bots/serverless#push) و [migration](https://core.telegram.org/bots/serverless#migrations).

## بازکردن صفحه

پس از `push` کامل، CLI آدرس Mini App را چاپ می‌کند:

```text
https://app<app_id>.tgcloud.ai/
```

در BotFather برای **همان بات اصلی** این آدرس را به‌عنوان URL Mini App یا دکمهٔ منوی Web App قرار دهید؛ سپس از داخل Telegram و با حساب مالک، صفحه را باز کنید.
شناسهٔ مجاز فعلی از `tgcloud/lib/config.js` گرفته می‌شود: `457041706`.
بازکردن لینک در مرورگر معمولی، نبودن احراز هویت یا استفاده از حساب دیگر، فرم را فعال نمی‌کند.

HTML/CSS/JS صفحه استاتیک‌اند و اطلاعات محرمانه ندارند؛ مسیر HTML به‌تنهایی صفحهٔ سرور با ورود اختصاصی نیست.
فرم پس از پاسخ موفق endpoint `credentialsAccess` فعال می‌شود و endpoint ذخیره نیز مستقلاً هویت را کنترل می‌کند. دستکاری UI این کنترل را دور نمی‌زند.

## استفاده

- دو فیلد `OpenAI API Key` و `GitHub Token` از نوع password هستند.
- حداقل یک کلید را وارد و `Save Credentials` را بزنید.
- خالی‌گذاشتن یک فیلد، کلید قبلی همان سرویس را حفظ می‌کند؛ روشی برای خواندن یا حذف کلید از این صفحه وجود ندارد.
- فاصله، خط جدید، کاراکتر کنترلی و مقدار طولانی‌تر از ۴۰۹۶ کاراکتر رد می‌شود.
- هیچ کلید ذخیره‌شده‌ای به مرورگر برگردانده نمی‌شود؛ مقدار واردشده هنگام ارسال و پس از نتیجه پاک می‌شود.
- دو مقدار در یک دستور SQL ذخیره می‌شوند؛ شکست یکی باعث تغییر جزئی دیگری نمی‌شود.
- ثبت کلید، اعتبار آن را نزد OpenAI یا GitHub آزمایش نمی‌کند و هیچ درخواست واقعی به آن‌ها نمی‌فرستد.

## مرز احراز هویت و حفاظت

پلتفرم Telegram Serverless اعتبار initData را پیش از اجرای endpoint بررسی می‌کند و درخواست فاقد دادهٔ معتبر را با 401 رد می‌کند.
کد ما فقط `ctx.initData.user.id` را می‌پذیرد و User ID یا initData موجود در JSON ورودی را نادیده نمی‌گیرد، بلکه به‌عنوان ورودی اضافی رد می‌کند.
context فاقد شناسهٔ معتبر و حساب غیرمالک، پیش از هر عملیات DB رد می‌شوند. [مرجع endpointها](https://core.telegram.org/bots/serverless#endpoints)

هیچ endpoint دریافت کلید، دستور چاپ کلید، console logging، ذخیره در localStorage/sessionStorage، URL حاوی کلید یا خروجی خام SQL وجود ندارد.
صفحه از `Telegram.WebApp.Serverless.call` رسمی استفاده می‌کند؛ تماس مستقیم و دست‌ساز با API یا اعتماد به `initDataUnsafe` ندارد.
مقادیر فقط در بدنهٔ درخواست HTTPS به endpoint خود بات و سپس در هدر Authorization سرویس مربوطه مصرف می‌شوند.

DB داخلی صندوق رمزنگاری‌شدهٔ مستقل نیست؛ افراد دارای دسترسی مدیریت پروژه/CLI و کد اجراشده در پروژه می‌توانند DB را بخوانند.
این محدودیت با تصمیم ذخیره در DB پذیرفته شده است؛ کلید رمزنگاری هم‌مکان یا ادعای حفاظت غیرمستند اضافه نشده است.
مقدارها را در چت بات، سورس، دستور CLI، خروجی debug یا screenshot وارد نکنید.

## بررسی محلی

```bash
npm run check
npm test
```

تست‌های آفلاین از SQLite واقعی، SDK شبیه‌سازی‌شده و context آزمایشی استفاده می‌کنند. احراز امضای واقعی initData و اجرای روی زیرساخت Telegram به خود پلتفرم متکی است و پس از انتشار باید روی همان بات بررسی شود.
