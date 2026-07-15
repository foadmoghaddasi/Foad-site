import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@heroui/react/card";
import { SearchNormal1 } from "iconsax-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import { articles } from "../content/articles";
import "./Articles.css";

const ALL_CATEGORIES = "همه";

const normalizeSearchText = (value: string) =>
  value
    .toLocaleLowerCase("fa")
    .replaceAll("ي", "ی")
    .replaceAll("ك", "ک")
    .replace(/[\u200c\u200f\u202a-\u202e]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getArticleSearchText = (article: (typeof articles)[number]) => {
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
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);
  const categories = useMemo(
    () => [ALL_CATEGORIES, ...new Set(articles.map((article) => article.category))],
    [],
  );
  const normalizedQuery = normalizeSearchText(query);
  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const matchesCategory =
          activeCategory === ALL_CATEGORIES ||
          article.category === activeCategory;
        const matchesQuery =
          normalizedQuery.length === 0 ||
          getArticleSearchText(article).includes(normalizedQuery);
        return matchesCategory && matchesQuery;
      }),
    [activeCategory, normalizedQuery],
  );
  const isFiltering =
    normalizedQuery.length > 0 || activeCategory !== ALL_CATEGORIES;
  const featured = isFiltering ? undefined : filteredArticles[0];
  const rest = isFiltering ? filteredArticles : filteredArticles.slice(1);

  return (
    <main className="articles-page" dir="rtl">
      <Navbar />

      <section className="articles-hero">
        <Reveal>
          <span className="articles-overline">مقاله‌ها و یادداشت‌ها</span>
          <h1>ایده‌هایی برای به اشتراک گذاشتن.</h1>
          <p>
            یادداشت‌هایی درباره طراحی محصول، سیستم‌های طراحی، همکاری تیمی و
            تصمیم‌هایی که تجربه‌های دیجیتال بهتری می‌سازند.
          </p>
        </Reveal>
      </section>

      <section className="articles-shell" aria-label="Articles">
        <div className="article-discovery" dir="rtl">
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
              placeholder="جست‌وجو در عنوان و متن مقاله‌ها..."
              aria-label="جست‌وجوی مقاله‌ها"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="پاک کردن جست‌وجو"
              >
                ×
              </button>
            )}
            <span>{filteredArticles.length} مقاله</span>
          </div>

          <div className="article-category-scroll" aria-label="دسته‌بندی مقاله‌ها">
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
              dir="rtl"
            >
              <Card variant="default" className="article-featured-card">
                <div className="article-featured-image">
                  <img src={featured.cover} alt="" />
                </div>
                <Card.Content
                  className="article-featured-copy"
                  dir="rtl"
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
                dir="rtl"
              >
                <Card variant="default" className="article-card">
                  <div className="article-card-image">
                    <img src={article.cover} alt="" loading="lazy" />
                  </div>
                  <Card.Content
                    className="article-card-body"
                    dir="rtl"
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
          <div className="articles-empty-state" dir="rtl">
            <span>نتیجه‌ای پیدا نشد</span>
            <p>عبارت دیگری جست‌وجو کن یا دسته‌بندی را تغییر بده.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveCategory(ALL_CATEGORIES);
              }}
            >
              نمایش همه مقاله‌ها
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
