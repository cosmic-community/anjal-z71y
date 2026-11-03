import Link from 'next/link';
import { Guest } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface GuestCardProps {
  guest: Guest;
}

export default function GuestCard({ guest }: GuestCardProps) {
  const photo = guest.metadata?.photo?.imgix_url;
  const name = getMetafieldValue(guest.metadata?.name) || guest.title;
  const bio = getMetafieldValue(guest.metadata?.bio);

  return (
    <Link
      href={`/guests/${guest.slug}`}
      className="group flex flex-col items-center text-center bg-slate-800/40 border border-slate-700 rounded-2xl p-6 hover:border-amber-500/50 transition-colors"
    >
      <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-900 mb-4 flex-shrink-0">
        {photo ? (
          <img
            src={`${photo}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <h3 className="text-slate-100 font-semibold group-hover:text-amber-400 transition-colors">
        {name}
      </h3>
      {bio && <p className="text-slate-400 text-sm mt-2 line-clamp-2">{bio}</p>}
    </Link>
  );
}