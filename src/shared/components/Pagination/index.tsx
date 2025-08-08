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
          'inline-flex items-center gap-2 rounded-md bg-white px-3 py-2',
          contentClassName,
        )}
      >
        <PaginationItem>
          <PaginationPrevious
            className={cn(
              'text-muted-foreground rounded-md px-2 py-1 text-sm transition-colors duration-150 hover:bg-gray-100',
              isPrevPage ? 'opacity-100' : 'pointer-events-none cursor-default opacity-50',
              arrowClassName,
            )}
            onClick={() => onChangePage(currentPage - 1)}
          />
        </PaginationItem>

        <div className='flex items-center gap-1'>
          {Array.from({ length: maxEndPage }, (_, index) => index + 1).map(page => (
            <PaginationItem key={`pageNum-${page}`}>
              <PaginationLink
                aria-current={currentPage === page ? 'page' : undefined}
                className={cn(
                  'text-muted-foreground min-w-[32px] rounded-sm px-2 py-1 text-sm transition-colors duration-150 hover:bg-gray-100',
                  currentPage === page && 'bg-black/80 text-white hover:bg-black hover:text-white',
                  buttonClassName,
                )}
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
              'text-muted-foreground rounded-md px-2 py-1 text-sm transition-colors duration-150 hover:bg-gray-100',
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
