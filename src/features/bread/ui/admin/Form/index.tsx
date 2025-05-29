import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, Form } from '@shadcn-ui/ui';

import { BreadFormDto } from '@entities/bread/types';

interface IProps {
  form: UseFormReturn<BreadFormDto>;
  submitProps: {
    label: string;
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  };
}

const BreadForm: FC<IProps> = ({ submitProps, form }) => {
  console.log('submitProps', submitProps);
  return (
    <Form {...form}>
      <form onSubmit={e => e.stopPropagation()}>
        <div className='flex justify-end gap-4'>
          <Button type='button' onClick={submitProps.onSubmit}>
            {submitProps.label}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BreadForm;
