import type { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Form, FormField, Button } from '@shadcn-ui/ui';

import { AdminLoginFormDto } from '@entities/auth/types';

import SharedFormFieldRender from '@components/FormFieldRender';

interface IProps {
  form: UseFormReturn<AdminLoginFormDto>;
  onSubmit: () => Promise<void>;
  isLoadingLogin: boolean;
}

const AdminLoginForm: FC<IProps> = ({ form, onSubmit, isLoadingLogin }) => {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='w-full max-w-3xl space-y-6'>
        <FormField
          name='username'
          control={form.control}
          disabled={isLoadingLogin}
          render={({ field }) => <SharedFormFieldRender label='아이디' field={field} />}
        />
        <FormField
          name='password'
          control={form.control}
          disabled={isLoadingLogin}
          render={({ field }) => (
            <SharedFormFieldRender label='비밀번호' field={field} type='password' />
          )}
        />

        <Button type='submit' className='w-full' disabled={isLoadingLogin}>
          {isLoadingLogin ? '로그인 중...' : '로그인'}
        </Button>
      </form>
    </Form>
  );
};

export default AdminLoginForm;
