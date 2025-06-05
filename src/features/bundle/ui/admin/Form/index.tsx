import { Minus, Plus } from 'lucide-react';
import { BaseSyntheticEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button, Form, FormField } from '@shadcn-ui/ui';

import { BundleFormDto, SelectedProductItem, SelectProductItem } from '@entities/bundle/types';

import { FileWithPreview } from '@typings/commons';

import SharedFormFieldRender from '@components/FormFieldRender';
import SharedFormTextareaFieldRender from '@components/FormTextareaFieldRender';
import SharedImageFormFieldRender from '@components/ImageFormFieldRender';
import SharedMultiSelect from '@components/MultiSelect';
import SharedSelect from '@components/Select';
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

const BundleForm: FC<IProps> = ({ submitProps, form, files, setFiles, breadList }) => {
  const [selectedBreadList, setSelectedBreadList] = useState<SelectedProductItem[]>([]);
  // const [selectedSauceList, setSelectedSauceList] = useState<SelectItem[]>([]);

  const handleBreadToggle = (value: string) => {
    setSelectedBreadList(prev => {
      const findBread = breadList.find(v => v.value === value);
      return [...prev, { label: findBread.label, value, quantity: 1, price: findBread.price }];
    });
  };

  const handleQuantityChange = (value: string, quantity: number) => {
    setSelectedBreadList(prev => {
      const existing = prev.find(item => item.value === value);
      if (existing) {
        if (quantity === 0) {
          return prev.filter(item => item.value !== value);
        } else {
          return prev.map(item => (item.value === value ? { ...item, quantity } : item));
        }
      } else {
        return prev;
      }
    });
  };

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

          <FormField
            name='isHidden'
            control={form.control}
            render={({ field }) => <SharedSwitchFormFieldRender label='숨김 여부' field={field} />}
          />

          <div className='flex flex-col gap-4'>
            <div className='space-y-3'>
              <div className='flex w-full justify-start'>
                <SharedMultiSelect
                  placeholder='추가할 빵 목록을 선택해주세요'
                  selectList={breadList}
                  setValues={setSelectedBreadList}
                />
              </div>

              {selectedBreadList.length > 0 && (
                <div className='flex w-full flex-wrap justify-start gap-4'>
                  {selectedBreadList.map(bread => {
                    const selectedItem = selectedBreadList.find(item => item.value === bread.value);

                    return (
                      <div
                        key={bread.value}
                        className='flex items-center justify-between rounded-xl border px-3 py-2 shadow-sm'
                      >
                        <span className='truncate text-sm font-medium'>{selectedItem.label}</span>

                        <div className='flex items-center gap-2'>
                          <Button
                            variant='ghost'
                            type='button'
                            size='icon'
                            className='size-7'
                            onClick={() => handleQuantityChange(bread.value, bread.quantity - 1)}
                          >
                            <Minus className='h-4 w-4' />
                          </Button>

                          <span className='w-6 text-center text-sm font-medium'>
                            {selectedItem.quantity}
                          </span>

                          <Button
                            variant='ghost'
                            type='button'
                            size='icon'
                            className='size-7'
                            onClick={() => handleQuantityChange(bread.value, bread.quantity + 1)}
                          >
                            <Plus className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      </form>
    </Form>
  );
};

export default BundleForm;
