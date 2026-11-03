import Link from 'next/link';
import { Series } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

interface SeriesCardProps {
  series: Series;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  const cover = series.metadata?.cover_image?.imgix_url;
  const description = getMetafieldValue(series.metadata?.description);
  const host = getMetafieldValue(series.metadata?.host);

  return (
    <Link
      href={`/series/${series.slug}`}
      className="group block bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-colors"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {cover ? (
          <img
            src={`${cover}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={series.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-14 0" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-slate-100 font-semibold text-lg group-hover:text-amber-400 transition-colors">
          {series.title}
        </h3>
        {host && <p className="text-amber-400/80 text-sm mt-1">Hosted by {host}</p>}
        {description && <p className="text-slate-400 text-sm mt-2 line-clamp-2">{description}</p>}
      </div>
    </Link>
  );
}