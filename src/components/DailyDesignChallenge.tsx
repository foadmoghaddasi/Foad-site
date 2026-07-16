import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react/button";
import { Card } from "@heroui/react/card";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Copy,
  LampOn,
  MedalStar,
  TaskSquare,
  TickCircle,
} from "iconsax-react";
import challenge from "../content/daily-challenge.json";
import { useLanguage } from "../context/LanguageContext";
import { formatChallengeDateRange } from "../utils/formatChallengeDateRange";
import Reveal from "./Reveal";
import "./DailyDesignChallenge.css";

type DailyDesignChallengeProps = {
  variant?: "preview" | "full";
};

const DailyDesignChallenge = ({ variant = "preview" }: DailyDesignChallengeProps) => {
  const { isFa, direction } = useLanguage();
  const language = isFa ? "fa" : "en";
  const [isCopied, setIsCopied] = useState(false);

  const formattedDate = useMemo(() => {
    return formatChallengeDateRange(challenge.date, isFa);
  }, [isFa]);

  useEffect(() => {
    if (!isCopied) return;
    const timer = window.setTimeout(() => setIsCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [isCopied]);

  const copyChallenge = async () => {
    const constraints = challenge.constraints[language]
      .map((item) => `• ${item}`)
      .join("\n");
    const deliverables = challenge.deliverables[language]
      .map((item) => `• ${item}`)
      .join("\n");
    const text = `${challenge.title[language]}\n\n${challenge.scenario[language]}\n\n${challenge.challenge[language]}\n\n${isFa ? "محدودیت‌ها" : "Constraints"}\n${constraints}\n\n${isFa ? "خروجی تمرین" : "Deliverables"}\n${deliverables}`;

    await navigator.clipboard.writeText(text);
    setIsCopied(true);
  };

  if (variant === "preview") {
    return (
      <section
        className="daily-challenge-section daily-challenge-section--preview"
        dir={direction}
        aria-labelledby="daily-challenge-preview-title"
      >
        <Reveal className="daily-challenge-preview-heading">
          <div>
            <span>{isFa ? "تمرین هفتگی طراحی" : "WEEKLY DESIGN CHALLENGE"}</span>
            <h2 id="daily-challenge-preview-title">
              {isFa ? "مسئله این هفته برای تمرین" : "This week’s problem to solve"}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Link
            to="/daily-design-challenge"
            className="daily-challenge-preview-link"
            aria-label={`${isFa ? "مشاهده چالش این هفته" : "View this week’s challenge"}: ${challenge.title[language]}`}
          >
            <Card variant="tertiary" className="daily-challenge-preview-card">
              <div className="daily-challenge-glow" aria-hidden="true" />
              <Card.Header className="daily-challenge-preview-card-header">
                <div className="daily-challenge-icon" aria-hidden="true">
                  <MedalStar size="26" color="currentColor" variant="Broken" />
                </div>
                <div className="daily-challenge-title-wrap">
                  <span>{challenge.category[language]}</span>
                  <Card.Title>{challenge.title[language]}</Card.Title>
                </div>
              </Card.Header>

              <Card.Content className="daily-challenge-preview-content">
                <p>{challenge.scenario[language]}</p>
                <div className="daily-challenge-preview-bottom">
                  <div className="daily-challenge-meta">
                    <span>
                      <Clock size="15" color="currentColor" variant="Broken" />
                      {challenge.timebox[language]}
                    </span>
                    <span>{challenge.difficulty[language]}</span>
                  </div>
                  <span className="daily-challenge-preview-cta">
                    {isFa ? "مشاهده چالش این هفته" : "View this week’s challenge"}
                    {isFa ? (
                      <ArrowLeft size="20" color="currentColor" variant="Broken" />
                    ) : (
                      <ArrowRight size="20" color="currentColor" variant="Broken" />
                    )}
                  </span>
                </div>
              </Card.Content>
            </Card>
          </Link>
        </Reveal>
      </section>
    );
  }

  return (
    <section
      className="daily-challenge-section daily-challenge-section--full"
      dir={direction}
      aria-labelledby="daily-challenge-title"
    >
      <Reveal className="daily-challenge-heading">
        <div>
          <span>{isFa ? "آرشیو تمرین‌های طراحی" : "DESIGN CHALLENGE ARCHIVE"}</span>
          <h2 id="daily-challenge-title">
            {isFa ? "چالش‌های هفتگی طراحی" : "Weekly Design Challenges"}
          </h2>
          <p>
            {isFa
              ? "چالش این هفته را کامل ببینید، تمرین کنید و برای ایده گرفتن به چالش‌های قبلی سر بزنید."
              : "Explore this week’s full exercise, then browse previous challenges for more practice and inspiration."}
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <Card variant="tertiary" className="daily-challenge-card">
          <div className="daily-challenge-glow" aria-hidden="true" />
          <Card.Header className="daily-challenge-card-header">
            <div className="daily-challenge-icon" aria-hidden="true">
              <MedalStar size="26" color="currentColor" variant="Broken" />
            </div>
            <div className="daily-challenge-title-wrap">
              <div className="daily-challenge-eyebrow-row">
                <div className="daily-challenge-current-status">
                  <TickCircle size="15" color="currentColor" variant="Bold" />
                  {isFa ? "چالش این هفته" : "This week’s challenge"}
                </div>
                <span className="daily-challenge-category">
                  {challenge.category[language]}
                </span>
              </div>
              <Card.Title>{challenge.title[language]}</Card.Title>
              <div className="daily-challenge-meta">
                <span>
                  <Calendar size="15" color="currentColor" variant="Broken" />
                  {formattedDate}
                </span>
                <span>
                  <Clock size="15" color="currentColor" variant="Broken" />
                  {challenge.timebox[language]}
                </span>
                <span>{challenge.difficulty[language]}</span>
              </div>
            </div>
          </Card.Header>

          <Card.Content className="daily-challenge-content">
            <p className="daily-challenge-scenario">{challenge.scenario[language]}</p>
            <div className="daily-challenge-brief">
              <span>{isFa ? "چالش این هفته" : "This week’s challenge"}</span>
              <p>{challenge.challenge[language]}</p>
            </div>

            <div className="daily-challenge-columns">
              <div>
                <div className="daily-challenge-subtitle">
                  <TaskSquare size="18" color="currentColor" variant="Broken" />
                  <h3>{isFa ? "محدودیت‌ها" : "Constraints"}</h3>
                </div>
                <ul>
                  {challenge.constraints[language].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div>
                <div className="daily-challenge-subtitle">
                  <TickCircle size="18" color="currentColor" variant="Broken" />
                  <h3>{isFa ? "خروجی تمرین" : "Deliverables"}</h3>
                </div>
                <ul>
                  {challenge.deliverables[language].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="daily-challenge-footer">
              <div className="daily-challenge-hint">
                <LampOn size="19" color="currentColor" variant="Broken" />
                <p>
                  <strong>{isFa ? "راهنمای شروع: " : "Starting hint: "}</strong>
                  {challenge.hint[language]}
                </p>
              </div>
              <Button variant="outline" className="daily-challenge-copy" onPress={copyChallenge}>
                {isCopied ? (
                  <TickCircle size="18" color="currentColor" variant="Bold" />
                ) : (
                  <Copy size="18" color="currentColor" variant="Broken" />
                )}
                {isCopied
                  ? isFa ? "کپی شد" : "Copied"
                  : isFa ? "کپی تمرین" : "Copy challenge"}
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Reveal>
    </section>
  );
};

export default DailyDesignChallenge;
