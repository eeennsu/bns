import type { FC, PropsWithChildren } from 'react';

const ProductLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className='from-ivory container h-full bg-gradient-to-br to-[#E8D0A9] py-12 lg:py-26'>
      {children}
    </main>
  );
};

export default ProductLayout;
