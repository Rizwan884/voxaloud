import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin') ?? '';
    const referer = request.headers.get('referer') ?? '';

    // Define allowed domains (including localhost for development)
    const allowedDomains = [
      'https://voxaloud-theta.vercel.app',
      'https://voxaloud.shaaddev.studio/',
      'http://localhost:3000'
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

    // Add CORS headers
    const response = NextResponse.next();

    if (isAllowedOrigin) {
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
  matcher: '/api/:path*',
};
