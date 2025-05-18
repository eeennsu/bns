'use client';

import { type FC } from 'react';

import {
  Pagination as ShadcnPagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
  PaginationItem,
} from '@shadcn-ui/ui/pagination';
import { cn } from '@shadcn-ui/utils';

import useChangePage from '@hooks/useChangePage';

import { PER_PAGE_SIZE } from '@consts/commons';

interface IProps {
  total: number;
  currentPage: number;
  perPage?: number;
}

const Pagination: FC<IProps> = ({ total, currentPage, perPage = PER_PAGE_SIZE.DEFAULT }) => {
  const { onChangePage, maxEndPage, isPrevPage, isNextPage } = useChangePage({
    currentPage,
    total,
    perPage,
  });

  return (
    <ShadcnPagination className='flex justify-center'>
      <PaginationContent className='inline-flex items-center gap-3 rounded-lg bg-[#FFFFF0]/80 p-1.5 shadow-sm'>
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              'hover:bg-wood/10',
              isPrevPage ? 'opacity-100' : 'pointer-events-none cursor-default opacity-50',
            )}
            onClick={() => onChangePage(currentPage - 1)}
          />
        </PaginationItem>

        <div className='mx-1 flex items-center gap-1.5'>
          {Array.from({ length: maxEndPage }, (_, index) => index + 1).map(page => (
            <PaginationItem key={`pageNum-${page}`}>
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
            </PaginationItem>
          ))}
        </div>

        <PaginationItem>
          <PaginationNext
            className={cn(
              'hover:bg-wood/10',
              isNextPage ? 'opacity-100' : 'pointer-events-none cursor-default opacity-50',
            )}
            onClick={() => onChangePage(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
