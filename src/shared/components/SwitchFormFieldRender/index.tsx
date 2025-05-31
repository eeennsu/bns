import type { ControllerRenderProps } from 'react-hook-form';

import { Switch, FormControl, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';

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
          data-testid={`${field.name}-switch`}
          {...restProps}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SharedSwitchFormFieldRender;
