import { useSearchParams } from 'next/navigation';

import { PER_PAGE_SIZE } from '@consts/commons';

interface IParams {
  perPage?: number;
  total: number;
}

const useChangePage = ({ perPage = PER_PAGE_SIZE.DEFAULT, total }: IParams) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  return {
    currentPage,
    perPage,
    total,
  };
};

export default useChangePage;
