import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import {
  TesAvatar,
  TesBadge,
  TesBreadcrumbs,
  TesButton,
  TesProgress,
  TesSkeleton,
  TesSpinner,
  TesStat,
  TesTag,
} from '@brunogutierre/tessera';

/**
 * Every decorated Tessera component, grouped as the theme stylesheets are. Switch the theme in
 * the toolbar: the markup is plain Tessera, the decoration comes from the theme.
 */
const meta: Meta = {
  title: 'Foundations/Decorated components',
  decorators: [
    moduleMetadata({
      imports: [
        TesAvatar,
        TesBadge,
        TesBreadcrumbs,
        TesButton,
        TesProgress,
        TesSkeleton,
        TesSpinner,
        TesStat,
        TesTag,
      ],
    }),
  ],
  tags: ['!autodocs'],
};
export default meta;

export const ActionsAndDisplay: StoryObj = {
  name: 'Actions and display',
  render: () => ({
    template: `
      <div class="sb-stack" style="max-inline-size: 48rem; gap: var(--tes-space-6)">
        <div class="sb-row">
          <button tes-button variant="primary">Order gifts</button>
          <button tes-button variant="secondary">Wish list</button>
          <button tes-button variant="outline">Details</button>
          <button tes-button variant="ghost">Cancel</button>
          <button tes-button variant="danger">Remove</button>
          <button tes-button variant="primary" size="sm">Track</button>
          <button tes-button variant="primary" size="lg">Check out</button>
        </div>
        <div class="sb-row">
          <tes-badge tone="success">Shipped</tes-badge>
          <tes-badge tone="warning">Few left</tes-badge>
          <tes-badge tone="info" variant="solid">New</tes-badge>
          <tes-badge tone="danger" variant="solid">Sold out</tes-badge>
          <tes-tag>Wrapped</tes-tag>
          <tes-tag removable>Express</tes-tag>
        </div>
        <div class="sb-row" style="gap: var(--tes-space-6)">
          <tes-avatar name="Ada Lovelace" size="sm" />
          <tes-avatar name="Grace Hopper" />
          <tes-avatar name="Alan Turing" size="lg" />
          <tes-spinner label="Loading orders" />
          <tes-spinner label="Loading orders" size="lg" />
        </div>
        <div class="sb-grid">
          <tes-stat label="Gifts sent" value="1,284" [delta]="0.12" />
          <tes-stat label="Returns" value="18" [delta]="-0.04" positive="down" />
          <div class="sb-stack">
            <tes-progress label="Packing" [value]="64" showValue />
            <tes-progress label="Delivered" [value]="90" tone="success" showValue />
          </div>
        </div>
        <tes-breadcrumbs>
          <li><a href="#home">Home</a></li>
          <li><a href="#orders">Orders</a></li>
          <li aria-current="page">Order #1224</li>
        </tes-breadcrumbs>
        <div class="sb-row" style="flex-wrap: nowrap; max-inline-size: 22rem">
          <tes-skeleton shape="circle" width="3rem" />
          <tes-skeleton lines="2" />
        </div>
      </div>`,
  }),
};
