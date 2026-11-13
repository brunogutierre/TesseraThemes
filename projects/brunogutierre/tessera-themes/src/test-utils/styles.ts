import { commands } from 'vitest/browser';

const IMPORT = /@import\s+(?:url\()?['"]([^'"]+)['"]\)?\s*;/g;

/** Workspace-relative paths: the browser commands resolve paths from the workspace root. */
export const TESSERA_CSS = 'node_modules/@brunogutierre/tessera/styles/tessera.css';
export const THEMES_CSS = 'projects/brunogutierre/tessera-themes/styles/tessera-themes.css';

/** Resolves `url` relative to the stylesheet at `from`, both workspace-relative. */
function resolve(from: string, url: string): string {
  const parts = directory(from).split('/').filter(Boolean);
  for (const segment of url.split('/')) {
    if (segment === '..') parts.pop();
    else if (segment !== '.') parts.push(segment);
  }
  return parts.join('/');
}

function directory(path: string): string {
  return path.slice(0, path.lastIndexOf('/') + 1);
}

/** Reads a stylesheet and inlines its relative `@import`s, in order, for a `<style>` element. */
export async function bundleStyle(path: string): Promise<string> {
  const css = await commands.readFile(path);
  const imports = [...css.matchAll(IMPORT)].map((m) => m[1] ?? '');
  const parts = await Promise.all(imports.map((p) => bundleStyle(directory(path) + p)));
  let index = 0;
  return css
    .replace(IMPORT, () => parts[index++] ?? '')
    .replace(/url\('(\.\.?\/[^']+)'\)/g, (_, url: string) => `url('/${resolve(path, url)}')`);
}

/** Test-only: transitions are disabled so computed colors are final values, not mid-transition. */
const TEST_ENVIRONMENT = `*, ::before, ::after { transition-duration: 0s !important; }`;

/** Adds Tessera's stylesheet, then this package's, to the test document once. */
export async function loadStyles(): Promise<void> {
  if (document.getElementById('tt-test-styles')) return;
  const style = document.createElement('style');
  style.id = 'tt-test-styles';
  style.textContent =
    (await bundleStyle(TESSERA_CSS)) + (await bundleStyle(THEMES_CSS)) + TEST_ENVIRONMENT;
  document.head.append(style);
}
