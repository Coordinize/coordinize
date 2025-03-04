'use server';

import { env } from '@/env';
import { resend } from '@coordinize/email';
import { ContactTemplate } from '@coordinize/email/templates/contact';
import { parseError } from '@coordinize/observability/error';
import { createRateLimiter, slidingWindow } from '@coordinize/rate-limit';
import { headers } from 'next/headers';

export const contact = async (
  name: string,
  email: string,
  message: string
): Promise<{
  error?: string;
}> => {
  try {
    if (env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN) {
      const rateLimiter = createRateLimiter({
        limiter: slidingWindow(1, '1d'),
      });
      const head = await headers();
      const ip = head.get('x-forwarded-for');

      const { success } = await rateLimiter.limit(`contact_form_${ip}`);

      if (!success) {
        throw new Error(
          'You have reached your request limit. Please try again later.'
        );
      }
    }

    await resend.emails.send({
      from: env.RESEND_FROM,
      to: env.RESEND_FROM,
      subject: 'Contact form submission',
      replyTo: email,
      react: <ContactTemplate name={name} email={email} message={message} />,
    });

    return {};
  } catch (error) {
    const errorMessage = parseError(error);

    return { error: errorMessage };
  }
};
