import { keys as analytics } from '@coordinize/analytics/keys';
import { keys as auth } from '@coordinize/auth/keys';
import { keys as database } from '@coordinize/database/keys';
import { keys as email } from '@coordinize/email/keys';
import { keys as flags } from '@coordinize/feature-flags/keys';
import { keys as core } from '@coordinize/next-config/keys';
import { keys as notifications } from '@coordinize/notifications/keys';
import { keys as observability } from '@coordinize/observability/keys';
import { keys as security } from '@coordinize/security/keys';
import { keys as webhooks } from '@coordinize/webhooks/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [
    auth(),
    analytics(),
    core(),
    database(),
    email(),
    flags(),
    notifications(),
    observability(),
    security(),
    webhooks(),
  ],
  server: {},
  client: {},
  runtimeEnv: {},
});
