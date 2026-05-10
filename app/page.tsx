import Link from 'next/link';
import PricingCard from '@/components/PricingCard';
import { trialConfig } from '@/lib/pricing';

export default function HomePage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl space-y-8">
          <p className="inline-flex rounded-full bg-skySoft px-4 py-2 text-sm font-semibold uppercase tracking-[0.35em] text-brand">
            Premium image delivery
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Deliver your work beautifully.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            Framezar is built for photographers who want private client galleries that feel like a premium photo album — not a file browser.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/early-access" className="dark-glass-button inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold">
              Request early access
            </Link>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-950 transition hover:border-slate-300">
              View pricing
            </Link>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="card-surface overflow-hidden rounded-[32px]">
            <div className="relative h-80 w-full overflow-hidden bg-slate-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.42),transparent_32%),radial-gradient(circle_at_78%_10%,rgba(55,114,255,0.34),transparent_26%),linear-gradient(145deg,#111827_0%,#1f2937_44%,#dbeafe_100%)]" />
              <div className="absolute inset-x-6 bottom-6 rounded-[28px] border border-white/20 bg-white/90 p-4 shadow-2xl backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand">Client gallery</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">Midsummer Dreams</h2>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="h-20 rounded-2xl bg-[linear-gradient(135deg,#f8fafc,#bae6fd_45%,#0f172a)]" />
                  <div className="h-20 rounded-2xl bg-[linear-gradient(135deg,#e0f2fe,#64748b_50%,#f8fafc)]" />
                  <div className="h-20 rounded-2xl bg-[linear-gradient(135deg,#172554,#93c5fd_55%,#ffffff)]" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="card-surface rounded-[32px] p-8">
              <h2 className="text-xl font-semibold text-slate-950">Designed for image-first delivery</h2>
              <p className="mt-4 text-slate-600">From hero cover images to full-screen previews, Framezar keeps the focus where it belongs — on the photographs.</p>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-skySoft p-8">
              <h3 className="text-sm uppercase tracking-[0.35em] text-slate-500">What you get</h3>
              <ul className="mt-6 space-y-4 text-slate-700">
                <li>Private client links with elegant album layouts.</li>
                <li>Portfolio-ready gallery presentation.</li>
                <li>Fast image viewing, lightbox navigation, and sharing.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-24 rounded-[32px] border border-slate-200/70 bg-white/95 px-8 py-12 shadow-soft">
        <div className="grid gap-12 lg:grid-cols-3 lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Built for creatives</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-950">Everything needed for premium photo delivery.</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-950">Elegant client albums</h3>
              <p className="mt-3 text-slate-600">Private galleries with hero cover images, centered layouts, and high-end typography.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-950">Fast, polished previews</h3>
              <p className="mt-3 text-slate-600">Large image cards, lightbox navigation, and beautifully spaced compositions.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-950">Private delivery controls</h3>
              <p className="mt-3 text-slate-600">Plan clean gallery access with password options, expiring links, and watermark-ready previews.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-950">No checkout needed</h3>
              <p className="mt-3 text-slate-600">A streamlined delivery first experience, intentionally designed without commerce distractions.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-glass mt-20 grid gap-8 rounded-[32px] px-8 py-12 sm:grid-cols-3">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Flexible pricing</p>
          <h3 className="text-2xl font-semibold">Plans for every photographer</h3>
          <p className="text-slate-300">Pricing updates based on your location and currency.</p>
          <Link href="/pricing" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300 transition">
            View all pricing details →
          </Link>
        </div>
        <div className="dark-glass rounded-[28px] px-6 py-8 text-left">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-lg font-semibold text-white">Free Trial</p>
              <p className="mt-1 text-sm text-slate-400">{trialConfig.storageGB} GB</p>
            </div>
            <span className="rounded-full bg-slate-700 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
              Trial
            </span>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-400">Try Framezar free for {trialConfig.durationDays} days with {trialConfig.storageGB} GB of storage.</p>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white">Free</span>
          </div>
        </div>
          <PricingCard
          id="pro"
          name="Pro"
          storage="15 GB"
          description="15 GB client delivery for launch-stage photography studios."
          label="Popular"
          highlight
          tone="dark"
        />
      </section>
    </section>
  );
}
