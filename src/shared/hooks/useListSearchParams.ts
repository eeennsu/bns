import { useSearchParams } from 'next/navigation';

const useListSearchParams = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  return {
    page,
    search,
    searchParams,
  };
};

export default useListSearchParams;
