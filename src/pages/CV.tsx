import { useEffect, useState } from "react";
import { Link } from "@heroui/react/link";
import { DocumentDownload } from "iconsax-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import Certifications from "../components/Certifications";
import "./CV.css";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";

const experiencesEn = [
  {
    company: "Hesabo",
    location: "Tehran",
    role: "Product Designer",
    date: "Jul 2022 — Present",
    duration: "3 yrs 5 mos",
    intro:
      "Hesabo is a fintech platform that enables employees to access their earned salaries daily.",
    work: [
      "Designed and developed a comprehensive design system, ensuring consistency and efficiency across products.",
      "Conducted usability testing, A/B testing, and user research, improving retention and engagement.",
      "Led redesign and rebranding efforts, significantly enhancing product usability and aesthetics.",
      "Collaborated with engineering, business, and product teams to align design goals with business objectives.",
    ],
    achievements: [
      "Increased user engagement by 35% through a complete UI/UX redesign and usability improvements.",
      "Reduced salary withdrawal time by 40% by streamlining user flows and navigation.",
      "Developed a customized design system, reducing front-end development time by 40%.",
    ],
  },
  {
    company: "Asanito",
    location: "Tehran",
    role: "UI/UX Designer",
    date: "Jul 2022 — Apr 2023",
    duration: "10 mos",
    intro:
      "Designed and improved user experiences for enterprise SaaS platforms, creating high-fidelity prototypes and refining usability through iterative design processes.",
    work: [
      "Conducted UX research and prototyping, improving customer onboarding and feature adoption.",
    ],
    achievements: [
      "Redesigned data visualization, enabling 25% faster data interpretation with 30% fewer user errors.",
    ],
  },
  {
    company: "Freelance Product Designer",
    location: "Remote",
    role: "UI/UX Designer",
    date: "Nov 2021 — Jul 2022",
    duration: "9 mos",
    intro:
      "Worked across fintech, e-commerce, and SaaS products, collaborating with diverse teams to create intuitive and high-impact digital experiences.",
    work: [],
    achievements: [
      "Improved usability across multiple platforms, refining navigation and interaction flows.",
      "Redesigned and updated UI to align products with modern design standards.",
    ],
  },
  {
    company: "Jabama",
    location: "Tehran",
    role: "Employee Experience Designer (EXD)",
    date: "Feb 2021 — Nov 2021",
    duration: "10 mos",
    intro:
      "Focused on improving the overall employee experience through UCD, research, and digital solutions—identifying pain points, optimizing internal tools, and improving engagement.",
    work: [],
    achievements: [
      "Redesigned internal tools, streamlining HR processes and boosting efficiency.",
      "Improved onboarding with interactive guides for new hires.",
      "Optimized internal communication and information flow.",
      "Increased employee satisfaction by 40% by resolving key pain points.",
    ],
  },
];

const skillGroupsEn = [
  [
    "Product Design & UX Research",
    [
      "User Research",
      "Wireframing",
      "Prototyping",
      "User Flows",
      "Usability Testing",
      "A/B Testing",
      "UX Writing",
      "Accessibility",
    ],
  ],
  [
    "Design Systems & UI Development",
    [
      "Design Systems",
      "Auto Layout",
      "Component Libraries",
      "Tokens",
      "Variables",
    ],
  ],
  [
    "Tools & Technologies",
    [
      "Figma",
      "Sketch",
      "Zeplin",
      "Adobe XD",
      "FigJam",
      "Miro",
      "Jira",
      "Clarity",
      "Hotjar",
    ],
  ],
];

const projectsEn = [
  ["Charisma Crowd", "Crowdfunding platform optimized for user engagement."],
  ["Nazari Cake", "E-commerce experience for an online cake business."],
  ["Sarmo Store", "Storefront with an improved checkout experience."],
  ["Qursat", "Medication management and prescription tracking app."],
  ["Tadatoon", "AI-powered storytelling platform for children."],
  ["Voices to Action", "Campaign-based advocacy application."],
];

const experiencesFa = [
  {
    company: "حسابو",
    location: "تهران",
    role: "طراح محصول",
    date: "تیر ۱۴۰۱ — اکنون",
    duration: "",
    intro:
      "حسابو یک پلتفرم فین‌تک است که دسترسی روزانه کارکنان به حقوق کسب‌شده‌شان را فراهم می‌کند.",
    work: [
      "طراحی و توسعه یک دیزاین سیستم جامع برای افزایش هماهنگی و سرعت در محصولات.",
      "اجرای تست کاربردپذیری، A/B تست و تحقیق کاربر برای بهبود ماندگاری و تعامل.",
      "رهبری بازطراحی و ری‌برندینگ با هدف بهبود کاربردپذیری و کیفیت بصری محصول.",
      "همکاری نزدیک با تیم‌های مهندسی، کسب‌وکار و محصول برای هم‌راستایی اهداف طراحی.",
    ],
    achievements: [
      "افزایش ۳۵٪ تعامل کاربران با بازطراحی کامل UI/UX و بهبود کاربردپذیری.",
      "کاهش ۴۰٪ زمان برداشت حقوق با ساده‌سازی جریان‌ها و ناوبری.",
      "کاهش ۴۰٪ زمان توسعه فرانت‌اند با ساخت دیزاین سیستم اختصاصی.",
    ],
  },
  {
    company: "آسانیتو",
    location: "تهران",
    role: "طراح UI/UX",
    date: "تیر ۱۴۰۱ — فروردین ۱۴۰۲",
    duration: "۱۰ ماه",
    intro:
      "طراحی و بهبود تجربه محصولات سازمانی SaaS با پروتوتایپ‌های دقیق و تکرار راه‌حل‌ها بر اساس ارزیابی کاربردپذیری.",
    work: [
      "تحقیق تجربه کاربری و پروتوتایپ برای بهبود ورود مشتری و استفاده از قابلیت‌ها.",
    ],
    achievements: [
      "بازطراحی نمایش داده‌ها برای درک ۲۵٪ سریع‌تر اطلاعات و کاهش ۳۰٪ خطاهای کاربران.",
    ],
  },
  {
    company: "طراح محصول فریلنسر",
    location: "دورکاری",
    role: "طراح UI/UX",
    date: "آبان ۱۴۰۰ — تیر ۱۴۰۱",
    duration: "۹ ماه",
    intro:
      "همکاری با تیم‌های مختلف در محصولات فین‌تک، تجارت الکترونیک و SaaS برای ساخت تجربه‌های ساده و اثرگذار.",
    work: [],
    achievements: [
      "بهبود کاربردپذیری چند پلتفرم با اصلاح ناوبری و جریان‌های تعامل.",
      "بازطراحی رابط‌ها برای هماهنگی با استانداردهای جدید طراحی محصول.",
    ],
  },
  {
    company: "جاباما",
    location: "تهران",
    role: "طراح تجربه کارکنان (EXD)",
    date: "بهمن ۱۳۹۹ — آبان ۱۴۰۰",
    duration: "۱۰ ماه",
    intro:
      "تمرکز بر بهبود تجربه کارکنان با طراحی کاربرمحور، تحقیق و راه‌حل‌های دیجیتال؛ از شناسایی نقاط درد تا بهینه‌سازی ابزارهای داخلی.",
    work: [],
    achievements: [
      "بازطراحی ابزارهای داخلی و ساده‌سازی فرایندهای منابع انسانی.",
      "بهبود آنبوردینگ با راهنماهای تعاملی برای نیروهای جدید.",
      "بهینه‌سازی ارتباطات داخلی و جریان اطلاعات.",
      "افزایش ۴۰٪ رضایت کارکنان با حل نقاط درد کلیدی.",
    ],
  },
];

const skillGroupsFa = [
  [
    "طراحی محصول و تحقیق تجربه کاربری",
    ["تحقیق کاربر", "وایرفریم", "پروتوتایپ", "جریان کاربر", "تست کاربردپذیری", "A/B تست", "UX Writing", "دسترس‌پذیری"],
  ],
  [
    "دیزاین سیستم و توسعه رابط",
    ["دیزاین سیستم", "Auto Layout", "کتابخانه کامپوننت", "توکن‌ها", "متغیرها"],
  ],
  [
    "ابزارها و فناوری‌ها",
    ["Figma", "Sketch", "Zeplin", "Adobe XD", "FigJam", "Miro", "Jira", "Clarity", "Hotjar"],
  ],
];

const projectsFa = [
  ["کاریزما کراد", "پلتفرم تأمین مالی جمعی با تمرکز بر تعامل کاربران."],
  ["کیک نظری", "تجربه تجارت الکترونیک برای یک کسب‌وکار آنلاین کیک."],
  ["فروشگاه سارمو", "فروشگاه آنلاین با فرایند خرید بهینه‌شده."],
  ["قرصات", "اپلیکیشن مدیریت دارو و پیگیری نسخه."],
  ["تاداتون", "پلتفرم داستان‌گویی کودک با کمک هوش مصنوعی."],
  ["Voices to Action", "اپلیکیشن کنشگری مبتنی بر کمپین."],
];

const DESIGN_CAREER_START_YEAR = 2021;
const HESABO_START_YEAR = 2022;
const HESABO_START_MONTH = 6; // July (JavaScript months are zero-based)

const getDurationSince = (startYear: number, startMonth: number, isFa = false) => {
  const now = new Date();
  const totalMonths = Math.max(
    0,
    (now.getFullYear() - startYear) * 12 + (now.getMonth() - startMonth),
  );
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return isFa
    ? `${years.toLocaleString("fa-IR")} سال و ${months.toLocaleString("fa-IR")} ماه`
    : `${years} ${years === 1 ? "yr" : "yrs"} ${months} ${months === 1 ? "mo" : "mos"}`;
};

export default function CV() {
  const { isFa, direction } = useLanguage();
  const experiences = isFa ? experiencesFa : experiencesEn;
  const skillGroups = isFa ? skillGroupsFa : skillGroupsEn;
  const projects = isFa ? projectsFa : projectsEn;
  const [progress, setProgress] = useState(0);
  const yearsOfExperience = new Date().getFullYear() - DESIGN_CAREER_START_YEAR;
  const hesaboDuration = getDurationSince(
    HESABO_START_YEAR,
    HESABO_START_MONTH,
    isFa,
  );

  useEffect(() => {
    const updateProgress = () => {
      const available =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? (window.scrollY / available) * 100 : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <main className="cv-page" dir={direction}>
      <SEO
        title={isFa ? "رزومه فؤاد مقدسی | طراح محصول و UI/UX" : "Foad Moghaddasi Resume | Product & UI/UX Designer"}
        description={
          isFa
            ? "رزومه فؤاد مقدسی، طراح محصول و UI/UX در تهران؛ تجربه کاری، مهارت‌های طراحی محصول، تحقیق کاربر، Figma و دیزاین سیستم."
            : "Resume of Foad Moghaddasi, Product and UI/UX Designer in Tehran, covering product design, user research, Figma, design systems, and professional experience."
        }
        path={isFa ? "/cv?lang=fa" : "/cv"}
        locale={isFa ? "fa_IR" : "en_US"}
      />
      <Navbar />
      <div className="cv-reading-progress" style={{ width: `${progress}%` }} />

      <section className="cv-hero">
        <div className="cv-hero-glow" aria-hidden="true" />
        <div className="cv-shell cv-hero-grid">
          <Reveal className="cv-hero-copy">
            <span className="cv-overline">
              {isFa ? "طراح محصول · تهران، ایران" : "Product Designer · Tehran, Iran"}
            </span>
            <h1>
              {isFa ? "فؤاد" : "Foad"}
              <br />
              {isFa ? "مقدسی" : "Moghaddasi"}
            </h1>
            <p>
              {isFa
                ? `طراح محصول با ${yearsOfExperience.toLocaleString("fa-IR")} سال تجربه در UI/UX، توسعه محصولات دیجیتال و دیزاین سیستم. مسئله‌های پیچیده محصول را به تجربه‌هایی ساده و قابل‌فهم تبدیل می‌کنم.`
                : `Product Designer with ${yearsOfExperience} years of experience in UI/UX, digital product development, and design systems. I turn complex product problems into seamless, intuitive experiences.`}
            </p>
            <div className="cv-actions">
              <a
                href="/FoadMoghaddasi-CV.pdf"
                download="FoadMoghaddasi-CV.pdf"
                className="cv-download-button"
              >
                {isFa ? "دانلود PDF" : "Download PDF"}
                <DocumentDownload
                  size="22"
                  color="currentColor"
                  variant="Broken"
                />
              </a>
              <Link
                href="mailto:moghadasi.foad@gmail.com"
                className="cv-contact-link"
              >
                {isFa ? "بیایید همکاری کنیم ↗" : "Let’s work together ↗"}
              </Link>
            </div>
          </Reveal>
          <Reveal className="cv-stat-grid" delay={120}>
            <div>
              <strong>{isFa ? yearsOfExperience.toLocaleString("fa-IR") : yearsOfExperience}+</strong>
              <span>{isFa ? "سال تجربه" : "Years of experience"}</span>
            </div>
            <div>
              <strong>10+</strong>
              <span>{isFa ? "محصول منتشرشده" : "Products shipped"}</span>
            </div>
            <div>
              <strong>35%</strong>
              <span>{isFa ? "رشد تعامل" : "Engagement growth"}</span>
            </div>
            <div>
              <strong>40%</strong>
              <span>{isFa ? "جریان‌های کلیدی سریع‌تر" : "Faster key flows"}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="cv-shell cv-content">
        <section
          className="cv-main-column"
          aria-labelledby="experience-heading"
        >
          <Reveal className="cv-section-heading">
            <span>01</span>
            <div>
              <small>{isFa ? "مسیر حرفه‌ای" : "Career timeline"}</small>
              <h2 id="experience-heading">{isFa ? "تجربه کاری" : "Experience"}</h2>
            </div>
          </Reveal>
          <div className="cv-timeline">
            {experiences.map((experience, index) => (
              <Reveal
                className="cv-job"
                delay={(index % 2) * 70}
                key={`${experience.company}-${experience.role}`}
              >
                <i aria-hidden="true" />
                <div className="cv-job-top">
                  <div>
                    <span>
                      {experience.company} · {experience.location}
                    </span>
                    <h3>{experience.role}</h3>
                  </div>
                  <p>
                    {experience.date}
                    <small>
                      {index === 0
                        ? hesaboDuration
                        : experience.duration}
                    </small>
                  </p>
                </div>
                <p className="cv-job-intro">{experience.intro}</p>
                {experience.work.length > 0 && (
                  <ul>
                    {experience.work.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                <div className="cv-achievements">
                  <strong>{isFa ? "دستاوردهای منتخب" : "Selected impact"}</strong>
                  <ul>
                    {experience.achievements.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <aside className="cv-sidebar">
          <Reveal className="cv-side-card cv-contact-card">
            <small>{isFa ? "تماس" : "Contact"}</small>
            <h2>{isFa ? "گفت‌وگو را شروع کنیم." : "Start a conversation."}</h2>
            <Link href="tel:+989192463569">+98 919 246 3569</Link>
            <Link href="mailto:moghadasi.foad@gmail.com">
              moghadasi.foad@gmail.com
            </Link>
            <Link
              href="https://www.linkedin.com/in/foadmoghaddasi"
              target="_blank"
            >
              {isFa ? "لینکدین ↗" : "LinkedIn ↗"}
            </Link>
          </Reveal>

          <Reveal className="cv-side-card" delay={70}>
            <small>{isFa ? "تحصیلات" : "Education"}</small>
            <div className="cv-education">
              <strong>{isFa ? "کارشناسی ارشد طراحی صنعتی" : "Master’s Degree in Industrial Design"}</strong>
              <span>{isFa ? "در حال تحصیل · دانشگاه آزاد تهران مرکز" : "In progress · Azad University, Central Tehran"}</span>
            </div>
            <div className="cv-education">
              <strong>{isFa ? "کارشناسی طراحی صنعتی" : "Bachelor’s Degree in Industrial Design"}</strong>
              <span>{isFa ? "دانشگاه آزاد تهران جنوب" : "Azad University, Tehran South"}</span>
            </div>
          </Reveal>

          <Reveal className="cv-side-card" delay={100}>
            <small>{isFa ? "مهارت‌ها و ابزارها" : "Skills & Tools"}</small>
            {skillGroups.map(([title, skills]) => (
              <div className="cv-skill-group" key={title as string}>
                <strong>{title}</strong>
                <div>
                  {(skills as string[]).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </aside>
      </div>

      <Certifications context="cv" />

      <section className="cv-projects-section">
        <div className="cv-shell">
          <Reveal className="cv-section-heading">
            <span>02</span>
            <div>
              <small>{isFa ? "کارهای منتخب" : "Selected work"}</small>
              <h2>{isFa ? "پروژه‌ها" : "Projects"}</h2>
              <p className="cv-section-description">
                {isFa ? "منتخبی از پروژه‌هایی که روی آن‌ها کار کرده‌ام." : "A selection of projects I’ve worked on."}
              </p>
            </div>
          </Reveal>
          <div className="cv-project-grid">
            {projects.map(([name, description], index) => (
              <Reveal
                className="cv-project-card"
                delay={(index % 3) * 60}
                key={name}
              >
                <span>
                  {isFa
                    ? `۰${index + 1}`.replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])
                    : `0${index + 1}`}
                </span>
                <h3>{name}</h3>
                <p>{description}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="cv-portfolio-cta">
            <div>
              <small>{isFa ? "پورتفولیو و کیس‌استادی‌ها" : "Portfolio & Case Studies"}</small>
              <h2>{isFa ? "فرایند شکل‌گرفتن پروژه‌ها را ببینید." : "See how the work comes together."}</h2>
            </div>
            <Link href="/#case-studies">
              {isFa ? "مشاهده کیس‌استادی‌ها ←" : "Explore case studies →"}
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="cv-footer-wrap">
        <Footer />
      </div>
    </main>
  );
}
