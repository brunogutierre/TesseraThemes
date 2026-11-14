import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { expect, within } from 'storybook/test';
import {
  TesAlert,
  TesButton,
  TesCard,
  TesDialog,
  TesDialogLayout,
  TesMenu,
  TesToaster,
  TesTooltip,
} from '@brunogutierre/tessera';
import { TtDecor } from '../lib/decor/decor';

@Component({
  selector: 'tt-docs-order-dialog',
  imports: [TesDialogLayout, TesButton],
  template: `
    <tes-dialog heading="Send order #1224?">
      <p style="margin: 0">Three gifts will ship gift wrapped and arrive by 20 December.</p>
      <div tesDialogFooter>
        <button tes-button variant="secondary" (click)="ref.close()">Not yet</button>
        <button tes-button variant="primary" (click)="ref.close()">Send order</button>
      </div>
    </tes-dialog>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OrderDialog {
  protected readonly ref = inject(DialogRef);
}

@Component({
  selector: 'tt-docs-overlay-launcher',
  imports: [TesButton],
  template: `
    <div class="sb-row">
      <button tes-button variant="outline" (click)="dialog()">Open dialog</button>
      <button tes-button variant="outline" (click)="toasts()">Show toasts</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class OverlayLauncher {
  readonly #dialog = inject(TesDialog);
  readonly #toaster = inject(TesToaster);

  dialog(): void {
    this.#dialog.open(OrderDialog);
  }

  toasts(): void {
    this.#toaster.show({ message: 'Gift order confirmed', tone: 'success', duration: 0 });
    this.#toaster.show({ message: 'Only two scarves left', tone: 'warning', duration: 0 });
    this.#toaster.show({ message: 'Stores close early on the 24th', tone: 'info', duration: 0 });
  }
}

/** Decorated surfaces and overlays. Switch the theme in the toolbar to compare. */
const meta: Meta = {
  title: 'Foundations/Decorated components',
  decorators: [
    moduleMetadata({
      imports: [TesAlert, TesButton, TesCard, TesMenu, TesTooltip, TtDecor, OverlayLauncher],
    }),
  ],
  tags: ['!autodocs'],
};
export default meta;

const MENU = [
  { label: 'Gift wrap', value: 'wrap' },
  { label: 'Add a card', value: 'card' },
  { label: 'Remove', value: 'remove', danger: true },
];

export const Surfaces: StoryObj = {
  render: () => ({
    props: { menu: MENU },
    template: `
      <div class="sb-stack" style="max-inline-size: 48rem; gap: var(--tes-space-6)">
        <div class="sb-grid">
          <tes-card><strong>Outlined</strong><p style="margin: 0">Decorated top edge.</p></tes-card>
          <tes-card variant="elevated"><strong>Elevated</strong><p style="margin: 0">Top edge and a sticker.</p></tes-card>
          <tes-card ttDecor="gift"><strong>Gift</strong><p style="margin: 0">Christmas: a ribbon and a bow.</p></tes-card>
          <tes-card ttDecor="stocking"><strong>Stocking</strong><p style="margin: 0">Christmas: hung on the corner.</p></tes-card>
          <tes-card ttDecor="web"><strong>Web</strong><p style="margin: 0">Halloween: a cobweb and a spider.</p></tes-card>
          <tes-card ttDecor="ghost"><strong>Ghost</strong><p style="margin: 0">Halloween: peeking over the edge.</p></tes-card>
          <tes-card ttDecor="bunny"><strong>Bunny</strong><p style="margin: 0">Easter: peeking over the edge.</p></tes-card>
          <tes-card ttDecor="basket"><strong>Basket</strong><p style="margin: 0">Easter: a basket of eggs.</p></tes-card>
          <tes-card ttDecor="none"><strong>Plain</strong><p style="margin: 0">ttDecor="none": no decoration.</p></tes-card>
        </div>
        <tes-alert tone="info" heading="Holiday hours">Stores close at 6 pm on the 24th.</tes-alert>
        <tes-alert tone="success" heading="Order sent">Three gifts are on their way.</tes-alert>
        <tes-alert tone="warning" heading="Few left">Only two scarves in stock.</tes-alert>
        <tes-alert tone="danger" heading="Payment failed">Check the card details and try again.</tes-alert>
        <div class="sb-row">
          <tes-menu label="Order actions" [items]="menu" variant="outline" />
          <button tes-button variant="ghost" tesTooltip="Free gift wrap until 24 December">Gift wrap</button>
          <tt-docs-overlay-launcher />
        </div>
      </div>`,
  }),
};

export const OpenMenu: StoryObj = {
  ...Surfaces,
  name: 'Surfaces: open menu',
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Order actions' }));
    await expect(await canvas.findByRole('menu')).toBeVisible();
  },
};

export const OpenDialog: StoryObj = {
  ...Surfaces,
  name: 'Surfaces: dialog',
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Open dialog' }));
    await expect(await within(document.body).findByRole('dialog')).toBeVisible();
  },
};

export const Toasts: StoryObj = {
  ...Surfaces,
  name: 'Surfaces: toasts',
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Show toasts' }));
    await expect(await within(document.body).findByText('Gift order confirmed')).toBeVisible();
  },
};
