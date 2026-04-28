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
      'http://localhost:3000'
    ];

    const isAllowedOrigin = allowedDomains.includes(origin);
    const isAllowedReferer = allowedDomains.some(domain => referer.startsWith(domain));

    // In production, enforce that the request comes from the allowed domain
    if (process.env.NODE_ENV === 'production') {
      // If it's a cross-origin request or same-origin fetch, it should have an origin or referer.
      // If neither is present, or neither matches the allowed list, block it.
      if (!isAllowedOrigin && !isAllowedReferer) {
        return new NextResponse(
          JSON.stringify({ 
            error: 'Access Denied', 
            message: 'API can only be accessed from the official VoxaLoud domain (voxaloud-theta.vercel.app)' 
          }),
          { 
            status: 403, 
            headers: { 'Content-Type': 'application/json' }
          }
        );
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
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
