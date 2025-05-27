import { ReactNode } from 'react';

import SonnerToaster from './SonnerToaster';
import TanstackQueryProvider from './tanstackQuery';

const ConfigProviders = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackQueryProvider>
      {children}
      <SonnerToaster />
    </TanstackQueryProvider>
  );
};

export default ConfigProviders;
