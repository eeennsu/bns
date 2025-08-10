import { Suspense, type FC, type PropsWithChildren, type ReactNode } from 'react';

import ModalShell from './ModalShell';

interface IProps {
  modal: ReactNode;
}

const ProductLayout: FC<PropsWithChildren<IProps>> = ({ children, modal }) => {
  return (
    <main className='!lg:gap-20 container !gap-10'>
      {children}
      <Suspense fallback={null}>
        <ModalShell>{modal}</ModalShell>
      </Suspense>
    </main>
  );
};

export default ProductLayout;
