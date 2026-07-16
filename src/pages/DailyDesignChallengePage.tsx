import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DailyDesignChallenge from "../components/DailyDesignChallenge";
import { useLanguage } from "../context/LanguageContext";

const DailyDesignChallengePage = () => {
  const { isFa, direction } = useLanguage();

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
      <DailyDesignChallenge variant="full" />
      <div className="daily-challenge-page-footer">
        <Footer />
      </div>
    </main>
  );
};

export default DailyDesignChallengePage;
