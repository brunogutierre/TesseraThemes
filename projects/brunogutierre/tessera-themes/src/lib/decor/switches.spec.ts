import { loadStyles } from '../../test-utils/styles';

/** The `:root` declarations of this package under a media condition, as `name: value` strings. */
function rootDeclarations(condition: string): string[] {
  const walk = (rules: CSSRuleList, inMedia: boolean): string[] =>
    [...rules].flatMap((rule) => {
      if (rule instanceof CSSMediaRule) {
        return walk(rule.cssRules, rule.conditionText.includes(condition));
      }
      if (rule instanceof CSSGroupingRule && !(rule instanceof CSSStyleRule)) {
        return walk(rule.cssRules, inMedia);
      }
      if (!(rule instanceof CSSStyleRule) || !inMedia || rule.selectorText !== ':root') return [];
      return [...rule.style].map((name) => `${name}: ${rule.style.getPropertyValue(name).trim()}`);
    });
  const style = document.getElementById('tt-test-styles') as HTMLStyleElement;
  return walk(style.sheet!.cssRules, false);
}

beforeAll(loadStyles);

describe('decoration switches', () => {
  it('pauses decoration under reduced motion', () => {
    expect(rootDeclarations('prefers-reduced-motion: reduce')).toContain('--tt-play: paused');
  });

  it('hides decoration in forced colors and in print', () => {
    expect(rootDeclarations('forced-colors: active')).toContain('--tt-decor-display: none');
    expect(rootDeclarations('print')).toContain('--tt-decor-display: none');
  });

  it('reaches pseudo-elements that follow the contract', () => {
    const style = document.createElement('style');
    style.textContent = `.tt-switch-probe::before {
      content: ''; pointer-events: none; display: var(--tt-decor-display, block);
      animation: tt-probe 1s infinite; animation-play-state: var(--tt-play, running);
    } @keyframes tt-probe { to { opacity: 0; } }`;
    document.head.append(style);
    const probe = document.createElement('span');
    probe.className = 'tt-switch-probe';
    document.body.append(probe);
    const before = () => getComputedStyle(probe, '::before');
    expect(before().display).toBe('block');
    expect(before().animationPlayState).toBe('running');

    probe.style.setProperty('--tt-decor-display', 'none');
    probe.style.setProperty('--tt-play', 'paused');
    expect(before().display).toBe('none');
    expect(before().animationPlayState).toBe('paused');
    probe.remove();
    style.remove();
  });
});
