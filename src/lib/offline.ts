import { assetUrl } from './asset-url';
let status = import.meta.env.DEV ? 'Offline caching is enabled in the production build.' : 'Preparing offline copy…';
const listeners = new Set<(value: string) => void>();
let pending: Promise<void> | undefined;
let listening = false;
const publish = (value: string) => { status = value; listeners.forEach(fn => fn(value)); };
export function subscribeOffline(fn: (value: string) => void) { listeners.add(fn); fn(status); return () => { listeners.delete(fn); }; }
export function prepareOffline(retry = false): Promise<void> {
  if (import.meta.env.DEV) { publish(status); return Promise.resolve(); }
  if (!('serviceWorker' in navigator) || !window.isSecureContext) { publish('Offline cache needs HTTPS and a supported browser.'); return Promise.resolve(); }
  if (pending && !retry) return pending;
  if (!listening) {
    navigator.serviceWorker.addEventListener('message', e => {
      if (e.data?.type === 'CACHE_STATUS') publish(e.data.message);
    });
    listening = true;
  }
  pending = (async () => {
    try {
      const registration = await navigator.serviceWorker.register(assetUrl('sw.js'), { updateViaCache: 'none' });
      const observe = (worker: ServiceWorker | null) => worker?.addEventListener('statechange', () => {
        if (worker.state === 'redundant') publish('Offline copy incomplete. Reconnect and retry.');
        if (worker.state === 'installed' && registration.waiting) publish('Updated copy downloaded. Close this deck and reopen to use it.');
      });
      observe(registration.installing);
      registration.addEventListener('updatefound', () => observe(registration.installing));
      if (retry) await registration.update();
      const ready = await navigator.serviceWorker.ready;
      (ready.active || navigator.serviceWorker.controller)?.postMessage({ type: 'CACHE_STATUS' });
    } catch { publish('Offline cache unavailable. Reconnect and retry; browser storage may be full.'); }
  })();
  return pending;
}
