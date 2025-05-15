import type { FC, PropsWithChildren, ReactNode } from 'react';

interface IProps {
  modal: ReactNode;
}

const ProductLayout: FC<PropsWithChildren<IProps>> = ({ children, modal }) => {
  return (
    <main className='from-ivory h-full bg-gradient-to-br to-[#E8D0A9] py-12 lg:py-19'>
      {children}
      {modal}
    </main>
  );
};

export default ProductLayout;
