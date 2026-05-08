import CreateGalleryForm from '@/components/CreateGalleryForm';

export default function CreateGalleryPage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-brand">Create gallery</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Start a new private album</h1>
          <p className="mt-4 text-slate-600">Build beautiful client deliveries with a cover hero image, password protection, and a curated gallery preview.</p>
        </div>
        <CreateGalleryForm />
      </div>
    </section>
  );
}
