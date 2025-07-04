// Nombre de la caché versionada
const NOMBRE_CACHE = 'no-line-cache-v1.1';

// Archivos esenciales para el App Shell (precaching)
const ARCHIVOS_APP_SHELL = [
  './index.html',
  './manifest.json',
  './assets/styles.css',
  './src/app.js',
  './src/db.js',
  './src/sync-indicator.js'
  // Agrega aquí otros recursos estáticos si es necesario
];

// Instalación: Precaching del App Shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(NOMBRE_CACHE)
      .then(cache => cache.addAll(ARCHIVOS_APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

// Activación: Elimina cachés antiguos automáticamente
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('no-line-cache-') && key !== NOMBRE_CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: Estrategia cache-first para estáticos y fallback offline para navegación
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Navegación: fallback offline
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match('./index.html'))
    );
  } else {
    // Recursos estáticos: cache-first
    event.respondWith(
      caches.match(event.request)
        .then(respuesta => respuesta || fetch(event.request))
    );
  }
});
