'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { DemoGallery } from '../lib/demo-data';
import SocialShareMenu from './SocialShareMenu';

function tileClass(index: number) {
  if (index === 0) return 'md:col-span-3 md:row-span-2';
  if (index === 1) return 'md:col-span-3';
  if (index === 2) return 'md:col-span-2';
  return 'md:col-span-2';
}

export default function GalleryPublicView({ gallery }: { gallery: DemoGallery }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  const activeImage = useMemo(() => gallery.images[selectedIndex], [gallery.images, selectedIndex]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id]
    );
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => setSelectedIndex((current) => (current + 1) % gallery.images.length);
  const prevImage = () => setSelectedIndex((current) => (current - 1 + gallery.images.length) % gallery.images.length);

  const galleryUrl = `https://framezar.com/gallery/${gallery.id}`;

  return (
    <div className="min-h-screen bg-white pt-8">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/15" />
        <div className="relative">
          <div className="relative h-[540px] overflow-hidden bg-slate-800">
            <Image src={gallery.heroImage} alt={gallery.title} fill className="object-cover" />
          </div>
          <div className="page-container relative mx-auto -mt-20 rounded-[36px] border border-white/90 bg-white/95 px-6 py-10 shadow-soft backdrop-blur-xl sm:px-10">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.35em] text-brand">Private client gallery</p>
                <h1 className="text-4xl font-semibold text-slate-950 sm:text-5xl">{gallery.title}</h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">{gallery.description}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="rounded-full bg-slate-100 px-3 py-1">{gallery.clientName}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{gallery.eventDate}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{gallery.venue}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">{gallery.galleryType}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1">
                    {gallery.passwordProtected ? 'Password protected' : 'Open access'}
                  </span>
                </div>
              </div>
              <div className="space-y-4 rounded-[32px] border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Gallery details</p>
                <div className="space-y-3 text-sm text-slate-700">
                  <p><span className="font-semibold text-slate-900">Link</span> {galleryUrl}</p>
                  <p><span className="font-semibold text-slate-900">Images</span> {gallery.imageCount}</p>
                  <p><span className="font-semibold text-slate-900">Created</span> {gallery.createdAt}</p>
                </div>
                <div className="space-y-3 pt-4">
                  <button type="button" className="dark-glass-button w-full rounded-full px-5 py-3 text-sm font-semibold">
                    Download collection
                  </button>
                  <button type="button" className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand">
                    Save favorites
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-container mx-auto mt-16 grid gap-12">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <div className="rounded-[36px] border border-slate-200/70 bg-white/95 p-6 shadow-soft">
            <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {gallery.images.map((image, index) => (
                <div key={image.id} className={`group relative overflow-hidden rounded-[32px] bg-slate-100 shadow-soft transition hover:-translate-y-1 ${tileClass(index)}`}>
                  <button type="button" onClick={() => openLightbox(index)} className="block h-full w-full text-left">
                    <div className="relative aspect-[4/5] w-full">
                      <Image src={image.src} alt={image.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-4 py-4 text-white">
                      <p className="text-sm font-semibold">{image.title}</p>
                      <p className="mt-1 text-xs text-slate-200">{image.description}</p>
                    </div>
                  </button>
                  <div className="absolute right-4 top-4 flex items-center gap-3 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                    <button
                      type="button"
                      aria-label={favorites.includes(image.id) ? `Remove ${image.title} from favorites` : `Add ${image.title} to favorites`}
                      onClick={() => toggleFavorite(image.id)}
                      className="rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-brand hover:text-white"
                    >
                      {favorites.includes(image.id) ? 'Saved' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => openLightbox(index)}
                      className="rounded-full bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-900"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-slate-950">Album notes</h2>
              <p className="mt-4 text-slate-600">This gallery is designed to feel like a premium photo album with generous spacing, bold imagery, and elegant typography.</p>
            </div>
            <SocialShareMenu shareUrl={galleryUrl} imageTitle={activeImage.title} />
            <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-6 shadow-soft">
              <h2 className="text-xl font-semibold text-slate-950">Download options</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-slate-600">
                <li>Web size</li>
                <li>High resolution</li>
                <li>Original file</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {lightboxOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4">
          <div className="relative mx-auto">
            <button type="button" onClick={() => setLightboxOpen(false)} className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-3 py-2 text-slate-950 shadow-sm transition hover:bg-white">
              Close
            </button>
            <div className="relative w-[min(calc(100vw-2rem),72rem)] overflow-hidden rounded-[32px] bg-slate-900 shadow-2xl">
              <div className="relative h-[calc(100vh-120px)] w-full">
                <Image src={activeImage.src} alt={activeImage.title} fill className="object-contain" />
              </div>
              <div className="p-6 text-white">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-300">{gallery.clientName}</p>
                    <h2 className="mt-2 text-3xl font-semibold">{activeImage.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{activeImage.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={prevImage} className="rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Previous</button>
                    <button type="button" onClick={nextImage} className="rounded-full bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Next</button>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={activeImage.src} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Download</a>
                  <a href={galleryUrl} className="rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Share gallery</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
