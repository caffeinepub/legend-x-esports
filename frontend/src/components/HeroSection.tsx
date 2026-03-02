// --- Hero Section ---
export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-bg.dim_1920x1080.png"
          alt="Hero Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-6 items-center text-center min-h-screen justify-center py-24">
          {/* Logo Image */}
          <div className="mb-2">
            <img
              src="/assets/generated/legend-x-logo.dim_512x512.png"
              alt="Legend X Arena Logo"
              className="h-20 w-auto object-contain drop-shadow-[0_0_16px_var(--color-primary)]"
            />
          </div>

          {/* Hero Title — Legend / X / Arena */}
          <div className="flex flex-col leading-none gap-1 items-center">
            <h1
              className="font-black uppercase tracking-widest text-foreground"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", letterSpacing: "0.12em" }}
            >
              Legend
            </h1>
            <h1
              className="font-black uppercase text-primary drop-shadow-[0_0_24px_var(--color-primary)]"
              style={{ fontSize: "clamp(4rem, 11vw, 9rem)", lineHeight: "0.9", letterSpacing: "0.04em" }}
            >
              X
            </h1>
            <h1
              className="font-black uppercase tracking-widest text-foreground"
              style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", letterSpacing: "0.12em" }}
            >
              Arena
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground text-lg max-w-md leading-relaxed">
            Dominate the battlefield. Rise through the ranks. Join the legend.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-2 justify-center">
            <a
              href="#roster"
              className="btn-glow px-8 py-3 text-sm font-bold tracking-wider uppercase rounded"
            >
              Meet the Team
            </a>
            <a
              href="#news"
              className="px-8 py-3 text-sm font-bold tracking-wider uppercase rounded border border-border text-foreground hover:border-primary hover:text-primary transition-colors duration-200"
            >
              Latest News
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
