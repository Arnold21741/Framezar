import { NextResponse } from 'next/server';
import { authCookieNames, getSupabaseAuthUrl, isSupabaseConfigured, supabaseAnonKey } from '@/lib/supabase-config';

type SignupBody = {
  email?: string;
  password?: string;
  name?: string;
  chosenPlan?: string;
};

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase is not configured yet.' }, { status: 503 });
  }

  const body = (await request.json()) as SignupBody;
  const email = body.email?.trim();
  const password = body.password;
  const fullName = body.name?.trim();

  if (!email || !password || !fullName) {
    return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Use at least 8 characters for the password.' }, { status: 400 });
  }

  const authResponse = await fetch(getSupabaseAuthUrl('/signup'), {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      data: {
        full_name: fullName,
        selected_plan: body.chosenPlan ?? 'basic'
      }
    })
  });

  const payload = await authResponse.json();

  if (!authResponse.ok) {
    return NextResponse.json({ error: payload.error_description ?? payload.msg ?? 'Unable to create account.' }, { status: authResponse.status });
  }

  const accessToken = payload.session?.access_token ?? payload.access_token;
  const refreshToken = payload.session?.refresh_token ?? payload.refresh_token;
  const expiresIn = payload.session?.expires_in ?? payload.expires_in;

  const response = NextResponse.json({
    success: true,
    requiresEmailConfirmation: !accessToken
  });

  if (accessToken) {
    response.cookies.set(authCookieNames.accessToken, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: Number(expiresIn ?? 3600)
    });
  }

  if (refreshToken) {
    response.cookies.set(authCookieNames.refreshToken, refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    });
  }

  return response;
}
