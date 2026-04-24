# Clutch-Giveaway_Page — CLAUDE.md

Project-specific context for the **Clutch.ca BMW X5 Giveaway** landing page.
Read this before making changes so edits stay consistent with the design system and intent.

---

## What this is

A single-page, hi-fi marketing landing page for a contest/giveaway campaign:
**"Win a Clutch Certified 2024 BMW X5."**

- Fixed campaign deadline (configurable via Tweaks)
- Hero → Why Certified → How to Win (3 steps) → Enter form → FAQ → Final CTA → Terms → Footer
- Mood direction: **sleek but fun / engaging** — glossy claymation 3D icons, bold type, soft neutrals, a single coral accent.

## Files

```
Giveaway Landing Page.html   Root doc. Loads styles + 3 jsx files + inline App()
styles.css                   Tokens, typography scale, buttons, nav, utilities
hero.jsx                     Hero section (BMW image, countdown, floating 3D icons)
sections.jsx                 WhyCertified, HowToWin, FAQ, FinalCTA, Terms, Footer
form.jsx                     EnterSection — entry form + step 2/3 mechanics
assets/                      BMW hero image + 3D claymation icons (PNG)
```

The inline babel script in the HTML contains only: `ClutchLogo`, `Nav`, `TweaksPanel`, `App`, and the `TWEAKS` EDITMODE block. **Everything visual lives in the external jsx files** — when the edit-comment tool references "the inline babel script near line N," line N almost always belongs in one of those external files. Find the element by its visible text, not line number.

## Design system — Clutch (from vunson codebase)

### Colors (semantic, from `vunson/src/foundations/tokens/colors.ts`)
- `--coral: #FF464C` — primary/brand accent. Use sparingly: primary button, one hero flourish, key highlights.
- `--ink: #0A0A0A` — primary text, dark surfaces
- `--ink-700 / --ink-500` — secondary/tertiary text
- Background: off-white / warm neutral (NOT pure white hero)
- No gradients as primary fills. A subtle radial or grain overlay is OK in the hero.

### Typography
- Display: tight tracking, heavy weight (800–900). Large hero headline.
- Body lede: readable at 18–20px, `--ink-700`.
- Avoid Inter/Roboto tropes — prefer the font stack already loaded (check `styles.css`).
- `text-wrap: pretty` / `balance` on headlines.

### Buttons (from `vunson/src/components/Button/Button.tsx`)
- Primary: coral fill, white text, medium radius
- Secondary: ink outline or subtle fill
- Don't reinvent — reuse the `.btn .btn-primary` / `.btn-secondary` classes in `styles.css`

### Motion
- Subtle tilt on hover for step cards (`TiltCard` wrapper)
- Parallax on hero 3D icons via scroll
- No aggressive gradient-shift or rainbow effects

## Conventions for this project

- **No emoji** in copy. Clutch is a professional auto-retail brand.
- **No arrow glyphs** in CTAs (→, ↗, ↓). Plain labels: "Enter contest", "Read all", "Start offer". We stripped these already — don't re-add.
- **No filler content.** If a section feels empty, solve with layout, not dummy copy.
- **3D icons are decorative** — glossy claymation style PNGs in `/assets`. Use for visual rhythm in hero, section starters, step card accents. Don't draw new ones in SVG.
- **BMW hero image** is `assets/bmw-x5.avif`. Real render — don't replace with a CSS illustration.
- **Certified badge** — use `clutch-certified-chrome-v2.png` (latest). The `.png` / `-v2` / `-3d` variants exist for exploration; v2 is current.

### Anchors / scroll targets
- `#how` → HowToWin section (3-step "how to win" cards)
- EnterSection form has a `formRef` that `scrollToForm()` targets directly
- `#rules` → Footer
- Step cards use `id="step-1" / "step-2" / "step-3"` for the "Jump to Step N" buttons

### Tweaks (EDITMODE)
Defaults live in the inline babel script, wrapped in `/*EDITMODE-BEGIN*/ ... /*EDITMODE-END*/`:
```js
{ "deadline": "2026-05-20T11:01:00-04:00", "heroVariant": "bold", "darkMode": false }
```
- `deadline` drives the hero countdown
- `heroVariant` cycles `default | bold | minimal` (hero visual density)
- Panel appears bottom-right when the toolbar Tweaks toggle is on

## How to Win — step card hierarchy

The 3 step cards in HowToWin are styled so **Step 2 is the focal point**:
- Steps 1 & 3: `minHeight: 300`, light border, subtle shadow
- **Step 2**: `minHeight: 340`, stronger grey stroke (`rgba(0,0,0,.22)`), layered shadow, `translateY(-10px)` lift
- Grid is `alignItems: stretch` so 1 & 3 match; 2 stands above.

Keep this relationship if you adjust step cards — don't flatten the hierarchy.

## Known "don'ts" (user feedback accumulated)

- Don't add informational filler (stats, extra sections) without asking
- Don't re-add arrow glyphs to buttons
- Don't replace the BMW image with illustration
- Don't reintroduce emoji
- Don't draw 3D icons in SVG — use the PNGs in `/assets`
- Don't use `scrollIntoView` via React's ref on an element without verifying the anchor id exists (we just moved `id="how"` from form to HowToWin)

## Reference

- Clutch design system codebase: `vunson/` (mounted local folder). Key files:
  - `vunson/src/foundations/tokens/colors.ts` — semantic colors
  - `vunson/src/foundations/tokens/typography.ts` — type scale
  - `vunson/src/foundations/tokens/primitives.ts` — raw tokens
  - `vunson/src/components/Button/Button.tsx` — button contract
  - `vunson/src/components/Logo/Logo.tsx` — logo SVG source
  - `vunson/src/layouts/LandingPage/LandingPage.tsx` — layout shell
