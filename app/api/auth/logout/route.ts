import { NextResponse } from 'next/server';
import { authCookieNames } from '@/lib/supabase-config';

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(authCookieNames.accessToken, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });
  response.cookies.set(authCookieNames.refreshToken, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  });

  return response;
}
