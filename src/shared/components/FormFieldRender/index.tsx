import type { FC, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage, Input } from '@shadcn-ui/ui';

import Tooltip from '@components/Tooltip';

interface IProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  field: ControllerRenderProps<any, string>;
  isRequired?: boolean;
  type: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  tooltip?: ReactNode;
}

const SharedFormFieldRender: FC<IProps> = ({
  label,
  isRequired,
  field,
  type,
  placeholder,
  tooltip,
  ...inputProps
}) => {
  return (
    <FormItem>
      {label ? (
        <FormLabel className='gap-0.5'>
          {label}
          {isRequired ? <strong className='required'>*</strong> : ''}
          {tooltip && <Tooltip description={tooltip} />}
        </FormLabel>
      ) : null}
      <FormControl>
        <Input
          type={type}
          {...field}
          {...inputProps}
          className='placeholder:text-xs placeholder:text-gray-400'
          placeholder={placeholder || `${label} 입력`}
        />
      </FormControl>
      <FormMessage className='text-xs' />
    </FormItem>
  );
};

export default SharedFormFieldRender;
