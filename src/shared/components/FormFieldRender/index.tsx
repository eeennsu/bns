import type { FC, InputHTMLAttributes, ReactNode } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage, Input } from '@shadcn-ui/ui';

import Tooltip from '@components/Tooltip';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  field: ControllerRenderProps<any, string>;
  isRequired?: boolean;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  placeholder?: string;
  tooltip?: ReactNode;
}

const SharedFormFieldRender: FC<IProps> = ({
  label,
  isRequired,
  field,
  type = 'text',
  placeholder,
  tooltip,
  ...inputProps
}) => {
  return (
    <FormItem>
      <FormLabel className='gap-0.5'>
        {label}
        {isRequired ? <strong className='required'>*</strong> : null}
        {tooltip ? <Tooltip content={tooltip} triggerClassName='ml-1' /> : null}
      </FormLabel>
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
