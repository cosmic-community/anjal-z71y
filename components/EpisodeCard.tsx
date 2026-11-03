import Link from 'next/link';
import { Episode } from '@/types';
import { formatDate, formatDuration } from '@/lib/utils';
import { getMetafieldValue } from '@/lib/cosmic';

interface EpisodeCardProps {
  episode: Episode;
}

export default function EpisodeCard({ episode }: EpisodeCardProps) {
  const cover = episode.metadata?.cover_image?.imgix_url;
  const episodeNumber = episode.metadata?.episode_number;
  const releaseDate = episode.metadata?.release_date;
  const duration = getMetafieldValue(episode.metadata?.duration);

  return (
    <Link
      href={`/episodes/${episode.slug}`}
      className="group block bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-colors"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-900">
        {cover ? (
          <img
            src={`${cover}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={episode.title}
            width={300}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11a7 7 0 01-14 0m7 7v4m-4 0h8M12 1a4 4 0 00-4 4v6a4 4 0 008 0V5a4 4 0 00-4-4z"
              />
            </svg>
          </div>
        )}
        {typeof episodeNumber === 'number' && (
          <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 text-xs font-bold px-2 py-1 rounded-full">
            EP {episodeNumber}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-slate-100 font-semibold line-clamp-2 group-hover:text-amber-400 transition-colors">
          {episode.title}
        </h3>
        <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
          {releaseDate && <span>{formatDate(releaseDate)}</span>}
          {duration && (
            <>
              <span>•</span>
              <span>{formatDuration(duration)}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}