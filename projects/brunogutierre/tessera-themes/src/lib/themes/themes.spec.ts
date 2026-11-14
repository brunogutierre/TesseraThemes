import { TT_THEMES } from '../core/themes';
import { loadStyles } from '../../test-utils/styles';
import { contrastFailures, themeScope, tokenSetDifferences } from '../../test-utils/theme';

/** Pairs each theme adds to Tessera's contract, between its own festive tokens. */
const FESTIVE_PAIRS = {
  // The candy-cane bar must stand out from the empty track.
  christmas: [{ foreground: '--tt-berry', background: '--tes-color-surface', minRatio: 3 }],
  // The orange and purple stripes must stand out from the surface.
  halloween: [
    { foreground: '--tt-pumpkin', background: '--tes-color-surface', minRatio: 3 },
    { foreground: '--tt-night', background: '--tes-color-surface', minRatio: 3 },
  ],
  // The lilac and pink stripes must stand out from the surface.
  easter: [
    { foreground: '--tt-lilac', background: '--tes-color-surface', minRatio: 3 },
    { foreground: '--tt-pink', background: '--tes-color-surface', minRatio: 3 },
  ],
};

beforeAll(loadStyles);
afterEach(() => {
  document.querySelectorAll('[data-tes-theme]').forEach((el) => {
    el.remove();
  });
});

describe.each(TT_THEMES)('%s theme', (theme) => {
  it('declares exactly Tessera semantic tokens', async () => {
    const css = `projects/brunogutierre/tessera-themes/styles/themes/${theme}.css`;
    expect(await tokenSetDifferences(css)).toEqual([]);
  });

  it.each(['light', 'dark'] as const)('meets every contrast pair in %s mode', (mode) => {
    expect(contrastFailures(themeScope(theme, mode), FESTIVE_PAIRS[theme])).toEqual([]);
  });
});
