'use client';

import { useState } from 'react';
import { galleries } from '@/lib/demo-data';

type DeliveryLink = {
  id: string;
  galleryId: string;
  galleryTitle: string;
  clientName: string;
  url: string;
  createdAt: string;
  expiresAt?: string;
};

const demoLinks: DeliveryLink[] = [
  {
    id: 'link-1',
    galleryId: 'midsummer-dreams',
    galleryTitle: 'Midsummer Dreams',
    clientName: 'Ava Laurent',
    url: 'https://framezar.com/gallery/midsummer-dreams',
    createdAt: 'Apr 25, 2025'
  },
  {
    id: 'link-2',
    galleryId: 'studio-sessions',
    galleryTitle: 'Studio Session Edit',
    clientName: 'Mila & Co.',
    url: 'https://framezar.com/gallery/studio-sessions',
    createdAt: 'Mar 16, 2025'
  }
];

export default function DeliveryLinksManager() {
  const [links, setLinks] = useState<DeliveryLink[]>(demoLinks);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (url: string, linkId: string) => {
    if (!navigator.clipboard) {
      setCopied(null);
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(linkId);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  };

  const createNewLink = (galleryId: string) => {
    const gallery = galleries.find((g) => g.id === galleryId);
    if (!gallery) return;

    const newLink: DeliveryLink = {
      id: `link-${Date.now()}`,
      galleryId,
      galleryTitle: gallery.title,
      clientName: gallery.clientName,
      url: `https://framezar.com/gallery/${galleryId}`,
      createdAt: new Date().toLocaleDateString()
    };

    setLinks((current) => [newLink, ...current]);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand">Active delivery links</p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">{links.length} galleries ready to share</h2>
          </div>
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
            {links.length}/{galleries.length} galleries
          </div>
        </div>
        <p className="mt-4 text-slate-600">Copy and send these private links to your clients. Each link opens a beautiful, personalized album view.</p>

        <div className="mt-8 space-y-3">
          {links.map((link) => (
            <div key={link.id} className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-slate-950">{link.galleryTitle}</p>
                <p className="mt-1 text-sm text-slate-600">{link.clientName}</p>
                <p className="mt-2 truncate rounded-full bg-white px-3 py-1 text-xs font-mono text-slate-500">{link.url}</p>
                <p className="mt-2 text-xs text-slate-500">Created {link.createdAt}</p>
              </div>
              <button
                onClick={() => copyToClipboard(link.url, link.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  copied === link.id
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-brand hover:text-brand'
                }`}
              >
                {copied === link.id ? '✓ Copied' : 'Copy link'}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.35em] text-brand">Create new links</p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-950">Generate delivery links for galleries</h2>
        <p className="mt-4 text-slate-600">Select a gallery from your account to create a new private delivery link.</p>

        <div className="mt-6 grid gap-3">
          {galleries.map((gallery) => {
            const hasLink = links.some((link) => link.galleryId === gallery.id);
            return (
              <button
                key={gallery.id}
                onClick={() => !hasLink && createNewLink(gallery.id)}
                disabled={hasLink}
                className={`rounded-[28px] px-6 py-4 text-left transition ${
                  hasLink
                    ? 'border border-slate-200 bg-slate-50 text-slate-600'
                    : 'border border-slate-200 bg-white hover:border-brand hover:text-brand'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-950">{gallery.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{gallery.clientName}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">
                    {hasLink ? '✓ Has link' : '+ Create link'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
