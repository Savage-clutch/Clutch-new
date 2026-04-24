// WhyCertified — dark stats section (vehicle details now in hero)
const { useState: useStateS, useRef: useRefS } = React;

function TiltCard({ children, style }) {
  const ref = useRefS(null);
  const [tilt, setTilt] = useStateS({ rx: 0, ry: 0, s: 1 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setTilt({ rx: (0.5 - y) * 6, ry: (x - 0.5) * 8, s: 1.015 });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0, s: 1 });
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{
        transform: `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`,
        transition: 'transform .2s ease', willChange: 'transform',
        ...style,
      }}>
      {children}
    </div>
  );
}

function WhyCertified() {
  const stats = [
    { n: '70,000', suffix: '+', label: 'Vehicles inspected' },
    { n: '210',    suffix: '',  label: 'Inspection points — no exceptions' },
    { n: '23',     suffix: '',  label: 'Certified mechanics per vehicle' },
    { n: '3',      suffix: '×', label: 'Mechanic-led road tests' },
  ];
  return (
    <section className="dark grid-bg" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Chrome 3D wordmark — centered hero banner at top */}
        <div style={{ maxWidth: 900, margin: '0 auto 56px', position: 'relative' }}>
          <img src="assets/clutch-certified-chrome-v2.png" alt="Clutch Certified"
               style={{
                 width: '100%', display: 'block', margin: '0 auto',
                 filter: 'drop-shadow(0 40px 60px rgba(0,0,0,.5))',
               }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 60, marginBottom: 48 }}>
          <div style={{ maxWidth: 820 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>What is Clutch Certified?</div>
            <p style={{
              margin: 0,
              fontSize: 20, lineHeight: 1.5, color: 'rgba(255,255,255,.82)',
              fontWeight: 400, letterSpacing: '-0.005em',
              textWrap: 'pretty',
            }}>
              Every vehicle is inspected, serviced, detailed, and certified in person by a Clutch mechanic — so you know exactly what you're getting.
            </p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {stats.map((s, i) => (
            <TiltCard key={i}>
              <div style={{
                background: '#161619', borderRadius: 16, padding: 28, height: '100%',
                border: '1px solid rgba(255,255,255,.06)',
              }}>
                <div style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' }}>
                  {s.n}<span style={{ color: 'var(--coral)' }}>{s.suffix}</span>
                </div>
                <div style={{ marginTop: 14, fontSize: 14, color: 'rgba(255,255,255,.7)' }}>{s.label}</div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

window.WhyCertified = WhyCertified;
window.TiltCard = TiltCard;

// ─── How To Win — overview of the 3 entry steps ─────────────────────────────
function HowToWin({ onStepClick }) {
  const [expanded, setExpanded] = useStateS(null);
  const steps = [
    {
      n: 1, pts: '5', ptsLabel: 'POINTS',
      title: 'Name and email',
      desc: 'Drop your name, email, and social handle to officially enter.',
      detail: 'Takes about 10 seconds. This is the only step required to be eligible — skip 2 & 3 if you want, but every point helps your odds.',
      icon: 'assets/icon-picker.png',
      tag: 'Required',
      duration: '~10 sec',
    },
    {
      n: 2, pts: '100', ptsLabel: 'PTS / VEHICLE',
      title: 'Get a vehicle offer',
      desc: 'Get a free instant cash offer on any car you own. Unlimited entries.',
      detail: 'Submit as many vehicles as you own — no limit. Zero obligation to sell. Each submission adds 100 points to your tally. Takes about 1 minute per vehicle.',
      icon: 'assets/icon-coins.png',
      tag: 'Optional',
      duration: '~1 min',
    },
    {
      n: 3, pts: '30', ptsLabel: 'PTS MAX',
      title: 'Get social',
      desc: 'Comment on 3 Clutch ads — something interesting, funny, or quirky.',
      detail: 'We\'ll show you 3 Clutch ads. Leave a comment on each with a quirk about your car. 10 points per comment, max 30. Post from the handle you registered in Step 1.',
      icon: 'assets/icon-bomb.png',
      tag: 'Optional',
      duration: '~1 min',
    },
  ];
  return (
    <section style={{ padding: '100px 0 96px' }}>
      <div className="container">
        <div className="center" style={{ marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>How to Win</div>
          <h2 className="h-display" style={{ maxWidth: 880, margin: '0 auto 18px', textWrap: 'balance' }}>
            Three steps. Up to 135 points. One shot at the X5.
          </h2>
          <p className="lede">
            Only Step 1 is required to be eligible. The more you stack, the better your odds.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, alignItems: 'stretch' }}>
          {steps.map((s, i) => {
            const isOpen = expanded === s.n;
            return (
              <TiltCard key={s.n}>
                <div style={{
                  background: 'white', borderRadius: 20,
                  padding: s.n === 2 ? '38px 28px' : 28,
                  minHeight: s.n === 2 ? 340 : 300,
                  border: s.n === 2 ? '1.5px solid rgba(0,0,0,.22)' : isOpen ? '1.5px solid var(--ink)' : '1px solid rgba(0,0,0,.06)',
                  boxShadow: s.n === 2
                    ? '0 28px 60px -24px rgba(0,0,0,.22), 0 4px 14px -4px rgba(0,0,0,.08)'
                    : isOpen ? '0 20px 50px -20px rgba(0,0,0,.15)' : '0 8px 24px -12px rgba(0,0,0,.08)',
                  transform: s.n === 2 ? 'translateY(-10px)' : 'none',
                  position: 'relative', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                  transition: 'border-color .25s ease, box-shadow .25s ease, transform .25s ease',
                  height: '100%',
                }}>
                  {/* Header row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      background: 'var(--ink)',
                      color: 'white', fontWeight: 900, fontSize: 14,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{s.n}</div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      {s.n === 1 && (
                        <span style={{
                          fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase',
                          padding: '3px 8px', borderRadius: 999,
                          background: 'rgba(255,70,76,.1)',
                          color: 'var(--coral)',
                        }}>{s.tag}</span>
                      )}
                      <span style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 600 }}>{s.n === 1 ? '· ' : ''}{s.duration}</span>
                    </div>
                  </div>

                  {/* Points — hero number */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 8, marginBottom: 14, marginRight: 80 }}>
                    <span style={{ fontSize: 56, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em' }}>{s.pts}</span>
                    <span style={{ fontSize: 10, color: 'var(--ink-700)', fontWeight: 800, letterSpacing: '.1em' }}>{s.ptsLabel}</span>
                  </div>

                  <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.01em' }}>{s.title}</div>

                  {/* Spacer to push footer action to bottom */}
                  <div style={{ flex: 1 }} />

                  {/* Footer action */}
                  <div style={{
                    paddingTop: 14, borderTop: '1px dashed rgba(0,0,0,1)',
                    display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                  }}>
                    <button onClick={() => onStepClick?.(s.n)} style={{
                      background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                      fontSize: 13, fontWeight: 800, color: 'rgb(124,124,124)',
                      display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'inherit',
                      justifyContent: 'center',
                    }}>
                      Jump to Step {s.n}
                    </button>
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.HowToWin = HowToWin;

// ─── FAQ — accordion section ────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useStateS(0);
  const items = [
    {
      q: "Who's eligible to enter?",
      a: "Legal residents of Ontario, Canada, aged 18 or older at the time of entry. One entry per person. Employees of Clutch Technologies Inc. and their immediate family are not eligible.",
    },
    {
      q: "Is there a purchase required?",
      a: "No purchase necessary. Step 1 — the official contest entry — is completely free. Steps 2 and 3 are optional bonus-point actions, also free.",
    },
    {
      q: "How are bonus points tracked in Step 3?",
      a: "We match your Instagram or TikTok handle (registered in Step 1) against comments posted on the 3 Clutch ads. Comments must be posted from that same handle to count.",
    },
    {
      q: "Do I have to sell my car to get a Step 2 offer?",
      a: "Absolutely not. The instant cash offer is free and has zero obligation. You get 100 points whether or not you accept the offer.",
    },
    {
      q: "When is the winner announced?",
      a: "One winner will be drawn within 14 days of the contest closing. The winner must answer a skill-testing question to claim the prize.",
    },
    {
      q: "What if I don't want the car — can I take cash?",
      a: "The prize is specifically the Clutch Certified 2024 BMW X5. It cannot be substituted for cash equivalent, but the winner is free to resell the vehicle after claiming it.",
    },
  ];
  return (
    <section id="faq" style={{ padding: '100px 0', background: 'var(--ink-150)', position: 'relative', overflow: 'hidden' }}>

      <div className="container" style={{ maxWidth: 820, position: 'relative', zIndex: 2 }}>
        <div className="center" style={{ marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 14 }}>Questions?</div>
          <h2 className="h-display" style={{ textWrap: 'balance' }}>
            Everything you need to know.
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} style={{
                background: 'white', borderRadius: 16,
                border: isOpen ? '1.5px solid var(--coral)' : '1px solid rgba(0,0,0,.06)',
                overflow: 'hidden',
                boxShadow: isOpen ? '0 14px 40px -20px rgba(255,70,76,.3)' : '0 2px 8px -4px rgba(0,0,0,.06)',
                transition: 'border-color .2s ease, box-shadow .2s ease',
              }}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                  width: '100%', padding: '20px 24px', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between', gap: 16,
                  background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                  textAlign: 'left',
                }}>
                  <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.005em' }}>
                    {it.q}
                  </span>
                  <span style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: isOpen ? 'var(--coral)' : 'var(--ink-150)',
                    color: isOpen ? 'white' : 'var(--ink)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    transition: 'transform .3s ease, background .2s ease, color .2s ease',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </span>
                </button>
                <div style={{
                  maxHeight: isOpen ? 220 : 0, overflow: 'hidden',
                  transition: 'max-height .35s ease',
                }}>
                  <div style={{
                    padding: '0 24px 22px', fontSize: 15, color: 'var(--ink-700)',
                    lineHeight: 1.65,
                  }}>{it.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

window.FAQ = FAQ;

// ─── Google Reviews — social proof carousel ────────────────────────────────
function GoogleReviews() {
  const reviews = [
    {
      name: 'Sarah M.',
      loc: 'Toronto, ON',
      rating: 5,
      body: "Honestly the easiest car-buying experience I've ever had. Delivered right to my driveway, inspection report in hand, no dealership games.",
    },
    {
      name: 'Daniel K.',
      loc: 'Mississauga, ON',
      rating: 5,
      body: "Got an instant offer in literally under a minute. Showed up 2 days later, cheque in hand, took the car. Painless.",
    },
    {
      name: 'Priya R.',
      loc: 'Ottawa, ON',
      rating: 5,
      body: "210-point inspection is not a gimmick — my BMW came spotless, serviced, and I've had zero issues 8 months in.",
    },
    {
      name: 'Marc L.',
      loc: 'Hamilton, ON',
      rating: 5,
      body: "The 10-day return policy sealed it for me. I knew if anything was off I could just send it back. Didn't need to.",
    },
    {
      name: 'Jenna T.',
      loc: 'London, ON',
      rating: 5,
      body: "My first online car purchase and I was nervous. Clutch walked me through every step. Would 100% do it again.",
    },
    {
      name: 'Andre P.',
      loc: 'Kitchener, ON',
      rating: 5,
      body: "Sold them my Civic, bought a 4Runner from them in the same week. Both transactions — no hassle, no pressure.",
    },
  ];

  return (
    <section style={{ padding: '56px 0 48px', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        {/* Compact header row — eyebrow + rating chip inline */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16, marginBottom: 20,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <GoogleG size={22} />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>4.8</span>
              <Stars rating={4.8} size={13} />
              <span style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 600 }}>
                · 3,400+ Google reviews from happy Canadian drivers
              </span>
            </div>
          </div>
          <a href="https://www.google.com/search?q=clutch.ca+reviews" target="_blank" rel="noopener"
             style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-700)', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,.2)', paddingBottom: 2 }}>
            Read all reviews
          </a>
        </div>
      </div>
    </section>
  );
}

function GoogleG({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

function Stars({ rating, size = 14 }) {
  return (
    <div style={{ display: 'inline-flex', gap: 2 }}>
      {[0, 1, 2, 3, 4].map(i => {
        const fill = rating >= i + 1 ? 1 : rating > i ? rating - i : 0;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`star-${i}-${size}-${rating}`} x1="0" x2="1" y1="0" y2="0">
                <stop offset={`${fill * 100}%`} stopColor="#FBBC05" />
                <stop offset={`${fill * 100}%`} stopColor="#E5E5E5" />
              </linearGradient>
            </defs>
            <path d="M12 2l2.9 6.6L22 9.5l-5.2 5 1.4 7.3L12 18.3 5.8 21.8l1.4-7.3L2 9.5l7.1-.9L12 2z"
                  fill={`url(#star-${i}-${size}-${rating})`} />
          </svg>
        );
      })}
    </div>
  );
}

window.GoogleReviews = GoogleReviews;
