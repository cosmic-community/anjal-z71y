import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
        <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">
          The ANJAL Podcast
        </span>
        <h1 className="text-4xl sm:text-6xl font-bold text-slate-100 max-w-2xl leading-tight">
          Stories worth listening to, every single episode.
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-xl">
          Deep conversations, bold ideas, and the voices shaping culture today. Tune in to ANJAL
          for candid interviews and thoughtful storytelling.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/episodes"
            className="px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-colors"
          >
            Browse Episodes
          </Link>
          <Link
            href="/series"
            className="px-6 py-3 rounded-full border border-slate-700 hover:border-amber-500/50 text-slate-200 font-semibold transition-colors"
          >
            Explore Series
          </Link>
        </div>
      </div>
    </section>
  );
}