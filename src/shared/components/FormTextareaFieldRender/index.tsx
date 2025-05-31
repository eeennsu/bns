import { KeyboardEvent, TextareaHTMLAttributes } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';
import { Textarea } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

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
  disabled,
  height = 'h-28',
  onKeyDownLines,
  maxLength,
  ...restProps
}: IProps<TName>) => {
  const curLength = field.value?.length ?? 0;

  return (
    <FormItem>
      {label ? (
        <FormLabel>
          {label} {isRequired ? <strong className='required'>*</strong> : ''}
        </FormLabel>
      ) : null}
      <FormControl>
        <div className='relative'>
          <Textarea
            className={cn(height, 'resize-none', maxLength && 'pr-16')}
            placeholder='내용을 입력해주세요'
            {...field}
            maxLength={maxLength}
            {...restProps}
            disabled={disabled}
            onChange={e => {
              const value = maxLength ? e.target.value.slice(0, maxLength) : e.target.value;

              field.onChange(value);
            }}
            onKeyDown={onKeyDownLines}
          />
          {maxLength && (
            <p className='pointer-events-none absolute right-4 bottom-2 rounded-md bg-white/80 px-2 text-xs font-medium text-gray-400 select-none'>
              <span className='font-bold text-gray-800'>{curLength}</span> / {maxLength}
            </p>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SharedFormTextareaFieldRender;
