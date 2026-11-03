import { createBucketClient } from '@cosmicjs/sdk';
import { getCosmic } from '@/lib/cosmic-preview';
import type { Episode, Series, Guest } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export function getDateValue(item: {
  published_at?: string | null;
  modified_at?: string | null;
  created_at?: string | null;
}): number {
  const raw = item.published_at || item.modified_at || item.created_at;
  const time = raw ? Date.parse(raw) : NaN;
  return Number.isNaN(time) ? 0 : time;
}

function getReleaseTime(episode: Episode): number {
  const raw = episode.metadata?.release_date;
  const time = raw ? Date.parse(raw) : NaN;
  return Number.isNaN(time) ? 0 : time;
}

function sortEpisodesByRelease(episodes: Episode[]): Episode[] {
  return [...episodes].sort((a, b) => {
    const timeDiff = getReleaseTime(b) - getReleaseTime(a);
    if (timeDiff !== 0) return timeDiff;
    const numA = typeof a.metadata?.episode_number === 'number' ? a.metadata.episode_number : 0;
    const numB = typeof b.metadata?.episode_number === 'number' ? b.metadata.episode_number : 0;
    return numB - numA;
  });
}

const EPISODE_PROPS = ['id', 'slug', 'title', 'type', 'metadata', 'created_at', 'modified_at'];
const SERIES_PROPS = ['id', 'slug', 'title', 'type', 'metadata', 'created_at', 'modified_at'];
const GUEST_PROPS = ['id', 'slug', 'title', 'type', 'metadata', 'created_at', 'modified_at'];

export async function getEpisodes(): Promise<Episode[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic();
    const query = client.objects.find({ type: 'episodes' }).props(EPISODE_PROPS).depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return sortEpisodesByRelease(response.objects as Episode[]);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch episodes');
  }
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic();
    const query = client.objects
      .findOne({ type: 'episodes', slug })
      .props(EPISODE_PROPS)
      .depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return (response.object as Episode) || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch episode');
  }
}

export async function getAllSeries(): Promise<Series[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic();
    const query = client.objects.find({ type: 'series' }).props(SERIES_PROPS).depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return response.objects as Series[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch series');
  }
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic();
    const query = client.objects
      .findOne({ type: 'series', slug })
      .props(SERIES_PROPS)
      .depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return (response.object as Series) || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch series');
  }
}

export async function getEpisodesBySeries(seriesId: string): Promise<Episode[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic();
    const query = client.objects
      .find({ type: 'episodes', 'metadata.series': seriesId })
      .props(EPISODE_PROPS)
      .depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return sortEpisodesByRelease(response.objects as Episode[]);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch episodes for series');
  }
}

export async function getGuests(): Promise<Guest[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic();
    const query = client.objects.find({ type: 'guests' }).props(GUEST_PROPS).depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return response.objects as Guest[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch guests');
  }
}

export async function getGuestBySlug(slug: string): Promise<Guest | null> {
  try {
    const { cosmic: client, previewToken } = await getCosmic();
    const query = client.objects
      .findOne({ type: 'guests', slug })
      .props(GUEST_PROPS)
      .depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return (response.object as Guest) || null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch guest');
  }
}

export async function getEpisodesByGuest(guestId: string): Promise<Episode[]> {
  try {
    const { cosmic: client, previewToken } = await getCosmic();
    const query = client.objects
      .find({ type: 'episodes', 'metadata.guests': guestId })
      .props(EPISODE_PROPS)
      .depth(1);
    const response = previewToken ? await query.status('any') : await query;
    return sortEpisodesByRelease(response.objects as Episode[]);
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch episodes for guest');
  }
}