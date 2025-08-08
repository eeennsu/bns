import type { FC, PropsWithChildren } from 'react';

const BaseContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className='container'>{children}</div>;
};

export default BaseContainer;
