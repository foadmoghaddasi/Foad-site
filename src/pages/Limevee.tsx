import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import sketches from "../assets/images/limevee/sketches.webp";
import wireframesA from "../assets/images/limevee/wireframes-a.webp";
import wireframesB from "../assets/images/limevee/wireframes-b.webp";
import finalUi from "../assets/images/limevee/final-ui.webp";
import "./Limevee.css";

const hypotheses = [
  [
    "سادگی، اعتماد می‌سازد",
    "رابط ساده و بدون ابهام، تعارض و رودربایستی در جمع‌های ایرانی را کمتر می‌کند.",
  ],
  [
    "تصمیم گروهی، رضایت بیشتر",
    "وقتی همه در انتخاب نقش داشته باشند، نتیجه منصفانه‌تر و پذیرفتنی‌تر است.",
  ],
  [
    "سؤال‌های کوتاه، ریزش کمتر",
    "فرآیند جمع‌آوری سلیقه باید کوتاه، شفاف و بدون فرم‌های خسته‌کننده باشد.",
  ],
  [
    "رأی‌گیری ناشناس",
    "رأی محرمانه تصمیم‌گیری را سریع می‌کند و فشار نظر دیگران را از بین می‌برد.",
  ],
  [
    "امتیازدهی لحظه‌ای",
    "یک مدل امتیازدهی وزن‌دار می‌تواند پیشنهادهای دقیق‌تر و مناسب‌تری بسازد.",
  ],
  [
    "شفافیت نتیجه",
    "دیدن دلیل انتخاب هر فیلم، اعتماد و همراهی اعضای گروه را افزایش می‌دهد.",
  ],
];

const features = [
  [
    "بدون حساب کاربری",
    "ورود به جمع تنها با اسکن QR Code؛ بدون ثبت‌نام و اصطکاک اضافه.",
  ],
  [
    "رأی‌گیری کاملاً ناشناس",
    "هر نفر آزادانه نظر می‌دهد، بدون اینکه رأی او برای بقیه مشخص شود.",
  ],
  [
    "شروع هوشمند با QR",
    "میزبان یک جمع می‌سازد و دیگران در چند ثانیه به آن می‌پیوندند.",
  ],
  [
    "نمایش تعداد مشارکت‌کنندگان",
    "تعداد افراد تکمیل‌کننده فرم، لحظه‌ای روی تلویزیون دیده می‌شود.",
  ],
  [
    "پرسش‌های کوتاه و کاربردی",
    "ژانر، حال‌وهوا، مدت‌زمان و چند ترجیح کلیدی؛ همین و بس.",
  ],
  [
    "پیشنهاد همراه با دلیل",
    "هر انتخاب با امتیاز و دلیل روشن نمایش داده می‌شود تا تصمیم نهایی ساده باشد.",
  ],
];

const pains = [
  ["فشار روی یک یا دو نفر برای انتخاب", "خستگی تصمیم‌گیرنده‌ها"],
  ["بحث طولانی بین سلیقه‌های مختلف", "اتلاف زمان و انرژی"],
  ["رودربایستی و نادیده‌گرفتن نظر واقعی", "انتخاب غیرمنصفانه"],
  ["پیشنهادهای زیاد و پراکنده", "سردرگمی و رها کردن انتخاب"],
];

function SurveyCharts() {
  const bars = [18, 29, 37, 72, 54];
  return (
    <div className="lv-chart-grid">
      <div className="lv-chart-card lv-donut-card">
        <div className="lv-donut">
          <span>
            ۵۳<small>پاسخ</small>
          </span>
        </div>
        <div>
          <span className="lv-kicker">نمونه‌ی پژوهش</span>
          <h3>داده از تجربه‌های واقعی</h3>
          <p>
            پرسش‌نامه‌ی کمی، الگوهای تصمیم‌گیری جمعی و مهم‌ترین معیارهای انتخاب
            فیلم را روشن کرد.
          </p>
        </div>
      </div>
      <div className="lv-chart-card">
        <div className="lv-bars" aria-label="نمودار اهمیت امتیاز فیلم">
          {bars.map((bar, index) => (
            <i
              key={bar}
              style={
                {
                  "--bar": `${bar}%`,
                  "--delay": `${index * 90}ms`,
                } as React.CSSProperties
              }
            >
              <b>{bar}%</b>
            </i>
          ))}
        </div>
        <span className="lv-kicker">اهمیت امتیاز فیلم</span>
        <h3>امتیاز، یک معیار تعیین‌کننده است</h3>
        <p>
          حدود ۶۹٪ شرکت‌کنندگان، امتیاز فیلم در سایت‌های معتبر را مهم می‌دانند.
        </p>
      </div>
      <div className="lv-chart-card lv-meter-card">
        <div className="lv-meter">
          <i />
          <strong>۴۳٪</strong>
        </div>
        <span className="lv-kicker">تصمیم‌گیری در جمع</span>
        <h3>انتخاب هنوز یک مسئله‌ی گروهی است</h3>
        <p>
          ۴۳٪ اعلام کردند وجود دو یا سه گزینه برای رسیدن به تصمیم بهتر، مفید
          است.
        </p>
      </div>
    </div>
  );
}

const flow = [
  "ساخت جمع توسط میزبان",
  "نمایش QR روی تلویزیون",
  "ورود مهمان‌ها بدون ثبت‌نام",
  "ثبت ترجیح‌های کوتاه و ناشناس",
  "محاسبه‌ی امتیاز وزن‌دار",
  "نمایش پیشنهادها و انتخاب نهایی",
];

export default function Limevee() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <main className="limevee-page" dir="rtl">
      <div className="lv-progress" style={{ width: `${progress}%` }} />
      <Navbar />

      <section className="lv-hero">
        <div className="lv-orb lv-orb-one" />
        <div className="lv-orb lv-orb-two" />
        <div className="lv-hero-grid">
          <Reveal className="lv-hero-copy">
            <span className="lv-eyebrow">چالش طراحی محصول · ۲۰۲۴</span>
            <h1>
              انتخاب فیلم،
              <br />
              <em>
                بدون بحث‌های
                <br /> بی‌پایان.
              </em>
            </h1>
            <p>
              طراحی یک تجربه‌ی جمعی، سریع و ناشناس
              <br /> برای پیدا کردن فیلمی که همه واقعاً دوست دارند ببینند.
            </p>
            <div className="lv-hero-meta">
              <span>
                نقش من <b>Product Designer</b>
              </span>
              <span>
                خروجی <b>Responsive Web App</b>
              </span>
            </div>
          </Reveal>
          <Reveal className="lv-tv" delay={180}>
            <div className="lv-tv-top">
              <span>Limevee</span>
              <i />
              <i />
              <i />
            </div>
            <div className="lv-tv-body">
              <div className="lv-vote-card">
                <small>نظر سنجی آغاز شد!</small>
                <strong>۰۲:۰۰</strong>
              </div>
              <div className="lv-qr" aria-label="نماد QR">
                <i />
                <i />
                <i />
                <b />
              </div>
              <p>برای پیوستن اسکن کنید</p>
            </div>
          </Reveal>
        </div>
        <a className="lv-scroll-hint" href="#challenge">
          اسکرول برای مطالعه <span>↓</span>
        </a>
      </section>

      <section className="lv-section" id="challenge">
        <Reveal className="lv-section-head">
          <span className="lv-index">۰۱</span>
          <div>
            <span className="lv-kicker">تعریف مسئله</span>
            <h2>وقتی گزینه‌ها زیادند، انتخاب سخت‌تر می‌شود.</h2>
          </div>
        </Reveal>
        <div className="lv-two-col">
          <Reveal className="lv-lead">
            <p>
              در جمع‌های خانوادگی و دوستانه، انتخاب فیلم اغلب با اختلاف سلیقه،
              رودربایستی و خستگی تصمیم‌گیری همراه است. تعداد زیاد گزینه‌ها هم
              انتخاب را ساده‌تر نمی‌کند؛ آن را طولانی‌تر می‌کند.
            </p>
          </Reveal>
          <Reveal className="lv-quote" delay={120}>
            <span>فرصت طراحی</span>
            <blockquote>
              چطور می‌توانیم سلیقه‌ی همه را بشنویم، بدون اینکه یک گفت‌وگوی ساده
              به مذاکره‌ای طولانی تبدیل شود؟
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="lv-section lv-muted">
        <Reveal className="lv-section-head">
          <span className="lv-index">۰۲</span>
          <div>
            <span className="lv-kicker">فرضیات طراحی</span>
            <h2>هشت فرضیه برای شروع مسیر</h2>
          </div>
        </Reveal>
        <div className="lv-card-grid">
          {hypotheses.map(([title, body], index) => (
            <Reveal
              className="lv-info-card"
              delay={(index % 3) * 80}
              key={title}
            >
              <span>۰{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lv-section">
        <Reveal className="lv-section-head">
          <span className="lv-index">۰۳</span>
          <div>
            <span className="lv-kicker">پژوهش تجربه کاربری</span>
            <h2>پرسش‌نامه‌ی کمی و ۵۳ تجربه‌ی واقعی</h2>
          </div>
        </Reveal>
        <Reveal>
          <SurveyCharts />
        </Reveal>
      </section>

      <section className="lv-section lv-muted">
        <Reveal className="lv-section-head">
          <span className="lv-index">۰۴</span>
          <div>
            <span className="lv-kicker">بینش‌ها و نقاط درد</span>
            <h2>آنچه داده‌ها درباره‌ی انتخاب جمعی گفتند</h2>
          </div>
        </Reveal>
        <div className="lv-insights">
          <Reveal className="lv-big-insight">
            <strong>۱</strong>
            <p>تمرکز زیاد روی سلیقه‌ی یک نفر، رضایت جمع را پایین می‌آورد.</p>
          </Reveal>
          <Reveal className="lv-big-insight" delay={80}>
            <strong>۲</strong>
            <p>تعداد کم سؤال‌ها، مشارکت و تکمیل فرآیند را بیشتر می‌کند.</p>
          </Reveal>
          <Reveal className="lv-big-insight" delay={160}>
            <strong>۳</strong>
            <p>
              ناشناس بودن رأی، پاسخ‌های صادقانه‌تر و تصمیم عادلانه‌تر می‌سازد.
            </p>
          </Reveal>
        </div>
        <Reveal className="lv-pain-table">
          {pains.map(([pain, effect]) => (
            <div key={pain}>
              <span>{pain}</span>
              <b>{effect}</b>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="lv-section">
        <Reveal className="lv-section-head">
          <span className="lv-index">۰۵</span>
          <div>
            <span className="lv-kicker">ایده‌ی طراحی</span>
            <h2>یک تسهیل‌گر دیجیتال برای تماشای جمعی</h2>
          </div>
        </Reveal>
        <Reveal className="lv-design-statement">
          <p>
            فیچر تماشای جمعی در Limevee با هدف ساده‌سازی و عادلانه‌کردن انتخاب
            طراحی شد. میزبان یک Session می‌سازد، دیگران با QR وارد می‌شوند و چند
            سؤال کوتاه را پاسخ می‌دهند. سیستم در پایان، بدون افشای رأی افراد،
            فیلم‌هایی با بالاترین امتیاز وزن‌دار را پیشنهاد می‌کند.
          </p>
          <span>بدون ثبت‌نام</span>
          <span>بدون رودربایستی</span>
          <span>بدون اتلاف وقت</span>
        </Reveal>
      </section>

      <section className="lv-section lv-flow-section">
        <Reveal className="lv-section-head">
          <span className="lv-index">۰۶</span>
          <div>
            <span className="lv-kicker">جریان کاربری</span>
            <h2>از ساخت جمع تا پلی‌کردن فیلم</h2>
          </div>
        </Reveal>
        <div className="lv-flow">
          {flow.map((step, index) => (
            <Reveal key={step} className="lv-flow-step" delay={index * 70}>
              <i>{index + 1}</i>
              <span>{step}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lv-section lv-muted">
        <Reveal className="lv-section-head">
          <span className="lv-index">۰۷</span>
          <div>
            <span className="lv-kicker">ویژگی‌های کلیدی</span>
            <h2>اصطکاک کمتر، مشارکت بیشتر</h2>
          </div>
        </Reveal>
        <div className="lv-card-grid">
          {features.map(([title, body], index) => (
            <Reveal className="lv-feature" delay={(index % 3) * 80} key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lv-section lv-process">
        <Reveal className="lv-section-head">
          <span className="lv-index">۰۸</span>
          <div>
            <span className="lv-kicker">از کاغذ تا محصول</span>
            <h2>اسکچ، وایرفریم و رابط نهایی</h2>
          </div>
        </Reveal>
        <div className="lv-gallery">
          <Reveal className="lv-artifact lv-artifact-wide">
            <img src={sketches} alt="اسکچ‌های اولیه‌ی Limevee" loading="lazy" />
            <span>01 · Sketches</span>
          </Reveal>
          <Reveal className="lv-artifact">
            <img
              src={wireframesA}
              alt="اسکچ و وایرفریم‌های اولیه"
              loading="lazy"
            />
            <span>02 · Low-fi wireframes</span>
          </Reveal>
          <Reveal className="lv-artifact">
            <img
              src={wireframesB}
              alt="وایرفریم‌ها و رابط کاربری Limevee"
              loading="lazy"
            />
            <span>03 · Wireframes</span>
          </Reveal>
          <Reveal className="lv-artifact lv-artifact-wide lv-final-art">
            <img
              src={finalUi}
              alt="رابط نهایی تماشای جمعی Limevee"
              loading="lazy"
            />
            <span>04 · Final UI</span>
          </Reveal>
        </div>
      </section>

      <div className="lv-site-footer-wrap">
        <Footer />
      </div>
    </main>
  );
}
