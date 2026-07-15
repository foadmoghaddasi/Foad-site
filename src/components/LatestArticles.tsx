import { Card } from "@heroui/react/card";
import { ArrowLeft } from "iconsax-react";
import { Link } from "react-router-dom";
import { articles } from "../content/articles";
import Reveal from "./Reveal";
import "./LatestArticles.css";

const LatestArticles = () => {
  const latestArticles = articles.slice(0, 2);

  return (
    <section
      className="latest-articles-section"
      dir="rtl"
      aria-labelledby="latest-articles-title"
    >
      <Reveal className="latest-articles-heading">
        <div>
          <span>تازه‌های مجله</span>
          <h2 id="latest-articles-title">آخرین مقاله‌ها</h2>
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
              aria-label={`مطالعه مقاله: ${article.title}`}
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
          مشاهده همه مقاله‌ها
          <ArrowLeft size="18" color="currentColor" variant="Broken" />
        </Link>
      </Reveal>
    </section>
  );
};

export default LatestArticles;
