import { DesignSystemProvider } from '@coordinize/design-system';
import { fonts } from '@coordinize/design-system/lib/fonts';
import '@coordinize/design-system/styles/globals.css';
import { Toolbar } from '@coordinize/feature-flags/components/toolbar';
import type { ReactNode } from 'react';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html lang="en" className={fonts} suppressHydrationWarning>
    <body>
      <DesignSystemProvider>{children}</DesignSystemProvider>
      <Toolbar />
    </body>
  </html>
);

export default RootLayout;
