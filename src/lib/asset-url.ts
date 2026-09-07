/** Resolve public assets under either a domain root or a deployment subdirectory. */
export function assetUrl(path: string): string {
  if (/^(?:https?:|data:|blob:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
