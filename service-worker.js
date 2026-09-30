const CACHE_NAME = "toy-haven-cache-v1";

const filesToCache = [
    "index.html",
    "products.html",
    "cart.html",
    "checkout.html",
    "wishlist.html",
    "feedback.html",
    "css/style.css",
    "js/script.js",
    "manifest.json"
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});