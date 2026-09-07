# Presenting and deploying

Run `npm run build` and deploy the contents of `dist/` to an HTTPS static host. The build uses relative asset paths, so the same output supports a domain root or a project subdirectory such as GitHub Pages. No deployment is performed by the build.

- **L** or the lower-left theme button: switch light/dark mode. The choice is saved locally.
- **F**: enter/exit browser fullscreen. Both active learning and privacy fill the available viewport at 16:9, 16:10, or other laptop aspect ratios.
- Arrow keys / Space: advance. **N** within privacy: presenter notes.
- Image caching runs automatically in the background; there is no download button.

## Prepare for a talk

Open the deployed HTTPS URL while online and leave the page open long enough for the initial image download to complete. The current build downloads about 118 MiB, including 217 local images plus code and bundled fonts. First-visit caching can take time. No external font or CDN access is required for the presentation.

After preparation, reload once offline and check your opening and image-heavy slides on the actual presentation browser. Cache availability depends on browser storage; clearing site data, private browsing, or storage eviction can remove it. If caching reports a failure, reconnect, free space if necessary, and reload while online. Service-worker caching is disabled in the Vite development server; use `npm run build` and `npm run preview` to test the production build on localhost.

## Updates

Every build writes a content-versioned service worker and `offline-manifest.json`. All listed assets must be cached successfully before that version becomes ready. Each asset has a content digest: unchanged images are copied from the previous cache without another network download, while changed images are fetched afresh. An updated worker waits until the old presentation tabs close; it does not replace assets mid-talk. Close the deck and reopen after an update downloads. Only this deployment's older caches are deleted.

If your host lets you configure HTTP headers, use `Cache-Control: no-cache` for `index.html`, `sw.js`, and unversioned public image files; use `public, max-age=31536000, immutable` for Vite's hashed `/assets/` files. The service worker maintains its own versioned offline cache. GitHub Pages does not support custom header files, so the worker requests fresh copies of changed or uncached assets during installation.

## Verification performed

Production build, local asset-manifest existence checks, primary light-mode color contrast calculations, and Node tests for cache installation, offline responses, failed downloads, and scoped cleanup. Browser fullscreen, visual layout, and real service-worker storage have not been verified in a browser; Playwright was not used.
