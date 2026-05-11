import Link from 'next/link';
import { galleries, demoAccount } from '@/lib/demo-data';
import GalleryCard from '@/components/GalleryCard';
import LogoutButton from '@/components/LogoutButton';
import { getCurrentUser } from '@/lib/auth-server';

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const displayName = user?.user_metadata?.full_name ?? demoAccount.name;
  const displayEmail = user?.email ?? demoAccount.email;

  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mb-12 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-brand">Photographer dashboard</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Your client galleries</h1>
            <p className="mt-4 max-w-2xl text-slate-600">Monitor your active albums, share private links, and manage gallery settings from one polished workspace.</p>
          </div>
          <Link href="/create" className="dark-glass-button inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold">
            Create new gallery
          </Link>
        </div>

        <div className="grid gap-6 rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft sm:grid-cols-3">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Account</p>
            <p className="text-xl font-semibold text-slate-950">{displayName}</p>
            <p className="text-sm text-slate-600">{displayEmail}</p>
            {user ? <div className="mt-4"><LogoutButton /></div> : null}
          </div>
          <div className="rounded-[28px] bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Storage</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{demoAccount.storageLimit}</p>
            <p className="mt-2 text-sm text-slate-600">{demoAccount.usedStorage} used</p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Delivery links</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{demoAccount.deliveryLinks}</p>
            <p className="mt-2 text-sm text-slate-600">Ready for client delivery.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {galleries.map((gallery) => (
          <GalleryCard key={gallery.id} gallery={gallery} />
        ))}
      </div>
    </section>
  );
}
