import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TesCard } from '@brunogutierre/tessera';
import { TtDecor } from './decor';
import type { TtDecorName } from './decor';

@Component({
  imports: [TesCard, TtDecor],
  template: `<tes-card [ttDecor]="decor()">Order #1224</tes-card>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class Host {
  readonly decor = signal<TtDecorName>('none');
}

describe('TtDecor', () => {
  it('writes the motif on the Tessera component it decorates', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const card = (fixture.nativeElement as HTMLElement).querySelector('tes-card')!;
    expect(card.classList).toContain('tes-card');
    expect(card.getAttribute('data-tt-decor')).toBe('none');
  });
});
