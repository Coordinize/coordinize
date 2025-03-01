import { Toolbar as CMSToolbar } from '@coordinize/cms/components/toolbar';
import { DesignSystemProvider } from '@coordinize/design-system';
import { fonts } from '@coordinize/design-system/lib/fonts';
import { cn } from '@coordinize/design-system/lib/utils';
import '@coordinize/design-system/styles/globals.css';
import { Toolbar } from '@coordinize/feature-flags/components/toolbar';
import type { ReactNode } from 'react';
import { Footer } from './components/footer';
import { Header } from './components/header';
import './styles/web.css';

type RootLayoutProperties = {
  readonly children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProperties) => (
  <html
    lang="en"
    className={cn(fonts, 'scroll-smooth')}
    suppressHydrationWarning
  >
    <body>
      <DesignSystemProvider>
        <Header />
        {children}
        <Footer />
      </DesignSystemProvider>
      <Toolbar />
      <CMSToolbar />
    </body>
  </html>
);

export default RootLayout;
