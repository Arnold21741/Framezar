import Link from 'next/link';
import PricingCard from '@/components/PricingCard';
import { CurrencySelector } from '@/hooks/useCurrency';
import { planDetails, trialConfig } from '@/lib/pricing';
import type { PricingPlanId } from '@/lib/pricing';

const orderedPlans: PricingPlanId[] = ['basic', 'pro', 'premium', 'luxury'];

export default function PricingPage() {
  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-6xl space-y-16">
        <div className="text-center space-y-6">
          <p className="text-sm uppercase tracking-[0.35em] text-brand">Pricing</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Simple pricing for beautiful client delivery
          </h1>
          <p className="max-w-2xl mx-auto text-lg leading-8 text-slate-600">
            Choose the right delivery tier for your business. All plans include private client links, polished gallery experiences, and room to grow.
          </p>
          <div className="flex justify-center">
            <CurrencySelector />
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 px-6 py-8 text-left">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-950">Free Trial</p>
                <p className="mt-1 text-sm text-slate-600">{trialConfig.storageGB} GB</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">
                Trial
              </span>
            </div>
            <p className="mt-6 text-sm leading-6 text-slate-600">Try Framezar free for {trialConfig.durationDays} days with {trialConfig.storageGB} GB of storage. No credit card required.</p>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-4xl font-bold text-slate-950">Free</span>
            </div>
          </div>

          {orderedPlans.map((id) => {
            const plan = planDetails[id];
            return (
              <PricingCard
                key={id}
                id={id}
                name={plan.name}
                storage={plan.storage}
                description={plan.description}
                label={plan.label}
                highlight={plan.highlight}
              />
            );
          })}
        </div>

        <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-semibold text-slate-950">All plans include</h2>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand rounded-full"></div>
                  Unlimited private client galleries
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand rounded-full"></div>
                  Premium album layouts and lightbox viewing
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand rounded-full"></div>
                  Social sharing and download options
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand rounded-full"></div>
                  Mobile-first responsive design
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand rounded-full"></div>
                  Future Cloudflare R2 storage integration
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand rounded-full"></div>
                  Password protection and expiring links (coming soon)
                </li>
              </ul>
            </div>
            <div className="rounded-[28px] bg-slate-50 p-8">
              <h3 className="mb-4 text-xl font-semibold text-slate-950">Built for launch-stage studios</h3>
              <div className="space-y-4 text-sm leading-6 text-slate-600">
                <p>Keep client delivery focused, affordable, and simple while your studio grows.</p>
                <p>Upgrade storage when you need more room, without adding unnecessary commerce or studio-management complexity.</p>
                <p className="font-semibold text-slate-950">All prices are shown monthly and can be localized with the currency selector above.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-3xl font-semibold text-slate-950">Ready to get started?</h2>
          <p className="text-slate-600">Join thousands of photographers delivering their work beautifully.</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup" className="dark-glass-button inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold">
              Start free trial
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
