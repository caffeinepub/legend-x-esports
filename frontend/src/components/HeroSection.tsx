import { ChevronDown, Flame, Zap } from 'lucide-react';

/** Small looping cartoon shooting animation: boy on left shoots at target on right */
function ShootingAnimation() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'block',
        width: '100%',
        height: '44px',
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
          10%, 20% { transform: rotate(-8deg) translateY(-1px); }
        }
        /* Muzzle flash */
        @keyframes muzzle-flash {
          0%, 8%, 25%, 100% { opacity: 0; transform: scale(0.5); }
          12%, 18% { opacity: 1; transform: scale(1); }
        }
        /* Bullet travel */
        @keyframes shoot-bullet {
          0%, 5% { transform: translateX(0px); opacity: 0; }
          8% { opacity: 1; transform: translateX(0px); }
          45% { opacity: 1; transform: translateX(62px); }
          50%, 100% { opacity: 0; transform: translateX(62px); }
        }
        /* Target shake on hit */
        @keyframes target-hit {
          0%, 40%, 100% { transform: translateX(0px) rotate(0deg); }
          52% { transform: translateX(-3px) rotate(-4deg); }
          56% { transform: translateX(3px) rotate(3deg); }
          60% { transform: translateX(-2px) rotate(-2deg); }
          64% { transform: translateX(2px) rotate(1deg); }
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
          52% { opacity: 1; transform: translate(-5px, -6px) scale(1); }
          65% { opacity: 0; transform: translate(-8px, -10px) scale(0.5); }
        }
        @keyframes spark-2 {
          0%, 40%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          52% { opacity: 1; transform: translate(5px, -5px) scale(1); }
          65% { opacity: 0; transform: translate(8px, -9px) scale(0.5); }
        }
        @keyframes spark-3 {
          0%, 40%, 100% { opacity: 0; transform: translate(0,0) scale(0); }
          52% { opacity: 1; transform: translate(0px, -7px) scale(1); }
          65% { opacity: 0; transform: translate(0px, -12px) scale(0.5); }
        }
        /* Boy body bob */
        @keyframes boy-idle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }
        /* Smoke puff from gun */
        @keyframes gun-smoke {
          0%, 5%, 100% { opacity: 0; transform: translateX(0) scale(0.3); }
          20% { opacity: 0.7; transform: translateX(4px) scale(1); }
          40% { opacity: 0.3; transform: translateX(8px) scale(1.4); }
          55% { opacity: 0; transform: translateX(12px) scale(1.8); }
        }
      `}</style>

      <svg
        width="100%"
        height="44"
        viewBox="0 0 160 44"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', overflow: 'visible' }}
      >
        {/* ══════════════════════════════════════════ */}
        {/*  CARTOON BOY — left side (x≈10–42)        */}
        {/* ══════════════════════════════════════════ */}
        <g style={{ animation: 'boy-idle 1.2s ease-in-out infinite' }}>
          {/* Shadow */}
          <ellipse cx="26" cy="43" rx="10" ry="2" fill="#000" opacity="0.25" />

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
          {/* Smile */}
          <path d="M23 16 Q26 18.5 29 16" stroke="#92400E" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Ear */}
          <circle cx="18" cy="13" r="2" fill="#FBBF24" />
          <circle cx="34" cy="13" r="2" fill="#FBBF24" />

          {/* Shooting arm (right arm extended forward) */}
          <g style={{ transformOrigin: '34px 24px', animation: 'boy-shoot 1.6s ease-in-out infinite' }}>
            {/* Upper arm */}
            <rect x="34" y="21" width="8" height="4" rx="2" fill="#FBBF24" />
            {/* Hand */}
            <circle cx="44" cy="23" r="3" fill="#FBBF24" />
            {/* Gun */}
            <rect x="42" y="20" width="12" height="5" rx="1.5" fill="#374151" />
            {/* Gun barrel */}
            <rect x="52" y="21" width="8" height="3" rx="1" fill="#1F2937" />
            {/* Gun grip */}
            <rect x="44" y="24" width="5" height="4" rx="1" fill="#1F2937" />
            {/* Gun trigger guard */}
            <path d="M46 25 Q48 28 50 25" stroke="#374151" strokeWidth="1" fill="none" />

            {/* Muzzle flash */}
            <g style={{ transformOrigin: '60px 22.5px', animation: 'muzzle-flash 1.6s ease-in-out infinite' }}>
              <polygon points="60,22.5 65,19 63,22.5 65,26 60,22.5" fill="#FFD700" />
              <polygon points="60,22.5 67,22.5 63,20 67,22.5 63,25 60,22.5" fill="#FF8C00" opacity="0.8" />
            </g>

            {/* Gun smoke */}
            <circle
              cx="60"
              cy="22"
              r="3"
              fill="#9CA3AF"
              style={{ animation: 'gun-smoke 1.6s ease-in-out infinite' }}
            />
          </g>

          {/* Left arm (down) */}
          <rect x="10" y="21" width="8" height="4" rx="2" fill="#FBBF24" />
          <circle cx="9" cy="23" r="3" fill="#FBBF24" />
        </g>

        {/* ══════════════════════════════════════════ */}
        {/*  FLYING BULLET                            */}
        {/* ══════════════════════════════════════════ */}
        <g style={{ animation: 'shoot-bullet 1.6s ease-in-out infinite' }}>
          {/* Bullet body */}
          <ellipse cx="68" cy="22.5" rx="5" ry="2.5" fill="#D97706" />
          {/* Bullet tip */}
          <ellipse cx="73" cy="22.5" rx="3" ry="2" fill="#F59E0B" />
          {/* Bullet casing */}
          <rect x="63" y="21" width="5" height="3" rx="0.5" fill="#92400E" />
          {/* Speed lines */}
          <line x1="55" y1="21" x2="62" y2="21" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
          <line x1="55" y1="24" x2="62" y2="24" stroke="#FFD700" strokeWidth="1" opacity="0.4" />
        </g>

        {/* ══════════════════════════════════════════ */}
        {/*  TARGET BOARD — right side (x≈110–155)   */}
        {/* ══════════════════════════════════════════ */}
        <g style={{ transformOrigin: '133px 22px', animation: 'target-hit 1.6s ease-in-out infinite' }}>
          {/* Board post */}
          <rect x="131" y="30" width="4" height="13" rx="1" fill="#92400E" />
          {/* Board base */}
          <rect x="126" y="41" width="14" height="3" rx="1" fill="#78350F" />

          {/* Board background */}
          <rect x="112" y="6" width="42" height="36" rx="3" fill="#F5F5DC" stroke="#92400E" strokeWidth="2" />

          {/* Bullseye rings — outermost to innermost */}
          <circle cx="133" cy="24" r="16" fill="#EF4444" />
          <circle cx="133" cy="24" r="12" fill="white" />
          <circle cx="133" cy="24" r="8" fill="#EF4444" />
          <circle cx="133" cy="24" r="4" fill="white" />
          {/* Bullseye center */}
          <circle cx="133" cy="24" r="2" fill="#EF4444" />

          {/* Crosshair lines */}
          <line x1="133" y1="8" x2="133" y2="40" stroke="#374151" strokeWidth="0.5" opacity="0.4" />
          <line x1="117" y1="24" x2="149" y2="24" stroke="#374151" strokeWidth="0.5" opacity="0.4" />

          {/* Hit flash overlay */}
          <circle
            cx="133"
            cy="24"
            r="16"
            fill="#FFD700"
            style={{ animation: 'hit-flash 1.6s ease-in-out infinite' }}
          />

          {/* Impact sparks */}
          <g style={{ transformOrigin: '133px 24px' }}>
            <polygon
              points="133,24 131,18 133,20 135,18"
              fill="#FFD700"
              style={{ animation: 'spark-1 1.6s ease-in-out infinite' }}
            />
            <polygon
              points="133,24 139,20 136,22 139,18"
              fill="#FF8C00"
              style={{ animation: 'spark-2 1.6s ease-in-out infinite' }}
            />
            <polygon
              points="133,24 130,19 133,17 136,19"
              fill="#EF4444"
              style={{ animation: 'spark-3 1.6s ease-in-out infinite' }}
            />
          </g>

          {/* Bullet hole (appears after hit) */}
          <circle
            cx="133"
            cy="24"
            r="1.5"
            fill="#1a1a1a"
            style={{ animation: 'hit-flash 1.6s ease-in-out infinite' }}
          />

          {/* "BANG!" text pop */}
          <text
            x="133"
            y="4"
            textAnchor="middle"
            fontSize="7"
            fontWeight="bold"
            fontFamily="'Bebas Neue', sans-serif"
            fill="#FFD700"
            stroke="#1a1a1a"
            strokeWidth="0.5"
            style={{ animation: 'hit-flash 1.6s ease-in-out infinite' }}
          >
            BANG!
          </text>
        </g>

        {/* ══════════════════════════════════════════ */}
        {/*  GROUND LINE                              */}
        {/* ══════════════════════════════════════════ */}
        <line x1="5" y1="43" x2="155" y2="43" stroke="#374151" strokeWidth="1" opacity="0.3" />
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
            className="fire-btn group relative inline-flex items-center gap-2 px-7 py-3 font-heading text-sm tracking-widest uppercase font-bold text-esports-dark overflow-hidden"
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
                  size={16}
                  className="animate-flame-flicker"
                  style={{ filter: 'drop-shadow(0 0 4px #FF4500)' }}
                />
                <span style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>JOIN NOW FOR TOURNAMENT</span>
                <Flame
                  size={16}
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
