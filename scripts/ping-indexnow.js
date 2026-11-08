#!/usr/bin/env node
/**
 * IndexNow Instant Search Engine Indexing Submitter
 * Submits all pages and guides from sitemap.xml to Bing, Yandex, Seznam, and Naver instantly via IndexNow API.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'globalstreamhub.net';
const KEY = '40d46f53a4794e778ad4e42777174dbf';
const KEY_LOCATION = `https://${HOST}/40d46f53a4794e778ad4e42777174dbf.txt`;

// Read all URLs directly from sitemap.xml to guarantee 100% complete coverage
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
let urlsFromSitemap = [];

if (fs.existsSync(sitemapPath)) {
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const matches = content.match(/<loc>(https:\/\/globalstreamhub\.net[^<]+)<\/loc>/g) || [];
  urlsFromSitemap = matches.map(m => m.replace(/<\/?loc>/g, '').trim());
}

// Additional core text files and critical paths
const EXTRA_URLS = [
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
  `https://${HOST}/ukbestiptv`,
  `https://${HOST}/blog/ukbestiptv`,
  `https://${HOST}/usabestiptv`,
  `https://${HOST}/blog/usabestiptv`,
  `https://${HOST}/europemoststableiptv`,
  `https://${HOST}/europe-most-stable-iptv`,
  `https://${HOST}/blog/europemoststableiptv`,
  `https://${HOST}/arabicbestiptv`,
  `https://${HOST}/arabic-best-iptv`,
  `https://${HOST}/middle-east-iptv`,
  `https://${HOST}/blog/arabicbestiptv`
];

const URL_LIST = Array.from(new Set([...urlsFromSitemap, ...EXTRA_URLS]));

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: URL_LIST
});

const ENDPOINTS = [
  { hostname: 'api.indexnow.org', path: '/indexnow' },
  { hostname: 'www.bing.com', path: '/indexnow' }
];

console.log(`🚀 Sending IndexNow ping for ${URL_LIST.length} URLs on ${HOST}...`);

for (const endpoint of ENDPOINTS) {
  const req = https.request({
    hostname: endpoint.hostname,
    port: 443,
    path: endpoint.path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(payload)
    }
  }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`✅ [${endpoint.hostname}] IndexNow Response: ${res.statusCode} ${res.statusMessage || ''}`);
    });
  });

  req.on('error', (e) => {
    console.error(`❌ [${endpoint.hostname}] Error:`, e.message);
  });

  req.write(payload);
  req.end();
}
