import { inputOnlyNumber } from '@libs/inputOnlyNumber';
import { BaseSyntheticEvent, Dispatch, FC, SetStateAction, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, Form, FormField } from '@shadcn-ui/ui';

import { BUNDLE_COMMAND_GROUP_HEADINGS } from '@entities/bundle/consts';
import { BundleFormDto, ICommandGroupBundle, SelectProductItem } from '@entities/bundle/types';

import useCommandGroups from '@hooks/useCommandGroups';

import { FileWithPreview, SelectItem } from '@typings/commons';

import SharedCommand from '@components/Command';
import SharedFormFieldRender from '@components/FormFieldRender';
import SharedFormTextareaFieldRender from '@components/FormTextareaFieldRender';
import SharedImageFormFieldRender from '@components/ImageFormFieldRender';
import SharedSwitchFormFieldRender from '@components/SwitchFormFieldRender';

import SelectProductList from './SelectProductList';

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

  const { commandGroups, setCommandGroups } = useCommandGroups<ICommandGroupBundle[]>({
    headings: BUNDLE_COMMAND_GROUP_HEADINGS,
    groupList,
  });

  return (
    <Form {...form}>
      <form onSubmit={e => e.stopPropagation()}>
        <section className='flex justify-end gap-4'>
          <Button type='button' onClick={submitProps.onSubmit}>
            {submitProps.label}
          </Button>
        </section>
        <section className='flex flex-col gap-5'>
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => <SharedFormFieldRender label='이름' field={field} isRequired />}
          />
          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <SharedFormTextareaFieldRender label='설명' field={field} isRequired />
            )}
          />

          <div className='mt-6 flex flex-col gap-12'>
            <div className='space-y-3'>
              <div className='flex w-full justify-start'>
                <SharedCommand<ICommandGroupBundle>
                  label='세트 구성품 목록'
                  isRequired
                  inputPlaceholder='추가할 빵, 소스를 검색해주세요.'
                  triggerLabel='추가할 세트 구성품을 선택해주세요'
                  commandGroups={commandGroups}
                  setCommandGroups={setCommandGroups}
                  renderSubLabel={item => (
                    <span className='mt-[3px] ml-1 text-[10px] text-gray-700 italic'>
                      {item.price.toLocaleString()}원
                    </span>
                  )}
                  formErrorMessage={form?.formState.errors?.productsList?.message}
                />
              </div>
              <SelectProductList
                commandGroups={commandGroups}
                setCommandGroups={setCommandGroups}
              />
            </div>
            <FormField
              name='discountedPrice'
              control={form.control}
              render={({ field }) => (
                <SharedFormFieldRender
                  label='세트 구성 가격'
                  type='number'
                  field={field}
                  tooltip='입력하지 않을 경우, 세트 가격은 선택한 품목들의 합계로 자동 적용됩니다.'
                  onChangeCapture={inputOnlyNumber}
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
                  desc=' 최대 5개까지 업로드 가능합니다. 첫번째 이미지가 대표 이미지로 사용됩니다.'
                  field={field}
                  isRequired
                />
              )}
            />
          </div>
          <FormField
            name='sortOrder'
            control={form.control}
            render={({ field }) => (
              <SharedFormFieldRender
                label='정렬 순서'
                field={field}
                isRequired
                onChangeCapture={inputOnlyNumber}
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

export default BundleForm;
