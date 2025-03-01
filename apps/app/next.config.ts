import { env } from '@/env';
import { withToolbar } from '@coordinize/feature-flags/lib/toolbar';
import { config, withAnalyzer } from '@coordinize/next-config';
import { withLogtail, withSentry } from '@coordinize/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withToolbar(withLogtail({ ...config }));

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
