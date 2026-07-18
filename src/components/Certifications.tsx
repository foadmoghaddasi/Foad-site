import { Award, ExportSquare } from "iconsax-react";
import Reveal from "./Reveal";
import variablesCertificate from "../assets/images/Figma- Designing with Variables and Conditionals.jpeg";
import researchCertificate from "../assets/images/Data-Driven Product Research and Design.jpeg";
import accessibilityCertificate from "../assets/images/Accessibility and Inclusion with Figma.jpeg";
import microinteractionsCertificate from "../assets/images/Designing Microinteractions with Figma.png";
import mentorshipCertificate from "../assets/images/1 Mentorship Sessions.jpeg";
import pmiLogo from "../assets/images/project mgmt ints.jpeg";
import adpListLogo from "../assets/images/adplist.org?url";
import "./Certifications.css";
import { useLanguage } from "../context/LanguageContext";

const linkedInCertificationsUrl =
  "https://www.linkedin.com/in/foadmoghaddasi/details/certifications/";

const certifications = [
  {
    title: "Figma: Designing with Variables and Conditionals",
    titleFa: "فیگما: طراحی با متغیرها و شرط‌ها",
    issuer: "LinkedIn",
    issuerFa: "لینکدین",
    issued: "Feb 2025",
    skills: ["Figma"],
    skillsFa: ["فیگما"],
    mark: "in",
    markStyle: "linkedin",
    image: variablesCertificate,
  },
  {
    title: "Data-Driven Product Research and Design",
    titleFa: "تحقیق و طراحی محصول داده‌محور",
    issuer: "Project Management Institute",
    issuerFa: "مؤسسه مدیریت پروژه",
    issued: "Feb 2025",
    skills: ["Product Research", "Data-driven Decision Making"],
    skillsFa: ["تحقیق محصول", "تصمیم‌گیری داده‌محور"],
    mark: "PMI",
    markStyle: "pmi",
    logo: pmiLogo,
    image: researchCertificate,
  },
  {
    title: "Accessibility and Inclusion with Figma",
    titleFa: "دسترس‌پذیری و طراحی فراگیر با فیگما",
    issuer: "LinkedIn",
    issuerFa: "لینکدین",
    issued: "Feb 2025",
    skills: ["Digital Accessibility"],
    skillsFa: ["دسترس‌پذیری دیجیتال"],
    mark: "in",
    markStyle: "linkedin",
    image: accessibilityCertificate,
  },
  {
    title: "Designing Microinteractions with Figma",
    titleFa: "طراحی ریزتعامل‌ها با فیگما",
    issuer: "LinkedIn",
    issuerFa: "لینکدین",
    issued: "Feb 2025",
    credentialId:
      "5541cbd7ce58ea630696fd31a2ed46a97dd2dc4aa4007edbc9aa92d601aeea31",
    skills: ["Figma", "User Interface Design"],
    skillsFa: ["فیگما", "طراحی رابط کاربری"],
    mark: "in",
    markStyle: "linkedin",
    image: microinteractionsCertificate,
  },
  {
    title: "1 Mentorship Sessions",
    titleFa: "یک جلسه منتورشیپ",
    issuer: "adplist.org",
    issuerFa: "ADPList",
    issued: "Dec 2023",
    credentialId: "159416",
    skills: ["User Experience", "Product Design"],
    skillsFa: ["تجربه کاربری", "طراحی محصول"],
    mark: "ADP",
    markStyle: "adplist",
    logo: adpListLogo,
    image: mentorshipCertificate,
  },
];

type CertificationsProps = {
  context?: "home" | "cv";
};

const Certifications = ({ context = "home" }: CertificationsProps) => {
  const { isFa, direction } = useLanguage();

  return (
  <section
    className={`certifications-section certifications-section--${context}`}
    aria-labelledby={`${context}-certifications-title`}
    dir={direction}
  >
    <Reveal className="certifications-heading">
      <div>
        <span>{isFa ? "یادگیری مستمر" : "CONTINUOUS LEARNING"}</span>
        <h2 id={`${context}-certifications-title`}>
          {isFa ? "لایسنس‌ها و گواهینامه‌ها" : "Licenses & Certifications"}
        </h2>
        <p>
          {isFa
            ? "یادگیری حرفه‌ای در طراحی محصول، تحقیق و دسترس‌پذیری."
            : "Professional learning across product design, research and accessibility."}
        </p>
      </div>
      <Award size="30" color="currentColor" variant="Broken" />
    </Reveal>

    <div className="certifications-grid">
      {certifications.map((certification, index) => (
        <Reveal
          className={`certification-reveal certification-reveal--${index + 1}`}
          delay={(index % 3) * 60}
          key={certification.title}
        >
          <article className="certification-card">
            <div className="certification-card-top">
              <span
                className={`certification-mark certification-mark--${certification.markStyle}`}
                aria-hidden="true"
              >
                {certification.logo ? (
                  <img src={certification.logo} alt="" />
                ) : (
                  certification.mark
                )}
              </span>
              <div>
                <h3>{isFa ? certification.titleFa : certification.title}</h3>
                <p>{isFa ? certification.issuerFa : certification.issuer}</p>
                <span>
                  {isFa ? "صادرشده در " : "Issued "}
                  {isFa
                    ? certification.issued
                        .replace("Feb", "فوریه")
                        .replace("Dec", "دسامبر")
                        .replace("2025", "۲۰۲۵")
                        .replace("2023", "۲۰۲۳")
                    : certification.issued}
                </span>
              </div>
            </div>

            <div className="certification-preview">
              <img
                src={certification.image}
                alt={`${isFa ? "گواهینامه" : "Certificate"} ${isFa ? certification.titleFa : certification.title}`}
                loading="lazy"
              />
            </div>

            <div
              className="certification-skills"
              aria-label={isFa ? "مهارت‌های مرتبط" : "Related skills"}
            >
              {(isFa ? certification.skillsFa : certification.skills).map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

          </article>
        </Reveal>
      ))}
    </div>

    <Reveal className="certifications-action">
      <a
        href={linkedInCertificationsUrl}
        target="_blank"
        rel="noreferrer"
        className="certification-link"
      >
        {isFa ? "مشاهده گواهینامه‌ها" : "Show credentials"}
        <ExportSquare size="18" color="currentColor" variant="Broken" />
      </a>
    </Reveal>
  </section>
  );
};

export default Certifications;
