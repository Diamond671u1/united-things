const CACHE_NAME = 'united-things-cache-v2';
// Note: Urls to cache are now handled by the build process and dynamic caching.
// Pre-caching specific files here can be brittle.
// The fetch handler will cache assets on demand.

self.addEventListener('install', event => {
  // We can skip waiting as the new SW will take over upon activation
  // due to clients.claim() in the activate event.
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Use a stale-while-revalidate strategy for all GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        const fetchPromise = fetch(event.request).then(networkResponse => {
          // If we got a valid response, clone it and put it in the cache.
          if (networkResponse && networkResponse.status === 200) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        }).catch(err => {
            // Fetch failed, probably offline. The cache might have a response.
            console.log('Fetch failed; returning cached response if available.', err);
            return response; // if response is undefined, it will result in a network error
        });

        // Return the cached response immediately if it exists,
        // and let the fetch update the cache in the background.
        return response || fetchPromise;
      });
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim()) // Claim clients immediately
  );
});
