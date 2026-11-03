// app/guests/[slug]/page.tsx
import { notFound } from 'next/navigation';
import EpisodeCard from '@/components/EpisodeCard';
import EmptyState from '@/components/EmptyState';
import { getGuestBySlug, getEpisodesByGuest, getMetafieldValue } from '@/lib/cosmic';

export const revalidate = 60;

interface GuestDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GuestDetailPageProps) {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);
  const name = guest ? getMetafieldValue(guest.metadata?.name) || guest.title : 'Guest';
  return {
    title: `${name} — ANJAL Podcast`,
  };
}

export default async function GuestDetailPage({ params }: GuestDetailPageProps) {
  const { slug } = await params;
  const guest = await getGuestBySlug(slug);

  if (!guest) {
    notFound();
  }

  const episodes = await getEpisodesByGuest(guest.id);
  const photo = guest.metadata?.photo?.imgix_url;
  const name = getMetafieldValue(guest.metadata?.name) || guest.title;
  const bio = getMetafieldValue(guest.metadata?.bio);
  const website = getMetafieldValue(guest.metadata?.website);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row gap-8 mb-12 items-center md:items-start">
        <div className="w-40 h-40 rounded-full overflow-hidden bg-slate-900 flex-shrink-0">
          {photo ? (
            <img
              src={`${photo}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">{name}</h1>
          {bio && <p className="text-slate-400 mt-4 leading-relaxed max-w-2xl">{bio}</p>}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-amber-400 hover:text-amber-300 font-medium"
            >
              Visit Website
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-100 mb-6">Episodes Featuring {name}</h2>
      {episodes.length === 0 ? (
        <EmptyState
          title="No episodes yet"
          message="Episodes with this guest will appear here soon."
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