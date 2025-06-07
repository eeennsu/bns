import { STRING_LENGTH } from '@db/consts/commons';
import { inputOnlyNumber } from '@libs/inputOnlyNumber';
import { BaseSyntheticEvent, Dispatch, FC, SetStateAction } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, Form, FormField } from '@shadcn-ui/ui';

import { BreadFormDto } from '@entities/bread/types';

import { FileWithPreview } from '@typings/commons';

import { MBTI_TYPE } from '@consts/brand';

import SharedFormFieldRender from '@components/FormFieldRender';
import SharedFormTextareaFieldRender from '@components/FormTextareaFieldRender';
import SharedImageFormFieldRender from '@components/ImageFormFieldRender';
import SharedSelectFormFieldRender from '@components/SelectFormFieldRender';
import SharedSwitchFormFieldRender from '@components/SwitchFormFieldRender';

interface IProps {
  form: UseFormReturn<BreadFormDto>;
  files: FileWithPreview[];
  setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
  submitProps: {
    label: string;
    onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  };
}

const BreadForm: FC<IProps> = ({ submitProps, form, files, setFiles }) => {
  return (
    <Form {...form}>
      <form onSubmit={e => e.stopPropagation()}>
        <section className='flex justify-end gap-4'>
          <Button type='button' onClick={submitProps.onSubmit}>
            {submitProps.label}
          </Button>
        </section>
        <section className='space-y-5'>
          <div className='flex items-center gap-3'>
            <div className='grow'>
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <SharedFormFieldRender label='이름' field={field} isRequired />
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
          </div>
          <div className='flex items-center gap-3'>
            <div className='w-full'>
              <FormField
                name='mbti'
                control={form.control}
                render={({ field }) => (
                  <SharedSelectFormFieldRender
                    label='MBTI'
                    field={field}
                    isRequired
                    selectList={MBTI_TYPE}
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

          <div className='space-y-1'>
            <FormField
              name='isNew'
              control={form.control}
              render={({ field }) => (
                <SharedSwitchFormFieldRender label='신메뉴 여부' field={field} />
              )}
            />

            <FormField
              name='isSigniture'
              control={form.control}
              render={({ field }) => (
                <SharedSwitchFormFieldRender label='시그니처 여부' field={field} />
              )}
            />

            <FormField
              name='isHidden'
              control={form.control}
              render={({ field }) => (
                <SharedSwitchFormFieldRender label='숨김 여부' field={field} />
              )}
            />
          </div>
        </section>
      </form>
    </Form>
  );
};

export default BreadForm;
