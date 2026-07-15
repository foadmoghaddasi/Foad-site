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

const teamMembers = [
  {
    name: "Babak",
    position: "Graphic Designer",
    specialty: "GPT",
    initials: "B",
    image: babakPhoto,
    video: babakVideo,
  },
  {
    name: "Dorsa",
    position: "Product Designer",
    specialty: "Figma Agent",
    initials: "D",
    image: dorsaPhoto,
    video: dorsaVideo,
  },
  {
    name: "Kian",
    position: "Full-stack Developer",
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
  const videoRef = useRef<HTMLVideoElement>(null);

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
      aria-label={`${isActive ? "Stop" : "Play"} ${member.name}'s video`}
      aria-pressed={isActive}
    >
      <img
        className="team-photo-image"
        src={member.image}
        alt={member.name}
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
  const [activeMember, setActiveMember] = useState<string | null>(null);

  return (
    <section
      id="team"
      className="team-section"
      dir="ltr"
      aria-labelledby="team-title"
    >
      <Reveal className="team-heading">
        <span>THE PEOPLE BEHIND THE WORK</span>
        <h2 id="team-title">Meet the team</h2>
        <p>
          Different disciplines, one shared goal: building products people
          enjoy using.
        </p>
        <div className="team-interaction-hint" aria-label="Interactive team photos">
          <PlayCircle size="17" color="currentColor" variant="Bold" />
          <span className="team-hint-hover">Hover over a photo — we'll smile back</span>
          <span className="team-hint-touch">Tap a photo — we'll smile back</span>
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
                <h3>{member.name}</h3>
                <p>{member.position}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Team;
