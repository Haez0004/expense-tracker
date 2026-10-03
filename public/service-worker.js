const CACHE_NAME = "expense-v3";
const urlsToCache = ["/", "/index.html"];

self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});
self.addEventListener("activate", e => {
  e.waitUntil(clients.claim());
});

self.addEventListener("fetch", e => {
  e.respondWith(
caches.match(e.request).then(cached => {
  return cached || fetch(e.request).then(res => {
    return caches.open(CACHE_NAME).then(cache => {
      cache.put(e.request, res.clone());
      return res;
    });
  });
})
