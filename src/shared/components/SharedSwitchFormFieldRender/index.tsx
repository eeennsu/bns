import type { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormItem, FormLabel, FormMessage, Switch } from '@shadcn-ui/ui';

interface IProps<TName extends string> {
  field: ControllerRenderProps<any, TName>;
  label?: string;
  isRequired?: boolean;
  disabled?: boolean;
}
const SharedSwitchFormFieldRender = <TName extends string>({
  field,
  label,
  isRequired,
  disabled = false,
  ...restProps
}: IProps<TName>) => {
  return (
    <FormItem className='flex items-center gap-2 py-2'>
      {label ? (
        <FormLabel className='!mt-0'>
          {label} {isRequired ? <strong className='required'>*</strong> : ''}
        </FormLabel>
      ) : null}
      <FormControl>
        <Switch
          className='!mt-0'
          checked={field.value}
          onCheckedChange={field.onChange}
          disabled={disabled}
          {...restProps}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SharedSwitchFormFieldRender;
