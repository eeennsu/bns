import { LoaderCircle, Trash } from 'lucide-react';
import { FC, useState } from 'react';

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn-ui/ui';

interface IProps {
  name: string;
  onDelete: () => Promise<void>;
  isLoading?: boolean;
  imageUrl?: string;
}

const DeleteDialog: FC<IProps> = ({ imageUrl, name, onDelete, isLoading }) => {
  const [open, setIsOpen] = useState<boolean>(false);

  const handleDelete = () => {
    onDelete().finally(() => setIsOpen(false));
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='destructive' className='size-8'>
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle tabIndex={0}>{name?.slice?.(0, 100)}</DialogTitle>
        </DialogHeader>
        <div>
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt='image' width={100} height={100} className='mb-4' />
          ) : null}

          <span>
            삭제된 데이터는 복구할 수 없습니다. <b>삭제하시겠습니까?</b>
          </span>
        </div>
        <DialogFooter>
          <div className='flex items-center gap-2'>
            <Button variant='destructive' type='submit' onClick={handleDelete} disabled={isLoading}>
              {isLoading ? (
                <>
                  삭제 중..
                  <LoaderCircle className='animate-spin' />
                </>
              ) : (
                '삭제'
              )}
            </Button>
            <Button variant='outline' onClick={() => setIsOpen(false)}>
              취소
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
