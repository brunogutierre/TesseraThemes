import { provideTesseraThemes } from '@brunogutierre/tessera';
import type { EnvironmentProviders } from '@angular/core';

/** The themes in this package, in the order a theme picker should list them. */
export const TT_THEMES = ['christmas', 'halloween'] as const;
export type TtThemeName = (typeof TT_THEMES)[number];

/*
 * Adds the seasonal themes to Tessera's theme names, so `TesseraTheme.theme.set('christmas')` and
 * `tesTheme="halloween"` type-check in any app that imports this package.
 */
declare module '@brunogutierre/tessera' {
  interface TesThemeRegistry {
    christmas: true;
    halloween: true;
  }
}

/**
 * Registers the seasonal themes with Tessera, so `TesseraTheme` adopts them from the markup and
 * lists them in `themes`. Provide it next to `provideTessera`:
 *
 * ```ts
 * providers: [provideTessera({ theme: 'christmas' }), provideSeasonalThemes()];
 * ```
 */
export function provideSeasonalThemes(): EnvironmentProviders {
  return provideTesseraThemes(TT_THEMES);
}
