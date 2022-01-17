const staticCacheName = 'Gaurav Cache';
const assets = [
"/",
"/index.html",
"/css/bootstrap.min.css",
"/js/bootstrap.min.js",
"/project1.pdf",
"/Gaurav Yadav's resume.pdf",
"/photos/android.svg",
"/photos/arduino-1.svg",
"/photos/c.svg",
"/photos/cl.svg",
"/photos/cpp.svg",

"/photos/edit3.jpeg",
"/photos/fire.svg",
"/photos/h1.mp4",
"/photos/html.svg",
"/photos/mysql.svg",
"/photos/js.svg",
"/photos/java.svg",
"/photos/interest/a.mp4",
"/photos/interest/b.mp4",
"/photos/interest/c.mp4",
"/photos/interest/d.mp4",
"/photos/interest/e.mp4",
"/photos/interest/f.mp4",


"/photos/"



];

// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      return cache.addAll(assets)
      .catch(err =>{
        console.error('Error adding files to cache',err);
      })
    })
    )
  console.info('SW installed');
  self.skipWaiting();
});

// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
        );
    })
    );
  return self.clients.claim();
});

// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
    );
});
