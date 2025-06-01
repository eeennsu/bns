import type { ComponentProps, FC } from 'react';

import Pagination from '@components/Pagination';

interface IProps extends ComponentProps<typeof Pagination> {}

const AdminPagination: FC<IProps> = props => {
  return (
    <Pagination
      {...props}
      contentClassName='px-2 py-1.5 gap-1 shadow-none bg-white'
      arrowClassName='size-8 flex items-center justify-center rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:pointer-events-none'
      buttonClassName='h-8 max-w-8 px-2 text-sm rounded hover:bg-gray-100 transition aria-[current=page]:bg-gray-800 aria-[current=page]:text-white'
    />
  );
};

export default AdminPagination;
