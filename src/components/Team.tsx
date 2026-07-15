import Reveal from "./Reveal";
import babakPhoto from "../assets/images/babak.png";
import dorsaPhoto from "../assets/images/dorsa.png";
import shahrokhPhoto from "../assets/images/shahrokh.png";
import "./Team.css";

const teamMembers = [
  {
    name: "Babak",
    position: "Graphic Designer",
    specialty: "GPT",
    initials: "B",
    image: babakPhoto,
  },
  {
    name: "Dorsa",
    position: "Product Designer",
    specialty: "Figma Agent",
    initials: "D",
    image: dorsaPhoto,
  },
  {
    name: "Shahrokh",
    position: "Full-stack Developer",
    specialty: "Codex",
    initials: "S",
    image: shahrokhPhoto,
  },
];

const Team = () => {
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
      </Reveal>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <Reveal key={member.name} delay={index * 80} className="team-reveal">
            <article className="team-card">
              <div className="team-photo">
                {member.image ? (
                  <img src={member.image} alt={member.name} loading="lazy" />
                ) : (
                  <div className="team-photo-placeholder" aria-hidden="true">
                    <span>{member.initials}</span>
                  </div>
                )}
                <span className="team-role-chip">{member.specialty}</span>
              </div>

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
