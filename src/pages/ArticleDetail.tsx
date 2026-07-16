import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "iconsax-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getArticleBySlug, type ArticleBlock } from "../content/articles";
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
          <img src={block.src} alt={block.alt} loading="lazy" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "gallery":
      return (
        <div className="article-gallery">
          {block.images.map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} loading="lazy" />
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
  const article = getArticleBySlug(slug);

  useEffect(() => {
    if (!article) return;
    const previousTitle = document.title;
    document.title = `${article.title} · Foad Moghaddasi`;
    return () => {
      document.title = previousTitle;
    };
  }, [article]);

  if (!article) {
    return (
      <main className="articles-page article-not-found" dir="ltr">
        <Navbar />
        <div>
          <span>404</span>
          <h1>مقاله پیدا نشد</h1>
          <Link to="/articles">بازگشت به مقاله‌ها</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="articles-page" dir={article.direction}>
      <Navbar />

      <article className="article-detail">
        <header className="article-detail-header">
          <Link
            to="/articles"
            className="article-back-link"
            aria-label="بازگشت به مقاله‌ها"
            title="بازگشت به مقاله‌ها"
          >
            <ArrowRight size="20" color="currentColor" variant="Broken" />
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
          <img src={article.cover} alt="" />
        </figure>

        <div className="article-content">
          {article.content.map((block, index) => (
            <ArticleContentBlock key={`${block.type}-${index}`} block={block} />
          ))}
        </div>

        <footer className="article-end">
          <span>ممنون که مطالعه کردید.</span>
          <Link to="/articles">مشاهده مقاله‌های بیشتر ←</Link>
        </footer>
      </article>

      <div className="articles-footer">
        <Footer />
      </div>
    </main>
  );
};

export default ArticleDetail;
