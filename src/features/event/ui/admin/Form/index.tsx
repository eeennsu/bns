import { STRING_LENGTH } from '@db/consts/commons';
import { BaseSyntheticEvent, Dispatch, FC, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, Form, FormField } from '@shadcn-ui/ui';

import { EventFormDto } from '@entities/event/types';

import { FileWithPreview } from '@typings/commons';

import SharedDatePickerFormFieldRender from '@components/DatePickerFormFiledRender';
import SharedFormFieldRender from '@components/FormFieldRender';
import SharedFormTextareaFieldRender from '@components/FormTextareaFieldRender';
import SharedImageFormFieldRender from '@components/ImageFormFieldRender';
import SharedSwitchFormFieldRender from '@components/SwitchFormFieldRender';

interface IProps {
  form: UseFormReturn<EventFormDto>;
  files: FileWithPreview[];
  setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
  submitProps: {
    label: string;
    onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  };
}

const EventForm: FC<IProps> = ({ submitProps, form, files, setFiles }) => {
  return (
    <Form {...form}>
      <form onSubmit={e => e.stopPropagation()}>
        <section className='flex justify-end gap-4'>
          <Button type='button' onClick={submitProps.onSubmit}>
            {submitProps.label}
          </Button>
        </section>
        <section className='space-y-5'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => <SharedFormFieldRender label='이름' field={field} isRequired />}
          />

          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <SharedFormTextareaFieldRender
                label='설명'
                field={field}
                isRequired
                maxLength={STRING_LENGTH.DESCRIPTION}
              />
            )}
          />

          <FormField
            name='imageFiles'
            control={form.control}
            render={({ field }) => (
              <SharedImageFormFieldRender
                files={files}
                setFiles={setFiles}
                label='이미지'
                desc=' 최대 1개까지 업로드 가능합니다.'
                field={field}
                isRequired
              />
            )}
          />

          <FormField
            name='dateRange'
            control={form.control}
            render={({ field }) => (
              <SharedDatePickerFormFieldRender
                label='이벤트 기간'
                field={field}
                isRequired
                mode='future'
              />
            )}
          />

          <FormField
            name='isHidden'
            control={form.control}
            render={({ field }) => <SharedSwitchFormFieldRender label='숨김 여부' field={field} />}
          />
        </section>
      </form>
    </Form>
  );
};

export default EventForm;
