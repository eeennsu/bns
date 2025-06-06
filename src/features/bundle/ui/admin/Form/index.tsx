import { BaseSyntheticEvent, Dispatch, FC, SetStateAction, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, Form, FormField } from '@shadcn-ui/ui';

import { BUNDLE_COMMAND_GROUPS_HEADING } from '@entities/bundle/consts';
import { BundleFormDto, SelectProductItem } from '@entities/bundle/types';

import useCommandGroups from '@hooks/useCommandGroups';

import { FileWithPreview, SelectItem } from '@typings/commons';

import SharedCommand from '@components/Command';
import SharedFormFieldRender from '@components/FormFieldRender';
import SharedFormTextareaFieldRender from '@components/FormTextareaFieldRender';
import SharedImageFormFieldRender from '@components/ImageFormFieldRender';
import SharedSwitchFormFieldRender from '@components/SwitchFormFieldRender';

interface IProps {
  form: UseFormReturn<BundleFormDto>;
  files: FileWithPreview[];
  setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
  submitProps: {
    label: string;
    onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  };
  breadList: SelectProductItem[];
  sauceList: SelectProductItem[];
}

const BundleForm: FC<IProps> = ({ submitProps, form, files, setFiles, breadList, sauceList }) => {
  const groupList = useMemo<SelectItem[][]>(() => [breadList, sauceList], [breadList, sauceList]);
  const { commandGroups, selectedCommandGroups, setSelectedCommandGroups } = useCommandGroups({
    headings: BUNDLE_COMMAND_GROUPS_HEADING,
    groupList,
  });

  console.log(selectedCommandGroups);

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
            render={({ field }) => (
              <SharedFormFieldRender label='이름' type='text' field={field} isRequired />
            )}
          />
          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <SharedFormTextareaFieldRender label='설명' field={field} isRequired />
            )}
          />
          <div className='flex items-center gap-3'>
            <div className='grow'>
              <FormField
                name='price'
                control={form.control}
                render={({ field }) => (
                  <SharedFormFieldRender label='가격' type='number' field={field} isRequired />
                )}
              />
            </div>
            <div className='grow'>
              <FormField
                name='discountedPrice'
                control={form.control}
                render={({ field }) => (
                  <SharedFormFieldRender label='할인 가격' type='number' field={field} />
                )}
              />
            </div>
          </div>

          <div className='my-10 space-y-10'>
            <FormField
              name='imageFiles'
              control={form.control}
              render={({ field }) => (
                <SharedImageFormFieldRender
                  files={files}
                  setFiles={setFiles}
                  label='이미지'
                  desc=' 최대 5개까지 업로드 가능합니다. 첫번째 이미지가 대표 이미지로 사용됩니다.'
                  field={field}
                  isRequired
                />
              )}
            />

            <div className='flex flex-col gap-4'>
              <div className='space-y-3'>
                <div className='flex w-full justify-start'>
                  <SharedCommand
                    label='세트 구성품 목록'
                    isRequired
                    inputPlaceholder='추가할 빵, 소스를 검색해주세요.'
                    triggerLabel='추가할 세트 구성품을 선택해주세요'
                    commandGroups={commandGroups}
                    setSelectedItems={setSelectedCommandGroups}
                  />
                </div>

                {selectedCommandGroups.length > 0 && (
                  <div className='flex w-full flex-col gap-4'>
                    {selectedCommandGroups.map(group => (
                      <div key={group.heading.value} className='flex flex-col gap-2'>
                        <div className='text-muted-foreground text-sm font-semibold'>
                          {group.heading.label}
                        </div>
                        <div className='flex flex-wrap gap-2'>
                          {group.items.map(item => (
                            <div
                              key={item.value}
                              className='bg-muted text-muted-foreground rounded-md px-3 py-1 text-xs'
                            >
                              {item.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

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

export default BundleForm;
