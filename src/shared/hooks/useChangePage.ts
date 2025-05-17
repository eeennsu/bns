import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IParams {
  total: number;
}

const useChangePage = (params: IParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    if (params.total !== undefined) {
      setTotal(params.total);
    }
  }, [params.total]);

  const currentPage = +searchParams.get('page') || 1;

  const onChangePage = (page: number) => {
    const prevSearchParams = Array.from(searchParams.entries());
    const newSearchParams = new URLSearchParams(prevSearchParams);

    newSearchParams.set('page', page.toString());

    if (currentPage !== page) {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    }
  };

  return {
    total,
    currentPage,
    onChangePage,
  };
};

export default useChangePage;
