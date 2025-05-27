import { zodResolver } from '@hookform/resolvers/zod';
import { cloneSearchParams } from '@libs/searchParams';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { SearchFormDto } from '@typings/commons';

import { SearchFormDtoSchema } from '@contracts/common';

const useTableSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSearch = (data: SearchFormDto) => {
    if (!data?.search) return;

    const newSearchParams = cloneSearchParams(searchParams);

    newSearchParams.set('search', data.search);

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const form = useForm<SearchFormDto>({
    resolver: zodResolver(SearchFormDtoSchema),
    defaultValues: {
      search: searchParams.get('search') || '',
    },
  });

  const onSubmit = form.handleSubmit(onSearch);

  return {
    form,
    onSubmit,
  };
};

export default useTableSearch;
