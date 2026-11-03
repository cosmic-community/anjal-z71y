// app/episodes/[slug]/loading.tsx
export default function EpisodeLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-slate-700 border-t-amber-500 rounded-full animate-spin" />
    </div>
  );
}