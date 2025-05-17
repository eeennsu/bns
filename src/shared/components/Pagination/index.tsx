import { type FC } from 'react';

import { PaginationLink, PaginationNext, PaginationPrevious } from '@shadcn-ui/ui/pagination';
import { cn } from '@shadcn-ui/utils';

import { PER_PAGE_SIZE } from '@consts/commons';

interface IProps {
  total: number;
  currentPage: number;
  perPage?: number;
  onChangePage: (page: number) => void;
}

const Pagination: FC<IProps> = ({
  total,
  currentPage,
  perPage = PER_PAGE_SIZE.DEFAULT,
  onChangePage,
}) => {
  const maxEndPage = Math.ceil(total / perPage);
  const isPrevPage = currentPage > 1;
  const isNextPage = currentPage < maxEndPage;

  return (
    <section className='flex justify-center'>
      <nav className='inline-flex items-center gap-3 rounded-lg bg-[#FFFFF0]/80 p-1.5 shadow-sm'>
        <PaginationPrevious
          className={cn(
            'hover:bg-wood/10',
            isPrevPage ? 'opacity-100' : 'pointer-events-none cursor-default opacity-50',
          )}
          onClick={() => onChangePage(currentPage - 1)}
        />

        <div className='mx-1 flex items-center gap-1.5'>
          {Array.from({ length: maxEndPage }, (_, index) => index + 1).map(page => (
            <PaginationLink
              className={cn(
                'hover:bg-wood/10',
                currentPage === page && 'bg-wood hover:bg-wood text-white hover:text-white',
              )}
              key={page}
              onClick={() => onChangePage(page)}
            >
              {page}
            </PaginationLink>
          ))}
        </div>

        <PaginationNext
          className={cn(
            'hover:bg-wood/10',
            isNextPage ? 'opacity-100' : 'pointer-events-none cursor-default opacity-50',
          )}
          onClick={() => onChangePage(currentPage + 1)}
        />
      </nav>
    </section>
  );
};

export default Pagination;
