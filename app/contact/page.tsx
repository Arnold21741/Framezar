export default function ContactPage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-3xl rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft sm:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-brand">Contact</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Talk to Framezar.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          For early access, support, partnerships, or launch questions, email the team and we will reply as soon as possible.
        </p>
        <a
          href="mailto:hello@framezar.com"
          className="dark-glass-button mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold"
        >
          hello@framezar.com
        </a>
      </div>
    </section>
  );
}
