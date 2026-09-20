import { useEffect } from 'react';
import { useLang } from '../../context/LanguageContext';

const DEFAULT_ORIGIN = 'https://01group.online';
const DEFAULT_IMAGE = 'https://01group.online/og-image-v2.png';

const FALLBACK_METADATA = {
  ar: {
    title: '01Group | للحلول الرقمية وتطوير المواقع والتطبيقات',
    description: 'شريكك التقني لتصميم وتطوير مواقع ومنصات ويب سريعة، وحلول سحابية ذكية متفصلة لنمو أعمالك ومبيعاتك.'
  },
  en: {
    title: '01Group | Digital Solutions & Web Engineering',
    description: 'Partner with 01Group for cutting-edge websites, high-performance web platforms, and smart cloud architectures engineered for rapid growth.'
  }
};

function updateMetaTag(attributeName, attributeValue, content) {
  if (content === undefined || content === null) return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateLinkTag(rel, href) {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function updateJsonLd(schemaData) {
  let script = document.getElementById('json-ld-schema');
  if (schemaData) {
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = typeof schemaData === 'string' 
      ? schemaData 
      : JSON.stringify(schemaData, null, 2);
  } else if (script) {
    script.remove();
  }
}

/**
 * Reusable, zero-dependency SEO head management component.
 * Dynamically updates document.title, Open Graph, Twitter Cards, Canonical links,
 * language attributes, and JSON-LD structured data on route transitions.
 */
export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_IMAGE,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  jsonLd = null,
  lang: propLang
}) {
  const langContext = useLang();
  const currentLang = propLang || langContext?.lang || 'ar';
  const fallback = FALLBACK_METADATA[currentLang] || FALLBACK_METADATA.ar;

  const finalTitle = title || fallback.title;
  const finalDescription = description || fallback.description;

  // Compute canonical URL safely
  let finalCanonical = canonical;
  if (!finalCanonical) {
    if (typeof window !== 'undefined') {
      finalCanonical = `${window.location.origin}${window.location.pathname}`;
    } else {
      finalCanonical = `${DEFAULT_ORIGIN}/`;
    }
  }

  useEffect(() => {
    // 1. Page Title & Language Attributes
    document.title = finalTitle;
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    // 2. Standard Meta Tags
    updateMetaTag('name', 'description', finalDescription);

    // 3. Canonical Link
    updateLinkTag('canonical', finalCanonical);

    // 4. Open Graph Protocol
    updateMetaTag('property', 'og:title', finalTitle);
    updateMetaTag('property', 'og:description', finalDescription);
    updateMetaTag('property', 'og:url', finalCanonical);
    updateMetaTag('property', 'og:type', ogType);
    updateMetaTag('property', 'og:image', ogImage);
    updateMetaTag('property', 'og:site_name', '01Group');
    updateMetaTag('property', 'og:locale', currentLang === 'ar' ? 'ar_EG' : 'en_US');

    // 5. Twitter Cards
    updateMetaTag('name', 'twitter:card', twitterCard);
    updateMetaTag('name', 'twitter:title', finalTitle);
    updateMetaTag('name', 'twitter:description', finalDescription);
    updateMetaTag('name', 'twitter:url', finalCanonical);
    updateMetaTag('name', 'twitter:image', ogImage);

    // 6. Structured JSON-LD Schema
    updateJsonLd(jsonLd);

    // Cleanup JSON-LD on unmount if specific to this view
    return () => {
      if (jsonLd) {
        const script = document.getElementById('json-ld-schema');
        if (script) script.remove();
      }
    };
  }, [
    finalTitle,
    finalDescription,
    finalCanonical,
    ogImage,
    ogType,
    twitterCard,
    jsonLd,
    currentLang
  ]);

  return null;
}
