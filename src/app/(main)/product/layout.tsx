import { Suspense, type FC, type PropsWithChildren, type ReactNode } from 'react';

interface IProps {
  modal: ReactNode;
}

const ProductLayout: FC<PropsWithChildren<IProps>> = ({ children, modal }) => {
  return (
    <main className='container !gap-10 lg:!gap-20'>
      {children}
      <Suspense fallback={null}>{modal}</Suspense>
    </main>
  );
};

export default ProductLayout;
