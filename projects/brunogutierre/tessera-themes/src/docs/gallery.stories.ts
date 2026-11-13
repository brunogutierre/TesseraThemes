import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import {
  TesAlert,
  TesAvatar,
  TesBadge,
  TesButton,
  TesCard,
  TesCheckbox,
  TesChoice,
  TesFormField,
  TesInput,
  TesProgress,
  TesSpinner,
  TesStat,
  TesSwitch,
  TesSlider,
  TesTabPanel,
  TesTabs,
  TesTag,
} from '@brunogutierre/tessera';

/**
 * A sample of Tessera components in one page. Each seasonal theme decorates these same
 * components, so this page shows a theme's whole look at a glance and is the baseline for
 * its screenshots.
 */
const meta: Meta = {
  title: 'Foundations/Component gallery',
  decorators: [
    moduleMetadata({
      imports: [
        TesAlert,
        TesAvatar,
        TesBadge,
        TesButton,
        TesCard,
        TesCheckbox,
        TesChoice,
        TesFormField,
        TesInput,
        TesProgress,
        TesSpinner,
        TesStat,
        TesSwitch,
        TesSlider,
        TesTabPanel,
        TesTabs,
        TesTag,
      ],
    }),
  ],
  parameters: { layout: 'padded' },
  tags: ['!autodocs'],
};
export default meta;

export const Gallery: StoryObj = {
  render: () => ({
    template: `
      <div class="sb-stack" style="max-inline-size: 56rem">
        <div class="sb-row">
          <button tes-button variant="primary">Order gifts</button>
          <button tes-button variant="secondary">Wish list</button>
          <button tes-button variant="ghost">Cancel</button>
          <button tes-button variant="danger">Remove</button>
          <tes-badge tone="success">Shipped</tes-badge>
          <tes-badge tone="warning" variant="solid">Few left</tes-badge>
          <tes-tag removable>Wrapped</tes-tag>
          <tes-avatar name="Ada Lovelace" />
          <tes-spinner label="Loading orders" />
        </div>

        <div class="sb-grid">
          <tes-card variant="elevated">
            <h3 tesCardHeader style="margin: 0; font-size: inherit">Order #1224</h3>
            <p style="margin: 0">Three items · arrives 20 Dec</p>
            <div tesCardFooter><button tes-button size="sm" variant="primary">Track</button></div>
          </tes-card>
          <tes-stat label="Gifts sent" value="1,284" [delta]="0.12" />
          <tes-card>
            <tes-progress label="Packing" [value]="64" showValue />
          </tes-card>
        </div>

        <tes-alert tone="info" heading="Holiday hours">Stores close at 6 pm on the 24th.</tes-alert>

        <tes-tabs label="Order details">
          <tes-tab-panel value="items" label="Items"><p>Scarf, mug and a board game.</p></tes-tab-panel>
          <tes-tab-panel value="delivery" label="Delivery"><p>Standard delivery, gift wrapped.</p></tes-tab-panel>
        </tes-tabs>

        <div class="sb-grid">
          <tes-form-field label="Gift message" hint="Up to 120 characters">
            <input tes-input value="Happy holidays!" />
          </tes-form-field>
          <div class="sb-stack">
            <label tes-choice><input type="checkbox" tes-checkbox checked /> Gift wrap</label>
            <label tes-choice><input type="checkbox" tes-switch checked /> Hide prices</label>
            <input type="range" tes-slider aria-label="Ribbon length" value="60" />
          </div>
        </div>
      </div>`,
  }),
};
