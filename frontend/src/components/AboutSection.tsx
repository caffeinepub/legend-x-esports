import { Shield, Target, Trophy, Users } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Discipline',
    description: 'We train with purpose and compete with precision. Every match is an opportunity to grow stronger.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Mediocrity is not in our vocabulary. We push limits and set new standards in competitive play.',
  },
  {
    icon: Trophy,
    title: 'Victory',
    description: 'Winning is the goal, but the journey builds champions. We celebrate every milestone on the path.',
  },
  {
    icon: Users,
    title: 'Brotherhood',
    description: 'We are more than a team — we are a family. United in purpose, unstoppable in execution.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-esports-dark overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, oklch(0.55 0.22 25), transparent 70%)' }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-12 bg-esports-red" />
            <span className="font-heading text-xs tracking-widest uppercase text-esports-red">Our Story</span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-foreground leading-none">
            ABOUT <span className="text-esports-red">US</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Text Content */}
          <div>
            <h3 className="font-heading text-2xl sm:text-3xl text-esports-gold mb-6 tracking-wide">
              FORGED IN COMPETITION
            </h3>
            <div className="space-y-4 text-esports-gray-light font-body leading-relaxed">
              <p>
                Legend X Esports was born from a shared passion for competitive gaming and an unrelenting drive to reach the top. We are a professional esports organization dedicated to nurturing talent, building elite teams, and competing at the highest levels of play.
              </p>
              <p>
                Our players are more than competitors — they are athletes who dedicate countless hours to mastering their craft. We provide the structure, coaching, and support they need to transform raw skill into championship-level performance.
              </p>
              <p>
                From our humble beginnings to our current standing, Legend X Esports has always stood for one thing: <span className="text-esports-red font-heading">excellence without compromise.</span>
              </p>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div className="h-px flex-1 bg-esports-dark-4" />
              <span className="font-display text-4xl text-esports-red">X</span>
              <div className="h-px flex-1 bg-esports-dark-4" />
            </div>
          </div>

          {/* Profile / Brand Display */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-full opacity-25 pointer-events-none"
              style={{ background: 'radial-gradient(circle, oklch(0.55 0.22 25), transparent 65%)' }}
            />

            {/* Clipped panel with profile image */}
            <div
              className="relative border border-esports-red/30 bg-esports-dark-2 overflow-hidden"
              style={{ clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)' }}
            >
              <img
                src="/assets/quality_restoration_20260128182709920-4.jpg"
                alt="Mr Q Legend YT — Legend X Esports"
                className="w-48 h-48 md:w-64 md:h-64 object-cover object-top"
              />
              {/* Red overlay tint at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                style={{ background: 'linear-gradient(to top, oklch(0.55 0.22 25 / 0.45), transparent)' }}
              />
            </div>

            {/* Decorative corner accents */}
            <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-esports-red opacity-70" />
            <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-esports-red opacity-70" />

            {/* Name tag below image */}
            <div
              className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-esports-dark-2 border border-esports-red/40 px-4 py-1 whitespace-nowrap"
              style={{ clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)' }}
            >
              <span className="font-heading text-xs tracking-widest uppercase text-esports-red">Mr Q Legend YT</span>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="group relative bg-esports-dark-2 border border-esports-dark-4 p-6 card-hover"
                style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
              >
                <div className="mb-4 inline-flex p-2 bg-esports-red/10 text-esports-red group-hover:bg-esports-red/20 transition-colors">
                  <Icon size={20} />
                </div>
                <h4 className="font-heading text-lg tracking-widest uppercase text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="font-body text-sm text-esports-gray leading-relaxed">
                  {value.description}
                </p>
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-esports-red group-hover:w-full transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
