interface EmptyStateProps {
  title: string;
  message: string;
}

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="text-center py-20">
      <h3 className="text-xl font-semibold text-slate-200">{title}</h3>
      <p className="text-slate-500 mt-2">{message}</p>
    </div>
  );
}