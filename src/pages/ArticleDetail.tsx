import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "iconsax-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getArticleBySlug, type ArticleBlock } from "../content/articles";
import { useLanguage } from "../context/LanguageContext";
import SEO, { SITE_URL } from "../components/SEO";
import "./Articles.css";

const ArticleContentBlock = ({ block }: { block: ArticleBlock }) => {
  switch (block.type) {
    case "paragraph":
      return <p className="article-paragraph">{block.text}</p>;
    case "heading": {
      const Heading = block.level === 3 ? "h3" : "h2";
      return <Heading className="article-content-heading">{block.text}</Heading>;
    }
    case "quote":
      return (
        <blockquote className="article-quote">
          <p>{block.text}</p>
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );
    case "image":
      return (
        <figure className={`article-figure ${block.wide ? "is-wide" : ""}`}>
          <img src={block.src} alt={block.alt} loading="lazy" decoding="async" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "gallery":
      return (
        <div className="article-gallery">
          {block.images.map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List className="article-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      );
    }
    case "divider":
      return <hr className="article-divider" />;
  }
};

const ArticleDetail = () => {
  const { slug } = useParams();
  const { language, isFa, direction } = useLanguage();
  const article = getArticleBySlug(slug, language);

  if (!article) {
    return (
      <main className="articles-page article-not-found" dir={direction}>
        <SEO
          title={isFa ? "مقاله پیدا نشد | فؤاد مقدسی" : "Article Not Found | Foad Moghaddasi"}
          description={isFa ? "این مقاله پیدا نشد." : "This article could not be found."}
          path={`/articles/${slug ?? ""}${isFa ? "?lang=fa" : ""}`}
          noindex
        />
        <Navbar />
        <div>
          <span>404</span>
          <h1>{isFa ? "مقاله پیدا نشد" : "Article not found"}</h1>
          <Link to="/articles">
            {isFa ? "بازگشت به مقاله‌ها" : "Back to articles"}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="articles-page" dir={article.direction}>
      <SEO
        title={`${article.title} | ${isFa ? "فؤاد مقدسی" : "Foad Moghaddasi"}`}
        description={article.excerpt}
        path={`/articles/${article.slug}${isFa ? "?lang=fa" : ""}`}
        image={article.cover}
        imageAlt={article.title}
        type="article"
        locale={isFa ? "fa_IR" : "en_US"}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          image: new URL(article.cover, SITE_URL).toString(),
          mainEntityOfPage: `${SITE_URL}/articles/${article.slug}${isFa ? "?lang=fa" : ""}`,
          inLanguage: isFa ? "fa" : "en",
          author: {
            "@type": "Person",
            "@id": `${SITE_URL}/#foad-moghaddasi`,
            name: "Foad Moghaddasi",
            alternateName: ["فؤاد مقدسی", "فواد مقدسی"],
            url: `${SITE_URL}/`,
          },
        }}
      />
      <Navbar />

      <article className="article-detail">
        <header className="article-detail-header">
          <Link
            to="/articles"
            className="article-back-link"
            aria-label={isFa ? "بازگشت به مقاله‌ها" : "Back to articles"}
            title={isFa ? "بازگشت به مقاله‌ها" : "Back to articles"}
          >
            {isFa ? (
              <ArrowRight size="20" color="currentColor" variant="Broken" />
            ) : (
              <ArrowLeft size="20" color="currentColor" variant="Broken" />
            )}
          </Link>
          <h1>{article.title}</h1>
          <p>{article.excerpt}</p>
          <div className="article-detail-meta">
            <span>{article.publishedAt}</span>
            <i />
            <span>{article.readingTime}</span>
          </div>
        </header>

        <figure className="article-cover">
          <img src={article.cover} alt="" loading="eager" fetchPriority="high" decoding="async" />
        </figure>

        <div className="article-content">
          {article.content.map((block, index) => (
            <ArticleContentBlock key={`${block.type}-${index}`} block={block} />
          ))}
        </div>

        <footer className="article-end">
          <span>
            {isFa ? "ممنون که مطالعه کردید." : "Thanks for reading."}
          </span>
          <Link to="/articles">
            {isFa ? "مشاهده مقاله‌های بیشتر ←" : "Read more articles →"}
          </Link>
        </footer>
      </article>

      <div className="articles-footer">
        <Footer />
      </div>
    </main>
  );
};

export default ArticleDetail;
