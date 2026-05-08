'use client';

import { useCallback, useEffect, useState } from 'react';
import { countryToCurrency, currencyFormats } from '@/lib/pricing';

type CurrencyState = {
  currency: string;
  country: string;
  loading: boolean;
};

const defaultCurrencyState: CurrencyState = {
  currency: 'USD',
  country: 'US',
  loading: true
};

let currencyState: CurrencyState = defaultCurrencyState;
let detectionPromise: Promise<void> | null = null;
const subscribers = new Set<(state: CurrencyState) => void>();

function emit(nextState: CurrencyState) {
  currencyState = nextState;
  subscribers.forEach((subscriber) => subscriber(currencyState));
}

function subscribe(subscriber: (state: CurrencyState) => void) {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
}

function readLocaleCurrency(): Pick<CurrencyState, 'currency' | 'country'> {
  const browserLocale = navigator.language || 'en-US';
  const country = browserLocale.split('-')[1]?.toUpperCase() || 'US';

  return {
    country,
    currency: countryToCurrency[country] || 'USD'
  };
}

async function detectCurrency() {
  if (detectionPromise) return detectionPromise;

  detectionPromise = (async () => {
    try {
      const savedCurrency = window.localStorage.getItem('framezar.currency');
      if (savedCurrency && currencyFormats[savedCurrency]) {
        emit({ ...currencyState, currency: savedCurrency, loading: false });
        return;
      }

      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        const country = data.country_code || 'US';
        emit({
          country,
          currency: countryToCurrency[country] || 'USD',
          loading: false
        });
        return;
      }

      emit({ ...readLocaleCurrency(), loading: false });
    } catch {
      emit({ ...readLocaleCurrency(), loading: false });
    }
  })();

  return detectionPromise;
}

export function useCurrency() {
  const [state, setState] = useState(currencyState);

  useEffect(() => {
    const unsubscribe = subscribe(setState);
    detectCurrency();
    return unsubscribe;
  }, []);

  const updateCurrency = useCallback((newCurrency: string) => {
    if (!currencyFormats[newCurrency]) return;
    window.localStorage.setItem('framezar.currency', newCurrency);
    emit({ ...currencyState, currency: newCurrency, loading: false });
  }, []);

  return { ...state, updateCurrency };
}

export function CurrencySelector() {
  const { currency, loading, updateCurrency } = useCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState(currency);

  useEffect(() => {
    setSelectedCurrency(currency);
  }, [currency]);

  const handleCurrencyChange = (newCurrency: string) => {
    setSelectedCurrency(newCurrency);
    updateCurrency(newCurrency);
  };

  const availableCurrencies = Object.keys(currencyFormats).sort();

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency-select" className="text-sm text-slate-600">
        Currency:
      </label>
      <select
        id="currency-select"
        value={selectedCurrency}
        onChange={(e) => handleCurrencyChange(e.target.value)}
        disabled={loading}
        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
      >
        {availableCurrencies.map((curr) => (
          <option key={curr} value={curr}>
            {curr}
          </option>
        ))}
      </select>
      {loading ? <span className="text-xs text-slate-500">Detecting...</span> : null}
    </div>
  );
}
