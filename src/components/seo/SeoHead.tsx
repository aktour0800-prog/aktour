import { useEffect } from "react";

type JsonLd = Record<string, unknown>;

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string;
  jsonLd?: JsonLd[];
}

const SITE_URL = "https://alaskatrip.co.kr";
const DEFAULT_IMAGE = "/alaska-mobile/hero-1.webp";

const upsertMetaByName = (name: string, content: string) => {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const upsertMetaByProperty = (property: string, content: string) => {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const SeoHead = ({ title, description, path, image, keywords, jsonLd = [] }: SeoHeadProps) => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;
    const imageUrl = image ? `${SITE_URL}${image}` : `${SITE_URL}${DEFAULT_IMAGE}`;

    document.title = title;

    upsertMetaByName("description", description);
    upsertMetaByName("robots", "index, follow");
    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", description);
    upsertMetaByName("twitter:image", imageUrl);

    if (keywords) {
      upsertMetaByName("keywords", keywords);
    }

    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:locale", "ko_KR");
    upsertMetaByProperty("og:site_name", "AlaskaTrip");
    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", imageUrl);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    document
      .querySelectorAll("script[data-seo-jsonld='true']")
      .forEach((node) => node.parentNode?.removeChild(node));

    for (const block of jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonld = "true";
      script.text = JSON.stringify(block);
      document.body.appendChild(script);
    }

    return () => {
      document
        .querySelectorAll("script[data-seo-jsonld='true']")
        .forEach((node) => node.parentNode?.removeChild(node));
    };
  }, [title, description, path, image, keywords, jsonLd]);

  return null;
};

export default SeoHead;

