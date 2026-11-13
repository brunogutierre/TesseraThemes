import { SEMANTIC_TOKENS, TES_CONTRAST_PAIRS } from '@brunogutierre/tessera';
import type { TesThemeName } from '@brunogutierre/tessera';
import { commands } from 'vitest/browser';
import { contrast, resolveColor } from './color';

/** Semantic tokens a theme stylesheet does not declare, or declares beyond Tessera's set. */
export async function tokenSetDifferences(path: string): Promise<string[]> {
  const css = await commands.readFile(path);
  const declared = new Set([...css.matchAll(/(--tes-[a-z0-9-]+)\s*:/g)].map((m) => m[1] ?? ''));
  const expected = new Set<string>(SEMANTIC_TOKENS);
  return [
    ...[...expected].filter((t) => !declared.has(t)).map((t) => `missing ${t}`),
    ...[...declared].filter((t) => !expected.has(t)).map((t) => `unexpected ${t}`),
  ];
}

/** Creates a themed element in the document; remove it after the test. */
export function themeScope(theme: TesThemeName, mode: 'light' | 'dark'): HTMLElement {
  const el = document.createElement('div');
  el.dataset['tesTheme'] = theme;
  el.dataset['tesMode'] = mode;
  document.body.append(el);
  return el;
}

/**
 * Color pairs below their WCAG minimum inside `scope`: Tessera's contract plus the theme's own
 * pairs (festive tokens such as seal text on a seal fill).
 */
export function contrastFailures(
  scope: HTMLElement,
  extraPairs: readonly { foreground: string; background: string; minRatio: number }[] = [],
): string[] {
  const pairs: readonly { foreground: string; background: string; minRatio: number }[] = [
    ...TES_CONTRAST_PAIRS,
    ...extraPairs,
  ];
  return pairs
    .map((p) => ({
      p,
      ratio: contrast(resolveColor(p.foreground, scope), resolveColor(p.background, scope)),
    }))
    .filter(({ p, ratio }) => ratio < p.minRatio)
    .map(({ p, ratio }) => `${p.foreground} on ${p.background}: ${ratio.toFixed(2)}`);
}
