import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-5xl font-bold text-slate-100">404</h1>
      <p className="text-slate-400 mt-4">We couldn&apos;t find the page you were looking for.</p>
      <Link
        href="/"
        className="inline-block mt-8 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}