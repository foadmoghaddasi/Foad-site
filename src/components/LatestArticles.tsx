import { Card } from "@heroui/react/card";
import { ArrowLeft } from "iconsax-react";
import { Link } from "react-router-dom";
import { getArticles } from "../content/articles";
import Reveal from "./Reveal";
import "./LatestArticles.css";
import { useLanguage } from "../context/LanguageContext";

const LatestArticles = () => {
  const { language, isFa, direction } = useLanguage();
  const latestArticles = getArticles(language).slice(0, 2);

  return (
    <section
      className="latest-articles-section"
      dir={direction}
      aria-labelledby="latest-articles-title"
    >
      <Reveal className="latest-articles-heading">
        <div>
          <span>{isFa ? "تازه‌های مجله" : "FROM THE JOURNAL"}</span>
          <h2 id="latest-articles-title">
            {isFa ? "آخرین مقاله‌ها" : "Latest articles"}
          </h2>
        </div>
      </Reveal>

      <div
        className={`latest-articles-grid${latestArticles.length === 1 ? " has-one" : ""}`}
      >
        {latestArticles.map((article, index) => (
          <Reveal
            key={article.slug}
            delay={index * 70}
            className="latest-article-reveal"
          >
            <Link
              to={`/articles/${article.slug}`}
              className="latest-article-link"
              aria-label={`${isFa ? "مطالعه مقاله" : "Read article"}: ${article.title}`}
            >
              <Card variant="default" className="latest-article-card">
                <div className="latest-article-image">
                  <img src={article.cover} alt="" loading="lazy" />
                </div>
                <Card.Content className="latest-article-copy">
                  <span>{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="latest-article-meta">
                    <span>{article.publishedAt}</span>
                    <i aria-hidden="true" />
                    <span>{article.readingTime}</span>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal className="latest-articles-action">
        <Link to="/articles" className="latest-articles-all">
          {isFa ? "مشاهده همه مقاله‌ها" : "View all articles"}
          <ArrowLeft size="18" color="currentColor" variant="Broken" />
        </Link>
      </Reveal>
    </section>
  );
};

export default LatestArticles;
