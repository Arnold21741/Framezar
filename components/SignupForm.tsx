'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function SignupForm({ authReady }: { authReady: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [chosenPlan, setChosenPlan] = useState(plans[1].id);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });
  const { currency, loading } = useCurrency();

  const selectedPlan = plans.find((plan) => plan.id === chosenPlan) ?? plans[0];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingSubmit(true);
    setStatus({ type: 'idle', message: '' });

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password, chosenPlan })
    });

    const payload = await response.json();
    setLoadingSubmit(false);

    if (!response.ok) {
      setStatus({ type: 'error', message: payload.error ?? 'Unable to create account.' });
      return;
    }

    if (payload.requiresEmailConfirmation) {
      setStatus({ type: 'success', message: 'Account created. Check your email to confirm your login before opening the dashboard.' });
      return;
    }

    setStatus({ type: 'success', message: 'Account created. Opening your dashboard...' });
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-brand">Create your account</p>
          <h1 className="text-3xl font-semibold text-slate-950">Start delivering galleries with Framezar.</h1>
          <p className="text-slate-600">Choose your storage tier and create client delivery links from your account dashboard.</p>
        </div>

        {!authReady ? (
          <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            Add your Supabase URL and anon key to <span className="font-semibold">.env.local</span> to enable live account creation.
          </div>
        ) : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-900">
            Full name
            <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="Lena Reed" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-900">
            Email address
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="you@studio.com" required />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-900">
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" placeholder="At least 8 characters" minLength={8} required />
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

        <button type="submit" disabled={!authReady || loadingSubmit} className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60">
          {loadingSubmit ? 'Creating account...' : 'Create account'}
        </button>

        {status.message ? (
          <div className={`rounded-[32px] border p-5 text-sm ${status.type === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
            <p className="font-semibold">{status.type === 'error' ? 'Signup needs attention.' : 'Account update'}</p>
            <p className="mt-2">{status.message}</p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
