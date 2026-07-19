import { useEffect } from "react";

export const SITE_URL = "https://foadmoghaddasi.com";
const DEFAULT_IMAGE = `${SITE_URL}/fm-logo.png`;

type StructuredData = Record<string, unknown> | Record<string, unknown>[];

type SEOProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "profile";
  locale?: "fa_IR" | "en_US";
  noindex?: boolean;
  structuredData?: StructuredData;
};

const absoluteUrl = (value: string) => {
  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return value;
  }
};

const setMeta = (
  selector: string,
  attribute: "name" | "property",
  value: string,
  content: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.content = content;
};

const setLanguageAlternate = (language: string, href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>(
    `link[rel="alternate"][hreflang="${language}"]`,
  );
  if (!link) {
    link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = language;
    document.head.appendChild(link);
  }
  link.href = href;
};

const SEO = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  imageAlt = "Foad Moghaddasi",
  type = "website",
  locale = "en_US",
  noindex = false,
  structuredData,
}: SEOProps) => {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);
    const socialImage = absoluteUrl(image);
    const robots = noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.title = title;
    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[name="author"]', "name", "author", "Foad Moghaddasi");
    setMeta('meta[name="robots"]', "name", "robots", robots);

    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Foad Moghaddasi");
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", socialImage);
    setMeta('meta[property="og:image:alt"]', "property", "og:image:alt", imageAlt);
    setMeta('meta[property="og:locale"]', "property", "og:locale", locale);

    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", socialImage);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    const englishUrl = new URL(canonicalUrl);
    englishUrl.searchParams.delete("lang");
    const persianUrl = new URL(englishUrl);
    persianUrl.searchParams.set("lang", "fa");
    setLanguageAlternate("en", englishUrl.toString());
    setLanguageAlternate("fa", persianUrl.toString());
    setLanguageAlternate("x-default", englishUrl.toString());

    const existingScript = document.getElementById("seo-structured-data");
    if (!structuredData) {
      existingScript?.remove();
      return;
    }

    const script = existingScript ?? document.createElement("script");
    script.id = "seo-structured-data";
    script.setAttribute("type", "application/ld+json");
    script.textContent = JSON.stringify(structuredData);
    if (!script.isConnected) document.head.appendChild(script);
  }, [description, image, imageAlt, locale, noindex, path, structuredData, title, type]);

  return null;
};

export default SEO;
