import { ReactNode } from 'react';

import { Toaster } from '@shadcn-ui/ui/sonner';

import TanstackQueryProvider from './tanstackQuery';

const ConfigProviders = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackQueryProvider>
      {children}
      <Toaster />
    </TanstackQueryProvider>
  );
};

export default ConfigProviders;
