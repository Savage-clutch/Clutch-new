    // ── Back to top ─────────────────────────────────────────
    (function () {
      var btn = document.getElementById('back-to-top');
      if (!btn) return;
      window.addEventListener('scroll', function () {
        btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
      }, { passive: true });
    })();

    // ── Progress bar + nav scrim ─────────────────────────────
    (function () {
      var fill = document.getElementById('progress-fill');
      var nav  = document.querySelector('.nav');
      window.addEventListener('scroll', function () {
        var scrolled = window.scrollY;
        var total = document.documentElement.scrollHeight - window.innerHeight;
        if (fill) fill.style.width = (scrolled / total * 100) + '%';
        if (nav)  nav.classList.toggle('is-scrolled', scrolled > 40);
      }, { passive: true });
    })();

    // ── Odometer ───────────────────────────────────────────
    (function () {
      var TARGET_VEHICLES   = 70000;
      var TARGET_DATAPOINTS = 15000000;
      var DIGIT_H     = 72;
      var STAGGER_MS  = 70;
      var ENTER_DUR   = '2.4s';
      var ENTER_EASE  = 'cubic-bezier(0.16, 1, 0.3, 1)';
      var TICK_DELAY  = 3000;
      var TICK_DUR    = '0.5s';
      var TICK_EASE   = 'cubic-bezier(0.16, 1, 0.3, 1)';

      function formattedChars(n) { return Math.round(n).toLocaleString('en-US').split(''); }
      function paddedDigits(n, len) { var d = String(Math.round(n)).split('').map(Number); while (d.length < len) d.unshift(0); return d; }

      function buildOdometer(el, value) {
        el.innerHTML = '';
        var strips = [];
        formattedChars(value).forEach(function (ch) {
          if (ch === ',') {
            var sep = document.createElement('span');
            sep.className = 'odometer__sep'; sep.textContent = ','; sep.setAttribute('aria-hidden','true');
            el.appendChild(sep);
          } else {
            var win = document.createElement('span'); win.className = 'odometer__window';
            var strip = document.createElement('span'); strip.className = 'odometer__strip';
            for (var rep = 0; rep < 2; rep++) for (var d = 0; d <= 9; d++) {
              var cell = document.createElement('span'); cell.className = 'odometer__cell'; cell.textContent = String(d); strip.appendChild(cell);
            }
            win.appendChild(strip); el.appendChild(win); strips.push(strip);
          }
        });
        return strips;
      }

      function setTrans(strips, dur, ease) {
        strips.forEach(function (s) { s.style.transition = dur ? 'transform '+dur+' '+ease : 'none'; s.style.transitionDelay = '0ms'; });
      }
      function applyFirst(strips, n) { paddedDigits(n, strips.length).forEach(function(d,i){ strips[i].style.transform='translateY('+(-(d*DIGIT_H))+'px)'; }); }
      function applySecond(strips, n) { paddedDigits(n, strips.length).forEach(function(d,i){ strips[i].style.transform='translateY('+(-(10+d)*DIGIT_H)+'px)'; }); }
      function tickTo(strips, oldVal, newVal) {
        var oldD = paddedDigits(oldVal, strips.length), newD = paddedDigits(newVal, strips.length);
        newD.forEach(function(d,i){ if (d !== oldD[i]) strips[i].style.transform='translateY('+(-(d*DIGIT_H))+'px)'; });
      }

      function rollIn(strips, target, onDone) {
        setTrans(strips, null, null);
        strips.forEach(function(s){ s.style.transform='translateY(0)'; });
        requestAnimationFrame(function(){ requestAnimationFrame(function(){
          strips.forEach(function(s,i){ s.style.transition='transform '+ENTER_DUR+' '+ENTER_EASE; s.style.transitionDelay=((strips.length-1-i)*STAGGER_MS)+'ms'; });
          applySecond(strips, target);
          var settle = parseFloat(ENTER_DUR)*1000 + strips.length*STAGGER_MS + 200;
          setTimeout(function(){
            setTrans(strips, null, null); applyFirst(strips, target);
            requestAnimationFrame(function(){ requestAnimationFrame(function(){ if (onDone) setTimeout(onDone, TICK_DELAY); }); });
          }, settle);
        }); });
      }

      var velEl = document.getElementById('v3-vehicles');
      var dpEl  = document.getElementById('v3-datapoints');
      var section = document.getElementById('v3-stats');
      var vehicles = TARGET_VEHICLES, datapoints = TARGET_DATAPOINTS, animated = false;
      var velStrips = buildOdometer(velEl, TARGET_VEHICLES);
      var dpStrips  = buildOdometer(dpEl,  TARGET_DATAPOINTS);

      function startLiveTick() {
        setTrans(velStrips, TICK_DUR, TICK_EASE); setTrans(dpStrips, TICK_DUR, TICK_EASE);
        setInterval(function(){ var p=vehicles; vehicles+=1; tickTo(velStrips,p,vehicles); }, 2500);
        setInterval(function(){ var p=datapoints; datapoints+=10; tickTo(dpStrips,p,datapoints); }, 1500);
      }
      function runAnimation() {
        if (animated) return; animated = true;
        rollIn(velStrips, TARGET_VEHICLES, null);
        setTimeout(function(){ rollIn(dpStrips, TARGET_DATAPOINTS, startLiveTick); }, 300);
      }
      if ('IntersectionObserver' in window && section) {
        var obs = new IntersectionObserver(function(entries){ if (entries[0].isIntersecting){ runAnimation(); obs.disconnect(); } }, { threshold: 0.25 });
        obs.observe(section);
      } else { runAnimation(); }
    })();

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => revealObs.observe(el));

    // 210 roll-up counter
    (function() {
      var counterEl = document.getElementById('v3-counter-210');
      var counted = false;
      function runCounter() {
        if (counted) return;
        var rect = counterEl.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          counted = true;
          var end = 210, duration = 1600, startTime = performance.now();
          function step(now) {
            var progress = Math.min((now - startTime) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            counterEl.textContent = Math.round(ease * end);
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        }
      }
      window.addEventListener('scroll', runCounter, { passive: true });
      runCounter();
    })();

    // Section nav
    (function() {
      var navSections = ['v3-s-inspect', 'v3-s-recon', 'v3-s-listed'];
      var navDots = document.querySelectorAll('.section-nav__dot');
      var navEl = document.getElementById('v3-section-nav');
      function updateNav() {
        var current = 0;
        navSections.forEach(function(id, i) {
          var el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) current = i;
        });
        navDots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
        // Toggle dark mode based on background color under the nav
        var probe = document.elementFromPoint(window.innerWidth - 40, window.innerHeight / 2);
        var isDark = false;
        var el = probe;
        while (el && el !== document.body) {
          var bg = getComputedStyle(el).backgroundColor;
          var m = bg.match(/\d+/g);
          if (m && !(parseInt(m[0]) === 0 && parseInt(m[1]) === 0 && parseInt(m[2]) === 0 && (m[3] === '0' || bg.indexOf('rgba') === -1 && bg === 'rgba(0, 0, 0, 0)'))) {
            var lum = (0.299 * parseInt(m[0]) + 0.587 * parseInt(m[1]) + 0.114 * parseInt(m[2])) / 255;
            var alpha = m[3] !== undefined ? parseFloat(m[3]) : 1;
            if (alpha > 0.1) { isDark = lum < 0.35; break; }
          }
          el = el.parentElement;
        }
        navEl.classList.toggle('dark', isDark);
      }
      window.addEventListener('scroll', updateNav, { passive: true });
      navDots.forEach(function(dot) {
        dot.addEventListener('click', function() {
          var el = document.getElementById(dot.dataset.target);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
      updateNav();
    })();

    // 360 viewer
    (function() {
      var img = document.getElementById('spin360-img');
      var hint = document.getElementById('spin360-hint');
      var stage = document.getElementById('spin360-stage');
      if (!stage) return;

      // Single image — hide hint and counter
      var counter = document.getElementById('spin360-counter');
      if (counter) counter.style.display = 'none';
      if (hint) hint.style.display = 'none';

      function stopAuto() {
        if (interacted) return;
        interacted = true;
        clearTimeout(autoTimer);
        if (hint) { hint.style.opacity = '0'; }
      }

      // Mouse drag
      var dragStartX = null;
      var dragStartFrame = 0;
      stage.addEventListener('mousedown', function(e) {
        stopAuto();
        dragStartX = e.clientX;
        dragStartFrame = current;
        e.preventDefault();
      });
      window.addEventListener('mousemove', function(e) {
        if (dragStartX === null) return;
        var delta = dragStartX - e.clientX;
        setFrame(dragStartFrame + Math.round(delta / SENSITIVITY));
      });
      window.addEventListener('mouseup', function() { dragStartX = null; });

      // Touch drag
      var touchStartX = null;
      var touchStartFrame = 0;
      stage.addEventListener('touchstart', function(e) {
        stopAuto();
        touchStartX = e.touches[0].clientX;
        touchStartFrame = current;
      }, { passive: true });
      window.addEventListener('touchmove', function(e) {
        if (touchStartX === null) return;
        var delta = touchStartX - e.touches[0].clientX;
        setFrame(touchStartFrame + Math.round(delta / SENSITIVITY));
      }, { passive: true });
      window.addEventListener('touchend', function() { touchStartX = null; });
    })();

    // Road test stage — spin sequence + number cycler
    (function() {
      var stage = document.getElementById('v3-td-stage');
      if (!stage) return;
      var strip  = document.getElementById('v3-td-strip');
      var dots   = stage.querySelectorAll('.td-dot');
      var canvas = document.getElementById('td-spin-canvas');
      var ctx    = canvas.getContext('2d');
      var current = 0;
      var FPS = 24;
      var frameIndex = 0;
      var rafId = null;
      var lastTime = 0;
      var images = [];
      var loaded = 0;
      var started = false;

      // Preload frames
      var base = 'assets/car-cert/car-moving/';
      for (var i = 0; i < 130; i++) {
        (function(idx) {
          var img = new Image();
          img.onload = function() {
            loaded++;
            if (idx === 0 && loaded === 1) drawFrame(0);
          };
          img.src = base + encodeURIComponent('car-moving_' + String(idx).padStart(5,'0') + '.png');
          images[idx] = img;
        })(i);
      }

      function drawFrame(idx) {
        var img = images[idx];
        if (!img || !img.complete || !img.naturalWidth) return;
        var cw = canvas.clientWidth;
        var ch = canvas.clientHeight;
        if (canvas.width !== cw) canvas.width = cw;
        if (canvas.height !== ch) canvas.height = ch;
        var scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
        var dw = img.naturalWidth * scale;
        var dh = img.naturalHeight * scale;
        var dx = (cw - dw) / 2;
        var dy = ch - dh; // pin to bottom
        ctx.fillStyle = '#f5f5f7';
        ctx.fillRect(0, 0, cw, ch);
        ctx.drawImage(img, dx, dy, dw, dh);
      }

      function setDot(i) { dots.forEach(function(d,j){ d.classList.toggle('active', j===i); }); }

      var wrapping = false;
      var testPausing = false;
      var PAUSE_FRAME = 36; // frame where car is under the building — tune if needed

      function showStep(i) {
        current = i;
        setDot(i);
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
            strip.style.transform = 'translateY(0)';
            current = 0;
            setDot(0);
            requestAnimationFrame(function() {
              requestAnimationFrame(function() {
                strip.style.transition = '';
                wrapping = false;
                testPausing = false;
                lastTime = 0;
                rafId = requestAnimationFrame(animate);
              });
            });
          }, 520);
        } else if (!wrapping) {
          showStep(next);
          setTimeout(function() {
            testPausing = false;
            lastTime = 0;
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
        if (frameIndex >= images.length) {
          frameIndex = 0; // silent loop reset — number tick happens at PAUSE_FRAME
        }
        if (!testPausing && frameIndex === PAUSE_FRAME) {
          doTestTick();
        }
      }

      dots.forEach(function(dot, i) {
        dot.addEventListener('click', function() { showStep(i); });
      });

      // Start when visible
      var obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting && !started) {
          started = true;
          showStep(0);
          frameIndex = 20; // start at front frame
          rafId = requestAnimationFrame(animate);
          obs.disconnect();
        }
      }, { threshold: 0.3 });
      obs.observe(stage);
    })();

    // Photo carousel — continuous infinite scroll
    (function() {
      var wrap  = document.getElementById('v3-photo-wrap');
      var track = document.getElementById('v3-photo-track');
      if (!wrap || !track) return;

      var slides = Array.from(track.querySelectorAll('.photo-carousel__slide'));
      var count  = slides.length;

      // Clone all slides for seamless loop
      slides.forEach(function(s) { track.appendChild(s.cloneNode(true)); });

      var speed  = 1;
      var paused = false;

      function init() {
        var pad   = parseFloat(getComputedStyle(wrap).paddingLeft) || 0;
        var last  = slides[count - 1];
        var loopW = last.offsetLeft + last.offsetWidth - slides[0].offsetLeft + 12;

        wrap.scrollLeft = 0; // start with gap visible once as entrance
        wrap.classList.add('is-at-end');

        function tick() {
          if (!paused) {
            wrap.scrollLeft += speed;
            // reset to pad (not 0) so the gap never shows again after the first pass
            if (wrap.scrollLeft >= pad + loopW) wrap.scrollLeft -= loopW;
          }
          requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }

      requestAnimationFrame(init);

      wrap.addEventListener('mouseenter', function() { paused = true; });
      wrap.addEventListener('mouseleave', function() { paused = false; });
      wrap.addEventListener('touchstart',  function() { paused = true; }, { passive: true });
      wrap.addEventListener('touchend',    function() { paused = false; });
    })();

    // Layout B — 210-point inspection module
    (function() {
      var catImages = [
        'assets/Body.webp',
        'assets/Road test.webp',
        'assets/Engine.webp',
        'assets/Suspension-2.webp',
        'assets/Steering.webp',
        'assets/Lights.webp',
        'assets/Underbody.webp',
        'assets/Tires and Brakes.webp',
      ];
      var inspectionCatSummaries = [
        'Every panel, gap, and surface is checked for damage, rust, prior repairs, and paint consistency.',
        'Three separate mechanic-led road tests validate real-world performance across acceleration, braking, and handling.',
        'Fluid levels, belts, hoses, sensors, and emissions are inspected along with a full diagnostic scan.',
        'Shocks, struts, control arms, bushings, and wheel bearings are assessed for wear affecting ride and safety.',
        'Rack and pinion, tie rods, power steering fluid, and alignment are checked for any play or drift.',
        'Every headlight, indicator, brake light, reverse light, and interior cabin light is tested for function.',
        'The undercarriage is inspected for frame damage, rust, exhaust condition, and any fluid leaks.',
        'Tread depth is measured on all four tires and brake pads, rotors, and calipers are fully evaluated.'
      ];
      var inspectionItems = {
        0: ["All body gaps are appropriate","All doors open and close properly","Antenna present and in good condition","No damage to rims","No noticeable signs of body repair or paint work","No scratches, dings, or dents on any doors","No scratches, dings, or dents on front bumper cover or hood","No scratches, dings, or dents on front fender or wheel arch areas","No scratches, dings, or dents on rear bumper cover or trunk/hatch area","No scratches, dings, or dents on rear quarter panels or wheel arch areas","No scratches, dings, or dents on roof","Paint color and lustre match across the entire vehicle","Hood hinges function properly","Hood latch secures properly with no signs of damage","No body panels or trim are loose or have sharp edges","No signs of damage to any piece of glass","Sub-frame assembly is not bent or damaged","Tow hook cover present","Trunk hinges function properly","Trunk latch secures properly with no signs of damage","Vehicle equipped with front and rear license plate brackets in good condition"],
        1: ["A pillar interior trim in good condition","All 12v accessory ports functional","All cupholders operational and in good condition","All door locks function properly","All interior door handles operational","All other interior accessories function properly","All speakers function and sound good","Armrests operational","B pillar interior trim in good condition","Blower recirculation functions properly","Blower speed control functions properly","Bluetooth functions properly","C pillar interior trim in good condition","Cargo covers in good condition","Center console in good condition, buttons legible","Central lock buttons by driver's seat work as expected","Centre console storage compartments operational and in good condition","Dashboard in good condition","Driver's seat belt operational","Driver's seat in good condition","Driver's seat lumbar support operational","Driver's seat position adjustments operational","Floor mats are in proper condition","Front and rear carpeting in good condition","Front defrost works","Fuel door release operational","Glovebox operational and in good condition","Headliner in good condition","Headrests function properly","Hood release operational","Horn honks","Interior door panels in good shape","Interior free from all odours including cigarette smoke","Interior lights function properly","Interior sun visors present and function properly","Interior vanity mirrors not cracked, chipped, or scratched","Navigation functions properly","Parking sensors test for accuracy and operational","Passenger's seat belt operational","Passenger's seat in good condition","Passenger's seat lumbar support operational","Passenger's seat position adjustments operational","Radio functions properly","Rear defrost works","Rear folding seats operational","Rear seat belts operational","Rear seats in good condition","Rearview mirror functions properly","Seat mountings are secure","Trip computer operational","Trunk interior panels and carpet in good shape","Trunk release operational","Vehicle key remote operational and starts vehicle","Vent controls function properly","Windows open and close smoothly","Cruise control operational","Differential operates properly during a tight turn","Equal amount of right / left steering wheel lock","Gear indicator display operational","Instrument cluster gauges and lights operational while driving","No dash warning lights on","No exterior clunks or rattles","No exterior squeaks or squeals","No interior rattles","No interior squeaks","No right / left pull under heavy braking","No warning lights are burnt out","No wind noise","Nothing abnormal on startup or idling","Odometer functions properly","OBD system returns no faults","Speedometer functions properly","Steering does not pull right / left","Steering returns to centre position after a turn","Transmission shifts smoothly","Vehicle absorbs bumps properly","Vehicle stopping distance is appropriate","Windshield sprayers operational and blades in good condition","Wiper blades operational on all speeds and intermittent"],
        2: ["Accelerator pedal functions properly and shows no signs of excessive wear","All wiring is secure and in good condition","Battery is charged","Battery is secure and appropriately covered","Battery posts and connections show no evidence of corrosion or deterioration","Brake fluid level and reservoir/cap in good condition","Clutch functions properly and shows no signs of excessive wear or slippage","Clutch pedal functions normally and shows no signs of excessive wear","Coolant level and reservoir/cap in good condition","Coolant level for hybrid cooling system in good condition","Differential functions normally","Drive belts in good condition","Drive shaft centre bearing and mount show no signs of damage","Drive shaft rotates freely","Engine air filter condition","Engine ignition functions properly","Engine interlock operational","Engine mounts in good condition","Engine oil level and condition","Exhaust system functions properly with no leaks","Fuel filler cap is present and secure","Fuel pump functions properly","Fuel system hoses are not cracked, damaged, or insecure","Fuel tank has no cracks or other forms of damage","Gear shifter functions properly and without excessive resistance","Hoses in good condition","Hybrid system electrical connections show no signs of damage or excessive wear","Hybrid system is functioning properly","MVI sticker is present","No abnormal engine sounds or smells","No battery leaks","No fuel system leaks","No signs of rodent damage or infestation","No visual signs of leaks","No wiring insulation is missing","Serpentine belt pulley is properly aligned","Transmission mounts in good condition","Vehicle engages in Drive","Vehicle engages in Neutral","Vehicle engages in Reverse","Washer fluid level and reservoir/cap in good condition"],
        3: ["All air suspension components functioning properly, no signs of damage or excessive wear","Anti-sway bars and bolts & bushings show no signs of damage","Appropriate suspension travel when the car is placed under load","Axle attachment and saddle show no damage","Axle bushings are not loose or shifted out of place","Coil springs are in proper position and have spacers between coils","Composite springs are not shifted and do not have more than 3mm of wear","Leaf springs are not shifted and do not have more than 3mm of wear","No tire interference with the suspension system or body frame","Rubber load cushions are not loose or missing","Shackles, pins, and bushings in normal position and do not exceed 2mm of wear","Suspension control arms show no signs of damage","Torsion bar shows no signs of damage","U-bolt hardware in normal position and does not show excessive wear","Vehicle does not oscillate more than two cycles after load is released","Vehicle ride height is appropriate and level"],
        4: ["No ball and socket joints show signs of damage or thread stripping","Power steering functions properly with no leaks or excessive noise","Steering box is secure with no evidence of cracks or leaks","Steering column and fasteners are secure","Steering control arms are secure and in good condition","Steering operates properly with tires maintaining appropriate frame clearance","Telescopic steering adjustments function properly","Tie rods show no signs of damage"],
        5: ["Daytime running lights function","Hazard lights function properly","Headlights function properly","High beams operational","Instrument panel light functions","License plate light functions","Parking lights function","Reverse lights operational","Taillights function properly","Turn signals function"],
        6: ["Belly pan in good condition","Exhaust systems and hangers in good condition","Motor/transmission mount in good condition","No damage to any underbody parts or components","No leaks from brake master cylinder or any brake lines, brake calipers, or brake wheel cylinders","No leaks from engine","No leaks from radiator or cooling system","No leaks from transmission","No leaks from washer fluid system","No signs of perforated rust","No noticeable signs of frame damage or repair"],
        7: ["Back left tire tread depth","Back right tire tread depth","Front left tire tread depth","Front right tire tread depth","ABS system functions properly","All brake lines show no evidence of corrosion or excessive wear","All brake lines show no evidence of leaks or bulging under pressure","All wheel fasteners are in good condition and torqued appropriately","Brake master cylinder is not loose and shows no evidence of damage or leaks","Brake pedal and mount do not show signs of excessive wear","Brake system functions normally","Brakes release appropriately and do not stick","Disc brake pads do not show wear beyond 50% of acceptable limits","Disc brake rotors do not show wear beyond 50% of acceptable limits","Drum Brake system operational","Emergency/Parking brake operational","No tire has less than 2mm of tread depth at any point","Tire sidewalls do not bulge","Tire tread is in good condition and has not been re-treaded","Tires are inflated to appropriate pressures","Brake pedal does not travel more than 80% of total available travel distance under medium pressure"]
      };

      function renderAltItems(catIndex, baseDelay) {
        var panel = document.getElementById('v3-alt-items-panel');
        if (!panel) return;
        var items = inspectionItems[catIndex] || [];
        var summary = inspectionCatSummaries[catIndex] || '';
        var base = baseDelay || 0;
        panel.innerHTML =
          '<p class="alt-items-summary" style="opacity:0;animation:altCatTextIn 300ms ease ' + base + 'ms both">' + summary + '</p>' +
          items.map(function(item, i) {
            return '<div class="alt-item" style="animation-delay:' + (base + i * 25) + 'ms"><div class="alt-item__icon"><svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="#34C759" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><span>' + item + '</span></div>';
          }).join('');
      }

      // Category click — swap image + render items
      var altList = document.getElementById('v3-alt-cat-list');
      var altCarImg = document.getElementById('v3-alt-car-img');
      var altItemsPanel = document.getElementById('v3-alt-items-panel');
      var fadeTop = document.getElementById('v3-alt-fade-top');
      var fadeBottom = document.getElementById('v3-alt-fade-bottom');

      function checkAltScroll() {
        if (!altItemsPanel || !fadeTop || !fadeBottom) return;
        var overflows = altItemsPanel.scrollHeight > altItemsPanel.clientHeight + 8;
        if (!overflows) { fadeTop.classList.add('is-hidden'); fadeBottom.classList.add('is-hidden'); return; }
        fadeTop.classList.toggle('is-hidden', altItemsPanel.scrollTop < 4);
        fadeBottom.classList.toggle('is-hidden', altItemsPanel.scrollTop + altItemsPanel.clientHeight >= altItemsPanel.scrollHeight - 4);
      }
      if (altItemsPanel) {
        altItemsPanel.addEventListener('scroll', checkAltScroll);
        new ResizeObserver(checkAltScroll).observe(altItemsPanel);
      }
      if (fadeTop) fadeTop.addEventListener('click', function() { if (altItemsPanel) altItemsPanel.scrollTo({ top: 0, behavior: 'smooth' }); });
      if (fadeBottom) fadeBottom.addEventListener('click', function() { if (altItemsPanel) altItemsPanel.scrollTo({ top: altItemsPanel.scrollHeight, behavior: 'smooth' }); });
      window.v3CheckAltScroll = checkAltScroll;

      if (altList) {
        altList.addEventListener('click', function(e) {
          var btn = e.target.closest('.alt-cat');
          if (!btn) return;
          altList.querySelectorAll('.alt-cat').forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          var cat = parseInt(btn.dataset.cat);
          renderAltItems(cat);
          if (altItemsPanel) { altItemsPanel.scrollTop = 0; setTimeout(checkAltScroll, 100); }
          if (altCarImg && catImages[cat]) {
            var shouldRotate = cat === 0 || cat === 6;
            altCarImg.style.opacity = '0';
            if (altCarImg._swapTimer) clearTimeout(altCarImg._swapTimer);
            var nextSrc = catImages[cat];
            altCarImg._swapTimer = setTimeout(function() {
              altCarImg._swapTimer = null;
              altCarImg.classList.toggle('is-rotated', shouldRotate);
              altCarImg.onload = function() {
                altCarImg.onload = null;
                altCarImg.style.opacity = '1';
              };
              altCarImg.src = nextSrc;
              // If already cached, onload won't fire — fade in immediately
              if (altCarImg.complete && altCarImg.naturalWidth) {
                altCarImg.onload = null;
                altCarImg.style.opacity = '1';
              }
            }, 180);
          }
        });
      }

      // Intro animation
      var mod = document.getElementById('v3-module-layout-b');
      if (!mod) return;
      var cats = Array.prototype.slice.call(mod.querySelectorAll('.alt-cat'));
      var itemsWrap = document.getElementById('v3-alt-items-wrap');
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
            cat.style.setProperty('--intro-y', (-dist * (rowH + gapH)) + 'px');
          }
        });
      }

      function measureCarY() {
        var carImgEl = document.getElementById('v3-alt-car-img');
        if (!carImgEl) return;
        var modRect = mod.getBoundingClientRect();
        var carRect = carImgEl.getBoundingClientRect();
        var carCenterFromTop = (carRect.top - modRect.top) + carRect.height / 2;
        var modCenter = mod.offsetHeight / 2;
        mod.style.setProperty('--car-start-y', Math.round(modCenter - carCenterFromTop) + 'px');
      }

      function playIntro() {
        if (cleanupTimer) clearTimeout(cleanupTimer);
        mod.classList.remove('intro-playing', 'intro-pending');
        var panel = document.getElementById('v3-alt-items-panel');
        if (panel) panel.innerHTML = '';
        measureCarY();
        mod.classList.add('intro-pending');
        requestAnimationFrame(function() { requestAnimationFrame(function() {
          mod.classList.remove('intro-pending');
          assignTypes();
          mod.classList.add('intro-playing');
          var listStart = 850;
          var rowStagger = 60;
          cats.forEach(function(cat, i) {
            var absDist = Math.abs(i - centerIdx);
            cat.style.setProperty('--cat-delay', (listStart + absDist * rowStagger) + 'ms');
          });
          var maxDist = Math.max(centerIdx, n - 1 - centerIdx);
          var panelDelay = listStart + maxDist * rowStagger + 400;
          if (itemsWrap) {
            itemsWrap.style.setProperty('--panel-delay', panelDelay + 'ms');
            itemsWrap.style.animationDelay = panelDelay + 'ms';
          }
          setTimeout(function() {
            renderAltItems(0, 320);
            setTimeout(function() { if (window.v3CheckAltScroll) window.v3CheckAltScroll(); }, 450);
          }, panelDelay);
          cleanupTimer = setTimeout(function() {
            mod.classList.remove('intro-playing');
            cats.forEach(function(cat) {
              cat.style.animationDelay = '';
              cat.style.removeProperty('--cat-delay');
              cat.style.removeProperty('--intro-y');
            });
            if (itemsWrap) itemsWrap.style.animationDelay = '';
          }, panelDelay + 800);
        }); });
      }

      measureCarY();
      mod.classList.add('intro-pending');
      assignTypes();

      var carImg = document.getElementById('v3-alt-car-img');
      var io = new IntersectionObserver(function(entries) {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        playIntro();
      }, { threshold: 0.6 });
      io.observe(carImg || mod);
    })();

    // ── Lightbox ────────────────────────────────────────────
    (function () {
      var imgs = Array.from(document.querySelectorAll('.photo-carousel__img'));
      if (!imgs.length) return;

      var lb = document.createElement('div');
      lb.className = 'lightbox';
      lb.innerHTML = '<button class="lightbox__close" aria-label="Close">&#x2715;</button>' +
        '<button class="lightbox__prev" aria-label="Previous"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4L6 9l5 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
        '<img class="lightbox__img" src="" alt="">' +
        '<button class="lightbox__next" aria-label="Next"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>';
      document.body.appendChild(lb);

      var lbImg = lb.querySelector('.lightbox__img');
      var prevBtn = lb.querySelector('.lightbox__prev');
      var nextBtn = lb.querySelector('.lightbox__next');
      var current = 0;

      function show(index) {
        current = index;
        lbImg.src = imgs[current].src;
        lbImg.alt = imgs[current].alt;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current === imgs.length - 1;
      }

      function open(index) {
        show(index);
        lb.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      }

      function close() {
        lb.classList.remove('is-open');
        document.body.style.overflow = '';
      }

      imgs.forEach(function(img, i) {
        img.addEventListener('click', function() { open(i); });
      });

      prevBtn.addEventListener('click', function() { if (current > 0) show(current - 1); });
      nextBtn.addEventListener('click', function() { if (current < imgs.length - 1) show(current + 1); });
      lb.querySelector('.lightbox__close').addEventListener('click', close);
      lb.addEventListener('click', function(e) { if (e.target === lb) close(); });
      document.addEventListener('keydown', function(e) {
        if (!lb.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft' && current > 0) show(current - 1);
        if (e.key === 'ArrowRight' && current < imgs.length - 1) show(current + 1);
      });
    })();

    // ── Recon gallery — 3D cylinder carousel ──
    (function() {
      var platter = document.getElementById('v3-recon-platter');
      if (!platter) return;
      var arrowBtn = document.getElementById('v3-recon-platter-arrow');
      if (arrowBtn) {
        arrowBtn.addEventListener('click', function() {
          platter.scrollBy({ left: 120, behavior: 'smooth' });
        });
      }
      var indicator = document.getElementById('v3-recon-indicator');
      var ring = document.getElementById('v3-recon-ring');
      var btns = platter.querySelectorAll('.recon-tabnav__btn');
      var items = ring ? ring.querySelectorAll('.recon-gallery__item') : [];
      var copyEls = document.querySelectorAll('#v3-recon-copy .recon-tab-copy__text');

      var ITEM_COUNT = items.length;

      // Slot definitions — proportional to stage width (txR, tzR) so they scale responsively.
      // Mirrors the reference: translate(-50%,-50%) centers the card, then each slot
      // applies its own translateX / translateZ / rotateY / scale on top.
      var SLOTS = [
        // far-left
        { txR: -0.619, tzR: -0.38, ry:  55, scale: 0.72, opacity: 0,    brightness: 1,    ptr: 'none' },
        // left  (wing)
        { txR: -0.369, tzR: -0.26, ry:  42, scale: 0.80, opacity: 0.5,  brightness: 0.45, ptr: 'auto' },
        // center — small positive Z keeps it clearly in front of the wings
        { txR:  0,     tzR:  0.04, ry:   0, scale: 1,    opacity: 1,    brightness: 1,    ptr: 'auto' },
        // right (wing)
        { txR:  0.369, tzR: -0.26, ry: -42, scale: 0.80, opacity: 0.5,  brightness: 0.45, ptr: 'auto' },
        // far-right
        { txR:  0.619, tzR: -0.38, ry: -55, scale: 0.72, opacity: 0,    brightness: 1,    ptr: 'none' },
      ];

      function slotIdx(offset, n) {
        if (offset === 0)         return 2;           // center
        if (offset === 1)         return 3;           // right
        if (offset === 2)         return 4;           // far-right
        if (offset === n - 1)     return 1;           // left
        if (offset === n - 2)     return 0;           // far-left
        return offset < n / 2 ? 4 : 0;               // rest park at far edges
      }

      function updateCards(idx, instant) {
        var n      = ITEM_COUNT;
        var stageW = ring.offsetWidth;
        items.forEach(function(item, i) {
          var offset = ((i - idx) + n) % n;
          var s      = SLOTS[slotIdx(offset, n)];
          var tf     = 'translate(-50%, -50%) translateX(' + (s.txR * stageW) + 'px)'
                     + ' translateZ(' + (s.tzR * stageW) + 'px) rotateY(' + s.ry + 'deg)'
                     + ' scale(' + s.scale + ')';
          if (instant) item.style.transition = 'none';
          item.style.transform     = tf;
          item.style.opacity       = String(s.opacity);
          item.style.filter        = 'brightness(' + s.brightness + ')';
          item.style.pointerEvents = s.ptr;
          item.classList.toggle('is-active', offset === 0);
        });
        if (instant) {
          requestAnimationFrame(function() {
            requestAnimationFrame(function() {
              items.forEach(function(item) { item.style.transition = ''; });
            });
          });
        }
      }

      function initRing() {
        if (!ring || !items.length) return;
        ring.style.transform = 'none';
        updateCards(0, true);
      }

      function rotateTo(idx) {
        if (!ring) return;
        updateCards(idx, false);
      }

      function moveIndicator(btn) {
        indicator.style.left = btn.offsetLeft + 'px';
        indicator.style.width = btn.offsetWidth + 'px';
      }

      function scrollPlatterToBtn(btn) {
        var btnLeft = btn.offsetLeft;
        var btnRight = btnLeft + btn.offsetWidth;
        var visLeft = platter.scrollLeft;
        var visRight = visLeft + platter.clientWidth;
        if (btnRight > visRight) {
          platter.scrollBy({ left: btnRight - visRight + 8, behavior: 'smooth' });
        } else if (btnLeft < visLeft) {
          platter.scrollBy({ left: btnLeft - visLeft - 8, behavior: 'smooth' });
        }
      }

      function selectTab(idx) {
        btns.forEach(function(b, i) { b.classList.toggle('is-active', i === idx); });
        copyEls.forEach(function(el, i) { el.classList.toggle('is-active', i === idx); });
        rotateTo(idx);
        moveIndicator(btns[idx]);
        scrollPlatterToBtn(btns[idx]);
      }

      btns.forEach(function(btn, idx) {
        btn.addEventListener('click', function() { selectTab(idx); });
      });

      items.forEach(function(item, i) {
        item.addEventListener('click', function() {
          if (i !== getActive()) { stopAuto(); selectTab(i); }
        });
      });

      function getActive() {
        for (var i = 0; i < btns.length; i++) {
          if (btns[i].classList.contains('is-active')) return i;
        }
        return 0;
      }

      var autoTimer = null;
      function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
      function startAuto() {
        autoTimer = setInterval(function() {
          selectTab((getActive() + 1) % btns.length);
        }, 3000);
      }

      document.getElementById('v3-recon-prev').addEventListener('click', function() {
        stopAuto();
        selectTab((getActive() - 1 + btns.length) % btns.length);
      });
      document.getElementById('v3-recon-next').addEventListener('click', function() {
        stopAuto();
        selectTab((getActive() + 1) % btns.length);
      });
      btns.forEach(function(btn) { btn.addEventListener('click', stopAuto); });

      var stage = document.querySelector('#v3-recon-gallery .recon-gallery__stage');
      if (stage) {
        var swipeStartX = 0;
        stage.addEventListener('touchstart', function(e) {
          swipeStartX = e.touches[0].clientX;
        }, { passive: true });
        stage.addEventListener('touchend', function(e) {
          var dx = e.changedTouches[0].clientX - swipeStartX;
          if (Math.abs(dx) < 40) return;
          stopAuto();
          selectTab(dx < 0 ? (getActive() + 1) % btns.length : (getActive() - 1 + btns.length) % btns.length);
        }, { passive: true });
      }

      var resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() { updateCards(getActive(), true); }, 150);
      });

      initRing();
      startAuto();

      indicator.style.transition = 'none';
      moveIndicator(btns[0]);
      requestAnimationFrame(function() {
        requestAnimationFrame(function() { indicator.style.transition = ''; });
      });
    })();

    /* ── SCROLL-DRIVEN CAR ROTATION ── */
    (function () {
      var wrapper = document.getElementById('listed-frames');
      if (!wrapper) return;
      var frames = Array.from(wrapper.querySelectorAll('.listed__frame'));
      var driver = document.getElementById('listed-scroll-driver');
      var section = document.getElementById('v3-s-listed');
      var COUNT = frames.length; // 57
      var START_FRAME = 0;
      var SWEEP = 56;
      var activeIdx = -1;

      function showFrame(idx) {
        idx = ((idx % COUNT) + COUNT) % COUNT;
        if (idx === activeIdx) return;
        if (activeIdx >= 0) frames[activeIdx].style.opacity = 0;
        frames[idx].style.opacity = 1;
        activeIdx = idx;
      }

      showFrame(START_FRAME);

      window.addEventListener('scroll', function () {
        if (!section) return;
        var rect = section.getBoundingClientRect();
        // 0 when section enters from below, 1 when section top hits viewport top
        var progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
        showFrame(Math.round(START_FRAME + progress * SWEEP));
      }, { passive: true });
    })();
