# Easter art brief

Art for the Easter theme of `@brunogutierre/tessera-themes`. Like Christmas and Halloween, the
theme decorates every Tessera component with small illustrated stickers (painted eggs, bunnies,
flowers…) and a few tileable strips. The placeholders in
[`styles/art/easter/`](../../projects/brunogutierre/tessera-themes/styles/art/easter/) work but
are rough; this brief describes the final art. **Replace each file in place, with the same name
and viewBox**: the CSS reads the files by path, so no code changes are needed.

The Christmas and Halloween art in [`styles/art/christmas/`](../../projects/brunogutierre/tessera-themes/styles/art/christmas/)
and [`styles/art/halloween/`](../../projects/brunogutierre/tessera-themes/styles/art/halloween/)
is the reference for finish and weight: Easter must look like the same family.

## Style guide

Cheerful spring sticker art: thick chocolate-brown outlines, flat pastel fills with a stronger
shade for patterns, one simple highlight per shape, soft round shapes. Sweet and playful, never
religious: bunnies, eggs, chicks and flowers.

| Aspect      | Rule                                                                                                                                                                                                  |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outline     | Chocolate brown `#4A2C2A`, round joins and caps. Width ≈ 6% of the art's short side (1.4–1.6 units in a 24-unit viewBox). Illustrated pieces only.                                                    |
| Flat pieces | Sparkles and the background pattern have **no outline**.                                                                                                                                              |
| Fills       | Flat colors from the palette below. Pastel for the body of a shape, the deep shade of the same hue for its pattern (stripes, dots, zigzag). No gradients, no shadows, no filters, no textures.        |
| Highlights  | One white stroke or oval per main shape, upper left.                                                                                                                                                  |
| Shapes      | Round and egg-like. Eggs are taller than wide with the narrow end up.                                                                                                                                 |
| Mood        | Sweet and friendly. Faces (bunny, chick, icons) have dot eyes and pink cheeks.                                                                                                                        |
| Legibility  | Must read at the display size given for each file (often 16–28 CSS px).                                                                                                                               |
| Backgrounds | Must work on cream (`#FBF6EA`) and on deep lilac night (`#211A33`). Pastel pieces need the chocolate outline to read on cream; a piece with dark parts gets a cream die-cut rim to read on the night. |
| Originality | Original drawings, in the style of the owner's Christmas references (vivid colors, thick outline). Do not copy existing artwork or characters.                                                        |

### Palette

| Name       | Hex       | Use                                         |
| ---------- | --------- | ------------------------------------------- |
| Outline    | `#4A2C2A` | Every outline, eyes, noses                  |
| Lilac      | `#C7A6EE` | Eggs, bunting                               |
| Lilac deep | `#8A5CC4` | Egg patterns, inner ears on lilac           |
| Pink       | `#FFB3CF` | Eggs, inner ears, bunting                   |
| Pink deep  | `#E2588E` | Egg patterns, tulips                        |
| Mint       | `#A8E6CB` | Eggs, bunting                               |
| Mint deep  | `#3FAE87` | Egg patterns                                |
| Yolk       | `#FFDD57` | Chicks, daisy centres, eggs                 |
| Yolk deep  | `#F2A922` | Egg patterns, beaks, basket weave           |
| Sky        | `#A7D8F5` | Eggs, sparkles                              |
| Grass      | `#7CC85A` | Grass, leaves, carrot tops                  |
| Grass deep | `#4E9A3A` | Grass shading, stems                        |
| Carrot     | `#FF8A3D` | Carrots                                     |
| Cream      | `#FFF9EC` | Bunnies, daisy petals, eggshell, highlights |
| Cheek      | `#FF8FA3` | Cheeks                                      |
| Knob grey  | `#7C6E8A` | Switch knob when off                        |

## Technical rules

Same as Christmas and Halloween: SVG 1.1 with `xmlns`, the **exact viewBox below**, no
`width`/`height`; no external references, fonts, text, `<image>`, scripts or `<style>`; SVGO
(multipass, precision 1); ≤ 4 KB per sticker, ≤ 8 KB per tile; about 1 unit of transparent margin.
**Masks** are one black path; **tiles** join seamlessly.

## Stickers and strips (theme decoration)

| File                 | viewBox     | Display size | Kind      | Used by                                                           | Description                                                                                                                                                                                           | Status      |
| -------------------- | ----------- | ------------ | --------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `egg-stripes.svg`    | 0 0 24 28   | 16–24 px     | sticker   | Primary buttons (corner), slider thumb, the selected calendar day | Lilac egg with two deep-lilac horizontal bands and a wavy pink band between them. Must stand out on a violet button and read at 16 px on the slider.                                                  | placeholder |
| `egg-dots.svg`       | 0 0 24 28   | 16–20 px     | sticker   | Secondary buttons, tags                                           | Mint egg with deep-mint polka dots of two sizes.                                                                                                                                                      | placeholder |
| `egg-zigzag.svg`     | 0 0 24 28   | 16–34 px     | sticker   | Warning badges, alerts and toasts; elevated cards                 | Yolk-yellow egg with a deep-yolk zigzag band around the middle.                                                                                                                                       | placeholder |
| `egg-cracked.svg`    | 0 0 24 28   | 24 px        | sticker   | Danger alerts and toasts                                          | Pink egg with a zigzag crack across the middle and a tiny piece of shell lifted; a chick's eye peeks through the crack. Friendly, not broken-sad.                                                     | placeholder |
| `daisy.svg`          | 0 0 24 24   | 18–24 px     | sticker   | Info alerts and toasts, form fields (end of the label row)        | Daisy seen from the front: eight rounded cream petals around a yolk centre. Never red: near a label a red mark reads as "required".                                                                   | placeholder |
| `carrot.svg`         | 0 0 24 24   | 24 px        | sticker   | Success alerts and toasts                                         | Carrot lying diagonally (tip bottom-left), three ridge lines, a bushy grass-green top.                                                                                                                | placeholder |
| `tulip.svg`          | 0 0 20 28   | 14–20 px     | sticker   | Fieldset legends, stats                                           | Pink-deep tulip with three petals, a grass stem and one leaf.                                                                                                                                         | placeholder |
| `bunny-ears.svg`     | 0 0 32 24   | 14–38 px     | sticker   | Avatars (sticking up from the top, centred)                       | A pair of upright cream bunny ears with pink insides, the right one bent at the tip. The base is flat and hidden behind the avatar, so draw nothing below y = 22.                                     | placeholder |
| `bunny-peek.svg`     | 0 0 32 26   | 34×28 px     | sticker   | Cards with `ttDecor="bunny"` (peeking over the top edge)          | Top half of a cream bunny head peeking over an edge: two ears, dot eyes, pink nose, cheeks, two paws resting on the edge at the bottom (y = 26).                                                      | placeholder |
| `basket.svg`         | 0 0 32 28   | 34×30 px     | sticker   | Cards with `ttDecor="basket"` (end corner)                        | Wicker basket (yolk-deep weave) with a handle, three eggs (lilac, mint, pink) and grass tufts peeking out.                                                                                            | placeholder |
| `grass.svg`          | 0 0 40 12   | 40×13 px     | tile (x)  | Top edge of cards, menus, select/listbox panels, tooltips, inputs | A strip of grass blades growing **down** from the top edge (flat top, blade tips pointing down), two greens, one tiny daisy. Seamless left/right. Stretched in height (`preserveAspectRatio="none"`). | placeholder |
| `bunting.svg`        | 0 0 48 16   | 48×16 px     | tile (x)  | Dialog headers, toolbars                                          | A string of rounded pennants (lilac, pink, mint, yolk) hanging from a sagging cord. Seamless left/right.                                                                                              | placeholder |
| `sparkles.svg`       | 0 0 24 24   | 15–22 px     | flat      | Solid badges, stats                                               | A cluster: a big yolk four-point star, a small pink four-point star and a sky plus sign. No outline.                                                                                                  | placeholder |
| `egg-mask.svg`       | 0 0 24 24   | 14×14 px     | mask      | Checkbox check mark                                               | Egg silhouette with a zigzag band cut out across the middle, filling about 80% of the height.                                                                                                         | placeholder |
| `separator-egg.svg`  | 0 0 12 12   | 10×10 px     | mask      | Breadcrumb separators                                             | Tiny egg silhouette.                                                                                                                                                                                  | placeholder |
| `bunny-knob-on.svg`  | 0 0 24 24   | 14×14 px     | flat      | Switch knob when on (sits on violet)                              | Cream bunny head silhouette with two ears and two dark dot eyes. No outline.                                                                                                                          | placeholder |
| `bunny-knob-off.svg` | 0 0 24 24   | 14×14 px     | flat      | Switch knob when off (sits on a pale or dark neutral)             | Same bunny head in grey `#7C6E8A` (3:1 against both neutrals).                                                                                                                                        | placeholder |
| `pattern.svg`        | 0 0 160 160 | 160×160 px   | tile (2D) | Themed page background (shown at ~14% strength behind a veil)     | Sparse scatter: small eggs in lilac, pink and mint, yolk four-point stars, sky plus signs, one small daisy. Lots of empty space. Seamless in both directions.                                         | placeholder |

## Festive icons (`tt-icon`, planned)

24×24 viewBox, displayed at 16–32 px, same outline and palette. Assets for the planned `tt-icon`
component.

| File                       | viewBox   | Display size | Description                                    | Status |
| -------------------------- | --------- | ------------ | ---------------------------------------------- | ------ |
| `icon-bunny.svg`           | 0 0 24 24 | 16–32 px     | Sitting cream bunny, side view, cotton tail    | to do  |
| `icon-egg.svg`             | 0 0 24 24 | 16–32 px     | Painted egg with stripes and dots              | to do  |
| `icon-chick.svg`           | 0 0 24 24 | 16–32 px     | Yolk chick hatching from a shell               | to do  |
| `icon-carrot.svg`          | 0 0 24 24 | 16–32 px     | Carrot with a leafy top                        | to do  |
| `icon-basket.svg`          | 0 0 24 24 | 16–32 px     | Basket of eggs                                 | to do  |
| `icon-tulip.svg`           | 0 0 24 24 | 16–32 px     | Pink tulip with a leaf                         | to do  |
| `icon-daisy.svg`           | 0 0 24 24 | 16–32 px     | Daisy with a yolk centre                       | to do  |
| `icon-butterfly.svg`       | 0 0 24 24 | 16–32 px     | Lilac and pink butterfly                       | to do  |
| `icon-nest.svg`            | 0 0 24 24 | 16–32 px     | Twig nest with three small eggs                | to do  |
| `icon-chocolate-bunny.svg` | 0 0 24 24 | 16–32 px     | Chocolate bunny with a ribbon bow; brown fills | to do  |
| `icon-lamb.svg`            | 0 0 24 24 | 16–32 px     | Fluffy cream lamb                              | to do  |
| `icon-ladybug.svg`         | 0 0 24 24 | 16–32 px     | Ladybug (pink-deep shell, outline dots)        | to do  |
| `icon-sun.svg`             | 0 0 24 24 | 16–32 px     | Smiling spring sun                             | to do  |
| `icon-watering-can.svg`    | 0 0 24 24 | 16–32 px     | Mint watering can with water drops             | to do  |

## Delivery checklist

1. Replace the files in `projects/brunogutierre/tessera-themes/styles/art/easter/` (same names, same viewBox). Put icons in the same folder.
2. Run `npm test` (contract, contrast, art spec) and `npm run test:stories -- easter-light easter-dark`.
3. Check the Storybook gallery in Easter light and dark: each sticker reads at its size on both backgrounds.
4. Update the **Status** column to `final`.
