// Enter section — 3 equal-weight, full-width stacked cards. Each has entry mechanics inline.
const { useState: useStateF, useEffect: useEffectF } = React;

function EnterSection({ formRef }) {
  // Step 1 state
  const [name, setName] = useStateF('');
  const [email, setEmail] = useStateF('');
  const [handle, setHandle] = useStateF('');
  const [submitted, setSubmitted] = useStateF(false);
  const [confetti, setConfetti] = useStateF([]);

  // Step 2 state — form input only (we can't verify completion across tabs)
  const [plate, setPlate] = useStateF('');
  const [postal, setPostal] = useStateF('');
  const [vinMode, setVinMode] = useStateF(false);
  const [step2Visited, setStep2Visited] = useStateF(false);

  // Step 3 state — tracks which ads the user has *visited* (opened), not verified
  const [visitedAds, setVisitedAds] = useStateF([false, false, false]);

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const pieces = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: 50 + (Math.random() - 0.5) * 90,
      vx: (Math.random() - 0.5) * 340,
      vy: -Math.random() * 380 - 160,
      color: ['#FF464C', '#FFBA1E', '#60BE02', '#4866D0', '#272727'][i % 5],
      rot: Math.random() * 360,
      dur: 3 + Math.random() * 1.8,        // 3–4.8s per piece
      delay: Math.random() * 0.6,          // staggered release
      shape: i % 3,                         // 0: rect, 1: circle, 2: thin strip
      size: 8 + Math.random() * 8,
    }));
    setConfetti(pieces);
    setSubmitted(true);
  };

  // After Step 1 submits, gently nudge the user to Step 2 once the celebration plays.
  useEffectF(() => {
    if (!submitted) return;
    const t = setTimeout(() => {
      const el = document.getElementById('step-2');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 4200);
    return () => clearTimeout(t);
  }, [submitted]);

  const startOffer = () => {
    if (!plate.trim() || !postal.trim()) return;
    setStep2Visited(true);
    // In production this opens the STC flow in a new tab.
    window.open('#', '_blank', 'noopener');
  };

  const visitAd = (i) => {
    setVisitedAds(c => c.map((v, idx) => idx === i ? true : v));
    window.open('#', '_blank', 'noopener');
  };

  const step1Done = submitted;
  // Locked-in points: only Step 1 is verifiable on this page
  const lockedPts = step1Done ? 5 : 0;
  // Potential headroom remaining
  const potentialMax = step1Done ? 130 : 135;

  return (
    <section ref={formRef} style={{ background: 'var(--ink-150)', position: 'relative', overflow: 'hidden', padding: '20px 0 100px' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: 1000 }}>
        <div className="center" style={{ marginBottom: 48 }}>

          {/* Points progress — locked-in vs. headroom remaining */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 14, marginTop: 28,
            padding: '10px 18px 10px 14px', background: 'white', borderRadius: 999,
            boxShadow: '0 6px 24px -8px rgba(0,0,0,.12)', border: '1px solid rgba(0,0,0,.05)',
          }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <StepPip done={step1Done} n={1} />
              <StepPip active={step1Done && step2Visited} n={2} />
              <StepPip active={step1Done && visitedAds.some(Boolean)} n={3} />
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-700)', fontWeight: 600 }}>
              {step1Done ? (
                <>Locked in: <strong style={{ color: 'var(--coral)', fontWeight: 900, fontSize: 16 }}>{lockedPts} pts</strong>
                  <span style={{ color: 'var(--ink-500)', fontWeight: 500 }}> · up to {potentialMax} more available</span></>
              ) : (
                <>Points available: <strong style={{ color: 'var(--coral)', fontWeight: 900, fontSize: 16 }}>135</strong></>
              )}
            </div>
          </div>
        </div>

        {/* STACK of 3 equal-weight cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* ─── STEP 1 ─── */}
          <StepCard
            step={1} duration="~10 seconds" title="Official contest entry"
            pts="5" ptsLabel="POINTS"
            required
            complete={step1Done}
            icon="assets/icon-picker.webp"
            iconRotate={-8}
          >
            {!submitted ? (
              <>
                <div style={{ display: 'inline-block', padding: '6px 14px', border: '1.5px solid var(--coral)', borderRadius: 999, color: 'var(--coral)', fontSize: 11, fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 28 }}>
                  Required
                </div>

                <form onSubmit={submit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <Field label="First name" value={name} setValue={setName} placeholder="Alex" />
                    <Field label="Email address" value={email} setValue={setEmail} placeholder="you@email.com" type="email" />
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <Field label="Social handle — optional" value={handle} setValue={setHandle} placeholder="@yourhandle (Instagram or TikTok)" />
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-700)', marginBottom: 20 }}>
                    Only needed if you want bonus points in Step 3. Leave blank if you don't use Instagram or TikTok.
                  </div>

                  <button className="btn btn-primary" type="submit" style={{ fontSize: 17, padding: '16px 30px' }}>
                    Enter contest
                  </button>
                  <div style={{ marginTop: 14, fontSize: 12, color: 'var(--ink-700)' }}>
                    By entering you agree to the <a href="#" style={{ color: 'var(--coral)', textDecoration: 'underline' }}>contest terms and conditions</a>. No purchase necessary.
                  </div>
                </form>
              </>
            ) : (
              <SuccessState name={name} confetti={confetti} />
            )}
          </StepCard>

          {/* ─── Momentum connector between Step 1 & Step 2 ─── */}
          {step1Done && <StepConnector label="Next: stack up to 100 more points" />}

          {/* ─── STEP 2 ─── */}
          <StepCard
            step={2} duration="~1 min per vehicle" title="Get a vehicle offer"
            pts="100" ptsLabel="PTS / VEHICLE"
            highlighted
            dimmed={!step1Done}
            nextUp={step1Done && !step2Visited}
            icon="assets/icon-coins.webp"
            iconRotate={10}
          >
            {!step1Done ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: 'var(--ink-150)', borderRadius: 10 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--ink-500)', flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <span style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 600 }}>Complete Step 1 to unlock</span>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 15, color: 'var(--ink-700)', lineHeight: 1.6, marginBottom: 22 }}>
                  Get a <strong style={{ color: 'var(--ink)' }}>free, no-obligation instant cash offer</strong> for any vehicle you own. It takes about <strong style={{ color: 'var(--ink)' }}>1 minute</strong> — earn <strong style={{ color: 'var(--ink)' }}>100 points for every vehicle</strong>. Submit as many as you like.¹
                </div>
                <div style={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr', position: 'relative', background: 'var(--ink-150)', borderRadius: 999, padding: 4, marginBottom: 14, fontSize: 12, fontWeight: 700 }}>
                  {/* sliding pill — 100% = one column width */}
                  <div style={{
                    position: 'absolute', top: 4, bottom: 4,
                    left: 4, width: 'calc(50% - 4px)',
                    borderRadius: 999,
                    background: 'white',
                    boxShadow: '0 2px 8px -2px rgba(0,0,0,.12)',
                    transform: vinMode ? 'translateX(100%)' : 'translateX(0)',
                    transition: 'transform .28s cubic-bezier(0.16,1,0.3,1)',
                    pointerEvents: 'none',
                  }} />
                  <button onClick={() => setVinMode(false)} style={{ position: 'relative', zIndex: 1, padding: '7px 18px', border: 'none', cursor: 'pointer', background: 'transparent', color: !vinMode ? 'var(--ink)' : 'var(--ink-500)', fontFamily: 'inherit', letterSpacing: '.02em', transition: 'color .2s', whiteSpace: 'nowrap', textAlign: 'center' }}>Licence plate</button>
                  <button onClick={() => setVinMode(true)}  style={{ position: 'relative', zIndex: 1, padding: '7px 18px', border: 'none', cursor: 'pointer', background: 'transparent', color: vinMode  ? 'var(--ink)' : 'var(--ink-500)', fontFamily: 'inherit', letterSpacing: '.02em', transition: 'color .2s', whiteSpace: 'nowrap', textAlign: 'center' }}>VIN</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 12 }}>
                  <Field label={vinMode ? 'VIN' : 'Licence plate'} value={plate} setValue={setPlate} placeholder={vinMode ? 'e.g. 1HGCM82633A123456' : 'e.g. ABCD 123'} />
                  <Field label="Postal code" value={postal} setValue={setPostal} placeholder="e.g. M5V 2H1" />
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-700)', marginBottom: 18 }}>
                  Opens in a new tab — you won't lose your place here. Submit multiple vehicles to earn more points.
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                  <button className="btn btn-primary" onClick={startOffer} disabled={!plate.trim() || !postal.trim()} style={{ fontSize: 17, padding: '16px 30px', opacity: (!plate.trim() || !postal.trim()) ? 0.5 : 1 }}>
                    Start offer
                  </button>
                  {step2Visited && <div style={{ fontSize: 12, color: 'var(--ink-700)', fontWeight: 600, fontStyle: 'italic' }}>Opened in a new tab · Finish the offer there, then come back for Step 3.</div>}
                </div>
              </>
            )}
          </StepCard>

          {/* ─── Momentum connector between Step 2 & Step 3 ─── */}
          {step1Done && <StepConnector label="Almost there — 30 more points in reach" />}

          {/* ─── STEP 3 ─── */}
          <StepCard
            step={3} duration="~1 minute" title="Get social"
            pts="30" ptsLabel="PTS MAX"
            dimmed={!step1Done}
            nextUp={step1Done && step2Visited && !visitedAds.some(Boolean)}
            icon="assets/icon-bomb.webp"
            iconRotate={-10}
          >
            {!step1Done ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px', background: 'var(--ink-150)', borderRadius: 10 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: 'var(--ink-500)', flexShrink: 0 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <span style={{ fontSize: 13, color: 'var(--ink-500)', fontWeight: 600 }}>Complete Step 1 to unlock</span>
              </div>
            ) : (
              <>
                <div style={{ fontSize: 15, color: 'var(--ink-700)', lineHeight: 1.6, marginBottom: 22 }}>
                  Tap any of the 3 Clutch ads below. Leave a comment with something interesting or funny about your car. Earn <strong style={{ color: 'var(--ink)' }}>10 points per ad</strong> — up to <strong style={{ color: 'var(--ink)' }}>30 points total</strong>. Post from the same handle you used in Step 1.
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 16 }}>
                  {[0, 1, 2].map(i => (
                    <AdCard key={i} idx={i} visited={visitedAds[i]} disabled={false} onClick={() => visitAd(i)} />
                  ))}
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-700)' }}>
                  Max 1 comment per ad · 3 ads max · Must post from your registered handle.
                </div>
              </>
            )}
          </StepCard>
        </div>

        <div style={{ marginTop: 28, fontSize: 12, color: 'var(--ink-500)', textAlign: 'center' }}>
          ¹ Valid proof of vehicle ownership required from confirmed winner. See full <a href="#" style={{ color: 'var(--coral)', textDecoration: 'underline' }}>terms and conditions</a>.
        </div>
      </div>
    </section>
  );
}

// ─── Shared Step Card — equal weight, full width, consistent header ─────────
function StepCard({ step, duration, title, pts, ptsLabel, required, complete, highlighted, dimmed, nextUp, icon, iconRotate = 0, children }) {
  const borderColor = nextUp ? 'var(--coral)' : complete ? 'var(--green)' : highlighted ? 'rgba(0,0,0,.12)' : 'rgba(0,0,0,.06)';
  const borderWidth = (complete || highlighted || nextUp) ? 2 : 1;
  return (
    <div id={`step-${step}`} className="card step-card" style={{
      padding: 36, position: 'relative', overflow: 'hidden',
      border: `${borderWidth}px solid ${borderColor}`,
      boxShadow: nextUp ? '0 30px 60px -28px rgba(255,70,76,.45)' : highlighted && !complete ? '0 24px 50px -24px rgba(0,0,0,.15)' : undefined,
      transition: 'border-color .3s ease, box-shadow .3s ease, opacity .4s ease, filter .4s ease',
      scrollMarginTop: 24,
      opacity: dimmed ? 0.55 : 1,
      filter: dimmed ? 'saturate(.5)' : 'none',
      pointerEvents: dimmed ? 'none' : 'auto',
      animation: nextUp ? 'nextUpPulse 2.2s ease-in-out infinite' : 'none',
    }}>
      <style>{`
        @keyframes nextUpPulse {
          0%, 100% { box-shadow: 0 30px 60px -28px rgba(255,70,76,.45); }
          50% { box-shadow: 0 30px 60px -20px rgba(255,70,76,.65); }
        }
      `}</style>
      {/* 3D icon — top-right of card */}
      {icon && (
        <img src={icon} className="icon-3d" alt="" style={{
          position: 'absolute', top: -18, right: -18, width: 130,
          transform: `rotate(${iconRotate}deg)`,
          pointerEvents: 'none', zIndex: 1,
        }} />
      )}

      {/* Step header: eyebrow + duration on left, title + points on right row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, marginBottom: 0, position: 'relative', zIndex: 2 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <div style={{ color: 'var(--coral)', fontWeight: 800, fontSize: 12, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              Step {step}
            </div>
            {complete && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '2px 8px', background: 'var(--green)', color: 'white',
                borderRadius: 999, fontSize: 10, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
                Complete
              </div>
            )}
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.01em' }}>{title}</div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0, paddingRight: 80 }}>
          <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>{pts}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-700)', fontWeight: 700, letterSpacing: '.1em', marginTop: 4 }}>{ptsLabel}</div>
        </div>
      </div>
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}

// ─── Step Pip for progress dots ──────────────────────────────────────────────
// done = verified complete (Step 1 only). active = user has started/visited (Steps 2 & 3).
function StepPip({ done, active, n }) {
  const bg = done ? 'var(--green)' : active ? 'var(--coral)' : 'var(--ink-150)';
  const fg = (done || active) ? 'white' : 'var(--ink-500)';
  return (
    <div style={{
      width: 26, height: 26, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: bg, color: fg,
      fontSize: 12, fontWeight: 800,
      transition: 'background .3s ease, color .3s ease',
    }}>
      {done ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
      ) : n}
    </div>
  );
}

// ─── Momentum connector — arrow/hint shown between completed steps ────────────
function StepConnector({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
      padding: '2px 0',
      animation: 'connectorFade .5s ease both',
    }}>
      <div style={{ height: 1, flex: '0 1 80px', background: 'linear-gradient(to right, transparent, var(--coral))' }} />
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '6px 14px', borderRadius: 999,
        background: 'white', border: '1px dashed var(--coral)',
        color: 'var(--coral)', fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
        {label}
      </div>
      <div style={{ height: 1, flex: '0 1 80px', background: 'linear-gradient(to left, transparent, var(--coral))' }} />
      <style>{`@keyframes connectorFade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

// ─── Ad card for Step 3 ──────────────────────────────────────────────────────
function AdCard({ idx, visited, disabled, onClick }) {
  const creators = ['@creator_1', '@creator_2', '@creator_3'];
  return (
    <div onClick={onClick} className="ad-card" style={{
      border: visited ? '1.5px solid var(--coral)' : '1px solid rgba(0,0,0,.08)',
      borderRadius: 12, overflow: 'hidden', cursor: disabled ? 'default' : 'pointer',
      transition: 'transform .2s ease, border-color .2s ease',
      background: 'white',
    }}>
      {/* Placeholder ad image */}
      <div style={{
        aspectRatio: '1 / 1', background: 'var(--ink-150)', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute', top: 8, right: 8, padding: '3px 8px',
          background: 'white', borderRadius: 6, fontSize: 10, fontWeight: 700, color: 'var(--ink-700)',
          boxShadow: '0 1px 4px rgba(0,0,0,.08)',
        }}>
          Instagram
        </div>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,.2)" strokeWidth="1.5">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <circle cx="17" cy="8" r=".5" fill="rgba(0,0,0,.2)" />
        </svg>
        <div style={{
          position: 'absolute', bottom: 8, left: 8,
          padding: '3px 10px', background: 'var(--coral)', color: 'white',
          borderRadius: 999, fontSize: 11, fontWeight: 800,
        }}>
          +10 pts
        </div>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{creators[idx]} [TBD]</div>
        <div style={{ fontSize: 12, color: 'var(--coral)', fontWeight: 700 }}>
          {visited ? 'Open again' : 'Tap to comment'}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, setValue, placeholder, type = 'text' }) {
  const [focus, setFocus] = useStateF(false);
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontSize: 11, color: 'var(--ink-700)', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 8 }}>
        {label}
      </div>
      <input type={type} value={value} onChange={e => setValue(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} placeholder={placeholder}
        style={{
          width: '100%', padding: '14px 16px', borderRadius: 10,
          background: 'var(--ink-150)',
          border: focus ? '1.5px solid var(--ink)' : '1.5px solid transparent',
          outline: 'none', fontSize: 16, fontFamily: 'inherit',
          transition: 'border-color .15s ease', boxSizing: 'border-box',
        }} />
    </label>
  );
}

function SuccessState({ name, confetti }) {
  return (
    <div style={{ textAlign: 'center', padding: '12px 0 8px', position: 'relative', minHeight: 240 }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}>
        {confetti.map(p => {
          const isCircle = p.shape === 1;
          const isStrip  = p.shape === 2;
          const w = isStrip ? 3 : p.size;
          const h = isStrip ? p.size * 1.8 : p.size * 1.3;
          return (
            <span key={p.id} style={{
              position: 'absolute', left: `${p.x}%`, top: '35%',
              width: w, height: h, background: p.color,
              borderRadius: isCircle ? '50%' : 2,
              animation: `confetti-${p.id} ${p.dur}s cubic-bezier(.22,.7,.3,1) ${p.delay}s forwards`,
              transform: `rotate(${p.rot}deg)`,
              opacity: 0,
              boxShadow: isCircle ? `0 0 8px ${p.color}55` : 'none',
            }} />
          );
        })}
      </div>
      <style>{confetti.map(p => `
        @keyframes confetti-${p.id} {
          0%   { transform: translate(0,0) rotate(${p.rot}deg) scale(.6); opacity: 0; }
          8%   { opacity: 1; transform: translate(${p.vx * 0.15}px, ${p.vy * 0.25}px) rotate(${p.rot + 120}deg) scale(1); }
          55%  { opacity: 1; transform: translate(${p.vx * 0.7}px, ${p.vy + 80}px) rotate(${p.rot + 360}deg) scale(1); }
          85%  { opacity: .85; }
          100% { transform: translate(${p.vx}px, ${p.vy + 560}px) rotate(${p.rot + 720}deg) scale(.9); opacity: 0; }
        }
      `).join('')}</style>

      <div style={{
        width: 64, height: 64, margin: '0 auto 18px',
        background: 'linear-gradient(135deg, var(--green), #4aa800)',
        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 20px 40px -10px rgba(96,190,2,.45)',
        animation: 'popIn .6s cubic-bezier(.15,.8,.3,1) both',
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round">
          <path d="M5 12l5 5L20 7" />
        </svg>
      </div>
      <h3 style={{ fontSize: 24, fontWeight: 900, margin: 0, letterSpacing: '-0.02em' }}>
        You're in{name.trim() ? `, ${name.split(' ')[0]}` : ''}!
      </h3>
      <p style={{ fontSize: 14, color: 'var(--ink-700)', marginTop: 8, marginBottom: 0, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
        You earned <strong>5 points</strong>. Complete Steps 2 &amp; 3 below to stack up to <strong>130 more points</strong>.
      </p>
    </div>
  );
}

function FinalCTA({ onClick }) {
  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container-narrow center">
        <h2 className="h-display" style={{ marginBottom: 24 }}>
          Don't want to wait? Shop the full Clutch Certified lineup.
        </h2>
        <p className="lede" style={{ marginBottom: 28 }}>
          Hundreds of inspected, serviced, and certified vehicles — delivered to your door across Canada. Explore the full inventory on clutch.ca.
        </p>

        {/* Compact Google rating strip — social proof right above the browse CTA */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          marginBottom: 28, padding: '10px 16px',
          background: 'white', borderRadius: 999,
          border: '1px solid rgba(0,0,0,.08)',
          boxShadow: '0 6px 20px -8px rgba(0,0,0,.1)',
          flexWrap: 'wrap',
        }}>
          <GoogleG size={20} />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>4.8</span>
            <Stars rating={4.8} size={13} />
          </div>
          <span style={{ fontSize: 12, color: 'var(--ink-500)', fontWeight: 600 }}>
            · 3,400+ Google reviews from happy Canadian drivers
          </span>
          <a href="https://www.google.com/search?q=clutch.ca+reviews" target="_blank" rel="noopener"
             style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink)', textDecoration: 'none', borderBottom: '1px solid rgba(0,0,0,.25)', paddingBottom: 1, marginLeft: 4 }}>
            Read all
          </a>
        </div>

        <div>
          <a href="https://www.clutch.ca" target="_blank" rel="noopener" className="btn btn-primary" style={{ fontSize: 17, padding: '16px 30px', textDecoration: 'none' }}>
            Browse Clutch Certified
          </a>
        </div>
      </div>
    </section>
  );
}

function TermsAndConditions() {
  const sections = [
    {
      n: '1', title: 'Sponsor',
      body: 'This contest ("Giveaway") is sponsored by Clutch Technologies Inc. ("Clutch"), [address TBD], Ontario, Canada.',
    },
    {
      n: '2', title: 'Eligibility',
      body: (
        <>
          <p>Open to legal residents of the Province of Ontario, Canada who have reached the age of majority (18 years) at the time of entry.</p>
          <p>[Specific eligible regions or exclusion areas within Ontario TBD — confirm with legal counsel prior to launch.]</p>
          <p>Employees, officers, directors, contractors, and their immediate family members and household members of Clutch Technologies Inc. are not eligible to enter.</p>
          <p>Multiple individuals within the same household may each enter independently, provided each person is a unique eligible individual with a distinct email address and social media handle.</p>
          <p>Entrants must hold a valid, active social media account (Instagram or TikTok) to earn points under Steps 2 or 3.</p>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-500)' }}>⚠ Ontario note: This Giveaway requires no purchase to enter. The Competition Act (Canada) and Criminal Code s.206 permit free-entry prize contests. No purchase necessary and no skill requirement for entry (Step 1). A skill-testing question is required upon winner selection (see Section 5). Confirm final structure with legal counsel.</p>
        </>
      ),
    },
    {
      n: '3', title: 'Contest Period',
      body: 'The Giveaway opens on [START DATE TBD] and closes on [END DATE TBD] at 11:59 PM Eastern Time ("Contest Period"). The "days remaining" countdown displayed on the Giveaway page is calculated dynamically from the official start date and is for indicative purposes only. The official end date and time govern eligibility.',
    },
    {
      n: '4', title: 'How to enter & points',
      body: (
        <>
          <p><strong>Step 1 — Required (5 points):</strong> Complete the official online entry form with your first name, a valid email address, and a social media handle. This is the only mandatory step to be eligible. Completion of Step 1 constitutes your official contest profile, linked to your email address and social handle. Only one (1) entry per person.</p>
          <p><strong>Step 2 — Optional (100 points per vehicle):</strong> Submit a vehicle for a Clutch Sell-to-Clutch ("STC") instant cash offer using your licence plate number and postal code. Earn 100 points for each vehicle submitted. You may submit multiple vehicles you own during the Contest Period. See Section 7 for vehicle ownership verification requirements.</p>
          <p><strong>Step 3 — Optional (10 points per comment, maximum 30 points):</strong> Post a comment on a designated Clutch advertising post on Instagram or TikTok using your registered social media handle. Maximum one (1) comment per designated post. A maximum of three (3) designated posts are available, for a maximum of 30 points from this step. Comments must be original, authentic, and comply with the applicable platform's community guidelines.</p>
          <p>All points are linked to the entrant's confirmed profile (email + social handle). Points are non-transferable and have no monetary value.</p>
          <p>Clutch reserves the right to disqualify entries or points obtained through suspected fraud, automated systems, or any violation of these terms.</p>
        </>
      ),
    },
    {
      n: '5', title: 'Winner selection',
      body: (
        <>
          <p>One (1) winner will be selected by random draw, weighted proportionally by total accumulated points. A higher point total increases the probability of selection but does not guarantee winning.</p>
          <p>The draw will take place at Clutch's offices in Ontario within [X] business days of the Contest Period close.</p>
          <p>The potential winner will be notified via registered email address and/or social media handle within five (5) business days of the draw.</p>
          <p>As required under the Criminal Code of Canada, the potential winner must correctly answer a time-limited mathematical skill-testing question (administered by phone or email) as a condition of receiving the prize.</p>
          <p>If the potential winner does not respond within seven (7) calendar days of notification, or fails the skill-testing question, an alternate winner will be selected by the same method.</p>
        </>
      ),
    },
    {
      n: '6', title: 'Prize',
      body: (
        <>
          <p>One (1) grand prize: a Clutch Certified 2025 Audi Q7 (or a vehicle of equivalent or greater approximate retail value as confirmed by Clutch prior to launch). Approximate retail value: $50,000 CAD.</p>
          <p>The prize is non-transferable, non-exchangeable, and cannot be redeemed for cash or credit.</p>
          <p>The prize vehicle has passed Clutch's full 210-point inspection and reconditioning process.</p>
          <p>The winner is solely responsible for all applicable taxes (including HST), insurance, vehicle registration, licensing fees, and all other costs associated with accepting and owning the vehicle.</p>
          <p>Vehicle delivery is within Ontario, Canada. Delivery logistics will be coordinated directly with the confirmed winner.</p>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-500)' }}>⚠ Tax note: The approximate retail value of the prize (~$50,000 CAD) may be considered a taxable benefit. The winner should seek independent tax advice. Clutch will issue a T4A slip to the winner in accordance with CRA requirements if applicable.</p>
        </>
      ),
    },
    {
      n: '7', title: 'Vehicle offer verification (Step 2)',
      body: 'Any entrant who earns points through Step 2 (vehicle offer submissions) must, if selected as the potential winner, provide valid proof of ownership for each vehicle submitted — including the Ontario vehicle permit (ownership documents) and a valid driver\'s licence. Points attributed to vehicles for which ownership cannot be verified within seven (7) days of request will be removed from the winner\'s eligible total prior to prize award. Failure to provide adequate documentation will result in disqualification and selection of an alternate winner.',
    },
    {
      n: '8', title: 'Media release & consent',
      body: 'By entering, each participant agrees that if selected as the winner, they grant Clutch Technologies Inc. a perpetual, royalty-free, worldwide licence to use their name, likeness, photograph, video recording, voice, and social media handle for promotional, advertising, and marketing purposes in connection with this Giveaway and the Clutch Certified campaign, across all media including digital and social platforms, without further compensation. The winner agrees to participate in a vehicle delivery experience and related content creation — including photography, video production, and social media content — for Clutch\'s marketing and promotional use.',
    },
    {
      n: '9', title: 'General conditions',
      body: (
        <>
          <p>No purchase is necessary to enter or win. A purchase does not improve the chances of winning.</p>
          <p>Clutch reserves the right to cancel, modify, or suspend this Giveaway at any time if, in its sole discretion, fraud, technical failures, or other factors outside Clutch's control impair the integrity or proper functioning of the contest, subject to applicable law.</p>
          <p>All decisions made by Clutch in connection with this Giveaway are final and binding.</p>
          <p>This Giveaway is not affiliated with, sponsored, endorsed, or administered by Instagram, TikTok, Meta Platforms Inc., or any other third-party platform. Any questions should be directed to Clutch, not to any platform.</p>
          <p>This Giveaway is subject to all applicable federal and provincial laws of Canada and the Province of Ontario, including the Competition Act (R.S.C. 1985, c. C-34), the Consumer Protection Act, 2002 (Ontario), and all applicable regulations thereunder.</p>
          <p style={{ fontStyle: 'italic', color: 'var(--ink-500)' }}>⚠ AGCO note: Prizes valued above $50,000 CAD may require bonding under Ontario's Alcohol and Gaming Commission regulations. Confirm applicability with AGCO and/or legal counsel before contest launch.</p>
        </>
      ),
    },
    {
      n: '10', title: 'Privacy',
      body: 'Personal information collected through this Giveaway (name, email address, social handle) will be used solely for contest administration and, with the entrant\'s consent, for Clutch marketing communications. All data is handled in accordance with Clutch\'s Privacy policy at clutch.ca/privacy and in compliance with Canada\'s Personal Information Protection and Electronic Documents Act (PIPEDA) and Ontario\'s applicable privacy legislation.',
    },
  ];

  return (
    <section id="terms" style={{ padding: '64px 0 80px', background: 'var(--ink-150)', borderTop: '1px solid rgba(0,0,0,.06)' }}>
      <div className="container" style={{ maxWidth: 880 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--ink-500)', marginBottom: 8 }}>
            The fine print
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.01em', margin: 0, color: 'var(--ink)' }}>
            Contest terms &amp; conditions
          </h2>
          <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 6 }}>
            Version: [DATE TBD] · Jurisdiction: Ontario, Canada
          </div>
        </div>

        <div style={{ fontSize: 12, lineHeight: 1.7, color: 'var(--ink-700)' }}>
          {sections.map((s, i) => (
            <div key={s.n} style={{ marginBottom: 22 }}>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink)', margin: '0 0 6px', letterSpacing: '-0.005em' }}>
                {s.n}. {s.title}
              </h3>
              <div>
                {typeof s.body === 'string' ? <p style={{ margin: 0 }}>{s.body}</p> : s.body}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20, fontSize: 10.5, lineHeight: 1.6, color: 'var(--ink-500)' }}>
          These terms are a working draft and subject to review by legal counsel prior to contest launch. Bracketed items marked [TBD] will be finalized before the Giveaway opens. By entering, you acknowledge and agree to the final published version of these terms.
        </div>
      </div>
      <style>{`
        #terms p { margin: 0 0 8px; }
        #terms p:last-child { margin-bottom: 0; }
        #terms strong { color: var(--ink); font-weight: 700; }
      `}</style>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--black)', color: 'rgba(255,255,255,.6)', padding: '56px 0 40px' }}>
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
      <div className="container" style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.08)', fontSize: 12, color: 'rgba(255,255,255,.4)', lineHeight: 1.6 }}>
        Open to legal residents of Ontario, Canada, 18+ at the time of entry. No purchase necessary. A skill-testing question is required upon winner selection. See full terms and conditions for details.
      </div>
    </footer>
  );
}

window.EnterSection = EnterSection;
window.FinalCTA = FinalCTA;
window.TermsAndConditions = TermsAndConditions;
window.Footer = Footer;
