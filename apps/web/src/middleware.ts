import { env } from '@/env';

import { type NextRequest, authMiddleware } from '@coordinize/auth/middleware';
import { parseError } from '@coordinize/observability/error';
import { secure } from '@coordinize/security';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@coordinize/security/middleware';
import { NextResponse } from 'next/server';

const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

export async function middleware(request: NextRequest) {
  // Run authentication middleware first
  const authResponse = await authMiddleware(request);

  if (authResponse && authResponse.status !== 200) {
    // If auth middleware redirected or modified the response, return it
    return authResponse;
  }

  try {
    await secure(
      [
        // See https://docs.arcjet.com/bot-protection/identifying-bots
        'CATEGORY:SEARCH_ENGINE', // Allow search engines
        'CATEGORY:PREVIEW', // Allow preview links to show OG images
        'CATEGORY:MONITOR', // Allow uptime monitoring services
      ],
      request
    );

    return securityHeaders();
  } catch (error) {
    const message = parseError(error);

    return NextResponse.json({ error: message }, { status: 403 });
  }
}

export const config = {
  // matcher tells Next.js which routes to run the middleware on. This runs the
  // middleware on all routes except for static assets and Posthog ingest
  matcher: ['/((?!_next/static|_next/image|ingest|favicon.ico).*)'],
};
