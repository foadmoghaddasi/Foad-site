import { Button } from "@heroui/react/button";
import { Avatar } from "@heroui/react/avatar";
import { Card } from "@heroui/react/card";
import { Link } from "@heroui/react/link";
import { Surface } from "@heroui/react/surface";
import {
  ArrowCircleDown,
  ArrowCircleLeft,
  ArrowCircleRight,
  QuoteUp,
  Verify,
} from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Image from "../assets/images/Slide.webp";
import img1 from "../assets/images/img1.webp";
import img2 from "../assets/images/img2.webp";
import img3 from "../assets/images/img3.webp";
import img4 from "../assets/images/img4.webp";
import img5 from "../assets/images/img5.webp";
import img6 from "../assets/images/img6.webp";
import img7 from "../assets/images/img7.webp";
import img8 from "../assets/images/img8.webp";
import img9 from "../assets/images/img9.webp";
import img10 from "../assets/images/img10.webp";
import img11 from "../assets/images/img11.webp";
import img12 from "../assets/images/img12.webp";
import img13 from "../assets/images/img13.webp";
import img14 from "../assets/images/img14.webp";
import img15 from "../assets/images/img15.webp";
import img16 from "../assets/images/img16.webp";
import img17 from "../assets/images/img17.webp";
import img18 from "../assets/images/img18.webp";
import img19 from "../assets/images/img19.webp";
import img20 from "../assets/images/img20.webp";
import img21 from "../assets/images/img21.webp";
import img22 from "../assets/images/img22.webp";
import img23 from "../assets/images/img23.webp";
import img24 from "../assets/images/img24.webp";
import img25 from "../assets/images/img25.webp";
import img26 from "../assets/images/img26.webp";
import img27 from "../assets/images/img27.webp";
import img28 from "../assets/images/img28.webp";
import img29 from "../assets/images/img29.webp";
import img30 from "../assets/images/img30.webp";
import img31 from "../assets/images/img31.webp";
import panelImage from "../assets/images/panel-card.webp";
import qursatImage from "../assets/images/qursat-card.webp";
import maryamAvatar from "../assets/images/recom - maryam.jpeg";
import Reveal from "./Reveal";
import Footer from "./Footer";
import Team from "./Team";
import LatestArticles from "./LatestArticles";
import Certifications from "./Certifications";
import { useLanguage } from "../context/LanguageContext";

const projects = [
  {
    image: img29,
    title: "پروژه طراحی اپلیکیشن تاداتون (کانادا)",
    year: "۱۴۰۴",
  },
  {
    image: img28,
    title: "پروژه طراحی اپلیکیشن تاداتون (کانادا)",
    year: "۱۴۰۴",
  },
  { image: img31, title: "طراحی وب‌اپلیکیشن قرصات", year: "۱۴۰۴" },
  { image: img30, title: "طراحی پنل ادمین قرصات", year: "۱۴۰۴" },
  { image: img26, title: "پروژه طراحی اپلیکیشن دل به دل (لندن)", year: "۱۴۰۳" },
  {
    image: img27,
    title: "بازطراحی فروشگاه اینترنتی سارمو استایل",
    year: "۱۴۰۳",
  },
  { image: img2, title: "پروژه طراحی سایت آموزش برنامه‌نویسی", year: "۱۴۰۲" },
  { image: img5, title: "پروژه طراحی پلتفرم صرافی آنلاین", year: "۱۴۰۲" },
  { image: img6, title: "طراحی سایت همگرام", year: "۱۴۰۱" },
  { image: img7, title: "پروژه طراحی پلتفرم همگرام", year: "۱۴۰۱" },
  { image: img12, title: "طراحی لندینگ دانلود اپلیکیشن حسابو", year: "۱۴۰۱" },
  {
    image: img4,
    title: "پروژه طراحی فروشگاه اینترنتی خشکبار ناتژی",
    year: "۱۴۰۰",
  },
  { image: img25, title: "پروژه طراحی فروشگاه کیک نظری", year: "۱۴۰۰" },
  { image: img3, title: "پروژه طراحی سایت Voices to Action", year: "۱۴۰۰" },
  {
    image: img8,
    title: "طراحی سایت رزرو آنلاین وقت دکتر - جان‌افزا",
    year: "۱۴۰۰",
  },
  { image: img10, title: "طراحی سایت کاریزما کراد", year: "۱۳۹۹" },
  { image: img11, title: "طراحی فروشگاه اینترنتی ویگال", year: "۱۳۹۹" },
  { image: img1, title: "کانسپت نئومورفیسم iOS", year: "۱۳۹۹" },
  {
    image: img9,
    title: "پروژه طراحی پنل های مدیریتی کاریزما کراد",
    year: "۱۳۹۹",
  },
  { image: img13, title: "کانسپت اپلیکیشن مدیریت خواب", year: "۱۳۹۹" },
  { image: img14, title: "کانسپت اپلیکیشن پایش سلامت", year: "۱۳۹۹" },
  { image: img15, title: "کانسپت اپلیکیشن وضعیت آب و هوا", year: "۱۳۹۹" },
  { image: img16, title: "طراحی سایت صرافی کنزکس", year: "۱۳۹۹" },
  { image: img17, title: "کانسپت فروشگاه برنامه های موبایل", year: "۱۳۹۹" },
  { image: img18, title: "بازطراحی گوگل کروم به سبک نئومورفیسم", year: "۱۳۹۹" },
  { image: img19, title: "کانسپت فروشگاه بازی های آنلاین", year: "۱۳۹۹" },
  { image: img20, title: "کانسپت اپلیکیشن سفارش قهوه", year: "۱۳۹۹" },
  { image: img21, title: "کانسپت موزیک پلیر به سبک نئومورفیسم", year: "۱۳۹۹" },
  { image: img22, title: "کانسپت قندشکن", year: "۱۳۹۹" },
  {
    image: img23,
    title: "کانسپت اپلیکیشن ساعت به سبک نئومورفیسم",
    year: "۱۳۹۹",
  },
  { image: img24, title: "پروژه کارآموزی شرکت ستاره اول", year: "۱۳۹۹" },
];

const projectEnglishTitles = [
  "Tadatoon mobile app design (Canada)", "Tadatoon mobile app design (Canada)",
  "Qursat web application design", "Qursat admin panel design",
  "Del Be Del mobile app design (London)", "Sarmo Style online store redesign",
  "Programming education website design", "Online exchange platform design",
  "Hamgram website design", "Hamgram platform design",
  "Hesabo app download landing page", "Natzie nuts online store design",
  "Nazari Cake store design", "Voices to Action website design",
  "Janafza online doctor booking website", "Charisma Crowd website design",
  "Vigal online store design", "iOS neumorphism concept",
  "Charisma Crowd admin panel design", "Sleep management app concept",
  "Health monitoring app concept", "Weather app concept",
  "Kanzex exchange website design", "Mobile app store concept",
  "Google Chrome neumorphism redesign", "Online game store concept",
  "Coffee ordering app concept", "Neumorphism music player concept",
  "Anti-censorship app concept", "Neumorphism watch app concept",
  "Setareh Aval internship project",
];

const toEnglishDigits = (value: string) =>
  value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));

const Cards = () => {
  const { isFa, direction } = useLanguage();
  const navigate = useNavigate();
  const [visibleProjects, setVisibleProjects] = useState(3);
  const hasMoreProjects = visibleProjects < projects.length;

  return (
    <Surface dir={direction} className="w-full bg-background pt-8 pb-14 text-foreground md:py-14">
      <section
        id="case-studies"
        className="mx-auto max-w-6xl scroll-mt-28 px-4"
      >
        <Reveal>
          <h2 className="mb-8 text-center text-2xl font-bold">
            {isFa ? "کیس‌استادی‌ها" : "Case studies"}
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Reveal className="h-full">
            <Card
              variant="transparent"
              className="case-study-card group h-full p-0"
            >
              <Card.Content className="absolute inset-0 p-0">
                <img
                  src={qursatImage}
                  alt={isFa ? "کیس‌استادی Limevee" : "Limevee case study"}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </Card.Content>
              <div className="case-study-overlay" aria-hidden="true" />
              <Card.Header className="relative z-10 flex-col items-start gap-1 p-5 text-start text-white">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/65">
                  Limevee
                </p>
                <Card.Title className="text-lg font-semibold leading-7 text-white">
                  {isFa
                    ? "راه‌حل تماشای گروهی فیلم و سریال"
                    : "A better way to choose what to watch together"}
                </Card.Title>
              </Card.Header>
              <Card.Footer className="relative z-10 mt-auto justify-end p-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="case-study-action"
                  onPress={() => navigate("/limevee")}
                >
                  {isFa ? "مطالعه کیس‌استادی" : "Read case study"}
                  {isFa ? (
                    <ArrowCircleLeft size="22" color="currentColor" variant="Broken" />
                  ) : (
                    <ArrowCircleRight size="22" color="currentColor" variant="Broken" />
                  )}
                </Button>
              </Card.Footer>
            </Card>
          </Reveal>

          <Reveal delay={70} className="h-full">
            <Card
              variant="transparent"
              className="case-study-card group h-full p-0"
            >
              <Card.Content className="absolute inset-0 p-0">
                <img
                  src={Image}
                  alt={isFa ? "فرایند طراحی اپلیکیشن حسابو" : "Hesabo app design process"}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </Card.Content>
              <div className="case-study-overlay" aria-hidden="true" />
              <Card.Header className="relative z-10 flex-col items-start gap-1 p-5 text-start text-white">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/65">
                  Hesabo App
                </p>
                <Card.Title className="text-lg font-semibold leading-7 text-white">
                  {isFa ? "فرایند طراحی اپلیکیشن حسابو" : "Hesabo app design process"}
                </Card.Title>
              </Card.Header>
              <Card.Footer className="relative z-10 mt-auto justify-end p-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="case-study-action"
                  isDisabled
                >
                  {isFa ? "غیرقابل انتشار (NDA)" : "Not publishable (NDA)"}
                </Button>
              </Card.Footer>
            </Card>
          </Reveal>

          <Reveal delay={140} className="h-full">
            <Card
              variant="transparent"
              className="case-study-card group h-full p-0"
            >
              <Card.Content className="absolute inset-0 p-0">
                <img
                  src={panelImage}
                  alt={isFa ? "طراحی پنل‌های مدیریت حسابو" : "Hesabo admin panel design"}
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </Card.Content>
              <div className="case-study-overlay" aria-hidden="true" />
              <Card.Header className="relative z-10 flex-col items-start gap-1 p-5 text-start text-white">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/65">
                  Hesabo Panel
                </p>
                <Card.Title className="text-lg font-semibold leading-7 text-white">
                  {isFa ? "طراحی پنل‌های مدیریت حسابو" : "Hesabo admin panel design"}
                </Card.Title>
              </Card.Header>
              <Card.Footer className="relative z-10 mt-auto justify-end p-4">
                <Button
                  size="lg"
                  variant="secondary"
                  className="case-study-action"
                  isDisabled
                >
                  {isFa ? "غیرقابل انتشار (NDA)" : "Not publishable (NDA)"}
                </Button>
              </Card.Footer>
            </Card>
          </Reveal>
        </div>

        <Reveal>
          <h2 className="mb-8 mt-20 text-center text-2xl font-bold">
            {isFa ? "پروژه‌های UI/UX من" : "My UI/UX projects"}
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, visibleProjects).map((project, index) => {
            const projectTitle = isFa ? project.title : projectEnglishTitles[index];
            return (
              <Reveal
                key={`${project.title}-${project.image}`}
                delay={(index % 3) * 60}
              >
                <Card variant="transparent" className="overflow-hidden p-0">
                  <Card.Content className="p-0">
                    <img
                      src={project.image}
                      alt={projectTitle}
                      loading="lazy"
                      className="h-64 w-full rounded-xl object-cover"
                    />
                  </Card.Content>
                  <Card.Header className="items-start px-1 text-start">
                    <div>
                      <Card.Title>{projectTitle}</Card.Title>
                      <Card.Description>
                        {isFa ? `سال ${project.year}` : `Year ${toEnglishDigits(project.year)}`}
                      </Card.Description>
                    </div>
                  </Card.Header>
                </Card>
              </Reveal>
            );
          })}
        </div>

        {hasMoreProjects && (
          <Reveal className="mt-10 flex justify-center">
            <button
              type="button"
              className="certification-link portfolio-more-button"
              onClick={() =>
                setVisibleProjects((current) =>
                  Math.min(current + 3, projects.length),
                )
              }
            >
              {isFa ? "مشاهده بیشتر" : "Show more"}
              <ArrowCircleDown
                size="18"
                color="currentColor"
                variant="Broken"
              />
            </button>
          </Reveal>
        )}

        {!hasMoreProjects && (
          <Reveal className="mt-10 flex justify-center">
            <Button
              variant="secondary"
              onPress={() =>
                window.open(
                  "https://dribbble.com/foadmoghaddasi",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              {isFa ? "مشاهده بیشتر در Dribbble" : "View more on Dribbble"}
              {isFa ? (
                <ArrowCircleLeft size="22" color="currentColor" variant="Broken" />
              ) : (
                <ArrowCircleRight size="22" color="currentColor" variant="Broken" />
              )}
            </Button>
          </Reveal>
        )}

        <Team />

        <LatestArticles />

        <Certifications />

        <Reveal className="mt-24">
          <section dir={direction} aria-labelledby="recommendation-title">
            <div className="mb-6 flex items-center gap-3">
              <h2
                id="recommendation-title"
                className="shrink-0 text-xl font-bold md:text-2xl"
              >
                {isFa ? "توصیه‌نامه" : "Recommendation"}
              </h2>
              <span className="h-px w-full bg-border" aria-hidden="true" />
            </div>

            <Card
              variant="tertiary"
              className="recommendation-card shadow-none"
            >
              <Card.Header className="items-start gap-4 pb-3">
                <Avatar
                  size="lg"
                  color="accent"
                  variant="soft"
                  className="shrink-0"
                >
                  <Avatar.Image
                    src={maryamAvatar}
                    alt={isFa ? "مریم گشاس" : "Maryam Gashas"}
                    className="object-cover"
                  />
                  <Avatar.Fallback className="font-semibold">
                    MG
                  </Avatar.Fallback>
                </Avatar>

                <div className="min-w-0 flex-1 text-start">
                  <div className="flex items-center gap-1.5">
                    <Card.Title className="text-base font-semibold md:text-lg">
                      {isFa ? "مریم گشاس" : "Maryam Gashas"}
                    </Card.Title>
                    <Verify
                      size="18"
                      color="currentColor"
                      variant="Bold"
                      className="shrink-0 text-link"
                    />
                  </div>
                  <Card.Description className="mt-1 leading-5">
                    {isFa
                      ? "هم‌بنیان‌گذار و مدیرعامل تاداتون · فناوری آموزشی · مدیریت و استراتژی"
                      : "Co-Founder & CEO at Tadatoon · EdTech · Management and strategy"}
                  </Card.Description>
                  <p className="mt-1.5 text-xs text-muted">
                    {isFa
                      ? "۲۴ فوریه ۲۰۲۵ · مریم مدیر مستقیم فؤاد بوده است"
                      : "February 24, 2025 · Maryam managed Foad directly"}
                  </p>
                </div>

                <span className="recommendation-quote" aria-hidden="true">
                  <QuoteUp size="24" color="currentColor" variant="Bold" />
                </span>
              </Card.Header>

              <Card.Content className="pt-2 text-start">
                <blockquote className="max-w-4xl text-sm leading-7 text-foreground/85 md:text-base md:leading-8">
                  {isFa
                    ? "داشتن یک طراح محصول که هم خلاق باشد و هم ارتباط مؤثری برقرار کند، برای هر تیمی ارزشمند است. فؤاد هر دو ویژگی را به‌خوبی دارد. او علاوه بر طراحی راه‌حل‌های نوآورانه و کاربرمحور، با همکاری مؤثر با تیم‌های مختلف فرایند توسعه محصول را هم بهتر می‌کند."
                    : "Having a product designer who is both creative and an excellent communicator is a valuable asset to any team. Foad embodies these qualities perfectly. Not only does he create innovative and user-centric designs, but he also enhances the product development process through effective collaboration with various teams."}
                </blockquote>
              </Card.Content>
            </Card>
          </section>
        </Reveal>

        <Footer />
      </section>
    </Surface>
  );
};

export default Cards;
