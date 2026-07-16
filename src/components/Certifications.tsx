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

const linkedInCertificationsUrl =
  "https://www.linkedin.com/in/foadmoghaddasi/details/certifications/";

const certifications = [
  {
    title: "Figma: Designing with Variables and Conditionals",
    issuer: "LinkedIn",
    issued: "Feb 2025",
    skills: ["Figma"],
    mark: "in",
    markStyle: "linkedin",
    image: variablesCertificate,
  },
  {
    title: "Data-Driven Product Research and Design",
    issuer: "Project Management Institute",
    issued: "Feb 2025",
    skills: ["Product Research", "Data-driven Decision Making"],
    mark: "PMI",
    markStyle: "pmi",
    logo: pmiLogo,
    image: researchCertificate,
  },
  {
    title: "Accessibility and Inclusion with Figma",
    issuer: "LinkedIn",
    issued: "Feb 2025",
    skills: ["Digital Accessibility"],
    mark: "in",
    markStyle: "linkedin",
    image: accessibilityCertificate,
  },
  {
    title: "Designing Microinteractions with Figma",
    issuer: "LinkedIn",
    issued: "Feb 2025",
    credentialId:
      "5541cbd7ce58ea630696fd31a2ed46a97dd2dc4aa4007edbc9aa92d601aeea31",
    skills: ["Figma", "User Interface Design"],
    mark: "in",
    markStyle: "linkedin",
    image: microinteractionsCertificate,
  },
  {
    title: "1 Mentorship Sessions",
    issuer: "adplist.org",
    issued: "Dec 2023",
    credentialId: "159416",
    skills: ["User Experience", "Product Design"],
    mark: "ADP",
    markStyle: "adplist",
    logo: adpListLogo,
    image: mentorshipCertificate,
  },
];

type CertificationsProps = {
  context?: "home" | "cv";
};

const Certifications = ({ context = "home" }: CertificationsProps) => (
  <section
    className={`certifications-section certifications-section--${context}`}
    aria-labelledby={`${context}-certifications-title`}
    dir="ltr"
  >
    <Reveal className="certifications-heading">
      <div>
        <span>CONTINUOUS LEARNING</span>
        <h2 id={`${context}-certifications-title`}>
          Licenses &amp; Certifications
        </h2>
        <p>Professional learning across product design, research and accessibility.</p>
      </div>
      <Award size="30" color="currentColor" variant="Broken" />
    </Reveal>

    <div className="certifications-grid">
      {certifications.map((certification, index) => (
        <Reveal
          className="certification-reveal"
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
                <h3>{certification.title}</h3>
                <p>{certification.issuer}</p>
                <span>Issued {certification.issued}</span>
              </div>
            </div>

            <div className="certification-preview">
              <img
                src={certification.image}
                alt={`${certification.title} certificate`}
                loading="lazy"
              />
            </div>

            <div className="certification-skills" aria-label="Related skills">
              {certification.skills.map((skill) => (
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
        Show credentials
        <ExportSquare size="18" color="currentColor" variant="Broken" />
      </a>
    </Reveal>
  </section>
);

export default Certifications;
