import { Calendar, ChevronRight } from 'lucide-react';
import type { Announcement } from '../backend';

interface AnnouncementCardProps {
  announcement: Announcement;
}

function formatTimestamp(timestamp: bigint): string {
  // ICP timestamps are in nanoseconds
  const ms = Number(timestamp / BigInt(1_000_000));
  const date = new Date(ms);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const { title, body, timestamp } = announcement;

  return (
    <article className="group relative bg-esports-dark-2 border border-esports-dark-4 p-6 card-hover overflow-hidden">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-esports-red/30 group-hover:bg-esports-red transition-colors duration-300" />

      {/* Top right corner decoration */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-esports-red/20 group-hover:border-t-esports-red/40 transition-colors" />

      {/* Date */}
      <div className="flex items-center gap-2 mb-3 text-esports-gray">
        <Calendar size={12} />
        <time className="font-body text-xs tracking-widest uppercase">
          {formatTimestamp(timestamp)}
        </time>
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl tracking-wide text-foreground mb-3 group-hover:text-esports-red transition-colors line-clamp-2">
        {title}
      </h3>

      {/* Body */}
      <p className="font-body text-sm text-esports-gray leading-relaxed line-clamp-3 mb-4">
        {body}
      </p>

      {/* Read more */}
      <div className="flex items-center gap-1 text-esports-red font-heading text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity">
        Read More <ChevronRight size={12} />
      </div>
    </article>
  );
}
