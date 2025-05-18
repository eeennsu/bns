import type { FC, HTMLAttributes, InputHTMLAttributes } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui/form';
import { Input } from '@shadcn-ui/ui/input';

interface IProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  field: ControllerRenderProps<any, string>;
  isRequired?: boolean;
  type: InputHTMLAttributes<HTMLInputElement>['type'];
}

const SharedFormFieldRender: FC<IProps> = ({ label, isRequired, field, type, ...inputProps }) => {
  return (
    <FormItem>
      {label ? (
        <FormLabel className='inline-flex items-center gap-1 text-xs font-medium'>
          {label}
          {isRequired ? (
            <span className='mt-[3px] leading-none font-bold text-red-500'>*</span>
          ) : (
            ''
          )}
        </FormLabel>
      ) : null}
      <FormControl>
        <Input type={type} {...field} {...inputProps} />
      </FormControl>
      <FormMessage className='text-xs' />
    </FormItem>
  );
};

export default SharedFormFieldRender;
