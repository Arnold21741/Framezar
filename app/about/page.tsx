import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-brand">About us</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Built for photographers who want better client delivery.
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
            Framezar was created to replace clunky file dumps with graceful, professional gallery experiences — so photographers can deliver work that feels premium and easy to use.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_0.65fr] lg:items-start">
          <div className="space-y-8 rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Our story</h2>
              <p className="mt-4 text-slate-600">
                Framezar began as a photographer's side project in 2024. After delivering countless client galleries by email and file share, we realized the process needed to feel curated, not chaotic.
              </p>
              <p className="mt-4 text-slate-600">
                Today, Framezar helps creatives present galleries with beautiful cover imagery, easy favorite marking, download-ready assets, and private delivery links that clients actually enjoy using.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-950">What we believe</h2>
              <ul className="mt-4 space-y-4 text-slate-600">
                <li>• Every gallery should feel like a premium client experience.</li>
                <li>• Delivering images should be simple for both photographers and clients.</li>
                <li>• Favorites, downloads, and clean presentation matter more than extra bells.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-950">Why Framezar</h2>
              <p className="mt-4 text-slate-600">
                We focus on polished galleries, fast previews, and the small details that make client delivery memorable — from hero album covers to download and favorites controls built into every gallery.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="dark-glass rounded-[32px] p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-300">Our mission</p>
              <h2 className="mt-4 text-2xl font-semibold">Deliver images beautifully.</h2>
              <p className="mt-4 text-slate-300">
                We help pros preserve the moment when clients view their work — not just send photos.
              </p>
            </div>
            <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
              <h3 className="text-xl font-semibold text-slate-950">What we offer</h3>
              <div className="mt-5 space-y-4 text-slate-600">
                <p>• Private galleries with elegant delivery pages.</p>
                <p>• Client favorites and download-ready options.</p>
                <p>• Simple, straightforward pricing and fast setup.</p>
              </div>
            </div>
            <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Join us</p>
              <p className="mt-3 text-slate-600">Make your client galleries feel more premium from day one.</p>
              <Link href="/signup" className="dark-glass-button mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold">
                Start your free trial
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
