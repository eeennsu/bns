import { STRING_LENGTH } from '@db/consts/commons';
import { inputOnlyNumber } from '@libs/format';
import SharedDatePickerFormFieldRender from '@shared/components/DatePickerFormFieldRender';
import FormButton from '@shared/components/FormButton';
import { BaseSyntheticEvent, Dispatch, FC, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Form, FormField } from '@shadcn-ui/ui';

import { EventFormDto } from '@entities/event/types';
import { FileWithDropzone } from '@entities/image/types';

import SharedFormFieldRender from '@components/FormFieldRender';
import SharedFormTextareaFieldRender from '@components/FormTextareaFieldRender';
import SharedImageFormFieldRender from '@components/ImageFormFieldRender';
import SharedSwitchFormFieldRender from '@components/SwitchFormFieldRender';

interface IProps {
  form: UseFormReturn<EventFormDto>;
  files: FileWithDropzone[];
  setFiles: Dispatch<SetStateAction<FileWithDropzone[]>>;
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
          <FormButton formContext={form} label={submitProps.label} onClick={submitProps.onSubmit} />
        </section>
        <section className='space-y-5'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => <SharedFormFieldRender label='이름' field={field} isRequired />}
          />

          <div className='flex items-center gap-3'>
            <FormField
              name='startDate'
              control={form.control}
              render={({ field }) => (
                <SharedDatePickerFormFieldRender label='시작일' field={field} isRequired />
              )}
            />
            <FormField
              name='endDate'
              control={form.control}
              render={({ field }) => (
                <SharedDatePickerFormFieldRender label='종료일' field={field} isRequired />
              )}
            />
          </div>

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

          <FormField
            name='shortDescription'
            control={form.control}
            render={({ field }) => (
              <SharedFormTextareaFieldRender
                label='요약 설명'
                field={field}
                isRequired
                maxLength={STRING_LENGTH.DESCRIPTION}
                className='h-14'
              />
            )}
          />

          <FormField
            name='longDescription'
            control={form.control}
            render={({ field }) => (
              <SharedFormTextareaFieldRender
                label='상세 설명'
                field={field}
                isRequired
                maxLength={STRING_LENGTH.LONG_DESCRIPTION}
                className='h-64'
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

          {/* <FormField
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
          /> */}

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
