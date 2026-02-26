self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('bilim-store').then((cache) => cache.addAll([
      './',
      './index.html',
      './matematika.html',
      './geografiya.html',
      './informatika.html',
      './library.html',
      './geo-lesson1.html',
      './geo-test1.html',
      './info-lesson1.html',
      './info-test1.html',
      './style.css',
      './manifest.json'
    ]))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});