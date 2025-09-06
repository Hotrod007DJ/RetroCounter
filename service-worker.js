const CACHE = 'retro-counter-v4'; // bump this when you ship changes

const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css',
  './main.js',
  './manifest.webmanifest',
  './icons/icon-192px.png',
  './icons/icon-512px.png',
  './icons/icon-180px.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for navigations (HTML) so new code shows up quickly
self.addEventListener('fetch', (e) => {
  const req = e.request;

  // 1) HTML pages
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 2) Same-origin static assets: stale-while-revalidate
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        }).catch(() => cached); // if offline and not cached, stays undefined
        return cached || fetchPromise;
      })
    );
    return;
  }

  // 3) Cross-origin: just fetch
  // (or add your own caching rule if you serve fonts/images elsewhere)
});