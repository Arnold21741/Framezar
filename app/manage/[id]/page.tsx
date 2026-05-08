import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGalleryById } from '@/lib/demo-data';

interface PageProps {
  params: { id: string };
}

export default function ManageGalleryPage({ params }: PageProps) {
  const gallery = getGalleryById(params.id);
  if (!gallery) {
    notFound();
  }

  return (
    <section className="page-container py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.6fr]">
        <div className="space-y-6">
          <div className="card-surface overflow-hidden">
            <div className="relative h-96 w-full bg-slate-100">
              <img src={gallery.heroImage} alt={gallery.title} className="h-full w-full object-cover" />
            </div>
            <div className="p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-brand">Manage gallery</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-950">{gallery.title}</h1>
              <p className="mt-3 text-slate-600">{gallery.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{gallery.clientName}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{gallery.eventDate}</span>
                {gallery.passwordProtected ? (
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-sm text-rose-700">Password protected</span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Public link ready</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="card-surface p-8">
              <h2 className="text-xl font-semibold text-slate-950">Link settings</h2>
              <p className="mt-3 text-slate-600">Prepare this gallery for private sharing, password access, or expiring links in a future release.</p>
              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <p>• Password protection placeholder</p>
                <p>• Expiring client links placeholder</p>
                <p>• Watermark preview placeholder</p>
              </div>
            </div>
            <div className="card-surface p-8">
              <h2 className="text-xl font-semibold text-slate-950">Client delivery</h2>
              <p className="mt-3 text-slate-600">Use the private gallery link below to send the album to your client.</p>
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
                <p className="font-semibold text-slate-900">https://framezar.com/gallery/{gallery.id}</p>
                <p className="mt-2 text-slate-500">Copy this link and share it in your client message.</p>
              </div>
            </div>
          </div>

          <div className="card-surface p-8">
            <h2 className="text-xl font-semibold text-slate-950">Gallery images</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {gallery.images.map((image) => (
                <div key={image.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                  <img src={image.src} alt={image.title} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-slate-950">{image.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="space-y-6">
          <div className="card-surface p-8">
            <h2 className="text-xl font-semibold text-slate-950">Gallery actions</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <p>• Re-order gallery images</p>
              <p>• Add or update password protection</p>
              <p>• Set download size options: Web, High resolution, Original</p>
              <p>• Mark favorites and prepare client favorites collection</p>
            </div>
          </div>
          <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-brand">Preview</p>
            <p className="mt-4 text-slate-600">Open the client view to see how the album appears to your client.</p>
            <Link href={`/gallery/${gallery.id}`} className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Open gallery preview
            </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
