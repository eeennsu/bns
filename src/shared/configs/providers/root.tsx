import { ReactNode } from 'react';


// 또는 '@shadcn-ui/ui/sonner'
import TanstackQueryProvider from './tanstackQuery';
import SonnerToaster from './SonnerToaster';

const ConfigProviders = ({ children }: { children: ReactNode }) => {
  return (
    <TanstackQueryProvider>
      {children}
      <SonnerToaster />
    </TanstackQueryProvider>
  );
};

export default ConfigProviders;
