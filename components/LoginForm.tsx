'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Status = {
  type: 'idle' | 'error' | 'success';
  message: string;
};

export default function LoginForm({ authReady, redirectedFrom }: { authReady: boolean; redirectedFrom: string }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: 'idle', message: '' });

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({ type: 'error', message: payload.error ?? 'Unable to log in.' });
      return;
    }

    setStatus({ type: 'success', message: 'Logged in. Opening your dashboard...' });
    router.push(redirectedFrom);
    router.refresh();
  };

  return (
    <div className="rounded-[32px] border border-slate-200/70 bg-white/95 p-8 shadow-soft">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-brand">Log in</p>
          <h1 className="text-3xl font-semibold text-slate-950">Open your photographer workspace.</h1>
          <p className="text-slate-600">Manage client galleries, cover designs, delivery links, and account settings.</p>
        </div>

        {!authReady ? (
          <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            Add your Supabase URL and anon key to <span className="font-semibold">.env.local</span> to enable live login.
          </div>
        ) : null}

        <label className="space-y-2 text-sm font-medium text-slate-900">
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="you@studio.com"
            required
          />
        </label>

        <label className="space-y-2 text-sm font-medium text-slate-900">
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-900 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
            placeholder="Your password"
            required
          />
        </label>

        <button type="submit" disabled={!authReady || loading} className="dark-glass-button inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? 'Logging in...' : 'Log in'}
        </button>

        {status.message ? (
          <div className={`rounded-[28px] border p-5 text-sm ${status.type === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}>
            {status.message}
          </div>
        ) : null}
      </form>
    </div>
  );
}
