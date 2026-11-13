# Lunar New Year art brief

Art for the Lunar New Year theme of `@brunogutierre/tessera-themes`. Like the other seasonal
themes, it decorates every Tessera component with small illustrated stickers (lanterns, knots,
coins, red envelopes, a dragon and a lion-dance head…) and a few tileable strips. The final SVGs
live in [`styles/art/lunar-new-year/`](../../projects/brunogutierre/tessera-themes/styles/art/lunar-new-year/).
This brief defines their style and delivery contract. **Keep each filename and viewBox** when
revising the art: the CSS reads the files by path, so no code changes are needed.

The Christmas, Halloween and Easter art in `styles/art/` is the reference for finish and weight:
Lunar New Year must look like the same family.

## Style guide

Festive, warm sticker art: thick lacquer-brown outlines, flat red and gold fills, one simple
highlight per shape, round friendly shapes. Joyful and respectful.

| Aspect      | Rule                                                                                                                                                             |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outline     | Lacquer brown `#3A1A14`, round joins and caps. Width ≈ 6% of the art's short side (1.4–1.6 units in a 24-unit viewBox). Illustrated pieces only.                 |
| Flat pieces | Fireworks and the background pattern have **no outline**.                                                                                                        |
| Fills       | Flat colors from the palette below. No gradients, no shadows, no filters, no textures.                                                                           |
| Highlights  | One light stroke or oval per main shape, upper left (gold light on gold, cream elsewhere).                                                                       |
| Shapes      | Round and full: lanterns are plump ovals, coins perfect circles with a square hole, clouds made of round curls.                                                  |
| Mood        | Joyful and lucky. The dragon and the lion are friendly, with big round eyes.                                                                                     |
| Legibility  | Must read at the display size given for each file (often 16–28 CSS px).                                                                                          |
| Red on red  | Primary buttons and the theme's actions are lacquer red. Red pieces must carry enough gold (caps, tassels, rims, trims) and the outline to read on a red button. |
| Backgrounds | Must work on rice-paper cream (`#FAF3E6`) and on dark red lacquer (`#2A1512`). Pieces with dark parts get a cream die-cut rim to read on the dark background.    |
| Originality | Original drawings, in the style of the owner's Christmas references (vivid colors, thick outline). Do not copy existing artwork, mascots or characters.          |

### Cultural care

- **No Chinese characters or any text**, not even 福 or 春: the technical rules forbid text, and a
  wrongly drawn character is worse than none. Lanterns and envelopes stay plain or carry abstract
  gold patterns (cloud curls, a coin, a border).
- **No groups of four** of anything (four is a homophone of "death"); three, five, six or eight
  are fine.
- Avoid clocks, umbrellas, pears, white chrysanthemums and black-and-white combinations as main
  motifs: they read as farewell or mourning.
- Friendly, not exotic: no caricatured people, no stereotyped faces or costumes.

### Palette

| Name       | Hex       | Use                                             |
| ---------- | --------- | ----------------------------------------------- |
| Outline    | `#3A1A14` | Every outline, eyes                             |
| Red        | `#E23B2E` | Lanterns, envelopes, firecrackers, lion, dragon |
| Red deep   | `#A8231C` | Shading bands on lanterns, firecracker stripes  |
| Gold       | `#FFC93C` | Coins, caps, tassels, trims, ingots             |
| Gold deep  | `#E09A1A` | Coin rims, ingot shading                        |
| Gold light | `#FFE38A` | Highlights on gold                              |
| Jade       | `#3FB28C` | Dragon scales, lion trims, leaves               |
| Jade deep  | `#217A5E` | Dragon belly lines, stems                       |
| Plum       | `#FF8FB1` | Plum blossoms, cheeks                           |
| Cream      | `#FFF6E3` | Clouds, eyes, blossom centres, highlights, rims |
| Knob grey  | `#7E6A66` | Switch knob when off                            |

## Technical rules

Same as the other themes: SVG 1.1 with `xmlns`, the **exact viewBox below**, no
`width`/`height`; no external references, fonts, text, `<image>`, scripts or `<style>`; SVGO
(multipass, precision 1); ≤ 4 KB per sticker, ≤ 8 KB per tile; about 1 unit of transparent margin.
**Masks** are one black path; **tiles** join seamlessly.

## Stickers and strips (theme decoration)

| File                 | viewBox     | Display size | Kind      | Used by                                                                 | Description                                                                                                                                                                  | Status |
| -------------------- | ----------- | ------------ | --------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `lantern.svg`        | 0 0 24 30   | 16–30 px     | sticker   | Primary buttons (corner), info alerts and toasts                        | Plump red lantern, three vertical rib lines, gold caps top and bottom, a short gold hanger loop and a gold tassel. Must read on a lacquer-red button.                        | final  |
| `knot.svg`           | 0 0 20 32   | 14–38 px     | sticker   | Secondary buttons, tags, avatars (top-start corner, tilted)             | Red Chinese knot (a diamond of woven loops) on a short cord, a gold bead and a long gold tassel.                                                                             | final  |
| `coin.svg`           | 0 0 24 24   | 14–24 px     | sticker   | Warning and solid badges, slider thumb, the selected calendar day       | Round gold coin with a deep-gold rim and a square hole in the middle and three small curls around it. Must read at 14 px.                                                    | final  |
| `envelope.svg`       | 0 0 24 28   | 24–34 px     | sticker   | Success alerts and toasts, cards with `ttDecor="envelope"` (end corner) | Upright red envelope (hongbao) with a gold flap edge and a gold coin seal in the middle. No characters.                                                                      | final  |
| `ingot.svg`          | 0 0 32 22   | 24–36 px     | sticker   | Warning alerts and toasts, elevated cards                               | Gold ingot (yuanbao): boat shape with raised ends and a round dome, gold-light highlight.                                                                                    | final  |
| `firecracker.svg`    | 0 0 24 28   | 24 px        | sticker   | Danger alerts and toasts                                                | Three red firecrackers tied together, gold bands, short fuses with a small gold spark. Lively, not explosive.                                                                | final  |
| `fireworks.svg`      | 0 0 24 24   | 15–22 px     | flat      | Solid badges, stats                                                     | A burst of gold rays with red and plum dots, plus a small second burst. No outline.                                                                                          | final  |
| `plum-blossom.svg`   | 0 0 24 24   | 16–22 px     | sticker   | Form fields (end of the label row), fieldset legends                    | Five-petal plum blossom in plum pink with a cream centre and gold stamens, a small bud. Never red: near a label a red mark reads as "required".                              | final  |
| `dragon-peek.svg`    | 0 0 40 26   | 40×26 px     | sticker   | Cards with `ttDecor="dragon"` (peeking over the top edge)               | Friendly red dragon head peeking over an edge: big round eyes, gold horns, jade mane curls, two curly whiskers, small smile. Paws on the edge at the bottom (y = 26).        | final  |
| `lion-peek.svg`      | 0 0 36 28   | 36×28 px     | sticker   | Cards with `ttDecor="lion"` (peeking over the top edge)                 | Lion-dance head peeking over an edge: round red face, big eyes with gold lids, a jade horn on the forehead, cream fur trim, a gold mirror dot. Bottom flat at y = 28.        | final  |
| `clouds.svg`         | 0 0 48 12   | 48×12 px     | tile (x)  | Top edge of cards, menus, select/listbox panels, tooltips, inputs       | Auspicious cloud curls (xiangyun) hanging **down** from a flat top edge, gold with deep-gold curls. Seamless left/right. Stretched in height (`preserveAspectRatio="none"`). | final  |
| `lantern-string.svg` | 0 0 48 16   | 48×16 px     | tile (x)  | Dialog headers, toolbars                                                | A sagging cord with three small red lanterns with gold caps (three per tile). Seamless left/right.                                                                           | final  |
| `coin-mask.svg`      | 0 0 24 24   | 14×14 px     | mask      | Checkbox check mark                                                     | Coin silhouette with the square hole cut out, filling about 85% of the box.                                                                                                  | final  |
| `separator-coin.svg` | 0 0 12 12   | 10×10 px     | mask      | Breadcrumb separators                                                   | Tiny coin with a square hole.                                                                                                                                                | final  |
| `coin-knob-on.svg`   | 0 0 24 24   | 14×14 px     | flat      | Switch knob when on (sits on lacquer red)                               | Gold coin with a square hole. No outline.                                                                                                                                    | final  |
| `coin-knob-off.svg`  | 0 0 24 24   | 14×14 px     | flat      | Switch knob when off (sits on a pale or dark neutral)                   | Same coin in grey `#7E6A66` (3:1 against both neutrals).                                                                                                                     | final  |
| `pattern.svg`        | 0 0 160 160 | 160×160 px   | tile (2D) | Themed page background (shown at ~14% strength behind a veil)           | Sparse scatter: small gold coins, red lanterns, plum blossoms and cloud curls (never four of one kind). Lots of empty space. Seamless in both directions.                    | final  |

## Festive icons (`tt-icon`, planned)

24×24 viewBox, displayed at 16–32 px, same outline and palette.

| File                    | viewBox   | Display size | Description                           | Status |
| ----------------------- | --------- | ------------ | ------------------------------------- | ------ |
| `icon-lantern.svg`      | 0 0 24 24 | 16–32 px     | Red lantern with gold caps and tassel | final  |
| `icon-envelope.svg`     | 0 0 24 24 | 16–32 px     | Red envelope with a gold coin seal    | final  |
| `icon-coin.svg`         | 0 0 24 24 | 16–32 px     | Gold coin with a square hole          | final  |
| `icon-ingot.svg`        | 0 0 24 24 | 16–32 px     | Gold ingot                            | final  |
| `icon-firecracker.svg`  | 0 0 24 24 | 16–32 px     | Firecracker string                    | final  |
| `icon-fireworks.svg`    | 0 0 24 24 | 16–32 px     | Firework burst                        | final  |
| `icon-dragon.svg`       | 0 0 24 24 | 16–32 px     | Friendly dragon head                  | final  |
| `icon-lion.svg`         | 0 0 24 24 | 16–32 px     | Lion-dance head                       | final  |
| `icon-knot.svg`         | 0 0 24 24 | 16–32 px     | Chinese knot with tassel              | final  |
| `icon-plum-blossom.svg` | 0 0 24 24 | 16–32 px     | Plum blossom branch                   | final  |
| `icon-tangerine.svg`    | 0 0 24 24 | 16–32 px     | Tangerine with two leaves (good luck) | final  |
| `icon-dumpling.svg`     | 0 0 24 24 | 16–32 px     | Pleated dumpling                      | final  |
| `icon-fan.svg`          | 0 0 24 24 | 16–32 px     | Red folding fan with gold ribs        | final  |
| `icon-drum.svg`         | 0 0 24 24 | 16–32 px     | Red festival drum with gold studs     | final  |

## Delivery checklist

1. Replace the files in `projects/brunogutierre/tessera-themes/styles/art/lunar-new-year/` (same names, same viewBox). Put icons in the same folder.
2. Run `npm test` (contract, contrast, art spec) and `npm run test:stories -- lunar-new-year-light lunar-new-year-dark`.
3. Check the Storybook gallery in Lunar New Year light and dark: each sticker reads at its size on both backgrounds, red pieces read on red buttons.
4. Update the **Status** column to `final`.

## Delivered art

All 17 decorative assets and 14 festive icons are original SVG drawings in the same family as
the other seasonal themes. Red pieces carry gold caps, borders or trims for use on red actions.
The lantern-string tile contains three lanterns; the background tile contains three coins, three
lanterns, three five-petal blossoms and two cloud curls. No characters, lettering or groups of four
motifs are used. The tangerine uses the brief's deep-gold fill with jade leaves.

Files are optimized with SVGO 4.1 (multipass, precision 1); masks retain an explicit black fill.
No raster generation or image-generation prompt was used.

Open [the local art gallery](lunar-new-year-preview.html) to inspect all assets at their display
sizes, enlarged on rice-paper cream and dark lacquer, and as repeating strips. The SVGs remain
editable. Implementing the planned `tt-icon` component is outside this art delivery.

Validation: `npm test` passes all 65 tests. The Lunar New Year light and dark story runs pass
all 7 stories each, including accessibility checks. The Storybook component gallery was visually
reviewed in both modes, including lanterns on red buttons. All 31 SVGs pass viewBox, structure
and size checks; the largest is 2,339 bytes. The local gallery loads every asset successfully.
