import { type NextRequest, authMiddleware } from '@coordinize/auth/middleware';
import {
  noseconeMiddleware,
  noseconeOptions,
  noseconeOptionsWithToolbar,
} from '@coordinize/security/middleware';
import { env } from './env';

const securityHeaders = env.FLAGS_SECRET
  ? noseconeMiddleware(noseconeOptionsWithToolbar)
  : noseconeMiddleware(noseconeOptions);

export async function middleware(request: NextRequest) {
  // Run authentication middleware first
  const authResponse = await authMiddleware(request);

  // If auth middleware redirected or modified the response, return it
  if (authResponse && authResponse.status !== 200) {
    return authResponse;
  }

  // Otherwise, apply security headers
  return securityHeaders();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
