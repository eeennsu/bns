import { SubmitErrorHandler } from 'react-hook-form';
import { toast } from 'sonner';

export const formErrorHandler: SubmitErrorHandler<any> = errors => {
  const entries = Object.entries(errors);

  const firstError = entries.find(([, error]) => error?.message);
  if (firstError) {
    toast.warning(firstError[1]?.message.toString());

    console.error(
      'Form validation error:',
      entries.map(([field, error]) => ({
        field,
        message: error?.message.toString(),
      })),
    );
  }
};
