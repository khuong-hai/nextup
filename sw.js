// Service Worker — cache toàn bộ app để chạy offline hoàn toàn
const CACHE_NAME = "goi-ten-ngau-nhien-v67";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/icons.js",
  "./js/app.js",
  "./js/license-web.js",
  "./js/vendor/xlsx.full.min.js",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/logo-wordmark.png",
  "./assets/bg-education.svg",
  "./assets/Bg-mainpage.png",
  "./assets/sounds/wheel/bg_loop.wav",
  "./assets/sounds/wheel/climax.wav",
  "./assets/sounds/wheel/reveal.wav",
  "./assets/sounds/cards/bg_loop.wav",
  "./assets/sounds/cards/climax.wav",
  "./assets/sounds/cards/reveal.wav",
  "./assets/fonts/plus-jakarta-sans-vietnamese-400-normal.woff2",
  "./assets/fonts/plus-jakarta-sans-vietnamese-600-normal.woff2",
  "./assets/fonts/plus-jakarta-sans-vietnamese-700-normal.woff2",
  "./assets/fonts/plus-jakarta-sans-vietnamese-800-normal.woff2",
  "./assets/games/wheel/wheel-frame.png",
  "./assets/games/wheel/wheel-center.png",
  "./assets/games/wheel/confetti-burst.png",
  "./assets/effects/trophy.png",
  "./assets/games/wheel/logo_vongquay.png",
  "./assets/games/wheel/wheel-pointer.png",
  "./assets/games/wheel/btn_choingay.png",
  "./assets/games/wheel/btn_quay.png",
  "./assets/games/wheel/btn_quaytiep.png",
  "./assets/games/cards/btn_choingay.png",
  "./assets/games/cards/btn_rutthe.png",
  "./assets/games/cards/btn_ruttiep.png",
  "./assets/games/cards/card-back.png",
  "./assets/games/cards/card_one_back.png",
  "./assets/games/cards/logo_rutthe.png",
  "./assets/games/cards/logo_rutthe_sq.png",
  "./assets/games/cards/table-felt.png",
  "./assets/games/slot/btn_choingay.png",
  "./assets/games/slot/btn_quay.png",
  "./assets/games/slot/btn_quaytiep.png",
  "./assets/games/slot/logo_oquay.png",
  "./assets/games/slot/logo_oquay_sq.png",
  "./assets/games/slot/slot-frame.png",
  "./assets/games/slot/slot_frame_result.png",
  "./assets/games/shuffle/btn_choingay.png",
  "./assets/games/shuffle/btn_xaoanh.png",
  "./assets/games/shuffle/glow-ring.png",
  "./assets/games/shuffle/logo_xaoanh.png",
  "./assets/games/shuffle/logo_xaoanh_sq.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        if (event.request.method === "GET" && res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
