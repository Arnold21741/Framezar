'use client';

import { useMemo, useState } from 'react';
import GalleryCard from '@/components/GalleryCard';
import type { DemoGallery } from '@/lib/demo-data';

type SearchableGalleryGridProps = {
  galleries: DemoGallery[];
  compact?: boolean;
};

const getGallerySearchText = (gallery: DemoGallery) => (
  [
    gallery.title,
    gallery.clientName,
    gallery.eventDate,
    gallery.createdAt,
    gallery.description,
    gallery.venue,
    gallery.galleryType,
    ...gallery.tags
  ].join(' ').toLowerCase()
);

export default function SearchableGalleryGrid({ galleries, compact = false }: SearchableGalleryGridProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const availableTags = useMemo(() => (
    Array.from(new Set(galleries.flatMap((gallery) => gallery.tags))).sort((a, b) => a.localeCompare(b))
  ), [galleries]);

  const filteredGalleries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedTag = activeTag.toLowerCase();

    return galleries.filter((gallery) => {
      const searchText = getGallerySearchText(gallery);
      const matchesQuery = !normalizedQuery || searchText.includes(normalizedQuery);
      const matchesTag = !normalizedTag || gallery.tags.some((tag) => tag.toLowerCase() === normalizedTag);
      return matchesQuery && matchesTag;
    });
  }, [activeTag, galleries, query]);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-6 shadow-soft">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <label className="space-y-2 text-sm font-medium text-slate-800">
            Search galleries
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
              placeholder="Search by year, month, venue, client, or tag"
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setActiveTag('');
            }}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
          >
            Clear filters
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const selected = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(selected ? '' : tag)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selected
                    ? 'border-brand bg-brand text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-brand hover:text-brand'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filteredGalleries.length}</span> of {galleries.length} galleries.
        </p>
      </div>

      {filteredGalleries.length ? (
        <div className={`grid gap-8 ${compact ? 'lg:grid-cols-3' : 'md:grid-cols-2'}`}>
          {filteredGalleries.map((gallery) => (
            <GalleryCard key={gallery.id} gallery={gallery} />
          ))}
        </div>
      ) : (
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-lg font-semibold text-slate-950">No galleries found</p>
          <p className="mt-2 text-sm text-slate-600">Try a different year, month, venue, client name, or tag.</p>
        </div>
      )}
    </div>
  );
}
