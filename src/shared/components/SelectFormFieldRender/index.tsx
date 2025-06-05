import { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@shadcn-ui/ui';

import { SelectItem as SelectItemType } from '@typings/commons';

interface IProps<TName extends string> {
  field: ControllerRenderProps<any, TName>;
  selectList: SelectItemType[] | string[];
  label?: string;
  isRequired?: boolean;
  selectionPlaceholder?: string;
}

const SharedSelectFormFieldRender = <TName extends string>({
  field,
  label,
  isRequired,
  selectList,
  selectionPlaceholder,
  ...restProps
}: IProps<TName>) => {
  return (
    <FormItem className='flex flex-col items-start gap-2'>
      {label ? (
        <FormLabel className='!mt-0 gap-0.5'>
          {label} {isRequired ? <strong className='required'>*</strong> : ''}
        </FormLabel>
      ) : null}
      <Select onValueChange={field.onChange} value={field.value} {...restProps}>
        <FormControl>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder={`${label}선택`} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {selectList.map((select, idx: number) => {
            if (typeof select === 'string') {
              return (
                <SelectItem key={idx} value={select}>
                  {select}
                </SelectItem>
              );
            }

            if (typeof select === 'object') {
              return (
                <SelectItem key={idx} value={select.value}>
                  {select.label}
                </SelectItem>
              );
            }
          })}

          {selectionPlaceholder && selectList.length === 0 && (
            <p className='p-3'>{selectionPlaceholder}</p>
          )}
        </SelectContent>
      </Select>
      <FormMessage className='text-xs' />
    </FormItem>
  );
};

export default SharedSelectFormFieldRender;
