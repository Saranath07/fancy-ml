import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root = path.resolve('dist');
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir,e.name)) : path.join(dir,e.name)))).flat();
}
const files=(await walk(root)).filter(f=>/\.(html|js|css|png|jpe?g|webp|avif|gif|svg|ico|woff2?|ttf|mp4|webm)$/i.test(f)&&!f.endsWith('/sw.js')).sort();
const hash=createHash('sha256');let bytes=0;const revisions={};
for(const file of files){const body=await readFile(file);hash.update(path.relative(root,file));hash.update(body);bytes+=body.length;revisions[path.relative(root,file).split(path.sep).map(encodeURIComponent).join('/')]=createHash('sha256').update(body).digest('hex');}
const template=await readFile('scripts/service-worker.js','utf8');
hash.update(template);
const version=hash.digest('hex').slice(0,16);
const urls=files.map(f=>path.relative(root,f).split(path.sep).map(encodeURIComponent).join('/'));
await writeFile(path.join(root,'sw.js'),template.replace('__VERSION__',JSON.stringify(version)).replace('__ASSETS__',JSON.stringify(urls)).replace('__REVISIONS__',JSON.stringify(revisions)));
await writeFile(path.join(root,'offline-manifest.json'),JSON.stringify({version,files:urls.length,images:urls.filter(p=>/\.(png|jpe?g|webp|avif|gif|svg)$/i.test(p)).length,bytes,assets:urls},null,2));
console.log(`Offline build: ${urls.length} files, ${(bytes/1024/1024).toFixed(1)} MiB, version ${version}`);
