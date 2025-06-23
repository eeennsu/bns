import type { FC, PropsWithChildren } from 'react';

const ListPageWidget: FC<PropsWithChildren> = ({ children }) => {
  return <div className='flex flex-col gap-4 rounded-lg bg-white p-6'>{children}</div>;
};

export default ListPageWidget;
