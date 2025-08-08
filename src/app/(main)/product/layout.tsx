import type { FC, PropsWithChildren, ReactNode } from 'react';

interface IProps {
  modal: ReactNode;
}

const ProductLayout: FC<PropsWithChildren<IProps>> = ({ children, modal }) => {
  return (
    <main className='container'>
      {children}
      {modal}
    </main>
  );
};

export default ProductLayout;
