import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@shared/shadcn-ui/utils';
import { FC } from 'react';

import { FileWithDropzone } from '@entities/image/types';

import ImagePreview from './ImagePreview';

interface IProps {
  file: FileWithDropzone;
  index: number;
  multiple: boolean;
  onRemovePreview: (fileIndex: number) => () => void;
  imgClassName?: string;
}

const SortableImage: FC<IProps> = ({ file, multiple, index, onRemovePreview, imgClassName }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isOver, isDragging } =
    useSortable({
      id: file?.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ImagePreview
        file={file}
        index={index}
        onRemovePreview={onRemovePreview}
        imgClassName={cn(
          imgClassName,
          isDragging && 'cursor-grabbing',
          isOver && 'border-blue-500',
        )}
        multiple={multiple}
      />
    </div>
  );
};

export default SortableImage;
