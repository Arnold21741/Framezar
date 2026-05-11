export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const authCookieNames = {
  accessToken: 'framezar-access-token',
  refreshToken: 'framezar-refresh-token'
} as const;

export const getSupabaseAuthUrl = (path: string) => {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.');
  }

  return `${supabaseUrl.replace(/\/$/, '')}/auth/v1${path}`;
};
