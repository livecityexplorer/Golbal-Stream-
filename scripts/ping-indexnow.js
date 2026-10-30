#!/usr/bin/env node
/**
 * IndexNow Instant Search Engine Indexing Submitter
 * Submits all pages and new guides to Bing, Yandex, Seznam, and Naver instantly via IndexNow API.
 */

import https from 'https';

const HOST = 'globalstreamhub.net';
const KEY = '40d46f53a4794e778ad4e42777174dbf';
const KEY_LOCATION = `https://${HOST}/40d46f53a4794e778ad4e42777174dbf.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
  `https://${HOST}/uk-iptv`,
  `https://${HOST}/usa-iptv`,
  `https://${HOST}/canada-iptv`,
  `https://${HOST}/ireland-iptv`,
  `https://${HOST}/germany-iptv`,
  `https://${HOST}/france-iptv`,
  `https://${HOST}/spain-iptv`,
  `https://${HOST}/italy-iptv`,
  `https://${HOST}/netherlands-iptv`,
  `https://${HOST}/europe-iptv`,
  `https://${HOST}/setup`,
  `https://${HOST}/setup/firestick-tivimate`,
  `https://${HOST}/setup/firestick-smarters-pro`,
  `https://${HOST}/setup/firestick-implayer`,
  `https://${HOST}/setup/firestick-xciptv`,
  `https://${HOST}/setup/android-tv-tivimate`,
  `https://${HOST}/setup/android-tv-smarters-pro`,
  `https://${HOST}/setup/android-tv-ott-navigator`,
  `https://${HOST}/setup/apple-tv-iptvx`,
  `https://${HOST}/setup/apple-tv-implayer`,
  `https://${HOST}/setup/apple-tv-snapp-uhd`,
  `https://${HOST}/setup/apple-ios-smarters-lite`,
  `https://${HOST}/setup/apple-ios-implayer`,
  `https://${HOST}/setup/smart-tv-ibo-player`,
  `https://${HOST}/setup/smart-tv-set-iptv`,
  `https://${HOST}/setup/smart-tv-smart-one`,
  `https://${HOST}/setup/formuler-mytvonline3`,
  `https://${HOST}/setup/mag-box-stalker`,
  `https://${HOST}/setup/windows-mac-smarters`,
  `https://${HOST}/setup/webtv-browser-player`,
  `https://${HOST}/setup/vlc-media-player`,
  `https://${HOST}/blog/how-to-watch-premier-league-3pm-blackout-4k-uhd`,
  `https://${HOST}/blog/ultimate-amazon-firestick-4k-iptv-setup-guide-2026`,
  `https://${HOST}/blog/how-to-fix-iptv-buffering-isp-throttling-virgin-bt-sky`,
  `https://${HOST}/blog/how-to-set-up-tivimate-premium-xtream-codes-android-tv`,
  `https://${HOST}/blog/how-to-watch-sky-sports-plus-tnt-sports-efl-championship-4k`,
  `https://${HOST}/blog/ultimate-guide-streaming-ppv-boxing-ufc-events-4k`,
  `https://${HOST}/blog/how-to-watch-formula-1-f1-grand-prix-live-4k-uhd`,
  `https://${HOST}/blog/august-2026-channel-expansion-45-new-4k-hdr-feeds`,
  `https://${HOST}/blog/usa-canada-sports-streaming-nfl-nhl-nba-mlb-guide`,
  `https://${HOST}/blog/nfl-sunday-ticket-redzone-4k-streaming-guide-no-blackouts`,
  `https://${HOST}/blog/2026-4k-uhd-cinema-vod-movies-boxsets-release-schedule`,
  `https://${HOST}/blog/best-iptv-player-apps-apple-tv-4k-iphone-ipad-guide`,
  `https://${HOST}/blog/setup-guide-iptv-smarters-samsung-tizen-lg-webos`,
  `https://${HOST}/blog/top-5-best-streaming-devices-iptv-services-2026`,
  `https://${HOST}/blog/iptv-vs-traditional-cable-tv-cost-breakdown-cord-cutting-2026`,
  `https://${HOST}/blog/formuler-z11-pro-max-mag-box-setup-mytvonline3-guide`,
  `https://${HOST}/blog/how-to-spot-iptv-scams-and-fake-free-trials-in-2026`,
  `https://${HOST}/blog/iptv-vs-real-debrid-stremio-live-sports-comparison-2026`
];

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
