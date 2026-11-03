import GuestCard from '@/components/GuestCard';
import EmptyState from '@/components/EmptyState';
import { getGuests } from '@/lib/cosmic';

export const revalidate = 60;

export default async function GuestsPage() {
  const guests = await getGuests();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100">Guests</h1>
        <p className="text-slate-400 mt-2">Meet the voices who&apos;ve joined us on ANJAL.</p>
      </div>

      {guests.length === 0 ? (
        <EmptyState title="No guests yet" message="Guest profiles will appear here once added." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {guests.map((guest) => (
            <GuestCard key={guest.id} guest={guest} />
          ))}
        </div>
      )}
    </div>
  );
}