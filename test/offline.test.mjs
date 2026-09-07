import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';

function worker({ fail = false, stores = new Map(), version = 'test-v1', pictureRevision = 'pic-v1' } = {}) {
  const handlers = {}, messages = [], fetched = [];
  const scope = 'https://example.test/talk/';
  let online = true;
  const cache = name => {
    if (!stores.has(name)) stores.set(name,new Map());
    return { match: async key => stores.get(name).get(typeof key==='string'?key:key.url)?.clone(), put: async(key,res) => { stores.get(name).set(typeof key==='string'?key:key.url,res.clone()); } };
  };
  const context = {
    URL, Request, Response,
    caches: { open:async n=>cache(n), keys:async()=>[...stores.keys()], delete:async n=>stores.delete(n) },
    self: { registration:{scope}, clients:{matchAll:async()=>[{url:scope,postMessage:m=>messages.push(m)}],claim:async()=>{}}, addEventListener:(name,fn)=>handlers[name]=fn },
    fetch:async req=>{if(!online)throw Error('offline'); const url=typeof req==='string'?req:req.url; fetched.push(url); return new Response(url.endsWith('index.html')?'deck shell':'asset bytes',{status:fail&&url.endsWith('picture.png')?404:200});}
  };
  const source=readFileSync('scripts/service-worker.js','utf8').replace('__VERSION__',JSON.stringify(version)).replace('__ASSETS__',JSON.stringify(['index.html','assets/app.js','images/picture.png'])).replace('__REVISIONS__',JSON.stringify({'index.html':version,'assets/app.js':version,'images/picture.png':pictureRevision}));
  vm.runInNewContext(source,context);
  const event=async name=>{let done;handlers[name]({waitUntil:p=>{done=p;}});await done;};
  const request=async (url,mode='cors')=>{let result;handlers.fetch({request:{url,method:'GET',mode,headers:new Headers()},respondWith:p=>{result=p;}});return result;};
  return {event,request,stores,messages,fetched,offline:()=>{online=false;},scope};
}
test('cache serves images and the matching shell offline from a deployment subdirectory',async()=>{
  const w=worker();await w.event('install');await w.event('activate');w.offline();
  assert.equal(await (await w.request(w.scope+'images/picture.png')).text(),'asset bytes');
  assert.equal(await (await w.request(w.scope,'navigate')).text(),'deck shell');
  assert.ok(w.messages.some(m=>m.message==='Offline ready'));
  assert.equal(await w.request('https://other.test/image.png'),undefined);
});
test('activation cleans only older caches in this deployment scope',async()=>{
  const w=worker();w.stores.set('asks-keeps:'+w.scope+':old',new Map());w.stores.set('asks-keeps:https://example.test/another/:old',new Map());w.stores.set('unrelated-app',new Map());
  await w.event('install');await w.event('activate');
  assert.equal(w.stores.has('asks-keeps:'+w.scope+':old'),false);
  assert.equal(w.stores.has('asks-keeps:https://example.test/another/:old'),true);
  assert.equal(w.stores.has('unrelated-app'),true);
});
test('an unsuccessful image download fails installation and never claims offline readiness',async()=>{
  const w=worker({fail:true});await assert.rejects(w.event('install'));
  assert.ok(w.messages.some(m=>m.message.includes('incomplete')));
  assert.equal(w.messages.some(m=>m.message==='Offline ready'),false);
});

test('new deployment reuses identical images and fetches changed ones',async()=>{
  const first=worker();await first.event('install');await first.event('activate');
  const second=worker({stores:first.stores,version:'test-v2'});await second.event('install');
  assert.equal(second.fetched.some(u=>u.endsWith('picture.png')),false);
  assert.equal(second.fetched.length,2);
  await second.event('activate');
  const third=worker({stores:second.stores,version:'test-v3',pictureRevision:'pic-v2'});await third.event('install');
  assert.equal(third.fetched.some(u=>u.endsWith('picture.png')),true);
});
