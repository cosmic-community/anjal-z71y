// app/series/[slug]/page.tsx
import { notFound } from 'next/navigation';
import EpisodeCard from '@/components/EpisodeCard';
import EmptyState from '@/components/EmptyState';
import { getSeriesBySlug, getEpisodesBySeries, getMetafieldValue } from '@/lib/cosmic';

export const revalidate = 60;

interface SeriesDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SeriesDetailPageProps) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);
  return {
    title: series ? `${series.title} — ANJAL Podcast` : 'Series — ANJAL Podcast',
  };
}

export default async function SeriesDetailPage({ params }: SeriesDetailPageProps) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  if (!series) {
    notFound();
  }

  const episodes = await getEpisodesBySeries(series.id);
  const cover = series.metadata?.cover_image?.imgix_url;
  const description = getMetafieldValue(series.metadata?.description);
  const host = getMetafieldValue(series.metadata?.host);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {cover && (
          <img
            src={`${cover}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={series.title}
            width={300}
            height={300}
            className="w-full md:w-72 h-72 object-cover rounded-2xl flex-shrink-0"
          />
        )}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">{series.title}</h1>
          {host && <p className="text-amber-400 font-medium mt-2">Hosted by {host}</p>}
          {description && (
            <p className="text-slate-400 mt-4 leading-relaxed">{description}</p>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mb-6">Episodes in this Series</h2>
      {episodes.length === 0 ? (
        <EmptyState
          title="No episodes yet"
          message="Episodes for this series will appear here soon."
        />
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