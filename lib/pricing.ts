// Pricing in USD (base currency)
export type PricingPlanId = 'basic' | 'pro' | 'premium' | 'luxury';

export const planDetails: Record<PricingPlanId, {
  label: string;
  name: string;
  storage: string;
  description: string;
  highlight?: boolean;
  fontClass: string;
}> = {
  basic: {
    label: 'Basic',
    name: 'Basic',
    storage: '5 GB',
    description: 'Perfect for testing and small projects.',
    fontClass: 'font-sans'
  },
  pro: {
    label: 'Popular',
    name: 'Pro',
    storage: '15 GB',
    description: 'Gallery delivery that undercuts comparable 15 GB plans.',
    highlight: true,
    fontClass: 'font-semibold font-sans'
  },
  premium: {
    label: 'Premium',
    name: 'Premium',
    storage: '100 GB',
    description: 'A larger studio tier priced below comparable 100 GB plans.',
    fontClass: 'font-serif'
  },
  luxury: {
    label: 'Luxury',
    name: 'Luxury',
    storage: '500 GB',
    description: 'High-volume delivery for studios that need serious storage.',
    fontClass: 'font-serif italic'
  }
};

export const basePrices: Record<PricingPlanId, number> = {
  basic: 0,
  pro: 4,
  premium: 14,
  luxury: 31
};

// Trial configuration
export const trialConfig = {
  durationDays: 14,
  storageGB: 2
};

// Storage limits in GB
export const storageLimits = {
  trial: 2,
  basic: 5,
  pro: 15,
  premium: 100,
  luxury: 500
};

// Storage validation function
export function validateStorageUsage(plan: keyof typeof storageLimits, usedGB: number): boolean {
  return usedGB <= storageLimits[plan];
}

// Get storage limit for a plan
export function getStorageLimit(plan: keyof typeof storageLimits): number {
  return storageLimits[plan];
}

// Exchange rates (in production, these should be fetched from a live API)
// This is a demo set of rates
export const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.36,
  AUD: 1.52,
  JPY: 148.5,
  INR: 83.12,
  BRL: 4.97,
  MXN: 17.05,
  SGD: 1.35,
  HKD: 7.81,
  CHF: 0.89,
  SEK: 10.5,
  NOK: 10.75,
  DKK: 6.85,
  NZD: 1.65,
  CNY: 7.24,
  ZAR: 18.45,
  AED: 3.67,
  KRW: 1319.5
};

// Currency symbols and formatting
export const currencyFormats: Record<string, { symbol: string; placement: 'before' | 'after'; decimals: number }> = {
  USD: { symbol: '$', placement: 'before', decimals: 0 },
  EUR: { symbol: '€', placement: 'after', decimals: 0 },
  GBP: { symbol: '£', placement: 'before', decimals: 0 },
  CAD: { symbol: 'C$', placement: 'before', decimals: 0 },
  AUD: { symbol: 'A$', placement: 'before', decimals: 0 },
  JPY: { symbol: '¥', placement: 'before', decimals: 0 },
  INR: { symbol: '₹', placement: 'before', decimals: 0 },
  BRL: { symbol: 'R$', placement: 'before', decimals: 0 },
  MXN: { symbol: 'Mex$', placement: 'before', decimals: 0 },
  SGD: { symbol: 'S$', placement: 'before', decimals: 0 },
  HKD: { symbol: 'HK$', placement: 'before', decimals: 0 },
  CHF: { symbol: 'CHF', placement: 'after', decimals: 0 },
  SEK: { symbol: 'kr', placement: 'after', decimals: 0 },
  NOK: { symbol: 'kr', placement: 'after', decimals: 0 },
  DKK: { symbol: 'kr', placement: 'after', decimals: 0 },
  NZD: { symbol: 'NZ$', placement: 'before', decimals: 0 },
  CNY: { symbol: '¥', placement: 'before', decimals: 0 },
  ZAR: { symbol: 'R', placement: 'before', decimals: 0 },
  AED: { symbol: 'د.إ', placement: 'before', decimals: 0 },
  KRW: { symbol: '₩', placement: 'before', decimals: 0 }
};

// Country to currency mapping
export const countryToCurrency: Record<string, string> = {
  US: 'USD',
  CA: 'CAD',
  GB: 'GBP',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  BE: 'EUR',
  AT: 'EUR',
  CH: 'CHF',
  SE: 'SEK',
  NO: 'NOK',
  DK: 'DKK',
  AU: 'AUD',
  NZ: 'NZD',
  JP: 'JPY',
  CN: 'CNY',
  IN: 'INR',
  BR: 'BRL',
  MX: 'MXN',
  SG: 'SGD',
  HK: 'HKD',
  KR: 'KRW',
  ZA: 'ZAR',
  AE: 'AED',
  IE: 'EUR',
  GR: 'EUR'
};

export const convertPrice = (priceUsd: number, targetCurrency: string): number => {
  const rate = exchangeRates[targetCurrency] || exchangeRates.USD;
  return Math.round(priceUsd * rate);
};

export const formatPrice = (price: number, currency: string): string => {
  const format = currencyFormats[currency] || currencyFormats.USD;
  const formatted = price.toFixed(format.decimals);
  
  if (format.placement === 'before') {
    return `${format.symbol}${formatted}`;
  } else {
    return `${formatted} ${format.symbol}`;
  }
};

export const displayPrice = (priceUsd: number, currency: string): string => {
  const convertedPrice = convertPrice(priceUsd, currency);
  return formatPrice(convertedPrice, currency);
};
