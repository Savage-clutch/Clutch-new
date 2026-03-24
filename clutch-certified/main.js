    const fill = document.getElementById('progress-fill');
    const sections = ['s-inspected','s-serviced','s-listed'];
    const dots = document.querySelectorAll('.section-nav__dot');

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      fill.style.width = (scrolled / total * 100) + '%';

      // Update active dot
      let current = 0;
      sections.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) current = i;
      });
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    });

    // Roll-up counter
    let counted = false;
    const counterEl = document.getElementById('counter-210');
    function runCounter() {
      if (counted) return;
      const rect = counterEl.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        counted = true;
        let start = 0;
        const end = 210;
        const duration = 1600;
        const startTime = performance.now();
        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          counterEl.textContent = Math.round(ease * end);
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }
    }
    window.addEventListener('scroll', runCounter);
    runCounter();

    // Photo carousel
    (function() {
      const track = document.getElementById('photo-track');
      const prevBtn = document.getElementById('photo-prev');
      const nextBtn = document.getElementById('photo-next');
      const caption = document.getElementById('photo-caption');
      if (!track) return;
      const slides = track.querySelectorAll('.photo-carousel__slide');
      let current = 0;
      let isAnimating = false;

      const wrap = track.parentElement;

      function updateCarousel() {
        const maxOffset = track.scrollWidth - wrap.clientWidth;
        const rawOffset = slides[current].offsetLeft;
        track.style.transform = 'translateX(-' + Math.min(rawOffset, maxOffset) + 'px)';
        prevBtn.disabled = current === 0;
        const atEnd = current >= slides.length - 1 || rawOffset >= maxOffset;
        nextBtn.disabled = atEnd;
        wrap.classList.toggle('is-at-end', atEnd);
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, 550);
      }

      prevBtn.addEventListener('click', () => { if (!isAnimating && current > 0) { current--; updateCarousel(); } });
      nextBtn.addEventListener('click', () => { if (!isAnimating && current < slides.length - 1) { current++; updateCarousel(); } });
    })();

    // 210 category accordion
    const collapseTimers = new WeakMap();

    function collapseRow(r) {
      r.classList.remove('active');
      const b = r.querySelector('.category-row__body');
      const inner = r.querySelector('.category-row__body-inner');
      b.style.opacity = '0';
      // Dip inner content down — clipped by body overflow:hidden, container stays put
      inner.style.transition = 'transform 80ms ease-out';
      inner.style.transform = 'translateY(10px)';
      const t = setTimeout(() => {
        inner.style.transition = '';
        inner.style.transform = '';
        b.style.transition = 'height 320ms cubic-bezier(0.4, 0, 0.2, 1)';
        b.style.height = '0';
        collapseTimers.delete(r);
        const anyActive = document.querySelector('#cat-list .category-row.active');
      }, 80);
      collapseTimers.set(r, t);
    }

    const catImages = [
      'assets/Body.webp',
      'assets/Road test.webp',
      'assets/Engine.webp',
      'assets/Suspension-2.webp',
      'assets/Steering.webp',
      'assets/Lights.webp',
      'assets/Underbody.webp',
      'assets/Tires and Brakes.webp',
    ];
    const catCarImgA = document.getElementById('cat-car-img-a');
    const catCarImgB = document.getElementById('cat-car-img-b');
    let catCarImg = catCarImgA;
    let catCarImgAlt = catCarImgB;
    catCarImgB.style.opacity = '0';

    const carWrap = catCarImgA.closest('.module-210__car-wrap');

    function swapCarImage(newSrc, cat) {
      const outgoing = catCarImg;
      const incoming = catCarImgAlt;


      incoming.src = newSrc;
      if (cat !== undefined) incoming.dataset.cat = cat;
      incoming.classList.remove('is-exiting');
      incoming.classList.add('is-entering');
      incoming.style.opacity = '';

      requestAnimationFrame(() => requestAnimationFrame(() => {
        outgoing.classList.add('is-exiting');
        incoming.classList.remove('is-entering');
      }));

      setTimeout(() => {
        outgoing.style.opacity = '0';
        outgoing.classList.remove('is-exiting');
        catCarImg = incoming;
        catCarImgAlt = outgoing;
      }, 620);
    }

    function expandRow(row) {
      if (collapseTimers.has(row)) {
        clearTimeout(collapseTimers.get(row));
        collapseTimers.delete(row);
        row.querySelector('.category-row__body-inner').style.transform = '';
      }
      const body = row.querySelector('.category-row__body');
      row.classList.add('active');
      body.style.transition = '';
      body.style.height = body.scrollHeight + 'px';
      body.style.opacity = '1';
      const cat = parseInt(row.dataset.cat);
      if (catImages[cat]) swapCarImage(catImages[cat], cat);
    }

    // Init pre-active row on load
    const preActive = document.querySelector('#cat-list .category-row.active');
    if (preActive) {
      const b = preActive.querySelector('.category-row__body');
      b.style.height = b.scrollHeight + 'px';
      b.style.opacity = '1';
    }

    document.querySelectorAll('#cat-list .category-row').forEach(row => {
      row.addEventListener('click', e => {
        if (row.classList.contains('active')) { collapseRow(row); return; }
        document.querySelectorAll('#cat-list .category-row').forEach(r => collapseRow(r));
        expandRow(row);
      });
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const el = document.getElementById(dot.dataset.target);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });


    // Layout B — inspection items
    const inspectionItems = {
      0: ["All body gaps are appropriate","All doors open and close properly","Antenna present and in good condition","No damage to rims","No noticeable signs of body repair or paint work","No scratches, dings, or dents on any doors","No scratches, dings, or dents on front bumper cover or hood","No scratches, dings, or dents on front fender or wheel arch areas","No scratches, dings, or dents on rear bumper cover or trunk/hatch area","No scratches, dings, or dents on rear quarter panels or wheel arch areas","No scratches, dings, or dents on roof","Paint color and lustre match across the entire vehicle","Hood hinges function properly","Hood latch secures properly with no signs of damage","No body panels or trim are loose or have sharp edges","No signs of damage to any piece of glass","Sub-frame assembly is not bent or damaged","Tow hook cover present","Trunk hinges function properly","Trunk latch secures properly with no signs of damage","Vehicle equipped with front and rear license plate brackets in good condition"],
      1: ["A pillar interior trim in good condition","All 12v accessory ports functional","All cupholders operational and in good condition","All door locks function properly","All interior door handles operational","All other interior accessories function properly","All speakers function and sound good","Armrests operational","B pillar interior trim in good condition","Blower recirculation functions properly","Blower speed control functions properly","Bluetooth functions properly","C pillar interior trim in good condition","Cargo covers in good condition","Center console in good condition, buttons legible","Central lock buttons by driver's seat work as expected","Centre console storage compartments operational and in good condition","Dashboard in good condition","Driver's seat belt operational","Driver's seat in good condition","Driver's seat lumbar support operational","Driver's seat position adjustments operational","Floor mats are in proper condition","Front and rear carpeting in good condition","Front defrost works","Fuel door release operational","Glovebox operational and in good condition","Headliner in good condition","Headrests function properly","Hood release operational","Horn honks","Interior door panels in good shape","Interior free from all odors including cigarette smoke","Interior lights function properly","Interior sun visors present and function properly","Interior vanity mirrors not cracked, chipped, or scratched","Navigation functions properly","Parking sensors test for accuracy and operational","Passenger's seat belt operational","Passenger's seat in good condition","Passenger's seat lumbar support operational","Passenger's seat position adjustments operational","Radio functions properly","Rear defrost works","Rear folding seats operational","Rear seat belts operational","Rear seats in good condition","Rearview mirror functions properly","Seat mountings are secure","Trip computer operational","Trunk interior panels and carpet in good shape","Trunk release operational","Vehicle key remote operational and starts vehicle","Vent controls function properly","Windows open and close smoothly","Cruise control operational","Differential operates properly during a tight turn","Equal amount of right / left steering wheel lock","Gear indicator display operational","Instrument cluster gauges and lights operational while driving","No dash warning lights on","No exterior clunks or rattles","No exterior squeaks or squeals","No interior rattles","No interior squeaks","No right / left pull under heavy braking","No warning lights are burnt out","No wind noise","Nothing abnormal on startup or idling","Odometer functions properly","OBD system returns no faults","Speedometer functions properly","Steering does not pull right / left","Steering returns to centre position after a turn","Transmission shifts smoothly","Vehicle absorbs bumps properly","Vehicle stopping distance is appropriate","Windshield sprayers operational and blades in good condition","Wiper blades operational on all speeds and intermittent"],
      2: ["Accelerator pedal functions properly and shows no signs of excessive wear","All wiring is secure and in good condition","Battery is charged","Battery is secure and appropriately covered","Battery posts and connections show no evidence of corrosion or deterioration","Brake fluid level and reservoir/cap in good condition","Clutch functions properly and shows no signs of excessive wear or slippage","Clutch pedal functions normally and shows no signs of excessive wear","Coolant level and reservoir/cap in good condition","Coolant level for hybrid cooling system in good condition","Differential functions normally","Drive belts in good condition","Drive shaft centre bearing and mount show no signs of damage","Drive shaft rotates freely","Engine air filter condition","Engine ignition functions properly","Engine interlock operational","Engine mounts in good condition","Engine oil level and condition","Exhaust system functions properly with no leaks","Fuel filler cap is present and secure","Fuel pump functions properly","Fuel system hoses are not cracked, damaged, or insecure","Fuel tank has no cracks or other forms of damage","Gear shifter functions properly and without excessive resistance","Hoses in good condition","Hybrid system electrical connections show no signs of damage or excessive wear","Hybrid system is functioning properly","MVI sticker is present","No abnormal engine sounds or smells","No battery leaks","No fuel system leaks","No signs of rodent damage or infestation","No visual signs of leaks","No wiring insulation is missing","Serpentine belt pulley is properly aligned","Transmission mounts in good condition","Vehicle engages in Drive","Vehicle engages in Neutral","Vehicle engages in Reverse","Washer fluid level and reservoir/cap in good condition"],
      3: ["All air suspension components functioning properly, no signs of damage or excessive wear","Anti-sway bars and bolts & bushings show no signs of damage","Appropriate suspension travel when the car is placed under load","Axle attachment and saddle show no damage","Axle bushings are not loose or shifted out of place","Coil springs are in proper position and have spacers between coils","Composite springs are not shifted and do not have more than 3mm of wear","Leaf springs are not shifted and do not have more than 3mm of wear","No tire interference with the suspension system or body frame","Rubber load cushions are not loose or missing","Shackles, pins, and bushings in normal position and do not exceed 2mm of wear","Suspension control arms show no signs of damage","Torsion bar shows no signs of damage","U-bolt hardware in normal position and does not show excessive wear","Vehicle does not oscillate more than two cycles after load is released","Vehicle ride height is appropriate and level"],
      4: ["No ball and socket joints show signs of damage or thread stripping","Power steering functions properly with no leaks or excessive noise","Steering box is secure with no evidence of cracks or leaks","Steering column and fasteners are secure","Steering control arms are secure and in good condition","Steering operates properly with tires maintaining appropriate frame clearance","Telescopic steering adjustments function properly","Tie rods show no signs of damage"],
      5: ["Daytime running lights function","Hazard lights function properly","Headlights function properly","High beams operational","Instrument panel light functions","License plate light functions","Parking lights function","Reverse lights operational","Taillights function properly","Turn signals function"],
      6: ["Belly pan in good condition","Exhaust systems and hangers in good condition","Motor/transmission mount in good condition","No damage to any underbody parts or components","No leaks from brake master cylinder or any brake lines, brake calipers, or brake wheel cylinders","No leaks from engine","No leaks from radiator or cooling system","No leaks from transmission","No leaks from washer fluid system","No signs of perforated rust","No noticeable signs of frame damage or repair"],
      7: ["Back left tire tread depth","Back right tire tread depth","Front left tire tread depth","Front right tire tread depth","ABS system functions properly","All brake lines show no evidence of corrosion or excessive wear","All brake lines show no evidence of leaks or bulging under pressure","All wheel fasteners are in good condition and torqued appropriately","Brake master cylinder is not loose and shows no evidence of damage or leaks","Brake pedal and mount do not show signs of excessive wear","Brake system functions normally","Brakes release appropriately and do not stick","Disc brake pads do not show wear beyond 50% of acceptable limits","Disc brake rotors do not show wear beyond 50% of acceptable limits","Drum Brake system operational","Emergency/Parking brake operational","No tire has less than 2mm of tread depth at any point","Tire sidewalls do not bulge","Tire tread is in good condition and has not been re-treaded","Tires are inflated to appropriate pressures","Brake pedal does not travel more than 80% of total available travel distance under medium pressure"]
    };
    const inspectionCatNames = ["Body","Road Test","Engine","Suspension","Steering","Lights","Underbody","Tires & Brakes"];
    const inspectionCatSummaries = [
      "Every panel, gap, and surface is checked for damage, rust, prior repairs, and paint consistency.",
      "Three separate mechanic-led road tests validate real-world performance across acceleration, braking, and handling.",
      "Fluid levels, belts, hoses, sensors, and emissions are inspected along with a full diagnostic scan.",
      "Shocks, struts, control arms, bushings, and wheel bearings are assessed for wear affecting ride and safety.",
      "Rack and pinion, tie rods, power steering fluid, and alignment are checked for any play or drift.",
      "Every headlight, indicator, brake light, reverse light, and interior cabin light is tested for function.",
      "The undercarriage is inspected for frame damage, rust, exhaust condition, and any fluid leaks.",
      "Tread depth is measured on all four tires and brake pads, rotors, and calipers are fully evaluated."
    ];

    function renderAltItems(catIndex, baseDelay) {
      const panel = document.getElementById('alt-items-panel');
      if (!panel) return;
      const items = inspectionItems[catIndex] || [];
      const summary = inspectionCatSummaries[catIndex] || '';
      const base = baseDelay || 0;
      panel.innerHTML =
        '<p class="alt-items-summary" style="opacity:0;animation:altCatTextIn 300ms ease ' + base + 'ms both">' + summary + '</p>' +
        items.map((item, i) =>
          '<div class="alt-item" style="animation-delay:' + (base + i * 25) + 'ms"><div class="alt-item__icon"><svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span>' + item + '</span></div>'
        ).join('');
    }

    (function() {
      const altList = document.getElementById('alt-cat-list');
      if (!altList) return;
      const altCarImg = document.getElementById('alt-car-img');
      const altItemsPanel = document.getElementById('alt-items-panel');
      const altItemsWrap = document.getElementById('alt-items-wrap');
      altList.addEventListener('click', function(e) {
        const btn = e.target.closest('.alt-cat');
        if (!btn) return;
        altList.querySelectorAll('.alt-cat').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = parseInt(btn.dataset.cat);
        renderAltItems(cat);
        if (altItemsPanel) {
          altItemsPanel.scrollTop = 0;
          setTimeout(checkAltScroll, 100);
        }
        if (altCarImg && catImages[cat]) {
          const shouldRotate = cat === 0 || cat === 6;
          altCarImg.style.opacity = '0';
          setTimeout(() => {
            altCarImg.src = catImages[cat];
            altCarImg.classList.toggle('is-rotated', shouldRotate);
            altCarImg.style.opacity = '1';
          }, 180);
        }
      });

      const fadeTop = document.getElementById('alt-fade-top');
      const fadeBottom = document.getElementById('alt-fade-bottom');
      function checkAltScroll() {
        if (!altItemsPanel || !fadeTop || !fadeBottom) return;
        const overflows = altItemsPanel.scrollHeight > altItemsPanel.clientHeight + 8;
        if (!overflows) {
          fadeTop.classList.add('is-hidden');
          fadeBottom.classList.add('is-hidden');
          return;
        }
        fadeTop.classList.toggle('is-hidden', altItemsPanel.scrollTop < 4);
        fadeBottom.classList.toggle('is-hidden', altItemsPanel.scrollTop + altItemsPanel.clientHeight >= altItemsPanel.scrollHeight - 4);
      }
      if (altItemsPanel) {
        altItemsPanel.addEventListener('scroll', checkAltScroll);
        new ResizeObserver(checkAltScroll).observe(altItemsPanel);
      }
      if (fadeTop) {
        fadeTop.addEventListener('click', function() {
          altItemsPanel.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
      if (fadeBottom) {
        fadeBottom.addEventListener('click', function() {
          altItemsPanel.scrollTo({ top: altItemsPanel.scrollHeight, behavior: 'smooth' });
        });
      }
      window.checkAltScroll = checkAltScroll;
    })();

    // Layout B intro animation
    (function() {
      var mod = document.getElementById('module-layout-b');
      if (!mod) return;

      var cats = Array.prototype.slice.call(mod.querySelectorAll('.alt-cat'));
      var itemsWrap = document.getElementById('alt-items-wrap');
      var n = cats.length;
      var centerIdx = 3;
      var cleanupTimer = null;

      function assignTypes() {
        var rowH = cats[0] ? cats[0].offsetHeight : 52;
        if (rowH === 0) rowH = 52;
        var gapH = 8;
        cats.forEach(function(cat, i) {
          var dist = i - centerIdx;
          if (dist === 0) {
            cat.setAttribute('data-intro-type', 'center');
            cat.style.removeProperty('--intro-y');
          } else {
            cat.setAttribute('data-intro-type', 'from-center');
            // Offset from own Y back to center row's Y
            cat.style.setProperty('--intro-y', (-dist * (rowH + gapH)) + 'px');
          }
        });
      }

      function measureCarY() {
        // Call with no intro classes active so car is at natural position
        var carImgEl = document.getElementById('alt-car-img');
        if (!carImgEl) return;
        var modRect = mod.getBoundingClientRect();
        var carRect = carImgEl.getBoundingClientRect();
        // Car's natural center relative to module top
        var carCenterFromTop = (carRect.top - modRect.top) + carRect.height / 2;
        var modCenter = mod.offsetHeight / 2;
        mod.style.setProperty('--car-start-y', Math.round(modCenter - carCenterFromTop) + 'px');
      }

      function playIntro() {
        if (cleanupTimer) clearTimeout(cleanupTimer);

        // Remove all intro classes → element is in natural state (car small, alt-bottom visible)
        mod.classList.remove('intro-playing', 'intro-pending');

        var panel = document.getElementById('alt-items-panel');
        if (panel) panel.innerHTML = '';

        // Measure now: car is at natural position, module at full height
        measureCarY();

        // Add pending → car jumps to centered+large, alt-bottom fades out
        mod.classList.add('intro-pending');

        requestAnimationFrame(function() { requestAnimationFrame(function() {
          mod.classList.remove('intro-pending');
          assignTypes();
          mod.classList.add('intro-playing');

          // Phase 3: list starts after car has landed (150ms delay + 800ms anim = 950ms)
          // Center-outward stagger: center fires first, then ±1, ±2, etc.
          var listStart = 850;
          var rowStagger = 60; // ms per step outward from center

          cats.forEach(function(cat, i) {
            var absDist = Math.abs(i - centerIdx);
            var delay = listStart + absDist * rowStagger;
            cat.style.setProperty('--cat-delay', delay + 'ms');
          });

          // Phase 4: panel slides in after outermost row has started + 400ms buffer
          var maxDist = Math.max(centerIdx, n - 1 - centerIdx);
          var lastRowStart = listStart + maxDist * rowStagger;
          var panelDelay = lastRowStart + 400;
          if (itemsWrap) {
            itemsWrap.style.setProperty('--panel-delay', panelDelay + 'ms');
            itemsWrap.style.animationDelay = panelDelay + 'ms';
          }

          // Render panel content when panel starts sliding in.
          // baseDelay 320ms so items begin appearing as the 400ms panel slide lands.
          setTimeout(function() {
            renderAltItems(0, 320);
            setTimeout(function() { if (window.checkAltScroll) window.checkAltScroll(); }, 450);
          }, panelDelay);

          var lastDelay = panelDelay + 500;
          cleanupTimer = setTimeout(function() {
            mod.classList.remove('intro-playing');
            cats.forEach(function(cat) {
              cat.style.animationDelay = '';
              cat.style.removeProperty('--cat-delay');
              cat.style.removeProperty('--intro-y');
            });
            if (itemsWrap) itemsWrap.style.animationDelay = '';
          }, Math.max(lastDelay, panelDelay + 800));
        }); });
      }

      // Initial state: measure first (no classes, natural height), then go pending
      measureCarY();
      mod.classList.add('intro-pending');
      assignTypes();

      // Replay button
      var replayBtn = document.getElementById('replay-layout-b');
      if (replayBtn) replayBtn.addEventListener('click', playIntro);

      // Auto-trigger on scroll into view
      var io = new IntersectionObserver(function(entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        playIntro();
      }, { threshold: 1.0, rootMargin: '-8px' });
      io.observe(mod);
    })();

    // Layout C — populate checklist items
    (function() {
      document.querySelectorAll('#module-layout-c .c-items-panel').forEach(function(panel) {
        const cat = parseInt(panel.dataset.cat);
        const items = inspectionItems[cat] || [];
        panel.innerHTML = items.map(function(item) {
          return '<div class="c-item"><div class="c-item__icon"><svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span>' + item + '</span></div>';
        }).join('');
      });

      const catCarImgC  = document.getElementById('cat-car-img-c');
      const catCarImgC2 = document.getElementById('cat-car-img-c2');
      if (!catCarImgC || !catCarImgC2) return;
      catCarImgC2.style.opacity = '0';
      let curC = catCarImgC, altC = catCarImgC2;

      function swapCarImageC(newSrc, cat) {
        altC.src = newSrc;
        if (cat !== undefined) altC.dataset.cat = cat;
        altC.classList.remove('is-exiting');
        altC.classList.add('is-entering');
        altC.style.opacity = '';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          curC.classList.add('is-exiting');
          altC.classList.remove('is-entering');
        }));
        setTimeout(() => {
          curC.style.opacity = '0';
          curC.classList.remove('is-exiting');
          curC = altC; altC = (altC === catCarImgC ? catCarImgC2 : catCarImgC);
        }, 620);
      }

      function expandRowC(row) {
        if (collapseTimers.has(row)) {
          clearTimeout(collapseTimers.get(row));
          collapseTimers.delete(row);
          row.querySelector('.category-row__body-inner').style.transform = '';
        }
        const body = row.querySelector('.category-row__body');
        row.classList.add('active');
        body.style.transition = '';
        body.style.height = body.scrollHeight + 'px';
        body.style.opacity = '1';
        const cat = parseInt(row.dataset.cat);
        if (catImages[cat]) swapCarImageC(catImages[cat], cat);
      }

      const preActiveC = document.querySelector('#cat-list-c .category-row.active');
      if (preActiveC) {
        const b = preActiveC.querySelector('.category-row__body');
        b.style.height = b.scrollHeight + 'px';
        b.style.opacity = '1';
      }

      document.querySelectorAll('#cat-list-c .category-row').forEach(function(row) {
        row.addEventListener('click', function() {
          if (row.classList.contains('active')) { collapseRow(row); return; }
          document.querySelectorAll('#cat-list-c .category-row').forEach(function(r) { collapseRow(r); });
          expandRowC(row);
        });
      });
    })();

    // Reveal on scroll
    (function() {
      // Elements to reveal individually
      const solo = [
        '.eyebrow',
        '.step1__headline', '.step1__body',
        '.counter-callout',
        '.verdict__headline', '.verdict__body', '.verdict__btn',
        '.step2__headline', '.step2__body', '.step2__body-large',
        '.detailing__eyebrow', '.detailing__headline', '.detailing__body', '.detailing__photo',
        '.step3__headline', '.step3__body', '.step3__car-wrap', '.step3__badge',
        '.promise__headline',
        '.road-test-callout',
        '.td-stage',
        '.photo-grid__label',
        '.photo-grid-section',
        '.final-cta__headline',
      ];

      // Elements whose children should stagger
      const stagger = [
        '.promise__cards .promise__card',
        '.summary-cards .summary-card',
        '.step2__cards .step2__card',
        '.step3__tags .step3__tag',
        '.photo-carousel__slides .photo-carousel__slide',
      ];

      solo.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
          el.classList.add('reveal');
        });
      });

      stagger.forEach(sel => {
        document.querySelectorAll(sel).forEach((el, i) => {
          el.classList.add('reveal');
          if (i > 0) el.dataset.d = Math.min(i, 6);
        });
      });

      // Hero uses CSS keyframe animations — remove from reveal system
      document.querySelectorAll('.hero .reveal').forEach(el => el.classList.remove('reveal'));

      // Reduced motion: skip animation, reveal everything immediately
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-revealed'));
        return;
      }

      // rootMargin fires when element crosses ~15% up from bottom of viewport
      // threshold: 0 means trigger the instant any pixel enters that zone — more
      // consistent than threshold: 0.12 which varies with element height
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.style.willChange = 'opacity, transform';
            e.target.classList.add('is-revealed');
            e.target.addEventListener('transitionend', () => {
              e.target.style.willChange = 'auto';
            }, { once: true });
            obs.unobserve(e.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

      document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

      // Fallback: when near the bottom of the page, reveal anything still hidden.
      // The -12% rootMargin means the very last elements can never scroll into the
      // trigger zone, so we flush them when the user reaches the bottom.
      function revealRemaining() {
        document.querySelectorAll('.reveal:not(.is-revealed)').forEach(el => {
          el.style.willChange = 'opacity, transform';
          el.classList.add('is-revealed');
          el.addEventListener('transitionend', () => { el.style.willChange = 'auto'; }, { once: true });
          obs.unobserve(el);
        });
      }
      window.addEventListener('scroll', () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 80) {
          revealRemaining();
        }
      }, { passive: true });
    })();


    // Shimmer: start when button enters view
    (function() {
      const btn = document.querySelector('.final-cta__btn--shimmer');
      if (!btn) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            btn.classList.add('shimmer-active');
            obs.unobserve(btn);
          }
        });
      }, { threshold: 0.5 });
      obs.observe(btn);
    })();

    // Test drive stage
    (function() {
      const stage = document.getElementById('td-stage');
      if (!stage) return;
      const carA = document.getElementById('td-car-a');
      const carB = document.getElementById('td-car-b');
      const numEl = document.getElementById('td-num');
      const dots = stage.querySelectorAll('.td-dot');
      const badge = document.getElementById('td-badge');
      let fired = false;
      let currentStep = 0;
      let animating = false;
      let autoTimer = null;
      const cars = [carA, carB];

      // Reset a car element to off-screen left, hidden, no transition
      function resetEl(el) {
        el.style.transition = 'none';
        el.style.opacity = '0';
        if (el.classList) el.classList.remove('is-moving', 'in-position');
        el.style.transformOrigin = 'right bottom';
        el.style.transform = 'translateX(-200%) scale(1.27) translate(0px, 20px)';
      }

      function setDot(i) {
        dots.forEach((d, j) => d.classList.toggle('active', j === i));
      }

      function setNum(n, cb) {
        numEl.classList.add('is-changing');
        setTimeout(() => { numEl.textContent = '#' + n; numEl.classList.remove('is-changing'); cb && cb(); }, 300);
      }

      const FINAL_TRANSFORM = 'translateX(-38%) scale(1.27) translate(0px, 20px)';

      function showBadge() {
        badge.classList.add('is-visible');
      }
      function hideBadge(cb) {
        badge.classList.remove('is-visible');
        setTimeout(cb, 260);
      }

      // Drive gifCar in, crossfade to staticCar at rest, call cb(staticCar)
      // onFadeStart fires when crossfade begins (for syncing badge)
      function driveIn(gifCar, staticCar, onFadeStart, cb) {
        // gif car moves in from left
        resetEl(gifCar);
        gifCar.src = 'assets/move.gif';
        gifCar.style.opacity = '1';

        // static car sits at final position, invisible, ready to fade in
        staticCar.style.transition = 'none';
        staticCar.src = 'assets/car-side.webp';
        staticCar.classList.remove('is-moving', 'in-position');
        staticCar.style.transformOrigin = 'right bottom';
        staticCar.style.transform = FINAL_TRANSFORM;
        staticCar.style.opacity = '0';

        requestAnimationFrame(() => requestAnimationFrame(() => {
          gifCar.style.transition = 'transform 1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
          gifCar.style.transform = FINAL_TRANSFORM;
        }));

        // Wait for car to fully stop, then crossfade gif → static (badge fires in sync)
        setTimeout(() => {
          onFadeStart && onFadeStart();
          staticCar.style.transition = 'opacity 200ms ease';
          staticCar.style.opacity = '1';
          gifCar.style.transition = 'opacity 200ms ease';
          gifCar.style.opacity = '0';
          setTimeout(() => {
            resetEl(gifCar);
            gifCar.src = 'assets/car-side.webp';
            cb(staticCar);
          }, 220);
        }, 1050);
      }

      // Drive car out to the right
      function driveOut(car, cb) {
        car.style.transition = 'transform 700ms cubic-bezier(0.4, 0, 1, 1), opacity 300ms ease 400ms';
        car.style.transform = 'translateX(160%) scale(1.27) translate(0px, 20px)';
        car.style.opacity = '0';
        setTimeout(cb, 750);
      }

      let liveCar = null;

      function step(i) {
        currentStep = i;
        animating = true;
        const gifCar = cars[i % 2];
        const staticCar = cars[(i + 1) % 2];
        setDot(i);
        setNum(i + 1, () => {
          driveIn(gifCar, staticCar, showBadge, (live) => {
            liveCar = live;
            animating = false;
            if (i < 2) {
              autoTimer = setTimeout(() => {
                hideBadge(() => driveOut(liveCar, () => step(i + 1)));
              }, 1600);
            }
          });
        });
      }

      // Jump to a step (for dot clicks)
      function jumpToStep(i) {
        if (animating) return;
        clearTimeout(autoTimer);
        badge.classList.remove('is-visible');
        resetEl(carA); resetEl(carB);
        liveCar = null;
        step(i);
      }

      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
          if (!fired) { fired = true; step(i); return; }
          if (i === currentStep) return;
          jumpToStep(i);
        });
      });

      function runStage() {
        if (fired) return;
        fired = true;
        resetEl(carA); resetEl(carB);
        step(0);
      }

      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { runStage(); obs.disconnect(); }
      }, { threshold: 0.4 });
      obs.observe(stage);
    })();

    /* TIMELINE JS DISABLED — uncomment to restore
    // Road test timeline
    (function() {
      const scene = document.getElementById('rt-scene');
      if (!scene) return;
      let carA = document.getElementById('rt-car-a');
      let carB = document.getElementById('rt-car-b');
      const checks = ['rt-check-0','rt-check-1','rt-check-2'].map(id => document.getElementById(id));
      const dots = scene.querySelectorAll('.rt-dot');
      let fired = false;

      let active = carA, inactive = carB;

      function crossfade(newSrc, isMoving, newLeft, moveActive, cb) {
        inactive.src = newSrc;
        inactive.classList.toggle('is-moving', isMoving);
        inactive.style.left = (newLeft !== null ? newLeft + 'px' : active.style.left || '-320px');
        if (moveActive && newLeft !== null) active.style.left = newLeft + 'px';
        inactive.style.opacity = '1';
        active.style.opacity = '0';
        const tmp = active; active = inactive; inactive = tmp;
        cb && cb();
      }

      function runAnim() {
        if (fired) return;
        fired = true;
        const sceneRect = scene.getBoundingClientRect();
        const carW = carA.offsetWidth;
        const dotXs = [...dots].map(d => {
          const r = d.getBoundingClientRect();
          return r.left - sceneRect.left + r.width / 2;
        });

        function goTo(i) {
          if (window.rtFrozen) return;
          const targetLeft = dotXs[i] - carW + 60;
          crossfade('assets/move.gif', true, targetLeft, true, null);
          const arriveDelay = 980;
          setTimeout(() => {
            if (window.rtFrozen) return;
            crossfade('assets/car-side.webp', false, targetLeft, false, () => {
              checks[i].classList.add('is-done');
              if (i < 2) setTimeout(() => goTo(i + 1), 650);
            });
          }, arriveDelay);
        }
        goTo(0);
      }

      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { runAnim(); obs.disconnect(); }
      }, { threshold: 0.5 });
      obs.observe(scene);
    })();
    END TIMELINE JS */


    (function() {
      const lb = document.getElementById('lightbox');
      const lbImg = document.getElementById('lb-img');
      const lbCounter = document.getElementById('lb-counter');
      const lbPrev = document.getElementById('lb-prev');
      const lbNext = document.getElementById('lb-next');

      const thumbs = Array.from(document.querySelectorAll('.photo-grid__thumb'));
      let current = 0;

      function open(i) {
        current = i;
        lbImg.src = thumbs[i].src;
        lbCounter.textContent = (i + 1) + ' / ' + thumbs.length;
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      function close() {
        lb.classList.remove('is-open');
        document.body.style.overflow = '';
      }

      function go(i) {
        current = (i + thumbs.length) % thumbs.length;
        lbImg.classList.add('is-switching');
        setTimeout(() => {
          lbImg.src = thumbs[current].src;
          lbCounter.textContent = (current + 1) + ' / ' + thumbs.length;
          lbImg.classList.remove('is-switching');
        }, 180);
      }

      thumbs.forEach((img, i) => img.addEventListener('click', () => open(i)));

      lbPrev.addEventListener('click', (e) => { e.stopPropagation(); go(current - 1); });
      lbNext.addEventListener('click', (e) => { e.stopPropagation(); go(current + 1); });
      document.getElementById('lb-close').addEventListener('click', close);
      lb.addEventListener('click', (e) => { if (e.target === lb) close(); });

      document.addEventListener('keydown', (e) => {
        if (!lb.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') go(current - 1);
        if (e.key === 'ArrowRight') go(current + 1);
      });
    })();
