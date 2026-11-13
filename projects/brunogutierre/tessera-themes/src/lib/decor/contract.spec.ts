import { decorViolations } from '../../test-utils/decor-contract';
import { loadStyles } from '../../test-utils/styles';

function sheet(css: string): CSSRuleList {
  const s = new CSSStyleSheet();
  s.replaceSync(css);
  return s.cssRules;
}

beforeAll(loadStyles);

describe('decoration contract', () => {
  it('accepts empty, switchable, inert pseudo-elements and pausable animations', () => {
    const rules = sheet(`
      @layer tessera-themes.decor {
        .tes-card::before {
          content: '';
          display: var(--tt-decor-display, block);
          pointer-events: none;
          animation: tt-twinkle 3s infinite;
          animation-play-state: var(--tt-play, running);
        }
        .tes-card[data-tt-decor='none']::before { content: ''; display: none; }
        .tes-card:hover::before { opacity: 0.5; }
        .tes-tabs [data-tes-part='tab'] { background-image: var(--tt-decor-image, var(--tt-candy-stripe)); }
        .tes-card::after { --tt-sticker: url('holly.svg'); }
      }`);
    expect(decorViolations(rules)).toEqual([]);
  });

  it('reports every broken rule in this package layers, and only there', () => {
    const rules = sheet(`
      @layer tessera-themes.decor {
        @media (min-width: 1px) {
          .tes-badge::after { content: '★'; display: block; }
        }
        .tes-spinner { animation: tt-spin 1s infinite; }
        .tes-input { background-image: url('snow.svg'); }
      }
      @layer tessera.components { .tes-tabs::after { content: ''; } }
      .app::before { content: 'unlayered app CSS is not ours'; }`);
    expect(decorViolations(rules)).toEqual([
      '.tes-badge::after: content must be empty',
      '.tes-badge::after: pointer-events must be none',
      '.tes-badge::after: display must read --tt-decor-display',
      '.tes-spinner: animation-play-state must read --tt-play',
      '.tes-input: background-image must read --tt-decor-image',
    ]);
  });

  it('holds for every stylesheet of this package', () => {
    const style = document.getElementById('tt-test-styles') as HTMLStyleElement;
    expect(decorViolations(style.sheet!.cssRules)).toEqual([]);
  });
});
