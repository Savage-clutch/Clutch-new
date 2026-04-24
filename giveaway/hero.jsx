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

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="section-dark" style={{ padding: '140px 0 0', overflow: 'hidden', position: 'relative', background: '#010101' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Title */}
        <h1 className="h-display center" style={{ maxWidth: 1000, margin: '0 auto 28px', textWrap: 'balance' }}>
          Win a <span style={{ whiteSpace: 'nowrap' }}>Clutch Certified</span><br />2025 Audi Q7.
        </h1>

        {/* Countdown */}
        <div className="center" style={{ marginBottom: 28 }}>
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

        <p className="lede center" style={{ margin: '0 auto 28px' }}>
          Enter for a chance to win a free 2025 Audi Q7 and experience Clutch Certified first hand.
        </p>

        {/* CTA */}
        <div className="center" style={{ marginBottom: 60 }}>
          <button className="btn btn-primary" onClick={onCtaClick} style={{ fontSize: 18, padding: '20px 40px' }}>
            Enter the Giveaway
          </button>
        </div>

      </div>

      {/* Car — bleeds edge to edge below content */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: -100 }}>
        <img src="assets/hero.png" alt="2025 Audi Q7"
             style={{ width: '70%', display: 'block', margin: '0 auto', transform: `translateX(4%) translateY(${-scroll * 0.04}px)` }} />
      </div>

      {/* ─── FEATURE CAROUSEL ─── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', padding: '64px 0 0' }}>

        {/* Headline + arrows */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 64px', marginBottom: 36 }}>
          <h2 style={{ fontSize: clamp(28, 44), fontWeight: 800, letterSpacing: '-0.03em', color: 'white', margin: 0, lineHeight: 1.1 }}>
            Take a closer look.
          </h2>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ dir: -1, path: 'M15 12H3m0 0l5-5m-5 5l5 5' }, { dir: 1, path: 'M9 12h12m0 0l-5-5m5 5l-5 5' }].map(({ dir, path }) => {
              const disabled = dir === -1 ? carouselIdx === 0 : carouselIdx === maxIdx;
              return (
                <button key={dir} onClick={() => navigate(dir)} disabled={disabled} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,.18)',
                  background: 'transparent', cursor: disabled ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: disabled ? 0.2 : 1, transition: 'opacity .2s, background .2s',
                  fontFamily: 'inherit',
                }}
                  onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,.08)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={path} />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliding track — peeks next slide */}
        <div style={{ overflow: 'hidden', paddingLeft: 64 }}>
          <div style={{
            display: 'flex', gap: 16,
            transform: `translateX(calc(-${carouselIdx} * (47% + 16px)))`,
            transition: 'transform .55s cubic-bezier(0.16,1,0.3,1)',
          }}>
            {specs.map((s) => (
              <div key={s.key} style={{ width: '47%', flexShrink: 0 }}>
                <div style={{ overflow: 'hidden', borderRadius: 16, aspectRatio: '4/3', marginBottom: 20 }}>
                  <img src={s.img} alt={s.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ paddingRight: 32 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--coral)', marginBottom: 6 }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: 'white', marginBottom: 8 }}>
                    {s.value}{s.sub && <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,.35)', marginLeft: 6 }}>· {s.sub}</span>}
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,.45)', lineHeight: 1.65, margin: '0 0 48px' }}>{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}

function clamp(min, max) {
  return `clamp(${min}px, 3.5vw, ${max}px)`;
}

window.Hero = Hero;
