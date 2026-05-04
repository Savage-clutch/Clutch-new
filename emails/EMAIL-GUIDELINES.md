# Clutch Email Design Guidelines

> **Building new refined templates:** Every component needed to build any email is documented here. Start with the HTML Shell, drop in section blocks, done. Do not copy-paste from existing templates.

---

---

## HTML Shell

Every email starts with this skeleton. Paste it, fill in the preheader text, then insert section blocks between the outer wrapper comments.

```html
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <!--[if mso]>
  <xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    <o:OfficeDocumentSettings>
      <o:PixelsPerInch>96</o:PixelsPerInch>
      <o:AllowPNG/>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet" type="text/css">
  <!--<![endif]-->
  <!--
  ==============================================
    CLUTCH EMAIL STYLE TOKENS
  ==============================================
  (paste full tokens block here — see Style Tokens section below)
  ==============================================
  -->
  <style>
    *{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}
  </style>
  <!--[if mso]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style><![endif]-->
</head>
<body style="background-color:#f4f4f4;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">

<!-- PREHEADER -->
<div style="display:none;max-height:0;overflow:hidden;color:#f4f4f4;font-size:1px">Preheader text here&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;</div>

<!-- ══ OUTER WRAPPER ══════════════════════════════════════════════ -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#f4f4f4">
  <tbody><tr><td>

  <!-- SECTION BLOCKS GO HERE -->

  </td></tr></tbody>
</table>

</body>
</html>
```

---

## Preheader

```html
<div style="display:none;max-height:0;overflow:hidden;color:#f4f4f4;font-size:1px">Preheader text here&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;&#8203;</div>
```

- `color:#f4f4f4;font-size:1px` — camouflage against page background. No `font-family`.
- Pad to ~90+ characters with `&nbsp;&#8203;` pairs to stop inbox preview bleeding into body text.

---

## Section Wrapper Pattern

Every section — header, hero, content, footer — uses the same outer/inner table structure. The outer table is full-width; the inner table is always 480px centered.

```html
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto" width="480">
      <tbody>
      <tr><td style="padding:32px 40px">
        <!-- content -->
      </td></tr>
      </tbody>
    </table>
  </td></tr></tbody>
</table>
```

- `border-radius:12px 12px 0 0` goes on the **first section's inner `<table>`**
- `border-radius:0 0 12px 12px` goes on the **footer's `<td>`** (never on `<table>`)
- Background-less sections (NBA banner, hero image) omit `background-color:#ffffff` from the inner table

---

## Design System

### Global Styles

| Property | Value |
|---|---|
| Email card width | `480px` — all inner tables |
| Content inset | `40px` horizontal padding → 400px text area |
| Page background | `#f4f4f4` — body + outer wrapper only, never on section `<td>`s |
| Card background | `#ffffff` — all content sections |
| Font family | `'Poppins', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif` |
| Max font weight | `600` — never use 700, 800, `bold`, or `<strong>` |

---

### Colors

| Token | Value | Use |
|---|---|---|
| Text | `#191919` | All text — headings, body, labels. Never `#555555` or `#292929` |
| Page bg | `#f4f4f4` | Outer page only |
| Card bg | `#ffffff` | Content section backgrounds |
| CTA red top | `#FF464C` | Button gradient top, outline border + text |
| CTA red bottom | `#FF1C24` | Button gradient bottom |
| Lavender | `#F1EDF8` | Lavender feature card background |
| Plum | `#48071D` | Icon circle backgrounds |
| Stars | `#F5A623` | Review star ratings |

---

### Typography Scale

Use `<p style="margin:0;...">` for all text — never `<h1>`–`<h6>` tags. Copy the complete style strings below directly onto your `<p>` tags.

| Role | Size | Weight | Color | Letter-spacing | Line-height | Use when |
|---|---|---|---|---|---|---|
| Hero Display | 36px | 600 | `#191919` | `-0.5px` | `1.15` | Brand/campaign headline, welcome emails |
| Headline | 32px | 600 | `#191919` | `-0.5px` | `1.15` | Main functional headline |
| H2 | 22px | 600 | `#191919` | `-0.3px` | `1.2` | Section heading, vehicle title, price |
| H3 | 15px | 600 | `#191919` | — | `1.3` | Numbered list item heading, feature item heading |
| Body | 14px | 500 | `#191919` | — | `1.6` | Standard body copy |
| Subtitle | 14px | 400 | `#191919` | — | `1.6` | Supporting centered text — never grey |
| Label | 14px | 600 | `#191919` | — | — | Car title links, category labels |
| Button — primary | 17px | 500 | `#ffffff` | `-0.2px` | — | Gradient CTA `<span>` |
| Button — secondary | 14px | 500 | `#FF464C` | `-0.2px` | — | Outline button `<span>` |

**Copy-paste `<p>` markup for each role:**

```html
<!-- Hero Display -->
<p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:36px;font-weight:600;color:#191919;line-height:1.15;letter-spacing:-0.5px">Text</p>

<!-- Headline -->
<p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:32px;font-weight:600;color:#191919;line-height:1.15;letter-spacing:-0.5px">Text</p>

<!-- H2 -->
<p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:600;color:#191919;line-height:1.2;letter-spacing:-0.3px">Text</p>

<!-- H3 -->
<p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:600;color:#191919;line-height:1.3">Text</p>

<!-- Body -->
<p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:500;color:#191919;line-height:1.6">Text</p>

<!-- Subtitle (always centered) -->
<p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:400;color:#191919;line-height:1.6;text-align:center">Text</p>

<!-- Label / car title link -->
<p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;color:#191919"><a href="URL" target="_blank" style="text-decoration:none;color:#191919">Text</a></p>
```

---

### Spacing System

All spacing via `padding` on `<td>` — never on `<p>` or `<div>`.

**Horizontal padding rule: all content section `<td>`s use `40px` left and right.** The only exceptions are the logo header, social links row, and category grid heading — documented in the table below. Any `32px` horizontal value in a content row is a violation.

| Context | Value |
|---|---|
| Section standard (single row) | `padding:32px 40px` |
| Section — headline row | `padding:32px 40px 16px` |
| Section — mid row | `padding:0 40px 8px` |
| Section — last row | `padding:0 40px 32px` |
| Button row | `padding:24px 40px 24px` |
| Logo header — centered | `padding:48px 25px 24px` ← 25px intentional (logo is centered) |
| Logo header — 2-col left td | `padding:32px 0 24px 32px` ← 32px intentional (header-only) |
| Logo header — 2-col right td | `padding:32px 32px 24px 0` ← 32px intentional (header-only) |
| Social links row | `padding:28px 32px 24px` ← 32px intentional (footer zone) |
| Category grid heading | `padding:40px 32px 24px` ← 32px intentional (grid inset) |
| Hero / full-width banner | `padding:0` + `font-size:0;line-height:0` on `<td>` |

---

### Content Block Specs

Quick reference for every section type. "Padding" is the value on the primary content `<td>`.

| Block | Bg | Border-radius | Padding |
|---|---|---|---|
| Logo — centered | `#ffffff` | `12px 12px 0 0` on inner `<table>` | `48px 25px 24px` |
| Logo — 2-column | `#ffffff` | `12px 12px 0 0` on inner `<table>` | `32px 0 24px 32px` / `32px 32px 24px 0` |
| Hero image | none | none | `padding:0`, `font-size:0;line-height:0` |
| Text section | `#ffffff` | none | Headline `32px 40px 16px` → rows `0 40px 8px` → last `0 40px 32px` |
| Vehicle card | `#ffffff` | none | Image `0 40px 16px` · title `0 40px 4px` · price `0 40px 4px` · button `24px 40px 24px` |
| Numbered list | `#ffffff` | none | Heading `40px 40px 0` · subtitle `24px 40px 32px` · rows outer `0 40px 8px` · button `24px 40px 24px` |
| RTB / confidence | `#ffffff` | none | Heading `0 40px 32px` |
| Icon circle section | `#ffffff` | none | Centered items; `margin:0 0 40px` between (last `36px`) |
| Lavender card | `#F1EDF8` | `24px` (all corners) on inner card `<table>` | `16px 40px 32px` |
| Offer card | `#F7F7F7` | `16px` (all corners) on inner card `<table>` | heading row `24px 0 0 24px` / body+button `24px` sides |
| Quote card | `#F7F7F7` top / `#FF464C` bottom | `14px` on top `<td>` + bottom `<td>` | Varies — see Quote Card section |
| Category grid | `#ffffff` | `8px` on images | `cellpadding="5"` on image table; label `padding:6px 0 12px` |
| NBA banner | `#ffffff` | none | `padding:0`, `font-size:0;line-height:0` |
| Social links | `#ffffff` | none | `28px 32px 24px` |
| Footer snippet | `#ffffff` | `0 0 12px 12px` on `<td>` | via snippet |

---

### Button Types

| | Primary — Gradient CTA | Secondary — Outline |
|---|---|---|
| **Use for** | All main calls to action | Supporting header actions (e.g. "Chat Now") |
| **Background** | `linear-gradient(to top,#FF1C24 0%,#FF464C 46.875%)` | `#ffffff` |
| **Border** | none | `2px solid #FF464C` |
| **Border-radius** | `99px` | `99px` |
| **Shadow** | `inset 0px 1px 2px rgba(255,255,255,0.45)` | none |
| **Font** | Poppins 17px 500 `#ffffff` `ls -0.2px` | Poppins 14px 500 `#FF464C` `ls -0.2px` |
| **Padding** | `14px 44px` (std) · `14px 28px` (narrow) | `10px 28px` |
| **VML arcsize** | `54%` | `54%` |
| **VML fillcolor** | `#ff464c` | `#ffffff` |
| **VML stroke** | `weight="0px" color="#ff464c"` | `weight="2px" color="#FF464C"` |

---

## Transforming an Existing Template

When given any email template to refine, work through this checklist top to bottom. Each item has an exact fix — no guessing.

### Audit Checklist

**Shell & head**
- [ ] `<!DOCTYPE html>` present, `<html>` has VML namespaces (`xmlns:v`, `xmlns:o`)
- [ ] MSO `<xml>` block present (PixelsPerInch, AllowPNG)
- [ ] Poppins import: `Poppins:wght@400;500;600` — not 100, 700, or 800
- [ ] Style tokens HTML comment block present after `<link>` (see Style Tokens section)
- [ ] Style reset present: `*{box-sizing:border-box}body{margin:0;padding:0}...`
- [ ] MSO sup/sub fix present
- [ ] `<body>` has `background-color:#f4f4f4`
- [ ] Outer wrapper `<table>` has `background-color:#f4f4f4`

**Preheader**
- [ ] Hidden div has `color:#f4f4f4;font-size:1px` — no `font-family`
- [ ] Padded with `&nbsp;&#8203;` pairs to suppress body text bleed

**Colors**
- [ ] No `#555555`, `#292929`, `#888888`, or any grey in text — replace all with `#191919`
- [ ] Page/body background is `#f4f4f4`

**Typography**
- [ ] Every text element uses the full Poppins font stack
- [ ] No `<h1>`–`<h6>` tags — replace with `<p style="margin:0;...">` using the correct role style
- [ ] No `font-weight:700`, `font-weight:bold`, or `<strong>` — max weight is `600`
- [ ] No emojis in copy

**Spacing & structure**
- [ ] All padding on `<td>`, never on `<p>` or `<div>`
- [ ] `border-radius` on `<td>`, never on `<table>` (email clients ignore it on tables)
- [ ] No `overflow:hidden` on any `<table>`
- [ ] First section's inner `<table>` has `border-radius:12px 12px 0 0`
- [ ] Footer `<td>` has `border-radius:0 0 12px 12px`

**Buttons**
- [ ] All CTAs use the gradient button (see Primary button HTML)
- [ ] VML: `arcsize="54%"`, `fillcolor="#ff464c"` (lowercase), `<v:stroke>` with `weight="0px"` — no `<v:fill>` tag
- [ ] Button span: `background-image:linear-gradient(to top,#FF1C24 0%,#FF464C 46.875%)`, `border-radius:99px`
- [ ] Outline buttons (secondary): white bg, `border:2px solid #FF464C`, `border-radius:99px`

**Links**
- [ ] Car title links: `<a href="..." style="text-decoration:none;color:#191919">`

**Logo**
- [ ] Logo image: 110px wide, CDN URL (see Headers section)

**Hero**
- [ ] Hero image present between logo and first content section
- [ ] Hero uses `max-height:260px;object-fit:cover` to control height
- [ ] Hero src is `../hero.png` (placeholder) or a hosted CDN asset

**Footer**
- [ ] Order is: NBA Banner → Social Links → Footer snippet — in that sequence
- [ ] NBA banner src is the correct CDN URL (see Footer section)
- [ ] Footer snippet is `{{{ snippet "Email-Footer-Left-NHL" }}}` — never hardcoded content
- [ ] Social links: 4 icons (Instagram, Facebook, TikTok, X) — see Social Links Row section

---

### Common Violations → Fixes

| What you see | Replace with |
|---|---|
| `#555555` or `#292929` or `#888888` in any text | `#191919` |
| `linear-gradient(180deg,#FF464C 0%,#D93E43 100%)` | `linear-gradient(to top,#FF1C24 0%,#FF464C 46.875%)` |
| `border-radius:26px` on button | `border-radius:99px` |
| `box-shadow:0 2px 8px rgba(255,70,76,0.35)` | `box-shadow:0.6px 0.6px 2px 0px rgba(126,7,11,0.32),inset 0px 1px 2px 0px rgba(255,255,255,0.45)` |
| `<v:fill type="gradient" .../>` inside VML | Delete the `<v:fill>` line entirely — use `<v:stroke>` only |
| `arcsize="50%"` | `arcsize="54%"` |
| `fillcolor="#FF464C"` (uppercase) | `fillcolor="#ff464c"` (lowercase) |
| `font-family:Arial,sans-serif` (no Poppins) | `font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif` |
| `font-weight:700` or `font-weight:bold` | `font-weight:600` |
| `<strong>text</strong>` | `<span style="font-weight:600">text</span>` |
| `<h1>`, `<h2>`, `<h3>` etc. | `<p style="margin:0;...">` with matching role style from Typography Scale |
| `font-family` on preheader `<div>` | Remove it — preheader needs only `color:#f4f4f4;font-size:1px` |
| `font-size:0` missing on hero/banner `<td>` | Add `font-size:0;line-height:0` to kill whitespace gap below image |
| `border-radius` on `<table>` | Move to `<td>` — `border-radius` on tables is ignored by most clients |
| `overflow:hidden` on `<table>` | Remove entirely |
| `padding` on `<p>` or `<div>` | Move to the wrapping `<td>` |
| Social Links appearing before NBA banner | Swap blocks: NBA Banner must come first |
| `{{{ snippet "test_only_2024_footer_1" }}}` | `{{{ snippet "Email-Footer-Left-NHL" }}}` |
| Car title as plain text or underlined link | Wrap in `<a href="..." style="text-decoration:none;color:#191919">` |
| `width="80%"` on images | Use `width:100%` in style + fixed pixel `width` attribute |
| `32px` horizontal padding on a content `<td>` (not logo/social/grid heading) | Change to `40px` — content inset is always 40px |
| `Poppins:wght@100` in Google Fonts import | Change to `Poppins:wght@400;500;600` |

---

## Style Tokens Comment Block

Every template should open with this comment block after the `<link>` import. It acts as a quick reference and makes templates self-documenting.

```html
<!--
==============================================
  CLUTCH EMAIL STYLE TOKENS
==============================================

  COLORS
  --color-text-primary:     #191919
  --color-text-secondary:   #191919
  --color-bg-page:          #f4f4f4
  --color-bg-white:         #FFFFFF
  --color-lavender:         #F1EDF8
  --color-plum:             #48071D
  --color-red-cta-top:      #FF464C
  --color-red-cta-bottom:   #FF1C24
  --color-stars:            #F5A623

  TYPOGRAPHY
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif

  hero-display:   600  36px  #191919  lh 1.15  ls -0.5px
  headline:       600  32px  #191919  lh 1.15  ls -0.5px
  h2:             600  22px  #191919  lh 1.2   ls -0.3px
  h3:             600  15px  #191919  lh 1.3
  body:           500  14px  #191919  lh 1.6
  subtitle:       400  14px  #191919  lh 1.6   centered
  label:          600  14px  #191919
  button:         500  17px  #FFFFFF  ls -0.2px

  COMPONENTS
  button:         gradient(#FF1C24 → #FF464C), radius 99px,
                  shadow: 0.6px 0.6px 2px rgba(126,7,11,0.32) + inset 0px 1px 2px rgba(255,255,255,0.45)
                  padding: 14px 44px
  card-lavender:  bg #F1EDF8, radius 24px, padding 16px 40px 32px
  icon-circle:    bg #48071D, 52×52px circle, white SVG icon 24px
  number-circle:  bg #191919, 44×44px circle, white numeral, 16px 600
  thumbnail:      radius 8px, display:block, height:auto, border:0
  quote-card:     top #F7F7F7 + bottom #FF464C, radius 14px
                  border-radius on each <td> individually — NOT on <table>, no overflow:hidden
==============================================
-->
```

---

## Headers

### Standard logo header (centered)

Use for most emails. Always the first section — always gets `border-radius:12px 12px 0 0` on the inner table.

```html
<!-- ══ LOGO ═══════════════════════════════════════════════════════ -->
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto;border-radius:12px 12px 0 0" width="480">
      <tbody><tr><td style="padding:48px 25px 24px;text-align:center">
        <a href="https://www.clutch.ca/" target="_blank">
          <img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/669d5713-9b6a-46bb-bd7e-c542cff6dd6a/3a0db20356b44930a73f8089f5820d2e/Clutch%20Logo%20Red.png"
            width="110" style="display:block;height:auto;border:0;margin:0 auto" alt="Clutch" height="auto">
        </a>
      </td></tr></tbody>
    </table>
  </td></tr></tbody>
</table>
```

### Logo + secondary button header (2-column)

Use when an inline action needs to sit alongside the logo (e.g. "Chat Now"). Logo left, button right. Use reduced top padding (`32px`) since the button lowers the visual weight.

```html
<!-- ══ LOGO + BUTTON ══════════════════════════════════════════════ -->
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto;border-radius:12px 12px 0 0" width="480">
      <tbody><tr>
        <td style="padding:32px 0 24px 32px;vertical-align:middle">
          <a href="https://www.clutch.ca/" target="_blank">
            <img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/669d5713-9b6a-46bb-bd7e-c542cff6dd6a/3a0db20356b44930a73f8089f5820d2e/Clutch%20Logo%20Red.png"
              width="110" style="display:block;height:auto;border:0" alt="Clutch" height="auto">
          </a>
        </td>
        <td style="padding:32px 32px 24px 0;vertical-align:middle;text-align:right">
          <!-- Outline button (see Outline Button below) -->
        </td>
      </tr></tbody>
    </table>
  </td></tr></tbody>
</table>
```

---

## Copy & Grammar Standards

### Sentence case

All copy uses sentence case — only the first word of a sentence and proper nouns are capitalised. This applies everywhere: headlines, body copy, button text, section headings, and preheaders.

| ✅ Correct | ❌ Wrong |
|---|---|
| `Your car is worth more than you think.` | `Your Car Is Worth More Than You Think.` |
| `Get my offer` | `Get My Offer` |
| `Why buy on Clutch` | `Why Buy On Clutch` |
| `Sell your car` | `Sell Your Car` |
| `Get pre-approved` | `Get Pre-Approved` |
| `Shop Certified` | `shop certified` |

### Proper nouns — always capitalised

These terms are always capitalised regardless of position in a sentence:

- **Clutch** — the brand name
- **Clutch Certified** — the certification programme (both words always cap)
- **Canada**, **Ontario**, **Nova Scotia**, etc. — place names

### Button text

Button text follows sentence case. Multi-word CTAs capitalise only the first word unless a proper noun appears:

- `Get my offer` ✓
- `Shop Certified` ✓ — "Certified" is part of the "Clutch Certified" brand term
- `Browse Clutch Certified` ✓ — proper brand term
- `Chat now` ✓
- `Get pre-approved` ✓

### Punctuation

- **Headlines** — may or may not end with a period; be consistent within an email. Conversational fragments are fine without one ("Your car is worth more than you think." or "Time to make your move" — pick one style per email).
- **No exclamation marks** in headlines or body copy. They undermine trust. The one exception is short, celebratory subject lines where one `!` is intentional — never more than one per email.
- **Periods on body copy** — every complete sentence ends with a period.
- **Em dash** (`—`) for parenthetical phrases, not a hyphen (`-`) or double hyphen (`--`).
- **No ampersands** (`&`) in body copy — write `and`. Ampersands are acceptable in button text and short labels where space is tight (e.g. `AWD & 4WD`).

### Grammar

- **Active voice** — "We'll buy your car" not "Your car will be bought."
- **Contractions are encouraged** — they sound human. "We'll", "It's", "You're", "Don't" are all fine.
- **No ALL CAPS** in body copy for emphasis — use `font-weight:600` in a `<span>` if needed.
- **Numbers** — write numerals for anything 10 and above (`10-day return`), spell out one through nine in running prose.

### No orphans or widows

Never leave a single word alone on its last line. Rewrite the copy to balance the line break, or join the last two words with a non-breaking space so they always wrap together.

```html
<!-- ❌ "home." sits alone on its own line -->
<p>...delivering a seamless car-buying experience from the comfort of your home.</p>

<!-- ✅ "your&nbsp;home." wraps as a unit -->
<p>...delivering a seamless car-buying experience from the comfort of your&nbsp;home.</p>
```

- Apply `&nbsp;` between the final two words of any headline or short body line where a widow is likely.
- For longer body paragraphs, prefer rewriting the sentence so it balances naturally — `&nbsp;` hacks in prose get hard to maintain.
- This applies to headlines, subtitles, button labels, and section headings. Body paragraphs of 3+ lines are lower priority but still worth fixing if the widow is obvious.

---

## Email HTML Rules

- **Padding always on `<td>`, never on `<p>` or block elements.** Email clients ignore padding on `<p>`, `<div>`, and other block elements. All spacing must be applied to `<td>` cells. If you need padding around text inside a cell, wrap the content in a nested `<table><tr><td style="padding:...">`.
- **`border-radius` and `overflow:hidden` on `<table>` do not work in email clients.** Always apply `border-radius` to `<td>` elements directly.
- **Iterable Handlebars tags must be inside the 480px container `<td>`.** If `{{#katalogCollection}}` / `{{/katalogCollection}}` tags are placed between top-level `<table>` elements, they render as visible text in the grey outer area in browser preview. Wrap the entire templated section in one outer `<table>` with an inner 480px container, and place all Handlebars tags inside the inner `<td>`. (In actual Iterable delivery, tags are processed server-side and never reach the email client — this is a browser preview concern only.)

---

## Buttons

MSO VML fallback is required for Outlook on both button types.

### Primary — Gradient CTA

```html
<a href="URL" target="_blank" style="color:#ffffff;text-decoration:none;">
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
  href="URL" style="height:52px;width:180px;v-text-anchor:middle;" arcsize="54%" fillcolor="#ff464c">
<v:stroke dashstyle="Solid" weight="0px" color="#ff464c"/>
<w:anchorlock/>
<v:textbox inset="0px,0px,0px,0px">
<center dir="false" style="color:#ffffff;font-family:'Poppins',Arial,sans-serif;font-size:17px;font-weight:500">
<![endif]-->
<span style="background-color:#FF464C;background-image:linear-gradient(to top,#FF1C24 0%,#FF464C 46.875%);border-radius:99px;box-shadow:inset 0px 1px 2px 0px rgba(255,255,255,0.45);color:#ffffff;display:inline-block;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:17px;font-weight:500;mso-border-alt:none;padding:14px 44px;text-align:center;word-break:keep-all;letter-spacing:-0.2px">Button text</span>
<!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</a>
```

**VML sizing:** `height:52px` matches the standard `14px 44px` padding. Update `width` to match button text length. Font-size in VML center must always be `17px`.

### Outline Button

Use for secondary inline actions (e.g. "Chat Now" in the 2-column header). White background, red border, red text. No gradient.

- Font: Poppins 14px 500, `letter-spacing:-0.2px`
- Padding: `10px 28px`
- Border: `2px solid #FF464C`, `border-radius:99px`
- VML: `height:38px;width:122px`, `arcsize="54%"`, `fillcolor="#ffffff"`, `<v:stroke weight="2px" color="#FF464C"/>` (no `<v:fill>`)

```html
<a href="URL" target="_blank" style="color:#FF464C;text-decoration:none;">
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
    href="URL" style="height:38px;width:122px;v-text-anchor:middle;" arcsize="54%" fillcolor="#ffffff">
  <v:stroke dashstyle="Solid" weight="2px" color="#FF464C"/>
  <w:anchorlock/>
  <v:textbox inset="0px,0px,0px,0px">
  <center dir="false" style="color:#FF464C;font-family:'Poppins',Arial,sans-serif;font-size:14px;font-weight:500">
  <![endif]-->
  <span style="background-color:#ffffff;border:2px solid #FF464C;border-radius:99px;color:#FF464C;display:inline-block;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:500;line-height:1;mso-border-alt:none;padding:10px 28px;text-align:center;letter-spacing:-0.2px">Button text</span>
  <!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
</a>
```

---

## Icon Circles

Used for feature/process sections with heroicons. Never use external icon image URLs.

- **Background:** `#48071D` (plum)
- **Size:** 52×52px
- **Shape:** `border-radius:50%`
- **Icon library:** Material Symbols Rounded — wght 400, opsz 40, fill 0
- **Source:** https://fonts.google.com/icons — search the icon name, select the **Rounded** variant, set Weight 400 / Optical size 40, then click **SVG** → copy the `<path d="...">` value
- **viewBox:** `0 -960 960 960`, `fill="white"`, no stroke
- **Icon size:** 24×24px display, `display:block; margin:0 auto`
- **Bottom margin:** `margin:0 auto 14px`
- **Data URI format:** `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 -960 960 960' fill='white' width='24' height='24'%3E%3Cpath d='...'/%3E%3C/svg%3E`
  - Encode `<` → `%3C`, `>` → `%3E`; leave spaces and single quotes unencoded

```html
<table border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin:0 auto 14px">
  <tr><td width="52" height="52" style="background-color:#48071D;border-radius:50%;width:52px;height:52px;text-align:center;vertical-align:middle">
    <img src="data:image/svg+xml,ENCODED_SVG" width="24" height="24" style="display:block;margin:0 auto" alt="">
  </td></tr>
</table>
```

---

## Numbered List Circles

Used for ordered steps (not feature icons). Distinct from icon circles.

- **Background:** `#191919`
- **Size:** 44×44px circle
- **Numeral:** 16px, 600, `#ffffff`, `line-height:44px`, `mso-line-height-rule:exactly`
- **Circle cell:** `valign="top"`, `padding-right:32px`, `padding-bottom:36px` (last item omits padding-bottom)

```html
<div style="background-color:#191919;border-radius:50%;width:44px;height:44px;text-align:center;line-height:44px;font-family:'Poppins',Arial,sans-serif;font-size:16px;font-weight:600;color:#ffffff;mso-line-height-rule:exactly;">1</div>
```

---

## Components

### Text Section

Use for headline + body copy blocks. Padding standard: `32px 40px 16px` on the headline row, `0 40px 32px` on the last body row. Add more `<tr>` rows as needed between them.

```html
<!-- ══ TEXT SECTION ══════════════════════════════════════════════ -->
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto" width="480">
      <tbody>
      <tr><td style="padding:32px 40px 16px">
        <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:32px;font-weight:600;color:#191919;line-height:1.15;letter-spacing:-0.5px">Headline here</p>
      </td></tr>
      <tr><td style="padding:0 40px 8px">
        <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:500;color:#191919;line-height:1.6">Body line one.</p>
      </td></tr>
      <tr><td style="padding:0 40px 32px">
        <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:500;color:#191919;line-height:1.6">Body line two.</p>
      </td></tr>
      </tbody>
    </table>
  </td></tr></tbody>
</table>
```

For centered text, add `text-align:center` to both the `<td>` and the `<p>`.

---

### Vehicle Card

Single vehicle with linked image, linked title, price, and CTA button. Used in checkout abandonment, listing lead, and similar transactional emails.

```html
<!-- ══ VEHICLE CARD ═══════════════════════════════════════════════ -->
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto" width="480">
      <tbody>
      <tr><td style="padding:0 40px 16px;text-align:center">
        <a href="VEHICLE_URL" target="_blank">
          <img src="{{products.0.image_url}}" width="400" style="display:block;height:auto;border:0;width:100%;border-radius:8px;max-width:400px;margin:0 auto" alt="{{year}} {{make}} {{model}}" height="auto">
        </a>
      </td></tr>
      <tr><td style="padding:0 40px 4px;text-align:center">
        <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:600;color:#191919;line-height:1.2;letter-spacing:-0.3px">
          <a href="VEHICLE_URL" target="_blank" style="text-decoration:none;color:#191919">{{year}} {{make}} {{model}}</a>
        </p>
      </td></tr>
      <tr><td style="padding:0 40px 4px;text-align:center">
        <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:600;color:#191919;line-height:1.2">$XX,XXX</p>
      </td></tr>
      <tr><td style="padding:24px 40px 24px;text-align:center">
        <!-- CTA button (see Buttons section) -->
      </td></tr>
      </tbody>
    </table>
  </td></tr></tbody>
</table>
```

- Image: `border-radius:8px`, max-width 400px, centered
- Title: H2 scale (22px 600), linked with `text-decoration:none;color:#191919`
- Price: H2 scale — use year-based Handlebars if financing, or static price string
- Button: standard gradient CTA (see Buttons section)

---

### Numbered List Section (full)

Used for "reasons to buy" style sections. Combine: section heading → optional banner image → optional subtitle → numbered rows → optional CTA.

```html
<!-- ══ NUMBERED LIST SECTION ══════════════════════════════════════ -->
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto" width="480">
      <tbody>

      <!-- Section heading -->
      <tr><td style="padding:40px 40px 0;text-align:center">
        <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:600;color:#191919;line-height:1.2;letter-spacing:-0.3px">Section heading</p>
      </td></tr>

      <!-- Optional: full-width banner image -->
      <tr><td style="padding:16px 0 0;font-size:0;line-height:0">
        <img src="BANNER_URL" width="480" style="display:block;height:auto;border:0;width:100%" alt="" height="auto">
      </td></tr>

      <!-- Optional: subtitle -->
      <tr><td style="padding:24px 40px 32px;text-align:center">
        <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:400;color:#191919;line-height:1.6">Subtitle text here.</p>
      </td></tr>

      <!-- Numbered rows -->
      <tr><td style="padding:0 40px 8px">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
          <tbody>

          <!-- Each item — last item omits padding-bottom on both tds -->
          <tr>
            <td valign="top" width="44" style="padding-right:32px;padding-bottom:36px">
              <div style="background-color:#191919;border-radius:50%;width:44px;height:44px;text-align:center;line-height:44px;font-family:'Poppins',Arial,sans-serif;font-size:16px;font-weight:600;color:#ffffff;mso-line-height-rule:exactly;">1</div>
            </td>
            <td valign="top" style="padding-bottom:36px">
              <p style="margin:0 0 6px;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:600;color:#191919;line-height:1.3">Item heading</p>
              <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:500;color:#191919;line-height:1.6">Item body copy.</p>
            </td>
          </tr>

          </tbody>
        </table>
      </td></tr>

      <!-- Optional: CTA button -->
      <tr><td style="padding:24px 40px 24px;text-align:center">
        <!-- Button (see Buttons section) -->
      </td></tr>

      </tbody>
    </table>
  </td></tr></tbody>
</table>
```

---

### Icon Circle Section (stacked, white bg)

Use for process/feature sections. Items stack vertically, fully centered, on a **white background**. Each item: plum circle → H3 heading → body copy. Space between items: `margin-bottom:40px` on the body copy, except the last item uses `margin-bottom:36px` before the button.

```
icon circle:  background #48071D, 52×52px, margin:0 auto 14px
H3:           15px, 600, #191919, text-align:center, margin:0 0 8px
body:         14px, 500, #191919, text-align:center, margin:0 0 40px (last item: 36px)
```

**Do NOT use lavender card for icon circle sections.** Lavender card is for numbered list sections only.

---

### RTB Section — Reusable Component

Drop this block into any email to surface the 3 Clutch purchase guarantees. Typically placed after the primary vehicle/CTA section and before car grid recommendations.

**Structure:** H2 section heading → 3-column layout (icon image + short label only — no body copy)

**Icons:** Use the brand asset images from `clutch-certified/assets/`. These need to be hosted on a CDN before sending — the relative paths below work for local browser preview&nbsp;only.

| Slot | Icon file | Label |
|---|---|---|
| 1 | `heart.webp` | 10 day return |
| 2 | `shield.webp` | 9/10 Satisfaction score |
| 3 | `cc-badge.png` | 210 point inspection |

- **Icon size:** `height="44"`, `style="display:block;height:44px;width:auto;border:0;margin:0 auto"`, `padding:0 0 12px` on wrapper `<td>`
- **Label:** H3 style — 15px, 600, `#191919`, `line-height:1.3`, centered — icon + label only, no body copy beneath
- **Column padding:** col 1 `padding-left:16px;padding-right:8px` / col 2 `padding-left:8px;padding-right:8px` / col 3 `padding-left:8px;padding-right:16px`

```html
<!-- ══ BUY WITH COMPLETE CONFIDENCE ══ -->
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto" width="480">
  <tbody><tr><td style="padding:0 0 48px">
    <!-- Heading -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
      <tbody><tr><td style="padding:0 40px 32px;text-align:center">
        <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:22px;font-weight:600;color:#191919;line-height:1.2;letter-spacing:-0.3px">Buy with complete confidence</p>
      </td></tr></tbody>
    </table>
    <!-- 3-column labels -->
    <table width="480" border="0" cellpadding="0" cellspacing="0" role="presentation" align="center" style="mso-table-lspace:0;mso-table-rspace:0">
      <tbody><tr valign="top">
        <td style="width:33%;padding-left:16px;padding-right:8px;text-align:center">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody>
            <tr><td style="padding:0 0 12px;text-align:center"><img src="CDN_URL/heart.webp" height="44" style="display:block;height:44px;width:auto;border:0;margin:0 auto" alt=""></td></tr>
            <tr><td style="text-align:center"><p style="margin:0;font-family:'Poppins',Arial,sans-serif;font-size:15px;font-weight:600;color:#191919;line-height:1.3">10 day<br>return</p></td></tr>
          </tbody></table>
        </td>
        <td style="width:34%;padding-left:8px;padding-right:8px;text-align:center">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody>
            <tr><td style="padding:0 0 12px;text-align:center"><img src="CDN_URL/shield.webp" height="44" style="display:block;height:44px;width:auto;border:0;margin:0 auto" alt=""></td></tr>
            <tr><td style="text-align:center"><p style="margin:0;font-family:'Poppins',Arial,sans-serif;font-size:15px;font-weight:600;color:#191919;line-height:1.3">9/10<br>Satisfaction score</p></td></tr>
          </tbody></table>
        </td>
        <td style="width:33%;padding-left:8px;padding-right:16px;text-align:center">
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody>
            <tr><td style="padding:0 0 12px;text-align:center"><img src="CDN_URL/cc-badge.png" height="44" style="display:block;height:44px;width:auto;border:0;margin:0 auto" alt=""></td></tr>
            <tr><td style="text-align:center"><p style="margin:0;font-family:'Poppins',Arial,sans-serif;font-size:15px;font-weight:600;color:#191919;line-height:1.3">210 point<br>inspection</p></td></tr>
          </tbody></table>
        </td>
      </tr></tbody>
    </table>
  </td></tr></tbody>
</table>
```

---

### Lavender Feature Card

The lavender card floats inside a white outer wrapper — never full-bleed. Wrap it in a white container with horizontal padding, then apply border-radius on all four corners.

```html
<!-- White outer wrapper with side inset -->
<table ... style="background-color:#ffffff;width:480px">
  <tr><td style="padding:0 20px 40px">
    <!-- Lavender card -->
    <table width="100%" ... style="background-color:#F1EDF8;border-radius:24px">
      <tr><td style="padding:16px 40px 32px">
        <!-- content -->
      </td></tr>
    </table>
  </td></tr>
</table>
```

```
background-color: #F1EDF8;
border-radius: 24px;        ← all corners
padding: 16px 40px 32px;   ← top is tighter when a badge sits at the top
```

### Quote / Testimonial Card

Single rounded container, two sections:
- **Top:** `#F7F7F7` background, custom SVG quote mark (36×30px) + quote body (14px, 400, `#191919`, `line-height:1.7`)
- **Bottom:** `#FF464C` background, name (14px, 600, `#ffffff`) + location (14px, 600, `#ffffff`) + gold stars
- `border-radius:14px 14px 0 0` on top `<td>`, `border-radius:0 0 14px 14px` on bottom `<td>` — never on the `<table>` itself, and no `overflow:hidden` (neither works in email clients)

**Quote mark:** Use a custom SVG as a data URI `<img>` tag — not a text character. Size: `width="36" height="30"`, `style="display:block;border:0;margin-bottom:16px"`.

```html
<img src="data:image/svg+xml,%3Csvg width='36' height='30' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.88129e-05 2.34084C5.88129e-05 1.09619 0.927283 0.0539823 2.17176 0.00221176C3.79723 -0.0645761 5.21036 0.727398 5.70831 2.59066C6.2318 4.55429 5.44038 6.73035 3.93 8.52198C3.17183 9.42167 2.45654 9.81542 1.84228 9.96185C1.72007 9.99116 1.59529 9.93261 1.5366 9.82061L1.22779 9.22596C1.16262 9.10146 1.21605 8.94874 1.34519 8.89212C1.93979 8.63537 2.6194 8.13946 3.07617 7.16073C3.24301 6.80304 3.30758 6.49453 3.31476 6.22884C3.32233 5.94704 3.04511 5.75895 2.76638 5.81736C1.19571 6.1489 5.88129e-05 4.87949 5.88129e-05 3.27617V2.34084ZM6.28577 2.34084C6.28577 1.09619 7.21299 0.0539823 8.45747 0.00221176C10.0829 -0.0645761 11.4961 0.727398 11.994 2.59066C12.5175 4.55429 11.7261 6.73035 10.2157 8.52198C9.45753 9.42167 8.74225 9.81542 8.12798 9.96185C8.00578 9.99116 7.88099 9.93261 7.8223 9.82061L7.51349 9.22596C7.44832 9.10146 7.50176 8.94874 7.63089 8.89212C8.22549 8.63537 8.9051 8.13946 9.36188 7.16073C9.52872 6.80304 9.59328 6.49453 9.60046 6.22884C9.60804 5.94704 9.33081 5.75895 9.05208 5.81736C7.48141 6.1489 6.28577 4.87949 6.28577 3.27617V2.34084Z' fill='black'/%3E%3C/svg%3E" width="36" height="30" style="display:block;border:0;margin-bottom:16px" alt="">
```

**Stars:** `★★★★★` (or `&#9733;&#9733;&#9733;&#9733;&#9733;`), `font-size:20px`, `color:#F5A623`, `letter-spacing:3px`

### Social Links Row

Used in emails with the NHL/social footer variant. Sits between the footer image and the footer snippet.

- **Circle size:** 36×36px, `border-radius:50%`, `background-color:#191919`
- **Icon size:** 18×18px SVG, `display:block;margin:0 auto`
- **Spacing:** `margin:0 6px` on each link anchor, `display:inline-block`
- **Facebook exception:** plain white `f` text — no SVG. Cell styled with `font-family:'Poppins',Arial,sans-serif;font-size:17px;font-weight:600;color:#ffffff;line-height:36px;mso-line-height-rule:exactly`
- **Icons:** SVG data URIs, `viewBox='0 0 24 24'`, `fill='white'`

| Platform | URL |
|---|---|
| Instagram | `https://www.instagram.com/clutchcars/` |
| Facebook | `https://www.facebook.com/clutchcars/` |
| TikTok | `https://www.tiktok.com/@clutchcars` |
| X | `https://x.com/clutchcars` |

```html
<table align="center" ... style="background-color:#ffffff;width:480px;margin:0 auto" width="480">
  <tbody><tr><td style="padding:28px 32px 24px;text-align:center">

    <!-- Instagram -->
    <a href="https://www.instagram.com/clutchcars/" target="_blank" style="text-decoration:none;display:inline-block;margin:0 6px">
      <table ...><tbody><tr><td width="36" height="36" style="background-color:#191919;border-radius:50%;width:36px;height:36px;text-align:center;vertical-align:middle">
        <img src="data:image/svg+xml,..." width="18" height="18" style="display:block;margin:0 auto" alt="Instagram">
      </td></tr></tbody></table>
    </a>

    <!-- Facebook — text "f" only, no SVG -->
    <a href="https://www.facebook.com/clutchcars/" target="_blank" style="text-decoration:none;display:inline-block;margin:0 6px">
      <table ...><tbody><tr><td width="36" height="36" style="background-color:#191919;border-radius:50%;width:36px;height:36px;text-align:center;vertical-align:middle;font-family:'Poppins',Arial,sans-serif;font-size:17px;font-weight:600;color:#ffffff;line-height:36px;mso-line-height-rule:exactly">
        f
      </td></tr></tbody></table>
    </a>

  </td></tr></tbody>
</table>
```

### Car Grid (dynamic — vehicle listings)

Used in browse abandonment and similar emails to show catalog cars.

- Two-column layout
- Left column: `padding-left:16px`
- Right column: `padding-right:16px`
- Thumbnails: `border-radius:8px`, `display:block`, `height:auto`, `border:0`, `width:100%`
- Labels: 14px, 600, `#191919`, `text-decoration:none`
- **Car label padding:** wrap the label `<p>` in a `<table><tr><td style="padding:6px 0 12px;text-align:center">` — do not put padding on the `<p>` itself

```html
<table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td style="padding:6px 0 12px;text-align:center">
    <p style="margin:0;font-family:'Poppins',...;font-size:14px;font-weight:600;color:#191919">
      <a href="{{url}}" target="_blank" style="text-decoration:none;color:#191919">{{year}} {{make}} {{model}}</a>
    </p>
  </td></tr></tbody>
</table>
```

---

### Category Browse Grid — Reusable Component

Used in onboarding ("Find your next ride") and price-drop ("More Clutch Certified cars"). Drop this block into any email that needs a category discovery section.

**Rules:**
- Outer `width="100%"` wrapper → inner 480px table (same pattern as every other section)
- `cellpadding="5"` on the image table — this creates a small inset gap around each photo
- `border-radius:8px` on images
- Centered text label below each image: 14px, 600, `#191919`, no underline
- **Do NOT use the `lifecycle re-engagement_cars-04` through `cars-09` images** — they have category labels baked into the graphic. Use the clean JPEG photos below instead.
- Label padding: `padding:6px 0 12px` on rows 1–2, `padding:6px 0 28px` on the last row
- Section heading: 32px (headline scale), `padding:40px 32px 24px`

**Canonical category images (CDN base: `https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/669d5713-9b6a-46bb-bd7e-c542cff6dd6a/3a0db20356b44930a73f8089f5820d2e/`):**

| Label | Image filename | Default link |
|---|---|---|
| SUVs | `8658a945-7495-444e-aab1-0176afd85e5e.jpeg` | `/cars/suv` |
| Sedans | `31bae45e-40e3-48b9-a421-c5d99a91f5ad.jpeg` | `/cars/sedan` |
| Hatchbacks | `d7dd2ec0-9d1c-4ce3-bc31-71dc735282a8.jpeg` | `/cars/hatchback` |
| Hybrid & Electric | `167a13c9-eb8a-4a64-9647-feb906fd7503.jpeg` | `/cars?fuelTypes=electric,hybrid,plug-in-hybrid` |
| Vans | `0571a763-f697-4090-8084-583314076773.jpeg` | `/cars/van` |
| Under $25k | `fd8b3619-3a39-4f2d-9f0f-2f2d8fa91721.jpeg` | `/cars?priceHigh=25000` |

Labels and links can be swapped for context (e.g. price-drop uses "Family friendly", "Commuter cars", "Under $20,000" with adjusted hrefs) — the images stay the same.

```html
<!-- Heading -->
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto" width="480">
      <tbody><tr><td style="padding:40px 32px 24px;text-align:center">
        <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:32px;font-weight:600;color:#191919;line-height:1.2">Find your next ride</p>
      </td></tr></tbody>
    </table>
  </td></tr></tbody>
</table>

<!-- One row (repeat for each pair) -->
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto" width="480">
      <tbody><tr>
        <td width="50%" style="mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;padding-left:16px">
          <table width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
            <tbody><tr><td>
              <a href="LINK" target="_blank">
                <img src="CDN_URL/IMAGE.jpeg" style="display:block;height:auto;border:0;width:100%;border-radius:8px" alt="LABEL" height="auto">
              </a>
            </td></tr></tbody>
          </table>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
            <tbody><tr><td style="padding:6px 0 12px;text-align:center">
              <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;color:#191919">
                <a href="LINK" target="_blank" style="text-decoration:none;color:#191919">LABEL</a>
              </p>
            </td></tr></tbody>
          </table>
        </td>
        <td width="50%" style="mso-table-lspace:0;mso-table-rspace:0;vertical-align:top;padding-right:16px">
          <table width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
            <tbody><tr><td>
              <a href="LINK" target="_blank">
                <img src="CDN_URL/IMAGE.jpeg" style="display:block;height:auto;border:0;width:100%;border-radius:8px" alt="LABEL" height="auto">
              </a>
            </td></tr></tbody>
          </table>
          <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
            <tbody><tr><td style="padding:6px 0 12px;text-align:center">
              <p style="margin:0;font-family:'Poppins',-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;color:#191919">
                <a href="LINK" target="_blank" style="text-decoration:none;color:#191919">LABEL</a>
              </p>
            </td></tr></tbody>
          </table>
        </td>
      </tr></tbody>
    </table>
  </td></tr></tbody>
</table>
```

---

## Images

### Hero Images

- Always include a hero image row between the logo and the first content section
- Standard markup: `width="480"`, `width:100%` in style
- **Height control:** apply `max-height:260px;object-fit:cover` to keep heroes from running too tall

```html
<img src="../hero.png" width="480" style="display:block;height:auto;max-height:260px;object-fit:cover;border:0;width:100%" alt="" height="auto">
```

### Standard image markup

```html
<img src="URL" style="display:block;height:auto;border:0;width:100%;border-radius:8px" width="WIDTH" alt="DESCRIPTION" height="auto">
```

- Always `display:block`, `height:auto`, `border:0`
- Car thumbnails and category cards: `border-radius:8px`
- Hero illustrations (full-width): no `border-radius`
- Never use `width="80%"` or percentage widths — use `width:100%` in the style and a fixed pixel `width` attribute

### Content assets — never replace

- Testimonial images
- Partner banners (NBA, etc.)
- Car photos (dynamic or static)
- Category browse card photos (the 6 JPEG UUIDs listed in the Category Browse Grid component above)

**Do not use** the `lifecycle re-engagement_cars-04` through `cars-09` PNG files for category grids — those images have category labels baked in and will conflict with the text labels below each tile.

---

## Footer

Every email ends with three elements in this order:

1. **NBA banner image** — placed immediately after the last content row
2. **Social links row** — Instagram, Facebook, TikTok, X (see Social Links Row section below)
3. **Footer snippet** — `{{{ snippet "Email-Footer-Left-NHL" }}}`

Never hardcode footer content. Never use `test_only_2024_footer_1`. Never omit the NBA banner.

### NBA Banner

```html
<!-- ══ FOOTER IMAGE ══════════════════════════════════════════ -->
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
  <tbody><tr><td>
    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#ffffff;width:480px;margin:0 auto" width="480">
      <tbody><tr><td style="padding:0;font-size:0;line-height:0">
        <img src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/669d5713-9b6a-46bb-bd7e-c542cff6dd6a/3a0db20356b44930a73f8089f5820d2e/NBA%20banner.png"
          width="480" style="display:block;height:auto;border:0;width:100%" alt="" height="auto">
      </td></tr></tbody>
    </table>
  </td></tr></tbody>
</table>
```

- Full 480px width, no padding, no border-radius
- `background-color:#ffffff` on the inner table — matches the white card background
- `font-size:0;line-height:0` on the `<td>` prevents phantom whitespace below the image

### Footer Snippet

```
{{{ snippet "Email-Footer-Left-NHL" }}}
```

---

## Handlebars Patterns

### Vehicle Loop — leads / likes / extendedProductViewed

Used in lifecycle re-engagement emails (e.g. "Coming Soon to Available") to show the user's own saved vehicles. Iterates `vehicleIds`, checks each against three engagement lists in priority order, renders a card for the first matching available vehicle, and sets `matchCheck` so the skip block fires if nothing matches.

```handlebars
{{#each vehicleIds}}

  {{!-- Priority 1: Leads --}}
  {{#ifContains leads this}}
    {{#catalog "vehicles" this required=true as |car|}}
      {{#ifEq car.website_state "AVAILABLE"}}
        {{#ifEq car.is_available_on_listing_sites true}}
          {{#assign "matchCheck"}}1{{/assign}}
          <!-- vehicle card HTML using car.year, car.make, car.model,
               car.trim, car.mileage, car.photo_url, car.vdp_url -->
        {{/ifEq}}
      {{/ifEq}}
    {{/catalog}}

  {{else}}
  {{!-- Priority 2: Likes --}}
  {{#ifContains likes this}}
    {{#catalog "vehicles" this required=true as |car|}}
      {{#ifEq car.website_state "AVAILABLE"}}
        {{#ifEq car.is_available_on_listing_sites true}}
          {{#assign "matchCheck"}}1{{/assign}}
          <!-- same vehicle card HTML as above -->
        {{/ifEq}}
      {{/ifEq}}
    {{/catalog}}

  {{else}}
  {{!-- Priority 3: Extended product viewed --}}
  {{#ifContains extendedProductViewed this}}
    {{#catalog "vehicles" this required=true as |car|}}
      {{#ifEq car.website_state "AVAILABLE"}}
        {{#ifEq car.is_available_on_listing_sites true}}
          {{#assign "matchCheck"}}1{{/assign}}
          <!-- same vehicle card HTML as above, but use viewedcar alias if needed -->
        {{/ifEq}}
      {{/ifEq}}
    {{/catalog}}
  {{/ifContains}}
  {{/ifContains}}

{{/each}}

{{!-- Skip block: fires only when no vehicle matched — prevents Iterable render errors --}}
{{#unless matchCheck}}
  {{{ snippet "skip" }}}
  {{#catalog "vehicles" "invalid key" required=false as |failsafe|}}
    This will never print {{failsafe.model}}
  {{/catalog}}
{{/unless}}
```

**Rules:**
- `{{#ifContains leads this}}` / `{{else}}` / `{{#ifContains likes this}}` — each `{{else}}` closes the previous `{{#ifContains}}`; matching closing tags stack: `{{/ifContains}}{{/ifContains}}{{/ifContains}}`
- `required=true` on `{{#catalog}}` — omit `required=false` on the skip block's catalog call so it doesn't error
- `{{#assign "matchCheck"}}1{{/assign}}` — set inside the innermost `{{#ifEq}}` so it only fires for a live, available vehicle
- The skip block (`{{#unless matchCheck}}`) **must** be present. Without it, Iterable throws a render error when no vehicle is available.

---

### Dynamic 8-Car Grid — Province Variant (NS/NB/PEI vs Generic)

Used in checkout abandonment and browse abandonment emails. Swaps the catalog collection based on province so Atlantic Canada users see NS-specific inventory.

```handlebars
{{#ifMatchesRegexStr province "[Nn]ova [Ss]cotia|[Nn]ew [Bb]runswick|[Pp]rince [Ee]dward [Ii]sland"}}
{{#catalogCollection "New Arrivals 4U - NS - Generic" as | cars |}}
<!-- 8-car grid using [0]–[7]: photo_url, vdp_url, year, make.[1], model.[1] -->
{{/catalogCollection}}
{{else}}
{{#catalogCollection "New Arrivals 4U - Generic" as | cars |}}
<!-- same 8-car grid structure -->
{{/catalogCollection}}
{{/ifMatchesRegexStr}}
```

**Car grid cell structure (repeat for [0]–[7], 2 per row, 4 rows):**
```html
<td width="50%" valign="top" style="padding:0 4px 0 0">  <!-- right col: padding:0 0 0 4px -->
  <table width="100%" border="0" cellpadding="4" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
    <tbody><tr><td>
      <a href="{{[N].vdp_url}}" target="_blank" style="text-decoration:none;display:block">
        <img src="{{[N].photo_url}}" width="216" style="display:block;height:auto;max-height:150px;object-fit:cover;border:0;width:100%;border-radius:8px" alt="" height="auto">
      </a>
    </td></tr></tbody>
  </table>
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0">
    <tbody><tr><td style="padding:6px 0 16px;text-align:center">  <!-- last row: padding:6px 0 28px -->
      <p style="margin:0;font-family:'Poppins',...;font-size:14px;font-weight:600;color:#191919">
        <a href="{{[N].vdp_url}}" target="_blank" style="text-decoration:none;color:#191919">{{[N].year}} {{[N].make.[1]}} {{[N].model.[1]}}</a>
      </p>
    </td></tr></tbody>
  </table>
</td>
```

- `make.[1]` and `model.[1]` — use bracket notation for catalog collection fields
- Left column: `padding:0 4px 0 0` / Right column: `padding:0 0 0 4px`
- Label padding rows 1–3: `padding:6px 0 16px` / Last row (row 4): `padding:6px 0 28px`

---

### Province Phone Numbers (inline chain)

Used in re-engagement emails where support contact info varies by province. The entire chain is a single inline expression inside a `<p>` tag.

```handlebars
Simply reply to this email or
{{#ifMatchesRegexStr province "[Oo]ntario"}}text or call us at (647) 493-6521
{{else}}{{#ifMatchesRegexStr province "[Nn]ova [Ss]cotia"}}text or call us at (902) 500-4484
{{else}}{{#ifMatchesRegexStr province "[Nn]ew [Bb]runswick"}}text or call us at (902) 500-4484
{{else}}{{#ifMatchesRegexStr province "[Pp]rince [Ee]dward [Ii]sland"}}text or call us at (902) 500-4484
{{else}}{{#ifMatchesRegexStr province "[Ss]askatchewan"}}text or call us at (647) 493-6521
{{else}}{{#ifMatchesRegexStr province "[Bb]ritish [Cc]olumbia"}}text or call us at (647) 493-6521
{{else}}{{#ifMatchesRegexStr province "[Aa]lberta"}}text or call us at (647) 493-6521
{{else}}text or call us at (647) 493-6521
{{/ifMatchesRegexStr}}{{/ifMatchesRegexStr}}{{/ifMatchesRegexStr}}{{/ifMatchesRegexStr}}{{/ifMatchesRegexStr}}{{/ifMatchesRegexStr}}{{/ifMatchesRegexStr}}
```

- Closing tags all appear at the end — one `{{/ifMatchesRegexStr}}` per opened block
- Each `{{else}}` opens a new `{{#ifMatchesRegexStr}}` — they nest, not chain
- Default (no province match) is the innermost `{{else}}` before the closing stack

---

### Year-Based Financing (preheader)

Used in checkout abandonment emails to surface a personalised weekly payment estimate in the inbox preview line. Placed in the preheader `<div>` alongside the zero-width spacers.

```handlebars
{{#if total}}{{#unless (lt year 2014)}}
{{#if (eq year 2014)}}Make it yours for as low as ${{numberFormat (math (math (math total "*" 0.8849557522) "+" 1500) "*" 0.00571) "0"}} weekly.{{/if}}
{{#if (eq year 2015)}}Make it yours for as low as ${{numberFormat (math (math (math total "*" 0.8849557522) "+" 1500) "*" 0.00469) "0"}} weekly.{{/if}}
{{#if (eq year 2016)}}Make it yours for as low as ${{numberFormat (math (math (math total "*" 0.8849557522) "+" 1500) "*" 0.00402) "0"}} weekly.{{/if}}
{{#if (eq year 2017)}}Make it yours for as low as ${{numberFormat (math (math (math total "*" 0.8849557522) "+" 1500) "*" 0.00355) "0"}} weekly.{{/if}}
{{#if (eq year 2018)}}Make it yours for as low as ${{numberFormat (math (math (math total "*" 0.8849557522) "+" 1500) "*" 0.00355) "0"}} weekly.{{/if}}
{{#if (eq year 2019)}}Make it yours for as low as ${{numberFormat (math (math (math total "*" 0.8849557522) "+" 1500) "*" 0.00355) "0"}} weekly.{{/if}}
{{#if (gt year 2019)}}Make it yours for as low as ${{numberFormat (math (math (math total "*" 0.8849557522) "+" 1500) "*" 0.00320) "0"}} weekly.{{/if}}
{{/unless}}{{/if}}
```

- `{{#unless (lt year 2014)}}` — skips vehicles older than 2014 (lenders won't finance)
- Formula: `(total × 0.8849557522 + 1500) × rate` — the `0.8849557522` factor is 1/1.13 (removes HST), `1500` is a fixed doc fee, rate varies by model year
- Rates: 2014 → `0.00571`, 2015 → `0.00469`, 2016 → `0.00402`, 2017–2019 → `0.00355`, 2020+ → `0.00320`
- `total` is the Iterable data field for vehicle price including taxes

---

## Templates

| File | Type | Status |
|---|---|---|
| `template-10018181.html` | Vehicle reminder + pre-approval upsell | Current |
| `template-10612233.html` | Welcome email | Current (Poppins import has `wght@100` — fix to `@400;500;600`) |
| `template-preapproval.html` | Pre-approval + financing | Current — reference template, most complete |
| `template-6730117.html` | Pre-approval (short) | Current |
| `template-21444260.html` | Price drop alert | **Needs update** — uses old colors (`#292929`), missing Poppins in fallbacks, wrong button sizing, underlined car title links |
| `_refined/onboarding-1-why-buy-clutch.html` | Onboarding 1 — Why buy on Clutch | Current |
| `_refined/onboarding-2-syc.html` | Onboarding 2 — Sell your car | Current |
| `_refined/onboarding-3-financing.html` | Onboarding 3 — Get pre-approved | Current |
| `_refined/listing-lead-available.html` | Listing site lead — saved car available | Current |
| `_refined/browse-abandonment-1.html` | Browse abandonment — Email 1 ("It's still here") | Current |
| `_refined/browse-abandonment-2.html` | Browse abandonment — Email 2 ("Take another look") | Current |
| `_refined/browse-abandonment-3.html` | Browse abandonment — Email 3 ("Don't miss out") | Current |
| `_refined/browse-abandonment-4.html` | Browse abandonment — Email 4 ("Want to take another look?") | Current |
| `_refined/price-drop-v2.html` | Price drop alert — 4-block Handlebars vehicle (Likes / Get Started / Leads / Extended Viewed), RTB, 6 category cards | Current |
| `_refined/checkout-1.html` | Checkout abandonment — Email 1 ("These things take time."), year-based financing, 5 reasons, Chat Now outline button | Current |
| `_refined/checkout-2.html` | Checkout abandonment — Email 2 ("Get it before it's gone"), year-based financing, vehicle card, 10-day return trust line, 8-car grid, Chat Now outline button | Current |
| `_refined/checkout-3.html` | Checkout abandonment — Email 3 ("Strike while the iron is hot."), year-based financing, vehicle card, "Changed your mind?" 8-car grid, Google Reviews, NBA banner, Chat Now outline button | Current |
| `_refined/checkout-4.html` | Checkout abandonment — Email 4 (personalized "Take a minute" headline), vehicle photo, 8-car grid, "Shop Certified" CTA, Chat Now outline button | Current |
| `_refined/sell-to-clutch-1.html` | Sell to Clutch — intro email; headline + body, 3-reason lavender numbered list card, icon circle "How it works" (3 steps) with gradient CTA, questions section | Current |
| `_refined/coming-soon-v3.html` | Lifecycle re-engagement — "Coming Soon to Available" v3; vehicle availability alert with Handlebars vehicle loop (leads/likes/extendedProductViewed), 6-category canonical grid, pre-approval CTA, province phone numbers | Current |
