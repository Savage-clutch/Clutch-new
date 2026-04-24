// Hero — BMW X5 as centered hero showpiece, interactive specs below
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
    <div style={{
      background: 'white', borderRadius: 16,
      border: isOpen ? '1.5px solid var(--coral)' : '1px solid rgba(0,0,0,.06)',
      overflow: 'hidden',
      transition: 'border-color .25s ease, box-shadow .25s ease',
      boxShadow: isOpen ? '0 14px 40px -16px rgba(255,70,76,.3)' : '0 2px 8px -4px rgba(0,0,0,.06)',
      cursor: 'pointer',
    }} onClick={onToggle}>
      <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: isOpen ? 'var(--coral)' : 'rgba(255,70,76,.08)',
          color: isOpen ? 'white' : 'var(--coral)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'background .25s ease, color .25s ease',
        }}>{icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</div>
          <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--ink)', letterSpacing: '-0.01em', marginTop: 2 }}>
            {value}{sub && <span style={{ fontWeight: 500, color: 'var(--ink-700)', fontSize: 14 }}> · {sub}</span>}
          </div>
        </div>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: 'var(--ink-150)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'transform .3s ease',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </div>
      <div style={{
        maxHeight: isOpen ? 200 : 0, overflow: 'hidden',
        transition: 'max-height .35s ease',
      }}>
        <div style={{
          padding: '0 20px 18px', fontSize: 14, color: 'var(--ink-700)', lineHeight: 1.55,
          borderTop: '1px solid rgba(0,0,0,.06)', paddingTop: 14,
        }}>
          {detail}
        </div>
      </div>
    </div>
  );
}

function Hero({ deadlineIso, onCtaClick }) {
  const { days, hours, mins, secs } = useCountdown(deadlineIso);
  const [scroll, setScroll] = useState(0);
  const [openSpec, setOpenSpec] = useState(null);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = (k) => setOpenSpec(openSpec === k ? null : k);

  const Seats = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5"/><path d="M14 20c0-2.5 2-4 4-4s3 1.5 3 4"/></svg>;
  const Bolt = <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/></svg>;
  const Fuel = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="10" height="16" rx="1"/><path d="M14 8h3l2 2v8a2 2 0 01-2 2"/><path d="M8 9h2M8 13h2"/></svg>;
  const Trans = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6 8v10M18 8v4h-6"/></svg>;
  const Drive = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 010 18M3 12h18M8 7l8 10"/></svg>;
  const Shield = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l8 3v7c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V5l8-3z"/><path d="M9 12l2 2 4-4"/></svg>;

  const specs = [
    { key: 'seats', icon: Seats, label: 'Seating', value: '5 seats', detail: 'Spacious seating for 5 with premium leather upholstery. Heated front seats, memory settings, and panoramic sunroof overhead.' },
    { key: 'power', icon: Bolt,  label: 'Horsepower', value: '335 hp', detail: 'Turbocharged 3.0L inline-6 delivering 335 hp and 330 lb-ft of torque. 0–100 km/h in 5.8 seconds.' },
    { key: 'fuel',  icon: Fuel,  label: 'L / 100 km', value: '10.2', sub: '7.8 hwy', detail: 'Combined 9.1 L/100 km thanks to a 48V mild-hybrid system. Premium fuel recommended.' },
    { key: 'trans', icon: Trans, label: 'Transmission', value: '8-spd', sub: 'Sport auto', detail: '8-speed sport automatic with paddle shifters and adaptive shift logic. Launch control included.' },
    { key: 'drive', icon: Drive, label: 'Drivetrain', value: 'xDrive AWD', detail: 'BMW intelligent xDrive all-wheel drive distributes torque to the wheels with most grip — automatically, in milliseconds.' },
  ];

  return (
    <section style={{ padding: '48px 0 80px', overflow: 'hidden', position: 'relative' }}>
      {/* Background wash removed */}

      {/* Ambient 3D icons removed per feedback */}

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Top row: eyebrow + countdown, centered */}
        <div className="center" style={{ marginBottom: 44 }}>
          <div className="eyebrow" style={{ marginBottom: 22 }}>Clutch Certified Giveaway</div>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 18,
          }}>
            <span style={{
              fontSize: 11, fontWeight: 800, letterSpacing: '.22em', textTransform: 'uppercase',
              color: 'var(--ink-500)', whiteSpace: 'nowrap',
            }}>
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

        {/* Title */}
        <h1 className="h-display center" style={{ maxWidth: 1000, margin: '0 auto 18px', textWrap: 'balance' }}>
          Win a <span style={{ whiteSpace: 'nowrap' }}>Clutch Certified</span> 2024 BMW X5.
        </h1>
        <p className="lede center" style={{ margin: '0 auto 24px' }}>
          Enter for a chance to win a free 2024 BMW X5 and experience Clutch Certified first hand.
        </p>

        {/* Primary CTA + value — above the fold */}
        <div className="center" style={{ marginBottom: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => {
            const el = document.getElementById('how');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
                  style={{ fontSize: 18, padding: '20px 40px' }}>
            Enter the Giveaway
          </button>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '10px 18px', borderRadius: 999,
            background: 'rgba(0,0,0,.04)',
            border: '1px solid rgba(0,0,0,.08)',
          }}>
            <span style={{ fontSize: 10, color: 'var(--ink-500)', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              Est. Value
            </span>
            <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
              C$50,000
            </span>
          </div>
        </div>
        <div className="center" style={{ marginBottom: 24, fontSize: 12, color: 'var(--ink-700)' }}>
          No purchase necessary · Ontario residents 18+
        </div>

        {/* ─── HERO CAR ─── */}
        <div style={{ position: 'relative', maxWidth: 1040, margin: '0 auto 28px' }}>
          {/* Car stage */}
          <div style={{ position: 'relative', minHeight: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="assets/bmw-x5.avif" alt="2024 BMW X5"
                 style={{
                   position: 'relative', zIndex: 3,
                   width: '85%', maxWidth: 880, display: 'block',
                   transform: `translateY(${-scroll * 0.06}px)`,
                 }} />
          </div>
        </div>

        {/* ─── INTERACTIVE SPEC GRID — below the car ─── */}
        <div style={{ maxWidth: 1040, margin: '64px auto 0' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 20, flexWrap: 'wrap', gap: 12,
          }}>
            <div style={{ maxWidth: 620 }}>
              <div className="eyebrow" style={{ marginBottom: 6 }}>Under the Hood</div>
              <h2 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                2024 BMW X5 xDrive specs
              </h2>
              <p style={{ fontSize: 15, color: 'var(--ink-700)', lineHeight: 1.55, margin: 0 }}>
                Turbocharged inline-6, intelligent all-wheel drive, and a cabin finished in premium leather — the X5 pairs real performance with everyday comfort. Every prize vehicle arrives fully inspected, serviced, and ready to drive.
              </p>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-700)', fontWeight: 600 }}>
              6 key specs at a glance
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
            alignItems: 'start',
          }}>
            {specs.map(s => (
              <SpecTile key={s.key} {...s} isOpen={openSpec === s.key} onToggle={() => toggle(s.key)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
