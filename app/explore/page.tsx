import GalleryCard from '@/components/GalleryCard';
import DeliveryCard from '@/components/DeliveryCard';
import { galleries, demoAccount } from '@/lib/demo-data';
import Link from 'next/link';

export default function ExplorePage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-brand">Explore galleries</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Showcase client delivery that looks and feels premium.
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
            Every gallery can be tailored with cover imagery, clean album layouts, client notes and download-ready assets. Clients can browse, favorite, and download images in one polished experience.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-950">Custom presentation for every client</h2>
            <p className="mt-4 text-slate-600">
              Choose a unique gallery cover, custom title, event details and client message for every delivery. Your clients see a premium portfolio-style presentation — not a plain file list.
            </p>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>• Custom cover image and headline for each album</li>
              <li>• Branded layouts with polished spacing and typography</li>
              <li>• Password protection or private link controls</li>
            </ul>
          </div>

          <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-950">Client tools for favorites and downloads</h2>
            <p className="mt-4 text-slate-600">
              Clients can quickly mark favorite images, review highlights, and download selected files or full image packs — all within the gallery experience.
            </p>
            <ul className="mt-6 space-y-4 text-slate-600">
              <li>• Heart favorite images as they browse</li>
              <li>• Preview full-screen images without leaving the gallery</li>
              <li>• Download web-ready or high-resolution images in one click</li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-[32px] border border-slate-200/70 bg-slate-50 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Elegant layout</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">Gallery styling that feels editorial</p>
            </div>
            <div className="rounded-[32px] border border-slate-200/70 bg-slate-50 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Downloads</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">Share download options with every delivery</p>
            </div>
            <div className="rounded-[32px] border border-slate-200/70 bg-slate-50 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Favorites</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">Allow clients to mark standout images</p>
            </div>
            <div className="rounded-[32px] border border-slate-200/70 bg-slate-50 p-6 text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Fast access</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">Private links, secure sharing, and polished previews</p>
            </div>
          </div>
        </div>

        {demoAccount.showcaseEnabled ? (
          <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-brand">Photographer showcase</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">Featured photographer: {demoAccount.name}</h2>
                <p className="mt-4 max-w-2xl text-slate-600">When enabled, your logo and portfolio previews appear on public pages so prospective clients can see your delivery style before they reach out.</p>
              </div>
              <div className="flex items-center gap-4 rounded-3xl bg-slate-50 p-4">
                <div className="h-16 w-16 overflow-hidden rounded-3xl bg-slate-100">
                  <img src={demoAccount.photographerLogo} alt={`${demoAccount.name} logo`} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Showcase status</p>
                  <p className="text-lg font-semibold text-slate-950">Enabled</p>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {galleries.slice(0, 2).map((gallery) => (
                <div key={gallery.id} className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
                  <img src={gallery.heroImage} alt={gallery.title} className="h-52 w-full object-cover" />
                  <div className="p-5">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{gallery.clientName}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">{gallery.title}</h3>
                    <p className="mt-3 text-sm text-slate-600">{gallery.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-[32px] border border-slate-200/70 bg-slate-50 p-8 text-slate-600 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-brand">Photographer showcase</p>
            <p className="mt-4 text-lg font-semibold text-slate-950">Showcase is available from the account page.</p>
            <p className="mt-3">Enable the website showcase option in your account to feature your studio logo and sample deliveries across Explore pages.</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <DeliveryCard
              title="Brand-first delivery"
              photographer="Light House Studios"
              subtitle="A clean cover card with left-aligned logo placement for polished client presentations."
              initialSide="left"
              defaultImage="https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1200&q=80"
              layout="stacked"
              showControls={false}
            />
            <DeliveryCard
              title="Editorial showcase"
              photographer="Mira Photography"
              subtitle="Logo on the right and a bold image frame for magazine-style portfolio delivery."
              initialSide="right"
              defaultImage="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
              layout="stacked"
              showControls={false}
            />
            <DeliveryCard
              title="Client-ready launch"
              photographer="Noir Visuals"
              subtitle="Flexible hero area with on-brand layout and premium visual hierarchy."
              initialSide="left"
              defaultImage="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80"
              layout="stacked"
              showControls={false}
            />
          </div>
        </div>

        <div className="space-y-6 rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand">Build a delivery card</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">Drag a hero image into the card</h2>
            </div>
              <Link href="/early-access" className="dark-glass-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold">
                Create your gallery
              </Link>
          </div>

          <DeliveryCard
            title="Interactive delivery card"
            photographer="Your studio logo"
            subtitle="Choose which side the badge appears on and drop a hero image into the card."
            initialSide="left"
            defaultImage="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
            editable
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-brand">Live gallery examples</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-950">See how client work appears in Framezar</h2>
            </div>
            <Link href="/early-access" className="dark-glass-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold">
              Request early access
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {galleries.slice(0, 3).map((gallery) => (
              <GalleryCard key={gallery.id} gallery={gallery} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
