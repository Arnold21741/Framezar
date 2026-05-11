import { NextRequest, NextResponse } from 'next/server';
import { authCookieNames, getSupabaseAuthUrl, isSupabaseConfigured, supabaseAnonKey } from '@/lib/supabase-config';

const protectedRoutes = ['/account', '/dashboard', '/create', '/manage'];

export async function middleware(request: NextRequest) {
  if (!isSupabaseConfigured) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const isProtected = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  if (!isProtected) return NextResponse.next();

  const accessToken = request.cookies.get(authCookieNames.accessToken)?.value;
  if (accessToken) {
    const authResponse = await fetch(getSupabaseAuthUrl('/user'), {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${accessToken}`
      },
      cache: 'no-store'
    });

    if (authResponse.ok) return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('redirectedFrom', `${pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/account/:path*', '/dashboard/:path*', '/create/:path*', '/manage/:path*']
};
