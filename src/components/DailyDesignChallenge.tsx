import { useEffect, useMemo, useState } from "react";
import { Button } from "@heroui/react/button";
import { Card } from "@heroui/react/card";
import {
  Calendar,
  Clock,
  Copy,
  LampOn,
  MagicStar,
  TaskSquare,
  TickCircle,
} from "iconsax-react";
import challenge from "../content/daily-challenge.json";
import { useLanguage } from "../context/LanguageContext";
import Reveal from "./Reveal";
import "./DailyDesignChallenge.css";

const DailyDesignChallenge = () => {
  const { isFa, direction } = useLanguage();
  const language = isFa ? "fa" : "en";
  const [isCopied, setIsCopied] = useState(false);

  const formattedDate = useMemo(() => {
    const date = new Date(`${challenge.date}T12:00:00Z`);
    return new Intl.DateTimeFormat(
      isFa ? "fa-IR-u-ca-persian" : "en-US",
      { year: "numeric", month: "long", day: "numeric" },
    ).format(date);
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

  return (
    <section
      className="daily-challenge-section"
      dir={direction}
      aria-labelledby="daily-challenge-title"
    >
      <Reveal className="daily-challenge-heading">
        <div>
          <span>{isFa ? "تمرین روزانه طراحی" : "DAILY DESIGN CHALLENGE"}</span>
          <h2 id="daily-challenge-title">
            {isFa ? "هر روز، یک مسئله تازه" : "One fresh problem, every day"}
          </h2>
          <p>
            {isFa
              ? "یک تمرین کوتاه برای تقویت حل مسئله، تصمیم‌گیری و مهارت طراحی محصول."
              : "A focused exercise for sharpening product thinking, problem-solving, and design decisions."}
          </p>
        </div>
        <div className="daily-challenge-ai-badge">
          <MagicStar size="16" color="currentColor" variant="Bold" />
          <span>{isFa ? "ساخته‌شده با هوش مصنوعی" : "AI-generated"}</span>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <Card variant="tertiary" className="daily-challenge-card">
          <div className="daily-challenge-glow" aria-hidden="true" />
          <Card.Header className="daily-challenge-card-header">
            <div className="daily-challenge-icon" aria-hidden="true">
              <MagicStar size="26" color="currentColor" variant="Broken" />
            </div>
            <div className="daily-challenge-title-wrap">
              <span>{challenge.category[language]}</span>
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
              <span>{isFa ? "چالش امروز" : "Today’s challenge"}</span>
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
