import Link from 'next/link';

export default function EarlyAccessPage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
        <div className="card-surface p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-brand">Early access</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Help shape Framezar before public launch.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            We are inviting photographers and small studios to test the first production release, share feedback, and get launch pricing before the full rollout.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:hello@framezar.com?subject=Framezar early access"
              className="dark-glass-button inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold"
            >
              Request early access
            </a>
            <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-base font-semibold text-slate-950 transition hover:border-slate-300">
              View pricing
            </Link>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-slate-950">What early users get</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <li>Priority onboarding and direct feedback access.</li>
              <li>Launch pricing on the first paid tiers.</li>
              <li>Influence over gallery, download, and client review features.</li>
            </ul>
          </div>
          <div className="rounded-[32px] border border-slate-200/70 bg-skySoft p-8">
            <h2 className="text-2xl font-semibold text-slate-950">Best fit</h2>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Wedding, portrait, event, and studio photographers who need clean private delivery without a heavy studio-management suite.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
