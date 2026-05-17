'use client';

import { useEffect, useMemo, useRef, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import GalleryCoverPreview from '@/components/GalleryCoverPreview';
import { coverDesigns, type CoverDesignId } from '@/lib/cover-designs';

const sampleHero = 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80';
const sampleImages = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80'
];

const monthOptions = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const categoryOptions = ['Wedding', 'Engagement', 'Family', 'Portrait', 'Branding', 'Event', 'Studio'];

const getEventParts = (dateValue: string) => {
  const [year, month] = dateValue.split('-');
  const monthIndex = Number(month) - 1;

  return {
    year: year || new Date().getFullYear().toString(),
    month: monthOptions[monthIndex] ?? monthOptions[new Date().getMonth()]
  };
};

export default function CreateGalleryForm() {
  const [title, setTitle] = useState('Midsummer Dreams');
  const [clientName, setClientName] = useState('Ava Laurent');
  const [eventDate, setEventDate] = useState('2025-06-09');
  const [description, setDescription] = useState('A soft documentary collection with editorial lighting and cinematic portraiture.');
  const initialEventParts = getEventParts('2025-06-09');
  const [tagYear, setTagYear] = useState(initialEventParts.year);
  const [tagMonth, setTagMonth] = useState(initialEventParts.month);
  const [venue, setVenue] = useState('Lourensford Wine Estate');
  const [galleryCategory, setGalleryCategory] = useState('Wedding');
  const [customTagInput, setCustomTagInput] = useState('');
  const [customTags, setCustomTags] = useState(['golden hour', 'outdoor ceremony']);
  const [passwordProtected, setPasswordProtected] = useState(true);
  const [heroImage, setHeroImage] = useState(sampleHero);
  const [galleryImages, setGalleryImages] = useState(sampleImages);
  const [selectedCoverDesign, setSelectedCoverDesign] = useState<CoverDesignId>('editorial-banner');
  const objectUrlsRef = useRef<string[]>([]);

  const heroPreview = useMemo(() => heroImage, [heroImage]);
  const galleryTags = useMemo(() => {
    const fixedTags = [tagYear, tagMonth, venue, galleryCategory].map((tag) => tag.trim()).filter(Boolean);
    return [...fixedTags, ...customTags].filter((tag, index, tags) => (
      tags.findIndex((currentTag) => currentTag.toLowerCase() === tag.toLowerCase()) === index
    ));
  }, [customTags, galleryCategory, tagMonth, tagYear, venue]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleHeroUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    objectUrlsRef.current.push(url);
    setHeroImage(url);
    // TODO: Upload hero image to Cloudflare R2 and persist the storage URL here.
  };

  const handleEventDateChange = (value: string) => {
    setEventDate(value);
    const eventParts = getEventParts(value);
    setTagYear(eventParts.year);
    setTagMonth(eventParts.month);
  };

  const handleImagesUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    const urls = files.map((file) => URL.createObjectURL(file));
    objectUrlsRef.current.push(...urls);
    setGalleryImages((current) => [...urls, ...current].slice(0, 12));
    // TODO: Upload gallery images to Cloudflare R2 and attach the returned URLs to gallery metadata.
  };

  const addCustomTag = () => {
    const nextTag = customTagInput.trim();
    if (!nextTag) return;
    if (galleryTags.some((tag) => tag.toLowerCase() === nextTag.toLowerCase())) {
      setCustomTagInput('');
      return;
    }

    setCustomTags((current) => [...current, nextTag]);
    setCustomTagInput('');
  };

  const handleCustomTagKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addCustomTag();
    }
  };

  const removeCustomTag = (tagToRemove: string) => {
    setCustomTags((current) => current.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-800">Gallery title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-800">Client name</label>
            <input value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-800">Event date</label>
            <input type="date" value={eventDate} onChange={(e) => handleEventDateChange(e.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
          </div>
          <div className="flex items-end justify-between rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
            <label className="flex items-center gap-3 text-sm text-slate-800">
              <input type="checkbox" checked={passwordProtected} onChange={(e) => setPasswordProtected(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
              Password protected
            </label>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">Preview</span>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-800">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand">Gallery tags</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Organize the gallery for search and filtering</h2>
            </div>
            <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 shadow-sm">Creator options</span>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <label className="space-y-2 text-sm font-medium text-slate-800">
              Year
              <input value={tagYear} onChange={(event) => setTagYear(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="2026" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-800">
              Month
              <select value={tagMonth} onChange={(event) => setTagMonth(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
                {monthOptions.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-800">
              Venue
              <input value={venue} onChange={(event) => setVenue(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="Venue or location" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-800">
              Gallery type
              <select value={galleryCategory} onChange={(event) => setGalleryCategory(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20">
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
            <label className="space-y-2 text-sm font-medium text-slate-800">
              Custom tags
              <input value={customTagInput} onChange={(event) => setCustomTagInput(event.target.value)} onKeyDown={handleCustomTagKeyDown} className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="Add style, season, package, or client keyword" />
            </label>
            <button type="button" onClick={addCustomTag} className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-800 transition hover:border-brand hover:text-brand">
              Add tag
            </button>
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-950">Tag preview</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {galleryTags.map((tag) => {
                const removable = customTags.includes(tag);
                return (
                  <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
                    {tag}
                    {removable ? (
                      <button type="button" onClick={() => removeCustomTag(tag)} className="text-slate-400 transition hover:text-red-500" aria-label={`Remove ${tag} tag`}>
                        x
                      </button>
                    ) : null}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-800">Upload hero cover image</label>
            <label className="flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center text-sm text-slate-500 transition hover:border-brand hover:text-slate-900">
              <input type="file" accept="image/*" onChange={handleHeroUpload} className="sr-only" />
              Choose hero image or drag here
            </label>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-800">Upload gallery images</label>
            <label className="flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center text-sm text-slate-500 transition hover:border-brand hover:text-slate-900">
              <input type="file" accept="image/*" multiple onChange={handleImagesUpload} className="sr-only" />
              Choose gallery images
            </label>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-sm">
            <div className="relative aspect-[16/10] w-full">
              <img src={heroPreview} alt="Hero preview" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-brand">Preview</p>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Hero cover selection</h2>
            <p className="mt-3 text-slate-600">This image will be used as the album cover preview whenever you share the client link.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {galleryImages.slice(0, 4).map((src, index) => (
                <div key={index} className="overflow-hidden rounded-3xl border border-white bg-white shadow-sm">
                  <div className="relative aspect-[4/3] w-full">
                    <img src={src} alt={`Gallery preview ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand">Cover design</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-950">Choose how clients first see the gallery</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                These options are visual previews for now. The chosen style will be persisted when account storage is added.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {coverDesigns.map((design) => {
              const selected = selectedCoverDesign === design.id;
              return (
                <button
                  key={design.id}
                  type="button"
                  onClick={() => setSelectedCoverDesign(design.id)}
                  className={`rounded-[28px] border bg-white p-3 text-left transition ${
                    selected
                      ? 'border-brand shadow-soft ring-2 ring-brand/20'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-soft'
                  }`}
                >
                  <GalleryCoverPreview
                    design={design.id}
                    title={title}
                    clientName={clientName}
                    eventDate={eventDate}
                    passwordProtected={passwordProtected}
                    size="thumb"
                  />
                  <div className="mt-4 px-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-950">{design.name}</p>
                      {selected ? (
                        <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">Selected</span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{design.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="mb-4 text-sm font-semibold text-slate-900">Selected cover preview</p>
            <div className="grid gap-6 xl:grid-cols-[1fr_320px] xl:items-start">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Desktop</p>
                <GalleryCoverPreview
                  design={selectedCoverDesign}
                  title={title}
                  clientName={clientName}
                  eventDate={eventDate}
                  passwordProtected={passwordProtected}
                  size="large"
                />
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Mobile</p>
                <div className="mx-auto max-w-[330px] rounded-[48px] border border-slate-800 bg-slate-950 p-3 shadow-[0_28px_80px_rgba(15,23,42,0.26)]">
                  <div className="relative rounded-[38px] border border-white/10 bg-slate-900 p-2">
                    <div className="absolute left-1/2 top-3 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-slate-950 shadow-sm" />
                    <div className="absolute right-[88px] top-[18px] z-20 h-2 w-2 rounded-full bg-slate-700" />
                    <div className="overflow-hidden rounded-[32px] bg-white pt-5">
                      <GalleryCoverPreview
                        design={selectedCoverDesign}
                        title={title}
                        clientName={clientName}
                        eventDate={eventDate}
                        passwordProtected={passwordProtected}
                        size="mobile"
                      />
                    </div>
                    <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-white/35" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 text-slate-700">
            <p className="font-medium text-slate-950">Gallery setup</p>
          <ul className="mt-4 space-y-2 text-sm leading-6">
            <li>Choose the cover image clients see before opening the gallery.</li>
            <li>Add tags such as year, month, venue, type, and custom keywords for future search and filtering.</li>
            <li>Pick a cover design that matches the tone of the session.</li>
            <li>Review the desktop and mobile previews before sharing the link.</li>
          </ul>
        </div>

        <button className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-600">
          Save gallery preview
        </button>
      </div>
    </div>
  );
}
