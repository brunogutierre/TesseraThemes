import { loadStyles } from '../../test-utils/styles';
import { contrastFailures, themeScope, tokenSetDifferences } from '../../test-utils/theme';

const CSS = 'projects/brunogutierre/tessera-themes/styles/themes/christmas.css';

beforeAll(loadStyles);
afterEach(() => {
  document.querySelectorAll('[data-tes-theme]').forEach((el) => {
    el.remove();
  });
});

describe('Christmas theme', () => {
  it('declares exactly Tessera semantic tokens', async () => {
    expect(await tokenSetDifferences(CSS)).toEqual([]);
  });

  it.each(['light', 'dark'] as const)('meets every contrast pair in %s mode', (mode) => {
    expect(
      contrastFailures(themeScope('christmas', mode), [
        // The candy-cane bar must stand out from the empty track.
        { foreground: '--tt-berry', background: '--tes-color-surface', minRatio: 3 },
      ]),
    ).toEqual([]);
  });
});
