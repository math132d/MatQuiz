var CACHE = 'mat-quiz-cache-v1'

self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE).then(
    function (cache) {
      return cache.add('/')
    }
  ))
})

self.addEventListener('fetch', function (event) {
  event.waitUntil(caches.match(event.request).then(
    function (response) {
      if (response) {
        return response
      }

      return fetch(event.request).then(
        function (response) {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          var cacheResponse = response.clone()

          caches.open(CACHE).then(
            function (cache) {
              cache.put(event.request, cacheResponse)
            }
          )

          console.log('returned cached response')
          return response
        }
      )
    }
  ))
})
