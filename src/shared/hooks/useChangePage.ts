import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface IParams {
  total: number;
  perPage: number;
  currentPage: number;
}

const useChangePage = ({ currentPage, total, perPage }: IParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const maxEndPage = Math.ceil(total / perPage);
  const isPrevPage = currentPage > 1;
  const isNextPage = currentPage < maxEndPage;

  const onChangePage = (newPage: number) => {
    const prevSearchParams = Array.from(searchParams.entries());
    const newSearchParams = new URLSearchParams(prevSearchParams);

    newSearchParams.set('page', newPage.toString());

    if (currentPage !== newPage) {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    }
  };

  useEffect(() => {
    if (isNextPage) {
      const prevSearchParams = Array.from(searchParams.entries());
      const newSearchParams = new URLSearchParams(prevSearchParams);

      newSearchParams.set('page', (currentPage + 1).toString());
      router.prefetch(`${pathname}?${newSearchParams.toString()}`);
      console.log('prefetch!!!!!');
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

export default useChangePage;
