import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { BreadFormDto } from '@entities/bread/types';
import { Form } from '@shadcn-ui/ui';

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
      <form onSubmit={e => e.stopPropagation()}></form>
    </Form>
  );
};

export default BreadForm;
