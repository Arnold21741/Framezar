import { NextResponse } from 'next/server';
import { authCookieNames, getSupabaseAuthUrl, isSupabaseConfigured, supabaseAnonKey } from '@/lib/supabase-config';

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase is not configured yet.' }, { status: 503 });
  }

  const body = (await request.json()) as LoginBody;
  const email = body.email?.trim();
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const authResponse = await fetch(getSupabaseAuthUrl('/token?grant_type=password'), {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  const payload = await authResponse.json();

  if (!authResponse.ok) {
    return NextResponse.json({ error: payload.error_description ?? payload.msg ?? 'Unable to log in.' }, { status: authResponse.status });
  }

  const response = NextResponse.json({ success: true });
  const maxAge = Number(payload.expires_in ?? 3600);

  response.cookies.set(authCookieNames.accessToken, payload.access_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge
  });
  response.cookies.set(authCookieNames.refreshToken, payload.refresh_token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30
  });

  return response;
}
