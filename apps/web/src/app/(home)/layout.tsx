import { env } from '@/env';
import { SidebarProvider } from '@coordinize/design-system/components/ui/sidebar';
import { secure } from '@coordinize/security';
import type { ReactNode } from 'react';

type AppLayoutProperties = {
  readonly children: ReactNode;
};

const AppLayout = async ({ children }: AppLayoutProperties) => {
  if (env.ARCJET_KEY) {
    await secure(['CATEGORY:PREVIEW']);
  }

  return <SidebarProvider>{children}</SidebarProvider>;
};

export default AppLayout;
