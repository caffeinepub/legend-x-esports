import { Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import PlayerCard from './PlayerCard';
import { useRoster } from '../hooks/useQueries';

export default function RosterSection() {
  const { data: roster, isLoading, isError } = useRoster();

  return (
    <section id="roster" className="relative py-24 md:py-32 bg-esports-dark-2 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom left, oklch(0.82 0.18 85), transparent 70%)' }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-12 bg-esports-gold" />
            <span className="font-heading text-xs tracking-widest uppercase text-esports-gold">The Squad</span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-foreground leading-none">
            OUR <span className="text-esports-gold">ROSTER</span>
          </h2>
          <p className="mt-4 font-body text-esports-gray max-w-xl">
            Meet the elite players who carry the Legend X banner into battle. Each one a specialist, together unstoppable.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="bg-esports-dark-3 border border-esports-dark-4">
                <Skeleton className="aspect-square w-full bg-esports-dark-4" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-5 w-3/4 bg-esports-dark-4" />
                  <Skeleton className="h-3 w-1/2 bg-esports-dark-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16 border border-esports-red/20 bg-esports-red/5">
            <p className="font-heading text-esports-red tracking-widest uppercase">Failed to load roster</p>
            <p className="font-body text-sm text-esports-gray mt-2">Please try refreshing the page.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && (!roster || roster.length === 0) && (
          <div className="text-center py-20 border border-esports-dark-4 bg-esports-dark-3/50">
            <div className="inline-flex p-4 bg-esports-dark-4 mb-4">
              <Users size={32} className="text-esports-gray" />
            </div>
            <h3 className="font-heading text-xl tracking-widest uppercase text-esports-gray-light mb-2">
              Roster Coming Soon
            </h3>
            <p className="font-body text-sm text-esports-gray max-w-sm mx-auto">
              Our roster is being assembled. Check back soon to meet the team.
            </p>
          </div>
        )}

        {/* Roster Grid */}
        {!isLoading && !isError && roster && roster.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {roster.map((member) => (
              <PlayerCard
                key={member.name}
                name={member.name}
                role={member.role}
                avatarUrl={member.avatarUrl}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
