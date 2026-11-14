// Runs the story tests once per theme and mode, one after the other: parallel Vite servers and
// browsers need more memory than a laptop or a CI runner comfortably has.
// Usage: node scripts/test-stories.mjs [theme-mode ...] [-- vitest args]
import { spawnSync } from 'node:child_process';

// Each seasonal theme joins this list in the PR that adds it. Enterprise is the undecorated base.
// A `-rtl` suffix runs the stories right to left.
const ALL = [
  ...['christmas', 'halloween', 'easter', 'lunar-new-year', 'enterprise'].flatMap((t) => [
    `${t}-light`,
    `${t}-dark`,
  ]),
  'christmas-light-rtl',
  'halloween-dark-rtl',
  'easter-light-rtl',
  'lunar-new-year-dark-rtl',
];
const separator = process.argv.indexOf('--');
const selected = process.argv.slice(2, separator === -1 ? undefined : separator);
const vitestArgs = separator === -1 ? [] : process.argv.slice(separator + 1);
const combos = selected.length > 0 ? selected : ALL;

const failed = combos.filter((combo) => {
  // Theme ids may contain hyphens (lunar-new-year), so the mode and direction are read from the end.
  const match = /^(.+)-(light|dark)(?:-(rtl))?$/.exec(combo);
  if (!match) {
    console.error(`✖ Unknown combo "${combo}": expected <theme>-<light|dark>[-rtl]`);
    return true;
  }
  const [, theme, mode, dir = 'ltr'] = match;
  console.log(`\n▶ Stories: ${combo}`);
  const result = spawnSync(
    'node_modules/.bin/vitest',
    ['run', '--config', 'vitest.storybook.config.mts', ...vitestArgs],
    { stdio: 'inherit', env: { ...process.env, TT_THEME: theme, TT_MODE: mode, TT_DIR: dir } },
  );
  return result.status !== 0;
});

if (failed.length > 0) {
  console.error(`\n✖ Story tests failed for: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`\n✔ Story tests passed for: ${combos.join(', ')}`);
