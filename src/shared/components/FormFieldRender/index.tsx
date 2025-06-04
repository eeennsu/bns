import type { FC, HTMLAttributes, InputHTMLAttributes } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage, Input } from '@shadcn-ui/ui';

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
        <FormLabel className='gap-0.5'>
          {label}
          {isRequired ? <strong className='required'>*</strong> : ''}
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
