import { KeyboardEvent, TextareaHTMLAttributes } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';
import { Textarea } from '@shadcn-ui/ui';

interface IProps<TName extends string> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  field: ControllerRenderProps<any, TName>;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
  height?: string;
  onKeyDownLines?: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
}

const SharedFormTextareaFieldRender = <TName extends string>({
  field,
  label,
  isRequired,
  disabled = false,
  height,
  onKeyDownLines,
  ...restProps
}: IProps<TName>) => {
  return (
    <FormItem>
      {label ? (
        <FormLabel>
          {label} {isRequired ? <strong className='required'>*</strong> : ''}
        </FormLabel>
      ) : null}
      <FormControl>
        <Textarea
          className={height}
          placeholder='내용을 입력해주세요'
          {...field}
          {...restProps}
          disabled={disabled}
          onKeyDown={onKeyDownLines}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SharedFormTextareaFieldRender;
