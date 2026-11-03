// app/episodes/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import AudioPlayer from '@/components/AudioPlayer';
import ShowNotes from '@/components/ShowNotes';
import GuestCard from '@/components/GuestCard';
import { getEpisodeBySlug, getMetafieldValue } from '@/lib/cosmic';
import { formatDate, formatDuration } from '@/lib/utils';

export const revalidate = 60;

interface EpisodePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);
  return {
    title: episode ? `${episode.title} — ANJAL Podcast` : 'Episode — ANJAL Podcast',
  };
}

export default async function EpisodePage({ params }: EpisodePageProps) {
  const { slug } = await params;
  const episode = await getEpisodeBySlug(slug);

  if (!episode) {
    notFound();
  }

  const cover = episode.metadata?.cover_image?.imgix_url;
  const audioUrl = getMetafieldValue(episode.metadata?.audio_url);
  const description = getMetafieldValue(episode.metadata?.description);
  const showNotes = getMetafieldValue(episode.metadata?.show_notes);
  const series = episode.metadata?.series;
  const guests = episode.metadata?.guests || [];
  const episodeNumber = episode.metadata?.episode_number;
  const releaseDate = episode.metadata?.release_date;
  const duration = getMetafieldValue(episode.metadata?.duration);
  const seriesDescription = series ? getMetafieldValue(series.metadata?.description) : '';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        {typeof episodeNumber === 'number' && (
          <span className="inline-block bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full mb-4">
            Episode {episodeNumber}
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">{episode.title}</h1>
        <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-slate-400">
          {releaseDate && <span>{formatDate(releaseDate)}</span>}
          {duration && (
            <>
              <span>•</span>
              <span>{formatDuration(duration)}</span>
            </>
          )}
          {series && (
            <>
              <span>•</span>
              <Link href={`/series/${series.slug}`} className="text-amber-400 hover:text-amber-300">
                {series.title}
              </Link>
            </>
          )}
        </div>
      </div>

      {cover && (
        <img
          src={`${cover}?w=1200&h=675&fit=crop&auto=format,compress`}
          alt={episode.title}
          width={800}
          height={450}
          className="w-full rounded-2xl object-cover mb-8"
        />
      )}

      {audioUrl && (
        <div className="mb-10">
          <AudioPlayer
            src={audioUrl}
            title={episode.title}
            coverImage={cover ? `${cover}?w=200&h=200&fit=crop&auto=format,compress` : undefined}
          />
        </div>
      )}

      {description && (
        <p className="text-lg text-slate-300 leading-relaxed mb-10">{description}</p>
      )}

      {showNotes && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Show Notes</h2>
          <ShowNotes html={showNotes} />
        </div>
      )}

      {series && (
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-100 mb-4">Series</h2>
          <Link
            href={`/series/${series.slug}`}
            className="flex items-center gap-4 bg-slate-800/40 border border-slate-700 rounded-2xl p-4 hover:border-amber-500/50 transition-colors"
          >
            {series.metadata?.cover_image?.imgix_url && (
              <img
                src={`${series.metadata.cover_image.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={series.title}
                width={80}
                height={80}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />
            )}
            <div>
              <p className="text-slate-100 font-semibold">{series.title}</p>
              {seriesDescription && (
                <p className="text-slate-400 text-sm mt-1 line-clamp-2">{seriesDescription}</p>
              )}
            </div>
          </Link>
        </div>
      )}

      {guests.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-100 mb-4">Guests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guests.map((guest) => (
              <GuestCard key={guest.id} guest={guest} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}