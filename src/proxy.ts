import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Canonicalize www.fishaudio.online -> fishaudio.online. Both were live and
  // serving identical content independently with no redirect between them,
  // which splits SEO signal and confuses Google into crawling/indexing the
  // whole site twice under two hostnames.
  // request.nextUrl.hostname reflects the internal server address, not the
  // actual requested domain — must read the real Host header instead.
  const host = request.headers.get('host') || request.headers.get('x-forwarded-host') || '';
  if (host === 'www.fishaudio.online') {
    const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, 'https://fishaudio.online');
    return NextResponse.redirect(target, 308);
  }

  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin') ?? '';
    const referer = request.headers.get('referer') ?? '';

    // Define allowed domains (including localhost for development)
    const allowedDomains = [
      'https://fishaudio.online',
      'http://localhost:3000',
      'https://voxaloud.com'
    ];


    const isAllowedOrigin = allowedDomains.includes(origin);
    const isAllowedReferer = allowedDomains.some(domain => referer.startsWith(domain));

    // In production, enforce that the request comes from the allowed domain
    // EXCEPTION: Skip all checks for our external bridge API
    const isExternalApi = request.nextUrl.pathname.startsWith('/api/external/');

    if (process.env.NODE_ENV === 'production' && !isExternalApi) {
      // If it's a cross-origin request or same-origin fetch, it should have an origin or referer.
      // If neither is present, or neither matches the allowed list, block it.
      if (!isAllowedOrigin && !isAllowedReferer) {
        return new NextResponse(null, { status: 404 });
      }
    }

    // Handle CORS preflight (OPTIONS)
    if (request.method === 'OPTIONS') {
      const preflightResponse = new NextResponse(null, { status: 204 });
      preflightResponse.headers.set('Access-Control-Allow-Origin', isExternalApi ? '*' : (isAllowedOrigin ? origin : ''));
      preflightResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      preflightResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Gateway-Key');
      preflightResponse.headers.set('Access-Control-Max-Age', '86400');
      return preflightResponse;
    }

    // Add CORS headers to the response
    const response = NextResponse.next();

    if (isExternalApi) {
      response.headers.set('Access-Control-Allow-Origin', '*');
    } else if (isAllowedOrigin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    } else if (process.env.NODE_ENV !== 'production') {
      response.headers.set('Access-Control-Allow-Origin', '*');
    }

    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Gateway-Key');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Runs on every route (not just /api) so the www redirect applies
  // site-wide; static build assets are excluded for performance.
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
