const CACHE_NAME = "SAW-1";
const toCache = [
  "/coba/",
  "/coba/js/web.webmanifest",
  "/coba/js/script.js",
  "/coba/assets/icon.png",
  "/coba/css/style.css",
  "/coba/font/Rubik-VariableFont_wght.ttf",
  "/coba/bootstrap/css/bootstrap.min.css",
  "/coba/bootstrap/js/bootstrap.bundle.min.js",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(toCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  var url = new URL(request.url);

  // Cek skema permintaan
  if (url.protocol === "http:" || url.protocol === "https:") {
    event.respondWith(
      caches
        .match(request)
        .then(function (response) {
          return (
            response ||
            fetch(request).then(function (r) {
              // Buka cache dan simpan respons
              return caches.open(CACHE_NAME).then(function (cache) {
                cache.put(request, r.clone());
                return r;
              });
            })
          );
        })
        .catch(function () {
          return caches.match("/coba/index.html");
        })
    );
  }
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (!cacheWhitelist.includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});
