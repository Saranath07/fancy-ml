/* Generated at build time; caches are isolated to this deployment scope. */
const VERSION = __VERSION__;
const ASSETS = __ASSETS__;
const REVISIONS = __REVISIONS__;
const PREFIX = 'asks-keeps:' + self.registration.scope + ':';
const CACHE = PREFIX + VERSION;
const urls = ASSETS.map(p => new URL(p, self.registration.scope).href);
const keys = new Map(urls.map((url,i) => [url, url + '?__talk_revision=' + REVISIONS[ASSETS[i]]]));
async function notify(message) {
  const clients = await self.clients.matchAll({includeUncontrolled:true});
  clients.forEach(client => { if(client.url.startsWith(self.registration.scope)) client.postMessage({type:'CACHE_STATUS',message}); });
}
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(CACHE);
  const older = (await caches.keys()).filter(n => n.startsWith(PREFIX) && n !== CACHE);
  let done = 0;
  try {
    // Small batches avoid flooding the network or keeping hundreds of decoded responses in memory.
    for(let i=0;i<urls.length;i+=4) {
      await Promise.all(urls.slice(i,i+4).map(async url => {
        const key = keys.get(url);
        if(!await cache.match(key)) {
          let response;
          for(const name of older) {
            response = await (await caches.open(name)).match(key);
            if(response) break;
          }
          if(!response) response=await fetch(new Request(url,{cache:'reload'}));
          if(!response.ok) throw new Error('Asset download failed');
          await cache.put(key,response);
        }
        done++;
      }));
      await notify(`Caching presentation: ${done} / ${urls.length}`);
    }
  } catch(error) {
    await notify('Offline copy incomplete. Reconnect and retry; browser storage may be full.');
    throw error;
  }
  // Do not force an update into a running talk. New versions activate when old tabs close.
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(n=>n.startsWith(PREFIX)&&n!==CACHE).map(n=>caches.delete(n)));
  await self.clients.claim();
  await notify('Offline ready');
})()));
self.addEventListener('message',event=>{
  if(event.data?.type==='CACHE_STATUS') event.waitUntil((async()=>{
    const cache=await caches.open(CACHE);let count=0;
    for(const url of urls) if(await cache.match(keys.get(url))) count++;
    const message=count===urls.length?'Offline ready':`Offline copy incomplete: ${count} / ${urls.length}. Reconnect and reload.`;
    event.source?.postMessage({type:'CACHE_STATUS',message});
  })());
});
self.addEventListener('fetch',event=>{
  const req=event.request;const url=new URL(req.url);
  if(req.method!=='GET'||!req.url.startsWith(self.registration.scope)||req.headers.has('range'))return;
  if(req.mode==='navigate') {
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      // Serve the matching shell so an update cannot mix old JS with new unversioned pictures.
      const shell=await cache.match(keys.get(new URL('index.html',self.registration.scope).href));
      return shell || fetch(req);
    })());return;
  }
  if(!urls.includes(url.href))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);const hit=await cache.match(keys.get(url.href));
    if(hit)return hit;
    const response=await fetch(req);
    if(response.ok)await cache.put(keys.get(url.href),response.clone());
    return response;
  })());
});
