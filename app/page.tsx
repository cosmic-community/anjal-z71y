import Link from 'next/link';
import Hero from '@/components/Hero';
import EpisodeCard from '@/components/EpisodeCard';
import SeriesCard from '@/components/SeriesCard';
import EmptyState from '@/components/EmptyState';
import { getEpisodes, getAllSeries } from '@/lib/cosmic';

export const revalidate = 60;

export default async function HomePage() {
  const [episodes, series] = await Promise.all([getEpisodes(), getAllSeries()]);
  const latestEpisodes = episodes.slice(0, 3);
  const highlightedSeries = series.slice(0, 3);

  return (
    <>
      <Hero />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Latest Episodes</h2>
          <Link href="/episodes" className="text-amber-400 hover:text-amber-300 text-sm font-semibold">
            View all →
          </Link>
        </div>
        {latestEpisodes.length === 0 ? (
          <EmptyState title="No episodes yet" message="Check back soon for new episodes." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Series Highlights</h2>
          <Link href="/series" className="text-amber-400 hover:text-amber-300 text-sm font-semibold">
            View all →
          </Link>
        </div>
        {highlightedSeries.length === 0 ? (
          <EmptyState title="No series yet" message="Series will appear here once added." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedSeries.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}