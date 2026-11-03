import EpisodeCard from '@/components/EpisodeCard';
import EmptyState from '@/components/EmptyState';
import { getEpisodes } from '@/lib/cosmic';

export const revalidate = 60;

export default async function EpisodesPage() {
  const episodes = await getEpisodes();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">All Episodes</h1>
        <p className="text-slate-400 mt-2">Browse every episode of the ANJAL podcast.</p>
      </div>

      {episodes.length === 0 ? (
        <EmptyState title="No episodes yet" message="Episodes will appear here once published." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}
    </div>
  );
}