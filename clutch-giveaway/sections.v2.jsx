// v2 Sections — marquee, Why Certified, How to Win (pinned rail), FinalCTA, Footer
// Reuses EnterSection, TermsAndConditions from v1 form.jsx
const { useEffect: useEffectS2, useState: useStateS2, useRef: useRefS2 } = React;

// ── Marquee strip ────────────────────────────────────────────────────────
function MarqueeV2() {
  const items = [
    'Clutch Certified', '210-point inspection', 'Door-to-door delivery',
    '10-day return', '90-day warranty', 'Free entry', 'C$50,000 value',
  ];
  const sep = <span style={{ color: 'rgba(255,70,76,0.6)', margin: '0 32px' }}>✦</span>;
  const row = [...items, ...items, ...items];
  return (
    <section style={{ padding: '48px 0', background: '#0A0A0D', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
      <div className="marquee-track">
        {row.map((item, i) => (
          <span key={i} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 72px)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            whiteSpace: 'nowrap',
            color: i % 2 === 0 ? '#F3EFE8' : 'transparent',
            WebkitTextStroke: i % 2 === 0 ? 'none' : '1.5px rgba(255,255,255,0.3)',
          }}>
            {item}{sep}
          </span>
        ))}
      </div>
    </section>
  );
}

// ── Why Certified — cream section with 3D stats & chrome badge ──────────
function WhyCertifiedV2() {
  const stats = [
    { n: '210', s: '', label: 'Point inspection', desc: 'Every vehicle passes our full mechanical and cosmetic inspection.' },
    { n: '10', s: '-day', label: 'Return window', desc: "Test it in real life. If it's not right, send it back." },
    { n: '90', s: '-day', label: 'Warranty', desc: 'Peace of mind, included.' },
    { n: '100%', s: '', label: 'Online', desc: 'Delivered to your door across Canada.' },
  ];
  return (
    <section className="cream" style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', marginBottom: 80 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>Why Clutch Certified</div>
            <h2 className="h-display" style={{ color: 'var(--ink)', marginBottom: 24 }}>
              The car you <em>actually</em> want.
            </h2>
            <p className="lede" style={{ color: 'rgba(10,10,10,0.65)', margin: 0, maxWidth: 460 }}>
              Every Clutch Certified vehicle is inspected, serviced, detailed, and certified in person by a Clutch mechanic — so you know exactly what you're getting.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <img src="assets/clutch-certified-chrome-v2.png" alt="Clutch Certified" className="chrome-badge-spin"
              style={{ width: 320, filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.22))' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(10,10,10,0.035)',
              border: '1px solid rgba(10,10,10,0.06)',
              borderRadius: 20, padding: 28,
              transition: 'transform 0.3s var(--ease-theatrical), box-shadow 0.3s ease',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 30px 60px -20px rgba(0,0,0,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div className="h-num" style={{ fontSize: 'clamp(64px, 6vw, 88px)', color: 'var(--ink)', marginBottom: 8 }}>
                {s.n}<span style={{ color: 'var(--coral)', fontSize: '0.45em', verticalAlign: 'top' }}>{s.s}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.5)', marginBottom: 10 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(10,10,10,0.7)', lineHeight: 1.5 }}>
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3D tilt card tracking cursor ────────────────────────────────────────
function Tilt3DCard({ children, style }) {
  const ref = useRefS2(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(1400px) rotateX(${(0.5 - py) * 10}deg) rotateY(${(px - 0.5) * 12}deg) translateZ(12px)`;
  };
  const onLeave = () => {
    const el = ref.current; if (!el) return;
    el.style.transform = '';
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="tilt-3d" style={style}>
      {children}
    </div>
  );
}

// ── How to Win — 3 cinematic step cards ─────────────────────────────────
function HowToWinV2({ onStepClick }) {
  const steps = [
    { n: 1, pts: '5', ptsLabel: 'POINTS', title: 'Name and email', desc: 'Drop your name, email, and social handle to officially enter.', icon: 'assets/icon-picker.png', tag: 'Required', duration: '~10 sec' },
    { n: 2, pts: '100', ptsLabel: 'PTS / VEHICLE', title: 'Get a vehicle offer', desc: 'Get a free instant cash offer on any car you own. Unlimited entries.', icon: 'assets/icon-coins.png', tag: 'Optional', duration: '~1 min' },
    { n: 3, pts: '30', ptsLabel: 'PTS MAX', title: 'Get social', desc: 'Comment on 3 Clutch ads — something interesting, funny, or quirky.', icon: 'assets/icon-bomb.png', tag: 'Optional', duration: '~1 min' },
  ];
  return (
    <section id="how" className="dark stage-3d" style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '20%', left: '50%', width: 800, height: 800,
        transform: 'translateX(-50%)', pointerEvents: 'none',
        background: 'radial-gradient(circle at center, rgba(255,70,76,0.12), transparent 60%)',
        filter: 'blur(40px)', zIndex: 0,
      }} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="center" style={{ marginBottom: 80 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>How to Win</div>
          <h2 className="h-display" style={{ color: '#F3EFE8', marginBottom: 20 }}>
            Three steps. Up to <em>135</em> points.
          </h2>
          <p className="lede">
            Only Step 1 is required. The more you stack, the better your odds.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {steps.map((s) => (
            <Tilt3DCard key={s.n} style={{
              background: s.n === 2
                ? 'linear-gradient(180deg, rgba(255,70,76,0.12) 0%, rgba(255,70,76,0.04) 60%, rgba(255,255,255,0.03) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: s.n === 2 ? '1.5px solid rgba(255,70,76,0.45)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 24, padding: 36,
              position: 'relative', overflow: 'hidden',
              backdropFilter: 'blur(12px)',
              boxShadow: s.n === 2 ? '0 40px 80px -30px rgba(255,70,76,0.35)' : '0 20px 40px -20px rgba(0,0,0,0.5)',
              transform: s.n === 2 ? 'translateY(-12px)' : 'none',
              minHeight: s.n === 2 ? 380 : 340,
            }}>
              {/* Huge outlined number */}
              <div className="rail-num" style={{
                position: 'absolute', top: -30, right: -10,
                fontSize: 260, lineHeight: 1, zIndex: 0,
                WebkitTextStroke: s.n === 2 ? '2px rgba(255,70,76,0.3)' : '2px rgba(255,255,255,0.1)',
              }}>{s.n}</div>

              <img src={s.icon} alt="" style={{
                position: 'absolute', top: -20, right: -20, width: 130,
                filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.5))',
                zIndex: 1,
              }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
                  <span style={{
                    padding: '4px 10px', borderRadius: 999,
                    background: s.n === 2 ? 'rgba(255,70,76,0.18)' : 'rgba(255,255,255,0.08)',
                    border: `1px solid ${s.n === 2 ? 'rgba(255,70,76,0.4)' : 'rgba(255,255,255,0.12)'}`,
                    fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: s.n === 2 ? '#FF8A8E' : 'rgba(255,255,255,0.7)',
                  }}>{s.tag}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em' }}>
                    {s.duration}
                  </span>
                </div>

                <div className="h-num" style={{ fontSize: 88, color: '#F3EFE8', marginBottom: 4 }}>
                  {s.pts}
                </div>
                <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>
                  {s.ptsLabel}
                </div>

                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, color: '#F3EFE8', letterSpacing: '-0.015em', lineHeight: 1.1, marginBottom: 12 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.55, marginBottom: 24 }}>
                  {s.desc}
                </div>

                <button onClick={() => onStepClick(s.n)} style={{
                  background: 'transparent',
                  color: s.n === 2 ? '#FF8A8E' : 'rgba(255,255,255,0.85)',
                  border: 'none', padding: 0,
                  fontSize: 13, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderBottom: `1px solid ${s.n === 2 ? 'rgba(255,70,76,0.5)' : 'rgba(255,255,255,0.3)'}`,
                  paddingBottom: 3,
                }}>
                  Jump to Step {s.n}
                </button>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ ─────────────────────────────────────────────────────────────────
function FAQV2() {
  const [open, setOpen] = useStateS2(0);
  const faqs = [
    { q: 'Is there a purchase required?', a: 'No purchase necessary. Step 1 — the official contest entry — is completely free. Steps 2 and 3 are optional bonus-point actions, also free.' },
    { q: 'Who is eligible?', a: 'Legal residents of Ontario, Canada, 18 years or older at time of entry. See the full terms below for exclusions.' },
    { q: 'How are odds calculated?', a: 'One winner is selected by random draw, weighted proportionally by your total accumulated points. More points = better odds.' },
    { q: 'Do I have to sell my car to get a Step 2 offer?', a: 'Absolutely not. The instant cash offer is free and has zero obligation. You get 100 points whether or not you accept the offer.' },
    { q: 'When is the winner announced?', a: 'One winner will be drawn within 14 days of the contest closing. The winner must answer a skill-testing question to claim the prize.' },
  ];
  return (
    <section id="faq" className="dark" style={{ padding: '120px 0' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div className="center" style={{ marginBottom: 60 }}>
          <div className="eyebrow" style={{ marginBottom: 18 }}>FAQ</div>
          <h2 className="h-display" style={{ color: '#F3EFE8' }}>Questions? <em>Answered.</em></h2>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                width: '100%', textAlign: 'left', padding: '26px 0',
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
                color: '#F3EFE8', fontFamily: 'var(--font-display)',
                fontSize: 22, fontWeight: 500, letterSpacing: '-0.01em',
              }}>
                <span>{f.q}</span>
                <span style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.3s ease',
                  flexShrink: 0,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                </span>
              </button>
              <div style={{
                maxHeight: open === i ? 260 : 0, overflow: 'hidden',
                transition: 'max-height 0.5s var(--ease-theatrical)',
              }}>
                <div style={{ paddingBottom: 26, fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 680 }}>
                  {f.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ───────────────────────────────────────────────────────────
function FinalCTAV2({ onClick }) {
  return (
    <section className="dark" style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        width: 900, height: 900, transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle at center, rgba(255,70,76,0.25), transparent 60%)',
        filter: 'blur(40px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div className="container center" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ marginBottom: 40, display: 'flex', justifyContent: 'center' }}>
          <img src="assets/clutch-certified-chrome-v2.png" alt="Clutch Certified" className="chrome-badge-spin chrome-badge-bob"
            style={{ width: 200, filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.6))' }} />
        </div>
        <h2 className="h-display" style={{ color: '#F3EFE8', marginBottom: 28 }}>
          Don't want to wait? <em>Shop Clutch Certified.</em>
        </h2>
        <p className="lede" style={{ marginBottom: 40 }}>
          Hundreds of inspected, serviced, and certified vehicles — delivered to your door across Canada.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={onClick} style={{ fontSize: 17, padding: '18px 36px' }}>
            Enter the Giveaway
          </button>
          <a href="https://www.clutch.ca" target="_blank" rel="noopener" className="btn btn-ghost">
            Browse Clutch Certified
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────
function FooterV2() {
  return (
    <footer style={{ background: '#050507', color: 'rgba(255,255,255,0.5)', padding: '56px 0 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg viewBox="0 0 118 29" width="96" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.18 28.33h5.3V.18h-5.3v28.15zM48.9 7.8v11.09c0 3.57-2.03 4.99-4.55 4.99-2.38 0-4.03-1.33-4.03-4.12V7.8h-5.3v12.6c0 5.47 2.9 7.93 7.7 7.93 2.67 0 4.94-.59 6.17-2.44v2.44h5.3V7.8h-5.3zm22.92 4.92V7.63h-4.64V0h-5.3v7.63h-3.57v5.09h3.57v8.54c0 5.54 2.5 7.72 9.94 6.9v-4.8c-3.04.16-4.64.12-4.64-2.1V12.72h4.64zm38.42-5.49c-2.75 0-4.89 1.03-6.12 2.88V.18h-5.3v28.15h5.3V17.25c0-3.58 1.93-5.1 4.52-5.1 2.38 0 4.06 1.44 4.06 4.23v11.95H118V15.73c0-5.47-3.4-8.5-7.76-8.5zM15.7 27.17c1.88-.93 3.42-2.4 4.42-4.2l-4.76-2.26c-.38.61-.9 1.11-1.52 1.48l1.87 4.99zm-1.92.74l-1.96-4.94c-.33.05-.67.08-1.02.08-.37 0-.73-.03-1.08-.1L7.8 27.92c.95.26 1.97.4 3.04.4 1.02 0 2.01-.14 2.95-.4zM5.3 17.47c0 2.09.97 3.8 2.5 4.76L5.87 27.2C2.31 25.44 0 21.8 0 17.47 0 11.35 4.6 6.63 10.84 6.63c4.02 0 7.51 2.14 9.2 5.3L15.26 14.2c-.9-1.45-2.54-2.35-4.46-2.35-3.16 0-5.5 2.34-5.5 5.62zm80.45 10.84c4.02 0 7.51-2.14 9.28-5.34l-4.84-2.25c-.9 1.42-2.53 2.27-4.47 2.27-3.16 0-5.5-2.34-5.5-5.58 0-3.29 2.34-5.62 5.5-5.62 1.92 0 3.56.89 4.45 2.34l4.79-2.27c-1.69-3.16-5.18-5.3-9.2-5.3-6.24 0-10.84 4.72-10.84 10.84 0 6.12 4.6 10.84 10.84 10.84z" fill="white"/>
          </svg>
          <span style={{ fontSize: 13 }}>© 2026 Clutch Technologies Inc.</span>
        </div>
        <div style={{ display: 'flex', gap: 20, fontSize: 13 }}>
          <a href="#terms" style={{ color: 'inherit' }}>Contest Rules</a>
          <a href="#" style={{ color: 'inherit' }}>Privacy</a>
          <a href="#terms" style={{ color: 'inherit' }}>Terms</a>
          <a href="#faq" style={{ color: 'inherit' }}>FAQ</a>
        </div>
      </div>
      <div className="container" style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
        Open to legal residents of Ontario, Canada, 18+ at the time of entry. No purchase necessary. A skill-testing question is required upon winner selection. See full terms and conditions for details.
      </div>
    </footer>
  );
}

Object.assign(window, { MarqueeV2, WhyCertifiedV2, HowToWinV2, FAQV2, FinalCTAV2, FooterV2, Tilt3DCard });
