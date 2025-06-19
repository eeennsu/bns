import { useSearchParams } from 'next/navigation';

const usePageSearchParams = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  return {
    page,
    searchParams,
  };
};

export default usePageSearchParams;
