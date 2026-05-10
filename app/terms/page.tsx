export default function TermsPage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft sm:p-10">
        <p className="text-sm uppercase tracking-[0.35em] text-brand">Terms</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-950">Terms of Service</h1>
        <div className="mt-8 space-y-6 text-sm leading-7 text-slate-600">
          <p>Framezar is currently an early-access product. By requesting access or using preview features, you agree to use the service responsibly and only upload content you have the right to manage.</p>
          <p>Photographers remain responsible for their images, client permissions, download settings, and shared gallery links.</p>
          <p>Paid subscriptions, storage limits, cancellation terms, and production support commitments will be finalized before full public launch.</p>
          <p>For questions about these terms, contact hello@framezar.com.</p>
        </div>
      </div>
    </section>
  );
}
