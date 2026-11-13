import { Directive, input } from '@angular/core';

/**
 * Motif names `ttDecor` accepts. Each theme adds its motifs here; `none` turns off a theme's
 * default decoration on one element.
 */
export interface TtDecorRegistry {
  none: true;
  /** Christmas card: a ribbon across the top and a bow. */
  gift: true;
  /** Christmas card: a stocking hanging on the corner. */
  stocking: true;
}
export type TtDecorName = Extract<keyof TtDecorRegistry, string>;

/**
 * Picks a decoration motif for one Tessera component, on top of the active theme's defaults:
 *
 * ```html
 * <tes-card ttDecor="none">…</tes-card>
 * ```
 *
 * It only writes `data-tt-decor`; the theme CSS does the rest. A motif that the active theme
 * does not define changes nothing.
 */
@Directive({
  selector: '[ttDecor]',
  host: { '[attr.data-tt-decor]': 'ttDecor()' },
})
export class TtDecor {
  readonly ttDecor = input.required<TtDecorName>();
}
