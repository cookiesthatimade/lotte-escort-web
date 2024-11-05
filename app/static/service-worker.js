const CACHE_NAME = "sunnybot-lotte-cache-v1";
const urlsToCache = [
  "/",
  "/lotte",
  "/lotte1",
  "/lotte2",
  "/static/img/favicon.ico",
  "/static/img/lottelogo_b.png",
  "/static/css/lotte.css",
  // 외부 리소스는 제거했습니다.
];

// 서비스 워커 설치 및 캐싱할 파일 저장
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => console.error("Failed to cache:", error))
  );
});

// 서비스 워커 활성화 및 이전 캐시 정리
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// 네트워크 요청 인터셉트 및 캐시 사용
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) =>
          caches.open(CACHE_NAME).then((cache) => {
            if (event.request.url.startsWith("http")) {
              cache.put(event.request, fetchResponse.clone());
            }
            return fetchResponse;
          })
        )
      );
    })
  );
});
