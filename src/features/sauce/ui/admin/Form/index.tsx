import { inputOnlyNumber } from '@libs/inputOnlyNumber';
import type { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, Form, FormField } from '@shadcn-ui/ui';

import SharedFormFieldRender from '@components/FormFieldRender';

interface IProps {
  form: UseFormReturn;
  submitProps: {
    label: string;
    onSubmit: (e?: React.BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  };
}

const SauceForm: FC<IProps> = ({ form, submitProps }) => {
  return (
    <Form {...form}>
      <form>
        <section className='flex justify-end gap-4'>
          <Button type='button' onClick={submitProps.onSubmit}>
            {submitProps.label}
          </Button>
        </section>
        <section className='space-y-6'>
          <div className='flex items-center gap-3'>
            <div className='grow'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <SharedFormFieldRender label='이름' type='text' field={field} isRequired />
                )}
              />
            </div>
            <div className='grow'>
              <FormField
                name='price'
                control={form.control}
                render={({ field }) => (
                  <SharedFormFieldRender
                    label='가격'
                    type='number'
                    field={field}
                    isRequired
                    onChangeCapture={inputOnlyNumber}
                  />
                )}
              />
            </div>
            <div className='w-full'>
              <FormField
                name='sortOrder'
                control={form.control}
                render={({ field }) => (
                  <SharedFormFieldRender
                    label='정렬 순서'
                    type='number'
                    field={field}
                    isRequired
                    onChangeCapture={inputOnlyNumber}
                  />
                )}
              />
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
};

export default SauceForm;
