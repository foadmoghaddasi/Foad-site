import { useEffect, useState } from "react";
import Reveal from "../components/Reveal";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import sketches from "../assets/images/limevee/sketches.webp";
import wireframesA from "../assets/images/limevee/wireframes-a.webp";
import wireframesB from "../assets/images/limevee/wireframes-b.webp";
import finalUi from "../assets/images/limevee/final-ui.webp";
import "./Limevee.css";
import { useLanguage } from "../context/LanguageContext";

const hypothesesFa = [
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

const featuresFa = [
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

const painsFa = [
  ["فشار روی یک یا دو نفر برای انتخاب", "خستگی تصمیم‌گیرنده‌ها"],
  ["بحث طولانی بین سلیقه‌های مختلف", "اتلاف زمان و انرژی"],
  ["رودربایستی و نادیده‌گرفتن نظر واقعی", "انتخاب غیرمنصفانه"],
  ["پیشنهادهای زیاد و پراکنده", "سردرگمی و رها کردن انتخاب"],
];

function SurveyCharts() {
  const { isFa } = useLanguage();
  const bars = [18, 29, 37, 72, 54];
  return (
    <div className="lv-chart-grid">
      <div className="lv-chart-card lv-donut-card">
        <div className="lv-donut">
          <span>
            {isFa ? "۵۳" : "53"}<small>{isFa ? "پاسخ" : "responses"}</small>
          </span>
        </div>
        <div>
          <span className="lv-kicker">{isFa ? "نمونه پژوهش" : "Research sample"}</span>
          <h3>{isFa ? "داده از تجربه‌های واقعی" : "Data from real experiences"}</h3>
          <p>
            {isFa
              ? "پرسش‌نامه کمّی، الگوهای تصمیم‌گیری جمعی و مهم‌ترین معیارهای انتخاب فیلم را روشن کرد."
              : "A quantitative survey revealed group decision patterns and the most important criteria for choosing a movie."}
          </p>
        </div>
      </div>
      <div className="lv-chart-card">
        <div className="lv-bars" aria-label={isFa ? "نمودار اهمیت امتیاز فیلم" : "Movie rating importance chart"}>
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
        <span className="lv-kicker">{isFa ? "اهمیت امتیاز فیلم" : "Rating importance"}</span>
        <h3>{isFa ? "امتیاز، یک معیار تعیین‌کننده است" : "Ratings are a deciding factor"}</h3>
        <p>
          {isFa
            ? "حدود ۶۹٪ شرکت‌کنندگان، امتیاز فیلم در سایت‌های معتبر را مهم می‌دانند."
            : "About 69% of participants consider movie ratings on trusted platforms important."}
        </p>
      </div>
      <div className="lv-chart-card lv-meter-card">
        <div className="lv-meter">
          <i />
          <strong>{isFa ? "۴۳٪" : "43%"}</strong>
        </div>
        <span className="lv-kicker">{isFa ? "تصمیم‌گیری در جمع" : "Group decision-making"}</span>
        <h3>{isFa ? "انتخاب هنوز یک مسئله گروهی است" : "Choosing remains a group challenge"}</h3>
        <p>
          {isFa
            ? "۴۳٪ اعلام کردند وجود دو یا سه گزینه برای رسیدن به تصمیم بهتر، مفید است."
            : "43% said having two or three options helps the group reach a better decision."}
        </p>
      </div>
    </div>
  );
}

const flowFa = [
  "ساخت جمع توسط میزبان",
  "نمایش QR روی تلویزیون",
  "ورود مهمان‌ها بدون ثبت‌نام",
  "ثبت ترجیح‌های کوتاه و ناشناس",
  "محاسبه‌ی امتیاز وزن‌دار",
  "نمایش پیشنهادها و انتخاب نهایی",
];

const hypothesesEn = [
  ["Simplicity builds trust", "A clear interface reduces friction and social pressure within a group."],
  ["Shared decisions improve satisfaction", "When everyone contributes, the outcome feels fairer and more acceptable."],
  ["Short questions reduce drop-off", "Collecting preferences should be quick, transparent, and free of tiring forms."],
  ["Anonymous voting", "Private votes speed up decisions and remove pressure from other people’s opinions."],
  ["Real-time scoring", "A weighted scoring model can generate more relevant recommendations."],
  ["Transparent results", "Explaining why each movie was selected increases trust in the final choice."],
];

const featuresEn = [
  ["No account required", "Join a group by scanning a QR code, with no registration or extra friction."],
  ["Fully anonymous voting", "Everyone can share an honest opinion without exposing their vote."],
  ["Smart start with QR", "The host creates a room and guests join within seconds."],
  ["Live participant count", "The TV shows how many people have completed the questions in real time."],
  ["Short, useful questions", "Genre, mood, duration, and a few key preferences—that is all."],
  ["Recommendations with reasons", "Every option includes a score and a clear reason to simplify the final decision."],
];

const painsEn = [
  ["Pressure on one or two people to choose", "Decision-maker fatigue"],
  ["Long debates between different tastes", "Wasted time and energy"],
  ["Social pressure hides honest opinions", "An unfair choice"],
  ["Too many scattered suggestions", "Confusion and abandonment"],
];

const flowEn = [
  "Host creates a group", "QR code appears on the TV", "Guests join without registering",
  "Guests submit short, anonymous preferences", "The system calculates weighted scores",
  "Recommendations appear and the group makes the final choice",
];

export default function Limevee() {
  const { isFa, direction } = useLanguage();
  const hypotheses = isFa ? hypothesesFa : hypothesesEn;
  const features = isFa ? featuresFa : featuresEn;
  const pains = isFa ? painsFa : painsEn;
  const flow = isFa ? flowFa : flowEn;
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
    <main className="limevee-page" dir={direction}>
      <div className="lv-progress" style={{ width: `${progress}%` }} />
      <Navbar />

      <section className="lv-hero">
        <div className="lv-orb lv-orb-one" />
        <div className="lv-orb lv-orb-two" />
        <div className="lv-hero-grid">
          <Reveal className="lv-hero-copy">
            <span className="lv-eyebrow">
              {isFa ? "چالش طراحی محصول · ۲۰۲۴" : "Product design challenge · 2024"}
            </span>
            <h1>
              {isFa ? "انتخاب فیلم،" : "Pick a movie,"}
              <br />
              <em>
                {isFa ? "بدون بحث‌های" : "without endless"}
                <br /> {isFa ? "بی‌پایان." : "debates."}
              </em>
            </h1>
            <p>
              {isFa
                ? "طراحی یک تجربه جمعی، سریع و ناشناس برای پیدا کردن فیلمی که همه واقعاً دوست دارند ببینند."
                : "A fast, anonymous group experience for finding a movie everyone genuinely wants to watch."}
            </p>
            <div className="lv-hero-meta">
              <span>
                {isFa ? "نقش من" : "My role"} <b>{isFa ? "طراح محصول" : "Product Designer"}</b>
              </span>
              <span>
                {isFa ? "خروجی" : "Deliverable"} <b>{isFa ? "وب‌اپلیکیشن واکنش‌گرا" : "Responsive Web App"}</b>
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
                <small>{isFa ? "نظرسنجی آغاز شد!" : "Voting has started!"}</small>
                <strong>{isFa ? "۰۲:۰۰" : "02:00"}</strong>
              </div>
              <div className="lv-qr" aria-label={isFa ? "نماد QR" : "QR symbol"}>
                <i />
                <i />
                <i />
                <b />
              </div>
              <p>{isFa ? "برای پیوستن اسکن کنید" : "Scan to join"}</p>
            </div>
          </Reveal>
        </div>
        <a className="lv-scroll-hint" href="#challenge">
          {isFa ? "اسکرول برای مطالعه" : "Scroll to read"} <span>↓</span>
        </a>
      </section>

      <section className="lv-section" id="challenge">
        <Reveal className="lv-section-head">
          <span className="lv-index">{isFa ? "۰۱" : "01"}</span>
          <div>
            <span className="lv-kicker">{isFa ? "تعریف مسئله" : "Problem definition"}</span>
            <h2>{isFa ? "وقتی گزینه‌ها زیادند، انتخاب سخت‌تر می‌شود." : "More options can make choosing harder."}</h2>
          </div>
        </Reveal>
        <div className="lv-two-col">
          <Reveal className="lv-lead">
            <p>
              {isFa
                ? "در جمع‌های خانوادگی و دوستانه، انتخاب فیلم اغلب با اختلاف سلیقه، رودربایستی و خستگی تصمیم‌گیری همراه است. تعداد زیاد گزینه‌ها هم انتخاب را ساده‌تر نمی‌کند؛ آن را طولانی‌تر می‌کند."
                : "In family and friend groups, choosing a movie often involves conflicting tastes, social pressure, and decision fatigue. More options do not simplify the choice; they make it take longer."}
            </p>
          </Reveal>
          <Reveal className="lv-quote" delay={120}>
            <span>{isFa ? "فرصت طراحی" : "Design opportunity"}</span>
            <blockquote>
              {isFa
                ? "چطور می‌توانیم سلیقه همه را بشنویم، بدون اینکه یک گفت‌وگوی ساده به مذاکره‌ای طولانی تبدیل شود؟"
                : "How might we hear everyone’s preferences without turning a simple conversation into a long negotiation?"}
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="lv-section lv-muted">
        <Reveal className="lv-section-head">
          <span className="lv-index">{isFa ? "۰۲" : "02"}</span>
          <div>
            <span className="lv-kicker">{isFa ? "فرضیات طراحی" : "Design hypotheses"}</span>
            <h2>{isFa ? "شش فرضیه برای شروع مسیر" : "Six hypotheses to start with"}</h2>
          </div>
        </Reveal>
        <div className="lv-card-grid">
          {hypotheses.map(([title, body], index) => (
            <Reveal
              className="lv-info-card"
              delay={(index % 3) * 80}
              key={title}
            >
              <span>{isFa ? `۰${index + 1}` : `0${index + 1}`}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lv-section">
        <Reveal className="lv-section-head">
          <span className="lv-index">{isFa ? "۰۳" : "03"}</span>
          <div>
            <span className="lv-kicker">{isFa ? "پژوهش تجربه کاربری" : "UX research"}</span>
            <h2>{isFa ? "پرسش‌نامه کمّی و ۵۳ تجربه واقعی" : "A quantitative survey and 53 real experiences"}</h2>
          </div>
        </Reveal>
        <Reveal>
          <SurveyCharts />
        </Reveal>
      </section>

      <section className="lv-section lv-muted">
        <Reveal className="lv-section-head">
          <span className="lv-index">{isFa ? "۰۴" : "04"}</span>
          <div>
            <span className="lv-kicker">{isFa ? "بینش‌ها و نقاط درد" : "Insights and pain points"}</span>
            <h2>{isFa ? "آنچه داده‌ها درباره انتخاب جمعی گفتند" : "What the data revealed about group choices"}</h2>
          </div>
        </Reveal>
        <div className="lv-insights">
          <Reveal className="lv-big-insight">
            <strong>{isFa ? "۱" : "1"}</strong>
            <p>{isFa ? "تمرکز زیاد روی سلیقه یک نفر، رضایت جمع را پایین می‌آورد." : "Overweighting one person’s taste reduces group satisfaction."}</p>
          </Reveal>
          <Reveal className="lv-big-insight" delay={80}>
            <strong>{isFa ? "۲" : "2"}</strong>
            <p>{isFa ? "تعداد کم سؤال‌ها، مشارکت و تکمیل فرایند را بیشتر می‌کند." : "Fewer questions improve participation and completion."}</p>
          </Reveal>
          <Reveal className="lv-big-insight" delay={160}>
            <strong>{isFa ? "۳" : "3"}</strong>
            <p>
              {isFa ? "ناشناس‌بودن رأی، پاسخ‌های صادقانه‌تر و تصمیم عادلانه‌تر می‌سازد." : "Anonymous voting produces more honest answers and a fairer decision."}
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
          <span className="lv-index">{isFa ? "۰۵" : "05"}</span>
          <div>
            <span className="lv-kicker">{isFa ? "ایده طراحی" : "Design concept"}</span>
            <h2>{isFa ? "یک تسهیل‌گر دیجیتال برای تماشای جمعی" : "A digital facilitator for watching together"}</h2>
          </div>
        </Reveal>
        <Reveal className="lv-design-statement">
          <p>
            {isFa
              ? "قابلیت تماشای جمعی در Limevee با هدف ساده‌سازی و عادلانه‌کردن انتخاب طراحی شد. میزبان یک Session می‌سازد، دیگران با QR وارد می‌شوند و چند سؤال کوتاه را پاسخ می‌دهند. سیستم در پایان، بدون افشای رأی افراد، فیلم‌هایی با بالاترین امتیاز وزن‌دار را پیشنهاد می‌کند."
              : "Limevee’s group-watching feature was designed to make choosing simpler and fairer. A host creates a session, guests join with a QR code and answer a few short questions, and the system recommends the highest weighted options without exposing individual votes."}
          </p>
          <span>{isFa ? "بدون ثبت‌نام" : "No registration"}</span>
          <span>{isFa ? "بدون رودربایستی" : "No social pressure"}</span>
          <span>{isFa ? "بدون اتلاف وقت" : "No wasted time"}</span>
        </Reveal>
      </section>

      <section className="lv-section lv-flow-section">
        <Reveal className="lv-section-head">
          <span className="lv-index">{isFa ? "۰۶" : "06"}</span>
          <div>
            <span className="lv-kicker">{isFa ? "جریان کاربری" : "User flow"}</span>
            <h2>{isFa ? "از ساخت جمع تا پخش فیلم" : "From creating a group to playing the movie"}</h2>
          </div>
        </Reveal>
        <div className="lv-flow">
          {flow.map((step, index) => (
            <Reveal key={step} className="lv-flow-step" delay={index * 70}>
              <i>{isFa ? (index + 1).toLocaleString("fa-IR") : index + 1}</i>
              <span>{step}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lv-section lv-muted">
        <Reveal className="lv-section-head">
          <span className="lv-index">{isFa ? "۰۷" : "07"}</span>
          <div>
            <span className="lv-kicker">{isFa ? "ویژگی‌های کلیدی" : "Key features"}</span>
            <h2>{isFa ? "اصطکاک کمتر، مشارکت بیشتر" : "Less friction, more participation"}</h2>
          </div>
        </Reveal>
        <div className="lv-card-grid">
          {features.map(([title, body], index) => (
            <Reveal className="lv-feature" delay={(index % 3) * 80} key={title}>
              <span>{isFa ? `۰${index + 1}` : String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="lv-section lv-process">
        <Reveal className="lv-section-head">
          <span className="lv-index">{isFa ? "۰۸" : "08"}</span>
          <div>
            <span className="lv-kicker">{isFa ? "از کاغذ تا محصول" : "From paper to product"}</span>
            <h2>{isFa ? "اسکچ، وایرفریم و رابط نهایی" : "Sketches, wireframes, and final UI"}</h2>
          </div>
        </Reveal>
        <div className="lv-gallery">
          <Reveal className="lv-artifact lv-artifact-wide">
            <img src={sketches} alt={isFa ? "اسکچ‌های اولیه Limevee" : "Early Limevee sketches"} loading="lazy" />
            <span>{isFa ? "۰۱ · اسکچ‌ها" : "01 · Sketches"}</span>
          </Reveal>
          <Reveal className="lv-artifact">
            <img
              src={wireframesA}
              alt={isFa ? "اسکچ و وایرفریم‌های اولیه" : "Early sketches and wireframes"}
              loading="lazy"
            />
            <span>{isFa ? "۰۲ · وایرفریم‌های اولیه" : "02 · Low-fi wireframes"}</span>
          </Reveal>
          <Reveal className="lv-artifact">
            <img
              src={wireframesB}
              alt={isFa ? "وایرفریم‌ها و رابط کاربری Limevee" : "Limevee wireframes and UI"}
              loading="lazy"
            />
            <span>{isFa ? "۰۳ · وایرفریم‌ها" : "03 · Wireframes"}</span>
          </Reveal>
          <Reveal className="lv-artifact lv-artifact-wide lv-final-art">
            <img
              src={finalUi}
              alt={isFa ? "رابط نهایی تماشای جمعی Limevee" : "Final Limevee group-watching UI"}
              loading="lazy"
            />
            <span>{isFa ? "۰۴ · رابط نهایی" : "04 · Final UI"}</span>
          </Reveal>
        </div>
      </section>

      <div className="lv-site-footer-wrap">
        <Footer />
      </div>
    </main>
  );
}
