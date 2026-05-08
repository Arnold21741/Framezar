import SignupForm from '@/components/SignupForm';

export default function SignupPage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-4xl space-y-10">
        <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
          <p className="text-sm uppercase tracking-[0.35em] text-brand">Create an account</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-950">Build your Framezar account and start delivering albums.</h1>
          <p className="mt-4 text-slate-600">Start with a free 14-day trial with 2 GB of storage, or choose a paid plan. Create private delivery links and keep your galleries organized in one premium dashboard.</p>
        </div>
        <SignupForm />
      </div>
    </section>
  );
}
