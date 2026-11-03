export interface CosmicMedia {
  url: string;
  imgix_url: string;
}

export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Series extends CosmicObject {
  type: 'series';
  metadata: {
    description?: string;
    host?: string;
    cover_image?: CosmicMedia;
  };
}

export interface Guest extends CosmicObject {
  type: 'guests';
  metadata: {
    name?: string;
    bio?: string;
    photo?: CosmicMedia;
    website?: string;
  };
}

export interface Episode extends CosmicObject {
  type: 'episodes';
  metadata: {
    audio_url?: string;
    description?: string;
    show_notes?: string;
    episode_number?: number;
    release_date?: string;
    duration?: string;
    cover_image?: CosmicMedia;
    series?: Series;
    guests?: Guest[];
  };
}