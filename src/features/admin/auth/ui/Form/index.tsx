import type { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@shadcn-ui/ui/button';
import { Form, FormField } from '@shadcn-ui/ui/form';

import { AdminLoginFormDto } from '@entities/auth/types';

import SharedFormFieldRender from '@components/FormFieldRender';

interface IProps {
  form: UseFormReturn<AdminLoginFormDto>;
  onSubmit: () => Promise<void>;
}

const AdminLoginForm: FC<IProps> = ({ form, onSubmit }) => {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='w-full max-w-3xl space-y-6'>
        <FormField
          name='username'
          control={form.control}
          render={({ field }) => <SharedFormFieldRender label='아이디' field={field} type='text' />}
        />
        <FormField
          name='password'
          control={form.control}
          render={({ field }) => (
            <SharedFormFieldRender label='비밀번호' field={field} type='password' />
          )}
        />

        <Button type='submit' className='w-full'>
          로그인
        </Button>
      </form>
    </Form>
  );
};

export default AdminLoginForm;
