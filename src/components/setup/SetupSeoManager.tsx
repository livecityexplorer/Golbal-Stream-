import React, { useEffect } from 'react';
import { DetailedSetupGuide } from '../../types';

interface SetupSeoManagerProps {
  guide?: DetailedSetupGuide;
  isHub?: boolean;
}

export const SetupSeoManager: React.FC<SetupSeoManagerProps> = ({ guide, isHub }) => {
  useEffect(() => {
    const originalTitle = document.title;
    const scriptId = 'dynamic-setup-schema-jsonld';
    const baseUrl = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://globalstreamhub.net';

    // Remove any previous schema script
    const prevScript = document.getElementById(scriptId);
    if (prevScript) prevScript.remove();

    if (guide && !isHub) {
      // 1. DEDICATED PLAYER & DEVICE GUIDE SEO
      const pageTitle = `${guide.title} (2026 Tutorial) | GlobalStreamHub 4K VIP`;
      const metaDescription = `${guide.summary} Step-by-step setup guide for ${guide.deviceCategoryLabel} using ${guide.playerName}. Verified Downloader codes, Xtream Codes API, and 4K 60FPS sports configuration.`;
      const canonicalUrl = `${baseUrl}/setup/${guide.slug}`;

      document.title = pageTitle;

      // Canonical link
      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.rel = 'canonical';
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.href = canonicalUrl;

      // Meta Description
      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = metaDescription;

      // Open Graph Tags
      const setMetaTag = (property: string, content: string) => {
        let tag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.content = content;
      };

      setMetaTag('og:title', pageTitle);
      setMetaTag('og:description', metaDescription);
      setMetaTag('og:url', canonicalUrl);
      setMetaTag('og:type', 'article');
      setMetaTag('og:site_name', 'GlobalStreamHub 4K IPTV Setup Hub');

      // Twitter Cards
      const setTwitterTag = (name: string, content: string) => {
        let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.content = content;
      };

      setTwitterTag('twitter:card', 'summary_large_image');
      setTwitterTag('twitter:title', pageTitle);
      setTwitterTag('twitter:description', metaDescription);

      // JSON-LD Schemas: HowTo + FAQPage + BreadcrumbList
      const script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');

      const howToSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "HowTo",
            "@id": `${canonicalUrl}#howto`,
            "name": guide.title,
            "description": guide.summary,
            "totalTime": guide.timeEstimate === '30 Secs' ? 'PT30S' : guide.timeEstimate === '1 Min' ? 'PT1M' : 'PT3M',
            "estimatedCost": {
              "@type": "MonetaryAmount",
              "currency": "GBP",
              "value": "0"
            },
            "tool": [
              {
                "@type": "HowToTool",
                "name": guide.playerName
              },
              {
                "@type": "HowToTool",
                "name": guide.deviceCategoryLabel
              }
            ],
            "supply": [
              {
                "@type": "HowToSupply",
                "name": "GlobalStreamHub 4K IPTV Subscription or 24h Free VIP Trial"
              }
            ],
            "step": guide.steps.map((step, idx) => ({
              "@type": "HowToStep",
              "position": idx + 1,
              "name": step.title,
              "text": step.description,
              "url": `${canonicalUrl}#step-${step.stepNumber}`
            }))
          },
          ...(guide.faqs && guide.faqs.length > 0 ? [{
            "@type": "FAQPage",
            "@id": `${canonicalUrl}#faq`,
            "mainEntity": guide.faqs.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          }] : []),
          {
            "@type": "BreadcrumbList",
            "@id": `${canonicalUrl}#breadcrumb`,
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${baseUrl}/`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Setup Guides Hub",
                "item": `${baseUrl}/setup`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": guide.deviceCategoryLabel,
                "item": `${baseUrl}/setup#${guide.deviceCategory}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": guide.shortTitle,
                "item": canonicalUrl
              }
            ]
          }
        ]
      };

      script.textContent = JSON.stringify(howToSchema);
      document.head.appendChild(script);

    } else {
      // 2. HUB OVERVIEW SEO
      const hubTitle = "IPTV Setup Guides & Downloader Codes (2026 Directory) | GlobalStreamHub 4K";
      const hubDesc = "Complete 2026 Step-by-Step IPTV Setup Guides for FireStick, Android TV, Smart TV, Apple TV 4K, Formuler MAG & PC. Instant Downloader shortcodes, Xtream Codes, and UK ISP anti-block settings.";
      const canonicalUrl = `${baseUrl}/setup`;

      document.title = hubTitle;

      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonicalTag) canonicalTag.href = canonicalUrl;

      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDesc) metaDesc.content = hubDesc;

      const script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');

      const hubSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": hubTitle,
        "description": hubDesc,
        "url": canonicalUrl,
        "publisher": {
          "@type": "Organization",
          "name": "GlobalStreamHub 4K IPTV",
          "url": baseUrl
        }
      };

      script.textContent = JSON.stringify(hubSchema);
      document.head.appendChild(script);
    }

    return () => {
      document.title = originalTitle;
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [guide, isHub]);

  return null;
};
