import { useDropzone } from '@uploadthing/react';
import { UploadCloud, X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { toast } from 'sonner';

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

import { allowedTypes, FILE_UPLOAD_TOAST_MESSAGES, MAX_FILE_SIZE } from '@entities/image/consts';
import { FileWithDropzone } from '@entities/image/types';

interface IProps<TName extends string> {
  files: FileWithDropzone[];
  setFiles: Dispatch<SetStateAction<FileWithDropzone[]>>;
  field: ControllerRenderProps<any, TName>;
  label: string;
  desc?: string;
  isRequired?: boolean;
  disabled?: boolean;
  imgMaxClassName?: string;
  imgClassName?: string;
  maxFiles?: number;
  multiple?: boolean;
}

const SharedImageFormFieldRender = <TName extends string>({
  files,
  setFiles,
  field,
  label,
  desc,
  isRequired,
  disabled,
  imgMaxClassName,
  imgClassName,
  multiple,
  maxFiles = 1,
}: IProps<TName>) => {
  const onDrop = (acceptedFiles: File[]) => {
    const filteredFiles = acceptedFiles.filter(file => allowedTypes.includes(file.type));

    if (filteredFiles.length < acceptedFiles.length) {
      toast.error('JPG, JPEG, PNG 형식의 이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    if (files.length >= maxFiles) {
      toast.warning(FILE_UPLOAD_TOAST_MESSAGES.MAX_COUNT_EXCEEDED);
      return;
    }

    const restoredFiles = acceptedFiles.map((file: File) => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });

    setFiles(prev => (multiple ? [...prev, ...restoredFiles] : restoredFiles));
    field.onChange(multiple ? [...files, ...acceptedFiles] : acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.png', '.jpeg'],
    },

    maxFiles,
    multiple,
    disabled,
  });

  const onRemovePreview = (fileIndex: number) => () => {
    URL.revokeObjectURL(files[fileIndex].preview);
    setFiles(files.filter((_, index) => index !== fileIndex));
    field.onChange(files.filter((_, index) => index !== fileIndex));
  };

  return (
    <FormItem>
      <FormLabel className='block'>
        <span className='flex items-center gap-0.5'>
          {label} {isRequired ? <strong className='required'>*</strong> : null}
        </span>
        {desc ? (
          <FormDescription className='mt-[2px] text-[10px] text-slate-400'>{desc}</FormDescription>
        ) : null}
      </FormLabel>

      <FormControl className='min-w-full'>
        <div
          {...getRootProps()}
          className='flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white p-8 text-gray-700 transition select-none hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-blue-500'
        >
          <input {...getInputProps()} disabled={disabled} className='sr-only' />
          <UploadCloud className='mb-3 size-10 text-blue-500' />
          <p className='text-sm font-semibold'>여기에 파일을 드롭하거나 클릭하여 업로드하세요</p>
          <p className='mt-1 text-xs text-gray-500'>
            최대 {MAX_FILE_SIZE}의 PNG, JPG, JPEG 파일만을 지원합니다
          </p>
        </div>
      </FormControl>
      <FormMessage className='text-xs' />
      {files?.length > 0 && (
        <div className='mt-2 flex gap-4 overflow-x-auto'>
          {files.map((file, fileIndex) => (
            <div key={`${file.name}-${fileIndex}`} className={cn('relative', imgMaxClassName)}>
              <div
                className='absolute top-1 right-1 cursor-pointer rounded-full bg-slate-700 p-1 shadow hover:bg-slate-600'
                onClick={onRemovePreview(fileIndex)}
              >
                <X size={16} className='text-white' />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={'url' in file ? file.url : file?.preview}
                alt={file.name}
                className={cn('size-64 object-cover', imgClassName)}
              />
            </div>
          ))}
        </div>
      )}
    </FormItem>
  );
};

export default SharedImageFormFieldRender;
