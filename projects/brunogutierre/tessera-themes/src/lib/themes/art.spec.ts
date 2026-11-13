import { commands } from 'vitest/browser';

/** Themes with an art brief in docs/art/<theme>.md and files in styles/art/<theme>/. */
const THEMES = ['christmas', 'halloween', 'easter'];

/** Files the brief lists with a placeholder or final art, with their viewBox. */
async function briefedFiles(theme: string): Promise<[string, string][]> {
  const brief = await commands.readFile(`docs/art/${theme}.md`);
  return [
    ...brief.matchAll(
      /^\|\s*`([a-z-]+\.svg)`\s*\|\s*([\d ]+?)\s*\|.*\|\s*(placeholder|final)\s*\|$/gm,
    ),
  ].map((m) => [m[1] ?? '', m[2] ?? '']);
}

describe.each(THEMES)('%s art', (theme) => {
  it('ships every briefed file with the briefed viewBox', async () => {
    const files = await briefedFiles(theme);
    expect(files.length).toBeGreaterThan(10);
    for (const [file, viewBox] of files) {
      const svg = await commands.readFile(
        `projects/brunogutierre/tessera-themes/styles/art/${theme}/${file}`,
      );
      expect(svg, file).toContain(`viewBox="${viewBox}"`);
      expect(svg, file).not.toMatch(/<(image|script|style|text)\b|href="http/);
    }
  });
});
