import { UploadDropzone } from '@libs/uploadImage';
import { ControllerRenderProps } from 'react-hook-form';

import { FormControl, FormDescription, FormItem, FormLabel } from '@shadcn-ui/ui';

interface IProps<TName extends string> {
  field: ControllerRenderProps<any, TName>;
  label?: string;
  desc?: string;
  isRequired?: boolean;
  disabled?: boolean;
}

const SharedImageFormFieldRender = <TName extends string>({
  field,
  label,
  desc,
  isRequired,
  disabled,
}: IProps<TName>) => {
  return (
    <FormItem>
      {label && (
        <FormLabel>
          {label} {isRequired ? <strong className='required'>*</strong> : ''}
        </FormLabel>
      )}
      {desc && <FormDescription className='mt-1 text-sm text-blue-500'>{desc}</FormDescription>}
      <FormControl>
        <UploadDropzone
          endpoint='imageUploader'
          onClientUploadComplete={res => {
            field.onChange(res.map(file => file.ufsUrl));
          }}
          onUploadError={(error: Error) => {
            console.error(error);
            alert('이미지 업로드에 실패하였습니다.');
          }}
          disabled={disabled}
          appearance={{
            allowedContent: '!text-xs !text-gray-400',
            container: 'border-dashed border-2 !border-gray-300 cursor-pointer',
            uploadIcon: '!size-11',
            label: 'hidden',
            button: 'hidden',
          }}
          content={{
            allowedContent: '각 이미지당 4MB 이하로 업로드 가능합니다.',
          }}
        />
      </FormControl>
    </FormItem>
  );
};

export default SharedImageFormFieldRender;
