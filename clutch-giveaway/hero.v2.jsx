// v2 Hero — giant BMW X5, spotlight, rotating chrome badge, dashboard flip-clock, idle 3D orbit
const { useEffect: useEffectH2, useState: useStateH2, useRef: useRefH2 } = React;

function useCountdownV2(targetIso) {
  const [now, setNow] = useStateH2(Date.now());
  useEffectH2(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

function V2FlipDigit({ value }) {
  const [display, setDisplay] = useStateH2(value);
  const [flipping, setFlipping] = useStateH2(false);
  useEffectH2(() => {
    if (display !== value) {
      setFlipping(true);
      const t = setTimeout(() => { setDisplay(value); setFlipping(false); }, 500);
      return () => clearTimeout(t);
    }
  }, [value, display]);
  return (
    <div className="v2-flip-card">
      <div className={`v2-flip-digit${flipping ? ' flipping' : ''}`}>{display}</div>
    </div>
  );
}

function V2FlipUnit({ value, label }) {
  const str = String(value).padStart(2, '0');
  return (
    <div className="v2-flip-unit">
      <div className="v2-flip-digits">
        <V2FlipDigit value={str[0]} />
        <V2FlipDigit value={str[1]} />
      </div>
      <div className="v2-flip-label">{label}</div>
    </div>
  );
}

function V2FlipClock({ deadlineIso }) {
  const t = useCountdownV2(deadlineIso);
  return (
    <div className="v2-flip">
      <V2FlipUnit value={t.days} label="Days" />
      <span className="v2-flip-colon">:</span>
      <V2FlipUnit value={t.hours} label="Hours" />
      <span className="v2-flip-colon">:</span>
      <V2FlipUnit value={t.mins} label="Mins" />
      <span className="v2-flip-colon">:</span>
      <V2FlipUnit value={t.secs} label="Secs" />
    </div>
  );
}

// Mouse-driven parallax for hero scene — icons + car shift on mouse move
function useMouseParallax() {
  const [xy, setXY] = useStateH2({ x: 0, y: 0 });
  useEffectH2(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setXY({ x, y });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return xy;
}

function HeroV2({ deadlineIso, onCtaClick }) {
  const { x, y } = useMouseParallax();
  const carRef = useRefH2(null);
  const [scrollY, setScrollY] = useStateH2(0);

  useEffectH2(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const carTilt = `perspective(2000px) rotateX(${2 + y * 2}deg) rotateY(${x * 4}deg) translate3d(${x * 14}px, ${y * 8 - scrollY * 0.18}px, 0) scale(${1 - Math.min(scrollY, 400) / 6000})`;

  return (
    <section className="dark stage-3d" style={{
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh',
      padding: '160px 0 80px',
      background: 'radial-gradient(ellipse at 50% 10%, #15151A 0%, #0A0A0D 50%, #050507 100%)',
    }}>
      {/* Floor grid receding into distance */}
      <div className="floor-grid" />

      {/* Coral spotlight base behind car */}
      <div className="spotlight-coral" />
      <div className="spotlight" />

      {/* Eyebrow + "Live Contest" pulse */}
      <div className="container center" style={{ position: 'relative', zIndex: 10, marginBottom: 24 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '8px 16px', borderRadius: 999,
          background: 'rgba(255,70,76,0.12)', border: '1px solid rgba(255,70,76,0.3)',
          fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: '#FF8A8E',
          backdropFilter: 'blur(12px)',
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: '#FF464C',
            boxShadow: '0 0 0 4px rgba(255,70,76,0.3)',
            animation: 'livePulse 1.6s ease-in-out infinite',
          }} />
          <span className="chrome-text" style={{ letterSpacing: '0.22em' }}>Clutch Certified · Live Giveaway</span>
        </div>
        <style>{`
          @keyframes livePulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255,70,76,0.6); }
            50%      { box-shadow: 0 0 0 10px rgba(255,70,76,0); }
          }
        `}</style>
      </div>

      {/* MEGA title overlapping the car */}
      <div className="container center" style={{ position: 'relative', zIndex: 10 }}>
        <h1 className="h-display" style={{
          color: '#F3EFE8',
          letterSpacing: '-0.035em',
          marginBottom: 18,
          textShadow: '0 10px 40px rgba(0,0,0,0.6)',
        }}>
          Win a 2024 <em>BMW X5</em>.
        </h1>
        <p className="lede" style={{ marginBottom: 32 }}>
          One winner. Free to enter. The 2024 BMW X5 comes fully inspected, serviced, and certified — delivered to your door.
        </p>
      </div>

      {/* HERO CAR STAGE */}
      <div style={{
        position: 'relative',
        maxWidth: 1600,
        margin: '0 auto',
        padding: '0 32px',
        zIndex: 5,
      }}>
        {/* Background "BMW X5" display text behind the car */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
          pointerEvents: 'none',
        }}>
          <div className="chrome-text" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(180px, 22vw, 420px)',
            fontWeight: 400,
            letterSpacing: '-0.06em',
            lineHeight: 0.85,
            opacity: 0.16,
            transform: `translate3d(${x * -20}px, ${y * -12}px, 0)`,
            transition: 'transform 0.4s ease-out',
            whiteSpace: 'nowrap',
            marginTop: '-4%',
          }}>
            X5
          </div>
        </div>

        {/* Floating 3D icons — orbit the car */}
        <img
          src="assets/icon-clock.png"
          alt=""
          className="icon-3d-v2 idle-a"
          style={{
            top: '8%', left: '6%', width: 120, zIndex: 2,
            transform: `translate3d(${x * 30}px, ${y * 18}px, 0)`,
            transition: 'transform 0.35s ease-out',
          }}
        />
        <img
          src="assets/icon-coins.png"
          alt=""
          className="icon-3d-v2 idle-b"
          style={{
            top: '14%', right: '7%', width: 110, zIndex: 2,
            transform: `translate3d(${x * -34}px, ${y * 22}px, 0)`,
            transition: 'transform 0.35s ease-out',
          }}
        />
        <img
          src="assets/icon-calendar.png"
          alt=""
          className="icon-3d-v2 idle-c"
          style={{
            bottom: '18%', left: '4%', width: 100, zIndex: 6,
            transform: `translate3d(${x * 22}px, ${y * -14}px, 0)`,
            transition: 'transform 0.35s ease-out',
          }}
        />
        <img
          src="assets/icon-bomb.png"
          alt=""
          className="icon-3d-v2 idle-d"
          style={{
            bottom: '22%', right: '5%', width: 95, zIndex: 6,
            transform: `translate3d(${x * -26}px, ${y * -18}px, 0)`,
            transition: 'transform 0.35s ease-out',
          }}
        />

        {/* Chrome certified badge — pinned top-right of car stage, rotating 3D */}
        <div style={{
          position: 'absolute',
          top: '-8%',
          right: '8%',
          width: 180,
          zIndex: 8,
          transform: `translate3d(${x * -10}px, ${y * -6}px, 0)`,
          transition: 'transform 0.35s ease-out',
        }}>
          <div className="chrome-badge-bob">
            <img
              src="assets/clutch-certified-chrome-v2.png"
              alt="Clutch Certified"
              className="chrome-badge-spin"
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>

        {/* THE CAR */}
        <div
          ref={carRef}
          style={{
            position: 'relative',
            zIndex: 4,
            transform: carTilt,
            transition: 'transform 0.4s ease-out',
            marginTop: '-2%',
          }}>
          <img src="assets/bmw-x5.avif" alt="2024 BMW X5" className="hero-car" style={{
            width: '100%',
            maxHeight: '72vh',
            objectFit: 'contain',
          }} />
          {/* Ground reflection */}
          <img src="assets/bmw-x5.avif" alt="" aria-hidden="true" className="hero-car hero-car-reflection" style={{
            width: '100%',
            maxHeight: '72vh',
            objectFit: 'contain',
          }} />
        </div>
      </div>

      {/* BELOW-CAR — CTA + flip countdown + spec chips */}
      <div className="container center" style={{ position: 'relative', zIndex: 10, marginTop: 40 }}>
        {/* Flip clock */}
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
          <V2FlipClock deadlineIso={deadlineIso} />
        </div>

        {/* CTA cluster */}
        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center',
          marginBottom: 36, flexWrap: 'wrap',
        }}>
          <button className="btn btn-primary" onClick={onCtaClick} style={{
            fontSize: 18, padding: '20px 40px',
          }}>
            Enter the Giveaway
          </button>
          <a href="#how" className="btn btn-ghost" onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('how');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}>
            How it works
          </a>
        </div>

        {/* Spec chips — vehicle details */}
        <div style={{
          display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap',
          maxWidth: 820, margin: '0 auto',
        }}>
          {[
            ['Model', '2024 BMW X5'],
            ['Value', 'C$50,000'],
            ['Inspection', '210-point'],
            ['Warranty', '90-day'],
            ['Delivery', 'Door-to-door'],
          ].map(([l, v]) => (
            <div key={l} className="spec-chip">
              <span className="spec-chip-label">{l}</span>
              <span style={{ color: 'white', fontWeight: 700 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

window.HeroV2 = HeroV2;
