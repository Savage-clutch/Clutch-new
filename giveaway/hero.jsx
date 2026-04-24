// Hero — 2025 Audi Q7 as centered hero showpiece, interactive specs below
const { useEffect, useState, useRef } = React;

function useCountdown(targetIso) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const target = new Date(targetIso).getTime();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
}

// ─── Flip digit — animates when it changes ───────────────────────────────────
function FlipDigit({ value }) {
  const [display, setDisplay] = useState(value);
  const [animating, setAnimating] = useState(false);
  useEffect(() => {
    if (display !== value) {
      setAnimating(true);
      const t = setTimeout(() => { setDisplay(value); setAnimating(false); }, 250);
      return () => clearTimeout(t);
    }
  }, [value, display]);
  return (
    <div className="flip-card">
      <div className={`flip-digit${animating ? ' flip-anim' : ''}`}>{display}</div>
    </div>
  );
}

function FlipUnit({ value, label }) {
  const str = String(value).padStart(2, '0');
  return (
    <div className="flip-unit">
      <div style={{ display: 'flex', gap: 4 }}>
        <FlipDigit value={str[0]} />
        <FlipDigit value={str[1]} />
      </div>
      <div className="flip-label">{label}</div>
    </div>
  );
}
function SpecTile({ icon, label, value, sub, detail, isOpen, onToggle }) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255,255,255,.1)', cursor: 'pointer' }} onClick={onToggle}>
      <div style={{ padding: '20px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          color: isOpen ? 'var(--coral)' : 'rgba(255,255,255,.45)',
          transition: 'color .2s', flexShrink: 0, display: 'flex',
        }}>{icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,.38)', marginBottom: 3 }}>{label}</div>
          <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: isOpen ? 'var(--coral)' : 'white', transition: 'color .2s' }}>
            {value}{sub && <span style={{ fontWeight: 400, color: 'rgba(255,255,255,.38)', fontSize: 14 }}> · {sub}</span>}
          </div>
        </div>
        <svg style={{
          width: 16, height: 16, flexShrink: 0,
          color: isOpen ? 'var(--coral)' : 'rgba(255,255,255,.35)',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform .3s cubic-bezier(0.16,1,0.3,1), color .2s',
        }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </div>
      <div style={{ maxHeight: isOpen ? 120 : 0, overflow: 'hidden', transition: 'max-height .4s cubic-bezier(0.16,1,0.3,1)' }}>
        <div style={{ paddingBottom: 20, paddingLeft: 36, fontSize: 14, color: 'rgba(255,255,255,.5)', lineHeight: 1.65 }}>
          {detail}
        </div>
      </div>
    </div>
  );
}

function Hero({ deadlineIso, onCtaClick }) {
  const { days, hours, mins, secs } = useCountdown(deadlineIso);
  const [scroll, setScroll] = useState(0);
  // intro → sequence plays full-screen | settling → overlay shrinks away | done → hero layout visible
  const [phase, setPhase] = useState('intro');
  const introCanvasRef = useRef(null);
  const canvasRef = useRef(null);
  const lastFrameRef = useRef(null);

  const specs = [
    { key: 'engine', label: 'Engine',       value: 'Mild Hybrid V6', sub: null,          detail: 'Gasoline/Mild Electric Hybrid V6 — refined power with improved efficiency. Smooth, responsive, and built for the long haul.',           img: 'audi/ac41fab2-03e7-44e1-a338-04f43d9ba0ca.webp' },
    { key: 'drive',  label: 'Drivetrain',   value: 'Automatic AWD',  sub: null,          detail: 'Full-time all-wheel drive with automatic torque distribution. Confident grip in every condition, every season.',                          img: 'audi/4a9d11a0-034c-4134-98af-81e478132802.webp' },
    { key: 'fuel',   label: 'L / 100 km',  value: '13 city',         sub: '10 hwy',      detail: 'Mild hybrid tech keeps city and highway fuel consumption in check without sacrificing performance.',                                       img: 'audi/6613a406-f7ab-4a6a-91a5-4aa344832a7c.webp' },
    { key: 'seats',  label: 'Seating',      value: '7 seats',         sub: null,          detail: 'Three rows of seating for up to 7. Premium leather upholstery, heated fronts, and a panoramic sunroof overhead.',                        img: 'audi/337f4feb-4d4b-43a6-96f9-1328a32498d1.webp' },
    { key: 'history',label: 'History',      value: 'No accidents',    sub: 'Carfax clean', detail: 'Carfax verified — no reported accidents. Comes with 2 keys and all-season tires. Factory premium audio included.',                      img: 'audi/ce8dbc97-c525-425b-8853-16fdfa8aa9b5.webp' },
  ];

  const [carouselIdx, setCarouselIdx] = useState(0);
  const maxIdx = specs.length - 2;
  const navigate = (dir) => setCarouselIdx(i => Math.max(0, Math.min(maxIdx, i + dir)));
  const [lightbox, setLightbox] = useState(null);
  const lbNext = () => setLightbox(i => (i + 1) % specs.length);
  const lbPrev = () => setLightbox(i => (i - 1 + specs.length) % specs.length);

  // Lock scroll during intro
  useEffect(() => {
    document.body.style.overflow = phase !== 'done' ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [phase]);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Full-screen intro sequence — plays once to the end, then transitions
  useEffect(() => {
    const canvas = introCanvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const TOTAL = 285, FPS = 24;
    const frames = new Array(TOTAL).fill(null);
    let loaded = 0, rafId, currentFrame = 0, lastTime = 0;
    const interval = 1000 / FPS;
    let finished = false;

    const blit = (img) => {
      const ctx = canvas.getContext('2d');
      const cw = canvas.width, ch = canvas.height;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dx = (cw - iw * scale) / 2, dy = (ch - ih * scale) / 2;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, iw * scale, ih * scale);
      lastFrameRef.current = img;
    };

    const draw = (time) => {
      if (finished) return;
      rafId = requestAnimationFrame(draw);
      const delta = time - lastTime;
      if (delta < interval) return;
      lastTime = time - (delta % interval);
      const img = frames[currentFrame];
      if (img) blit(img);
      currentFrame++;
      if (currentFrame >= TOTAL) {
        finished = true;
        cancelAnimationFrame(rafId);
        setPhase('settling');
        setTimeout(() => setPhase('done'), 1300);
      }
    };

    for (let i = 0; i < TOTAL; i++) {
      const img = new Image();
      img.src = `assets/hero-frames/frame-${String(i).padStart(3, '0')}.webp`;
      img.onload = () => {
        loaded++;
        if (loaded === 1) { blit(img); rafId = requestAnimationFrame(draw); }
      };
      frames[i] = img;
    }
    return () => cancelAnimationFrame(rafId);
  }, []);

  // When settling starts, stamp last frame onto the in-page canvas so it's ready underneath
  useEffect(() => {
    if (phase !== 'settling') return;
    const canvas = canvasRef.current;
    const img = lastFrameRef.current;
    if (!canvas || !img) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, [phase]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowRight') lbNext();
      else if (e.key === 'ArrowLeft') lbPrev();
      else if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <>
      {/* ── FULL-SCREEN INTRO OVERLAY ── */}
      {phase !== 'done' && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999, background: '#010101', overflow: 'hidden',
          ...(phase === 'settling' ? {
            transform: 'scale(0.66)',
            transformOrigin: '50% 82%',
            opacity: 0,
            transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease 0.3s',
          } : {}),
        }}>
          <canvas ref={introCanvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      )}

    <section className="section-dark" style={{ padding: '140px 0 0', overflow: 'hidden', position: 'relative', background: '#010101' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {phase === 'done' && <>
          {/* Title */}
          <h1 className="h-display center hero-animate hero-title" style={{ maxWidth: 1000, margin: '0 auto 28px', textWrap: 'balance' }}>
            Win a <span style={{ whiteSpace: 'nowrap' }}>Clutch Certified</span><br />2025 Audi Q7.
          </h1>

          {/* Countdown */}
          <div className="center hero-animate hero-clock" style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--ink-500)' }}>
                Ends in
              </span>
              <div className="flip-clock">
                <FlipUnit value={days} label="Days" />
                <span className="flip-colon">:</span>
                <FlipUnit value={hours} label="Hrs" />
                <span className="flip-colon">:</span>
                <FlipUnit value={mins} label="Min" />
                <span className="flip-colon">:</span>
                <FlipUnit value={secs} label="Sec" />
              </div>
            </div>
          </div>

          <p className="lede center hero-animate hero-lede" style={{ margin: '0 auto 28px' }}>
            Enter for a chance to win a free 2025 Audi Q7 and experience Clutch Certified first hand.
          </p>

          {/* CTA */}
          <div className="center hero-animate hero-cta" style={{ marginBottom: 60 }}>
            <button className="btn btn-primary" onClick={onCtaClick} style={{ fontSize: 18, padding: '20px 40px' }}>
              Enter the Giveaway
            </button>
            <div style={{ marginTop: 14, fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.35)', letterSpacing: '.04em' }}>
              Est. value C$80,000 · Free to enter
            </div>
          </div>
        </>}

      </div>

      {/* Car — in-page canvas, revealed as overlay fades */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: -100 }}>
        <canvas ref={canvasRef}
          style={{
            width: '70%', display: 'block', margin: '0 auto',
            transform: `translateX(4%) translateY(${-scroll * 0.04}px)`,
            opacity: phase === 'intro' ? 0 : 1,
            transition: phase === 'settling' ? 'opacity 0.5s ease' : 'none',
          }} />
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,0,0,.92)', backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'zoom-out',
        }}>
          <img src={specs[lightbox].img} alt={specs[lightbox].label}
               style={{ maxWidth: '82vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: 12 }} />

          {/* Prev */}
          <button onClick={(e) => { e.stopPropagation(); lbPrev(); }} style={{
            position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: '50%',
            width: 48, height: 48, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          {/* Next */}
          <button onClick={(e) => { e.stopPropagation(); lbNext(); }} style={{
            position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: '50%',
            width: 48, height: 48, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          {/* Counter */}
          <div style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.5)', letterSpacing: '.1em',
          }}>
            {lightbox + 1} / {specs.length}
          </div>

          {/* Close */}
          <button onClick={() => setLightbox(null)} style={{
            position: 'absolute', top: 24, right: 24,
            background: 'rgba(255,255,255,.1)', border: 'none', borderRadius: '50%',
            width: 40, height: 40, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}

      {/* ─── FEATURE CAROUSEL ─── */}
      <div style={{ background: '#f5f4f2', padding: '44px 0 0' }}>

        {/* Headline + arrows */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', marginBottom: 24 }}>
          <h2 style={{ fontSize: clamp(22, 32), fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a', margin: 0, lineHeight: 1.1 }}>
            Take a closer look.
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ dir: -1, path: 'M15 12H3m0 0l5-5m-5 5l5 5' }, { dir: 1, path: 'M9 12h12m0 0l-5-5m5 5l-5 5' }].map(({ dir, path }) => {
              const disabled = dir === -1 ? carouselIdx === 0 : carouselIdx === maxIdx;
              return (
                <button key={dir} onClick={() => navigate(dir)} disabled={disabled} style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,.18)',
                  background: 'transparent', cursor: disabled ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: disabled ? 0.2 : 1, transition: 'opacity .2s, background .2s',
                  fontFamily: 'inherit',
                }}
                  onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = 'rgba(0,0,0,.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliding track — peeks next slide */}
        <div style={{ overflow: 'hidden', paddingLeft: 48 }}>
          <div style={{
            display: 'flex', gap: 12,
            transform: `translateX(calc(-${carouselIdx} * (34% + 12px)))`,
            transition: 'transform .55s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {specs.map((s, si) => (
              <div key={s.key} style={{ width: '34%', flexShrink: 0 }}>
                <div onClick={() => setLightbox(si)} style={{ overflow: 'hidden', borderRadius: 12, aspectRatio: '3/2', marginBottom: 14, cursor: 'zoom-in', position: 'relative' }}>
                  <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform .4s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                <div style={{ paddingRight: 24 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.02em', color: '#0a0a0a', marginBottom: 5 }}>
                    {s.value}{s.sub && <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(0,0,0,.35)', marginLeft: 5 }}>· {s.sub}</span>}
                  </div>
                  <p style={{ fontSize: 13, color: 'rgba(0,0,0,.5)', lineHeight: 1.6, margin: '0 0 32px' }}>{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
    </>
  );
}

function clamp(min, max) {
  return `clamp(${min}px, 3.5vw, ${max}px)`;
}

window.Hero = Hero;
