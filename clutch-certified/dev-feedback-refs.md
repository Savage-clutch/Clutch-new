# v3 Dev Feedback — Code References

Each section is a self-contained CodePen (HTML / CSS / JS panels). No external files needed.

---

## 1. Odometer (100K stat)
> "The animation on the 100,000 should be an odometer, not count up"

**HTML**
```html
<div class="stat-block" id="stat-section">
  <span class="stat-label">Cars inspected</span>
  <div class="odo-wrap">
    <span id="odo-el"></span><span class="odo-plus">+</span>
  </div>
  <span class="stat-sub">To date</span>
</div>
<button id="replay">Replay</button>
```

**CSS**
```css
* { box-sizing: border-box; margin: 0; }

body {
  background: #111;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 32px; min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: white;
}

.stat-block { text-align: center; }
.stat-label,
.stat-sub   { display: block; font-size: 13px; opacity: 0.55; letter-spacing: .07em; text-transform: uppercase; }
.stat-label { margin-bottom: 10px; }
.stat-sub   { margin-top: 10px; }

.odo-wrap { display: flex; align-items: baseline; justify-content: center; font-size: 64px; font-weight: 700; letter-spacing: -0.02em; }
.odo-plus { font-size: 36px; font-weight: 600; margin-left: 3px; }

.odometer__window { display: inline-block; overflow: hidden; height: 1em; vertical-align: bottom; }
.odometer__strip  { display: flex; flex-direction: column; }
.odometer__cell   { display: block; height: 1em; line-height: 1; text-align: center; }
.odometer__sep    { display: inline-block; }

button {
  padding: 10px 24px;
  border: 1px solid rgba(255,255,255,.3); background: transparent;
  color: white; border-radius: 20px; cursor: pointer; font-size: 14px;
}
button:hover { background: rgba(255,255,255,.08); }
```

**JS**
```js
var TARGET     = 100000;
var STAGGER_MS = 70;
var ENTER_DUR  = '2.4s';
var ENTER_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

function formattedChars(n) { return n.toLocaleString('en-US').split(''); }
function paddedDigits(n, len) {
  var d = String(n).split('').map(Number);
  while (d.length < len) d.unshift(0);
  return d;
}

function buildOdometer(el, value) {
  el.innerHTML = '';
  var strips = [];
  formattedChars(value).forEach(function(ch) {
    if (ch === ',') {
      var sep = document.createElement('span');
      sep.className = 'odometer__sep'; sep.textContent = ',';
      el.appendChild(sep);
    } else {
      var win   = document.createElement('span'); win.className = 'odometer__window';
      var strip = document.createElement('span'); strip.className = 'odometer__strip';
      for (var rep = 0; rep < 2; rep++)
        for (var d = 0; d <= 9; d++) {
          var cell = document.createElement('span');
          cell.className = 'odometer__cell'; cell.textContent = String(d);
          strip.appendChild(cell);
        }
      win.appendChild(strip); el.appendChild(win); strips.push(strip);
    }
  });
  return strips;
}

function setTrans(s, dur, ease) {
  s.forEach(function(el) {
    el.style.transition = dur ? 'transform ' + dur + ' ' + ease : 'none';
    el.style.transitionDelay = '0ms';
  });
}
function applyPos(s, n, offset) {
  paddedDigits(n, s.length).forEach(function(d, i) {
    s[i].style.transform = 'translateY(-' + (d + offset) + 'em)';
  });
}
function rollIn(s, target) {
  setTrans(s, null, null);
  s.forEach(function(el) { el.style.transform = 'translateY(0)'; });
  requestAnimationFrame(function() { requestAnimationFrame(function() {
    s.forEach(function(el, i) {
      el.style.transition = 'transform ' + ENTER_DUR + ' ' + ENTER_EASE;
      el.style.transitionDelay = ((s.length - 1 - i) * STAGGER_MS) + 'ms';
    });
    applyPos(s, target, 10);
    var settle = parseFloat(ENTER_DUR) * 1000 + s.length * STAGGER_MS + 200;
    setTimeout(function() {
      setTrans(s, null, null);
      applyPos(s, target, 0);
    }, settle);
  }); });
}

var el     = document.getElementById('odo-el');
var strips = buildOdometer(el, TARGET);
var fired  = false;

function trigger() { if (fired) return; fired = true; rollIn(strips, TARGET); }

new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting) trigger();
}, { threshold: 0.3 }).observe(document.getElementById('stat-section'));

document.getElementById('replay').addEventListener('click', function() {
  fired = false;
  strips = buildOdometer(el, TARGET);
  trigger();
});
```

---

## 2. 210 section — Full card with entrance animations
> "When you scroll to that 210 section, how the items appear"

The row animation is `ldCatRowIn` — each category starts as a tiny pill on the left edge and expands into a full-width row. Rows cascade in with staggered delays. Text fades in after the row has landed. Right panel slides in from the right. Clicking a category stagger-reveals the checklist.

**HTML**
```html
<div class="page-wrap">
  <div class="scroll-hint">↓ Scroll down to trigger</div>
  <div class="spacer"></div>

  <div class="ld-card" id="ld-card">
    <div class="ld-left">
      <div class="ld-photo-wrap">
        <img class="ld-photo" id="ld-photo" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&grayscale" alt="">
      </div>
      <div class="ld-cats" id="ld-cats"></div>
    </div>

    <div class="ld-right">
      <div class="ld-total">
        <span class="ld-total__label">Points in this section</span>
        <span class="ld-total__count" id="ld-count">21 <span>/ 210</span></span>
      </div>
      <div class="ld-items-wrap">
        <div class="ld-fade ld-fade--top is-hidden" id="ld-fade-top">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M15 9l-7-7-7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="ld-items" id="ld-list"></div>
        <div class="ld-fade ld-fade--bottom is-hidden" id="ld-fade-bot">
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none"><path d="M1 1l7 7 7-7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>
    </div>
  </div>

  <button id="replay">Replay animation</button>
</div>
```

**CSS**
```css
* { box-sizing: border-box; margin: 0; }

body {
  background: #111;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: white;
}

.page-wrap {
  display: flex; flex-direction: column;
  align-items: center; padding: 0 24px 60px;
  gap: 32px;
}

.spacer { height: 100vh; display: flex; align-items: center; justify-content: center; }
.scroll-hint { position: fixed; top: 24px; left: 50%; transform: translateX(-50%); font-size: 14px; opacity: 0.4; }

/* ── Card layout ── */
.ld-card {
  display: grid;
  grid-template-columns: 55% 45%;
  height: 560px;
  background: #0d0d0d;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 24px;
  overflow: hidden;
  width: 100%; max-width: 900px;
}

/* ── Left column ── */
.ld-left {
  display: flex; flex-direction: column;
  border-right: 1px solid rgba(255,255,255,.07);
  background: #000;
}
.ld-photo-wrap {
  display: flex; justify-content: center; align-items: center;
  flex-shrink: 0; background: #000;
}
.ld-photo {
  width: 100%; aspect-ratio: 16/9;
  object-fit: cover; object-position: center;
  display: block; transition: opacity .18s ease;
  mask-image: linear-gradient(to right, transparent 0%, black 30%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%);
}
.ld-cats {
  display: flex; flex-direction: column; gap: 6px;
  padding: 12px 16px 12px 20px; flex: 1;
  border-top: 1px solid rgba(255,255,255,.07);
  overflow-y: auto; min-height: 0;
}
.ld-cats::-webkit-scrollbar { display: none; }

.ld-cat {
  position: relative;
  display: flex; align-items: center; gap: 14px;
  padding: 9px 16px;
  cursor: pointer; border-radius: 10px; flex: 1;
}
.ld-cat::before {
  content: ''; position: absolute; inset: 0;
  border-radius: inherit;
  background: rgba(255,255,255,.07); transition: background .15s;
}
.ld-cat > * { position: relative; z-index: 1; }
.ld-cat:hover::before  { background: rgba(255,255,255,.11); }
.ld-cat.active::before { background: rgba(255,255,255,.13); }

.ld-cat__icon {
  width: 22px; height: 22px; border-radius: 50%;
  background: rgba(255,255,255,.12);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.ld-cat.active .ld-cat__icon { background: rgba(255,255,255,.2); }
.ld-icon-v { transition: opacity .15s; }
.ld-cat.active .ld-icon-v { opacity: 0; }
.ld-cat__name { flex: 1; font-size: 13px; font-weight: 500; color: #fff; }
.ld-cat__pts  { font-size: 11px; color: rgba(255,255,255,.25); }
.ld-cat.active .ld-cat__pts { color: rgba(255,255,255,.45); }

/* ── Right column ── */
.ld-right {
  display: flex; flex-direction: column;
  padding: 28px 32px; overflow: hidden;
}
.ld-total {
  margin-bottom: 16px; padding-bottom: 14px;
  border-bottom: 1px solid rgba(255,255,255,.07);
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.ld-total__label { font-size: 11px; color: rgba(255,255,255,.5); }
.ld-total__count { font-size: 13px; font-weight: 600; color: rgba(255,255,255,.6); }
.ld-total__count span { color: rgba(255,255,255,.25); }

.ld-items-wrap {
  position: relative; flex: 1; min-height: 0;
  display: flex; flex-direction: column;
}
.ld-items { flex: 1; overflow-y: auto; min-height: 0; padding: 4px 0; }
.ld-items::-webkit-scrollbar { display: none; }

.ld-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid rgba(255,255,255,.05);
  font-size: 13px; color: rgba(255,255,255,.75);
  line-height: 1.4; flex-shrink: 0;
}
.ld-item:last-child { border-bottom: none; }
.ld-item__icon {
  flex-shrink: 0; width: 16px; height: 16px; border-radius: 50%;
  background: rgba(52,199,89,.15);
  display: flex; align-items: center; justify-content: center;
}

.ld-fade {
  position: absolute; left: 0; right: 0; height: 56px;
  pointer-events: auto; transition: opacity .2s ease;
  display: flex; justify-content: center;
  color: #fff; cursor: pointer;
}
.ld-fade.is-hidden { opacity: 0; pointer-events: none; }
.ld-fade--top {
  top: 0;
  background: linear-gradient(to bottom, #0d0d0d, transparent);
  align-items: flex-start; padding-top: 10px;
}
.ld-fade--bottom {
  bottom: 0;
  background: linear-gradient(to top, #0d0d0d, transparent);
  align-items: flex-end; padding-bottom: 10px;
}

/* ── Entrance animations ── */
@keyframes ldCatRowIn {
  0%   { opacity: 0; transform: translateX(-40px) scaleX(0.025) scaleY(0.25); border-radius: 999px; background: rgba(255,255,255,.3); }
  8%   { opacity: 1; transform: translateX(-40px) scaleX(0.025) scaleY(0.25); border-radius: 999px; background: rgba(255,255,255,.3); }
  30%  { opacity: 1; transform: translateX(0)     scaleX(0.12)  scaleY(1);    border-radius: 999px; background: rgba(255,255,255,.28); }
  100% { opacity: 1; transform: translateX(0)     scaleX(1)     scaleY(1);    border-radius: 10px;  background: rgba(255,255,255,.07); }
}
@keyframes ldTextIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes ldPanelIn {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes ldItemIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.ld-card.is-animating .ld-cat {
  animation: ldCatRowIn 1600ms cubic-bezier(.16,1,.3,1) both;
  animation-delay: var(--cat-delay, 0ms);
}
.ld-card.is-animating .ld-cat__name,
.ld-card.is-animating .ld-cat__pts,
.ld-card.is-animating .ld-cat__icon {
  animation: ldTextIn 300ms ease both;
  animation-delay: calc(var(--cat-delay, 0ms) + 1100ms);
}
.ld-card.is-animating .ld-right {
  animation: ldPanelIn 700ms ease-out 200ms both;
}

button {
  padding: 10px 24px; background: rgba(255,255,255,.1);
  color: white; border: 1px solid rgba(255,255,255,.15);
  border-radius: 20px; cursor: pointer; font-size: 14px;
}
button:hover { background: rgba(255,255,255,.15); }
```

**JS**
```js
var CATS = [
  { name: 'Body',           pts: 21 },
  { name: 'Road Test',      pts: 79 },
  { name: 'Engine',         pts: 41 },
  { name: 'Suspension',     pts: 16 },
  { name: 'Steering',       pts: 8  },
  { name: 'Lights',         pts: 10 },
  { name: 'Underbody',      pts: 11 },
  { name: 'Tires & Brakes', pts: 24 }
];

var ITEMS = {
  0: ['All body gaps are appropriate','All doors open and close properly','No scratches or dents on any doors','Paint color and lustre match across the vehicle','Hood hinges function properly','Hood latch secures properly','No signs of damage to any glass','Trunk hinges function properly','Trunk latch secures properly'],
  1: ['Steering returns to centre after a turn','No right/left pull under heavy braking','Transmission shifts smoothly','Vehicle absorbs bumps properly','No interior rattles or squeaks','No exterior clunks or squeals','Cruise control operational','Speedometer functions properly','No dash warning lights on'],
  2: ['Battery is charged and secure','Engine oil level and condition','Coolant level and reservoir in good condition','Drive belts in good condition','Hoses in good condition','No visual signs of leaks','Exhaust system functions with no leaks','Engine air filter condition','No abnormal engine sounds or smells'],
  3: ['Shocks and struts show no damage','Suspension control arms secure','Coil springs in proper position','No tire interference with suspension','Wheel bearings show no excessive wear','Vehicle ride height is appropriate and level','Anti-sway bars and bushings show no damage'],
  4: ['Power steering functions with no leaks','Steering column and fasteners secure','Tie rods show no signs of damage','No ball joints show signs of damage','Telescopic steering adjustments functional','Steering operates with appropriate clearance'],
  5: ['Headlights function properly','High beams operational','Taillights function properly','Turn signals function','Hazard lights function properly','Daytime running lights function','License plate light functions','Reverse lights operational'],
  6: ['No visual signs of frame damage','Exhaust hangers in good condition','No leaks from engine','No leaks from transmission','No signs of perforated rust','Belly pan in good condition','No damage to underbody parts'],
  7: ['Front left tire tread depth OK','Front right tire tread depth OK','Back left tire tread depth OK','Back right tire tread depth OK','Brakes release and do not stick','Disc brake pads within acceptable limits','Disc brake rotors within acceptable limits','Emergency brake operational','Tires inflated to correct pressure']
};

var STAGGER = 90;
var active  = 0;
var card    = document.getElementById('ld-card');
var catsEl  = document.getElementById('ld-cats');
var listEl  = document.getElementById('ld-list');
var countEl = document.getElementById('ld-count');
var fadeTop = document.getElementById('ld-fade-top');
var fadeBot = document.getElementById('ld-fade-bot');
var photo   = document.getElementById('ld-photo');

// Build category rows
catsEl.innerHTML = CATS.map(function(c, i) {
  return '<div class="ld-cat' + (i===0?' active':'') + '" data-i="' + i + '" style="--cat-delay:' + (i*STAGGER) + 'ms">'
    + '<div class="ld-cat__icon"><svg width="12" height="12" viewBox="0 0 12 12"><path d="M2,6 L10,6" stroke="white" stroke-width="1.5" stroke-linecap="round"/><path class="ld-icon-v" d="M6,2 L6,10" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg></div>'
    + '<span class="ld-cat__name">' + c.name + '</span>'
    + '<span class="ld-cat__pts">' + c.pts + ' pts</span>'
    + '</div>';
}).join('');

function checkIcon() {
  return '<div class="ld-item__icon"><svg width="8" height="6" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
}

function checkFades() {
  var overflows = listEl.scrollHeight > listEl.clientHeight + 8;
  if (!overflows) { fadeTop.classList.add('is-hidden'); fadeBot.classList.add('is-hidden'); return; }
  fadeTop.classList.toggle('is-hidden', listEl.scrollTop < 4);
  fadeBot.classList.toggle('is-hidden', listEl.scrollTop + listEl.clientHeight >= listEl.scrollHeight - 4);
}
listEl.addEventListener('scroll', checkFades);

function selectCat(idx) {
  active = idx;
  catsEl.querySelectorAll('.ld-cat').forEach(function(el) { el.classList.toggle('active', parseInt(el.dataset.i) === idx); });
  countEl.innerHTML = CATS[idx].pts + ' <span>/ 210</span>';
  photo.style.opacity = '0';
  setTimeout(function() { photo.style.opacity = '1'; }, 180);
  listEl.innerHTML = (ITEMS[idx] || []).map(function(item, i) {
    return '<div class="ld-item" style="animation: ldItemIn 500ms cubic-bezier(.16,1,.3,1) ' + (i*28) + 'ms both">' + checkIcon() + '<span>' + item + '</span></div>';
  }).join('');
  listEl.scrollTop = 0;
  setTimeout(checkFades, 50);
}

catsEl.addEventListener('click', function(e) {
  var row = e.target.closest('.ld-cat');
  if (!row) return;
  var idx = parseInt(row.dataset.i);
  if (idx !== active) selectCat(idx);
});

fadeTop.addEventListener('click', function() { listEl.scrollTo({ top: 0, behavior: 'smooth' }); });
fadeBot.addEventListener('click', function() { listEl.scrollTo({ top: listEl.scrollHeight, behavior: 'smooth' }); });

// Trigger on scroll
var fired = false;
function trigger() {
  if (fired) return; fired = true;
  card.classList.add('is-animating');
  selectCat(0);
}

new IntersectionObserver(function(entries) {
  if (entries[0].isIntersecting) trigger();
}, { threshold: 0.15 }).observe(card);

document.getElementById('replay').addEventListener('click', function() {
  fired = false;
  card.classList.remove('is-animating');
  void card.offsetWidth;
  trigger();
});

selectCat(0);
```

---

## 3. 210 section — Staggered list reveal (right column)
> "The staggered reveal of the list in the right column hasn't been setup yet"

**HTML**
```html
<div class="ld-items" id="list"></div>
<button id="replay">Replay</button>
```

**CSS**
```css
* { box-sizing: border-box; margin: 0; }

body {
  background: white;
  display: flex; flex-direction: column;
  align-items: flex-start; justify-content: center;
  gap: 20px; min-height: 100vh; padding: 40px 32px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}

.ld-items { display: flex; flex-direction: column; gap: 6px; width: 100%; max-width: 480px; }

.ld-item {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: 14px; color: #111;
  padding: 9px 12px; background: #f9f9f9; border-radius: 8px;
}
.ld-item__icon { flex-shrink: 0; margin-top: 1px; }

@keyframes ldItemIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

button {
  padding: 10px 24px; background: #111; color: white;
  border: none; border-radius: 20px; cursor: pointer; font-size: 14px;
}
button:hover { background: #333; }
```

**JS**
```js
var items = [
  'All body gaps are appropriate',
  'All doors open and close properly',
  'No scratches, dings, or dents on any doors',
  'No scratches, dings, or dents on front bumper',
  'Paint color and lustre match across the entire vehicle',
  'Hood hinges function properly',
  'Hood latch secures properly with no signs of damage',
  'No signs of damage to any piece of glass',
  'Trunk hinges function properly',
  'Trunk latch secures properly with no signs of damage',
  'Vehicle equipped with front and rear license plate brackets'
];

function checkIcon() {
  return '<div class="ld-item__icon"><svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
}

function render() {
  document.getElementById('list').innerHTML = items.map(function(item, i) {
    return '<div class="ld-item" style="animation: ldItemIn 500ms cubic-bezier(.16,1,.3,1) ' + (i * 30) + 'ms both">'
      + checkIcon() + '<span>' + item + '</span></div>';
  }).join('');
}

render();

document.getElementById('replay').addEventListener('click', function() {
  document.getElementById('list').innerHTML = '';
  setTimeout(render, 50);
});
```

---

## 4. Expertly serviced — full section (3D carousel + tabnav)
> "The 3D carousel should be draggable and also be a full screen lightbox when images are clicked" + "the easing of the switch should be (easing here)"

Tab switch easing: `cubic-bezier(0.4, 0, 0.2, 1)` — applied to both the platter width morph and the indicator slide.

**HTML**
```html
<div class="recon-section">
  <div class="recon-gallery" id="v3-recon-gallery">
    <div class="recon-gallery__stage" id="recon-stage">
      <div class="recon-gallery__ring" id="v3-recon-ring">
        <div class="recon-gallery__item is-active">
          <img src="https://clutch-new.vercel.app/clutch-certified/assets/mechanical-new.jpg" alt="Mechanical">
        </div>
        <div class="recon-gallery__item">
          <img src="https://clutch-new.vercel.app/clutch-certified/assets/body.jpg" alt="Body & Cosmetic">
        </div>
        <div class="recon-gallery__item">
          <img src="https://clutch-new.vercel.app/clutch-certified/assets/_DSC1850.webp" alt="Glass">
        </div>
        <div class="recon-gallery__item">
          <img src="https://clutch-new.vercel.app/clutch-certified/assets/tiress.JPG" alt="Tires">
        </div>
        <div class="recon-gallery__item">
          <img src="https://clutch-new.vercel.app/clutch-certified/assets/_DSC1958.webp" alt="Detailing">
        </div>
      </div>
    </div>

    <div class="recon-gallery__nav-row">
      <button class="recon-gallery__arrow recon-gallery__arrow--prev" id="v3-recon-prev" aria-label="Previous">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>

      <div class="recon-tabnav">
        <div class="recon-tabnav__platter" id="v3-recon-platter">
          <button class="recon-tabnav__btn is-active" data-tab="0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"/></svg>
            <span class="recon-tabnav__label">Mechanical</span>
          </button>
          <button class="recon-tabnav__btn" data-tab="1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128m0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"/></svg>
            <span class="recon-tabnav__label">Body & Cosmetic</span>
          </button>
          <button class="recon-tabnav__btn" data-tab="2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"/></svg>
            <span class="recon-tabnav__label">Glass</span>
          </button>
          <button class="recon-tabnav__btn" data-tab="3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/></svg>
            <span class="recon-tabnav__label">Tires</span>
          </button>
          <button class="recon-tabnav__btn" data-tab="4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/></svg>
            <span class="recon-tabnav__label">Detailing</span>
          </button>
        </div>
      </div>

      <button class="recon-gallery__arrow recon-gallery__arrow--next" id="v3-recon-next" aria-label="Next">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>

    <div class="recon-tab-copy" id="v3-recon-copy">
      <p class="recon-tab-copy__text is-active" data-copy="0">Engine, brakes, suspension — every mechanical system is inspected and repaired to spec by our licensed technicians before the car goes anywhere near a listing.</p>
      <p class="recon-tab-copy__text" data-copy="1">Dents, paint chips, misaligned panels — we address cosmetic issues that affect how the car looks and holds its value.</p>
      <p class="recon-tab-copy__text" data-copy="2">Every windshield and pane of glass is checked for chips, cracks, and seal integrity. Anything below standard gets repaired or fully replaced.</p>
      <p class="recon-tab-copy__text" data-copy="3">Tread depth is measured on all four tires against our 4mm minimum. Anything below standard gets replaced. Alignment and balance checked.</p>
      <p class="recon-tab-copy__text" data-copy="4">Full interior clean, exterior wash and polish, engine bay detail, and odour treatment. The car arrives to you ready.</p>
    </div>
  </div>
</div>

<!-- Lightbox -->
<div class="lightbox" id="lightbox">
  <button class="lightbox__close" id="lb-close">&#x2715;</button>
  <button class="lightbox__prev" id="lb-prev"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  <img class="lightbox__img" id="lb-img" src="" alt="">
  <button class="lightbox__next" id="lb-next"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
</div>
```

**CSS**
```css
* { box-sizing: border-box; margin: 0; }

body {
  background: #111;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 48px 24px;
}

.recon-section { width: 100%; max-width: 960px; }

/* ── Stage & Ring ── */
.recon-gallery { display: flex; flex-direction: column; gap: 24px; padding: 48px 0 36px; }

.recon-gallery__stage {
  position: relative; width: 100%; aspect-ratio: 16 / 7;
  overflow: hidden; perspective: 900px; perspective-origin: 50% 50%;
}

.recon-gallery__ring {
  position: absolute; width: 100%; height: 100%;
  transform-style: preserve-3d;
}

.recon-gallery__item {
  position: absolute; top: 50%; left: 50%;
  width: 52%; height: 90%;
  border-radius: 18px; overflow: hidden;
  backface-visibility: hidden; cursor: pointer;
  will-change: transform, opacity, filter;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1),
              opacity   0.65s cubic-bezier(0.4, 0, 0.2, 1),
              filter    0.65s cubic-bezier(0.4, 0, 0.2, 1);
}
.recon-gallery__item img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* ── Nav row ── */
.recon-gallery__nav-row {
  position: relative; display: flex; align-items: center;
  justify-content: center; gap: 12px; margin-top: 24px; min-height: 48px;
}

.recon-gallery__arrow {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.18);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  color: #fff; transition: background 0.2s;
}
.recon-gallery__arrow--prev { left: calc(50% - 168px); }
.recon-gallery__arrow--next { right: calc(50% - 168px); }
.recon-gallery__arrow:hover { background: rgba(255,255,255,0.22); }

/* ── Tabnav pill ── */
.recon-tabnav { display: flex; justify-content: center; }

.recon-tabnav__platter {
  position: relative; display: inline-flex; align-items: stretch; gap: 2px;
  background: rgba(255,255,255,0.12); border-radius: 16px; padding: 4px;
}

.recon-tabnav__btn {
  position: relative; z-index: 1;
  background: none; border: none; cursor: pointer; border-radius: 14px;
  font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.55);
  white-space: nowrap; display: inline-flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 7px; line-height: 1.35;
  overflow: hidden; max-width: 0; padding: 12px 0;
  transition: opacity 130ms ease;
}
.recon-tabnav__btn svg { flex-shrink: 0; width: 20px; height: 20px; }
.recon-tabnav__label { white-space: nowrap; }
.recon-tabnav__btn.is-active { max-width: 300px; padding: 12px 24px; color: #fff; }

/* ── Copy ── */
.recon-tab-copy { margin-top: 0; min-height: 48px; padding: 0 32px; }
.recon-tab-copy__text {
  display: none; font-size: 15px; color: rgba(255,255,255,0.7);
  line-height: 1.7; max-width: 640px; text-align: center; margin: 0 auto;
}
.recon-tab-copy__text.is-active { display: block; }

/* ── Lightbox ── */
.lightbox {
  display: none; position: fixed; inset: 0; z-index: 1000;
  background: rgba(0,0,0,0.92); align-items: center; justify-content: center;
}
.lightbox.is-open { display: flex; }
.lightbox__img { max-width: 90vw; max-height: 85vh; border-radius: 12px; object-fit: contain; }
.lightbox__close {
  position: absolute; top: 24px; right: 24px;
  background: rgba(255,255,255,.12); border: none; color: #fff;
  width: 40px; height: 40px; border-radius: 50%; font-size: 16px;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.lightbox__prev, .lightbox__next {
  position: absolute; top: 50%; transform: translateY(-50%);
  background: rgba(255,255,255,.12); border: none; color: #fff;
  width: 48px; height: 48px; border-radius: 50%; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
}
.lightbox__prev { left: 24px; }
.lightbox__next { right: 24px; }
.lightbox__prev:disabled, .lightbox__next:disabled { opacity: 0.3; pointer-events: none; }
```

**JS**
```js
var BASE = 'https://clutch-new.vercel.app/clutch-certified/assets/';
var IMAGES = [
  BASE + 'mechanical-new.jpg',
  BASE + 'body.jpg',
  BASE + '_DSC1850.webp',
  BASE + 'tiress.JPG',
  BASE + '_DSC1958.webp'
];

var platter  = document.getElementById('v3-recon-platter');
var ring     = document.getElementById('v3-recon-ring');
var copyEls  = document.querySelectorAll('#v3-recon-copy .recon-tab-copy__text');
var btns     = platter.querySelectorAll('.recon-tabnav__btn');
var items    = ring.querySelectorAll('.recon-gallery__item');
var N        = items.length;

// 3D slot definitions — same as v3.js
var SLOTS = [
  { txR: -0.619, tzR: -0.38, ry:  55, scale: 0.72, opacity: 0,   ptr: 'none',   cursor: 'default' },
  { txR: -0.369, tzR: -0.26, ry:  42, scale: 0.80, opacity: 1,   ptr: 'auto',   cursor: 'pointer' },
  { txR:  0,     tzR:  0.04, ry:   0, scale: 1,    opacity: 1,   ptr: 'auto',   cursor: 'default' },
  { txR:  0.369, tzR: -0.26, ry: -42, scale: 0.80, opacity: 1,   ptr: 'auto',   cursor: 'pointer' },
  { txR:  0.619, tzR: -0.38, ry: -55, scale: 0.72, opacity: 0,   ptr: 'none',   cursor: 'default' },
];

function slotIdx(offset, n) {
  if (offset === 0)     return 2;
  if (offset === 1)     return 3;
  if (offset === 2)     return 4;
  if (offset === n - 1) return 1;
  if (offset === n - 2) return 0;
  return offset < n / 2 ? 4 : 0;
}

function updateCards(idx, instant) {
  var stageW = ring.offsetWidth;
  items.forEach(function(item, i) {
    var offset = ((i - idx) + N) % N;
    var s  = SLOTS[slotIdx(offset, N)];
    var tf = 'translate(-50%, -50%) translateX(' + (s.txR * stageW) + 'px)'
           + ' translateZ(' + (s.tzR * stageW) + 'px) rotateY(' + s.ry + 'deg)'
           + ' scale(' + s.scale + ')';
    if (instant) item.style.transition = 'none';
    item.style.transform     = tf;
    item.style.opacity       = String(s.opacity);
    item.style.pointerEvents = s.ptr;
    item.style.cursor        = s.cursor;
    item.classList.toggle('is-active', offset === 0);
  });
  if (instant) requestAnimationFrame(function() { requestAnimationFrame(function() {
    items.forEach(function(item) { item.style.transition = ''; });
  }); });
}

function getActive() {
  for (var i = 0; i < btns.length; i++) if (btns[i].classList.contains('is-active')) return i;
  return 0;
}

var tabAnimating = false;
var MORPH_MS = 380, FADE_MS = 140;

function selectTab(idx) {
  if (tabAnimating) return;
  var prevIdx = getActive();
  if (idx === prevIdx) return;
  tabAnimating = true;

  var prevBtn = btns[prevIdx];
  var nextBtn = btns[idx];

  if (prevBtn) { prevBtn.style.transition = 'opacity ' + FADE_MS + 'ms ease'; prevBtn.style.opacity = '0'; }

  setTimeout(function() {
    var firstW = platter.getBoundingClientRect().width;
    btns.forEach(function(b, i) { b.classList.toggle('is-active', i === idx); });
    copyEls.forEach(function(el, i) { el.classList.toggle('is-active', i === idx); });
    if (nextBtn) { nextBtn.style.transition = 'none'; nextBtn.style.opacity = '0'; }
    var lastW = platter.getBoundingClientRect().width;

    platter.style.transition = 'none'; platter.style.width = firstW + 'px';
    requestAnimationFrame(function() { requestAnimationFrame(function() {
      /* ── Tab switch easing: cubic-bezier(0.4, 0, 0.2, 1) ── */
      platter.style.transition = 'width ' + MORPH_MS + 'ms cubic-bezier(0.4, 0, 0.2, 1)';
      platter.style.width = lastW + 'px';
      setTimeout(function() {
        platter.style.transition = 'none'; platter.style.width = '';
        if (nextBtn) { nextBtn.style.transition = 'opacity ' + FADE_MS + 'ms ease'; nextBtn.style.opacity = '1'; }
        setTimeout(function() {
          if (prevBtn) prevBtn.style.transition = '';
          if (nextBtn) nextBtn.style.transition = '';
          tabAnimating = false;
        }, FADE_MS);
      }, MORPH_MS);
    }); });
    updateCards(idx, false);
  }, FADE_MS);
}

// Prev / next buttons
document.getElementById('v3-recon-prev').addEventListener('click', function() {
  stopAuto(); selectTab((getActive() - 1 + btns.length) % btns.length);
});
document.getElementById('v3-recon-next').addEventListener('click', function() {
  stopAuto(); selectTab((getActive() + 1) % btns.length);
});
btns.forEach(function(btn, i) { btn.addEventListener('click', function() { stopAuto(); selectTab(i); }); });

// Stage click zones (left 38% = prev, right 38% = next)
var stage = document.getElementById('recon-stage');
stage.addEventListener('click', function(e) {
  var rel = (e.clientX - stage.getBoundingClientRect().left) / stage.offsetWidth;
  if (rel < 0.38) { stopAuto(); selectTab((getActive() - 1 + btns.length) % btns.length); }
  else if (rel > 0.62) { stopAuto(); selectTab((getActive() + 1) % btns.length); }
});
stage.addEventListener('mousemove', function(e) {
  var rel = (e.clientX - stage.getBoundingClientRect().left) / stage.offsetWidth;
  stage.style.cursor = (rel < 0.38 || rel > 0.62) ? 'pointer' : 'default';
});
stage.addEventListener('mouseleave', function() { stage.style.cursor = ''; });

// Swipe
var swipeX = 0;
stage.addEventListener('touchstart', function(e) { swipeX = e.touches[0].clientX; }, { passive: true });
stage.addEventListener('touchend', function(e) {
  var dx = e.changedTouches[0].clientX - swipeX;
  if (Math.abs(dx) < 40) return;
  stopAuto();
  selectTab(dx < 0 ? (getActive() + 1) % btns.length : (getActive() - 1 + btns.length) % btns.length);
}, { passive: true });

// Auto-rotate
var autoTimer = null;
function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
function startAuto() { autoTimer = setInterval(function() { selectTab((getActive() + 1) % btns.length); }, 3000); }

// Resize
window.addEventListener('resize', function() { updateCards(getActive(), true); });

// Lightbox — opens on centre card click
var lb    = document.getElementById('lightbox');
var lbImg = document.getElementById('lb-img');
var lbCur = 0;

function lbShow(idx) {
  lbCur = idx; lbImg.src = IMAGES[idx];
  document.getElementById('lb-prev').disabled = idx === 0;
  document.getElementById('lb-next').disabled = idx === IMAGES.length - 1;
}
function lbOpen(idx) { lbShow(idx); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
function lbClose()   { lb.classList.remove('is-open'); document.body.style.overflow = ''; }

items.forEach(function(item, i) {
  item.addEventListener('click', function() {
    var offset = ((i - getActive()) + N) % N;
    if (offset === 0) lbOpen(i); // only centre card opens lightbox
  });
});
document.getElementById('lb-close').addEventListener('click', lbClose);
document.getElementById('lb-prev').addEventListener('click', function() { if (lbCur > 0) lbShow(lbCur - 1); });
document.getElementById('lb-next').addEventListener('click', function() { if (lbCur < IMAGES.length - 1) lbShow(lbCur + 1); });
lb.addEventListener('click', function(e) { if (e.target === lb) lbClose(); });
document.addEventListener('keydown', function(e) {
  if (!lb.classList.contains('is-open')) return;
  if (e.key === 'Escape') lbClose();
  if (e.key === 'ArrowLeft'  && lbCur > 0)               lbShow(lbCur - 1);
  if (e.key === 'ArrowRight' && lbCur < IMAGES.length - 1) lbShow(lbCur + 1);
});

// Init
updateCards(0, true);
if (btns[0]) btns[0].style.opacity = '1';
startAuto();
```

---

## 5. Buy with confidence — 3D icon levitate hover
> "There's a subtle levitate hover animation on each of the 3D icons (easing here)"

**HTML**
```html
<div class="cards">
  <div class="card">
    <div class="card__icon-wrap">
      <img class="card__icon" src="https://em-content.zobj.net/source/apple/354/red-heart_2764-fe0f.png" alt="">
    </div>
    <h3>10-day love it<br>or return it</h3>
    <p>Money-back guarantee within 10 days or 750 km.</p>
  </div>
  <div class="card">
    <div class="card__icon-wrap">
      <img class="card__icon" src="https://em-content.zobj.net/source/apple/354/shield_1f6e1-fe0f.png" alt="">
    </div>
    <h3>90-day<br>Warranty</h3>
    <p>Comprehensive coverage. Included on Essential and above.</p>
  </div>
  <div class="card">
    <div class="card__icon-wrap">
      <img class="card__icon" src="https://em-content.zobj.net/source/apple/354/check-mark-button_2705.png" alt="">
    </div>
    <h3>Clutch<br>Certified</h3>
    <p>210 points. 3 mechanic-led road tests. Every time.</p>
  </div>
</div>
```

**CSS**
```css
* { box-sizing: border-box; margin: 0; }

body {
  background: #111;
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh; padding: 40px 24px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: white;
}

.cards {
  display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;
}

.card {
  display: flex; flex-direction: column; align-items: flex-start;
  gap: 16px; padding: 28px; border-radius: 20px;
  background: rgba(255,255,255,.06);
  width: 220px; cursor: default;
}

.card__icon-wrap { line-height: 0; }

/* ── Levitate animation ── */
.card__icon {
  width: 56px; height: 56px; object-fit: contain;
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
}
.card:hover .card__icon {
  transform: translateY(-7px);
}

.card h3 { font-size: 17px; font-weight: 600; line-height: 1.3; }
.card p  { font-size: 14px; color: rgba(255,255,255,.55); line-height: 1.5; }
```

**JS**
```js
// No JS needed — pure CSS hover.
```

---

---

## Road test animation
> Full CodePen — references live Vercel assets

**HTML**
```html
<div class="td-stage-wrap">
  <h2 class="road-test-callout">Three mechanic-led road tests.<br>Every car. Every time.</h2>
  <div class="td-stage" id="v3-td-stage">
    <div class="td-card">
      <div class="td-num-wrap">
        <div class="td-odometer">
          <div class="td-odometer__window">
            <div class="td-odometer__strip" id="v3-td-strip">
              <div class="td-odometer__digit">#1</div>
              <div class="td-odometer__digit">#2</div>
              <div class="td-odometer__digit">#3</div>
              <div class="td-odometer__digit">#1</div>
            </div>
          </div>
        </div>
      </div>
      <div class="td-car-wrap">
        <canvas id="td-spin-canvas"></canvas>
      </div>
    </div>
    <img class="td-building" src="https://clutch-new.vercel.app/clutch-certified/assets/building-2.png" alt="">
  </div>
</div>
```

**CSS**
```css
* { box-sizing: border-box; margin: 0; }

:root {
  --ink:  #111111;
  --red:  #FF464C;
  --rule: rgba(0,0,0,0.1);
  --dim:  #191919;
}

body {
  background: #fff;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex; align-items: center; justify-content: center;
  min-height: 100vh; padding: 40px 24px;
}

.td-stage-wrap {
  display: flex; flex-direction: column; align-items: center;
  padding: 60px;
  width: 100%;
}

.road-test-callout {
  font-size: clamp(22px, 2.5vw, 36px);
  font-weight: 500; color: var(--ink);
  line-height: 1.25; letter-spacing: -0.03em;
  text-align: center; max-width: 680px;
  margin: 0 auto 56px;
}

.td-stage {
  position: relative;
  display: flex; flex-direction: column; align-items: center;
  gap: 24px; width: 100%;
}

.td-card {
  position: relative;
  width: 720px; height: 340px;
  background: #f5f5f7; border-radius: 24px;
  overflow: hidden;
  display: flex; flex-direction: column; align-items: center;
}

.td-num-wrap {
  position: absolute; inset: 0;
  display: flex; align-items: flex-end; justify-content: center;
  padding-bottom: 110px; z-index: 3;
}

.td-odometer {
  display: inline-flex; line-height: 1;
  font-size: 110px; font-weight: 800; letter-spacing: -6px;
}

.td-odometer__window {
  height: 1em; overflow-x: visible; overflow-y: hidden;
}

.td-odometer__strip {
  display: flex; flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.td-odometer__digit {
  height: 1em;
  display: flex; align-items: flex-start;
  background: linear-gradient(to bottom, #1c1c1e 0%, #c8c8cc 100%);
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
}

.td-car-wrap {
  position: absolute; bottom: 0; left: 0; right: 0;
  height: 100%; z-index: 2;
}

#td-spin-canvas {
  position: absolute; bottom: 0; left: 50%;
  transform: translateX(-50%);
  width: 100%; height: 100%;
}

.td-building {
  position: absolute; z-index: 4;
  top: 0; left: 50%;
  transform: translateX(-50%) translateY(-28%);
  width: 280px; pointer-events: none;
  filter: drop-shadow(0 12px 24px rgba(0,0,0,0.25));
}
```

**JS**
```js
var BASE       = 'https://clutch-new.vercel.app/clutch-certified/assets/car-cert/car-moving/';
var TOTAL      = 130;
var FPS        = 24;
var PAUSE_FRAME = 36;

var stage     = document.getElementById('v3-td-stage');
var strip     = document.getElementById('v3-td-strip');
var canvas    = document.getElementById('td-spin-canvas');
var ctx       = canvas.getContext('2d');
var images    = [];
var loaded    = 0;
var frameIndex = 0;
var rafId     = null;
var lastTime  = 0;
var current   = 0;
var wrapping  = false;
var testPausing = false;
var started   = false;

// Preload all frames
for (var i = 0; i < TOTAL; i++) {
  (function(idx) {
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      loaded++;
      if (idx === 0 && loaded === 1) drawFrame(0);
    };
    img.src = BASE + 'car-moving_' + String(idx).padStart(5, '0') + '.png';
    images[idx] = img;
  })(i);
}

function drawFrame(idx) {
  var img = images[idx];
  if (!img || !img.complete || !img.naturalWidth) return;
  var dpr = window.devicePixelRatio || 1;
  var cw = canvas.clientWidth, ch = canvas.clientHeight;
  if (canvas.width  !== Math.round(cw * dpr)) canvas.width  = Math.round(cw * dpr);
  if (canvas.height !== Math.round(ch * dpr)) canvas.height = Math.round(ch * dpr);
  var pw = canvas.width, ph = canvas.height;
  var scale = Math.min(pw / img.naturalWidth, ph / img.naturalHeight);
  var dw = img.naturalWidth  * scale;
  var dh = img.naturalHeight * scale;
  ctx.fillStyle = '#f5f5f7';
  ctx.fillRect(0, 0, pw, ph);
  ctx.drawImage(img, (pw - dw) / 2, ph - dh, dw, dh);
}

function showStep(i) {
  current = i;
  strip.style.transform = 'translateY(-' + i + 'em)';
}

function doTestTick() {
  testPausing = true;
  cancelAnimationFrame(rafId);
  var next = (current + 1) % 3;
  if (next === 0 && !wrapping) {
    wrapping = true;
    strip.style.transform = 'translateY(-3em)';
    setTimeout(function() {
      strip.style.transition = 'none';
      strip.style.transform  = 'translateY(0)';
      current = 0;
      requestAnimationFrame(function() { requestAnimationFrame(function() {
        strip.style.transition = '';
        wrapping = false; testPausing = false;
        lastTime = 0; rafId = requestAnimationFrame(animate);
      }); });
    }, 520);
  } else if (!wrapping) {
    showStep(next);
    setTimeout(function() {
      testPausing = false; lastTime = 0;
      rafId = requestAnimationFrame(animate);
    }, 1500);
  }
}

function animate(ts) {
  rafId = requestAnimationFrame(animate);
  if (ts - lastTime < 1000 / FPS) return;
  lastTime = ts;
  drawFrame(frameIndex);
  frameIndex++;
  if (frameIndex >= images.length) frameIndex = 0;
  if (!testPausing && frameIndex === PAUSE_FRAME) doTestTick();
}

// Start on scroll into view
new IntersectionObserver(function(entries, obs) {
  if (entries[0].isIntersecting && !started) {
    started = true;
    showStep(0);
    frameIndex = 0;
    rafId = requestAnimationFrame(animate);
    obs.disconnect();
  }
}, { threshold: 0.3 }).observe(stage);
```

---

---

## 210 section — image settings per category

Base CSS on all photos: `aspect-ratio: 16/9`, `object-fit: contain`, `object-position: center center`, `transition: opacity 0.18s ease`. The fade is a `mask-image` gradient — fades the image itself, not an overlay.

| # | Category | File | Mask gradient |
|---|----------|------|---------------|
| 0 | Body | `assets/210/Body.png` | `transparent 0% → black 30%` (left fade) |
| 1 | Road Test | `assets/210/Road Test.png` | `transparent 0% → black 30%` (left fade) |
| 2 | Engine | `assets/210/Engine.png` | `transparent 0% → black 30%` (left fade) |
| 3 | Suspension | `assets/210/Suspension.png` | `.ld-photo--fade-both` — `transparent 0–5% → black 35–65% → transparent 95–100%` (both edges) |
| 4 | Steering | `assets/210/Steerimg.png` | `transparent 0% → black 30%` (left fade) |
| 5 | Lights | `assets/210/Lights.png` | `transparent 0% → black 30%` (left fade) |
| 6 | Underbody | `assets/210/Underbody.png` | `transparent 0% → black 30%` (left fade) |
| 7 | Tires & Brakes | `assets/210/Tyres.png` | `.ld-photo--fade-right` — `transparent 0–8% → black 40%` (deeper left fade) |

**CSS for the three mask variants:**
```css
/* Default — all categories except 3 and 7 */
.ld-photo {
  mask-image: linear-gradient(to right, transparent 0%, black 30%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30%);
}

/* Index 3 — Suspension (subject is centred, needs both edges faded) */
.ld-photo.ld-photo--fade-both {
  mask-image: linear-gradient(to right, transparent 0%, transparent 5%, black 35%, black 65%, transparent 95%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 5%, black 35%, black 65%, transparent 95%, transparent 100%);
}

/* Index 7 — Tires & Brakes (content sits close to left edge, needs deeper fade) */
.ld-photo.ld-photo--fade-right {
  mask-image: linear-gradient(to right, transparent 0%, transparent 8%, black 40%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, transparent 8%, black 40%);
}
```

Note: `Steerimg.png` is a typo in the filename — should be `Steering.png` if the file is ever renamed.

---

## SVG reference — Expertly serviced section icons

Drop-in inline SVGs for each service category header:

**Mechanical**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"/>
</svg>
```

**Body & Cosmetic**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128m0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"/>
</svg>
```

**Glass**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"/>
</svg>
```

**Tires**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="9"/>
  <circle cx="12" cy="12" r="3"/>
  <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
</svg>
```

**Detailing**
```html
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"/>
</svg>
```
