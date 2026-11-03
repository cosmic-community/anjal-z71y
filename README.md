# ANJAL Podcast

![App Preview](https://imgix.cosmicjs.com/b8334620-d7b0-11f1-b4e6-af8abca1fda0-generated-1793728942924.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, dark-friendly, audio-first podcast website for **ANJAL**, built with Next.js 16 and powered by Cosmic.

## Features

- 🏠 Homepage hero with latest episodes and series highlights
- 🎧 Episodes listing page with cover images, episode numbers, dates & durations
- ▶️ Custom embedded audio player with scrub bar and skip controls
- 📓 Episode detail pages with description, rich-text show notes, linked series, and guest cards
- 🗂️ Series listing & detail pages with host, description, cover image, and episodes
- 👤 Guest listing & detail pages with photo, bio, website link, and appearances
- 📱 Fully responsive, dark-themed design
- ⚡ Server Components for fast, SEO-friendly rendering

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6aea200aa341a3b64717f694&clone_repository=6aea2238a341a3b64717f923)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a podcast website with episodes (including audio URL, description, and show notes), series, and guest profiles.
>
> User instructions: A developer portfolio with projects, skills, work experience, and contact info"

### Code Generation Prompt

> "Build a Next.js application for a creative portfolio called "ANJAL". The content is managed in Cosmic CMS with the following object types: series, guests, episodes. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
>
> User instructions: A modern podcast website for ANJAL. Pages: home page with a hero, featured/latest episodes, and series highlights; an episodes listing page with cover images, episode numbers, release dates, and durations; episode detail pages with an embedded audio player (from audio_url), description, rich-text show notes, linked series, and guest cards; a series listing page and series detail pages showing the series description, host, cover image, and all episodes in that series; a guests listing page and guest detail pages with photo, bio, website link, and episodes they appeared on. Clean, responsive, dark-friendly audio-first design with a persistent, easy-to-use player feel."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- [Cosmic](https://www.cosmicjs.com) headless CMS via [`@cosmicjs/sdk`](https://www.cosmicjs.com/docs)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- A Cosmic account and bucket with `series`, `guests`, and `episodes` object types

### Installation

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

Create a `.env.local` file with:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

```typescript
// Fetch all episodes sorted by release date, with series & guests resolved
const { objects: episodes } = await cosmic.objects
  .find({ type: 'episodes' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

// Fetch episodes belonging to a specific series
const { objects: seriesEpisodes } = await cosmic.objects
  .find({ type: 'episodes', 'metadata.series': seriesId })
  .depth(1)
```

## Cosmic CMS Integration

This app reads directly from your Cosmic bucket's `series`, `guests`, and `episodes` object types using the [Cosmic SDK](https://www.cosmicjs.com/docs). Object relationships (series ↔ episodes, guests ↔ episodes) are resolved automatically using the `depth` parameter, so connected content is available without extra queries.

## Deployment Options

### Vercel

1. Push this repository to GitHub
2. Import the project into [Vercel](https://vercel.com)
3. Add the environment variables listed above
4. Deploy

### Netlify

1. Push this repository to GitHub
2. Create a new site on [Netlify](https://www.netlify.com) from your repo
3. Set build command to `bun run build` and publish directory to `.next`
4. Add the environment variables listed above
5. Deploy

<!-- README_END -->