import { cn } from '@shared/shadcn-ui/utils';
import { X } from 'lucide-react';
import React, { FC } from 'react';

import { FileWithDropzone } from '@entities/image/types';

interface IProps {
  file: FileWithDropzone;
  index: number;
  multiple: boolean;
  onRemovePreview: (fileIndex: number) => () => void;
  imgClassName?: string;
}

const ImagePreview: FC<IProps> = ({ file, onRemovePreview, multiple, index, imgClassName }) => {
  return (
    <div className='relative'>
      <div
        className='absolute -top-2 -right-2 cursor-pointer rounded-full bg-rose-600 p-1 shadow hover:bg-rose-500'
        onClick={onRemovePreview(index)}
      >
        <X size={16} className='text-white' />
      </div>
      {multiple && (
        <span className='absolute bottom-1 left-1 inline-flex size-5 items-center justify-center rounded-sm bg-blue-600 text-sm font-bold text-white opacity-80 shadow-xl'>
          {index + 1}
        </span>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={'url' in file ? file.url : file?.preview}
        alt={file.name}
        className={cn('size-64 object-cover', imgClassName)}
      />
    </div>
  );
};

export default ImagePreview;
