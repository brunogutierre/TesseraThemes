import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  TesAlert,
  TesAvatar,
  TesBadge,
  TesButton,
  TesCalendar,
  TesCard,
  TesDatePicker,
  TesFormField,
  TesInput,
  TesStat,
  TesTabPanel,
  TesTabs,
  TesTag,
} from '@brunogutierre/tessera';
import { TtDecor } from '../decor/decor';
import { loadStyles } from '../../test-utils/styles';

const PIXEL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1'/%3E%3C/svg%3E";

/** One of each decorated kind, in a narrow box that would scroll if decoration overflowed. */
const GALLERY = `
  <button tes-button class="t-bow" variant="primary" style="inline-size: 100%">Order</button>
  <tes-badge tone="warning">Few left</tes-badge>
  <tes-tag>Wrapped</tes-tag>
  <tes-avatar class="t-avatar" name="Ada Lovelace" src="${PIXEL}" />
  <tes-stat class="t-stat" label="Gifts sent" value="1,284" />
  <tes-card class="t-card" variant="elevated">Order #1224</tes-card>
  <tes-card class="t-gift" ttDecor="gift">Gift</tes-card>
  <tes-alert tone="info" heading="Holiday hours">Stores close at 6 pm.</tes-alert>
  <tes-form-field label="Message"><input tes-input class="t-input" value="Hi" /></tes-form-field>
  <tes-tabs label="Details">
    <tes-tab-panel value="a" label="Items">Scarf</tes-tab-panel>
    <tes-tab-panel value="b" label="Delivery">Fast</tes-tab-panel>
  </tes-tabs>
  <tes-date-picker class="t-date" aria-label="Delivery date" />
`;

/** Decorated, opted out, a nested scope of another theme, and right to left. */
const TEMPLATE = `
    <div
      id="on"
      data-tes-theme="christmas"
      data-tes-mode="light"
      style="inline-size: 18rem; overflow: auto"
    >
      ${GALLERY}
      <div id="nested" data-tes-theme="enterprise">
        <button tes-button class="t-nested" variant="primary">Order</button>
      </div>
    </div>
    <div
      id="off"
      data-tes-theme="christmas"
      data-tes-mode="light"
      ttDecor="none"
      style="inline-size: 18rem; overflow: auto"
    >
      ${GALLERY}
    </div>
    <div id="rtl" data-tes-theme="christmas" dir="rtl">
      <tes-calendar value="2026-12-25" today="2026-12-20" />
    </div>
  `;

@Component({
  imports: [
    TesAlert,
    TesAvatar,
    TesBadge,
    TesButton,
    TesCalendar,
    TesCard,
    TesDatePicker,
    TesFormField,
    TesInput,
    TesStat,
    TesTabPanel,
    TesTabs,
    TesTag,
    TtDecor,
  ],
  template: TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class Host {}

async function render(): Promise<HTMLElement> {
  const fixture = TestBed.createComponent(Host);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

const pseudo = (root: HTMLElement, selector: string, which: string): CSSStyleDeclaration =>
  getComputedStyle(root.querySelector(selector)!, which);

beforeAll(loadStyles);

describe('Christmas decoration', () => {
  it('draws inert stickers on hosts and parts', async () => {
    const on = (await render()).querySelector<HTMLElement>('#on')!;
    for (const [selector, which] of [
      ['.t-bow', '::after'],
      ['.t-card', '::before'],
      ['.t-card', '::after'],
      ['.t-stat > [data-tes-part="label"]', '::after'],
    ] as const) {
      expect(pseudo(on, selector, which).display, selector).toBe('block');
      expect(pseudo(on, selector, which).pointerEvents, selector).toBe('none');
    }
  });

  it('turns stickers, parts and backgrounds off with ttDecor="none"', async () => {
    const off = (await render()).querySelector<HTMLElement>('#off')!;
    expect(pseudo(off, '.t-bow', '::after').display).toBe('none');
    expect(pseudo(off, '.t-card', '::before').display).toBe('none');
    expect(pseudo(off, '.t-stat > [data-tes-part="label"]', '::after').display).toBe('none');
    expect(pseudo(off, '.t-input', '').backgroundImage).toBe('none');
    expect(pseudo(off, '[data-tes-part="tab"][aria-selected="true"]', '').backgroundImage).toBe(
      'none',
    );
    expect(pseudo(off, '.t-bow', '').borderRadius).not.toBe('9999px');
  });

  it('leaves a nested scope of another theme undecorated', async () => {
    const root = await render();
    expect(pseudo(root, '.t-nested', '::after').content).toBe('none');
    expect(pseudo(root, '.t-nested', '').borderRadius).not.toBe('9999px');
  });

  it('never changes the layout', async () => {
    const root = await render();
    const boxes = (scope: string): string[] =>
      [...root.querySelectorAll(`${scope} > *, ${scope} [data-tes-part]`)]
        .filter((el) => !el.closest('#nested'))
        .map((el) => {
          const r = el.getBoundingClientRect();
          return `${el.className} ${r.width.toFixed(1)}×${r.height.toFixed(1)}`;
        });
    expect(boxes('#on')).toEqual(boxes('#off'));
    const on = root.querySelector('#on')!;
    expect(on.scrollWidth).toBe(on.clientWidth);
  });

  it('never moves a Tessera button out of its place', async () => {
    const root = await render();
    expect(pseudo(root, '#on .t-date [data-tes-part="toggle"]', '').position).toBe('absolute');
  });

  it('keeps photo avatars round', async () => {
    const root = await render();
    expect(pseudo(root, '#on .t-avatar > img', '').borderRadius).not.toBe('0px');
  });

  it('keeps the gift ribbon above the card content', async () => {
    const root = await render();
    const card = root.querySelector<HTMLElement>('#on .t-gift')!;
    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, (node) =>
      node.textContent?.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP,
    );
    const text = document.createRange();
    text.selectNodeContents(walker.nextNode()!);
    const ribbon = getComputedStyle(card, '::before');
    const ribbonBottom =
      card.getBoundingClientRect().top + parseFloat(ribbon.top) + parseFloat(ribbon.height);
    expect(ribbonBottom).toBeLessThanOrEqual(text.getBoundingClientRect().top);
  });

  it('centres the calendar cap in right-to-left layouts', async () => {
    const root = await render();
    const day = root.querySelector<HTMLElement>(
      '#rtl [aria-selected="true"] > [data-tes-part="day"]',
    )!;
    const cap = getComputedStyle(day, '::before');
    // With both insets set, `left` is the declared 0: the used offset is in the auto margin.
    const left = parseFloat(cap.left) + parseFloat(cap.marginLeft);
    const right = day.clientWidth - left - parseFloat(cap.width);
    expect(Math.abs(left - right)).toBeLessThan(1);
  });
});
