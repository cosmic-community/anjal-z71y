export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">© {year} ANJAL Podcast. All rights reserved.</p>
        <p className="text-slate-600 text-xs">Audio-first stories, delivered weekly.</p>
      </div>
    </footer>
  );
}