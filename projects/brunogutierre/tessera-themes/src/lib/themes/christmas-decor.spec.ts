import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TesButton, TesCard } from '@brunogutierre/tessera';
import { TtDecor } from '../decor/decor';
import { loadStyles } from '../../test-utils/styles';

@Component({
  imports: [TesCard, TesButton, TtDecor],
  template: `
    <div data-tes-theme="christmas" data-tes-mode="light">
      <tes-card id="snow">Snow</tes-card>
      <tes-card id="plain" ttDecor="none">Plain</tes-card>
      <tes-card id="gift" ttDecor="gift">Gift</tes-card>
      <button tes-button id="bow" variant="primary">Order</button>
      <button tes-button id="no-bow" variant="primary" ttDecor="none">Order</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class Host {}

async function render(): Promise<(id: string, pseudo: string) => CSSStyleDeclaration> {
  const fixture = TestBed.createComponent(Host);
  await fixture.whenStable();
  const root = fixture.nativeElement as HTMLElement;
  return (id, pseudo) => getComputedStyle(root.querySelector(`#${id}`)!, pseudo);
}

beforeAll(loadStyles);

describe('Christmas decoration', () => {
  it('draws stickers that ignore the pointer', async () => {
    const style = await render();
    expect(style('snow', '::before').display).toBe('block');
    expect(style('snow', '::before').pointerEvents).toBe('none');
    expect(style('bow', '::after').display).toBe('block');
  });

  it('turns every sticker off with ttDecor="none"', async () => {
    const style = await render();
    expect(style('plain', '::before').display).toBe('none');
    expect(style('plain', '::after').display).toBe('none');
    expect(style('no-bow', '::after').display).toBe('none');
  });

  it('keeps the gift ribbon above the card content', async () => {
    const style = await render();
    const card = document.getElementById('gift')!;
    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, (node) =>
      node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
    );
    const text = document.createRange();
    text.selectNodeContents(walker.nextNode()!);
    const ribbon = style('gift', '::before');
    const ribbonBottom =
      card.getBoundingClientRect().top + parseFloat(ribbon.top) + parseFloat(ribbon.height);
    expect(ribbonBottom).toBeLessThanOrEqual(text.getBoundingClientRect().top);
  });
});
