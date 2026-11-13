import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import {
  TesAccordion,
  TesAccordionItem,
  TesButton,
  TesCalendar,
  TesCheckbox,
  TesChoice,
  TesDatePicker,
  TesFieldset,
  TesFormField,
  TesInput,
  TesListbox,
  TesPaginator,
  TesRadio,
  TesSlider,
  TesSwitch,
  TesTabPanel,
  TesTabs,
  TesTable,
  TesToolbar,
  TesToolbarItem,
  TesTree,
} from '@brunogutierre/tessera';

/** Decorated forms and navigation. Switch the theme in the toolbar to compare. */
const meta: Meta = {
  title: 'Foundations/Decorated components',
  decorators: [
    moduleMetadata({
      imports: [
        TesAccordion,
        TesAccordionItem,
        TesButton,
        TesCalendar,
        TesCheckbox,
        TesChoice,
        TesDatePicker,
        TesFieldset,
        TesFormField,
        TesInput,
        TesListbox,
        TesPaginator,
        TesRadio,
        TesSlider,
        TesSwitch,
        TesTabPanel,
        TesTabs,
        TesTable,
        TesToolbar,
        TesToolbarItem,
        TesTree,
      ],
    }),
  ],
  tags: ['!autodocs'],
};
export default meta;

const WRAPS = [
  { value: 'paper', label: 'Paper and ribbon' },
  { value: 'box', label: 'Gift box' },
  { value: 'bag', label: 'Gift bag' },
];

const CATALOG = [
  {
    value: 'gifts',
    label: 'Gifts',
    expanded: true,
    children: [
      { value: 'scarves', label: 'Scarves' },
      { value: 'mugs', label: 'Mugs' },
    ],
  },
  { value: 'cards', label: 'Cards' },
];

export const FormsAndNavigation: StoryObj = {
  name: 'Forms and navigation',
  render: () => ({
    props: { wraps: WRAPS, wrap: 'box', catalog: CATALOG, selected: ['mugs'], day: '2026-12-25' },
    template: `
      <div class="sb-stack" style="max-inline-size: 52rem; gap: var(--tes-space-7)">
        <tes-toolbar aria-label="Order actions" style="inline-size: fit-content">
          <button tes-button tesToolbarItem variant="ghost">Wrap</button>
          <button tes-button tesToolbarItem variant="ghost">Add a card</button>
          <button tes-button tesToolbarItem variant="ghost">Ship</button>
        </tes-toolbar>
        <div class="sb-grid">
          <tes-form-field label="Gift message" hint="Up to 120 characters">
            <input tes-input value="Happy holidays!" />
          </tes-form-field>
          <tes-form-field label="Note for the elves" optional>
            <textarea tes-input placeholder="Leave it by the tree"></textarea>
          </tes-form-field>
          <tes-form-field label="Delivery date">
            <tes-date-picker [(value)]="day" />
          </tes-form-field>
        </div>
        <div class="sb-grid">
          <fieldset tes-fieldset legend="Delivery">
            <label tes-choice><input type="radio" tes-radio name="ship" value="standard" checked /> Standard</label>
            <label tes-choice><input type="radio" tes-radio name="ship" value="express" /> Express</label>
          </fieldset>
          <div class="sb-stack">
            <label tes-choice><input type="checkbox" tes-checkbox checked /> Gift wrap</label>
            <label tes-choice><input type="checkbox" tes-switch checked /> Hide prices</label>
            <label tes-choice><input type="checkbox" tes-switch /> Send a reminder</label>
            <input type="range" tes-slider aria-label="Ribbon length" value="60" />
          </div>
          <tes-listbox label="Wrapping" [options]="wraps" [(value)]="wrap" />
        </div>
        <tes-tabs label="Order details">
          <tes-tab-panel value="items" label="Items"><p>Scarf, mug and a board game.</p></tes-tab-panel>
          <tes-tab-panel value="delivery" label="Delivery"><p>Standard delivery, gift wrapped.</p></tes-tab-panel>
        </tes-tabs>
        <tes-accordion>
          <tes-accordion-item heading="When will my gifts arrive?" [expanded]="true">
            Orders placed by 18 December arrive before Christmas Eve.
          </tes-accordion-item>
          <tes-accordion-item heading="Can I return a gift?">Yes, until 31 January.</tes-accordion-item>
        </tes-accordion>
        <div class="sb-grid">
          <tes-tree label="Catalog" [nodes]="catalog" [(value)]="selected" />
          <tes-calendar [(value)]="day" today="2026-12-20" />
        </div>
        <table tes-table>
          <caption>Orders</caption>
          <thead>
            <tr><th scope="col">Order</th><th scope="col">Items</th><th scope="col">Status</th></tr>
          </thead>
          <tbody>
            <tr><td>#1224</td><td>3</td><td>Shipped</td></tr>
            <tr><td>#1225</td><td>1</td><td>Packing</td></tr>
          </tbody>
        </table>
        <tes-paginator [length]="42" label="Orders" />
      </div>`,
  }),
};
