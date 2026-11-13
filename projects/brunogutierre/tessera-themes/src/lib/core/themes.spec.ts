import { TestBed } from '@angular/core/testing';
import { TesseraTheme } from '@brunogutierre/tessera';
import type { TesThemeName } from '@brunogutierre/tessera';
import { TT_THEMES, provideSeasonalThemes } from './themes';
import type { TtThemeName } from './themes';

const html = document.documentElement;

afterEach(() => {
  html.removeAttribute('data-tes-theme');
  html.removeAttribute('data-tes-mode');
});

describe('seasonal themes', () => {
  it('lists each theme once', () => {
    expect(TT_THEMES).toEqual(['christmas', 'halloween', 'easter', 'lunar-new-year']);
    expect(new Set(TT_THEMES).size).toBe(TT_THEMES.length);
  });

  it('adds every theme to Tessera theme names', () => {
    expectTypeOf<TtThemeName>().toExtend<TesThemeName>();
  });

  it('registers the themes with Tessera, after the built-in ones', () => {
    TestBed.configureTestingModule({ providers: [provideSeasonalThemes()] });
    const theme = TestBed.inject(TesseraTheme);
    expect(theme.themes).toEqual([
      'enterprise',
      'fintech',
      'care',
      'christmas',
      'halloween',
      'easter',
      'lunar-new-year',
    ]);
  });

  it('lets Tessera adopt a seasonal theme from the markup', () => {
    html.dataset['tesTheme'] = 'halloween';
    TestBed.configureTestingModule({ providers: [provideSeasonalThemes()] });
    const theme = TestBed.inject(TesseraTheme);
    TestBed.tick();
    expect(theme.theme()).toBe('halloween');
    theme.theme.set('christmas');
    TestBed.tick();
    expect(html.dataset['tesTheme']).toBe('christmas');
  });

  it('is ignored by Tessera unless registered', () => {
    html.dataset['tesTheme'] = 'halloween';
    expect(TestBed.inject(TesseraTheme).theme()).toBe('enterprise');
  });
});
