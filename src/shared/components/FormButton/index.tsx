import { Button } from '@shared/shadcn-ui/ui';
import { cn } from '@shared/shadcn-ui/utils';
import { LoaderCircle } from 'lucide-react';
import type { ComponentProps, FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface IProps extends ComponentProps<typeof Button> {
  formContext: UseFormReturn<any>;
  label: string;
}

const FormButton: FC<IProps> = ({ formContext, label, className, ...props }) => {
  const { formState } = formContext;
  const { isSubmitting, isDirty } = formState;

  return (
    <Button
      type='button'
      disabled={!isDirty || isSubmitting}
      {...props}
      className={cn('w-20', className)}
    >
      {isSubmitting ? <LoaderCircle className='size-5 animate-spin' /> : label}
    </Button>
  );
};

export default FormButton;
