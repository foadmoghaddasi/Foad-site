import styleGuideCover from "../assets/images/articles/style-guide/cover.png";
import styleGuideComponents from "../assets/images/articles/style-guide/components.png";
import styleGuidePlatforms from "../assets/images/articles/style-guide/platforms.png";
import ucdCover from "../assets/images/articles/user-centered-design/cover.png";
import ucdPrinciples from "../assets/images/articles/user-centered-design/principles.png";
import ucdProcess from "../assets/images/articles/user-centered-design/process.png";
import ucdResearch from "../assets/images/articles/user-centered-design/research.jpeg";
import ucdDuolingo from "../assets/images/articles/user-centered-design/duolingo.png";
import wireframeCover from "../assets/images/articles/wireframe/cover.jpeg";
import wireframeFidelity from "../assets/images/articles/wireframe/fidelity.jpeg";
import wireframeSample1 from "../assets/images/articles/wireframe/sample-1.jpeg";
import wireframeSample2 from "../assets/images/articles/wireframe/sample-2.jpeg";
import wireframeSample3 from "../assets/images/articles/wireframe/sample-3.jpeg";
import wireframeSample4 from "../assets/images/articles/wireframe/sample-4.jpeg";
import wireframeSample5 from "../assets/images/articles/wireframe/sample-5.webp";
import wireframeSample6 from "../assets/images/articles/wireframe/sample-6.webp";
import wireframeSample7 from "../assets/images/articles/wireframe/sample-7.jpeg";
import userFlowCover from "../assets/images/articles/user-flow/cover.jpeg";
import userFlowChart from "../assets/images/articles/user-flow/flowchart.png";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string; wide?: boolean }
  | {
      type: "gallery";
      images: { src: string; alt: string; caption?: string }[];
    }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "divider" };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readingTime: string;
  cover: string;
  direction: "rtl" | "ltr";
  featured?: boolean;
  content: ArticleBlock[];
};

export const articles: Article[] = [
  {
    slug: "what-is-user-flow",
    title: "یوزر فلو (User Flow) چیست؟",
    excerpt:
      "کاربر برای رسیدن به هدفش در محصول چه مسیری را طی می‌کند؟ یوزر فلو این مسیر، تصمیم‌ها و حالت‌های احتمالی آن را پیش از طراحی مشخص می‌کند.",
    category: "تجربه کاربری",
    publishedAt: "۶ شهریور ۱۴۰۰",
    readingTime: "۵ دقیقه مطالعه",
    cover: userFlowCover,
    direction: "rtl",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "هر بار که کاربر برای ثبت‌نام، خرید، رزرو یا انجام یک کار ساده وارد محصول می‌شود، مسیری را طی می‌کند. اگر این مسیر پیش از طراحی بررسی نشده باشد، نتیجه معمولاً صفحه‌های پراکنده، تصمیم‌های مبهم و بن‌بست‌هایی است که کاربر را خسته می‌کنند.",
      },
      {
        type: "paragraph",
        text: "User Flow کمک می‌کند پیش از پرداختن به ظاهر رابط، منطق این مسیر را ببینیم: کاربر از کجا وارد می‌شود، چه تصمیم‌هایی می‌گیرد، سیستم چه پاسخی می‌دهد و در حالت‌های موفق، خطا یا انصراف چه اتفاقی می‌افتد.",
      },
      {
        type: "heading",
        text: "یوزر فلو (User Flow) چیست؟",
        level: 2,
      },
      {
        type: "paragraph",
        text: "User Flow نمایشی از مراحل، تصمیم‌ها و واکنش‌های سیستم برای رسیدن کاربر به یک هدف مشخص است. این هدف می‌تواند ساخت حساب، بازیابی رمز، خرید کالا یا ارسال یک درخواست باشد. فلو لازم نیست تمام محصول را در یک نمودار جا بدهد؛ هر نمودار باید یک سناریوی روشن و مرز مشخص داشته باشد.",
      },
      {
        type: "paragraph",
        text: "User Flow معمولاً به‌شکل فلوچارت رسم می‌شود، اما ارزش آن در شکل‌ها و فلش‌ها نیست؛ ارزش اصلی در گفت‌وگویی است که میان طراحی، محصول و توسعه درباره منطق تجربه ایجاد می‌کند.",
      },
      {
        type: "image",
        src: userFlowChart,
        alt: "نمونه فلوچارت مسیر کاربر از ورود تا فعالیت‌های مختلف محصول",
        caption: "یک User Flow مسیرها، تصمیم‌ها و حالت‌های مختلف تجربه کاربر را نمایش می‌دهد.",
        wide: true,
      },
      {
        type: "heading",
        text: "پیش از رسم فلو چه چیزهایی را مشخص کنیم؟",
        level: 2,
      },
      {
        type: "list",
        ordered: true,
        items: [
          "کاربر دقیقاً چه هدفی دارد و موفقیت را چگونه تعریف می‌کنیم؟",
          "نقطه ورود چیست؛ صفحه اصلی، نتیجه جست‌وجو، اعلان یا لینک مستقیم؟",
          "کاربر در چه زمینه‌ای از محصول استفاده می‌کند و چه محدودیت‌هایی دارد؟",
          "برای تصمیم‌گیری به چه اطلاعاتی نیاز دارد و چه چیزی اعتماد او را بیشتر می‌کند؟",
          "چه قوانین کسب‌وکار یا محدودیت‌های فنی بر مسیر اثر می‌گذارند؟",
          "چه خطاها، انصراف‌ها و مسیرهای جایگزینی باید پوشش داده شوند؟",
        ],
      },
      {
        type: "paragraph",
        text: "پاسخ این سؤال‌ها باید از تحقیق، داده و گفت‌وگو با تیم به دست بیاید؛ نه فقط از حدس طراح. اگر هنوز داده کافی نداریم، فرضیات را صریح می‌نویسیم تا بعداً بتوانیم آن‌ها را آزمایش کنیم.",
      },
      {
        type: "heading",
        text: "User Flow با Task Flow و Journey Map چه فرقی دارد؟",
        level: 2,
      },
      {
        type: "list",
        items: [
          "Task Flow معمولاً یک مسیر خطی برای انجام یک وظیفه مشخص است و شاخه‌های کمی دارد.",
          "User Flow مسیرهای مختلف، تصمیم‌ها، صفحه‌ها و پاسخ‌های سیستم را برای یک هدف نشان می‌دهد.",
          "Journey Map تجربه کاربر را در بازه‌ای وسیع‌تر و گاهی بیرون از محصول بررسی می‌کند؛ از مراحل، احساسات و نقاط تماس تا فرصت‌های بهبود.",
        ],
      },
      {
        type: "paragraph",
        text: "این سه ابزار می‌توانند کنار هم استفاده شوند، اما جای یکدیگر را نمی‌گیرند. Journey Map مجموعه‌ای از User Flowها نیست؛ زاویه دید و هدف متفاوتی دارد.",
      },
      {
        type: "heading",
        text: "یک مثال: خرید موبایل از فروشگاه آنلاین",
        level: 2,
      },
      {
        type: "paragraph",
        text: "یک مسیر ساده برای خرید موبایل از فروشگاه آنلاین می‌تواند این‌طور شروع شود:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "کاربر از جست‌وجو، دسته‌بندی یا لینک مستقیم وارد فهرست یا صفحه محصول می‌شود.",
          "با فیلتر و مقایسه، گزینه مناسب را پیدا می‌کند و موجودی، قیمت، شرایط ارسال و ضمانت را می‌بیند.",
          "مدل یا رنگ را انتخاب می‌کند؛ اگر ناموجود باشد، سیستم جایگزین یا امکان اطلاع‌رسانی پیشنهاد می‌دهد.",
          "کالا را به سبد اضافه می‌کند و بازخورد واضحی از سیستم می‌گیرد.",
          "به‌عنوان مهمان یا کاربر واردشده، نشانی و روش ارسال را انتخاب می‌کند.",
          "خلاصه سفارش و هزینه نهایی را پیش از پرداخت بررسی می‌کند.",
          "پرداخت انجام می‌شود؛ سیستم برای موفقیت، شکست، لغو یا نامشخص‌بودن تراکنش مسیر جداگانه دارد.",
          "کاربر تأیید سفارش، کد پیگیری و قدم بعدی را می‌بیند.",
        ],
      },
      {
        type: "paragraph",
        text: "فقط مسیر موفق را طراحی نکنید. بارگذاری، نبود نتیجه، قطع اینترنت، پایان موجودی، خطای اعتبارسنجی، بازگشت به مرحله قبل و امکان لغو نیز بخشی از تجربه واقعی‌اند. هر تصمیم مهم باید بازخورد قابل‌فهم داشته باشد و کاربر بداند اکنون کجاست و قدم بعدی چیست.",
      },
      {
        type: "quote",
        text: "یک فلوی خوب فقط Happy Path نیست؛ مسیرهای جایگزین و بازیابی از خطا را هم نشان می‌دهد.",
      },
      {
        type: "paragraph",
        text: "پس از رسم، فلو را با یک پروتوتایپ قابل‌کلیک و چند کاربر واقعی آزمایش کنید. داده‌های قیف تبدیل و نقاط ریزش به پیدا‌کردن مسئله کمک می‌کنند، اما دلیل رفتار را همیشه توضیح نمی‌دهند؛ مشاهده و گفت‌وگو با کاربر مکمل داده‌های تحلیلی است.",
      },
      {
        type: "heading",
        text: "چک‌لیست یک User Flow تمیز",
        level: 2,
      },
      {
        type: "list",
        items: [
          "هدف، نقطه شروع و پایان مشخص دارد.",
          "نام مرحله‌ها با زبان ساده و فعل‌های روشن نوشته شده است.",
          "تصمیم کاربر از اقدام سیستم تفکیک شده است.",
          "حالت‌های خطا، خالی، انتظار، انصراف و بازگشت دیده شده‌اند.",
          "نمودار آن‌قدر شلوغ نیست که خواندنش از خود مسئله سخت‌تر شود.",
          "با تغییر محصول به‌روزرسانی می‌شود و یک سند زنده باقی می‌ماند.",
        ],
      },
      { type: "divider" },
      {
        type: "paragraph",
        text: "User Flow زمانی مفید است که تصمیم‌گیری را ساده‌تر کند. از یک سناریوی کوچک شروع کنید، فرضیات را مشخص کنید و فلو را همراه با محصول تکامل دهید.",
      },
    ],
  },
  {
    slug: "what-is-wireframe",
    title: "وایرفریم چیست؟",
    excerpt:
      "وایرفریم اسکلت ساده محصول است؛ راهی سریع و کم‌هزینه برای نمایش ساختار، آزمایش ایده‌ها و کاهش ریسک پیش از طراحی رابط کاربری.",
    category: "تجربه کاربری",
    publishedAt: "۲ شهریور ۱۴۰۰",
    readingTime: "۴ دقیقه مطالعه",
    cover: wireframeCover,
    direction: "rtl",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "اگر بلافاصله بعد از ایده‌پردازی سراغ رابط نهایی یا توسعه برویم، احتمال دارد زمان زیادی را صرف راه‌حلی کنیم که هنوز مسئله اصلی آن تأیید نشده است. وایرفریم کمک می‌کند ساختار و منطق تجربه را زودتر، سریع‌تر و با هزینه کمتر بررسی کنیم.",
      },
      {
        type: "quote",
        text: "هرچه یادگیری زودتر اتفاق بیفتد، اصلاح مسیر ارزان‌تر است.",
      },
      {
        type: "paragraph",
        text: "وایرفریم قرار نیست ثابت کند یک ایده حتماً درست است؛ قرار است سؤال‌ها و ابهام‌ها را زود آشکار کند. گاهی یک طرح دستی پنج‌دقیقه‌ای برای گفت‌وگو کافی است و گاهی برای آزمون کاربردپذیری به مجموعه‌ای از صفحه‌های متصل نیاز داریم.",
      },
      {
        type: "heading",
        text: "وایرفریم چیست؟",
        level: 2,
      },
      {
        type: "paragraph",
        text: "وایرفریم نمایش ساده‌ای از ساختار یک صفحه یا جریان است: چه اطلاعاتی نمایش داده می‌شود، اولویت آن‌ها چیست، کاربر چه اقدام‌هایی می‌تواند انجام دهد و عناصر اصلی تقریباً کجا قرار می‌گیرند. وایرفریم را می‌توان برای وب، موبایل، کیوسک، تلویزیون یا هر رابط تعاملی دیگری ساخت.",
      },
      {
        type: "paragraph",
        text: "در وایرفریم کم‌جزئیات، رنگ، تصویر و تزئینات بصری محدودند تا بحث روی محتوا، سلسله‌مراتب و تعامل بماند. بااین‌حال متن واقعی یا نزدیک به واقعیت بهتر از Lorem Ipsum است؛ چون طول عنوان، پیام خطا و برچسب دکمه‌ها مستقیماً روی طراحی اثر می‌گذارند.",
      },
      {
        type: "quote",
        text: "میزان جزئیات باید با پرسشی که می‌خواهیم پاسخ دهیم متناسب باشد.",
      },
      {
        type: "image",
        src: wireframeFidelity,
        alt: "طراحی وایرفریم موبایل با قلم و کاغذ",
        caption: "میزان جزئیات وایرفریم به مرحله طراحی و نیاز پروژه بستگی دارد.",
        wide: true,
      },
      {
        type: "heading",
        text: "Low-fidelity یا High-fidelity؟",
        level: 2,
      },
      {
        type: "paragraph",
        text: "وایرفریم Low-fidelity برای مقایسه چند ایده، چیدن ساختار و گفت‌وگوی سریع مناسب است. وایرفریم دقیق‌تر زمانی به کار می‌آید که می‌خواهیم منطق تعامل، محتوای واقعی، حالت‌های مختلف یا یک سناریوی مشخص را آزمایش کنیم. جزئیات بیشتر همیشه به‌معنای کیفیت بهتر نیست؛ اگر باعث شود تیم به ظاهر وابسته شود یا تغییر طرح سخت‌تر به نظر برسد، زود سراغ آن رفته‌ایم.",
      },
      {
        type: "paragraph",
        text: "وایرفریم با پروتوتایپ هم یکی نیست. وایرفریم ساختار را نشان می‌دهد؛ پروتوتایپ رفتار و حرکت میان حالت‌ها را شبیه‌سازی می‌کند. یک وایرفریم می‌تواند به پروتوتایپ تبدیل شود، اما هر وایرفریمی لازم نیست تعاملی باشد.",
      },
      {
        type: "heading",
        text: "در وایرفریم چه چیزهایی را بررسی کنیم؟",
        level: 2,
      },
      {
        type: "list",
        items: [
          "هدف صفحه و اقدام اصلی کاربر",
          "ترتیب و اولویت محتوا و اطلاعات موردنیاز برای تصمیم‌گیری",
          "ناوبری، نقطه ورود و راه برگشت یا لغو",
          "حالت‌های خالی، بارگذاری، خطا، موفقیت و دسترسی محدود",
          "رفتار طرح در عرض‌های مختلف و تغییر چیدمان، نه فقط کوچک‌کردن دسکتاپ",
          "دسترسی‌پذیری اولیه؛ ترتیب منطقی، برچسب روشن، هدف لمسی مناسب و وابسته‌نبودن معنا به رنگ",
        ],
      },
      {
        type: "heading",
        text: "یک فرایند ساده و کاربردی",
        level: 2,
      },
      {
        type: "list",
        ordered: true,
        items: [
          "هدف کاربر و سناریوی اصلی را در یک جمله بنویسید.",
          "محتوا و اقدام‌های ضروری را بدون فکرکردن به چیدمان فهرست کنید.",
          "چند طرح کوچک و متفاوت روی کاغذ یا وایت‌برد بسازید.",
          "بهترین ایده‌ها را ترکیب و مسیر اصلی را به صفحه‌های لازم متصل کنید.",
          "حالت‌های جایگزین و خطا را اضافه کنید.",
          "طرح را با تیم مرور و برای انجام یک وظیفه با کاربر آزمایش کنید.",
          "بر اساس شواهد اصلاح کنید و فقط در صورت نیاز جزئیات را بالا ببرید.",
        ],
      },
      {
        type: "heading",
        text: "ابزار طراحی وایرفریم",
        level: 2,
      },
      {
        type: "paragraph",
        text: "قلم و کاغذ هنوز سریع‌ترین انتخاب برای شروع است. برای همکاری و نسخه‌های دیجیتال می‌توان از Figma یا FigJam، Penpot، Miro و ابزارهای مشابه استفاده کرد. انتخاب ابزار به اندازه تیم، نیاز به همکاری، خروجی موردنظر و محدودیت‌های پروژه بستگی دارد؛ ابزار خوب باید تغییر ایده را آسان کند، نه اینکه شما را درگیر ظرافت‌های غیرضروری کند.",
      },
      {
        type: "heading",
        text: "چند نمونه وایرفریم",
        level: 2,
      },
      {
        type: "paragraph",
        text: "در ادامه چند نمونه از وایرفریم‌های کم‌جزئیات و ساختاری را می‌بینید:",
      },
      {
        type: "gallery",
        images: [
          {
            src: wireframeSample1,
            alt: "وایرفریم ساختاری یک صفحه وب",
          },
          {
            src: wireframeSample2,
            alt: "وایرفریم دستی صفحات یک وب‌سایت",
          },
          {
            src: wireframeSample3,
            alt: "وایرفریم دستی جریان فروشگاه موبایل",
          },
          {
            src: wireframeSample4,
            alt: "وایرفریم دستی صفحه اصلی یک فروشگاه",
          },
          {
            src: wireframeSample5,
            alt: "وایرفریم دستی صفحه اصلی یک وب‌سایت شرکتی",
          },
          {
            src: wireframeSample6,
            alt: "نمودار جریان و وایرفریم‌های اولیه",
          },
          {
            src: wireframeSample7,
            alt: "مجموعه وایرفریم صفحات اپلیکیشن موبایل",
          },
        ],
      },
    ],
  },
  {
    slug: "user-centered-design-ucd",
    title: "طراحی کاربرمحور یا User-Centered Design (UCD)",
    excerpt:
      "طراحی کاربرمحور یعنی محصول را از نگاه افرادی بسازیم که واقعاً از آن استفاده می‌کنند؛ نیازهایشان را بشنویم، راه‌حل‌ها را آزمایش کنیم و بارها بهبود دهیم.",
    category: "تجربه کاربری",
    publishedAt: "۲ شهریور ۱۴۰۰",
    readingTime: "۶ دقیقه مطالعه",
    cover: ucdCover,
    direction: "rtl",
    featured: true,
    content: [
      {
        type: "heading",
        text: "طراحی کاربرمحور یعنی چه؟",
        level: 2,
      },
      {
        type: "paragraph",
        text: "طراحی کاربرمحور یا UCD رویکردی تکرارشونده است که نیازها، توانایی‌ها، محدودیت‌ها و زمینه استفاده انسان‌ها را در تمام چرخه عمر محصول وارد تصمیم‌های طراحی می‌کند. هدف این نیست که هر خواسته کاربر را بی‌چون‌وچرا اجرا کنیم؛ هدف این است که مسئله درست را بفهمیم و راه‌حل را با شواهد ارزیابی کنیم.",
      },
      {
        type: "paragraph",
        text: "استاندارد ISO 9241-210 برای طراحی انسان‌محور بر فهم صریح کاربران، وظایف و محیط استفاده، مشارکت کاربران، ارزیابی کاربرمحور و تکرار در طول فرایند تأکید می‌کند. بنابراین UCD یک جلسه مصاحبه در ابتدای پروژه یا تست نهایی پیش از انتشار نیست؛ شیوه‌ای برای تصمیم‌گیری مداوم است.",
      },
      {
        type: "paragraph",
        text: "طراحی کاربرمحور با Design Thinking هم‌پوشانی دارد، اما مترادف آن نیست. Design Thinking چارچوبی گسترده برای حل مسئله است؛ UCD مشخصاً بر کیفیت استفاده از سیستم برای کاربران معین در زمینه واقعی تمرکز دارد.",
      },
      {
        type: "image",
        src: ucdPrinciples,
        alt: "هم‌پوشانی نیازهای کاربر، اطلاعات و اهداف کسب‌وکار در تجربه کاربری",
        caption: "تجربه کاربری در نقطه تلاقی نیازهای کاربر، اطلاعات و اهداف کسب‌وکار شکل می‌گیرد.",
      },
      {
        type: "quote",
        text: "کاربر را به فرایند طراحی دعوت کنید، نه اینکه فقط به‌جای او حدس بزنید.",
      },
      {
        type: "paragraph",
        text: "نکته مهم، انتخاب مشارکت‌کنندگان واقعی و متنوع است. همکاران شرکت یا کاربران حرفه‌ای همیشه نماینده کاربران تازه‌کار، سالمندان، افراد دارای معلولیت، کاربران با اینترنت ضعیف یا کسانی که با زبان و فرهنگ متفاوت از محصول استفاده می‌کنند نیستند. نمونه تحقیق باید تا حد ممکن با مخاطبان و زمینه واقعی استفاده هماهنگ باشد.",
      },
      {
        type: "image",
        src: ucdProcess,
        alt: "مراحل تفکر طراحی از همدلی تا آزمایش",
        caption: "فرایند تفکر طراحی از همدلی و تعریف مسئله تا ایده‌پردازی، نمونه‌سازی و آزمایش ادامه پیدا می‌کند.",
        wide: true,
      },
      {
        type: "heading",
        text: "چرخه طراحی کاربرمحور",
        level: 2,
      },
      {
        type: "paragraph",
        text: "UCD یک مسیر خطی با پایان قطعی نیست. می‌توان آن را در چهار فعالیت پیوسته خلاصه کرد:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "فهم زمینه استفاده: چه کسانی، برای چه هدفی، با چه ابزار و در چه شرایطی از محصول استفاده می‌کنند؟",
          "تعریف نیازها و معیارهای موفقیت: نیاز کاربر، الزام کسب‌وکار، محدودیت فنی و معیار قابل‌اندازه‌گیری چیست؟",
          "ساخت راه‌حل: از اسکچ و وایرفریم تا پروتوتایپ و محصول قابل‌استفاده.",
          "ارزیابی با کاربران و داده: آیا راه‌حل در زمینه واقعی مؤثر، کارآمد، قابل‌فهم و رضایت‌بخش است؟",
        ],
      },
      {
        type: "paragraph",
        text: "خروجی ارزیابی دوباره به فهم مسئله و طراحی راه‌حل برمی‌گردد. محصول «نهایی» هم پایان تحقیق نیست؛ تغییر رفتار کاربران، بازار، فناوری و خود محصول می‌تواند مسئله‌های تازه‌ای ایجاد کند.",
      },
      {
        type: "quote",
        text: "حرف کاربر مهم است، اما رفتار او نیز باید دیده شود. مصاحبه به ما می‌گوید افراد چه فکر می‌کنند؛ مشاهده و تست کاربردپذیری نشان می‌دهد هنگام انجام کار واقعاً چه اتفاقی می‌افتد.",
      },
      {
        type: "image",
        src: ucdResearch,
        alt: "قرارگرفتن کاربر در مرکز فرایند تحقیق و طراحی",
        caption: "کاربر و بازخورد او باید در مرکز فرایند طراحی قرار بگیرد.",
        wide: true,
      },
      {
        type: "heading",
        text: "روش مناسب را برای سؤال مناسب انتخاب کنید",
        level: 2,
      },
      {
        type: "list",
        items: [
          "مصاحبه و Contextual Inquiry برای فهم نیاز، انگیزه و محیط استفاده",
          "تحلیل داده و قیف برای پیدا‌کردن الگوها و نقاط ریزش در مقیاس بزرگ",
          "تست کاربردپذیری برای مشاهده انجام وظیفه و کشف موانع",
          "مطالعه Diary برای تجربه‌هایی که در طول زمان شکل می‌گیرند",
          "نظرسنجی برای سنجش الگوهای شناخته‌شده، نه کشف عمیق مسئله از صفر",
          "آزمایش کنترل‌شده برای مقایسه اثر راه‌حل‌ها پس از مشخص‌شدن مسئله",
        ],
      },
      {
        type: "heading",
        text: "دسترسی‌پذیری و فراگیری، بخش اصلی UCD",
        level: 2,
      },
      {
        type: "paragraph",
        text: "کاربردپذیری برای یک گروه محدود به‌معنای دسترس‌پذیری برای همه نیست. استانداردهای دسترسی مانند WCAG و تحقیق با افراد دارای معلولیت باید از مراحل اولیه وارد فرایند شوند. کنتراست، ناوبری با صفحه‌کلید، ساختار قابل‌درک، متن جایگزین و سازگاری با فناوری‌های کمکی فقط چند بخش فنی این موضوع‌اند؛ تجربه واقعی کاربران مشخص می‌کند راه‌حل در عمل هم قابل‌استفاده هست یا نه.",
      },
      {
        type: "image",
        src: ucdDuolingo,
        alt: "نمونه رابط کاربری اپلیکیشن آموزش زبان Duolingo",
        caption: "محصول‌های آموزشی نشان می‌دهند که پیشرفت، بازخورد و انگیزه چگونه می‌توانند در یک چرخه تجربه کنار هم قرار بگیرند.",
      },
      {
        type: "paragraph",
        text: "برای مثال، در یک محصول آموزشی می‌توان با نمایش هدف، بازخورد فوری و پیشرفت قابل‌مشاهده به ادامه مسیر کمک کرد. اما افزایش تعامل به‌تنهایی معیار موفقیت نیست. اگر یادگیری واقعی، اختیار کاربر یا سلامت او فدای اعلان‌ها و چرخه‌های اعتیادآور شود، طراحی از هدف کاربر فاصله گرفته است.",
      },
      {
        type: "heading",
        text: "چند خطای رایج",
        level: 2,
      },
      {
        type: "list",
        items: [
          "پرسیدن «این طرح را دوست دارید؟» به‌جای مشاهده انجام یک وظیفه واقعی",
          "تبدیل درخواست کاربران به قابلیت، بدون بررسی نیاز پشت آن درخواست",
          "تحقیق فقط در آغاز پروژه و نادیده‌گرفتن ارزیابی پس از انتشار",
          "استفاده از داده کمّی بدون فهم دلیل رفتار یا اتکا به چند مصاحبه بدون بررسی مقیاس مسئله",
          "دعوت‌کردن کاربران در پایان، زمانی که تصمیم‌های اصلی گرفته شده و تغییر پرهزینه است",
          "نادیده‌گرفتن رضایت، حریم خصوصی و پیامدهای ناخواسته در کنار نرخ تبدیل",
        ],
      },
      { type: "divider" },
      {
        type: "paragraph",
        text: "طراحی کاربرمحور یعنی فرضیات را به شواهد تبدیل کنیم، کاربران را زود و پیوسته در فرایند مشارکت دهیم و موفقیت را با توانایی آن‌ها در رسیدن به هدفشان بسنجیم. شکست یک آزمون، شکست پروژه نیست؛ فرصتی است برای اصلاح پیش از آنکه مسئله بزرگ‌تر شود.",
      },
    ],
  },
  {
    slug: "what-is-style-guide",
    title: "Style Guide چیست؟",
    excerpt:
      "استایل گاید مثل کاتالوگ محصول است؛ سندی که استانداردهای طراحی، هویت بصری و قواعد مشترک میان تیم طراحی و توسعه را مشخص می‌کند.",
    category: "سیستم طراحی",
    publishedAt: "۱ شهریور ۱۴۰۰",
    readingTime: "۵ دقیقه مطالعه",
    cover: styleGuideCover,
    direction: "rtl",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "Style Guide مجموعه‌ای مستند از قواعد بصری و محتوایی یک برند یا محصول است. این سند مشخص می‌کند رنگ، تایپوگرافی، فاصله‌گذاری، تصویر، آیکون و لحن محتوا چگونه استفاده شوند تا تجربه در صفحه‌ها و کانال‌های مختلف منسجم بماند.",
      },
      {
        type: "paragraph",
        text: "می‌توان از سیستم‌های عمومی برای یادگیری و شروع استفاده کرد، اما کپی‌کردن یک UI Kit به‌تنهایی استایل گاید محصول شما را نمی‌سازد. قواعد باید از هویت برند، نیاز کاربران، پلتفرم، الزامات دسترسی‌پذیری و محدودیت‌های واقعی تیم استخراج شوند.",
      },
      {
        type: "paragraph",
        text: "یک استایل گاید خوب زبان مشترکی میان طراحی، توسعه، محتوا و برند ایجاد می‌کند. این زبان، تصمیم‌های تکراری را کمتر و بازبینی کیفیت را ساده‌تر می‌کند؛ اما انسجام به‌تنهایی تضمین‌کننده تجربه خوب نیست. قواعد باید با تحقیق، آزمون دسترسی‌پذیری و بازخورد استفاده‌کنندگان سیستم اصلاح شوند.",
      },
      {
        type: "image",
        src: styleGuideComponents,
        alt: "نمایش ساختار تایپوگرافی و اجزای رابط کاربری در یک استایل گاید",
        caption: "استایل گاید قواعد تایپوگرافی و اجزای رابط کاربری را یکپارچه می‌کند.",
        wide: true,
      },
      {
        type: "heading",
        text: "Style Guide، Component Library و Design System",
        level: 2,
      },
      {
        type: "paragraph",
        text: "این اصطلاح‌ها نزدیک‌اند، اما یکی نیستند:",
      },
      {
        type: "list",
        items: [
          "Brand Guideline درباره هویت برند، لوگو، رنگ، تصویر و لحن ارتباطی است.",
          "UI Style Guide قواعد بصری و محتوایی رابط را مستند می‌کند.",
          "Component Library مجموعه اجزای قابل‌استفاده مجدد و حالت‌های آن‌ها در طراحی یا کد است.",
          "Design System علاوه بر Foundations و Components، الگوها، مستندات، فرایند مشارکت و حاکمیت سیستم را هم دربر می‌گیرد.",
        ],
      },
      {
        type: "heading",
        text: "پایه‌ها و Design Tokenها",
        level: 2,
      },
      {
        type: "paragraph",
        text: "امروزه بسیاری از تیم‌ها مقادیر پایه را به‌صورت Design Token نگه می‌دارند. Token به‌جای تکرار یک مقدار خام، برای آن نام و معنا می‌سازد. برای مثال color-blue-600 یک مقدار پایه است، اما color-action-primary نقش آن را توضیح می‌دهد. همین لایه معنایی تغییر تم، برند یا پلتفرم را ساده‌تر می‌کند.",
      },
      {
        type: "list",
        items: [
          "رنگ‌های پایه و معنایی برای متن، پس‌زمینه، مرز، اقدام و وضعیت‌ها",
          "مقیاس تایپوگرافی با نقش، وزن، ارتفاع خط و قواعد زبان‌های مختلف",
          "مقیاس فاصله‌گذاری، اندازه، شعاع گوشه، سایه و لایه‌بندی",
          "Grid، breakpoint و قواعد چیدمان واکنش‌گرا",
          "حرکت، مدت و easing با پشتیبانی از کاهش حرکت",
          "آیکون، تصویر، صدا و سایر دارایی‌های برند",
          "Modeها مانند روشن، تیره، کنتراست بالا یا برندهای مختلف",
        ],
      },
      {
        type: "heading",
        text: "برای هر Component چه چیزی مستند شود؟",
        level: 2,
      },
      {
        type: "paragraph",
        text: "نمایش یک دکمه زیبا کافی نیست. مستندات هر جزء باید هدف، زمان استفاده و محدودیت آن را توضیح دهد و طراحی را به رفتار واقعی در کد نزدیک کند.",
      },
      {
        type: "list",
        items: [
          "Anatomy و بخش‌های تشکیل‌دهنده",
          "Variantها، اندازه‌ها و ویژگی‌های قابل‌تغییر",
          "حالت‌های عادی، Hover، Focus، Active، Disabled، Loading، Error و Success",
          "رفتار در عرض‌های مختلف، متن بلند و زبان راست‌به‌چپ",
          "قواعد محتوا و نمونه متن درست و نادرست",
          "دسترسی‌پذیری؛ نام قابل‌فهم، تعامل صفحه‌کلید، Focus قابل‌مشاهده و نقش معنایی",
          "نمونه کد، API و ارتباط Component طراحی با Component واقعی",
          "بایدها، نبایدها و جایگزین مناسب برای کاربردهای دیگر",
        ],
      },
      {
        type: "quote",
        text: "اگر مستندات فقط ظاهر را نشان دهند، تیم برای رفتار، محتوا و دسترسی‌پذیری دوباره از صفر تصمیم می‌گیرد.",
      },
      {
        type: "image",
        src: styleGuidePlatforms,
        alt: "نمونه‌ای از یک محیط آنلاین برای مستندسازی استایل گاید",
        caption: "یک داکیومنت آنلاین، دسترسی و همکاری تیم طراحی و توسعه را ساده‌تر می‌کند.",
        wide: true,
      },
      {
        type: "heading",
        text: "ابزار، انتشار و هماهنگی با کد",
        level: 2,
      },
      {
        type: "paragraph",
        text: "قواعد باید جایی باشند که تیم واقعاً به آن‌ها دسترسی دارد. Figma Libraries و Variables برای دارایی‌های طراحی و Themeها کاربرد دارند؛ مستندات کد و ابزارهایی مانند Storybook می‌توانند رفتار Componentهای واقعی را نمایش دهند. مهم‌تر از نام ابزار، هماهنگ‌ماندن Tokenها، Componentها و نسخه‌ها میان طراحی و کد است.",
      },
      {
        type: "list",
        items: [
          "برای Token و Component نام‌گذاری مشترک و قابل‌فهم تعریف کنید.",
          "تغییرات مهم را نسخه‌بندی و همراه با راهنمای مهاجرت منتشر کنید.",
          "مالک یا گروه نگه‌دارنده و روش پیشنهاد تغییر را مشخص کنید.",
          "Componentهای منسوخ را علامت‌گذاری کنید و جایگزین بدهید.",
          "میزان استفاده، موارد تکرارشونده خارج از سیستم و مشکلات تیم را پایش کنید.",
        ],
      },
      {
        type: "heading",
        text: "از کوچک شروع کنید",
        level: 2,
      },
      {
        type: "paragraph",
        text: "لازم نیست در روز اول همه اجزا را بسازید. با بررسی محصول موجود، رنگ و تایپوگرافی پایه و چند Component پرتکرار شروع کنید. موارد مشابه را یکپارچه، دسترسی‌پذیری را بررسی و مستندات را هم‌زمان با استفاده واقعی کامل کنید. سیستم طراحی یک پروژه یک‌باره نیست؛ محصولی داخلی است که به نگه‌داری، بازخورد و اولویت‌بندی نیاز دارد.",
      },
      { type: "divider" },
      {
        type: "paragraph",
        text: "Style Guide زمانی ارزشمند است که تصمیم درست را برای تیم آسان‌تر کند. سند کوتاه و زنده‌ای که در طراحی و کد استفاده می‌شود، بهتر از کتابخانه بزرگی است که کسی به آن اعتماد ندارد.",
      },
    ],
  },
];

export const articlesEn: Article[] = [
  {
    slug: "what-is-user-flow",
    title: "What is a User Flow?",
    excerpt:
      "A user flow maps the steps, decisions, and system states a person encounters while working toward a goal in a product.",
    category: "User Experience",
    publishedAt: "August 28, 2021",
    readingTime: "5 min read",
    cover: userFlowCover,
    direction: "ltr",
    featured: true,
    content: [
      { type: "paragraph", text: "Every time someone signs up, makes a purchase, books a service, or completes a simple task, they move through a path. When that path has not been considered before interface design begins, the result is often a collection of disconnected screens, unclear choices, and frustrating dead ends." },
      { type: "heading", text: "What is a User Flow?", level: 2 },
      { type: "paragraph", text: "A user flow is a visual representation of the steps, decisions, and system responses involved in reaching a specific goal. A flow should have a clear scenario and boundary; it does not need to fit an entire product into one diagram." },
      { type: "image", src: userFlowChart, alt: "A sample flowchart showing paths from entry to different product actions", caption: "A user flow makes paths, decisions, and product states visible.", wide: true },
      { type: "heading", text: "What should you define first?", level: 2 },
      { type: "list", ordered: true, items: ["The user’s exact goal and the definition of success", "The entry point, such as search, a notification, or a direct link", "The user’s context, constraints, and information needs", "Business rules and technical limitations", "Errors, cancellations, and alternative paths that need to be supported"] },
      { type: "paragraph", text: "Answers should come from research, product data, and collaboration with the team—not only from a designer’s assumptions. When evidence is incomplete, write assumptions down so they can be tested later." },
      { type: "heading", text: "User Flow, Task Flow, and Journey Map", level: 2 },
      { type: "list", items: ["A task flow is usually a mostly linear route through one specific task.", "A user flow includes branches, decisions, screens, and system responses.", "A journey map looks at a broader experience, often beyond the product, including touchpoints, emotions, and opportunities."] },
      { type: "heading", text: "Design more than the happy path", level: 2 },
      { type: "paragraph", text: "Loading, no-results, lost connections, unavailable inventory, validation errors, going back, and cancellation are all part of a real experience. Every important decision needs understandable feedback, and users should know where they are and what happens next." },
      { type: "quote", text: "A useful flow includes alternative routes and recovery from failure—not only the happy path." },
      { type: "paragraph", text: "Validate the flow with a clickable prototype and representative users. Funnel data can show where people drop off, but observation and conversation help explain why. Keep the flow updated as the product evolves." },
    ],
  },
  {
    slug: "what-is-wireframe",
    title: "What is a Wireframe?",
    excerpt:
      "A wireframe is a lightweight blueprint for testing structure, content, and interaction before investing in polished UI.",
    category: "User Experience",
    publishedAt: "August 24, 2021",
    readingTime: "4 min read",
    cover: wireframeCover,
    direction: "ltr",
    featured: true,
    content: [
      { type: "paragraph", text: "Moving directly from an idea to polished UI or development increases the chance of spending significant time on a solution before the underlying problem has been validated. Wireframes let teams examine structure and interaction earlier and at a lower cost." },
      { type: "quote", text: "The earlier a team learns, the less expensive it is to change direction." },
      { type: "heading", text: "What is a wireframe?", level: 2 },
      { type: "paragraph", text: "A wireframe is a simplified representation of a screen or flow. It shows what information appears, how content is prioritized, what actions are available, and roughly where major elements belong." },
      { type: "paragraph", text: "Low-fidelity wireframes limit color, imagery, and visual decoration so discussion stays focused on content, hierarchy, and interaction. Realistic copy is still useful because labels, errors, and title lengths directly affect layout." },
      { type: "image", src: wireframeFidelity, alt: "A mobile wireframe being drawn with pen and paper", caption: "Choose fidelity based on the question you need the wireframe to answer.", wide: true },
      { type: "heading", text: "What should a wireframe cover?", level: 2 },
      { type: "list", items: ["The screen’s goal and primary user action", "Content priority and decision-making information", "Navigation, entry points, back, and cancel behavior", "Empty, loading, error, success, and restricted states", "Responsive behavior across different widths", "Early accessibility considerations such as logical order and clear labels"] },
      { type: "heading", text: "Tools and workflow", level: 2 },
      { type: "paragraph", text: "Pen and paper remain the fastest place to start. Figma, FigJam, Penpot, Miro, and similar tools help with collaboration and digital versions. A good tool should make ideas easy to change rather than pulling attention toward unnecessary polish." },
      { type: "gallery", images: [
        { src: wireframeSample1, alt: "Structural website wireframe" }, { src: wireframeSample2, alt: "Hand-drawn website screens" },
        { src: wireframeSample3, alt: "Hand-drawn mobile store flow" }, { src: wireframeSample4, alt: "Hand-drawn storefront home page" },
        { src: wireframeSample5, alt: "Corporate website home-page wireframe" }, { src: wireframeSample6, alt: "Flow diagram and early wireframes" },
        { src: wireframeSample7, alt: "A set of mobile application wireframes" },
      ] },
    ],
  },
  {
    slug: "user-centered-design-ucd",
    title: "User-Centered Design (UCD)",
    excerpt:
      "User-centered design brings real people, their goals, abilities, limitations, and context into product decisions throughout the lifecycle.",
    category: "User Experience",
    publishedAt: "August 24, 2021",
    readingTime: "6 min read",
    cover: ucdCover,
    direction: "ltr",
    featured: true,
    content: [
      { type: "heading", text: "What does user-centered design mean?", level: 2 },
      { type: "paragraph", text: "User-centered design is an iterative approach that brings people’s needs, abilities, limitations, and context of use into decisions across the product lifecycle. It does not mean implementing every request; it means understanding the right problem and evaluating solutions with evidence." },
      { type: "paragraph", text: "ISO 9241-210 emphasizes explicit understanding of users, tasks, and environments; ongoing user involvement; user-centered evaluation; and iteration. UCD is therefore not one interview at kickoff or a final test before release." },
      { type: "image", src: ucdPrinciples, alt: "The overlap of user needs, information, and business goals", caption: "Useful experiences balance human needs, product information, and business goals." },
      { type: "quote", text: "Invite users into the design process instead of only guessing on their behalf." },
      { type: "heading", text: "The user-centered design cycle", level: 2 },
      { type: "list", ordered: true, items: ["Understand who uses the product, why, with what tools, and in which conditions.", "Define user needs, business requirements, constraints, and measurable success criteria.", "Create solutions from sketches and wireframes through prototypes and working products.", "Evaluate whether the solution is effective, efficient, understandable, and satisfying in context."] },
      { type: "image", src: ucdResearch, alt: "A user at the center of research and design", caption: "Real users and their feedback stay at the center of the process.", wide: true },
      { type: "heading", text: "Choose the right method for the question", level: 2 },
      { type: "list", items: ["Interviews and contextual inquiry for needs, motivations, and context", "Analytics and funnels for large-scale patterns and drop-off", "Usability tests for observing task completion and barriers", "Diary studies for experiences that unfold over time", "Surveys for measuring known patterns", "Controlled experiments for comparing defined solutions"] },
      { type: "heading", text: "Accessibility and inclusion are part of UCD", level: 2 },
      { type: "paragraph", text: "Usability for a narrow group does not guarantee accessibility for everyone. Accessibility standards and research with people with disabilities should enter the process early. Technical compliance matters, but real participation helps determine whether a solution is usable in practice." },
      { type: "image", src: ucdDuolingo, alt: "A language-learning product interface", caption: "Learning products demonstrate how goals, feedback, and visible progress can support motivation." },
      { type: "paragraph", text: "User-centered design turns assumptions into evidence, involves people early and continuously, and measures success by their ability to reach meaningful goals. A failed test is not a failed project; it is a chance to improve before the problem becomes larger." },
    ],
  },
  {
    slug: "what-is-style-guide",
    title: "What is a Style Guide?",
    excerpt:
      "A style guide documents the visual and content rules that help teams create a coherent product experience.",
    category: "Design Systems",
    publishedAt: "August 23, 2021",
    readingTime: "5 min read",
    cover: styleGuideCover,
    direction: "ltr",
    featured: true,
    content: [
      { type: "paragraph", text: "A style guide is a documented set of visual and content rules for a brand or product. It explains how color, typography, spacing, imagery, icons, and voice should be used so the experience remains coherent across screens and channels." },
      { type: "paragraph", text: "A public UI kit can provide inspiration, but copying one does not create a guide for your product. Rules should grow from brand identity, user needs, platform constraints, accessibility requirements, and the team’s real workflow." },
      { type: "image", src: styleGuideComponents, alt: "Typography and UI components in a style guide", caption: "A style guide aligns the foundations of visual design.", wide: true },
      { type: "heading", text: "Style Guide, Component Library, and Design System", level: 2 },
      { type: "list", items: ["Brand guidelines cover identity, logo, color, imagery, and communication style.", "A UI style guide documents visual and content rules for interfaces.", "A component library contains reusable design or code components and their states.", "A design system also includes foundations, patterns, documentation, contribution, and governance."] },
      { type: "heading", text: "Foundations and design tokens", level: 2 },
      { type: "paragraph", text: "Many teams store foundational values as design tokens. A token gives a reusable value a name and role. Semantic tokens such as color-action-primary make themes, multiple brands, and platform changes easier to manage than repeated raw values." },
      { type: "list", items: ["Primitive and semantic color roles", "Typography roles and multilingual rules", "Spacing, size, radius, elevation, and layering scales", "Responsive grids and breakpoints", "Motion with reduced-motion support", "Modes for light, dark, high-contrast, or multiple brands"] },
      { type: "heading", text: "What should each component document?", level: 2 },
      { type: "list", items: ["Anatomy and purpose", "Variants, sizes, and configurable properties", "Default, hover, focus, active, disabled, loading, error, and success states", "Responsive, long-content, and right-to-left behavior", "Content and accessibility guidance", "Code examples, API, and the mapping between design and implementation"] },
      { type: "image", src: styleGuidePlatforms, alt: "An online environment for documenting a design system", caption: "Shared, living documentation makes collaboration easier.", wide: true },
      { type: "heading", text: "Start small and keep it alive", level: 2 },
      { type: "paragraph", text: "Start with an audit, core visual foundations, and a few frequently used components. Version meaningful changes, document migration, and define ownership. A small system that teams trust and use is more valuable than a large library that no one maintains." },
    ],
  },
];

export const getArticles = (language: "fa" | "en" = "fa") =>
  language === "fa" ? articles : articlesEn;

export const getArticleBySlug = (slug?: string, language: "fa" | "en" = "fa") =>
  getArticles(language).find((article) => article.slug === slug);
