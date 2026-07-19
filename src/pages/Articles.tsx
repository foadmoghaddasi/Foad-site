import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@heroui/react/card";
import { SearchNormal1 } from "iconsax-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { getArticlesNewestFirst, type Article } from "../content/articles";
import { useLanguage } from "../context/LanguageContext";
import SEO from "../components/SEO";
import "./Articles.css";

const normalizeSearchText = (value: string) =>
  value
    .toLocaleLowerCase("fa")
    .replaceAll("ي", "ی")
    .replaceAll("ك", "ک")
    .replace(/[\u200c\u200f\u202a-\u202e]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getArticleSearchText = (article: Article) => {
  const contentText = article.content
    .flatMap((block) => {
      if (block.type === "divider") return [];
      if (block.type === "list") return block.items;
      if (block.type === "image") {
        return [block.alt, block.caption ?? ""];
      }
      if (block.type === "gallery") {
        return block.images.flatMap((image) => [
          image.alt,
          image.caption ?? "",
        ]);
      }
      if (block.type === "quote") {
        return [block.text, block.cite ?? ""];
      }
      return [block.text];
    })
    .join(" ");

  return normalizeSearchText(
    `${article.title} ${article.excerpt} ${article.category} ${contentText}`,
  );
};

const Articles = () => {
  const { language, isFa, direction } = useLanguage();
  const articles = getArticlesNewestFirst(language);
  const allCategories = isFa ? "همه" : "All";
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(allCategories);

  useEffect(() => {
    setQuery("");
    setActiveCategory(allCategories);
  }, [allCategories]);

  const categories = useMemo(
    () => [allCategories, ...new Set(articles.map((article) => article.category))],
    [allCategories, articles],
  );
  const normalizedQuery = normalizeSearchText(query);
  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const matchesCategory =
          activeCategory === allCategories ||
          article.category === activeCategory;
        const matchesQuery =
          normalizedQuery.length === 0 ||
          getArticleSearchText(article).includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      }),
    [activeCategory, allCategories, articles, normalizedQuery],
  );
  const isFiltering =
    normalizedQuery.length > 0 || activeCategory !== allCategories;
  const featured = isFiltering ? undefined : filteredArticles[0];
  const rest = isFiltering ? filteredArticles : filteredArticles.slice(1);

  return (
    <main className="articles-page" dir={direction}>
      <SEO
        title={isFa ? "مقاله‌های طراحی محصول و UI/UX | فؤاد مقدسی" : "Product Design & UI/UX Articles | Foad Moghaddasi"}
        description={
          isFa
            ? "مقاله‌ها و یادداشت‌های فؤاد مقدسی درباره طراحی محصول، UI/UX، دیزاین سیستم، تحقیق کاربر و همکاری طراح و توسعه‌دهنده."
            : "Articles by Foad Moghaddasi about Product Design, UI/UX, design systems, user research, and designer-developer collaboration."
        }
        path={isFa ? "/articles?lang=fa" : "/articles"}
        locale={isFa ? "fa_IR" : "en_US"}
      />
      <Navbar />

      <section className="articles-hero">
        <Reveal>
          <span className="articles-overline">
            {isFa ? "مقاله‌ها و یادداشت‌ها" : "ARTICLES & NOTES"}
          </span>
          <h1>
            {isFa ? "ایده‌هایی برای به اشتراک گذاشتن" : "Ideas worth sharing"}
          </h1>
          <p>
            {isFa
              ? "یادداشت‌هایی درباره طراحی محصول، سیستم‌های طراحی، همکاری تیمی و تصمیم‌هایی که تجربه‌های دیجیتال بهتری می‌سازند."
              : "Notes on product design, design systems, teamwork, and the decisions that shape better digital experiences."}
          </p>
        </Reveal>
      </section>

      <section
        className="articles-shell"
        aria-label={isFa ? "مقاله‌ها" : "Articles"}
      >
        <div className="article-discovery" dir={direction}>
          <div className="article-search-box">
            <SearchNormal1
              size="22"
              color="currentColor"
              variant="Broken"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                isFa
                  ? "جست‌وجو در عنوان و متن مقاله‌ها..."
                  : "Search article titles and content..."
              }
              aria-label={isFa ? "جست‌وجوی مقاله‌ها" : "Search articles"}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={isFa ? "پاک کردن جست‌وجو" : "Clear search"}
              >
                ×
              </button>
            )}
            <span>
              {filteredArticles.length} {isFa ? "مقاله" : "articles"}
            </span>
          </div>

          <div
            className="article-category-scroll"
            aria-label={isFa ? "دسته‌بندی مقاله‌ها" : "Article categories"}
          >
            <div className="article-category-list">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={activeCategory === category ? "is-active" : ""}
                  aria-pressed={activeCategory === category}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {featured && (
          <Reveal>
            <Link
              to={`/articles/${featured.slug}`}
              className="article-card-link"
              dir={direction}
            >
              <Card variant="default" className="article-featured-card">
                <div className="article-featured-image">
                  <img src={featured.cover} alt="" loading="eager" fetchPriority="high" decoding="async" />
                </div>
                <Card.Content
                  className="article-featured-copy"
                  dir={direction}
                >
                  <span>{featured.category}</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <div className="article-card-meta">
                    <span>{featured.publishedAt}</span>
                    <i />
                    <span>{featured.readingTime}</span>
                  </div>
                </Card.Content>
              </Card>
            </Link>
          </Reveal>
        )}

        <div className="articles-grid">
          {rest.map((article, index) => (
            <Reveal key={article.slug} delay={index * 70} className="article-card-reveal">
              <Link
                to={`/articles/${article.slug}`}
                className="article-card-link"
                dir={direction}
              >
                <Card variant="default" className="article-card">
                  <div className="article-card-image">
                    <img src={article.coverThumb ?? article.cover} alt="" loading="lazy" decoding="async" />
                  </div>
                  <Card.Content
                    className="article-card-body"
                    dir={direction}
                  >
                    <span>{article.category}</span>
                    <h2>{article.title}</h2>
                    <p>{article.excerpt}</p>
                    <div className="article-card-meta">
                      <span>{article.publishedAt}</span>
                      <i />
                      <span>{article.readingTime}</span>
                    </div>
                  </Card.Content>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="articles-empty-state" dir={direction}>
            <span>{isFa ? "نتیجه‌ای پیدا نشد" : "No results found"}</span>
            <p>
              {isFa
                ? "عبارت دیگری جست‌وجو کن یا دسته‌بندی را تغییر بده."
                : "Try another search term or choose a different category."}
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory(allCategories);
              }}
            >
              {isFa ? "نمایش همه مقاله‌ها" : "Show all articles"}
            </button>
          </div>
        )}
      </section>

      <div className="articles-footer">
        <Footer />
      </div>
    </main>
  );
};

export default Articles;
