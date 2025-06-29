import { FormControl, FormItem, FormLabel, FormMessage } from '@shared/shadcn-ui/ui';
import { FC, ReactNode } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

import TagsInput, { TagsInputProps } from '../TagInput';

interface IProps extends Omit<TagsInputProps, 'value' | 'onValueChange'> {
  field: ControllerRenderProps<any, string>;
  label?: string;
  isRequired?: boolean;
  desc?: string;
  tooltip?: ReactNode;
}

const SharedTagInputFormFieldRender: FC<IProps> = ({
  label,
  isRequired,
  field,
  placeholder,
  tooltip,
  maxItems,
  minItems,
  ...props
}) => {
  return (
    <FormItem>
      <FormLabel className='gap-0.5'>
        {label}
        {isRequired ? <strong className='required'>*</strong> : null}
        {tooltip ? <span className='tooltip'>{tooltip}</span> : null}
      </FormLabel>
      <FormControl>
        <TagsInput
          value={field.value}
          onValueChange={field.onChange}
          placeholder={placeholder}
          maxItems={maxItems}
          minItems={minItems}
          {...props}
        />
      </FormControl>
      <FormMessage className='text-xs' />
    </FormItem>
  );
};

export default SharedTagInputFormFieldRender;
