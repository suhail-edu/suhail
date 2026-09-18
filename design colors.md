# Design Colors — Suhail

The colour law for this project. Six values, one allocation rule, no exceptions.
If a colour decision is not covered here, it is not allowed — extend this file first.

---

## 1. The palette

These six are the entire palette. Nothing else ships.

| Token | Hex | Role |
|---|---|---|
| `ground` | `#0B1B38` | Page background. The floor everything sits on. |
| `surface` | `#1E2D5E` | Raised panels: app bar, footer, form cards, list rows. |
| `blue` | `#3C64AF` | Interactive surfaces: tappable cards, field borders, selected states. |
| `sand` | `#F2DD83` | Accent. Logo, primary button, links, meter fill, chevrons. |
| `mist` | `#E4ECF8` | Body text on dark, and the light background in light regions. |
| `white` | `#FFFFFF` | Headings, and card surfaces in light regions. |

**No seventh colour.** Not for a warning, not for a chart, not "just this once".
Greens, greys and off-whites from earlier drafts (`#86C773`, `#808285`, `#F1F2F2`)
are retired and must not reappear.

---

## 2. The 60 / 30 / 10 law

Measure by **visible area on one screen**, not by how many elements use the colour.

| Share | Colours | What it covers |
|---|---|---|
| **60%** | `ground` + `surface` | Background and every panel. The screen should read as navy from across the room. |
| **30%** | `blue` | Everything the user can act on. |
| **10%** | `sand` | The single most important thing per view, plus small directional marks. |

Text and hairlines are not counted in the split — they are carried by `mist` and
`white` and are exempt.

### Accent budget

`sand` is capped. On any one screen:

- **One** primary action in `sand` — never two.
- At most **three** further `sand` marks total (chevrons, a link, a meter fill).
- If a fourth wants `sand`, something else must give it up.

Breaking the cap does not make the screen louder — it makes the accent mean nothing.

---

## 3. Where each colour is allowed

**`ground`** — page background; text placed on `sand`.
Never a text colour on `surface` or `blue`.

**`surface`** — app bar, footer, form card, non-interactive rows, modal sheets.
Never for something tappable. If it is tappable it is `blue`.

**`blue`** — tappable cards, input borders, selected chip, active tab underline.
Never a page background. It is lighter than both navies, so covering large area
with it turns it into the primary and breaks the split.

**`sand`** — logo, primary CTA fill, links, chevrons, meter fill, focus ring.
Never a large fill. Never body text on a dark background.

**`mist`** — body text, secondary text (via opacity), hairlines (via opacity),
light-region backgrounds.

**`white`** — headings, values, text on `blue`, card surfaces in light regions.

---

## 4. Hard rules

**R1 — No new colour values.**
A value that is not in the table above is legal only as (a) a stated opacity of a
token, or (b) a documented state derived in §6. Nothing else.

**R2 — Secondary text is opacity, not a new grey.**
Dimmer text is `mist` at reduced opacity. Never introduce a grey hex.

**R3 — Two elements that must be told apart must not resolve to the same token.**
This is the rule that matters most and the easiest to break. A meter's fill and its
track, a selected row and its neighbours, a badge and its card — each pair needs two
different tokens with at least **3:1** between the resulting colours.

> This is not theoretical. Collapsing two near-identical greys onto one token made a
> progress bar vanish into its own track: the element was still there, it just had
> nothing to contrast against.

**R4 — Meters and progress bars are fixed.**
Track `mist` @ 18%, fill `sand`. Always. Never track and fill from the same family.

**R5 — `blue` on `ground` needs an edge.**
`blue` against `ground` measures **2.96:1**, under the 3:1 minimum for UI shapes.
Any `blue` surface sitting on `ground` must carry a border (`mist` @ 18%) **and** a
shadow. Same for `surface` on `ground`, which is only **1.30:1**.

**R6 — Hairlines are decoration, not structure.**
`mist` @ 18% gives roughly **1.65:1**. It suggests an edge; it does not define one.
Never rely on a hairline alone to separate two interactive regions.

**R7 — Accent never sits on accent.**
No `sand` text on a `sand` fill, no `sand` border on a `sand` button. Text on `sand`
is `ground`.

---

## 5. Contrast — measured, not guessed

All values are WCAG 2.1 contrast ratios against the stated background.
Minimums: **4.5:1** body text · **3:1** large text (≥18.66px bold / ≥24px) and UI shapes.

| Foreground | On `ground` | On `surface` | On `blue` |
|---|---|---|---|
| `white` | 17.10 ✅ | 13.19 ✅ | 5.78 ✅ |
| `mist` | 14.37 ✅ | 11.09 ✅ | 4.86 ✅ |
| `sand` | 12.58 ✅ | 9.70 ✅ | 4.25 ⚠️ large/UI only |
| `mist` @ 80% | 9.54 ✅ | 7.67 ✅ | 3.74 ⚠️ large/UI only |
| `mist` @ 70% | 7.55 ✅ | 6.27 ✅ | 3.25 ⚠️ large/UI only |
| `mist` @ 62% | 6.24 ✅ | 5.23 ✅ | 2.88 ❌ fails |

`ground` on `sand` — **12.58** ✅ (this is how the primary button is built).

### The one trap

**On `blue`, text opacity is banned.** Body text on a `blue` card is `mist` or
`white` at full strength. `mist` @ 62% on `blue` is 2.88:1 and fails outright —
and `blue` cards are exactly where long descriptions live.

Dimmed secondary text is allowed on `ground` and `surface` only:

- `mist` @ 62% — secondary text, labels, captions
- `mist` @ 18% — hairlines, dividers, meter tracks

---

## 6. Interactive states

States are derived, never invented. One recipe for everything tappable.

| State | Surface | Motion | Notes |
|---|---|---|---|
| Rest | `blue` | — | Border `mist` @ 18%, shadow `0 6 16 -6` @ 55% |
| Hover | `#4470BF` | — | `blue` lightened 6%. Desktop only — wrap in `@media (hover: hover)` |
| Pressed | `#31569A` | `scale(0.975)` | `blue` darkened 12%. Shadow drops to `0 2 6 -4`. Duration 90ms |
| Focus | `blue` | — | `2px` `sand` outline, `3px` offset |
| Disabled | `blue` @ 40% | — | Text `mist` @ 50%. Not tappable |

**Pressed state is mandatory on touch.** There is no hover on a phone; without a
press response people tap two and three times. `#31569A` carries white at **7.17:1**,
so text stays readable while pressed.

**Minimum touch target 44px.** Minimum gap between two targets 8px.

---

## 7. Tokens

```css
:root{
  /* 60% — background and panels */
  --c-ground:  #0B1B38;
  --c-surface: #1E2D5E;

  /* 30% — interactive */
  --c-blue:    #3C64AF;

  /* 10% — accent */
  --c-sand:    #F2DD83;

  /* text and light regions */
  --c-mist:    #E4ECF8;
  --c-white:   #FFFFFF;

  /* derived states — do not hand-pick replacements */
  --c-blue-hover:   #4470BF;   /* blue +6% lightness */
  --c-blue-pressed: #31569A;   /* blue −12% lightness */

  /* derived opacities — the only greys that exist */
  --c-text-secondary: rgb(228 236 248 / .62);  /* on ground/surface ONLY */
  --c-hairline:       rgb(228 236 248 / .18);
  --c-meter-track:    rgb(228 236 248 / .18);

  /* elevation */
  --shadow-rest:    0 6px 16px -6px rgb(0 0 0 / .55);
  --shadow-pressed: 0 2px 6px -4px rgb(0 0 0 / .55);
}
```

Use the tokens. A raw hex in a component file is a bug, not a shortcut.

---

## 8. Mobile first, then desktop

**The phone is the source of truth.** Every screen in the Figma file is a 402px
phone frame. Build that first, get it right, and only then widen. Never design the
desktop layout first and squeeze it down — that is how you end up with a phone screen
full of things that were sized for a mouse.

### Breakpoints

```css
/* base = mobile, no media query. This is the design as drawn. */
@media (min-width: 600px)  { /* tablet / large phone landscape */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1440px) { /* wide */ }
```

### What must not change at any width

- The palette and the 60 / 30 / 10 split
- The accent budget — a wide screen does not earn more `sand`
- Touch targets stay ≥ 44px. Laptops have touchscreens
- Press state stays. It is not a mobile-only state

### What should change

| | Mobile | Desktop (≥1024px) |
|---|---|---|
| Content width | full bleed, 16–24px side gutter | centred, max **1200px**; reading text capped at **65ch** |
| Service cards | one column | **2 × 2 grid** — four across reads as a toolbar, not a menu |
| Navigation | hamburger | full horizontal nav in the `surface` bar, no hamburger |
| Hero | stacked, centred | two columns — the star mark and headline left, intro copy right |
| Footer | stacked groups | one row, link groups side by side |
| Auth screens | full-width card | centred card, max **440px**, never full width |
| Type scale | as drawn | headings up one step, body stays 14–16px |
| Hover | none | available — but never the *only* signal, see R-mobile below |

### Make the desktop worth looking at

The extra width is an opportunity, not empty space to pad. Three things that lift it
without touching the colour law:

1. **Give the hero room.** On desktop the star mark can run large — 120px or more —
   set beside the headline rather than stacked above it. It is the one place `sand`
   gets to be big.
2. **Let the card grid breathe.** 2 × 2 with a 20px gap, each card holding its
   shadow. The grid should feel like four solid objects, not four stretched bars.
3. **Use a sticky side rail on long pages.** The universities list and the majors
   list are long. A `surface` rail with the section links, sticky at the top, makes
   the page feel like an application instead of a scrolling document.

What not to do: full-width hero images, edge-to-edge text lines, four cards in a
single row of 300px-wide slivers, or a desktop nav that hides behind a hamburger.

### The hover rule

Hover only exists on desktop, so it may only ever *add* to a signal that is already
there at rest. Wrap it so it never sticks on touch devices:

```css
@media (hover: hover) {
  .card:hover { background: var(--c-blue-hover); }
}
```

Without that query the hover colour stays stuck on a phone after the finger lifts,
and the card looks permanently selected.

---

## 9. The Figma file — ask the agent to look

The coding agent has direct read access to the Figma file through the Figma
connection. It can open any frame and read the real values — exact hex, spacing,
font sizes, text content, layer structure — and take screenshots of any node.

**So do not guess, and do not describe a screen from memory.** Ask it to check.

```
Original:  figma.com/design/4rRZc11q5Bzsb4hf5jyzzT
Working:   figma.com/design/D70fADHJlwSd1fJ46VgTBR   ← the 60-30-10 page lives here
```

Useful things to ask for:

- "Open the Log in frame and give me the exact spacing and font sizes"
- "What is the real hex on that button?"
- "Screenshot the universities screen so we can compare against the build"
- "List everything in this frame that is not in the six-colour palette"

Two practical limits: the Figma plan is on a call quota, so batch questions into one
request rather than asking one at a time; and the file is the *reference*, not the
spec — where the file and this document disagree, **this document wins**.

---

## 10. Review checklist

Before any screen is called done:

- [ ] Every colour traces back to one of the six tokens
- [ ] Navy clearly dominates; `blue` is on actions only; `sand` appears rarely
- [ ] Exactly one primary `sand` action, and no more than three other `sand` marks
- [ ] No text opacity anywhere on a `blue` surface
- [ ] Every `blue` or `surface` panel on `ground` has both a border and a shadow
- [ ] Every meter has a `mist` @ 18% track and a `sand` fill
- [ ] Every tappable element has rest, pressed and focus states
- [ ] No two elements that must be distinguished share a token
- [ ] Touch targets ≥ 44px, gaps ≥ 8px
- [ ] No green, no grey hex, no off-white
- [ ] Built at 402px first, then checked at 600 / 1024 / 1440
- [ ] Nothing scrolls sideways at 360px
- [ ] Every hover rule is inside `@media (hover: hover)`
- [ ] Desktop uses the width — it is not a stretched phone column
- [ ] Anything uncertain was checked against the Figma file, not guessed