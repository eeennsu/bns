import { Suspense, type FC, type PropsWithChildren, type ReactNode } from 'react';

import ModalShell from './ModalShell';

interface IProps {
  modal: ReactNode;
}

const ProductLayout: FC<PropsWithChildren<IProps>> = ({ children, modal }) => {
  return (
    <main className='container'>
      {children}
      <Suspense fallback={null}>
        <ModalShell>{modal}</ModalShell>
      </Suspense>
    </main>
  );
};

export default ProductLayout;
