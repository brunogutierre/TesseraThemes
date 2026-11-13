/** The themes in this package, in the order a theme picker should list them. */
export const TT_THEMES = ['christmas', 'halloween'] as const;
export type TtThemeName = (typeof TT_THEMES)[number];
