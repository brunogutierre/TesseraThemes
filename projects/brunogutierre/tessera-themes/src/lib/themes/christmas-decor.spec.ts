import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TesButton } from '@brunogutierre/tessera';
import { TtDecor } from '../decor/decor';
import { loadStyles } from '../../test-utils/styles';

@Component({
  imports: [TesButton, TtDecor],
  template: `
    <div data-tes-theme="christmas" data-tes-mode="light">
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
    expect(style('bow', '::after').display).toBe('block');
    expect(style('bow', '::after').pointerEvents).toBe('none');
  });

  it('turns every sticker off with ttDecor="none"', async () => {
    const style = await render();
    expect(style('no-bow', '::after').display).toBe('none');
  });
});
