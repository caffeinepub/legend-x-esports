import { ChevronDown, Flame, Zap } from 'lucide-react';

/** Small looping cartoon shooting animation: boy on left shoots at target on right */
function ShootingAnimation() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'block',
        width: '100%',
        height: '52px',
        overflow: 'visible',
        position: 'relative',
        marginTop: '6px',
        pointerEvents: 'none',
      }}
    >
      <style>{`
        /* Boy arm recoil */
        @keyframes boy-shoot {
          0%, 60%, 100% { transform: rotate(0deg); }
          10%, 20% { transform: rotate(-6deg) translateY(-1px); }
        }
        /* Muzzle flash */
        @keyframes muzzle-flash {
          0%, 8%, 25%, 100% { opacity: 0; transform: scale(0.4); }
          12%, 18% { opacity: 1; transform: scale(1); }
        }
        /* Bullet travel — longer distance */
        @keyframes shoot-bullet {
          0%, 5% { transform: translateX(0px); opacity: 0; }
          8% { opacity: 1; transform: translateX(0px); }
          45% { opacity: 1; transform: translateX(130px); }
          50%, 100% { opacity: 0; transform: translateX(130px); }
        }
        /* Target shake on hit */
        @keyframes target-hit {
          0%, 40%, 100% { transform: translateX(0px) rotate(0deg); }
          52% { transform: translateX(-2px) rotate(-3deg); }
          56% { transform: translateX(2px) rotate(2deg); }
          60% { transform: translateX(-1px) rotate(-1deg); }
          64% { transform: translateX(1px) rotate(0.5deg); }
          68% { transform: translateX(0px) rotate(0deg); }
        }
        /* Hit flash on target */
        @keyframes hit-flash {
          0%, 40%, 65%, 100% { opacity: 0; }
          50%, 58% { opacity: 1; }
        }
        /* Stars/impact sparks */
        @keyframes spark-1 {
          0%, 40%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          52% { opacity: 1; transform: translate(-4px, -5px) scale(1); }
          65% { opacity: 0; transform: translate(-6px, -8px) scale(0.4); }
        }
        @keyframes spark-2 {
          0%, 40%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          52% { opacity: 1; transform: translate(4px, -4px) scale(1); }
          65% { opacity: 0; transform: translate(6px, -7px) scale(0.4); }
        }
        @keyframes spark-3 {
          0%, 40%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          52% { opacity: 1; transform: translate(0px, -6px) scale(1); }
          65% { opacity: 0; transform: translate(0px, -10px) scale(0.4); }
        }
        /* Boy body bob */
        @keyframes boy-idle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
        /* Smoke puff from gun */
        @keyframes gun-smoke {
          0%, 5%, 100% { opacity: 0; transform: translateX(0) scale(0.2); }
          20% { opacity: 0.6; transform: translateX(3px) scale(0.8); }
          40% { opacity: 0.25; transform: translateX(6px) scale(1.2); }
          55% { opacity: 0; transform: translateX(9px) scale(1.5); }
        }
        /* BANG text */
        @keyframes bang-pop {
          0%, 40%, 65%, 100% { opacity: 0; transform: scale(0.5); }
          50%, 58% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <svg
        width="100%"
        height="52"
        viewBox="0 0 220 52"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* ══════════════════════════════════════════════════════ */}
        {/*  CARTOON BOY — far left, smaller scale (~0.45x)       */}
        {/*  Reduced from 0.62 to 0.45 for a more compact look    */}
        {/* ══════════════════════════════════════════════════════ */}
        <g
          transform="translate(4, 8) scale(0.45)"
          style={{ animation: 'boy-idle 1.2s ease-in-out infinite' }}
        >
          {/* Shadow */}
          <ellipse cx="26" cy="43" rx="10" ry="2" fill="#000" opacity="0.2" />

          {/* Legs */}
          <rect x="20" y="32" width="5" height="10" rx="2" fill="#2563EB" />
          <rect x="27" y="32" width="5" height="10" rx="2" fill="#2563EB" />
          {/* Shoes */}
          <ellipse cx="22" cy="42" rx="4" ry="2" fill="#1a1a1a" />
          <ellipse cx="30" cy="42" rx="4" ry="2" fill="#1a1a1a" />

          {/* Body / Torso */}
          <rect x="18" y="20" width="16" height="14" rx="3" fill="#EF4444" />
          {/* Belt */}
          <rect x="18" y="30" width="16" height="3" rx="1" fill="#92400E" />

          {/* Head */}
          <circle cx="26" cy="13" r="8" fill="#FBBF24" />
          {/* Hair */}
          <ellipse cx="26" cy="6" rx="8" ry="4" fill="#1a1a1a" />
          <rect x="18" y="6" width="16" height="5" rx="2" fill="#1a1a1a" />
          {/* Eyes */}
          <circle cx="23" cy="13" r="1.5" fill="#1a1a1a" />
          <circle cx="29" cy="13" r="1.5" fill="#1a1a1a" />
          {/* Eye shine */}
          <circle cx="23.6" cy="12.4" r="0.5" fill="white" />
          <circle cx="29.6" cy="12.4" r="0.5" fill="white" />
          {/* Smile / determined face */}
          <path d="M23 16 Q26 17.5 29 16" stroke="#92400E" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Ear */}
          <circle cx="18" cy="13" r="2" fill="#FBBF24" />
          <circle cx="34" cy="13" r="2" fill="#FBBF24" />

          {/* ── TWO-HANDED SHOOTING POSE ── */}
          {/* Both arms extended forward holding the gun */}
          <g style={{ transformOrigin: '34px 24px', animation: 'boy-shoot 1.6s ease-in-out infinite' }}>
            {/* Upper arm (right) */}
            <rect x="34" y="20" width="9" height="4" rx="2" fill="#FBBF24" />
            {/* Upper arm (left / second hand) — slightly below */}
            <rect x="34" y="25" width="9" height="4" rx="2" fill="#FBBF24" />

            {/* Right hand */}
            <circle cx="44" cy="22" r="3" fill="#FBBF24" />
            {/* Left hand (second hand on gun) */}
            <circle cx="44" cy="27" r="3" fill="#FBBF24" />

            {/* Gun body */}
            <rect x="42" y="19" width="13" height="6" rx="1.5" fill="#374151" />
            {/* Gun barrel */}
            <rect x="53" y="20.5" width="9" height="3" rx="1" fill="#1F2937" />
            {/* Gun grip */}
            <rect x="44" y="24" width="5" height="5" rx="1" fill="#1F2937" />
            {/* Gun trigger guard */}
            <path d="M46 25 Q48 28 50 25" stroke="#374151" strokeWidth="1" fill="none" />
            {/* Second hand grip wrap on barrel */}
            <rect x="48" y="19" width="5" height="6" rx="1" fill="#FBBF24" opacity="0.7" />

            {/* Muzzle flash */}
            <g style={{ transformOrigin: '62px 22px', animation: 'muzzle-flash 1.6s ease-in-out infinite' }}>
              <polygon points="62,22 67,18.5 65,22 67,25.5 62,22" fill="#FFD700" />
              <polygon points="62,22 69,22 65,19.5 69,22 65,24.5 62,22" fill="#FF8C00" opacity="0.8" />
            </g>

            {/* Gun smoke */}
            <circle
              cx="62"
              cy="22"
              r="2.5"
              fill="#9CA3AF"
              style={{ animation: 'gun-smoke 1.6s ease-in-out infinite' }}
            />
          </g>
        </g>

        {/* ══════════════════════════════════════════════════════ */}
        {/*  FLYING BULLET — starts near gun muzzle (~x=46)       */}
        {/*  travels across the long gap to the board (~x=176)    */}
        {/* ══════════════════════════════════════════════════════ */}
        <g style={{ animation: 'shoot-bullet 1.6s ease-in-out infinite' }}>
          {/* Bullet body */}
          <ellipse cx="50" cy="26" rx="4" ry="2" fill="#D97706" />
          {/* Bullet tip */}
          <ellipse cx="54" cy="26" rx="2.5" ry="1.5" fill="#F59E0B" />
          {/* Bullet casing */}
          <rect x="46" y="24.5" width="4" height="3" rx="0.5" fill="#92400E" />
          {/* Speed lines */}
          <line x1="40" y1="25" x2="45" y2="25" stroke="#FFD700" strokeWidth="0.8" opacity="0.6" />
          <line x1="40" y1="27" x2="45" y2="27" stroke="#FFD700" strokeWidth="0.8" opacity="0.4" />
        </g>

        {/* ══════════════════════════════════════════════════════ */}
        {/*  TARGET BOARD — right side, SMALLER board             */}
        {/*  Reduced from 46×50 to 32×36, repositioned            */}
        {/* ══════════════════════════════════════════════════════ */}
        <g style={{ transformOrigin: '196px 26px', animation: 'target-hit 1.6s ease-in-out infinite' }}>
          {/* Board post */}
          <rect x="194" y="40" width="3" height="11" rx="1" fill="#92400E" />
          {/* Board base */}
          <rect x="189" y="49" width="10" height="2.5" rx="1" fill="#78350F" />

          {/* Board background — smaller: width 32, height 36 */}
          <rect x="180" y="8" width="32" height="36" rx="2.5" fill="#F5F5DC" stroke="#92400E" strokeWidth="1.5" />

          {/* Bullseye rings — centered in smaller board */}
          <circle cx="196" cy="26" r="13" fill="#EF4444" />
          <circle cx="196" cy="26" r="9" fill="white" />
          <circle cx="196" cy="26" r="6" fill="#EF4444" />
          <circle cx="196" cy="26" r="3.5" fill="white" />
          {/* Bullseye center */}
          <circle cx="196" cy="26" r="1.8" fill="#EF4444" />

          {/* Crosshair lines */}
          <line x1="196" y1="10" x2="196" y2="42" stroke="#374151" strokeWidth="0.5" opacity="0.35" />
          <line x1="182" y1="26" x2="210" y2="26" stroke="#374151" strokeWidth="0.5" opacity="0.35" />

          {/* Hit flash overlay */}
          <circle
            cx="196"
            cy="26"
            r="13"
            fill="#FFD700"
            style={{ animation: 'hit-flash 1.6s ease-in-out infinite' }}
          />

          {/* Impact sparks */}
          <g style={{ transformOrigin: '196px 26px' }}>
            <polygon
              points="196,26 194,20 196,22 198,20"
              fill="#FFD700"
              style={{ animation: 'spark-1 1.6s ease-in-out infinite' }}
            />
            <polygon
              points="196,26 202,22 199,24 202,20"
              fill="#FF8C00"
              style={{ animation: 'spark-2 1.6s ease-in-out infinite' }}
            />
            <polygon
              points="196,26 193,21 196,19 199,21"
              fill="#EF4444"
              style={{ animation: 'spark-3 1.6s ease-in-out infinite' }}
            />
          </g>

          {/* Bullet hole */}
          <circle
            cx="196"
            cy="26"
            r="1.2"
            fill="#1a1a1a"
            style={{ animation: 'hit-flash 1.6s ease-in-out infinite' }}
          />

          {/* "BANG!" text pop */}
          <text
            x="196"
            y="5"
            textAnchor="middle"
            fontSize="5"
            fontWeight="bold"
            fontFamily="'Bebas Neue', sans-serif"
            fill="#FFD700"
            stroke="#1a1a1a"
            strokeWidth="0.4"
            style={{ animation: 'bang-pop 1.6s ease-in-out infinite', transformOrigin: '196px 5px' }}
          >
            BANG!
          </text>
        </g>

        {/* ══════════════════════════════════════════════════════ */}
        {/*  GROUND LINE                                          */}
        {/* ══════════════════════════════════════════════════════ */}
        <line x1="4" y1="51" x2="216" y2="51" stroke="#374151" strokeWidth="0.8" opacity="0.25" />
      </svg>
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/assets/quality_restoration_20260224213607352.jpg"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center center', width: '100%', height: '100%' }}
        />
      </div>

      {/* Primary dark overlay */}
      <div className="absolute inset-0 bg-esports-dark/75" />

      {/* Bottom fade to dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-esports-dark/40 to-esports-dark" />

      {/* Red cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-esports-dark/60 via-transparent to-esports-dark/60" />

      {/* Red accent glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-esports-red/25 via-transparent to-transparent" />

      {/* Diagonal accent lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-0 w-full h-px opacity-20"
          style={{ background: 'linear-gradient(90deg, transparent, oklch(0.55 0.22 25), transparent)' }}
        />
        <div
          className="absolute top-2/3 left-0 w-full h-px opacity-10"
          style={{ background: 'linear-gradient(90deg, transparent, oklch(0.82 0.18 85), transparent)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 border border-esports-red/40 bg-esports-red/10 text-esports-red font-heading text-xs tracking-widest uppercase">
          <Zap size={12} className="animate-pulse-glow" />
          Professional Esports Tournament's App
        </div>

        {/* Main Title */}
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none mb-4 tracking-wider">
          <span className="block text-foreground">LEGEND</span>
          <span className="block text-esports-red glow-red-text">X</span>
          <span className="block text-foreground">ESPORTS</span>
        </h1>

        {/* Tagline */}
        <p className="font-heading text-lg sm:text-xl md:text-2xl text-esports-gray-light tracking-widest uppercase mb-2 mt-4">
          Dominate. Compete. <span className="text-esports-gold">Conquer.</span>
        </p>
        <p className="font-body text-sm sm:text-base text-esports-gray max-w-xl mx-auto mb-10">
          Elite competitive gaming at the highest level. We train champions, build legends, and redefine what's possible in esports.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#roster" className="btn-primary text-sm">
            How to Meet the Legend
          </a>

          {/* Unique Fire Button */}
          <a
            href="#about"
            className="fire-btn group relative inline-flex items-center gap-2 px-7 py-3 font-heading tracking-widest uppercase font-bold text-esports-dark overflow-hidden"
            style={{ clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)' }}
          >
            {/* Animated gradient background */}
            <span
              className="absolute inset-0 animate-fire-shift"
              style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 35%, #EF4444 65%, #FFD700 100%)',
                backgroundSize: '200% 200%',
              }}
            />
            {/* Shimmer sweep overlay */}
            <span className="absolute inset-0 animate-shimmer-sweep opacity-40"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)',
                backgroundSize: '200% 100%',
              }}
            />
            {/* Outer glow ring */}
            <span className="absolute inset-0 animate-fire-ring rounded-none"
              style={{
                boxShadow: '0 0 0 2px #FFD700, 0 0 18px 4px #FF4500, 0 0 40px 8px rgba(255,69,0,0.35)',
              }}
            />
            {/* Content */}
            <span className="relative z-10 flex flex-col items-center gap-0 w-full">
              <span className="flex items-center gap-2">
                <Flame
                  size={20}
                  className="animate-flame-flicker"
                  style={{ filter: 'drop-shadow(0 0 4px #FF4500)' }}
                />
                <span
                  className="text-xl sm:text-2xl font-extrabold"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.6)', letterSpacing: '0.08em' }}
                >
                  JOIN NOW FOR TOURNAMENT
                </span>
                <Flame
                  size={20}
                  className="animate-flame-flicker"
                  style={{ filter: 'drop-shadow(0 0 4px #FF4500)', animationDelay: '0.3s' }}
                />
              </span>
              {/* Cartoon shooting animation below the text */}
              <ShootingAnimation />
            </span>
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: '5+', label: 'Active Players' },
            { value: '3+', label: 'Tournaments' },
            { value: '2026', label: 'Founded' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl sm:text-4xl text-esports-red">{stat.value}</div>
              <div className="font-heading text-xs tracking-widest uppercase text-esports-gray mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-esports-gray hover:text-esports-red transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
