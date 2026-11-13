import { bundleStyle } from './styles';

describe('bundleStyle', () => {
  it('points relative art urls at the files the test server serves', async () => {
    const css = await bundleStyle(
      'projects/brunogutierre/tessera-themes/styles/tessera-themes.css',
    );
    expect(css).not.toContain("url('../");
  });
});
