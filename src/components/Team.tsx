import { useEffect, useRef, useState } from "react";
import { PlayCircle } from "iconsax-react";
import Reveal from "./Reveal";
import babakPhoto from "../assets/images/babak.png";
import babakVideo from "../assets/images/babak.mp4";
import dorsaPhoto from "../assets/images/dorsa.png";
import dorsaVideo from "../assets/images/dorsa.mp4";
import kianPhoto from "../assets/images/shahrokh.png";
import kianVideo from "../assets/images/shahrokh.mp4";
import "./Team.css";
import { useLanguage } from "../context/LanguageContext";

const teamMembers = [
  {
    name: "Babak",
    nameFa: "بابک",
    position: "Graphic Designer",
    positionFa: "طراح گرافیک",
    specialty: "GPT",
    initials: "B",
    image: babakPhoto,
    video: babakVideo,
  },
  {
    name: "Dorsa",
    nameFa: "درسا",
    position: "Product Designer",
    positionFa: "طراح محصول",
    specialty: "Figma Agent",
    initials: "D",
    image: dorsaPhoto,
    video: dorsaVideo,
  },
  {
    name: "Kian",
    nameFa: "کیان",
    position: "Full-stack Developer",
    positionFa: "توسعه‌دهنده فول‌استک",
    specialty: "Codex",
    initials: "S",
    image: kianPhoto,
    video: kianVideo,
  },
];

type TeamMember = (typeof teamMembers)[number];

const hasHoverPointer = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const TeamPhoto = ({
  member,
  isActive,
  onActiveChange,
}: {
  member: TeamMember;
  isActive: boolean;
  onActiveChange: (name: string | null) => void;
}) => {
  const { isFa } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const displayName = isFa ? member.nameFa : member.name;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      void video.play().catch(() => onActiveChange(null));
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isActive, onActiveChange]);

  const toggleForTouchOrKeyboard = (detail: number) => {
    if (hasHoverPointer() && detail !== 0) return;
    onActiveChange(isActive ? null : member.name);
  };

  return (
    <button
      type="button"
      className={`team-photo${isActive ? " is-video-active" : ""}`}
      onMouseEnter={() => hasHoverPointer() && onActiveChange(member.name)}
      onMouseLeave={() => hasHoverPointer() && onActiveChange(null)}
      onClick={(event) => toggleForTouchOrKeyboard(event.detail)}
      aria-label={
        isFa
          ? `${isActive ? "توقف" : "پخش"} ویدیوی ${displayName}`
          : `${isActive ? "Stop" : "Play"} ${displayName}'s video`
      }
      aria-pressed={isActive}
    >
      <img
        className="team-photo-image"
        src={member.image}
        alt={displayName}
        loading="lazy"
      />
      <video
        ref={videoRef}
        className="team-photo-video"
        src={member.video}
        poster={member.image}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      <span className="team-role-chip">{member.specialty}</span>
    </button>
  );
};

const Team = () => {
  const { isFa, direction } = useLanguage();
  const [activeMember, setActiveMember] = useState<string | null>(null);

  return (
    <section
      id="team"
      className="team-section"
      dir={direction}
      aria-labelledby="team-title"
    >
      <Reveal className="team-heading">
        <span>{isFa ? "آدم‌های پشت این کار" : "THE PEOPLE BEHIND THE WORK"}</span>
        <h2 id="team-title">{isFa ? "با تیم من آشنا شوید" : "Meet my team"}</h2>
        <p>
          {isFa
            ? "تخصص‌های متفاوت و یک هدف مشترک: ساخت محصولاتی که مردم از استفاده‌شان لذت ببرند."
            : "Different disciplines, one shared goal: building products people enjoy using."}
        </p>
        <div
          className="team-interaction-hint"
          aria-label={isFa ? "عکس‌های تعاملی اعضای تیم" : "Interactive team photos"}
        >
          <PlayCircle size="17" color="currentColor" variant="Bold" />
          <span className="team-hint-hover">
            {isFa ? "نشانگر را روی عکس ببرید — لبخند می‌زنیم" : "Hover over a photo — we'll smile back"}
          </span>
          <span className="team-hint-touch">
            {isFa ? "روی عکس بزنید — لبخند می‌زنیم" : "Tap a photo — we'll smile back"}
          </span>
        </div>
      </Reveal>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <Reveal key={member.name} delay={index * 80} className="team-reveal">
            <article className="team-card">
              <TeamPhoto
                member={member}
                isActive={activeMember === member.name}
                onActiveChange={setActiveMember}
              />

              <div className="team-card-copy">
                <h3>{isFa ? member.nameFa : member.name}</h3>
                <p>{isFa ? member.positionFa : member.position}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Team;
