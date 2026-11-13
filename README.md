# Tessera Themes

Seasonal themes for [Tessera](https://github.com/brunogutierre/Tessera), the Angular design system: festive palettes and decorations (Christmas and Halloween first) that restyle every Tessera component from the outside, without forking it.

**Storybook:** https://brunogutierre.github.io/TesseraThemes/

> **Status:** under construction. The workspace and the extension foundation come first; the themes follow.

## Goal

Show how a design system is extended by a separate package: new themes registered through Tessera's typed theme registry, and decoration attached through its public styling API, while keeping Tessera's accessibility guarantees (contrast, keyboard, reduced motion, forced colors).

## Stack

| Area            | Choice                                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------------------- |
| Base            | [`@brunogutierre/tessera`](https://www.npmjs.com/package/@brunogutierre/tessera) 0.2+ (peer dependency) |
| Framework       | Angular 22 (standalone, signals, OnPush)                                                                |
| Styling         | Plain CSS: custom properties, `light-dark()`, cascade layers, SVG masks                                 |
| Packaging       | ng-packagr (Angular Package Format), single entry point plus `styles/*`                                 |
| Documentation   | Storybook 10 (`@storybook/angular-vite`), deployed to GitHub Pages                                      |
| Story tests     | `@storybook/addon-vitest` + `@storybook/addon-a11y` (axe, WCAG 2.2 AA), one run per theme and mode      |
| Unit tests      | Vitest via `@angular/build:unit-test`, browser mode in headless Chromium                                |
| Lint and format | angular-eslint (type-checked rules), Prettier                                                           |
| Package checks  | publint, `@arethetypeswrong/cli`, `npm pack --dry-run`                                                  |

## Architecture

| Layer          | What it is                                                                                                                                     |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Themes         | `[data-tes-theme='christmas' \| 'halloween']` define every Tessera semantic token, in light and dark, plus `--tt-*` festive tokens             |
| Decoration     | Theme-scoped CSS on Tessera's public hooks (`.tes-*`, state attributes, `data-tes-part`, component tokens), in a cascade layer after Tessera's |
| Opt-in motifs  | A typed attribute directive picks a motif per element (a gift-box card next to a plain one)                                                    |
| New components | `tt-*` components for decoration that needs real DOM: festive icons, seals and stamps, garlands, ambient effects                               |

## Decisions

- **An extension, not a fork.** Tessera stays the single source of behavior and accessibility; this package only adds themes and visuals, so every Tessera fix reaches it with a version bump.
- **No wrapper components.** `<tt-button>` around `<button tes-button>` would break Tessera's "native stays native" rule and duplicate every input. Decoration attaches to the components Tessera already renders.
- **Only public hooks.** Selectors use host classes, state attributes, `data-tes-part` and component tokens, which Tessera versions as its styling API (0.2.0). Internal class names are never targeted, so a Tessera refactor cannot break a theme silently.
- **Storybook pre-bundles Angular and Tessera together.** Tessera comes from `node_modules`, so Vite would otherwise serve `@angular/core` twice (once pre-bundled, once raw) and dependency injection fails with NG0203. `vitest.storybook.config.mts` lists both in `optimizeDeps.include`.
- **Cascade layers after Tessera's.** `tessera-themes.css` declares `tessera-themes.tokens`, `.themes` and `.decor`, so the themes override Tessera's components, decoration overrides the themes, and any unlayered app CSS still wins. A spec checks that order.
- **Theme names through module augmentation.** The package augments Tessera's `TesThemeRegistry` and registers the same names at runtime with `provideSeasonalThemes()`. A type test keeps the two lists equal, and a consumer build confirms the augmentation survives in the published typings.
- **`ttDecor` only writes an attribute.** The directive sets a typed `data-tt-decor` and adds no markup; the motif names live in `TtDecorRegistry`, which each theme extends. Styling stays in CSS, where the theme is already known.
- **Own prefix (`tt`).** Components, directives, CSS variables and attributes use `tt`; themes still register under Tessera's `data-tes-theme`, so one switch drives both.

## Usage

```bash
npm install @brunogutierre/tessera @brunogutierre/tessera-themes
```

1. Add both stylesheets to the `styles` of your `angular.json`, Tessera's first:
   `node_modules/@brunogutierre/tessera/styles/tessera.css`, then
   `node_modules/@brunogutierre/tessera-themes/styles/tessera-themes.css`.
2. Register the themes next to Tessera:

```ts
bootstrapApplication(App, {
  providers: [provideTessera({ theme: 'christmas' }), provideSeasonalThemes()],
});
```

Importing the package also adds `christmas` and `halloween` to Tessera's theme names, so `theme.set('halloween')` and `tesTheme="christmas"` type-check.

Pick a motif for one component, or turn a theme's decoration off, with `ttDecor`:

```html
<tes-card ttDecor="none">…</tes-card>
```

## Development

```bash
npm install
npm test               # unit tests in headless Chromium
npm run test:coverage  # with the 80% coverage gate
npm run lint
npm run format:check
npm run check:package  # build, publint, attw, npm pack --dry-run
npm run storybook      # http://localhost:6006
npm run test:stories   # every story, axe included, once per theme and mode
npm run test:stories -- enterprise-dark   # one combination
```

## License

[MIT](LICENSE)
