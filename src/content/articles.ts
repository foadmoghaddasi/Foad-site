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
    readingTime: "۳ دقیقه مطالعه",
    cover: userFlowCover,
    direction: "rtl",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "تا به حال شده وسط خرید از سایتی مثل دیجی‌کالا گم شوید و ندانید در کدام مرحله از فرایند خرید هستید؟ منوها را بگردید، میان صفحات جابه‌جا شوید و در جنگلی از اطلاعات و فرایندها گم شوید؟",
      },
      {
        type: "paragraph",
        text: "این اتفاق معمولاً زمانی رخ می‌دهد که از ابتدای طراحی محصول، نقشه راه کاربر و فرایندهایی که باید برای رسیدن به هدفش طی کند به‌درستی طراحی نشده باشند.",
      },
      {
        type: "heading",
        text: "یوزر فلو (User Flow) چیست؟",
        level: 2,
      },
      {
        type: "paragraph",
        text: "User Flow به مجموعه فرایندهایی گفته می‌شود که مسیر صفر تا صد کاربر برای رفع نیازش به کمک محصول را نشان می‌دهند. این نقشه‌ها، فلوچارت‌ها و فرایندها مشخص می‌کنند کاربر برای رسیدن به هر هدف چه راهی را طی می‌کند. در آن‌ها باید تمام شرایط احتمالی پیش‌بینی شوند و برای هرکدام راه‌حل مناسبی طراحی شود.",
      },
      {
        type: "paragraph",
        text: "نقشه راه کاربر معمولاً شبیه چارت‌ها یا فلوچارت‌هایی است که گاهی در فرایند برنامه‌نویسی می‌بینیم.",
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
        text: "چه سؤال‌هایی باید بپرسیم؟",
        level: 2,
      },
      {
        type: "list",
        ordered: true,
        items: [
          "کاربر سعی دارد به چه چیزی برسد؟",
          "در طول مسیر چه چیزی اعتماد کاربر را افزایش می‌دهد؟",
          "برای جلوگیری از گم‌شدن کاربر، چه اطلاعات اضافه‌ای باید به او بدهیم؟",
          "چه موانع و تردیدهایی ممکن است برای کاربر پیش بیاید؟",
        ],
      },
      {
        type: "paragraph",
        text: "باید با توجه به محصول، برای هرکدام از این سؤال‌ها راه‌حلی پیش‌بینی و طراحی کرده باشیم. پاسخ به آن‌ها در نهایت به طراحی یک User Flow موفق منجر می‌شود.",
      },
      {
        type: "heading",
        text: "یک مثال: خرید موبایل از فروشگاه آنلاین",
        level: 2,
      },
      {
        type: "paragraph",
        text: "برای مثال، مسیری که برای خرید یک دستگاه موبایل از سایتی مثل دیجی‌کالا طی می‌کنیم می‌تواند به شکل زیر باشد:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "کاربر وارد صفحه اصلی سایت می‌شود.",
          "از منوی بالای صفحه، دسته‌بندی کالای دیجیتال را انتخاب می‌کند.",
          "زیرمجموعه موبایل یا تلفن همراه را پیدا می‌کند.",
          "روی زیرمجموعه موردنظر کلیک می‌کند.",
          "در میان کالاهای موجود، محصول موردنظرش را پیدا می‌کند.",
          "وارد صفحه محصول می‌شود.",
          "مشخصات و تصاویر کالا را بررسی می‌کند.",
          "در صورت تمایل، روی دکمه افزودن به سبد خرید کلیک می‌کند.",
          "وارد سبد خرید می‌شود و ادامه فرایند خرید را انتخاب می‌کند.",
          "زمان و مکان تحویل سفارش را تعیین می‌کند.",
          "روی دکمه پرداخت کلیک می‌کند.",
          "در صفحه پرداخت، تراکنش را انجام می‌دهد.",
          "پس از مشاهده نتیجه پرداخت به سایت مبدا بازمی‌گردد.",
          "خرید با موفقیت به پایان می‌رسد.",
        ],
      },
      {
        type: "paragraph",
        text: "هرکدام از این مراحل چالش‌های مخصوص خودشان را دارند که توضیح کامل آن‌ها در این مقاله نمی‌گنجد. یک طراح محصول باید تلاش کند این فرایند برای کاربر ساده، قابل‌درک و سریع باشد.",
      },
      {
        type: "quote",
        text: "هر نیاز کاربر می‌تواند User Flow متفاوتی داشته باشد.",
      },
      {
        type: "paragraph",
        text: "برای هر نیازی که کاربر می‌خواهد با محصول برطرف کند می‌توان فلوی متفاوتی طراحی کرد. کنار هم قرارگرفتن این User Flowها یک نقشه کلی به نام User Journey Map می‌سازد که در نوشته‌های بعدی درباره‌اش صحبت می‌کنیم.",
      },
      { type: "divider" },
      {
        type: "paragraph",
        text: "امیدوارم از خواندن این مقاله لذت برده باشید.",
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
    readingTime: "۱ دقیقه مطالعه",
    cover: wireframeCover,
    direction: "rtl",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "اگر بلافاصله بعد از ایده‌پردازی مستقیم سراغ پیاده‌سازی و طراحی UI برویم، ریسک پروژه را بالا می‌بریم. چرا؟ فرض کنید ایده را مستقیماً به کیت‌های UI تبدیل کرده‌ایم و همه‌چیز را با جزئیات دقیق طراحی و پیاده‌سازی کرده‌ایم. حالا وقت آزمایش رسیده و بوم!",
      },
      {
        type: "quote",
        text: "آزمایش با شکست مواجه شد...",
      },
      {
        type: "paragraph",
        text: "زمان و هزینه زیادی صرف شده تا همه‌چیز با جزئیات طراحی شود و حالا طرح شکست خورده است. اما اگر پیش از آن وایرفریمی می‌ساختیم که ایده و ساختار طرح را نشان دهد و آزمایش‌ها را روی همان وایرفریم یا پروتوتایپ اولیه انجام می‌دادیم، می‌توانستیم ریسک پروژه را به کمترین حد ممکن برسانیم.",
      },
      {
        type: "heading",
        text: "وایرفریم چیست؟",
        level: 2,
      },
      {
        type: "paragraph",
        text: "وایرفریم یک اسکلت ساده از محصول است که ایده‌هایمان را نشان می‌دهد و می‌تواند برای هر پلتفرمی، از تلویزیون گرفته تا موبایل و ساعت هوشمند، ساخته شود.",
      },
      {
        type: "paragraph",
        text: "وایرفریم‌ها گرافیک خاصی مثل رنگ، جزئیات بصری یا تایپوگرافی ندارند و فقط به ساختار و کاربرد محصول می‌پردازند. آن‌ها طیفی از Low-fidelity تا High-fidelity را تشکیل می‌دهند و بر اساس نیاز و اندازه پروژه می‌توانند در هر نقطه‌ای از این طیف طراحی شوند.",
      },
      {
        type: "quote",
        text: "از وایرفریمی با جزئیات کم تا وایرفریمی با جزئیات زیاد!",
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
        text: "ابزار طراحی وایرفریم",
        level: 2,
      },
      {
        type: "paragraph",
        text: "برای طراحی وایرفریم، بهترین ابزار قلم و کاغذ است :) همچنین می‌توانید از ابزارهای دیجیتال مثل Sketch، Adobe XD یا InVision استفاده کنید.",
      },
      {
        type: "paragraph",
        text: "از آنجایی که وایرفریم باید به ساده‌ترین روش ممکن طراحی شود و به ابزارهای پیچیده‌ای نیاز ندارد، پیشنهاد من همان قلم و کاغذ است. برای جزئیات بیشتر می‌توانید سراغ ابزارهای تخصصی‌تر بروید.",
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
    readingTime: "۳ دقیقه مطالعه",
    cover: ucdCover,
    direction: "rtl",
    featured: true,
    content: [
      {
        type: "heading",
        text: "فرض کنید...",
        level: 2,
      },
      {
        type: "paragraph",
        text: "یکی از دیجی‌کالا با شما تماس بگیرد و بپرسد: آیا به‌راحتی از سایت ما خرید می‌کنید؟ شما هم شروع کنید به گفتن اینکه کدام قسمت‌ها می‌توانست بهتر باشد. چند روز بعد با یک نمونه اولیه برگردند و دوباره نظرتان را بپرسند؛ و بعد از مدتی ببینید سایت به‌روزرسانی شده، تغییراتی که می‌خواستید اعمال شده‌اند و حالا راحت‌تر خرید می‌کنید.",
      },
      {
        type: "paragraph",
        text: "این دقیقاً نمونه‌ای از اجرای تفکر طراحی و طراحی کاربرمحور است؛ موضوعی که در ادامه بیشتر درباره‌اش صحبت می‌کنیم.",
      },
      {
        type: "paragraph",
        text: "برای حل مسئله باید از تفکر کاربرمحور استفاده کنیم؛ یعنی از خودمان بپرسیم برای چه کسی و چه چیزی را طراحی می‌کنیم؟ وقتی این‌طور نگاه کنیم، کاربر را در بالاترین جایگاه قرار می‌دهیم و از منظر او طراحی می‌کنیم.",
      },
      {
        type: "image",
        src: ucdPrinciples,
        alt: "هم‌پوشانی نیازهای کاربر، اطلاعات و اهداف کسب‌وکار در تجربه کاربری",
        caption: "تجربه کاربری در نقطه تلاقی نیازهای کاربر، اطلاعات و اهداف کسب‌وکار شکل می‌گیرد.",
      },
      {
        type: "quote",
        text: "طراحی کاربرمحور یک طرز فکر است؛ تفکر طراحی.",
      },
      {
        type: "paragraph",
        text: "دکتر دونالد نورمن، محقق علوم شناختی، اولین کسی بود که اهمیت طراحی کاربرمحور را توضیح داد و گفت تصمیم‌های طراحی باید بر اساس نیازها و خواسته‌های کاربران باشند. برای طراحی کاربرمحور، افرادی را که از محصول استفاده می‌کنند پیدا کنید، ببینید چطور و برای چه کاری از محصول شما استفاده می‌کنند، نحوه تعاملشان را بسنجید و حرف‌هایشان را بشنوید.",
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
        text: "مراحل طراحی مبتنی بر کاربر",
        level: 2,
      },
      {
        type: "paragraph",
        text: "اگر بخواهیم این فرایند را کامل توضیح دهیم، از شش مرحله اصلی تشکیل می‌شود:",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "مشخص‌کردن زمینه استفاده و نیازهای کاربر از محصول",
          "مشخص‌کردن نیازها و الزامات کسب‌وکار",
          "طراحی راه‌حل‌ها، از وایرفریم تا پروتوتایپ",
          "ارزیابی طراحی‌ها با آزمایش‌های مختلف",
          "پیاده‌سازی، توسعه و عرضه محصول نهایی",
          "ارزیابی محصول نهایی",
        ],
      },
      {
        type: "paragraph",
        text: "نکته مهم این است که در طول این فرایند شاید مجبور شویم بعضی مرحله‌ها را بارها تکرار کنیم تا به محصول ایدئال برسیم. ممکن است ارزیابی‌های اولیه چند بار شکست بخورند و لازم باشد فرایند را آن‌قدر تکرار کنیم تا به نتیجه نهایی برسیم.",
      },
      {
        type: "quote",
        text: "هیچ راهی بهتر از گفت‌وگو برای درک خواسته‌های کاربران وجود ندارد. با آن‌ها حضوری یا آنلاین، انفرادی یا گروهی مصاحبه کنید؛ بازخوردها را یادداشت کنید، به آن‌ها اهمیت بدهید و از این فرصت برای پرسیدن سؤال‌های بیشتر استفاده کنید.",
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
        text: "فواید تحقیق و طراحی کاربرمحور",
        level: 2,
      },
      {
        type: "list",
        items: [
          "درک روشن از کاربران و محیط پیرامون آن‌ها",
          "طراحی مبتنی بر ارزیابی",
          "طراحی با توجه به تجربه‌های عمومی مصرف‌کننده",
          "مشارکت کاربران در فرایند طراحی",
        ],
      },
      {
        type: "heading",
        text: "یک مثال آشنا: Duolingo",
        level: 2,
      },
      {
        type: "image",
        src: ucdDuolingo,
        alt: "نمونه رابط کاربری اپلیکیشن آموزش زبان Duolingo",
        caption: "Duolingo نمونه‌ای آشنا از طراحی ساده، دسترس‌پذیر و درگیرکننده است.",
      },
      {
        type: "paragraph",
        text: "هر کسی که از اپلیکیشن Duolingo استفاده کرده باشد، سادگی طراحی و دسترس‌پذیری فوق‌العاده آن را درک می‌کند. با تمام‌کردن هر مرحله به مرحله بعد می‌روید و بخش‌های جدید را باز می‌کنید. این چرخه نوعی انگیزه و عادت در کاربر ایجاد می‌کند که باعث می‌شود بارها به اپلیکیشن سر بزند و از آن استفاده کند.",
      },
      {
        type: "paragraph",
        text: "احتمال شکست در این فرایند زیاد است. شاید بارها ایده را طراحی کنید و در ارزیابی شکست بخورید یا به نتیجه دلخواه نرسید؛ اما ادامه دهید. طراحی تجربه همین آزمون‌وخطاهاست و شاید چیزهایی که از خطاها و شکست‌ها یاد می‌گیرید، بسیار باارزش‌تر و شیرین‌تر از موفقیت‌ها باشند.",
      },
      {
        type: "paragraph",
        text: "کار طراحی کاربرمحور همین است: پیش از اینکه مشکلی اتفاق بیفتد به ما یاد می‌دهد چطور با آن روبه‌رو شویم و حتی قبل از ظاهرشدنش، آن را حل کنیم.",
      },
      { type: "divider" },
      {
        type: "paragraph",
        text: "امیدوارم این مطلب برایتان مفید بوده باشد. موفق، پیروز و سربلند باشید.",
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
    readingTime: "۲ دقیقه مطالعه",
    cover: styleGuideCover,
    direction: "rtl",
    featured: true,
    content: [
      {
        type: "paragraph",
        text: "داکیومنت Style Guide چیزی شبیه کاتالوگ محصول شماست و تمام استانداردهای طراحی برای برند یا محصول را مشخص می‌کند؛ کاتالوگی که همه جزئیات طراحی را در خود دارد، از نحوه نمایش خطاها گرفته تا اندازه و فونت هر هدینگ یا پاراگراف و پالت‌های رنگی به‌کاررفته.",
      },
      {
        type: "paragraph",
        text: "برای داشتن یک Style Guide لازم نیست حتماً خودتان آن را از ابتدا طراحی کرده باشید. می‌توانید پیش از شروع فرایند طراحی، از سایت‌های مختلف استایل موردعلاقه‌تان را دانلود کنید و محصول را بر اساس آن طراحی کنید. اما در پروژه‌های بزرگ‌تر و حرفه‌ای‌تر، طراحان محصول بر اساس داکیومنتی که خودشان طراحی کرده‌اند به طراحی محصول می‌پردازند.",
      },
      {
        type: "paragraph",
        text: "داکیومنت Style Guide در اصل ویژگی‌ها و هویت برند را مشخص می‌کند و کمک می‌کند کسانی که در کسب‌وکار همراه ما هستند از این ویژگی‌ها مطلع شوند و در چارچوب آن فعالیت کنند. به عبارتی باعث انسجام میان تیم‌های مختلف می‌شود و نتیجه‌اش تجربه کاربری بهتر و محبوبیت بیشتر برند است. استایل گاید در ادامه به دفترچه راهنمای هویت بصری برند و ابزاری برای دیزاینرها و دولوپرها تبدیل می‌شود.",
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
        text: "در یک Style Guide چه چیزهایی وجود دارد؟",
        level: 2,
      },
      {
        type: "paragraph",
        text: "در یک Style Guide حداقل وجود عناصر زیر ضروری است:",
      },
      {
        type: "list",
        items: [
          "Typography Scheme",
          "Responsive Layouts",
          "Color Palette",
          "Buttons",
        ],
      },
      {
        type: "heading",
        text: "اجزای تکمیلی",
        level: 2,
      },
      {
        type: "paragraph",
        text: "برای کامل‌ترشدن این داکیومنت می‌توانید عناصر زیر را هم به آن اضافه کنید:",
      },
      {
        type: "list",
        items: [
          "Iconography",
          "Tooltips and popovers",
          "Modals",
          "Form elements",
          "Data Tables",
          "Navigation menus",
          "Charts and data visualizations",
          "Tabs",
          "On-off switches",
          "Dialogs",
          "Content grid lists",
          "Vertical lists",
          "Toolbars",
          "Date and time pickers",
          "Loading indicators",
          "Checkboxes",
          "Alerts",
          "Dropdown menus",
          "Sliders",
          "Steppers",
          "Pagination",
        ],
      },
      {
        type: "heading",
        text: "راهنماهای ساختاری",
        level: 2,
      },
      {
        type: "paragraph",
        text: "برای بهترشدن عملکرد این داکیومنت‌ها در تیم طراحی باید راهنماهای ساختاری هم در آن‌ها قرار بگیرد؛ مثل فهرست مطالب، مشخص‌کردن کانتکست و هدف محصول، دستورالعمل فاصله‌گذاری یا موقعیت متریال‌های مختلف محصول و قوانین و بایدها و نبایدهای استفاده از هر متریال در موقعیت‌های مختلف؛ برای مثال رنگ لوگو روی پس‌زمینه‌های متفاوت.",
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
        text: "اشتراک‌گذاری و دسترسی",
        level: 2,
      },
      {
        type: "paragraph",
        text: "پس از آماده‌شدن داکیومنت، باید آن را در دسترس تیم طراحی و توسعه قرار دهیم. پلتفرم‌هایی وجود دارند که می‌توان استایل‌ها را در آن‌ها با دیگران به اشتراک گذاشت و از بازخوردها استفاده کرد؛ از جمله:",
      },
      {
        type: "list",
        items: ["Figma", "Phase", "InVision", "Material Design"],
      },
      {
        type: "paragraph",
        text: "همچنین می‌توانید از این پلتفرم‌ها برای ایده‌گرفتن یا طراحی ایده‌هایتان استفاده کنید.",
      },
      { type: "divider" },
      {
        type: "paragraph",
        text: "امیدوارم از خواندن این مطلب لذت برده باشید :) ",
      },
    ],
  },
];

export const getArticleBySlug = (slug?: string) =>
  articles.find((article) => article.slug === slug);
