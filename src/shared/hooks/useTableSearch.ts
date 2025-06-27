import { zodResolver } from '@hookform/resolvers/zod';
import { cloneSearchParams } from '@libs/searchParams';
import { SEARCH_PARAMS_KEYS } from '@shared/consts/storage';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { SearchFormDto } from '@typings/commons';

import { SearchFormDtoSchema } from '@contracts/common';

const useTableSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSearch = (data: SearchFormDto) => {
    if (!data?.search || data.search.trim() === '') {
      router.push(pathname);
      return;
    }

    const newSearchParams = cloneSearchParams(searchParams);
    newSearchParams.set(SEARCH_PARAMS_KEYS.SEARCH, data.search);

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const form = useForm<SearchFormDto>({
    resolver: zodResolver(SearchFormDtoSchema),
    defaultValues: {
      search: searchParams.get(SEARCH_PARAMS_KEYS.SEARCH) || '',
    },
  });

  const onSubmit = form.handleSubmit(onSearch);

  return {
    form,
    onSubmit,
  };
};

export default useTableSearch;
