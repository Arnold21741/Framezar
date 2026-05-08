import Link from 'next/link';
import { demoAccount } from '@/lib/demo-data';
import DeliveryLinksManager from '@/components/DeliveryLinksManager';
import PhotographerShowcaseSettings from '@/components/PhotographerShowcaseSettings';

export default function AccountPage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-10 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-brand">Account overview</p>
            <h1 className="mt-4 text-4xl font-semibold text-slate-950">{demoAccount.name}</h1>
            <p className="mt-3 text-slate-600">{demoAccount.email}</p>

            <div className="mt-8 flex flex-col gap-6 rounded-[28px] bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-3xl bg-slate-100">
                  <img src={demoAccount.photographerLogo} alt={`${demoAccount.name} logo`} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Studio logo</p>
                  <p className="mt-2 text-xl font-semibold text-slate-950">{demoAccount.name}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-500">Showcase on website</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{demoAccount.showcaseEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Plan</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{demoAccount.planName}</p>
                <p className="mt-2 text-sm text-slate-600">{demoAccount.storageLimit} storage</p>
              </div>
              <div className="rounded-[28px] bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Storage used</p>
                <p className="mt-3 text-2xl font-semibold text-slate-950">{demoAccount.usedStorage}</p>
                <p className="mt-2 text-sm text-slate-600">{demoAccount.storageUsedPercentage}% of your plan used</p>
              </div>
            </div>
          </div>

          <DeliveryLinksManager />
        </div>

        <aside className="space-y-6">
          <PhotographerShowcaseSettings
            initialShowcaseEnabled={demoAccount.showcaseEnabled}
            photographerLogo={demoAccount.photographerLogo}
            photographerName={demoAccount.name}
          />

          <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-brand">Your plan</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Plan name</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{demoAccount.planName}</p>
              </div>
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Storage limit</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{demoAccount.storageLimit}</p>
              </div>
              <div className="rounded-[28px] bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Current galleries</p>
                <p className="mt-2 text-xl font-semibold text-slate-950">{demoAccount.galleries}</p>
              </div>
            </div>
          </div>
          <Link href="/dashboard" className="inline-flex w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
            Go to gallery dashboard
          </Link>
        </aside>
      </div>
    </section>
  );
}
