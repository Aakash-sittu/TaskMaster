import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (req.nextUrl.pathname.startsWith('/login') || 
      req.nextUrl.pathname.startsWith('/register')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return res;
  }

  if (req.nextUrl.pathname.startsWith('/dashboard') || 
      req.nextUrl.pathname.startsWith('/api/tasks')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return res;
  }

  return res;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/tasks/:path*',
    '/login',
    '/register',
  ],
};