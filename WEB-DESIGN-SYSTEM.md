# Clutch Design System

The definitive reference for Clutch-branded web work. When in doubt, come back here.

---

## Logo

Always use the SVG inline — never a text wordmark, never a PNG in the nav.

```html
<svg width="100" height="25" viewBox="0 0 100 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5083 23.9786H24.9932V0H20.5083V23.9786Z" fill="#FF464C"/>
  <path d="M41.464 6.60867V16C41.464 19.0261 39.7394 20.2236 37.6028 20.2236C35.5854 20.2236 34.1945 19.0956 34.1945 16.7304V6.60867H29.7075V17.2869C29.7075 21.913 32.1618 24 36.2363 24C38.4972 24 40.4206 23.5031 41.464 21.9379V24H45.951V6.60867H41.464Z" fill="#FF464C"/>
  <path d="M60.8776 10.7727V6.45962H56.9471V0H52.4602V6.45962H49.4341V10.7727H52.4602V18.0074C52.4602 22.7031 54.5819 24.5466 60.8776 23.8509V19.7814C58.3036 19.9205 56.9471 19.8857 56.9471 18.0074V10.7727H60.8776Z" fill="#FF464C"/>
  <path d="M93.4186 6.12175C91.0882 6.12175 89.2795 6.99132 88.236 8.55653V0H83.749V24H88.236V14.6087C88.236 11.5826 89.8708 10.2957 92.0621 10.2957C94.0795 10.2957 95.5055 11.5131 95.5055 13.8783V24H99.9925V13.3217C99.9925 8.69566 97.1055 6.12175 93.4186 6.12175Z" fill="#FF464C"/>
  <path d="M8.26709 19.4449C8.56206 19.4983 8.86853 19.5279 9.18506 19.528C9.48204 19.528 9.7704 19.5012 10.0483 19.4557L11.7173 23.6422C10.9251 23.8615 10.0875 23.9801 9.22021 23.9801C8.3157 23.9801 7.45262 23.8603 6.64209 23.6403L8.26709 19.4449ZM9.22021 5.61487C12.6289 5.61487 15.5851 7.42392 17.0112 10.1022L17.0083 10.1031L17.0054 10.0963L12.9595 12.0211C12.2032 10.7946 10.8122 10.0319 9.18506 10.0319C6.50698 10.032 4.5249 12.015 4.5249 14.7975C4.52491 16.5639 5.34438 18.0133 6.64111 18.8239L5.01318 23.027C1.99368 21.5441 0.0376035 18.4687 0.0375977 14.7975C0.0375977 9.61488 3.93326 5.61487 9.22021 5.61487ZM17.0386 19.5328C16.195 21.0267 14.9064 22.2404 13.3433 23.0201L11.6851 18.8629C12.2087 18.5449 12.6452 18.1211 12.9702 17.609L17.0386 19.5328Z" fill="#FF464C"/>
  <path d="M72.6733 5.61487C76.082 5.61487 79.0383 7.42392 80.4644 10.1022H80.4634L80.4604 10.0953L76.4077 12.0123C75.6503 10.7908 74.2615 10.0319 72.6382 10.0319C69.9601 10.032 67.978 12.015 67.978 14.7975C67.978 17.5452 69.9601 19.5278 72.6382 19.528C74.2803 19.528 75.6617 18.8092 76.4233 17.61L80.4604 19.5192L80.4985 19.4381L80.5347 19.4586C79.039 22.1716 76.082 23.9801 72.6733 23.9801C67.3864 23.9801 63.4907 19.9801 63.4907 14.7975C63.4907 9.61488 67.3864 5.61487 72.6733 5.61487Z" fill="#FF464C"/>
</svg>
```

### Nav sizing

```css
.nav__logo { height: 22px; width: auto; display: block; }
```

### Rules

- **Always inline SVG** — not a text wordmark, not an `<img>` pointing to a PNG.
- **Red on light backgrounds** — `fill="#FF464C"` as above.
- **White on dark/plum backgrounds** — swap all `fill="#FF464C"` to `fill="#ffffff"`.
- **Never stretch or recolour** outside of red and white variants.

---

## Colours

Paste this block into `:root {}` at the top of every stylesheet.

```css
:root {
  /* brand */
  --plum:      #460B28;
  --red:       #FF464C;
  --cherry:    #800040;
  --lavender:  #F1EDF8;
  --green:     #549b5c;
  --stars:     #F5A623;

  /* text */
  --ink:       #111111;
  --body-ink:  #2A2A2A;
  --muted:     #666666;
  --subtle:    #999999;

  /* surfaces */
  --page:      #F5F4F2;
  --card:      #FFFFFF;
  --line:      #E8E8E8;

  /* shadows */
  --shadow-sm: 0 1px 4px rgba(0,0,0,.06), 0 2px 10px rgba(0,0,0,.05);
  --shadow:    0 2px 16px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.04);
}
```

### When to use each colour

| Colour | Hex | Use for |
|---|---|---|
| `--plum` | `#460B28` | Headlines, section titles, icon fills, strong emphasis |
| `--red` | `#FF464C` | CTA buttons, active links, highlights — one per section max |
| `--cherry` | `#800040` | Hover state on plum elements |
| `--lavender` | `#F1EDF8` | Tag/badge backgrounds, subtle card fills |
| `--green` | `#549b5c` | Positive data, success states, confirm buttons |
| `--stars` | `#F5A623` | Review star ratings |
| `--ink` | `#111111` | Largest, heaviest headlines only |
| `--body-ink` | `#2A2A2A` | All body paragraphs |
| `--muted` | `#666666` | Captions, meta info, secondary labels |
| `--subtle` | `#999999` | Placeholder text, disabled states |
| `--page` | `#F5F4F2` | Always the page background — warm cream, never pure white |
| `--card` | `#FFFFFF` | Cards and panels sitting on `--page` |
| `--line` | `#E8E8E8` | Dividers, input borders, table rows |

**Never use pure black (`#000000`) on web.** Use `--ink` for the darkest surfaces.

**Gradients are for primary buttons only.** Never use a gradient on a hero, header, section background, or card. Dark sections use `var(--plum)` flat.

---

## Layout

### Container

All page content is capped at **1300px** and centred. Never let content run edge-to-edge on wide screens.

```css
.container {
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 clamp(20px, 6%, 80px);
}
```

Use `clamp()` for horizontal padding so it scales gracefully from mobile to desktop without media queries.

---

## Cards

Cards sit on `--page`, use `background: var(--card)`, `border-radius: 12px–16px`, and `var(--shadow-sm)`.

### What not to do

**Never use a card with a coloured top border** (e.g. `border-top: 3px solid var(--plum)`). That pattern is off-brand and not part of the system. If you need to distinguish a card, use a badge, an icon circle, or a background fill instead.

---

## Typography

**Font:** CircularXX. Always loaded first; fallback to system sans-serif.

### Loading the font

Font files live in `/fonts/`. You must declare `@font-face` yourself — there is no CDN. Adjust the path to match your file's location relative to the stylesheet.

```css
@font-face {
  font-family: 'CircularXX';
  src: url('./fonts/CircularXX-Regular.woff2') format('woff2'),
       url('./fonts/CircularXX-Regular.otf') format('opentype');
  font-weight: 400;
}
@font-face {
  font-family: 'CircularXX';
  src: url('./fonts/CircularXX-Medium.woff2') format('woff2'),
       url('./fonts/CircularXX-Medium.otf') format('opentype');
  font-weight: 500;
}
@font-face {
  font-family: 'CircularXX';
  src: url('./fonts/CircularXX-Bold.woff2') format('woff2'),
       url('./fonts/CircularXX-Bold.otf') format('opentype');
  font-weight: 700;
}
```

> **Common mistake:** writing `font-family: 'CircularXX'` in your body styles without the `@font-face` block above. The browser silently falls back to system-ui and the page looks wrong. Always include both.

```css
body {
  font-family: 'CircularXX', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 15.5px;
  line-height: 1.7;
  color: var(--body-ink);
  -webkit-font-smoothing: antialiased;
}
```

### Type scale

| Role | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero headline | `clamp(36px, 6vw, 80px)` | 800 | 1.08 | -1.5px |
| Page title `<h1>` | `clamp(28px, 4vw, 52px)` | 800 | 1.1 | -0.8px |
| Section heading `<h2>` | `clamp(22px, 3vw, 36px)` | 800 | 1.2 | -0.5px |
| Sub-heading `<h3>` | `18.5px` | 700 | 1.3 | -0.2px |
| Body `<p>` | `15.5px` | 400 | 1.7 | 0 |
| Caption / meta | `13px` | 500 | 1.5 | 0 |
| Label / eyebrow | `11px` | 700 | 1 | 1px |
| Stat number | `clamp(42px, 8vw, 96px)` | 900 | 1 | -2px |

### Rules

- **Stat numbers** always get `font-variant-numeric: tabular-nums` so digits don't shift.
- **Eyebrows/labels** are always `text-transform: uppercase` and `letter-spacing: 1px`.
- **No eyebrows anywhere.** Don't use small uppercase labels above headlines — not on hero sections, not on result cards, not on section headings. If you need to orient the user, do it through the headline itself or with brand imagery.
- **No orphans.** Apply `text-wrap: balance` to all headlines and `text-wrap: pretty` to all body copy and subtitles. This prevents single words stranded on the last line.
- **Body copy** never goes below `14px` or above `17px`.
- **Line-height** is `1.65–1.75` for body, `1.08–1.2` for headlines.
- Use `clamp()` for any headline — never fixed `px` for h1/h2.

```css
/* paste on every headline */
h1, h2, h3 { text-wrap: balance; }

/* paste on every body element */
p, li, blockquote { text-wrap: pretty; }
```

---

## Buttons

### Primary button

The main call to action. One per section. Always red.

```html
<a href="#" class="btn">Get started</a>
```

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 16px 32px;
  background: linear-gradient(to top, #FF1C24 0%, #FF464C 46.875%);
  color: #fff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1;
  border-radius: 99px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  box-shadow:
    0.6px 0.6px 2px rgba(126,7,11,0.32),
    inset 0px 1px 2px rgba(255,255,255,0.45);
  transition: transform 0.2s, box-shadow 0.2s;
}

/* shimmer — always on for primary buttons */
@keyframes btn-shimmer {
  0%   { left: -120%; }
  100% { left: 120%; }
}
.btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -120%;
  width: 80%;
  height: 100%;
  background: linear-gradient(120deg,
    rgba(255,255,255,0) 0%,
    rgba(255,255,255,0.08) 30%,
    rgba(255,255,255,0.22) 50%,
    rgba(255,255,255,0.08) 70%,
    rgba(255,255,255,0) 100%
  );
  animation: btn-shimmer 4s ease-in-out infinite;
  pointer-events: none;
}
```

### Secondary button

For supporting actions alongside a primary CTA. Outlined, plum.

```html
<a href="#" class="btn-secondary">Learn more</a>
```

```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 28px;
  background: transparent;
  color: var(--plum);
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.1px;
  line-height: 1;
  border-radius: 99px;
  border: 1.5px solid var(--plum);
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}
```

### Button interactions

Apply these to both `.btn` and `.btn-secondary`.

```css
/* Primary */
.btn:hover {
  transform: scale(1.03);
  box-shadow:
    0 4px 16px rgba(255,70,76,0.35),
    inset 0px 1px 2px rgba(255,255,255,0.45);
}
.btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}

/* Secondary */
.btn-secondary:hover {
  background: var(--plum);
  color: #fff;
  border-color: var(--plum);
}
.btn-secondary:active {
  transform: scale(0.98);
  opacity: 0.9;
}

/* Both — keyboard focus */
.btn:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid var(--plum);
  outline-offset: 3px;
}
```

### Button rules

- **Border-radius is always `99px`** — never `4px`, `8px`, or square on a button.
- **Primary is always red gradient** — never flat red, never plum.
- **Secondary is always outlined plum** — never a ghost button with grey border. Do not change the colour to white when placing it on a dark background; use a single primary `.btn` instead, or reconsider the layout.
- **Font-weight is `400`** on primary buttons. Secondary buttons use `700`.
- **No icons on buttons.** Text only. Icons inside a button add visual noise and are not part of the system.
- **One primary per section.** If you need two actions, one is primary, one is secondary.
- Buttons used as `<a>` tags get `text-decoration: none`. Buttons used as `<button>` tags get `background: none; border: none` reset first, then apply the styles above.

### Shimmer

The shimmer is baked into `.btn` via `::after` — no extra class needed. Every primary button shimmers automatically. Never apply a shimmer to `.btn-secondary`.

**When shimmer is appropriate:**
- ✅ Hero CTAs — the main action on a landing or campaign page
- ✅ Final CTA sections — the last push before the user leaves
- ✅ Standalone conversion moments (quiz result, confirmation screen)

**When to suppress it:**
- ❌ Utility buttons — form submits, filters, pagination, inline actions
- ❌ Repeated buttons in a list or grid (e.g. a "View" button on every car card) — shimmer on every card is noisy and loses meaning
- ❌ Any context where the button appears more than once on screen at the same time

To suppress: override `animation: none` on the `::after` pseudo-element.

```css
.btn--no-shimmer::after { animation: none; }
```

---

## Clutch Certified Badge

### Asset

```
https://fastly.clutch.ca/assets/clutch-certified-landing/cc-badge.png?class=png
```

Always use this URL — never a local copy. It's served from Fastly and stays up to date.

```html
<img
  src="https://fastly.clutch.ca/assets/clutch-certified-landing/cc-badge.png?class=png"
  alt="Clutch Certified"
  class="cc-badge"
>
```

### Sizing

| Context | Width |
|---|---|
| Car listing card | `64px` |
| Hero / feature section | `96px` |
| Large trust block | `120px` |

Always set width only — let height scale naturally. Never distort the badge.

```css
.cc-badge { width: 64px; height: auto; display: block; }
```

### When to use

- ✅ Car listing cards for Certified vehicles — badge sits near the car title or image
- ✅ The Clutch Certified landing page
- ✅ Trust signals near a purchase or checkout CTA
- ✅ Emails for Certified car promotions

### When not to use

- ❌ On non-Certified vehicles — never use the badge as general decoration
- ❌ On marketing pages unrelated to certification
- ❌ Scaled below `48px` — it becomes illegible
- ❌ Placed on dark or busy backgrounds without enough contrast clearspace

### Clearspace

Give the badge at least `12px` of space on all sides. Don't crowd it with text or other badges.

---

## Icons

### Library

**Material Symbols Rounded** — this is the only icon library we use.

- Load via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@40,400,0,0" rel="stylesheet">
```

- Use in HTML with the ligature name:
```html
<span class="material-symbols-rounded">verified</span>
<span class="material-symbols-rounded">speed</span>
<span class="material-symbols-rounded">electric_bolt</span>
```

### Settings — always use these

| Parameter | Value |
|---|---|
| Style | **Rounded** (not Outlined, not Sharp) |
| Weight (`wght`) | `400` |
| Optical size (`opsz`) | `40` |
| Fill (`FILL`) | `0` (unfilled) |
| Grade (`GRAD`) | `0` |

These are set in the font URL. Don't change them.

### Finding icons

1. Go to **fonts.google.com/icons**
2. Search for what you need (e.g. "check", "speed", "shield")
3. Select the **Rounded** variant
4. Set Weight → 400, Optical size → 40
5. Copy the icon name (e.g. `verified_user`) — that's all you need for the ligature

### Icon sizes

| Context | Size |
|---|---|
| Inline with body text | `20px` |
| Card icon | `24px` |
| Feature icon in circle | `24px` |
| Large decorative | `48px` |

```css
.icon {
  font-size: 24px; /* controls size */
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 40;
}
```

### Icon circle (for feature/card sections)

A circle container behind the icon. Use when icons sit above copy in a card.

```html
<div class="icon-circle">
  <span class="material-symbols-rounded">electric_bolt</span>
</div>
```

```css
.icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #48071D;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.icon-circle .material-symbols-rounded {
  font-size: 24px;
  color: #fff;
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 40;
}
```

### Icon colour rules

| Context | Icon colour |
|---|---|
| On `--page` or `--card` (light bg) | `var(--plum)` |
| Inside icon circle | `#fff` (white) |
| Success/positive | `var(--green)` |
| On dark/plum bg | `#fff` or `rgba(255,255,255,0.8)` |
| Inline with muted text | `var(--muted)` |

### When to use icons

- ✅ Feature lists (what's included, how it works)
- ✅ Card grids where each card represents a distinct concept
- ✅ Inline with a single key stat or callout
- ✅ UI affordances (chevron, close, search)
- ❌ Decoration — don't add icons just to fill space
- ❌ More than one icon per line of body text
- ❌ Custom SVGs from Figma that aren't in Material Symbols — stay in the library

---

## Motion

Three durations, one easing curve for expressive motion. That's it.

```css
:root {
  --motion-micro:      0.15s ease;        /* instant feedback */
  --motion-standard:   0.2s ease;         /* default hover/state change */
  --motion-expressive: 0.4s cubic-bezier(0.16, 1, 0.3, 1); /* panels, accordions, reveals */
}
```

### When to use each

| Token | Duration | Use for |
|---|---|---|
| `--motion-micro` | `0.15s` | Opacity, colour, border — anything that should feel instant |
| `--motion-standard` | `0.2s` | Transform, box-shadow, background on hover |
| `--motion-expressive` | `0.4s` | Height/size changes, things sliding or expanding into view |

### Usage

```css
/* micro — colour/opacity feedback */
.btn        { transition: opacity var(--motion-micro); }
.nav__link  { transition: opacity var(--motion-micro); }

/* standard — spatial hover */
.card:hover { transition: transform var(--motion-standard), box-shadow var(--motion-standard); }

/* expressive — UI that opens or reveals */
.faq__a    { transition: height var(--motion-expressive); }
.dropdown  { transition: opacity var(--motion-expressive), transform var(--motion-expressive); }
```

### Rules

- **Always list specific properties** — never `transition: all`. It's a performance hit and catches things you didn't mean to animate.
- **Never mix `ms` and `s`** in the same file. We use seconds (`0.15s`), not milliseconds (`150ms`).
- **Don't animate layout properties** (`width`, `height` on arbitrary elements, `padding`) — use `transform` and `opacity` wherever possible for 60fps.
- **Expressive motion is for UI, not decoration.** Don't use `--motion-expressive` on a button hover — save it for things that meaningfully change size or position.
- **Respect `prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

## Images

```css
img {
  display: block;
  height: auto;
  border: 0;
  width: 100%;
}
```

- Always `display: block` — inline images leave a phantom whitespace gap below them.
- Always `height: auto` — never hardcode a height unless you're also using `object-fit: cover`.
- Car thumbnails and category cards: `border-radius: 8px`.
- Hero images: `object-fit: cover` with a `max-height` to keep them from running too tall.
- Never use percentage `width` attributes — use `width: 100%` in CSS and a fixed pixel value in the `width` attribute for email, or just CSS for web.

---

## Copy & Grammar

These rules apply everywhere — web, email, ads. Consistent voice across all surfaces.

### Sentence case

All copy uses sentence case. Only the first word of a sentence and proper nouns are capitalised.

| ✅ Correct | ❌ Wrong |
|---|---|
| `Your car is worth more than you think.` | `Your Car Is Worth More Than You Think.` |
| `Get my offer` | `Get My Offer` |
| `Browse Clutch Certified` | `Browse clutch certified` |
| `Shop certified` | `Shop Certified` (unless "Clutch Certified" in full) |

### Proper nouns — always capitalised

- **Clutch** — the brand name, always capitalised
- **Clutch Certified** — both words always capitalised, always together

### Punctuation

- **No exclamation marks** in headlines or body copy. They undermine trust. One per email subject line max — never on web.
- **Em dash** (`—`) for parenthetical phrases — not a hyphen or double hyphen.
- **No ampersands** (`&`) in body copy. Write `and`. Fine in button text and short labels where space is tight.
- **Periods** on every complete body sentence. Headlines may omit if consistent within the page.

### Voice

- **Active voice.** "We'll buy your car" not "Your car will be bought."
- **Contractions are fine.** "We'll", "It's", "You're", "Don't" — they sound human.
- **No ALL CAPS** for emphasis — use `font-weight` in a `<span>` if needed.
- **Numbers** — numerals for 10 and above, spell out one through nine in running prose.
- **No emojis** in body copy or headlines.

---

## Star Ratings

Review stars use `#F5A623` (amber). Use the Unicode character `★` or `&#9733;`.

```css
.stars {
  color: #F5A623;
  letter-spacing: 3px;
  font-size: 20px;
}
```
