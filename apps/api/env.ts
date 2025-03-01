import { keys as analytics } from '@coordinize/analytics/keys';
import { keys as auth } from '@coordinize/auth/keys';
import { keys as database } from '@coordinize/database/keys';
import { keys as email } from '@coordinize/email/keys';
import { keys as core } from '@coordinize/next-config/keys';
import { keys as observability } from '@coordinize/observability/keys';
import { keys as payments } from '@coordinize/payments/keys';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [
    auth(),
    analytics(),
    core(),
    database(),
    email(),
    observability(),
    payments(),
  ],
  server: {},
  client: {},
  runtimeEnv: {},
});
