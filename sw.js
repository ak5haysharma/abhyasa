/* Abhyasa service worker: offline support and safe updates.
   VERSION must change on every release (tools/bump_version.py does it),
   otherwise phones keep the old cached app. */
const VERSION = "1.39.0";
const CACHE = "abhyasa-" + VERSION;
const FONTS = "abhyasa-fonts";
const SHELL = [
  "./", "index.html", "css/fonts.css", "css/app.css",
  "fonts/inter-latin-400-normal.woff2", "fonts/inter-latin-500-normal.woff2", "fonts/inter-latin-600-normal.woff2", "fonts/inter-latin-ext-400-normal.woff2", "fonts/inter-latin-ext-500-normal.woff2", "fonts/inter-latin-ext-600-normal.woff2", "fonts/literata-latin-400-normal.woff2", "fonts/literata-latin-600-normal.woff2", "fonts/literata-latin-ext-400-normal.woff2", "fonts/literata-latin-ext-600-normal.woff2", "fonts/tiro-devanagari-hindi-devanagari-400-normal.woff2", "js/content.js", "js/app.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" }))))); // bypass the HTTP cache so a new version never stores old files
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith("abhyasa-") && k !== CACHE && k !== FONTS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", e => { if (e.data === "skip-waiting") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: serve from cache, refresh in the background.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin) return;

  // Pages: cached app shell first, so it opens instantly and offline.
  if (req.mode === "navigate") {
    e.respondWith(caches.match("index.html").then(hit => hit || fetch(req)));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
});
