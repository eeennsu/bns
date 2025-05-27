import type { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Badge } from '@shadcn-ui/ui/badge';
import { Button } from '@shadcn-ui/ui/button';
import { Form, FormControl, FormField, FormItem } from '@shadcn-ui/ui/form';
import { Input } from '@shadcn-ui/ui/input';

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
                  <Input type='text' className='max-w-80' placeholder={placeholder} {...field} />
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
