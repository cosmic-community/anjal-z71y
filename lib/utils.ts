export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDuration(duration?: string): string {
  if (!duration) return '';
  const trimmed = duration.trim();

  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(trimmed)) {
    return trimmed;
  }

  const minutes = Number(trimmed);
  if (!Number.isNaN(minutes) && trimmed !== '') {
    const hrs = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins} min`;
  }

  return trimmed;
}