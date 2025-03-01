import { env } from '@/env';
import { withCMS } from '@coordinize/cms/next-config';
import { withToolbar } from '@coordinize/feature-flags/lib/toolbar';
import { config, withAnalyzer } from '@coordinize/next-config';
import { withLogtail, withSentry } from '@coordinize/observability/next-config';
import type { NextConfig } from 'next';

let nextConfig: NextConfig = withToolbar(withLogtail({ ...config }));

nextConfig.images?.remotePatterns?.push({
  protocol: 'https',
  hostname: 'assets.basehub.com',
});

if (process.env.NODE_ENV === 'production') {
  const redirects: NextConfig['redirects'] = async () => [
    {
      source: '/legal',
      destination: '/legal/privacy',
      statusCode: 301,
    },
  ];

  nextConfig.redirects = redirects;
}

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === 'true') {
  nextConfig = withAnalyzer(nextConfig);
}

export default withCMS(nextConfig);
