const CACHE_NAME = 'SAW-1';
const toCache = [
    '/coba/',
    '/coba/js/web.webmanifest',
    '/coba/js/script.js',
    '/coba/assets/icon1.png',
    '/coba/assets/icon2.png',
    '/coba/css/style.css',
    '/coba/font/Rubik-VariableFont_wght.ttf',
    '/coba/bootstrap/css/bootstrap.min.css',
    '/coba/bootstrap/js/bootstrap.bundle.min.js',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(toCache);
        })
    );
});




self.addEventListener('fetch', function (event) {
    var request = event.request;
    var url = new URL(request.url);

    // Cek skema permintaan
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      event.respondWith(
        caches.match(request).then(function (response) {
          return response || fetch(request).then(function (r) {
            // Buka cache dan simpan respons
            return caches.open(CACHE_NAME).then(function (cache) {
              cache.put(request, r.clone());
              return r;
            });
          });
        }).catch(function () {
          return caches.match('/coba/index.html');
        })
      );
    }
  });

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request).then(function (response) {
//             return response || fetch(event.request).then(function (r) {
//                 return caches.open(CACHE_NAME).then(function (cache) {
//                     cache.put(event.request, r.clone());
//                     return r;
//                 });
//             });
//         }).catch(function () {
//             return caches.match('/coba/index.html');
//         })
//     );
// });

self.addEventListener('activate', function (event) {
    var cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (!cacheWhitelist.includes(key)) {
                    return caches.delete(key);
                }
            }));
        })
    );
});




// const CACHE_NAME = 'SAW-1';
// const toCache = [
//     '/coba/',
//     '/coba/js/web.webmanifest',
//     '/coba/js/script.js',
//     '/coba/asset/icon.png',
//     '/coba/css/style.css',
//     '/coba/font/Rubik-VariableFont_wght.ttf',
//     '/coba/bootstrap/css/bootstrap.min.css',
//     '/coba/bootstrap/js/bootstrap.bundle.min.js',

// ];

// this.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(toCache);
//         })
//     );
// })

// this.addEventListener('fetch', function (event) {
//     var response;
//     event.respondWith(caches.match(event.request).catch(function () {
//         return fetch(event.request);
//     }).then(function (r) {
//         response = r;
//         caches.open(CACHE_NAME).then(function (cache) {
//             cache.put(event.request, response);
//         });
//         return response.clone();
//     }).catch(function () {
//         return caches.match('/coba/index.html');
//     }));
// });

// this.addEventListener('activate', function(event) {
//     var cacheWhitelist = ['v2'];

//     event.waitUntil(
//       caches.keys().then(function(keyList) {
//         return Promise.all(keyList.map(function(key) {
//           if (cacheWhitelist.indexOf(key) === -1) {
//             return caches.delete(key);
//           }
//         }));
//       })
//     );
//   });





















//
// self.addEventListener('install', function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then(function (cache) {
//                 return cache.addAll(toCache)
//             })
//             .then(self.skipWaiting())
//     )
// })

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         fetch(event.request)
//             .catch(() => {
//                 return caches.open(CACHE_NAME)
//                     .then((cache) => {
//                         return cache.match(event.request)
//                     })
//             })
//     )
// })

// self.addEventListener('activate', function (event) {
//     event.waitUntil(
//         caches.keys()
//             .then((keyList) => {
//                 return Promise.all(keyList.map((key) => {
//                     if (key !== CACHE_NAME) {
//                         console.log('[ServiceWorker] Hapus cache lama', key)
//                         return caches.delete(key)
//                     }
//                 }))
//             })
//             .then(() => self.clients.claim())
//     )
// })



// self.addEventListener('install', function(event) {
//     event.waitUntil(
//       caches.open('SAW-cache')
//         .then(function(cache) {
//           return cache.addAll([
//             '/index.html',
//             '/js/script.js',
//             '/css/style.css',
//             '/font/Rubik-VariableFont_wght.ttf',
//             '/bootstrap/css/bootstrap.min.css',
//             '/bootstrap/js/bootstrap.bundle.min.js',
//             '/asset/icon.png'
//           ]);
//         })
//     );
//   });

//   self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.match(event.request)
//         .then(function(response) {
//           return response || fetch(event.request);
//         })
//     );
//   });
