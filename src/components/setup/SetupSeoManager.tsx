import React, { useEffect } from 'react';
import { DetailedSetupGuide } from '../../types';

interface SetupSeoManagerProps {
  guide?: DetailedSetupGuide;
  isHub?: boolean;
  hubSlug?: string;
}

const HUB_CATEGORY_SEO: Record<string, { title: string; description: string; name: string }> = {
  'firestick': {
    name: 'Amazon FireStick & Fire TV IPTV Setup Guides',
    title: 'Amazon FireStick 4K IPTV Setup Guide: CBR TV (2130837) & TiviMate | GlobalStreamHub',
    description: 'Step-by-step FireStick 4K Max, Fire TV Cube & Fire TV setup tutorials using official Downloader code 2130837 (CBR TV App), TiviMate, and IPTV Smarters Pro.'
  },
  'tivimate': {
    name: 'TiviMate IPTV Player Pro Setup Guides',
    title: 'TiviMate 4K IPTV Setup Guide & Downloader Code (289018) | GlobalStreamHub',
    description: 'Configure TiviMate IPTV Player Premium on FireStick, Android TV, and Nvidia Shield with Xtream Codes API, 7-day EPG, and multi-screen 4K sports playback.'
  },
  'smarters': {
    name: 'IPTV Smarters Pro Setup Guides',
    title: 'IPTV Smarters Pro Setup Guide for FireStick, Android, PC & Smart TV | GlobalStreamHub',
    description: 'Complete installation and login instructions for IPTV Smarters Pro across Amazon Fire TV, Android TV, Windows, macOS, and iOS.'
  },
  'smart-tv': {
    name: 'Samsung & LG Smart TV IPTV Setup Guides',
    title: 'Samsung Tizen & LG webOS Smart TV IPTV Setup: IBO Player & SmartOne | GlobalStreamHub',
    description: 'Direct Smart TV setup without a FireStick. Activate IBO Player Pro, SET IPTV, or Smart One IPTV on Samsung QLED and LG OLED TVs in 2 minutes.'
  },
  'apple-tv': {
    name: 'Apple TV 4K, iPhone & iPad IPTV Setup Guides',
    title: 'Apple TV 4K, iPhone & iPad IPTV Setup Guide: IPTVX & iMPlayer | GlobalStreamHub',
    description: 'Stream 4K 60FPS live sports and Dolby Vision VOD on Apple TV 4K, iPhone, and iPad using IPTVX, iMPlayer, Snapp UHD, and Smarters Lite.'
  },
  'android': {
    name: 'Android TV & Nvidia Shield IPTV Setup Guides',
    title: 'Android TV, Google TV & Nvidia Shield IPTV Setup (CBR TV 2130837) | GlobalStreamHub',
    description: 'Install CBR TV Official App (Downloader 2130837), TiviMate, and OTT Navigator on Nvidia Shield Pro, Chromecast with Google TV, Sony Bravia, and Xiaomi boxes.'
  },
  'pc-web': {
    name: 'Windows PC, Mac & WebTV Browser Setup Guides',
    title: 'PC, Mac & Web Browser 4K IPTV Setup Guide: CBR TV Desktop & VLC | GlobalStreamHub',
    description: 'Download CBR TV Desktop for Windows, macOS, and Linux, or watch 18,500+ channels directly in Chrome, Edge, Safari, and VLC Player.'
  },
  'formuler-mag': {
    name: 'Formuler (MOL3) & MAG Box Stalker Portal Guides',
    title: 'Formuler Z11 MyTVOnline 3 & MAG Box Stalker Portal IPTV Setup | GlobalStreamHub',
    description: 'Connect Formuler Z11 Pro Max (MOL3) and MAG 524/424/322 set-top boxes with hardware Stalker Portal MAC registration and 4K catch-up.'
  }
};

export const SetupSeoManager: React.FC<SetupSeoManagerProps> = ({ guide, isHub, hubSlug }) => {
  useEffect(() => {
    const originalTitle = document.title;
    const scriptId = 'dynamic-setup-schema-jsonld';
    const baseUrl = 'https://globalstreamhub.net';

    // Remove any previous schema script
    const prevScript = document.getElementById(scriptId);
    if (prevScript) prevScript.remove();

    if (guide && !isHub) {
      // 1. DEDICATED PLAYER & DEVICE GUIDE SEO
      const pageTitle = `${guide.title} (2026 Tutorial) | GlobalStreamHub 4K VIP`;
      const metaDescription = `${guide.summary} Step-by-step setup guide for ${guide.deviceCategoryLabel} using ${guide.playerName}. Verified Downloader codes, Xtream Codes API, and 4K 60FPS sports configuration.`;
      const canonicalUrl = `${baseUrl}/setup/${guide.slug}/`;

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
                "item": `${baseUrl}/setup/`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": guide.deviceCategoryLabel,
                "item": `${baseUrl}/setup/${guide.deviceCategory === 'android-tv' ? 'android' : guide.deviceCategory === 'apple' ? 'apple-tv' : guide.deviceCategory}/`
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
      // 2. HUB OR CATEGORY HUB SEO (Preserves self-canonical for /setup/ and /setup/<category>/)
      const cleanHubSlug = hubSlug ? hubSlug.toLowerCase().trim() : '';
      const categorySeo = cleanHubSlug ? HUB_CATEGORY_SEO[cleanHubSlug] : undefined;

      const hubTitle = categorySeo
        ? categorySeo.title
        : "IPTV Setup Guides & Downloader Codes (2026 Directory) | GlobalStreamHub 4K";
      const hubDesc = categorySeo
        ? categorySeo.description
        : "Complete 2026 Step-by-Step IPTV Setup Guides for FireStick, Android TV, Smart TV, Apple TV 4K, Formuler MAG & PC. Instant Downloader shortcodes, Xtream Codes, and UK ISP anti-block settings.";
      const canonicalUrl = categorySeo
        ? `${baseUrl}/setup/${cleanHubSlug}/`
        : `${baseUrl}/setup/`;

      document.title = hubTitle;

      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonicalTag) canonicalTag.href = canonicalUrl;

      let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (metaDesc) metaDesc.content = hubDesc;

      const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
      if (ogTitle) ogTitle.content = hubTitle;
      const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
      if (ogDesc) ogDesc.content = hubDesc;
      const ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
      if (ogUrl) ogUrl.content = canonicalUrl;

      const script = document.createElement('script');
      script.id = scriptId;
      script.setAttribute('type', 'application/ld+json');

      const hubSchema = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            "name": hubTitle,
            "description": hubDesc,
            "url": canonicalUrl,
            "publisher": {
              "@type": "Organization",
              "name": "GlobalStreamHub 4K IPTV",
              "url": `${baseUrl}/`
            }
          },
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
                "name": "Setup Guides",
                "item": `${baseUrl}/setup/`
              },
              ...(categorySeo ? [{
                "@type": "ListItem",
                "position": 3,
                "name": categorySeo.name,
                "item": canonicalUrl
              }] : [])
            ]
          }
        ]
      };

      script.textContent = JSON.stringify(hubSchema);
      document.head.appendChild(script);
    }

    return () => {
      document.title = originalTitle;
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [guide, isHub, hubSlug]);

  return null;
};
