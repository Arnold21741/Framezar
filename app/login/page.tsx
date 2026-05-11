import Link from 'next/link';
import LoginForm from '@/components/LoginForm';
import { isSupabaseConfigured } from '@/lib/supabase-config';

export default function LoginPage({ searchParams }: { searchParams?: { redirectedFrom?: string } }) {
  const redirectedFrom = searchParams?.redirectedFrom ?? '/dashboard';

  return (
    <section className="page-container py-16 sm:py-20">
      <div className="mx-auto max-w-xl space-y-6">
        <LoginForm authReady={isSupabaseConfigured} redirectedFrom={redirectedFrom} />
        <p className="text-center text-sm text-slate-600">
          New to Framezar?{' '}
          <Link href="/signup" className="font-semibold text-brand transition hover:text-blue-600">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
