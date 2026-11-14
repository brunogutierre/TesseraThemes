import '@brunogutierre/tessera/styles/tessera.css';
import '../projects/brunogutierre/tessera-themes/styles/tessera-themes.css';
import './storybook.css';

import { applicationConfig } from '@storybook/angular-vite';
import type { Decorator, Preview } from '@storybook/angular-vite';
import { provideTessera } from '@brunogutierre/tessera';
import { provideSeasonalThemes } from '../projects/brunogutierre/tessera-themes/src/public-api';

/** Set by the story test runner (vitest.storybook.config.mts) to test each theme and mode. */
declare const __TT_GLOBALS__: { theme: string; mode: string; dir: string } | undefined;
const testGlobals = typeof __TT_GLOBALS__ === 'undefined' ? undefined : __TT_GLOBALS__;

/**
 * Toolbar themes. Enterprise is Tessera's own, undecorated theme: the baseline every seasonal
 * theme is compared with. Each seasonal theme joins this list in the PR that adds it.
 */
const THEMES = [
  { value: 'christmas', title: 'Christmas' },
  { value: 'halloween', title: 'Halloween' },
  { value: 'easter', title: 'Easter' },
  { value: 'lunar-new-year', title: 'Lunar New Year' },
  { value: 'enterprise', title: 'Enterprise (Tessera base)' },
];

/**
 * Mirrors the toolbar globals onto <html>, exactly like a static `data-tes-*` attribute in an
 * app's index.html. `TesseraTheme` reads them at startup, so stories and the service agree.
 */
const withTheme: Decorator = (story, context) => {
  const root = document.documentElement;
  const { theme, mode, dir } = context.globals as Record<string, string>;
  root.dataset['tesTheme'] = theme ?? 'enterprise';
  root.dataset['tesMode'] = mode ?? 'light';
  root.dir = dir ?? 'ltr';
  return story();
};

const preview: Preview = {
  decorators: [
    withTheme,
    applicationConfig({ providers: [provideTessera(), provideSeasonalThemes()] }),
  ],
  globalTypes: {
    theme: {
      description: 'Theme',
      toolbar: { title: 'Theme', icon: 'paintbrush', dynamicTitle: true, items: THEMES },
    },
    mode: {
      description: 'Color mode',
      toolbar: {
        title: 'Mode',
        icon: 'mirror',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
        ],
      },
    },
    dir: {
      description: 'Text direction',
      toolbar: {
        title: 'Direction',
        icon: 'transfer',
        dynamicTitle: true,
        items: [
          { value: 'ltr', title: 'Left to right' },
          { value: 'rtl', title: 'Right to left' },
        ],
      },
    },
  },
  initialGlobals: { theme: 'christmas', mode: 'light', dir: 'ltr', ...testGlobals },
  parameters: {
    layout: 'padded',
    controls: { expanded: true, sort: 'requiredFirst' },
    a11y: {
      // Violations fail the story tests in CI, not just the panel.
      test: 'error',
      options: {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      },
    },
    backgrounds: { disable: true },
    options: {
      storySort: { order: ['Introduction', 'Foundations', 'Components', 'Showcase'] },
    },
  },
  tags: ['autodocs'],
};

export default preview;
