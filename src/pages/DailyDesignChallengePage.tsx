import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@heroui/react/card";
import { ArrowLeft, ArrowRight, Calendar, Clock, TickCircle } from "iconsax-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DailyDesignChallenge from "../components/DailyDesignChallenge";
import { useLanguage } from "../context/LanguageContext";
import currentChallenge from "../content/daily-challenge.json";
import historyData from "../content/daily-challenges-history.json";

type LocalizedText = { fa: string; en: string };

type ArchivedChallenge = {
  date: string;
  title?: LocalizedText;
  titleFa?: string;
  titleEn?: string;
  category?: LocalizedText;
  timebox?: LocalizedText;
  scenario?: LocalizedText;
};

const DailyDesignChallengePage = () => {
  const { isFa, direction, language } = useLanguage();
  const archivedChallenges = (historyData as ArchivedChallenge[])
    .filter((item) => {
      const titleEn = item.title?.en ?? item.titleEn;
      return !(item.date === currentChallenge.date && titleEn === currentChallenge.title.en);
    })
    .slice()
    .reverse();

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat(isFa ? "fa-IR-u-ca-persian" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(`${value}T12:00:00Z`));

  useEffect(() => {
    const previousTitle = document.title;
    document.title = isFa
      ? "چالش روزانه طراحی · فؤاد مقدسی"
      : "Daily Design Challenge · Foad Moghaddasi";

    return () => {
      document.title = previousTitle;
    };
  }, [isFa]);

  return (
    <main className="daily-challenge-page" dir={direction}>
      <Navbar />
      <div className="daily-challenge-page-navigation">
        <Link
          to="/"
          className="daily-challenge-back"
          aria-label={isFa ? "بازگشت به صفحه اصلی" : "Back to home"}
          title={isFa ? "بازگشت" : "Back"}
        >
          {isFa ? (
            <ArrowRight size="20" color="currentColor" variant="Broken" />
          ) : (
            <ArrowLeft size="20" color="currentColor" variant="Broken" />
          )}
        </Link>
      </div>
      <DailyDesignChallenge variant="full" />

      <section className="daily-challenge-archive" aria-labelledby="challenge-archive-title">
        <header className="daily-challenge-archive-heading">
          <span>{isFa ? "آرشیو" : "ARCHIVE"}</span>
          <h2 id="challenge-archive-title">
            {isFa ? "چالش‌های قبلی" : "Previous challenges"}
          </h2>
          <p>
            {isFa
              ? "این چالش‌ها تمام شده‌اند، اما هنوز می‌توانید از آن‌ها برای تمرین و ایده گرفتن استفاده کنید."
              : "These challenges have ended, but you can still use them for practice and inspiration."}
          </p>
        </header>

        {archivedChallenges.length > 0 ? (
          <div className="daily-challenge-archive-grid">
            {archivedChallenges.map((item) => {
              const title = item.title?.[language] ?? (isFa ? item.titleFa : item.titleEn);
              const category = item.category?.[language];
              const timebox = item.timebox?.[language];
              const scenario = item.scenario?.[language];

              return (
                <Card
                  key={`${item.date}-${item.title?.en ?? item.titleEn}`}
                  variant="tertiary"
                  className="daily-challenge-archive-card"
                >
                  <Card.Header className="daily-challenge-archive-card-header">
                    <div className="daily-challenge-ended-badge">
                      <TickCircle size="15" color="currentColor" variant="Broken" />
                      {isFa ? "تمام‌شده" : "Ended"}
                    </div>
                    {category && <span>{category}</span>}
                    <Card.Title>{title}</Card.Title>
                  </Card.Header>
                  <Card.Content className="daily-challenge-archive-card-content">
                    {scenario && <p>{scenario}</p>}
                    <div className="daily-challenge-archive-meta">
                      <span>
                        <Calendar size="15" color="currentColor" variant="Broken" />
                        {formatDate(item.date)}
                      </span>
                      {timebox && (
                        <span>
                          <Clock size="15" color="currentColor" variant="Broken" />
                          {timebox}
                        </span>
                      )}
                    </div>
                  </Card.Content>
                </Card>
              );
            })}
          </div>
        ) : (
          <p className="daily-challenge-archive-empty">
            {isFa ? "اولین چالش در حال برگزاری است." : "The first challenge is currently active."}
          </p>
        )}
      </section>

      <div className="daily-challenge-page-footer">
        <Footer />
      </div>
    </main>
  );
};

export default DailyDesignChallengePage;
