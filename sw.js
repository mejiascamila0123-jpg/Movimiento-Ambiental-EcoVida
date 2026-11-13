var CACHE_NAME = "ecovida-cache-v1";
var urlsToCache = [
  "./index1.html",
  "./styles.css",
  "./manifest.webmanifest"
];

self.addEventListener("install", function(event) {
  console.log("Instalando el service worker de ecovida...");

  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log("Cache abierta correctamente");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(res) {
      var respuestaCache = res;
      
      if (respuestaCache) {
        return respuestaCache;
      } else {
        return fetch(event.request);
      }
    })
  );
});