import { NextResponse } from 'next/server';

function decodeJwt(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(request) {
  const tokenCookie = request.cookies.get('token');
  const token = tokenCookie ? tokenCookie.value : null;

  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    const payload = decodeJwt(token);
    if (!payload || payload.role !== 'Admin' || (payload.exp && Date.now() >= payload.exp * 1000)) {
      // Clear cookie and redirect
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    const payload = decodeJwt(token);
    if (!payload || payload.role !== 'Student' || (payload.exp && Date.now() >= payload.exp * 1000)) {
      // Clear cookie and redirect
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
};
