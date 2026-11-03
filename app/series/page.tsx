import SeriesCard from '@/components/SeriesCard';
import EmptyState from '@/components/EmptyState';
import { getAllSeries } from '@/lib/cosmic';

export const revalidate = 60;

export default async function SeriesPage() {
  const series = await getAllSeries();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">All Series</h1>
        <p className="text-slate-400 mt-2">Explore our curated podcast series.</p>
      </div>

      {series.length === 0 ? (
        <EmptyState title="No series yet" message="Series will appear here once added." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {series.map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </div>
      )}
    </div>
  );
}