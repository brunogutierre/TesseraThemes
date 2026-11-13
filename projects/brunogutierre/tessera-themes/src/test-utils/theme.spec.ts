import { loadStyles } from './styles';
import { contrastFailures, themeScope, tokenSetDifferences } from './theme';

// The harness every seasonal theme will use, proven on Tessera's own Enterprise theme.
const ENTERPRISE = 'node_modules/@brunogutierre/tessera/styles/themes/enterprise.css';

beforeAll(loadStyles);
afterEach(() => {
  document.querySelectorAll('[data-tes-theme]').forEach((el) => {
    el.remove();
  });
});

describe('theme test harness', () => {
  it('finds no token differences in a complete theme', async () => {
    expect(await tokenSetDifferences(ENTERPRISE)).toEqual([]);
  });

  it.each(['light', 'dark'] as const)('passes a theme that meets contrast in %s mode', (mode) => {
    expect(contrastFailures(themeScope('enterprise', mode))).toEqual([]);
  });

  it('reports Tessera pairs and extra pairs below their minimum', () => {
    const scope = themeScope('enterprise', 'light');
    scope.style.setProperty('--tes-color-text-muted', 'var(--tes-color-bg)');
    scope.style.setProperty('--tt-seal-ink', 'var(--tes-color-surface)');
    const failures = contrastFailures(scope, [
      { foreground: '--tt-seal-ink', background: '--tes-color-surface', minRatio: 4.5 },
    ]);
    expect(failures).toContain('--tes-color-text-muted on --tes-color-bg: 1.00');
    expect(failures).toContain('--tt-seal-ink on --tes-color-surface: 1.00');
  });
});
