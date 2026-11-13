import { commands } from 'vitest/browser';

const ART = 'projects/brunogutierre/tessera-themes/styles/art/christmas/';
const BRIEF = 'docs/art/christmas.md';

/** Files the brief lists with a placeholder or final art, with their viewBox. */
async function briefedFiles(): Promise<[string, string][]> {
  const brief = await commands.readFile(BRIEF);
  return [
    ...brief.matchAll(
      /^\|\s*`([a-z-]+\.svg)`\s*\|\s*([\d ]+?)\s*\|.*\|\s*(placeholder|final)\s*\|$/gm,
    ),
  ].map((m) => [m[1] ?? '', m[2] ?? '']);
}

describe('Christmas art', () => {
  it('ships every briefed file with the briefed viewBox', async () => {
    const files = await briefedFiles();
    expect(files.length).toBeGreaterThan(10);
    for (const [file, viewBox] of files) {
      const svg = await commands.readFile(ART + file);
      expect(svg, file).toContain(`viewBox="${viewBox}"`);
      expect(svg, file).not.toMatch(/<(image|script|style|text)\b|href="http/);
    }
  });
});
