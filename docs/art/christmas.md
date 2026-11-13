# Christmas art brief

Art for the Christmas theme of `@brunogutierre/tessera-themes`. The theme decorates every Tessera
component with small illustrated stickers (bows, holly, hats, bells…) and a few tileable strips.
The final SVGs live in [`styles/art/christmas/`](../../projects/brunogutierre/tessera-themes/styles/art/christmas/).
This brief defines their style and delivery contract. **Keep each filename and viewBox** when
revising the art: the CSS reads the files by path, so no code changes are needed.

## Style guide

Cheerful, chunky, sticker-like cartoon art: thick dark outlines, flat vivid fills, one simple
highlight per shape, friendly round shapes. Think wrapping-paper pattern, not realistic
illustration.

| Aspect      | Rule                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outline     | Dark maroon `#5B1A12`, round joins and caps. Width ≈ 6% of the art's short side (1.4–1.6 units in a 24-unit viewBox). Illustrated pieces only.    |
| Flat pieces | Snowflakes, sparkles and the background pattern have **no outline**: flat single-color shapes.                                                    |
| Fills       | Flat colors from the palette below. No gradients, no shadows, no filters, no textures.                                                            |
| Highlights  | One white (`#FFFFFF`) or light-tint stroke or oval per main shape, upper left, to suggest gloss.                                                  |
| Shapes      | Rounded, slightly bulbous, generous negative space; readable as a silhouette.                                                                     |
| Mood        | Joyful and warm. Characters (icons only) have open smiles and pink cheeks.                                                                        |
| Legibility  | Must read at the display size given for each file (often 16–28 CSS px). Drop detail that disappears at that size.                                 |
| Backgrounds | Must work on cream (`#FBF6EA`) and on dark pine (`#16251F`). The outline carries the shape on cream, and the fills on pine; add no halo.          |
| Originality | Original drawings. The reference images shared by the owner set the **style** (color vividness, outline weight, feel); do not copy or trace them. |

### Palette

| Name      | Hex       | Use                                           |
| --------- | --------- | --------------------------------------------- |
| Outline   | `#5B1A12` | Every outline, small details (stitches, eyes) |
| Red       | `#E8341C` | Main red (hats, berries, boxes, bells' bands) |
| Red light | `#EF4A2B` | A second red where two reds touch             |
| Red tint  | `#FF8A6B` | Highlights on red                             |
| Yellow    | `#FFC81E` | Gold (bows, bells, caps, stars)               |
| Amber     | `#F2A516` | Shaded gold, knots, heels                     |
| Lime      | `#8CC63F` | Light green (leaves, ribbons, plus signs)     |
| Leaf      | `#5FA32E` | Dark green (second leaf)                      |
| White     | `#FFFFFF` | Snow, fur trims, highlights                   |
| Skin      | `#F7C9A8` | Faces (icons only)                            |
| Cheek     | `#FF8A80` | Cheeks (icons only)                           |

## Technical rules

- SVG 1.1, `xmlns` set, **exact `viewBox` from the table**, no `width`/`height` attributes.
- Self-contained: no external references, fonts, text, `<image>`, scripts or CSS `<style>` blocks.
- `<use>`, `clipPath` and `<g>` are fine. Keep `id`s short; each file is a standalone background image.
- Run through SVGO (multipass, precision 1). Target ≤ 4 KB per sticker and ≤ 8 KB per tile.
- Draw upright and centered; the CSS rotates some stickers by ±8–20°.
- Leave about 1 unit of transparent margin so outlines are not clipped.
- **Masks** (marked _mask_) are a single black (`#000`) filled path: only the shape counts, the
  color comes from the component.
- **Tiles** (marked _tile_) repeat horizontally (`repeat-x`) or in both directions: the left and right
  edges (and top/bottom for 2D tiles) must join seamlessly.

## Stickers and strips (theme decoration)

Display size is the CSS size at 1×; the art must stay crisp at 2× and 3×.

| File                  | viewBox     | Display size | Kind      | Used by                                                                                    | Description                                                                                                                                                                                                            | Status |
| --------------------- | ----------- | ------------ | --------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `bow.svg`             | 0 0 32 20   | 27×18 px     | sticker   | Primary buttons (corner), gift cards (on the ribbon)                                       | Gold bow: two round loops, two short tails, a round knot. Must stand out on a berry-red button.                                                                                                                        | final  |
| `holly.svg`           | 0 0 32 24   | 38×29 px     | sticker   | Secondary buttons, elevated cards, danger alerts and toasts, fieldset legends, form fields | Two holly leaves (lime and leaf green, spiky edges, a center vein) under three glossy red berries.                                                                                                                     | final  |
| `snowcap.svg`         | 0 0 40 12   | 40×13 px     | tile (x)  | Top edge of cards, menus, select/listbox panels, tooltips                                  | Fresh snow lying on an edge: flat white top, puffy scalloped lower edge with the outline only on that lower edge. Seamless left/right at the same height. Stretched slightly in height (`preserveAspectRatio="none"`). | final  |
| `santa-hat.svg`       | 0 0 32 26   | 38×31 px     | sticker   | Avatars (top left, tilted)                                                                 | Red Santa hat flopping to the right, white fluffy brim, white pompom. The brim must sit flat at the bottom so it rests on a round avatar.                                                                              | final  |
| `bell.svg`            | 0 0 24 24   | 29×29 px     | sticker   | Warning alerts and toasts, warning badges                                                  | Gold jingle bell with a red band, a small red bow on top, visible clapper.                                                                                                                                             | final  |
| `gift.svg`            | 0 0 24 24   | 29×29 px     | sticker   | Success alerts and toasts                                                                  | Red present with a lime ribbon cross and a gold bow, lid slightly wider than the box.                                                                                                                                  | final  |
| `snowflake.svg`       | 0 0 24 24   | 15–29 px     | flat      | Info alerts and toasts                                                                     | Flat red (`#EF3B24`) six-armed snowflake with two pairs of branches per arm; no outline. Must survive at 15 px.                                                                                                        | final  |
| `sparkles.svg`        | 0 0 24 24   | 15–22 px     | flat      | Solid badges, stats                                                                        | A cluster: a big red four-point star, a small yellow four-point star and a lime plus sign. No outline.                                                                                                                 | final  |
| `candy-cane.svg`      | 0 0 24 24   | 18×18 px     | sticker   | Tags (start corner)                                                                        | Candy cane with diagonal red and white stripes, hook at the top right.                                                                                                                                                 | final  |
| `stocking.svg`        | 0 0 24 28   | 29×34 px     | sticker   | Cards with `ttDecor="stocking"` (hanging on the corner)                                    | Red stocking, white fluffy cuff, gold heel and toe, a few stitch marks.                                                                                                                                                | final  |
| `ornament.svg`        | 0 0 24 24   | 16×16 px     | sticker   | Slider thumb                                                                               | Round red bauble with a gold cap and a gold band, a white gloss mark. Reads at 16 px.                                                                                                                                  | final  |
| `switch-knob-on.svg`  | 0 0 24 24   | 14×14 px     | flat      | Switch knob when on (sits on berry red)                                                    | Simple white snowflake, three thick strokes; must read at 14 px. No outline.                                                                                                                                           | final  |
| `switch-knob-off.svg` | 0 0 24 24   | 14×14 px     | flat      | Switch knob when off (sits on a pale or dark neutral)                                      | Same snowflake in mid grey-green `#6F7F75` (3:1 against both neutrals).                                                                                                                                                | final  |
| `star-mask.svg`       | 0 0 24 24   | 14×14 px     | mask      | Checkbox check mark                                                                        | Five-point star, slightly rounded points, filling about 90% of the box.                                                                                                                                                | final  |
| `pattern.svg`         | 0 0 160 160 | 160×160 px   | tile (2D) | Themed page background (shown at ~14% strength behind a veil)                              | Sparse wrapping-paper scatter: four-point stars (red, yellow), lime plus signs, two small flat red snowflakes. Lots of empty space. Seamless in both directions.                                                       | final  |
| `lights.svg`          | 0 0 48 16   | 48×16 px     | tile (x)  | Dialog headers, toolbars, open accordion items, table headers, calendar header             | A string of Christmas lights: a dark wire swinging gently, four bulbs (red, yellow, lime, red light) hanging from it with small caps. Seamless left/right.                                                             | final  |
| `separator-star.svg`  | 0 0 12 12   | 10×10 px     | mask      | Breadcrumb separators                                                                      | Small five-point star.                                                                                                                                                                                                 | final  |
| `ornament-cap.svg`    | 0 0 16 10   | 14×9 px      | sticker   | Selected calendar day (sits on top of the round day button)                                | The gold cap and hook of a bauble, as if the round day button were the ball.                                                                                                                                           | final  |
| `wreath.svg`          | 0 0 32 32   | 32×32 px     | sticker   | Dialog close corner, empty states                                                          | Round green wreath with red berries and a red bow at the bottom.                                                                                                                                                       | final  |
| `star-tree-top.svg`   | 0 0 24 24   | 18×18 px     | sticker   | Calendar days 24 and 25 December                                                           | Gold five-point star with an outline and small red sparkle rays.                                                                                                                                                       | final  |

## Festive icons (`tt-icon`, two-tone illustrated)

24×24 viewBox, displayed at 16–32 px. Unlike the stickers, icons have **meaning** and are named by
what they show. Same outline and palette. Planned for the `tt-icon` component.

| File                   | Description                                                      | Status |
| ---------------------- | ---------------------------------------------------------------- | ------ |
| `icon-tree.svg`        | Christmas tree: three green tiers, gold star on top, two baubles | final  |
| `icon-gift.svg`        | Present seen from the front (may reuse `gift.svg`)               | final  |
| `icon-bell.svg`        | Jingle bell (may reuse `bell.svg`)                               | final  |
| `icon-star.svg`        | Gold star                                                        | final  |
| `icon-snowflake.svg`   | Snowflake with outline (a stronger version of `snowflake.svg`)   | final  |
| `icon-candy-cane.svg`  | Candy cane                                                       | final  |
| `icon-stocking.svg`    | Stocking                                                         | final  |
| `icon-ornament.svg`    | Bauble                                                           | final  |
| `icon-wreath.svg`      | Wreath                                                           | final  |
| `icon-snowman.svg`     | Snowman face with a black top hat, carrot nose, rosy cheeks      | final  |
| `icon-gingerbread.svg` | Gingerbread man with white icing trims                           | final  |
| `icon-reindeer.svg`    | Smiling reindeer face with small antlers and a red nose          | final  |
| `icon-santa.svg`       | Smiling Santa face with hat and beard                            | final  |
| `icon-elf.svg`         | Smiling elf face with a striped hat                              | final  |

## Delivery checklist

1. Replace the files in `projects/brunogutierre/tessera-themes/styles/art/christmas/` (same names, same viewBox). Put icons in the same folder.
2. Run `npm test` (contract and contrast) and `npm run test:stories -- christmas-light christmas-dark`.
3. Check the Storybook gallery in Christmas light and dark: each sticker reads at its size on both backgrounds.
4. Update the **Status** column to `final`.

## Delivered art

All 20 decorative assets and 14 festive icons are original SVG drawings, optimized with
SVGO 4.1 (multipass, precision 1). Names and viewBoxes are preserved.
The references informed the vivid flat colors, rounded maroon outlines and cheerful shapes;
no reference illustration was traced. No raster generation or image-generation prompt was used.

Open [the local art gallery](christmas-preview.html) to inspect all assets at their display sizes,
enlarged on cream and pine, and as repeating strips. Icon SVGs are delivered for the planned
`tt-icon` component; implementing that component is outside this art delivery.

Validation: `npm test` passes all 32 tests; the Christmas light and dark story runs pass all
7 stories each, including accessibility checks. The component gallery was visually reviewed
in both modes. All 34 SVGs pass structure and size checks; the largest is 2,003 bytes.
