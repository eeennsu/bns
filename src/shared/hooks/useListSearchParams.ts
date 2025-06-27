import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import { useSearchParams } from 'next/navigation';

const useListSearchParams = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get(SEARCH_PARAMS_KEYS.PAGE)) || 1;
  const search = searchParams.get(SEARCH_PARAMS_KEYS.SEARCH) || '';

  return {
    page,
    search,
    searchParams,
  };
};

export default useListSearchParams;
