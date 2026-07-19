import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@heroui/react/button";
import { Avatar } from "@heroui/react/avatar";
import { Surface } from "@heroui/react/surface";
import { ArrowCircleDown, DocumentDownload } from "iconsax-react";
import Cards from "../components/Cards";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Reveal from "../components/Reveal";
import babakPhoto from "../assets/images/babak.webp";
import dorsaPhoto from "../assets/images/dorsa.webp";
import kianPhoto from "../assets/images/shahrokh.webp";
import foadPhoto from "../assets/images/about-pic.webp";
import { useLanguage } from "../context/LanguageContext";
import LanguageNotice from "../components/LanguageNotice";
import DailyDesignChallenge from "../components/DailyDesignChallenge";
import SEO, { SITE_URL } from "../components/SEO";

const heroWordsEn = [
  "that feel effortless",
  "that make sense",
  "people enjoy using",
  "for real-world impact",
];

const heroWordsFa = [
  "که ساده و روان‌اند",
  "که قابل‌فهم‌اند",
  "که مردم دوستشان دارند",
  "برای اثری واقعی",
];

let hasAutoDownloadedCvDuringCurrentVisit = false;

const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "Foad Moghaddasi",
      alternateName: ["فؤاد مقدسی", "فواد مقدسی"],
      inLanguage: ["en", "fa"],
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#foad-moghaddasi`,
      name: "Foad Moghaddasi",
      alternateName: ["فؤاد مقدسی", "فواد مقدسی", "Foad Moghadasi"],
      url: `${SITE_URL}/`,
      image: `${SITE_URL}/fm-logo.png`,
      jobTitle: [
        "Product Designer",
        "UI/UX Designer",
        "طراح محصول",
        "طراح رابط و تجربه کاربری",
      ],
      knowsAbout: [
        "Product Design",
        "UI Design",
        "UX Design",
        "User Research",
        "Design Systems",
        "Figma",
      ],
      worksFor: { "@type": "Organization", name: "Hesabo" },
      sameAs: [
        "https://www.linkedin.com/in/foadmoghaddasi",
        "https://dribbble.com/foadmoghaddasi",
      ],
    },
  ],
};

const Home = () => {
  const { isFa, direction } = useLanguage();
  const heroWords = isFa ? heroWordsFa : heroWordsEn;
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeHeroWord, setActiveHeroWord] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroWord((current) => (current + 1) % heroWords.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  const scrollToCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTeam = () => {
    document
      .getElementById("team")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDownload = () => {
    if (hasAutoDownloadedCvDuringCurrentVisit) {
      navigate("/cv");
      return;
    }

    hasAutoDownloadedCvDuringCurrentVisit = true;
    const link = document.createElement("a");
    link.href = "/FoadMoghaddasi-CV.pdf"; // Ensure the file is in the 'public' folder
    link.download = "Foad_Moghaddasi_CV.pdf"; // Set the filename for download
    document.body.appendChild(link);
    link.click();
    window.setTimeout(() => {
      document.body.removeChild(link);
      navigate("/cv");
    }, 150);
  };

  return (
    <div dir={direction}>
      <SEO
        title={
          isFa
            ? "فؤاد مقدسی | طراح محصول و طراح UI/UX"
            : "Foad Moghaddasi | Product Designer & UI/UX Designer"
        }
        description={
          isFa
            ? "وب‌سایت و پورتفولیوی فؤاد مقدسی، طراح محصول و UI/UX در تهران؛ شامل کیس‌استادی‌ها، تجربه کاری، مقاله‌های طراحی محصول و دیزاین سیستم."
            : "Portfolio of Foad Moghaddasi (فؤاد مقدسی), a Product Designer and UI/UX Designer in Tehran focused on user-centered digital products, design systems, and product strategy."
        }
        path={isFa ? "/?lang=fa" : "/"}
        type="profile"
        locale={isFa ? "fa_IR" : "en_US"}
        structuredData={homeStructuredData}
      />
      <Navbar />
      <LanguageNotice />

      <Surface className="relative isolate w-full min-h-screen overflow-hidden flex flex-col justify-start items-center px-4 bg-background text-foreground">
        {/* پس‌زمینه گرادینت */}
        <div aria-hidden="true" className="hero-mesh" />

        <div className="hero-content">
          <Reveal className="hero-title text-center z-10 mt-40 md:mt-40 2xl:mt-50 relative">
            <button
              type="button"
              className="hero-team-avatars"
              aria-label={isFa ? "آشنایی با تیم محصول" : "Meet the product team"}
              onClick={scrollToTeam}
            >
              <Avatar size="sm" className="hero-team-avatar">
                <Avatar.Image src={foadPhoto} alt={isFa ? "فؤاد مقدسی" : "Foad Moghaddasi"} />
                <Avatar.Fallback>FM</Avatar.Fallback>
              </Avatar>
              <Avatar size="sm" className="hero-team-avatar">
                <Avatar.Image src={dorsaPhoto} alt={isFa ? "درسا" : "Dorsa"} />
                <Avatar.Fallback>D</Avatar.Fallback>
              </Avatar>
              <Avatar size="sm" className="hero-team-avatar">
                <Avatar.Image src={babakPhoto} alt={isFa ? "بابک" : "Babak"} />
                <Avatar.Fallback>B</Avatar.Fallback>
              </Avatar>
              <Avatar size="sm" className="hero-team-avatar">
                <Avatar.Image src={kianPhoto} alt={isFa ? "کیان" : "Kian"} />
                <Avatar.Fallback>S</Avatar.Fallback>
              </Avatar>
            </button>
            <div className="hero-design-frame" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <div className="hero-collab-cursor hero-collab-cursor--foad">
                <i />
                <span>{isFa ? "کیان" : "kian"}</span>
              </div>
              <div className="hero-collab-cursor hero-collab-cursor--pm">
                <i />
                <span>{isFa ? "درسا" : "dorsa"}</span>
              </div>
            </div>
            <h1
              aria-label={
                isFa
                  ? "طراحی محصولاتی که ساده و روان‌اند"
                  : "Designing products that feel effortless"
              }
              dir={direction}
              className="relative text-3xl font-[800] sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
            >
              <span className="hero-static-title">
                {isFa ? "طراحی محصولاتی" : "Designing products"}
              </span>
              <br />
              <span
                className={`hero-rotating-word hero-rotating-word-${activeHeroWord}`}
                aria-hidden="true"
              >
                <span key={heroWords[activeHeroWord]}>
                  {heroWords[activeHeroWord]}
                </span>
              </span>
            </h1>
          </Reveal>

          {/* توضیحات */}
          <Reveal
            delay={80}
            className="hero-description relative mt-5 max-w-2xl sm:max-w-3xl lg:max-w-4xl z-10 text-center"
          >
            <p className="text-foreground font-[200] leading-10 text-2xl md:leading-16 md:text-5xl">
              <span>
                {isFa
                  ? "فؤاد مقدسی · طراح محصول در حسابو"
                  : "Foad Moghaddasi · Product Designer @Hesabo"}
              </span>
              <span className="block text-base sm:text-xl md:text-3xl">
                {isFa
                  ? "با سابقه همکاری در جاباما و آسانیتو"
                  : "previously at Jabama and Asanito"}
              </span>
            </p>
          </Reveal>

          {/* دکمه دانلود CV */}
          <Reveal delay={160} className="hero-download relative mt-10 z-10">
            <div className="hero-radius-control" aria-hidden="true">
              <svg viewBox="0 0 52 52">
                <path d="M2 2h15c18 0 33 15 33 33v15" />
                <circle cx="17" cy="2" r="2.5" />
              </svg>
              <div className="hero-radius-value" lang="en" dir="ltr">
                <span>16 px</span>
                <span>28 px</span>
                <span>12 px</span>
              </div>
            </div>
            <div
              className="hero-collab-cursor hero-collab-cursor--dev"
              aria-hidden="true"
            >
              <i />
              <span>{isFa ? "بابک" : "babak"}</span>
            </div>
            <Button
              onPress={handleDownload}
              variant="secondary"
              size="lg"
              className="hero-glass-button !h-14 px-7"
            >
              {isFa ? "دانلود رزومه" : "Download CV"}
              <DocumentDownload
                size="32"
                color="currentColor"
                variant="Broken"
              />
            </Button>
          </Reveal>
        </div>

        {/* بخش اسکرول */}
        <Reveal
          delay={220}
          className="case-studies-control relative flex flex-col items-center mt-50 md:mt-24 lg:mt-24 2xl:mt-[150px] z-10"
        >
          <h2 className="text-muted text-lg md:text-xl font-[200] md:font-semibold mb-4">
            {isFa ? "کیس‌استادی‌ها" : "Case Studies"}
          </h2>

          {/* دکمه اسکرول */}
          <Button
            isIconOnly
            variant="outline"
            size="lg"
            onPress={scrollToCards}
            aria-label={isFa ? "رفتن به کیس‌استادی‌ها" : "Scroll to case studies"}
            className="hero-glass-button"
          >
            <ArrowCircleDown size="26" color="currentColor" variant="Broken" />
          </Button>
        </Reveal>
      </Surface>

      <DailyDesignChallenge />
      <About />

      {/* سکشن کارت‌ها */}
      <div ref={cardsRef}>
        <Cards />
      </div>
    </div>
  );
};

export default Home;
