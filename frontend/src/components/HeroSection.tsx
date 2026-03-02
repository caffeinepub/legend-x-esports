import { ChevronDown, Flame, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image - yellow/red polygonal low-poly artwork */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/assets/quality_restoration_20260224213607352.jpg"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-full h-full"
          style={{ objectFit: 'cover', objectPosition: 'center center', width: '100%', height: '100%' }}
        />
      </div>

      {/* Primary dark overlay for text readability — stronger for bright yellow/red image */}
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
            <span className="relative z-10 flex items-center gap-2">
              <Flame
                size={16}
                className="animate-flame-flicker"
                style={{ filter: 'drop-shadow(0 0 4px #FF4500)' }}
              />
              <span style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>JOIN NOW</span>
              <Flame
                size={16}
                className="animate-flame-flicker"
                style={{ filter: 'drop-shadow(0 0 4px #FF4500)', animationDelay: '0.3s' }}
              />
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
