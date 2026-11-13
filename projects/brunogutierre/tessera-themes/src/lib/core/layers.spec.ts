import { loadStyles } from '../../test-utils/styles';

/** Paints a probe with competing rules in the given layers and returns the winning color. */
function winner(css: string): string {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);
  const probe = document.createElement('span');
  probe.className = 'tt-layer-probe';
  document.body.append(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  style.remove();
  return color;
}

const RED = 'rgb(255, 0, 0)';
const GREEN = 'rgb(0, 128, 0)';
const BLUE = 'rgb(0, 0, 255)';

beforeAll(loadStyles);

describe('cascade layers', () => {
  it('declares every layer of this package', () => {
    const css = [...document.styleSheets].flatMap((sheet) => [...sheet.cssRules]);
    const layers = css
      .filter((rule): rule is CSSLayerStatementRule => rule instanceof CSSLayerStatementRule)
      .flatMap((rule) => [...rule.nameList]);
    expect(layers).toEqual(
      expect.arrayContaining([
        'tessera-themes.tokens',
        'tessera-themes.themes',
        'tessera-themes.decor',
      ]),
    );
  });

  it('puts the themes and decoration after Tessera components', () => {
    expect(
      winner(`
        @layer tessera-themes.themes { .tt-layer-probe { color: ${GREEN}; } }
        @layer tessera.components { .tt-layer-probe.tt-layer-probe { color: ${RED}; } }`),
    ).toBe(GREEN);
    expect(
      winner(`
        @layer tessera-themes.decor { .tt-layer-probe { color: ${GREEN}; } }
        @layer tessera-themes.themes { .tt-layer-probe.tt-layer-probe { color: ${RED}; } }`),
    ).toBe(GREEN);
  });

  it('lets unlayered app CSS win over the decoration', () => {
    expect(
      winner(`
        .tt-layer-probe { color: ${BLUE}; }
        @layer tessera-themes.decor { .tt-layer-probe.tt-layer-probe { color: ${GREEN}; } }`),
    ).toBe(BLUE);
  });
});
