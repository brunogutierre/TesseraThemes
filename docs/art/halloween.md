# Halloween art brief

Art for the Halloween theme of `@brunogutierre/tessera-themes`. Like Christmas, the theme decorates
every Tessera component with small illustrated stickers (bats, pumpkins, ghosts, spiders…) and a
few tileable strips. The final SVGs live in
[`styles/art/halloween/`](../../projects/brunogutierre/tessera-themes/styles/art/halloween/).
This brief defines their style and delivery contract. **Keep each filename and viewBox** when
revising the art: the CSS reads the files by path, so no code changes are needed.

The Christmas art in [`styles/art/christmas/`](../../projects/brunogutierre/tessera-themes/styles/art/christmas/)
is the reference for finish and weight: Halloween must look like the same family.

## Style guide

Cheerful-spooky, chunky, sticker-like cartoon art: thick dark outlines, flat vivid fills, one simple
highlight per shape, friendly round shapes. Cute, never gory: smiling ghosts, a goofy pumpkin, a
round little spider.

| Aspect      | Rule                                                                                                                                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outline     | Deep purple-black `#2B1638`, round joins and caps. Width ≈ 6% of the art's short side (1.4–1.6 units in a 24-unit viewBox). Illustrated pieces only.                               |
| Flat pieces | Sparkles, the spider web and the background pattern have **no outline** (the web uses bone-white strands).                                                                         |
| Fills       | Flat colors from the palette below. No gradients, no shadows, no filters, no textures.                                                                                             |
| Highlights  | One light stroke or oval per main shape, upper left (orange light on pumpkins, purple light on purple, white elsewhere).                                                           |
| Shapes      | Rounded and bulbous, readable as a silhouette; bats and hats a little pointier.                                                                                                    |
| Mood        | Playful. Faces (ghost, pumpkin, skull, icons) are friendly; ghosts have pink cheeks. Nothing realistic, bloody or scary for children.                                              |
| Legibility  | Must read at the display size given for each file (often 16–28 CSS px).                                                                                                            |
| Backgrounds | Must work on parchment (`#F7EFE2`) and on deep purple night (`#1D1428`). Purple and black parts must keep a lighter detail (eyes, highlight) so they read on the night background. |
| Originality | Original drawings, in the style of the owner's Christmas references (vivid colors, thick outline). Do not copy existing artwork.                                                   |

### Palette

| Name         | Hex       | Use                                       |
| ------------ | --------- | ----------------------------------------- |
| Outline      | `#2B1638` | Every outline, eyes, cauldron body        |
| Orange       | `#F57C1F` | Pumpkins, candy-corn base, hat band       |
| Orange light | `#FF9F43` | Highlights on orange                      |
| Yellow       | `#FFC81E` | Candy corn, pumpkin faces (glow), buckles |
| Purple       | `#7B3FA0` | Bats, witch hats, spider head             |
| Purple light | `#A66BD3` | Highlights on purple                      |
| Slime        | `#8CD43A` | Slime, potion, stems' light side          |
| Leaf         | `#5FA32E` | Pumpkin stems                             |
| Bone         | `#FFF8E7` | Ghosts, skulls, webs, eyes                |
| Cheek        | `#FF8A80` | Ghost cheeks                              |
| Knob grey    | `#7A6B85` | Switch knob when off                      |

## Technical rules

Same as Christmas: SVG 1.1 with `xmlns`, the **exact viewBox below**, no `width`/`height`; no
external references, fonts, text, `<image>`, scripts or `<style>`; SVGO (multipass, precision 1);
≤ 4 KB per sticker, ≤ 8 KB per tile; about 1 unit of transparent margin. **Masks** are one black
path; **tiles** join seamlessly.

## Stickers and strips (theme decoration)

| File                 | viewBox     | Display size | Kind      | Used by                                                                                                       | Description                                                                                                                                                                                                     | Status |
| -------------------- | ----------- | ------------ | --------- | ------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `bat.svg`            | 0 0 32 20   | 27×18 px     | sticker   | Primary buttons (corner)                                                                                      | Purple bat with spread scalloped wings, two bone-white eyes, a tiny fanged smile. Must stand out on a pumpkin-orange button.                                                                                    | final  |
| `candy-corn.svg`     | 0 0 24 24   | 18×18 px     | sticker   | Secondary buttons, tags                                                                                       | A candy-corn kernel: white tip, yellow middle, orange base, rounded.                                                                                                                                            | final  |
| `pumpkin.svg`        | 0 0 32 28   | 16–38 px     | sticker   | Warning badges, alerts and toasts; elevated cards; fieldset legends; slider thumb; 31 October in the calendar | Jack-o'-lantern: round orange pumpkin with ribs, green curly stem, a friendly glowing yellow face (triangle eyes, toothy smile). Must read at 16 px on the slider.                                              | final  |
| `ghost.svg`          | 0 0 24 28   | 24–34 px     | sticker   | Info alerts and toasts, cards with `ttDecor="ghost"` (peeking over the top edge)                              | Bone-white ghost with a wavy hem, oval eyes, an "oo" mouth, pink cheeks.                                                                                                                                        | final  |
| `cauldron.svg`       | 0 0 24 24   | 24 px        | sticker   | Success alerts and toasts                                                                                     | Round black cauldron with bubbling slime-green brew and two bubbles above.                                                                                                                                      | final  |
| `skull.svg`          | 0 0 24 24   | 24 px        | sticker   | Danger alerts and toasts                                                                                      | Cute bone-white skull, round eye sockets, small nose, three teeth lines.                                                                                                                                        | final  |
| `spider.svg`         | 0 0 24 28   | 18×21 px     | sticker   | Form fields, cards with `ttDecor="web"`                                                                       | Round little spider hanging from a thread that runs to the top edge of the box (y = 0); purple head with white eyes, eight bent legs.                                                                           | final  |
| `witch-hat.svg`      | 0 0 32 26   | 14–38 px     | sticker   | Avatars (top left, tilted), the selected calendar day                                                         | Purple pointed witch hat with a bent tip, wide brim sitting flat at the bottom, orange band with a gold buckle.                                                                                                 | final  |
| `web-corner.svg`     | 0 0 32 32   | 38×38 px     | flat      | Cards with `ttDecor="web"` (top-start corner)                                                                 | A cobweb filling the top-left corner: five strands from the corner and three sagging rings, bone-white. Must also read on parchment (a faint outline is fine).                                                  | final  |
| `slime.svg`          | 0 0 40 12   | 40×13 px     | tile (x)  | Top edge of cards, menus, select/listbox panels, tooltips, inputs                                             | Slime-green goo dripping from an edge: flat top, uneven drips of different lengths, outline only on the lower edge. Seamless left/right at the same height. Stretched in height (`preserveAspectRatio="none"`). | final  |
| `bunting.svg`        | 0 0 48 16   | 48×16 px     | tile (x)  | Dialog headers, toolbars                                                                                      | A string of pennants (orange, purple, slime, yellow) hanging from a sagging cord. Seamless left/right.                                                                                                          | final  |
| `sparkles.svg`       | 0 0 24 24   | 15–22 px     | flat      | Solid badges, stats                                                                                           | A cluster: a big orange four-point star, a small purple four-point star and a slime plus sign. No outline.                                                                                                      | final  |
| `bat-mask.svg`       | 0 0 24 24   | 14×14 px     | mask      | Checkbox check mark                                                                                           | Bat silhouette with spread wings, filling about 90% of the width.                                                                                                                                               | final  |
| `separator-bat.svg`  | 0 0 12 12   | 10×10 px     | mask      | Breadcrumb separators                                                                                         | Tiny bat silhouette.                                                                                                                                                                                            | final  |
| `ghost-knob-on.svg`  | 0 0 24 24   | 14×14 px     | flat      | Switch knob when on (sits on pumpkin orange)                                                                  | Bone-white ghost silhouette with two dark eyes. No outline.                                                                                                                                                     | final  |
| `ghost-knob-off.svg` | 0 0 24 24   | 14×14 px     | flat      | Switch knob when off (sits on a pale or dark neutral)                                                         | Same ghost in grey `#7A6B85` (3:1 against both neutrals).                                                                                                                                                       | final  |
| `pattern.svg`        | 0 0 160 160 | 160×160 px   | tile (2D) | Themed page background (shown at ~14% strength behind a veil)                                                 | Sparse scatter: two small purple bats, orange four-point stars, slime plus signs, one small web. Lots of empty space. Seamless in both directions.                                                              | final  |

## Festive icons (`tt-icon`, planned)

24×24 viewBox, displayed at 16–32 px, same outline and palette. Assets are delivered for the
planned `tt-icon` component.

| File                 | viewBox   | Display size | Description                                  | Status |
| -------------------- | --------- | ------------ | -------------------------------------------- | ------ |
| `icon-pumpkin.svg`   | 0 0 24 24 | 16–32 px     | Friendly jack-o'-lantern                     | final  |
| `icon-ghost.svg`     | 0 0 24 24 | 16–32 px     | Ghost with rosy cheeks                       | final  |
| `icon-bat.svg`       | 0 0 24 24 | 16–32 px     | Purple bat with fanged smile                 | final  |
| `icon-witch-hat.svg` | 0 0 24 24 | 16–32 px     | Bent purple hat, orange band and gold buckle | final  |
| `icon-cauldron.svg`  | 0 0 24 24 | 16–32 px     | Cauldron with bubbling slime                 | final  |
| `icon-skull.svg`     | 0 0 24 24 | 16–32 px     | Cute skull                                   | final  |
| `icon-spider.svg`    | 0 0 24 24 | 16–32 px     | Spider hanging from a thread                 | final  |
| `icon-web.svg`       | 0 0 24 24 | 16–32 px     | Corner cobweb                                | final  |
| `icon-black-cat.svg` | 0 0 24 24 | 16–32 px     | Sitting cat with yellow eyes                 | final  |
| `icon-candy.svg`     | 0 0 24 24 | 16–32 px     | Wrapped sweet                                | final  |
| `icon-moon.svg`      | 0 0 24 24 | 16–32 px     | Crescent moon and bat                        | final  |
| `icon-tombstone.svg` | 0 0 24 24 | 16–32 px     | Rounded stone with a crack; no lettering     | final  |
| `icon-potion.svg`    | 0 0 24 24 | 16–32 px     | Round flask with slime                       | final  |
| `icon-broom.svg`     | 0 0 24 24 | 16–32 px     | Witch broom                                  | final  |

## Delivery checklist

1. Replace the files in `projects/brunogutierre/tessera-themes/styles/art/halloween/` (same names, same viewBox). Put icons in the same folder.
2. Run `npm test` (contract, contrast, art spec) and `npm run test:stories -- halloween-light halloween-dark`.
3. Check the Storybook gallery in Halloween light and dark: each sticker reads at its size on both backgrounds.
4. Update the **Status** column to `final`.

## Delivered art

All 17 decorative assets and 14 festive icons are original SVG drawings in the same family as
Christmas. The files are optimized with SVGO 4.1 (multipass, precision 1); masks retain an explicit
black fill. No raster generation or image-generation prompt was used.

Open [the local art gallery](halloween-preview.html) to compare the art at its display sizes
and enlarged on parchment and purple night, and inspect the repeating strips. The SVGs are
self-contained and remain editable. Implementing the planned `tt-icon` component is outside
this art delivery.

Validation: `npm test` passes all 43 tests. `npm run test:stories -- halloween-light halloween-dark`
passes all 7 stories in each mode, including accessibility checks. The Storybook component gallery
was visually reviewed in both modes. All 31 SVGs pass viewBox, structure and size checks; the
largest is 1,436 bytes. The local gallery loads every asset successfully.
