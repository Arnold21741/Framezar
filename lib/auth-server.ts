import { cookies } from 'next/headers';
import { authCookieNames, getSupabaseAuthUrl, isSupabaseConfigured, supabaseAnonKey } from '@/lib/supabase-config';

export type FramezarUser = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    selected_plan?: string;
  };
};

export async function getCurrentUser(): Promise<FramezarUser | null> {
  if (!isSupabaseConfigured) return null;

  const accessToken = cookies().get(authCookieNames.accessToken)?.value;
  if (!accessToken) return null;

  const response = await fetch(getSupabaseAuthUrl('/user'), {
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${accessToken}`
    },
    cache: 'no-store'
  });

  if (!response.ok) return null;
  return (await response.json()) as FramezarUser;
}
