'use client';

import { useCurrency } from '@/hooks/useCurrency';
import { displayPrice, basePrices, PricingPlanId } from '@/lib/pricing';

type PricingCardProps = {
  id: PricingPlanId;
  name: string;
  storage: string;
  description: string;
  label: string;
  highlight?: boolean;
  tone?: 'light' | 'dark';
};

const tierFontClasses: Record<PricingCardProps['id'], string> = {
  basic: 'font-sans',
  pro: 'font-semibold font-sans',
  premium: 'font-serif',
  luxury: 'font-serif italic'
};

export default function PricingCard({
  id,
  name,
  storage,
  description,
  label,
  highlight,
  tone = 'light'
}: PricingCardProps) {
  const { currency, loading } = useCurrency();
  const priceUsd = basePrices[id];
  const displayedPrice = displayPrice(priceUsd, currency);
  const tierClass = tierFontClasses[id];
  const isDark = tone === 'dark';

  return (
    <div
      className={`rounded-[28px] border px-6 py-8 text-left transition ${
        isDark
          ? 'dark-glass shadow-soft'
          : highlight
            ? 'border-brand bg-brand/10 shadow-soft'
            : 'border-slate-200 bg-slate-50 hover:border-slate-300'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className={`text-lg ${tierClass} ${isDark ? 'text-white' : 'text-slate-950'}`}>{name}</p>
          <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{storage}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] ${isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
          {label}
        </span>
      </div>
      <p className={`mt-6 text-sm leading-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{description}</p>
      <div className="mt-6 flex items-baseline gap-2">
        <span className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>{loading ? '—' : displayedPrice}</span>
        {priceUsd > 0 && <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{currency}/month</span>}
      </div>
    </div>
  );
}
