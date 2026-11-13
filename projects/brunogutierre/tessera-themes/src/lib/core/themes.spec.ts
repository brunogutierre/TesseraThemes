import { TT_THEMES } from './themes';

describe('TT_THEMES', () => {
  it('lists the seasonal themes once each', () => {
    expect(TT_THEMES).toEqual(['christmas', 'halloween']);
    expect(new Set(TT_THEMES).size).toBe(TT_THEMES.length);
  });
});
