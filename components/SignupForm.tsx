'use client';

import { useState } from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice, basePrices, planDetails, trialConfig } from '@/lib/pricing';
import type { PricingPlanId } from '@/lib/pricing';

const plans = [
  {
    id: 'trial',
    name: 'Free Trial',
    storage: `${trialConfig.storageGB} GB`,
    description: `Try Framezar free for ${trialConfig.durationDays} days. No credit card required.`,
    label: 'Trial'
  },
  {
    id: 'basic',
    ...planDetails.basic
  },
  {
    id: 'pro',
    ...planDetails.pro
  },
  {
    id: 'premium',
    ...planDetails.premium
  },
  {
    id: 'luxury',
    ...planDetails.luxury
  }
];

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [chosenPlan, setChosenPlan] = useState(plans[1].id);
  const [submitted, setSubmitted] = useState(false);
  const { currency, loading } = useCurrency();

  const selectedPlan = plans.find((plan) => plan.id === chosenPlan) ?? plans[0];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-brand">Create your account</p>
          <h1 className="text-3xl font-semibold text-slate-950">Start delivering galleries with Framezar.</h1>
          <p className="text-slate-600">Choose your storage tier and create client delivery links from your account dashboard.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-900">
            Full name
            <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="Lena Reed" />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-900">
            Email address
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="you@studio.com" />
          </label>
        </div>

        <div>
          <p className="text-sm font-medium text-slate-900">Choose storage size</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => {
              const priceUsd = plan.id === 'trial' ? 0 : basePrices[plan.id as PricingPlanId];
              const displayedPrice = plan.id === 'trial' ? 'Free' : displayPrice(priceUsd, currency);

              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setChosenPlan(plan.id)}
                  className={`rounded-[28px] border px-5 py-6 text-left transition ${chosenPlan === plan.id ? 'border-brand bg-brand/10 shadow-soft' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-lg font-semibold text-slate-950">{plan.name}</p>
                      <p className="mt-1 text-sm text-slate-600">{plan.storage}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">
                      {plan.label}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{plan.description}</p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-slate-950">{loading ? '—' : displayedPrice}</span>
                    {priceUsd > 0 && <span className="text-xs text-slate-500">{currency}/mo</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-6 text-slate-700">
          <p className="text-sm font-semibold text-slate-950">Your storage details</p>
          <p className="mt-3 text-sm leading-6">Pricing is automatically converted to your local currency: <span className="font-semibold text-slate-950">{currency}</span>. Once created, your account will let you create private gallery links, manage albums, and deliver polished client experiences. Storage tier selection determines how much media you can store in your library.</p>
          <p className="mt-4 text-sm text-slate-600">Selected plan: <span className="font-semibold text-slate-950">{selectedPlan.name}</span> / {selectedPlan.storage}</p>
        </div>

        <button type="submit" className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-600">
          Create account
        </button>

        {submitted ? (
          <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-800">
            <p className="font-semibold">Account created.</p>
            <p className="mt-2">This is a demo signup flow. Your account dashboard will appear after signup in a future integration.</p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
