import Link from 'next/link';
import type { DemoGallery } from '@/lib/demo-data';

const coverStyles: Record<string, string> = {
  'midsummer-dreams': 'bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.92),transparent_24%),radial-gradient(circle_at_72%_22%,rgba(186,230,253,0.9),transparent_28%),linear-gradient(135deg,#0f172a_0%,#1e293b_38%,#dbeafe_100%)]',
  'studio-sessions': 'bg-[radial-gradient(circle_at_74%_18%,rgba(255,255,255,0.88),transparent_22%),radial-gradient(circle_at_28%_70%,rgba(147,197,253,0.82),transparent_30%),linear-gradient(135deg,#111827_0%,#64748b_48%,#f8fafc_100%)]'
};

export default function GalleryCard({ gallery }: { gallery: DemoGallery }) {
  const coverClass = coverStyles[gallery.id] ?? 'bg-[linear-gradient(135deg,#0f172a,#93c5fd,#f8fafc)]';

  return (
    <article className="card-surface overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className={`relative h-72 w-full overflow-hidden ${coverClass}`}>
        <div className="absolute inset-x-6 bottom-6 rounded-[28px] border border-white/25 bg-white/90 p-4 shadow-2xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand">Client gallery</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">{gallery.title}</h2>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="h-16 rounded-2xl bg-[linear-gradient(135deg,#f8fafc,#bae6fd_45%,#0f172a)]" />
            <div className="h-16 rounded-2xl bg-[linear-gradient(135deg,#e0f2fe,#64748b_50%,#f8fafc)]" />
            <div className="h-16 rounded-2xl bg-[linear-gradient(135deg,#172554,#93c5fd_55%,#ffffff)]" />
          </div>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Client gallery</p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">{gallery.title}</h3>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">{gallery.imageCount} images</span>
        </div>
        <p className="text-sm leading-6 text-slate-600">{gallery.description}</p>
        <div className="flex flex-wrap gap-2">
          {gallery.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/70 pt-4 text-sm text-slate-600">
          <span>{gallery.clientName}</span>
          <span>{gallery.createdAt}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={`/gallery/${gallery.id}`} className="dark-glass-button inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium">
            Share link
          </Link>
          <Link href={`/manage/${gallery.id}`} className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950">
            Manage
          </Link>
        </div>
      </div>
    </article>
  );
}
