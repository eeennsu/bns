'use client';

import { type FC } from 'react';

import {
  Pagination as ShadcnPagination,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationContent,
  PaginationItem,
} from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import usePagination from '@hooks/usePagination';

import { PER_PAGE_SIZE } from '@consts/commons';

interface IProps {
  total: number;
  currentPage: number;
  perPage?: number;
  contentClassName?: string;
  arrowClassName?: string;
  buttonClassName?: string;
}

const Pagination: FC<IProps> = ({
  total,
  currentPage,
  perPage = PER_PAGE_SIZE.DEFAULT,
  contentClassName,
  arrowClassName,
  buttonClassName,
}) => {
  const { onChangePage, maxEndPage, isPrevPage, isNextPage } = usePagination({
    total,
    perPage,
  });

  return (
    <ShadcnPagination className='flex justify-center'>
      <PaginationContent
        className={cn(
          'inline-flex items-center gap-3 rounded-lg bg-[#FFFFF0]/80 p-1.5 shadow-sm',
          contentClassName,
        )}
      >
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              'hover:bg-wood/10',
              isPrevPage ? 'opacity-100' : 'pointer-events-none cursor-default opacity-50',
              arrowClassName,
            )}
            onClick={() => onChangePage(currentPage - 1)}
          />
        </PaginationItem>

        <div className='mx-1 flex items-center gap-1.5'>
          {Array.from({ length: maxEndPage }, (_, index) => index + 1).map(page => (
            <PaginationItem key={`pageNum-${page}`}>
              <PaginationLink
                aria-current={currentPage === page ? 'page' : undefined}
                className={cn(
                  'hover:bg-wood/10',
                  currentPage === page && 'bg-wood hover:bg-wood text-white hover:text-white',
                  buttonClassName,
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
              arrowClassName,
            )}
            onClick={() => onChangePage(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
