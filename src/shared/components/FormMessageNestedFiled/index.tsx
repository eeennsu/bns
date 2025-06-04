import { getDeepValue } from '@libs/object';
import { ComponentProps, FC } from 'react';

import { useFormField } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

interface IProps extends ComponentProps<'p'> {
  paths: string[];
  className?: string;
}

const FormMessageNestedField: FC<IProps> = ({ paths, className, ...props }) => {
  const { error, formMessageId } = useFormField();

  const message =
    paths.map(path => getDeepValue(error, path)?.message).find(msg => !!msg) ??
    error?.message ??
    null;

  if (!message) return null;

  return (
    <p
      data-slot='form-message'
      id={formMessageId}
      className={cn('text-destructive text-xs', className)}
      {...props}
    >
      {message}
    </p>
  );
};

export default FormMessageNestedField;
