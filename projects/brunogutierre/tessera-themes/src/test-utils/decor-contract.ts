/**
 * Static checks for the decoration rules of this package. They read the CSS object model, so a
 * theme cannot add decoration that breaks them, whatever the selector or theme.
 *
 * - A rule that creates a pseudo-element (sets `content`) must create it empty, out of the
 *   pointer's way, and switchable: `content: ''`, `pointer-events: none` and
 *   `display: var(--tt-decor-display, …)`.
 * - A rule that starts an animation must let reduced motion pause it:
 *   `animation-play-state: var(--tt-play, …)`.
 */
export function decorViolations(rules: CSSRuleList, layer = ''): string[] {
  return [...rules].flatMap((rule) => {
    if (rule instanceof CSSLayerBlockRule) {
      return decorViolations(rule.cssRules, layer ? `${layer}.${rule.name}` : rule.name);
    }
    if (rule instanceof CSSGroupingRule && !(rule instanceof CSSStyleRule)) {
      return decorViolations(rule.cssRules, layer);
    }
    if (!(rule instanceof CSSStyleRule) || !layer.startsWith('tessera-themes')) return [];
    return styleViolations(rule);
  });
}

function styleViolations(rule: CSSStyleRule): string[] {
  const style = rule.style;
  const problems: string[] = [];
  const content = style.getPropertyValue('content');
  if (content && style.getPropertyValue('display') !== 'none') {
    if (content !== '""' && content !== "''") problems.push('content must be empty');
    if (style.getPropertyValue('pointer-events') !== 'none') {
      problems.push('pointer-events must be none');
    }
    if (!style.getPropertyValue('display').includes('var(--tt-decor-display')) {
      problems.push('display must read --tt-decor-display');
    }
  }
  const animation = style.getPropertyValue('animation-name');
  if (animation && animation !== 'none') {
    if (!style.getPropertyValue('animation-play-state').includes('var(--tt-play')) {
      problems.push('animation-play-state must read --tt-play');
    }
  }
  return problems.map((p) => `${rule.selectorText}: ${p}`);
}
