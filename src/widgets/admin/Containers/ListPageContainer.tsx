import type { FC, PropsWithChildren } from 'react';

const ListPageContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className='flex flex-col gap-6 rounded-lg bg-white p-6'>{children}</div>;
};

export default ListPageContainer;
