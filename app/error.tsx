'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <h1 className="text-3xl font-bold text-slate-100">Something went wrong</h1>
      <p className="text-slate-400 mt-4">An unexpected error occurred while loading this page.</p>
      <button
        onClick={reset}
        className="inline-block mt-8 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}