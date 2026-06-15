const CACHE_NAME = 'space-adventure-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icon-192.jpg',
  './icon-512.jpg'
];

// Instalação do Service Worker e caching inicial
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Removendo cache antigo:', key);
          return caches.delete(key);
        }
      }));
    }).then(() => self.clients.claim())
  );
});

// Interceptação de requisições de rede
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // Evita cachear vídeos e requisições parciais (Range) usando o cache padrão
  // Vídeos geralmente usam requisições com cabeçalho "Range", difíceis de cachear sem lógica complexa.
  // Deixamos o navegador buscar vídeos diretamente da rede para maior compatibilidade.
  if (event.request.headers.get('range') || requestUrl.pathname.endsWith('.mp4')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Se estiver offline e pedir vídeo, retorna vazio ou uma resposta de erro amigável
        return new Response('', { status: 408, statusText: 'Offline - Video indisponível' });
      })
    );
    return;
  }

  // Para outros assets, serve do cache se disponível, senão busca na rede
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // Opcional: Adiciona dinamicamente novos arquivos acessados ao cache
        return caches.open(CACHE_NAME).then((cache) => {
          // Não cacheia chamadas externas ou APIs (se houver no futuro)
          if (event.request.url.startsWith(self.location.origin)) {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        });
      });
    }).catch(() => {
      // Fallback para quando o usuário está offline e o arquivo não está no cache
      if (event.request.mode === 'navigate') {
        return caches.match('./index.html');
      }
    })
  );
});
