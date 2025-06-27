import { cloneSearchParams } from '@libs/searchParams';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { PER_PAGE_SIZE } from '@consts/commons';

interface IParams {
  total: number;
  perPage?: number;
}

const usePagination = ({ total = 0, perPage = PER_PAGE_SIZE.DEFAULT }: IParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get(SEARCH_PARAMS_KEYS.PAGE)) || 1;

  const maxEndPage = Math.ceil(total / perPage);
  const isPrevPage = currentPage > 1;
  const isNextPage = currentPage < maxEndPage;

  const onChangePage = (newPage: number) => {
    const newSearchParams = cloneSearchParams(searchParams);
    newSearchParams.set(SEARCH_PARAMS_KEYS.PAGE, newPage.toString());

    if (currentPage !== newPage) {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    }
  };

  useEffect(() => {
    if (isNextPage) {
      const newSearchParams = cloneSearchParams(searchParams);
      newSearchParams.set(SEARCH_PARAMS_KEYS.PAGE, (currentPage + 1).toString());

      router.prefetch(`${pathname}?${newSearchParams.toString()}`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isNextPage, pathname, router, searchParams.toString()]);

  return {
    onChangePage,
    maxEndPage,
    isPrevPage,
    isNextPage,
  };
};

export default usePagination;
