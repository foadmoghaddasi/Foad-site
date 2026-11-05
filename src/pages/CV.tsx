import { useEffect, useState } from "react";
import { Link } from "@heroui/react/link";
import { DocumentDownload } from "iconsax-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import "./CV.css";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";
import { RESUME_DOWNLOAD_NAME, RESUME_URL } from "../utils/resume";

type Experience = {
  company: string;
  location: string;
  role: string;
  date: string;
  duration?: string;
  startDate?: [number, number];
  intro: string;
  work: string[];
  achievements: string[];
};

const experiencesEn: Experience[] = [
  {
    company: "Hesabo",
    location: "Tehran",
    role: "Product Designer",
    date: "Jul 2022 — Present",
    startDate: [2022, 6],
    intro: "Hesabo is an Earned Wage Access (EWA) platform that lets employees access earned wages before payday. I design end-to-end experiences and information architecture for KYC, bank card applications and issuance, subscription plans, and employer/admin platforms, working closely with developers, product managers, business stakeholders, and other teams.",
    work: [
      "Designed and developed a comprehensive design system, ensuring consistency and efficiency across products.",
      "Conducted usability testing, A/B testing, and user research, leading to improved user retention and engagement.",
      "Led redesign and rebranding efforts, significantly enhancing product usability and aesthetics.",
      "Collaborated with engineering, business, and product teams to align design goals with business objectives."
    ],
    achievements: [
      "Increased user engagement by 35% through a complete UI/UX redesign and usability improvements, optimizing the salary withdrawal process.",
      "Shortened the salary withdrawal process by 25% by streamlining user flows and implementing a more efficient navigation system based on user behavior analysis.",
      "Developed a customized design system, reducing front-end development time and ensuring consistent UI across all platforms.",
      "Increased subscription purchases by redesigning plan cards to highlight savings and benefits more clearly, based on user research and beta feedback."
    ]
  },
  {
    company: "Sarmo Style",
    location: "Remote",
    role: "Product Design Consultant",
    date: "Apr 2023 — Present",
    startDate: [2023, 3],
    intro: "Provide ongoing e-commerce UX consulting for a retailer specializing in scarves and hijabs.",
    work: [],
    achievements: [
      "Style the Look: Designed complementary product recommendations in the add-to-cart flow, resulting in a 15% increase in completed purchases.",
      "Product Discovery: Improved product browsing through category-based navigation, helping customers discover products faster and reducing reliance on search."
    ]
  },
  {
    company: "Asanito",
    location: "Tehran",
    role: "UI/UX Designer",
    date: "Jul 2022 — Apr 2023",
    duration: "10 mos",
    intro: "Designed and improved user experiences for an enterprise CRM platform.",
    work: [
      "Created high-fidelity UI prototypes and refined usability through iterative design processes.",
      "Conducted UX research and prototyping, improving customer onboarding and feature adoption."
    ],
    achievements: [
      "Designed an in-app calling system to simplify customer follow-ups.",
      "Designed a form builder that lets clients create and customize forms for internal processes."
    ]
  },
  {
    company: "Freelance Product Designer",
    location: "Remote",
    role: "UI/UX Designer",
    date: "Nov 2021 — Jul 2022",
    duration: "9 mos",
    intro: "Worked as a UI/UX Designer on multiple freelance projects across fintech, e-commerce, and SaaS platforms, collaborating with diverse teams to create intuitive and high-impact digital experiences.",
    work: [],
    achievements: [
      "Improved usability across multiple platforms, refining navigation and interaction flows for a smoother user experience.",
      "Redesigned and updated UI to enhance user experience and align with modern design standards."
    ]
  },
  {
    company: "Jabama",
    location: "Tehran",
    role: "Employee Experience Designer (EXD)",
    date: "Feb 2021 — Nov 2021",
    duration: "10 mos",
    intro: "At Jabama, I worked as an Employee Experience Designer (EXD), focusing on improving the overall employee experience through user-centered design (UCD), research, and digital solutions. My role involved identifying pain points, optimizing internal tools, and enhancing engagement within the organization.",
    work: [],
    achievements: [
      "Redesigned internal tools, streamlining HR processes and boosting efficiency.",
      "Improved onboarding, helping new hires adapt faster with interactive guides.",
      "Optimized internal communication, enhancing information flow and engagement.",
      "Increased employee satisfaction by resolving key pain points.",
      "Boosted retention and loyalty through better onboarding and workplace tools."
    ]
  }
];

const experiencesFa: Experience[] = [
  {
    company: "حسابو",
    location: "تهران",
    role: "طراح محصول",
    date: "تیر ۱۴۰۱ — اکنون",
    startDate: [2022, 6],
    intro: "حسابو یک پلتفرم دسترسی به حقوق کسب‌شده (EWA) است که به کارکنان امکان می‌دهد پیش از روز پرداخت، به حقوق خود دسترسی داشته باشند. طراحی تجربه‌های سرتاسری و معماری اطلاعات برای احراز هویت، درخواست و صدور کارت بانکی، طرح‌های اشتراک و پلتفرم‌های کارفرمایی و مدیریتی را با همکاری توسعه‌دهندگان، مدیران محصول، ذی‌نفعان کسب‌وکار و سایر تیم‌ها انجام می‌دهم.",
    work: [
      "طراحی و توسعه یک دیزاین سیستم جامع برای افزایش هماهنگی و کارایی در محصولات.",
      "اجرای تست کاربردپذیری، A/B تست و تحقیق کاربر برای بهبود ماندگاری و تعامل کاربران.",
      "رهبری بازطراحی و ری‌برندینگ برای بهبود کاربردپذیری و کیفیت بصری محصول.",
      "همکاری با تیم‌های مهندسی، کسب‌وکار و محصول برای هم‌راستایی اهداف طراحی با اهداف کسب‌وکار."
    ],
    achievements: [
      "افزایش ۳۵٪ تعامل کاربران با بازطراحی کامل UI/UX، بهبود کاربردپذیری و بهینه‌سازی فرایند برداشت حقوق.",
      "کوتاه‌کردن فرایند برداشت حقوق به میزان ۲۵٪ با ساده‌سازی جریان‌ها و طراحی ناوبری کارآمدتر بر اساس تحلیل رفتار کاربران.",
      "توسعه دیزاین سیستم اختصاصی برای کاهش زمان توسعه فرانت‌اند و هماهنگی رابط کاربری در تمام پلتفرم‌ها.",
      "افزایش خرید اشتراک با بازطراحی کارت‌های پلن برای نمایش روشن‌تر صرفه‌جویی و مزایا، بر اساس تحقیق کاربر و بازخورد نسخه بتا."
    ]
  },
  {
    company: "سارمو استایل",
    location: "دورکاری",
    role: "مشاور طراحی محصول",
    date: "فروردین ۱۴۰۲ — اکنون",
    startDate: [2023, 3],
    intro: "ارائه مشاوره مستمر تجربه کاربری تجارت الکترونیک به فروشگاهی تخصصی در حوزه شال و حجاب.",
    work: [],
    achievements: [
      "Style the Look: طراحی پیشنهاد محصولات مکمل در جریان افزودن به سبد خرید که باعث افزایش ۱۵٪ خریدهای تکمیل‌شده شد.",
      "کشف محصول: بهبود مرور محصولات با ناوبری مبتنی بر دسته‌بندی برای کشف سریع‌تر محصولات و کاهش وابستگی به جست‌وجو."
    ]
  },
  {
    company: "آسانیتو",
    location: "تهران",
    role: "طراح UI/UX",
    date: "تیر ۱۴۰۱ — فروردین ۱۴۰۲",
    duration: "۱۰ ماه",
    intro: "طراحی و بهبود تجربه کاربری یک پلتفرم سازمانی مدیریت ارتباط با مشتری (CRM).",
    work: [
      "ساخت پروتوتایپ‌های دقیق رابط کاربری و بهبود کاربردپذیری با فرایند طراحی تکرارشونده.",
      "تحقیق تجربه کاربری و پروتوتایپ برای بهبود ورود مشتری و استفاده از قابلیت‌ها."
    ],
    achievements: [
      "طراحی سیستم تماس درون‌برنامه‌ای برای ساده‌سازی پیگیری مشتریان.",
      "طراحی فرم‌ساز برای ساخت و شخصی‌سازی فرم‌های فرایندهای داخلی توسط مشتریان."
    ]
  },
  {
    company: "طراح محصول فریلنسر",
    location: "دورکاری",
    role: "طراح UI/UX",
    date: "آبان ۱۴۰۰ — تیر ۱۴۰۱",
    duration: "۹ ماه",
    intro: "همکاری به‌عنوان طراح UI/UX در پروژه‌های فریلنسری فین‌تک، تجارت الکترونیک و SaaS با تیم‌های مختلف برای ساخت تجربه‌های ساده و اثرگذار.",
    work: [],
    achievements: [
      "بهبود کاربردپذیری چند پلتفرم با اصلاح ناوبری و جریان‌های تعامل برای تجربه‌ای روان‌تر.",
      "بازطراحی و به‌روزرسانی رابط‌ها برای بهبود تجربه کاربری و هماهنگی با استانداردهای جدید طراحی."
    ]
  },
  {
    company: "جاباما",
    location: "تهران",
    role: "طراح تجربه کارکنان (EXD)",
    date: "بهمن ۱۳۹۹ — آبان ۱۴۰۰",
    duration: "۱۰ ماه",
    intro: "تمرکز بر بهبود تجربه کارکنان با طراحی کاربرمحور، تحقیق و راه‌حل‌های دیجیتال؛ از شناسایی نقاط درد تا بهینه‌سازی ابزارهای داخلی و افزایش تعامل در سازمان.",
    work: [],
    achievements: [
      "بازطراحی ابزارهای داخلی و ساده‌سازی فرایندهای منابع انسانی برای افزایش کارایی.",
      "بهبود آنبوردینگ با راهنماهای تعاملی برای سازگاری سریع‌تر نیروهای جدید.",
      "بهینه‌سازی ارتباطات داخلی برای بهبود جریان اطلاعات و تعامل.",
      "افزایش رضایت کارکنان با برطرف‌کردن نقاط درد کلیدی.",
      "افزایش ماندگاری و وفاداری کارکنان با بهبود آنبوردینگ و ابزارهای محیط کار."
    ]
  }
];

const skillGroupsEn: [string, string[]][] = [
  [
    "Product Design & UX Research",
    [
      "User Research",
      "Wireframing",
      "Prototyping",
      "User Flows",
      "Usability Testing",
      "A/B Testing",
      "Data-Driven Design",
      "UX Writing",
      "Accessibility Design"
    ]
  ],
  [
    "Design Systems & UI Development",
    [
      "Design Systems Creation & Management",
      "Figma Auto Layout",
      "Component Libraries",
      "Tokens & Variables"
    ]
  ],
  [
    "Tools & Technologies",
    [
      "Figma",
      "Sketch",
      "Adobe XD",
      "FigJam",
      "Miro",
      "Jira",
      "Clarity",
      "Google Analytics"
    ]
  ]
];

const skillGroupsFa: [string, string[]][] = [
  [
    "طراحی محصول و تحقیق تجربه کاربری",
    [
      "تحقیق کاربر",
      "وایرفریم",
      "پروتوتایپ",
      "جریان کاربر",
      "تست کاربردپذیری",
      "A/B تست",
      "طراحی داده‌محور",
      "UX Writing",
      "طراحی دسترس‌پذیر"
    ]
  ],
  [
    "دیزاین سیستم و توسعه رابط",
    [
      "ساخت و مدیریت دیزاین سیستم",
      "Figma Auto Layout",
      "کتابخانه کامپوننت",
      "توکن‌ها و متغیرها"
    ]
  ],
  [
    "ابزارها و فناوری‌ها",
    [
      "Figma",
      "Sketch",
      "Adobe XD",
      "FigJam",
      "Miro",
      "Jira",
      "Clarity",
      "Google Analytics"
    ]
  ]
];

const projectsEn = [
  [
    "Charisma Crowd",
    "Created a crowdfunding platform to optimize user engagement."
  ],
  [
    "Nazari Cake",
    "Created an e-commerce platform for an online cake business."
  ],
  [
    "Sarmo Store",
    "Developed an e-commerce website with an improved checkout experience."
  ],
  [
    "Qursat",
    "Designed a medication management app for better prescription tracking."
  ],
  [
    "Tadatoon",
    "Designing a user-generated content platform to educate children aged 5 to 12 through AI-powered storytelling."
  ],
  [
    "Voices to Action",
    "Designed a campaign-based app for advocacy engagement."
  ]
];

const projectsFa = [
  [
    "کاریزما کراد",
    "ساخت پلتفرم تأمین مالی جمعی با هدف بهینه‌سازی تعامل کاربران."
  ],
  [
    "کیک نظری",
    "ساخت پلتفرم تجارت الکترونیک برای یک کسب‌وکار آنلاین کیک."
  ],
  [
    "فروشگاه سارمو",
    "توسعه وب‌سایت تجارت الکترونیک با تجربه پرداخت بهبودیافته."
  ],
  [
    "قرصات",
    "طراحی اپلیکیشن مدیریت دارو برای پیگیری بهتر نسخه‌ها."
  ],
  [
    "تاداتون",
    "طراحی پلتفرم محتوای کاربرساخته برای آموزش کودکان ۵ تا ۱۲ سال با داستان‌گویی مبتنی بر هوش مصنوعی."
  ],
  [
    "Voices to Action",
    "طراحی اپلیکیشن مبتنی بر کمپین برای مشارکت در کنشگری."
  ]
];

const aiCapabilitiesEn = [
  {
    number: "01",
    title: "AI Agents",
    description: "Set up agents with clear instructions, design guidelines, and project requirements."
  },
  {
    number: "02",
    title: "Design Workflow",
    description: "Use AI for UX writing, research, ideation, and visual design."
  },
  {
    number: "03",
    title: "Quality Control",
    description: "Review and refine AI outputs to meet design standards and project goals."
  }
];

const aiCapabilitiesFa = [
  {
    number: "۰۱",
    title: "ایجنت‌های هوش مصنوعی",
    description: "راه‌اندازی ایجنت‌ها با دستورهای روشن، راهنماهای طراحی و الزامات پروژه."
  },
  {
    number: "۰۲",
    title: "فرایند طراحی",
    description: "استفاده از هوش مصنوعی برای UX Writing، تحقیق، ایده‌پردازی و طراحی بصری."
  },
  {
    number: "۰۳",
    title: "کنترل کیفیت",
    description: "بازبینی و اصلاح خروجی‌های هوش مصنوعی برای هماهنگی با استانداردهای طراحی و اهداف پروژه."
  }
];

const DESIGN_CAREER_START_YEAR = 2021;

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
  const aiCapabilities = isFa ? aiCapabilitiesFa : aiCapabilitiesEn;
  const [progress, setProgress] = useState(0);
  const yearsOfExperience = new Date().getFullYear() - DESIGN_CAREER_START_YEAR;

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
            ? "رزومه فؤاد مقدسی، طراح محصول و UI/UX در تهران؛ تجربه طراحی محصول، تحقیق کاربر، Figma، دیزاین سیستم و ساخت محصول با هوش مصنوعی."
            : "Resume of Foad Moghaddasi, Product and UI/UX Designer in Tehran, covering product design, user research, Figma, design systems, and AI-powered product building."
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
                ? `طراح محصول با ${yearsOfExperience.toLocaleString("fa-IR")} سال تجربه در UI/UX، توسعه محصولات دیجیتال و دیزاین سیستم. مسلط به طراحی کاربرمحور (UCD)، تفکر طراحی و راهبردهای داده‌محور؛ با تجربه همکاری با تیم‌های توسعه برای ساخت تجربه‌هایی روان، ساده و اثرگذار.`
                : `Product Designer with ${yearsOfExperience} years of experience in UI/UX, digital product development, and design systems. Skilled in User-Centered Design (UCD), Design Thinking, and data-driven strategies. Adept at collaborating with development teams to create seamless, intuitive, and high-impact user experiences.`}
            </p>
            <div className="cv-actions">
              <a
                href={RESUME_URL}
                download={RESUME_DOWNLOAD_NAME}
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
              <span>{isFa ? "پروژه" : "Projects"}</span>
            </div>
            <div>
              <strong>35%</strong>
              <span>{isFa ? "رشد تعامل" : "Engagement growth"}</span>
            </div>
            <div>
              <strong>25%</strong>
              <span>{isFa ? "فرایند برداشت کوتاه‌تر" : "Shorter withdrawal process"}</span>
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
                      {experience.startDate
                        ? getDurationSince(...experience.startDate, isFa)
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
              <span>{isFa ? "در حال تحصیل · دانشگاه آزاد، واحد تهران مرکز" : "In progress · Azad University, Central Tehran Branch"}</span>
            </div>
            <div className="cv-education">
              <strong>{isFa ? "کارشناسی طراحی صنعتی" : "Bachelor’s Degree in Industrial Design"}</strong>
              <span>{isFa ? "دانشگاه آزاد، واحد تهران جنوب" : "Azad University, Tehran South Branch"}</span>
            </div>
          </Reveal>

          <Reveal className="cv-side-card" delay={100}>
            <small>{isFa ? "مهارت‌ها و ابزارها" : "Skills & Tools"}</small>
            {skillGroups.map(([title, skills]) => (
              <div className="cv-skill-group" key={title}>
                <strong>{title}</strong>
                <div>
                  {skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </aside>
      </div>

      <section className="cv-ai-section" aria-labelledby="ai-heading">
        <div className="cv-ai-orb cv-ai-orb-one" aria-hidden="true" />
        <div className="cv-ai-orb cv-ai-orb-two" aria-hidden="true" />
        <div className="cv-shell cv-ai-layout">
          <Reveal className="cv-ai-intro">
            <div className="cv-section-heading">
              <span>02</span>
              <div>
                <small>{isFa ? "طراحی × هوش مصنوعی" : "Design × artificial intelligence"}</small>
                <h2 id="ai-heading">{isFa ? "هوش مصنوعی در طراحی" : "AI in Design"}</h2>
              </div>
            </div>
            <p>
              {isFa
                ? "استفاده از هوش مصنوعی در فرایند طراحی، از تنظیم ایجنت‌ها و ایده‌پردازی تا بازبینی خروجی‌ها بر اساس استانداردهای طراحی و اهداف پروژه."
                : "I use AI throughout the design workflow, from setting up agents and exploring ideas to reviewing outputs against design standards and project goals."}
            </p>
          </Reveal>

          <div className="cv-ai-capability-grid">
            {aiCapabilities.map((capability, index) => (
              <Reveal
                className="cv-ai-capability"
                delay={index * 70}
                key={capability.title}
              >
                <span>{capability.number}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cv-projects-section">
        <div className="cv-shell">
          <Reveal className="cv-section-heading">
            <span>03</span>
            <div>
              <small>{isFa ? "کارهای منتخب" : "Selected work"}</small>
              <h2>{isFa ? "پروژه‌ها" : "Projects"}</h2>
              <p className="cv-section-description">
                {isFa ? "تجربه کار روی بیش از ۱۰ پروژه در حوزه فین‌تک، تجارت الکترونیک، سلامت و پلتفرم‌های اجتماعی؛ در ادامه چند نمونه آمده است." : "I have worked on 10+ projects across fintech, e-commerce, healthcare, and social platforms. Here are some notable ones."}
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
          <p className="cv-project-note">
            {isFa
              ? "این پروژه‌ها از میان بیش از ۱۰ پروژه‌ای که انجام داده‌ام انتخاب شده‌اند؛ پروژه‌های بیشتری در پورتفولیو و کیس‌استادی‌ها در دسترس‌اند."
              : "Selected from 10+ projects I’ve worked on. More work is available in my portfolio and case studies."}
          </p>
          <Reveal className="cv-more-work">
            <div>
              <small>{isFa ? "پورتفولیو و توسعه" : "Portfolio & Development"}</small>
              <h2>{isFa ? "پورتفولیوی خود را از ابتدا با React و با کمک OpenAI Codex برای توسعه ساخته‌ام." : "Designed and built my portfolio from scratch with React, using OpenAI Codex for AI-assisted development."}</h2>
            </div>
            <a href="https://foadmoghaddasi.com">foadmoghaddasi.com ↗</a>
          </Reveal>
        </div>
      </section>

      <div className="cv-footer-wrap">
        <Footer />
      </div>
    </main>
  );
}
