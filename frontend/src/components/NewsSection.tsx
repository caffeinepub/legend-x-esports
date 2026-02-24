import { Newspaper } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import AnnouncementCard from './AnnouncementCard';
import { useAnnouncements } from '../hooks/useQueries';

export default function NewsSection() {
  const { data: announcements, isLoading, isError } = useAnnouncements();

  return (
    <section id="news" className="relative py-24 md:py-32 bg-esports-dark overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, oklch(0.55 0.22 25), transparent 70%)' }}
      />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-12 bg-esports-red" />
            <span className="font-heading text-xs tracking-widest uppercase text-esports-red">Latest Updates</span>
          </div>
          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl text-foreground leading-none">
            NEWS &amp; <span className="text-esports-red">ANNOUNCEMENTS</span>
          </h2>
          <p className="mt-4 font-body text-esports-gray max-w-xl">
            Stay up to date with the latest news, tournament results, and team announcements from Legend X Esports.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-esports-dark-2 border border-esports-dark-4 p-6 space-y-3">
                <Skeleton className="h-3 w-24 bg-esports-dark-4" />
                <Skeleton className="h-6 w-full bg-esports-dark-4" />
                <Skeleton className="h-4 w-full bg-esports-dark-4" />
                <Skeleton className="h-4 w-3/4 bg-esports-dark-4" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-16 border border-esports-red/20 bg-esports-red/5">
            <p className="font-heading text-esports-red tracking-widest uppercase">Failed to load announcements</p>
            <p className="font-body text-sm text-esports-gray mt-2">Please try refreshing the page.</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && (!announcements || announcements.length === 0) && (
          <div className="text-center py-20 border border-esports-dark-4 bg-esports-dark-3/50">
            <div className="inline-flex p-4 bg-esports-dark-4 mb-4">
              <Newspaper size={32} className="text-esports-gray" />
            </div>
            <h3 className="font-heading text-xl tracking-widest uppercase text-esports-gray-light mb-2">
              No Announcements Yet
            </h3>
            <p className="font-body text-sm text-esports-gray max-w-sm mx-auto">
              Stay tuned — big news is coming. Follow our socials for the latest updates.
            </p>
          </div>
        )}

        {/* Announcements Grid */}
        {!isLoading && !isError && announcements && announcements.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.title}
                announcement={announcement}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
