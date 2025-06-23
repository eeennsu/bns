import { ITEM_SHOW_TYPE } from '@shared/consts/commons';
import useItemShowFilterStore from '@shared/stores/itemFilter';
import type { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, Badge, Button, Input } from '@shadcn-ui/ui';

import { SearchFormDto } from '@typings/commons';

import SharedSelect from '../Select';

interface IProps {
  total?: number;
  form: UseFormReturn<SearchFormDto>;
  onSubmit: () => void;
  orderSelectList?: string[];
  orderBy?: string;
  setOrderBy?: (value: string) => void;
  placeholder?: string;
}

const TableSearch: FC<IProps> = ({
  total,
  form,
  onSubmit,
  placeholder,
  orderBy,
  setOrderBy,
  orderSelectList,
}) => {
  const { showFilter, setShowFilter } = useItemShowFilterStore();

  return (
    <section className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
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
      </div>
      <div className='flex items-center justify-between'>
        <SharedSelect
          selectList={ITEM_SHOW_TYPE}
          defaultValue={showFilter}
          setValue={setShowFilter}
        />

        {orderSelectList && (
          <SharedSelect selectList={orderSelectList} defaultValue={orderBy} setValue={setOrderBy} />
        )}
      </div>
    </section>
  );
};

export default TableSearch;
