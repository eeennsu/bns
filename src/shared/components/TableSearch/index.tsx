import type { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, Badge, Button, Input } from '@shadcn-ui/ui';

import { SearchFormDto } from '@typings/commons';

interface IProps {
  total?: number;
  form: UseFormReturn<SearchFormDto>;
  onSubmit: () => void;
  placeholder?: string;
}

const TableSearch: FC<IProps> = ({ total, form, onSubmit, placeholder }) => {
  return (
    <section className='4 flex items-center justify-between'>
      {total !== undefined ? (
        <Badge variant='secondary' className='min-w-fit'>
          총 {total}건
        </Badge>
      ) : null}
      <Form {...form}>
        <form className='flex w-full justify-between gap-4' onSubmit={onSubmit}>
          <FormField
            name='search'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex w-full justify-end'>
                <FormControl>
                  <Input
                    type='text'
                    className='max-w-70 !text-xs placeholder:!text-xs'
                    placeholder={placeholder || '키워드를 입력해주세요.'}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit'>검색</Button>
        </form>
      </Form>
    </section>
  );
};

export default TableSearch;
