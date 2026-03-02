import { ChevronDown, Flame, Zap } from 'lucide-react';

/** Looping shooting animation: boy fires 1→2→3 bullet bursts */
function ShootingAnimation() {
  // Total cycle: 3.6s
  // Burst 1 (1 bullet):  0s–1.2s
  // Burst 2 (2 bullets): 1.2s–2.4s
  // Burst 3 (3 bullets): 2.4s–3.6s
  //
  // Boy group: translate(1, 5) scale(0.18)
  // Arm group transformOrigin: 34px 24px (boy-local)
  // Muzzle tip in boy-local coords: x=88, y=22
  // Muzzle in SVG viewBox coords (no arm rotation): x = 1 + 88*0.18 = ~16.84, y = 5 + 22*0.18 = ~8.96
  //
  // Bullets spawn at x=15 (slightly before muzzle tip in SVG coords) and travel RIGHT (+X)
  // Aim/crosshair is placed OUTSIDE the arm group (fixed position, not affected by recoil)

  return (
    <span
      aria-hidden="true"
      style={{
        display: 'block',
        width: '100%',
        height: '34px',
        overflow: 'visible',
        position: 'relative',
        marginTop: '4px',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        /* ── Boy idle bob ── */
        @keyframes boy-idle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }

        /* ── Arm recoil on each burst ── */
        @keyframes boy-shoot {
          0%,   30%, 33%,  63%, 66%,  96%, 100% { transform: rotate(0deg); }
          3%,  10% { transform: rotate(-4deg) translateY(1px); }
          36%, 43% { transform: rotate(-4deg) translateY(1px); }
          69%, 76% { transform: rotate(-4deg) translateY(1px); }
        }

        /* ── Muzzle flash: fires 3 times per cycle ── */
        @keyframes muzzle-flash {
          0%,  2%,  12%, 33%, 35%, 45%, 66%, 68%, 78%, 100% { opacity: 0; transform: scale(0.3); }
          5%,  9%  { opacity: 1; transform: scale(1); }
          38%, 42% { opacity: 1; transform: scale(1); }
          71%, 75% { opacity: 1; transform: scale(1); }
        }

        /* ── Smoke: 3 puffs ── */
        @keyframes gun-smoke {
          0%,  2%,  18%, 33%, 35%, 51%, 66%, 68%, 84%, 100% { opacity: 0; transform: translateX(0) scale(0.2); }
          8%  { opacity: 0.5; transform: translateX(2px) scale(0.7); }
          15% { opacity: 0; transform: translateX(5px) scale(1.2); }
          41% { opacity: 0.5; transform: translateX(2px) scale(0.7); }
          48% { opacity: 0; transform: translateX(5px) scale(1.2); }
          74% { opacity: 0.5; transform: translateX(2px) scale(0.7); }
          81% { opacity: 0; transform: translateX(5px) scale(1.2); }
        }

        /* ── Aim crosshair pulse ── */
        @keyframes aim-pulse {
          0%, 100% { opacity: 0.85; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }

        /* ══ BURST 1 — single bullet (fires in first 33% of 3.6s cycle) ══ */
        @keyframes bullet-b1 {
          0%    { transform: translateX(0px);   opacity: 0; }
          3%    { transform: translateX(0px);   opacity: 1; }
          28%   { transform: translateX(150px); opacity: 1; }
          32%   { transform: translateX(155px); opacity: 0; }
          33%, 100% { transform: translateX(0px); opacity: 0; }
        }

        /* ══ BURST 2 — two bullets (fires in 33%–66%) ══ */
        @keyframes bullet-b2a {
          0%,  33%  { transform: translateX(0px);   opacity: 0; }
          36%  { transform: translateX(0px);   opacity: 1; }
          61%  { transform: translateX(150px); opacity: 1; }
          65%  { transform: translateX(155px); opacity: 0; }
          66%, 100% { transform: translateX(0px); opacity: 0; }
        }
        @keyframes bullet-b2b {
          0%,  33%  { transform: translateX(0px);   opacity: 0; }
          37%  { transform: translateX(0px);   opacity: 1; }
          62%  { transform: translateX(150px); opacity: 1; }
          66%  { transform: translateX(155px); opacity: 0; }
          67%, 100% { transform: translateX(0px); opacity: 0; }
        }

        /* ══ BURST 3 — three bullets (fires in 66%–100%) ══ */
        @keyframes bullet-b3a {
          0%,  66%  { transform: translateX(0px);   opacity: 0; }
          69%  { transform: translateX(0px);   opacity: 1; }
          94%  { transform: translateX(150px); opacity: 1; }
          98%  { transform: translateX(155px); opacity: 0; }
          99%, 100% { transform: translateX(0px); opacity: 0; }
        }
        @keyframes bullet-b3b {
          0%,  66%  { transform: translateX(0px);   opacity: 0; }
          70%  { transform: translateX(0px);   opacity: 1; }
          95%  { transform: translateX(150px); opacity: 1; }
          99%  { transform: translateX(155px); opacity: 0; }
          100% { transform: translateX(0px); opacity: 0; }
        }
        @keyframes bullet-b3c {
          0%,  66%  { transform: translateX(0px);   opacity: 0; }
          71%  { transform: translateX(0px);   opacity: 1; }
          96%  { transform: translateX(150px); opacity: 1; }
          99.5%{ transform: translateX(155px); opacity: 0; }
          100% { transform: translateX(0px); opacity: 0; }
        }

        /* ── Target hit shake ── */
        @keyframes target-hit {
          0%,  28%, 61%, 94%, 100% { transform: translateX(0px) rotate(0deg); }
          30% { transform: translateX(-2px) rotate(-3deg); }
          32% { transform: translateX(2px) rotate(2deg); }
          34% { transform: translateX(0px) rotate(0deg); }
          63% { transform: translateX(-2px) rotate(-3deg); }
          65% { transform: translateX(2px) rotate(2deg); }
          67% { transform: translateX(0px) rotate(0deg); }
          96% { transform: translateX(-2px) rotate(-3deg); }
          98% { transform: translateX(2px) rotate(2deg); }
        }

        /* ── Hit flash ── */
        @keyframes hit-flash {
          0%,  27%, 33%, 60%, 66%, 93%, 99%, 100% { opacity: 0; }
          30%, 31% { opacity: 1; }
          63%, 64% { opacity: 1; }
          96%, 97% { opacity: 1; }
        }

        /* ── Sparks ── */
        @keyframes spark-1 {
          0%,  27%, 35%, 60%, 68%, 93%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          30% { opacity: 1; transform: translate(-4px,-5px) scale(1); }
          34% { opacity: 0; transform: translate(-6px,-8px) scale(0.3); }
          63% { opacity: 1; transform: translate(-4px,-5px) scale(1); }
          67% { opacity: 0; transform: translate(-6px,-8px) scale(0.3); }
          96% { opacity: 1; transform: translate(-4px,-5px) scale(1); }
          99% { opacity: 0; transform: translate(-6px,-8px) scale(0.3); }
        }
        @keyframes spark-2 {
          0%,  27%, 35%, 60%, 68%, 93%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          30% { opacity: 1; transform: translate(4px,-4px) scale(1); }
          34% { opacity: 0; transform: translate(6px,-7px) scale(0.3); }
          63% { opacity: 1; transform: translate(4px,-4px) scale(1); }
          67% { opacity: 0; transform: translate(6px,-7px) scale(0.3); }
          96% { opacity: 1; transform: translate(4px,-4px) scale(1); }
          99% { opacity: 0; transform: translate(6px,-7px) scale(0.3); }
        }
        @keyframes spark-3 {
          0%,  27%, 35%, 60%, 68%, 93%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          30% { opacity: 1; transform: translate(0px,-6px) scale(1); }
          34% { opacity: 0; transform: translate(0px,-10px) scale(0.3); }
          63% { opacity: 1; transform: translate(0px,-6px) scale(1); }
          67% { opacity: 0; transform: translate(0px,-10px) scale(0.3); }
          96% { opacity: 1; transform: translate(0px,-6px) scale(1); }
          99% { opacity: 0; transform: translate(0px,-10px) scale(0.3); }
        }

        /* ── BANG pop ── */
        @keyframes bang-pop {
          0%,  27%, 35%, 60%, 68%, 93%, 100% { opacity: 0; transform: scale(0.5); }
          30%, 32% { opacity: 1; transform: scale(1); }
          63%, 65% { opacity: 1; transform: scale(1); }
          96%, 98% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <svg
        width="100%"
        height="34"
        viewBox="0 0 220 34"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* ══════════════════════════════════════════════════════ */}
        {/*  BOY — smaller scale (0.18x), facing RIGHT            */}
        {/* ══════════════════════════════════════════════════════ */}
        <g
          transform="translate(1, 5) scale(0.18)"
          style={{ animation: 'boy-idle 1.2s ease-in-out infinite' }}
        >
          {/* Shadow */}
          <ellipse cx="26" cy="44" rx="10" ry="2" fill="#000" opacity="0.18" />

          {/* Legs */}
          <rect x="20" y="32" width="5" height="10" rx="2" fill="#2563EB" />
          <rect x="27" y="32" width="5" height="10" rx="2" fill="#2563EB" />
          {/* Shoes */}
          <ellipse cx="22" cy="42" rx="4" ry="2" fill="#111" />
          <ellipse cx="30" cy="42" rx="4" ry="2" fill="#111" />

          {/* Body / Torso */}
          <rect x="18" y="20" width="16" height="14" rx="3" fill="#EF4444" />
          {/* Belt */}
          <rect x="18" y="30" width="16" height="3" rx="1" fill="#92400E" />

          {/* Head */}
          <circle cx="26" cy="13" r="8" fill="#FBBF24" />
          {/* Hair */}
          <ellipse cx="26" cy="6" rx="8" ry="4" fill="#111" />
          <rect x="18" y="6" width="16" height="5" rx="2" fill="#111" />
          {/* Eyes — right-facing */}
          <circle cx="25" cy="13" r="1.5" fill="#111" />
          <circle cx="30" cy="13" r="1.5" fill="#111" />
          <circle cx="25.6" cy="12.4" r="0.5" fill="white" />
          <circle cx="30.6" cy="12.4" r="0.5" fill="white" />
          {/* Nose */}
          <circle cx="31" cy="15" r="1" fill="#E8A020" />
          {/* Smile */}
          <path d="M26 17 Q29 18.5 32 17" stroke="#92400E" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Right ear */}
          <circle cx="34" cy="13" r="2.2" fill="#FBBF24" />
          {/* Left ear */}
          <circle cx="18" cy="13" r="1.5" fill="#E8A020" />

          {/* ── ARMS + AK/SMG STYLE RIFLE ── */}
          {/* transformOrigin at shoulder/grip area */}
          <g style={{ transformOrigin: '34px 24px', animation: 'boy-shoot 3.6s ease-in-out infinite' }}>
            {/* Upper arms */}
            <rect x="34" y="20" width="10" height="4" rx="2" fill="#FBBF24" />
            <rect x="34" y="25" width="10" height="4" rx="2" fill="#FBBF24" />
            {/* Hands */}
            <circle cx="45" cy="22" r="3" fill="#FBBF24" />
            <circle cx="45" cy="27" r="3" fill="#FBBF24" />

            {/* ══ AK/SMG STYLE GUN — shorter barrel, no scope ══ */}

            {/* Buttstock — AK-style folding/solid stock */}
            <path d="M36 20 L44 20 L44 27 L41 27 Q37 27 36 24 Z" fill="#8B4513" />
            <path d="M36 20 L44 20 L44 22 L36 22 Z" fill="#7A3B10" />
            {/* Stock detail line */}
            <line x1="38" y1="20" x2="38" y2="27" stroke="#6B3010" strokeWidth="0.6" />

            {/* Pistol grip — angled downward */}
            <path d="M46 24 L49 24 L50 31 Q48 33 46 31 Z" fill="#4A2810" />
            <rect x="46" y="24" width="3" height="2" rx="0.3" fill="#3A1E08" />

            {/* Lower receiver */}
            <rect x="44" y="20" width="18" height="7" rx="1" fill="#2D2D2D" />
            {/* Upper receiver */}
            <rect x="44" y="18" width="18" height="3" rx="0.5" fill="#1A1A1A" />

            {/* Ejection port */}
            <rect x="54" y="20.5" width="4" height="2" rx="0.3" fill="#111" opacity="0.8" />
            {/* Charging handle — AK style, on right side */}
            <rect x="60" y="18.5" width="2" height="2" rx="0.3" fill="#555" />
            <circle cx="61" cy="18.5" r="1" fill="#444" />

            {/* ── AK-style curved magazine (prominent) ── */}
            <path d="M47 27 L54 27 L56 38 Q52 41 49 38 Z" fill="#1A1A1A" />
            {/* Magazine highlight */}
            <path d="M48 27 L53 27 L54.5 35 Q52 37 50 35 Z" fill="#252525" />
            {/* Magazine base plate */}
            <rect x="49" y="38" width="6" height="1.5" rx="0.5" fill="#333" />
            {/* Magazine curve detail */}
            <path d="M47.5 27 L53.5 27" stroke="#444" strokeWidth="0.5" />

            {/* Trigger guard */}
            <path d="M47 27 Q49 31 53 27" stroke="#333" strokeWidth="1.2" fill="none" />
            {/* Trigger */}
            <line x1="50" y1="27" x2="50.5" y2="30" stroke="#555" strokeWidth="0.9" />

            {/* Handguard — shorter, AK-style wood/polymer */}
            <rect x="62" y="20" width="12" height="6" rx="0.5" fill="#8B4513" />
            {/* Handguard wood grain lines */}
            <line x1="64" y1="20" x2="64" y2="26" stroke="#7A3B10" strokeWidth="0.5" />
            <line x1="67" y1="20" x2="67" y2="26" stroke="#7A3B10" strokeWidth="0.5" />
            <line x1="70" y1="20" x2="70" y2="26" stroke="#7A3B10" strokeWidth="0.5" />
            {/* Handguard top rail */}
            <rect x="62" y="18" width="12" height="2" rx="0.3" fill="#222" />

            {/* Gas tube above barrel */}
            <rect x="62" y="17" width="12" height="1.5" rx="0.5" fill="#333" />

            {/* Barrel — shorter than sniper, SMG/AK length */}
            {/* Barrel ends at x=88 (muzzle tip) */}
            <rect x="74" y="21" width="14" height="3" rx="0.5" fill="#111" />

            {/* Muzzle device / compensator */}
            <rect x="85" y="20.5" width="3" height="4" rx="0.3" fill="#222" />
            {/* Muzzle slots */}
            <line x1="86" y1="20.5" x2="86" y2="24.5" stroke="#444" strokeWidth="0.5" />
            <line x1="87.5" y1="20.5" x2="87.5" y2="24.5" stroke="#444" strokeWidth="0.5" />

            {/* Front sight post — AK style */}
            <rect x="73" y="17.5" width="2" height="3" rx="0.2" fill="#1A1A1A" />
            <rect x="73.5" y="16.5" width="1" height="1.5" rx="0.2" fill="#333" />

            {/* Rear sight — AK style notch */}
            <rect x="58" y="16.5" width="4" height="2" rx="0.3" fill="#1A1A1A" />
            <rect x="59.5" y="16.5" width="1" height="1.5" rx="0.2" fill="#444" />

            {/* Sling attachment point */}
            <ellipse cx="40" cy="27" rx="1.5" ry="1" fill="none" stroke="#7C4A1E" strokeWidth="0.8" />

            {/* ── Muzzle flash — at SMG barrel tip (x=88, y=22 in boy-local) ── */}
            <g style={{ transformOrigin: '88px 22px', animation: 'muzzle-flash 3.6s ease-in-out infinite' }}>
              <polygon points="88,22 97,17 93,22 97,27 88,22" fill="#FFD700" />
              <polygon points="88,22 100,22 95,18 100,22 95,26 88,22" fill="#FF8C00" opacity="0.85" />
              <circle cx="88" cy="22" r="4" fill="#FFFDE7" opacity="0.75" />
              <polygon points="88,22 96,15 92,22" fill="#FFF176" opacity="0.9" />
              <polygon points="88,22 96,29 92,22" fill="#FFF176" opacity="0.9" />
            </g>

            {/* Gun smoke — at muzzle tip */}
            <circle
              cx="88"
              cy="22"
              r="2.5"
              fill="#9CA3AF"
              style={{ animation: 'gun-smoke 3.6s ease-in-out infinite' }}
            />
          </g>

          {/* ── AIM / CROSSHAIR — fixed position at muzzle tip in boy-local coords ── */}
          {/* Placed OUTSIDE the arm group so it stays fixed and does NOT follow recoil */}
          <g
            style={{
              transformOrigin: '88px 22px',
              animation: 'aim-pulse 1.2s ease-in-out infinite',
            }}
          >
            {/* Outer ring */}
            <circle cx="88" cy="22" r="7" fill="none" stroke="#FF0000" strokeWidth="1.2" opacity="0.9" />
            {/* Inner dot */}
            <circle cx="88" cy="22" r="1.2" fill="#FF0000" opacity="0.95" />
            {/* Cross lines */}
            <line x1="88" y1="13" x2="88" y2="17" stroke="#FF0000" strokeWidth="1.2" opacity="0.9" />
            <line x1="88" y1="27" x2="88" y2="31" stroke="#FF0000" strokeWidth="1.2" opacity="0.9" />
            <line x1="79" y1="22" x2="83" y2="22" stroke="#FF0000" strokeWidth="1.2" opacity="0.9" />
            <line x1="93" y1="22" x2="97" y2="22" stroke="#FF0000" strokeWidth="1.2" opacity="0.9" />
          </g>
        </g>

        {/* ══════════════════════════════════════════════════════ */}
        {/*  BULLETS — 1→2→3 burst sequence                      */}
        {/*  Muzzle tip in SVG coords (no arm rotation):         */}
        {/*    x = 1 + 88*0.18 = ~16.84 ≈ 17                    */}
        {/*    y = 5 + 22*0.18 = ~8.96  ≈ 9                     */}
        {/*  Bullets start at x=15 and travel RIGHT              */}
        {/*  Bullet shape: casing x=15..19, body cx=21, tip cx=25*/}
        {/* ══════════════════════════════════════════════════════ */}

        {/* BURST 1 — single bullet */}
        <g style={{ animation: 'bullet-b1 3.6s linear infinite' }}>
          {/* Bullet casing (rear, at muzzle) */}
          <rect x="15" y="7.8" width="4" height="2.4" rx="0.4" fill="#92400E" />
          {/* Bullet body */}
          <ellipse cx="21" cy="9" rx="4" ry="1.5" fill="#D97706" />
          {/* Bullet tip (front, lighter) */}
          <ellipse cx="25" cy="9" rx="2.5" ry="1.2" fill="#F59E0B" />
          {/* Tracer trail (behind casing) */}
          <line x1="10" y1="8.5" x2="15" y2="8.5" stroke="#FFD700" strokeWidth="0.9" opacity="0.7" />
          <line x1="10" y1="9.5" x2="15" y2="9.5" stroke="#FFD700" strokeWidth="0.6" opacity="0.4" />
        </g>

        {/* BURST 2 — bullet A (slightly above center) */}
        <g style={{ animation: 'bullet-b2a 3.6s linear infinite' }}>
          <rect x="15" y="6.3" width="4" height="2.4" rx="0.4" fill="#92400E" />
          <ellipse cx="21" cy="7.5" rx="4" ry="1.5" fill="#D97706" />
          <ellipse cx="25" cy="7.5" rx="2.5" ry="1.2" fill="#F59E0B" />
          <line x1="10" y1="7" x2="15" y2="7" stroke="#FFD700" strokeWidth="0.9" opacity="0.7" />
          <line x1="10" y1="8" x2="15" y2="8" stroke="#FFD700" strokeWidth="0.6" opacity="0.4" />
        </g>
        {/* BURST 2 — bullet B (slightly below center) */}
        <g style={{ animation: 'bullet-b2b 3.6s linear infinite' }}>
          <rect x="15" y="9.3" width="4" height="2.4" rx="0.4" fill="#92400E" />
          <ellipse cx="21" cy="10.5" rx="4" ry="1.5" fill="#D97706" />
          <ellipse cx="25" cy="10.5" rx="2.5" ry="1.2" fill="#F59E0B" />
          <line x1="10" y1="10" x2="15" y2="10" stroke="#FFD700" strokeWidth="0.9" opacity="0.7" />
          <line x1="10" y1="11" x2="15" y2="11" stroke="#FFD700" strokeWidth="0.6" opacity="0.4" />
        </g>

        {/* BURST 3 — bullet A */}
        <g style={{ animation: 'bullet-b3a 3.6s linear infinite' }}>
          <rect x="15" y="6.3" width="4" height="2.4" rx="0.4" fill="#92400E" />
          <ellipse cx="21" cy="7.5" rx="4" ry="1.5" fill="#D97706" />
          <ellipse cx="25" cy="7.5" rx="2.5" ry="1.2" fill="#F59E0B" />
          <line x1="10" y1="7" x2="15" y2="7" stroke="#FFD700" strokeWidth="0.9" opacity="0.7" />
          <line x1="10" y1="8" x2="15" y2="8" stroke="#FFD700" strokeWidth="0.6" opacity="0.4" />
        </g>
        {/* BURST 3 — bullet B */}
        <g style={{ animation: 'bullet-b3b 3.6s linear infinite' }}>
          <rect x="15" y="7.8" width="4" height="2.4" rx="0.4" fill="#92400E" />
          <ellipse cx="21" cy="9" rx="4" ry="1.5" fill="#D97706" />
          <ellipse cx="25" cy="9" rx="2.5" ry="1.2" fill="#F59E0B" />
          <line x1="10" y1="8.5" x2="15" y2="8.5" stroke="#FFD700" strokeWidth="0.9" opacity="0.7" />
          <line x1="10" y1="9.5" x2="15" y2="9.5" stroke="#FFD700" strokeWidth="0.6" opacity="0.4" />
        </g>
        {/* BURST 3 — bullet C */}
        <g style={{ animation: 'bullet-b3c 3.6s linear infinite' }}>
          <rect x="15" y="9.3" width="4" height="2.4" rx="0.4" fill="#92400E" />
          <ellipse cx="21" cy="10.5" rx="4" ry="1.5" fill="#D97706" />
          <ellipse cx="25" cy="10.5" rx="2.5" ry="1.2" fill="#F59E0B" />
          <line x1="10" y1="10" x2="15" y2="10" stroke="#FFD700" strokeWidth="0.9" opacity="0.7" />
          <line x1="10" y1="11" x2="15" y2="11" stroke="#FFD700" strokeWidth="0.6" opacity="0.4" />
        </g>

        {/* ══════════════════════════════════════════════════════ */}
        {/*  TARGET — right side, gets hit on each burst          */}
        {/* ══════════════════════════════════════════════════════ */}
        <g
          transform="translate(185, 5)"
          style={{ animation: 'target-hit 3.6s ease-in-out infinite' }}
        >
          {/* Target board */}
          <rect x="0" y="0" width="18" height="22" rx="1" fill="#1A1A1A" stroke="#333" strokeWidth="0.5" />
          {/* Target rings */}
          <circle cx="9" cy="11" r="8" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.6" />
          <circle cx="9" cy="11" r="5" fill="none" stroke="#EF4444" strokeWidth="1" opacity="0.8" />
          <circle cx="9" cy="11" r="2.5" fill="#EF4444" opacity="0.9" />
          {/* Bullseye center */}
          <circle cx="9" cy="11" r="1" fill="#FFFDE7" />
          {/* Stand */}
          <rect x="7.5" y="22" width="3" height="5" rx="0.5" fill="#333" />
          <rect x="4" y="27" width="10" height="1.5" rx="0.5" fill="#333" />

          {/* Hit flash overlay */}
          <rect
            x="0" y="0" width="18" height="22" rx="1"
            fill="#FF4444"
            style={{ animation: 'hit-flash 3.6s ease-in-out infinite' }}
          />

          {/* Sparks */}
          <g style={{ transformOrigin: '9px 11px', animation: 'spark-1 3.6s ease-in-out infinite' }}>
            <line x1="9" y1="11" x2="9" y2="8" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '9px 11px', animation: 'spark-2 3.6s ease-in-out infinite' }}>
            <line x1="9" y1="11" x2="12" y2="11" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
          </g>
          <g style={{ transformOrigin: '9px 11px', animation: 'spark-3 3.6s ease-in-out infinite' }}>
            <line x1="9" y1="11" x2="6" y2="8" stroke="#FF8C00" strokeWidth="1.2" strokeLinecap="round" />
          </g>

          {/* BANG text pop */}
          <text
            x="9" y="4"
            textAnchor="middle"
            fontSize="5"
            fontWeight="bold"
            fill="#FFD700"
            style={{ animation: 'bang-pop 3.6s ease-in-out infinite' }}
          >
            BANG!
          </text>
        </g>

        {/* ══════════════════════════════════════════════════════ */}
        {/*  SCORE / HIT COUNTER — top right                     */}
        {/* ══════════════════════════════════════════════════════ */}
        <g transform="translate(170, 1)">
          <text
            x="0" y="5"
            fontSize="4"
            fill="#9CA3AF"
            fontFamily="monospace"
            opacity="0.7"
          >
            SCORE
          </text>
          <text
            x="0" y="10"
            fontSize="5.5"
            fill="#FFD700"
            fontFamily="monospace"
            fontWeight="bold"
            style={{ animation: 'hit-flash 3.6s ease-in-out infinite' }}
          >
            +100
          </text>
        </g>
      </svg>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/95" />
        {/* Red vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.1_0.008_20/0.7)_100%)]" />
      </div>

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.55 0.22 25) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.55 0.22 25) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto pt-24 pb-16">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-primary/40 bg-primary/10 text-xs font-heading tracking-widest uppercase text-primary">
          <Flame size={12} />
          <span>Legend X Esports</span>
          <Flame size={12} />
        </div>

        {/* Main title */}
        <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-none mb-4 glow-red-text">
          <span className="text-foreground">LEGEND</span>
          <span className="text-primary"> X</span>
        </h1>

        {/* Tagline */}
        <p className="font-heading text-lg sm:text-xl md:text-2xl text-muted-foreground mb-2 tracking-wide max-w-2xl">
          Pakistan's Premier Esports Organization
        </p>
        <p className="font-heading text-sm sm:text-base text-secondary/80 mb-8 tracking-widest uppercase">
          <Zap size={14} className="inline mr-1 text-secondary" />
          Compete · Dominate · Conquer
          <Zap size={14} className="inline ml-1 text-secondary" />
        </p>

        {/* Shooting animation */}
        <ShootingAnimation />

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <a href="#roster" className="btn-primary">
            <Flame size={16} />
            Meet the Team
          </a>
          <a href="#news" className="btn-outline">
            Latest News
          </a>
        </div>

        {/* Stats row */}
        <div className="flex gap-8 sm:gap-16 mt-12 pt-8 border-t border-border/40">
          {[
            { label: 'Players', value: '10+' },
            { label: 'Tournaments', value: '50+' },
            { label: 'Wins', value: '200+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl text-primary glow-red-text">{stat.value}</div>
              <div className="font-heading text-xs text-muted-foreground tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <span className="font-heading text-xs tracking-widest uppercase text-muted-foreground">Scroll</span>
        <ChevronDown size={20} className="text-primary animate-bounce" />
      </div>
    </section>
  );
}
