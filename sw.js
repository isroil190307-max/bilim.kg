self.addEventListener('fetch', (e) => {
  e.respondWith(
    // Алгач интернеттен жаңы версиясын сурайт
    fetch(e.request).catch(() => {
      // Эгер интернет жок болсо гана эстутумдан (кэштен) алат
      return caches.match(e.request);
    })
  );
});