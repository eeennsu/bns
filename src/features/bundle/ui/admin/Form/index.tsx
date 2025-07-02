import { inputOnlyNumber } from '@libs/format';
import FormButton from '@shared/components/FormButton';
import { LoaderCircle } from 'lucide-react';
import { BaseSyntheticEvent, Dispatch, FC, SetStateAction, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Form, FormField } from '@shadcn-ui/ui';

import useGetProductList from '@features/bundle/hooks/useGetProductsList';
import { convertToSelectItem } from '@features/bundle/libs/selectItem';

import { BUNDLE_COMMAND_GROUP_HEADINGS } from '@entities/bundle/consts';
import { BundleFormDto, ICommandGroupBundle } from '@entities/bundle/types';
import { FileWithDropzone } from '@entities/image/types';

import useCommandGroups from '@hooks/useCommandGroups';

import { SelectItem } from '@typings/commons';

import SharedFormFieldCommand from '@components/Command';
import SharedFormFieldRender from '@components/FormFieldRender';
import SharedFormTextareaFieldRender from '@components/FormTextareaFieldRender';
import SharedImageFormFieldRender from '@components/ImageFormFieldRender';
import SharedSwitchFormFieldRender from '@components/SwitchFormFieldRender';

import SelectProductList from './SelectProductList';

interface IProps {
  form: UseFormReturn<BundleFormDto>;
  files: FileWithDropzone[];
  setFiles: Dispatch<SetStateAction<FileWithDropzone[]>>;
  submitProps: {
    label: string;
    onSubmit: (e?: BaseSyntheticEvent<object, any, any> | undefined) => Promise<void>;
  };
}

const BundleForm: FC<IProps> = ({ submitProps, form, files, setFiles }) => {
  const { productsList, isLoading: isProductsListLoading } = useGetProductList();

  const groupList = useMemo<SelectItem[][]>(
    () => [
      productsList?.breads.map(convertToSelectItem),
      productsList?.sauces.map(convertToSelectItem),
      productsList?.dishes.map(convertToSelectItem),
    ],
    [productsList],
  );

  const { commandGroups, setCommandGroups } = useCommandGroups<ICommandGroupBundle[]>({
    headings: BUNDLE_COMMAND_GROUP_HEADINGS,
    groupList,
  });

  return (
    <Form {...form}>
      <form onSubmit={e => e.stopPropagation()}>
        <section className='flex justify-end gap-4'>
          <FormButton formContext={form} label={submitProps.label} onClick={submitProps.onSubmit} />
        </section>
        <section className='flex flex-col gap-5'>
          <div className='flex w-full gap-2'>
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
            </div>
          </div>
          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <SharedFormTextareaFieldRender label='설명' field={field} isRequired />
            )}
          />

          {isProductsListLoading ? (
            <div className='flex items-center gap-2 text-xs text-gray-400'>
              <LoaderCircle className='animate-spin' /> 세트 구성품 목록을 불러오는 중입니다...
            </div>
          ) : groupList.flat().length === 0 ? (
            <p className='w-fit rounded-lg bg-red-500 px-4 py-2.5 text-xs text-white'>
              세트 구성에 필요한 메뉴들이 하나도 존재하지 않습니다. 메뉴를 추가해주세요.
            </p>
          ) : (
            <div className='my-4 space-y-6'>
              <div className='space-y-3'>
                <div className='flex w-full justify-start'>
                  <SharedFormFieldCommand<ICommandGroupBundle>
                    label='세트 구성품 목록'
                    isRequired
                    inputPlaceholder='구성품 목록을 검색해주세요.'
                    triggerLabel='추가할 구성품 목록을 선택해주세요'
                    commandGroups={commandGroups}
                    setCommandGroups={setCommandGroups}
                    renderSubLabel={item => (
                      <span className='mt-[3px] ml-1.5 text-[10px] text-gray-600'>
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
            </div>
          )}
          <div className='mt-6 flex flex-col gap-12'>
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
                  maxFilesCount={5}
                />
              )}
            />
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
