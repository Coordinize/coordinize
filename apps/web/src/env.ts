import { keys as email } from '@coordinize/email/keys';
import { keys as flags } from '@coordinize/feature-flags/keys';
import { keys as core } from '@coordinize/next-config/keys';
import { keys as observability } from '@coordinize/observability/keys';
import { keys as rateLimit } from '@coordinize/rate-limit/keys';
import { keys as security } from '@coordinize/security/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [core(), email(), observability(), flags(), security(), rateLimit()],
  server: {},
  client: {},
  runtimeEnv: {},
});
