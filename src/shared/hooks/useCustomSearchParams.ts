'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type NewParamsType = { [key: string]: string };

const useCustomSearchParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const _searchParams = useSearchParams();
  const searchParams = new URLSearchParams(_searchParams.toString());

  const setNewParams = (newParams: NewParamsType) => {
    for (const [key, value] of Object.entries(newParams)) {
      if (value) searchParams.set(key, value);
      else searchParams.delete(key);
    }
    return searchParams.toString();
  };

  const setSearchParams = (newParams: NewParamsType) => {
    const newSearchParams = setNewParams(newParams);

    return router.push(`${pathname}?${newSearchParams}`);
  };

  const setOrderByParams = (value: string) => {
    setSearchParams({ orderBy: value });
  };

  return { searchParams: _searchParams, setSearchParams, setOrderByParams };
};

export default useCustomSearchParams;
