interface ShowNotesProps {
  html?: string;
}

export default function ShowNotes({ html }: ShowNotesProps) {
  if (!html) return null;
  return (
    <div
      className="prose prose-invert prose-amber max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-amber-400 prose-strong:text-slate-100 prose-li:text-slate-300"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}