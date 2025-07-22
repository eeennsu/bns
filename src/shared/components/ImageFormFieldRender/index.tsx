import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { useDropzone } from '@uploadthing/react';
import { UploadCloud } from 'lucide-react';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { toast } from 'sonner';

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@shadcn-ui/ui';

import {
  ALLOWED_FILE_TYPES,
  ALLOWED_IMAGE_TYPES,
  FILE_UPLOAD_TOAST_MESSAGES,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_BYTES,
} from '@entities/image/consts';
import { FileWithDropzone } from '@entities/image/types';

import Tooltip from '../Tooltip';
import ImagePreview from './ImagePreview';
import SortableImage from './SortableImage';

interface IProps<TName extends string> {
  files: FileWithDropzone[];
  setFiles: Dispatch<SetStateAction<FileWithDropzone[]>>;
  field: ControllerRenderProps<any, TName>;
  label: string;
  desc?: string;
  isRequired?: boolean;
  tooltip?: ReactNode;
  disabled?: boolean;
  imgClassName?: string;
  maxFilesCount?: number;
  isDrag?: boolean;
}

const SharedImageFormFieldRender = <TName extends string>({
  files,
  setFiles,
  field,
  label,
  desc,
  tooltip,
  isRequired,
  disabled,
  imgClassName,
  maxFilesCount = 1,
  isDrag = true,
}: IProps<TName>) => {
  const multiple = maxFilesCount > 1;
  const onDrop = (acceptedFiles: File[]) => {
    const filesCount = files.length + acceptedFiles.length;
    if (filesCount > maxFilesCount) {
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.MAX_COUNT_EXCEEDED);
      return;
    }

    const oversizedFiles = acceptedFiles.filter(file => file.size > MAX_FILE_SIZE_BYTES);
    if (oversizedFiles.length > 0) {
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.FILE_TOO_LARGE);
      return;
    }

    const filteredFiles = acceptedFiles.filter(file => ALLOWED_IMAGE_TYPES.includes(file.type));
    if (filteredFiles.length < acceptedFiles.length) {
      toast.error(FILE_UPLOAD_TOAST_MESSAGES.IMAGE_TYPE_ERROR);
      return;
    }

    const restoredFiles = acceptedFiles.map((file: File) => {
      return Object.assign(file, {
        id: crypto.randomUUID(),
        preview: URL.createObjectURL(file),
      });
    });

    setFiles(prev => (multiple ? [...prev, ...restoredFiles] : restoredFiles));
    field.onChange(multiple ? [...files, ...acceptedFiles] : acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ALLOWED_FILE_TYPES,
    },
    maxFiles: maxFilesCount,
    multiple,
    disabled,
  });

  const onRemovePreview = (fileIndex: number) => () => {
    URL.revokeObjectURL(files[fileIndex].preview);
    setFiles(files.filter((_, index) => index !== fileIndex));
    field.onChange(files.filter((_, index) => index !== fileIndex));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = files.findIndex(f => f?.id === active.id);
      const newIndex = files.findIndex(f => f?.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newFiles = arrayMove(files, oldIndex, newIndex);
        setFiles(newFiles);
        field.onChange(newFiles);
      }
    }
  };

  return (
    <FormItem>
      {label ? (
        <FormLabel className='block'>
          <span className='flex items-center gap-0.5'>
            {label} {isRequired ? <strong className='required'>*</strong> : null}
            {tooltip ? <Tooltip content={tooltip} triggerClassName='ml-1' /> : null}
          </span>
          {desc ? (
            <FormDescription className='mt-[2px] text-[10px] text-slate-400'>
              {desc}
            </FormDescription>
          ) : null}
        </FormLabel>
      ) : null}

      <FormControl className='min-w-full'>
        <div
          {...getRootProps()}
          className='flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white p-8 text-gray-700 transition select-none hover:border-blue-200 hover:bg-blue-50 focus-visible:outline focus-visible:outline-blue-500'
        >
          <input {...getInputProps()} disabled={disabled} className='sr-only' />
          <UploadCloud className='mb-3 size-10 text-blue-500' />
          <p className='text-sm font-semibold'>여기에 파일을 드롭하거나 클릭하여 업로드하세요</p>
          <p className='mt-1 text-xs text-gray-500'>
            최대 {MAX_FILE_SIZE}의 {ALLOWED_FILE_TYPES.join(', ').replaceAll('.', '')} 파일만을
            지원합니다
          </p>
        </div>
      </FormControl>
      <FormMessage className='text-xs' />
      {isDrag ? (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={files.map(f => f.id)} strategy={rectSortingStrategy}>
            {files?.length > 0 && (
              <div className='mt-2 flex flex-wrap gap-4 overflow-visible'>
                {files?.map((file, index) => (
                  <SortableImage
                    key={file?.id}
                    index={index}
                    file={file}
                    onRemovePreview={onRemovePreview}
                    imgClassName={imgClassName}
                    multiple={multiple}
                  />
                ))}
              </div>
            )}
          </SortableContext>
        </DndContext>
      ) : (
        <div className='mt-2 flex flex-wrap gap-4 overflow-visible'>
          {files?.map((file, index) => (
            <ImagePreview
              key={file?.id}
              index={index}
              file={file}
              onRemovePreview={onRemovePreview}
              imgClassName={imgClassName}
              multiple={multiple}
            />
          ))}
        </div>
      )}
    </FormItem>
  );
};

export default SharedImageFormFieldRender;
