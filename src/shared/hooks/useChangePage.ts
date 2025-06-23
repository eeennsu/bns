import { PER_PAGE_SIZE } from '@consts/commons';

import usePageSearchParams from './useListSearchParams';

interface IParams {
  perPage?: number;
  total: number;
}

const useChangePage = ({ perPage = PER_PAGE_SIZE.DEFAULT, total }: IParams) => {
  const { page } = usePageSearchParams();
  return {
    currentPage: page,
    perPage,
    total,
  };
};

export default useChangePage;
