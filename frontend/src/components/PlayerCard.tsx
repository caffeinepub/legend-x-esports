import { User } from 'lucide-react';

interface PlayerCardProps {
  name: string;
  role: string;
  avatarUrl?: string;
}

export default function PlayerCard({ name, role, avatarUrl }: PlayerCardProps) {
  const displayAvatar = avatarUrl && avatarUrl.trim() !== ''
    ? avatarUrl
    : '/assets/generated/player-avatar-default.dim_256x256.png';

  return (
    <div className="group relative bg-esports-dark-2 border border-esports-dark-4 overflow-hidden card-hover cursor-default">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-esports-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Avatar */}
      <div className="relative aspect-square overflow-hidden bg-esports-dark-3">
        <img
          src={displayAvatar}
          alt={`${name} avatar`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/assets/generated/player-avatar-default.dim_256x256.png';
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-esports-dark-2 via-transparent to-transparent" />

        {/* Role badge */}
        <div className="absolute top-3 right-3 px-2 py-0.5 bg-esports-red/90 text-white font-heading text-xs tracking-widest uppercase">
          {role}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1 h-4 bg-esports-red flex-shrink-0" />
          <h3 className="font-heading text-lg tracking-wide text-foreground truncate">
            {name}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-esports-gray">
          <User size={12} />
          <span className="font-body text-xs tracking-widest uppercase">{role}</span>
        </div>
      </div>

      {/* Bottom corner accent */}
      <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-b-[20px] border-b-esports-red/30 group-hover:border-b-esports-red/60 transition-colors" />
    </div>
  );
}
