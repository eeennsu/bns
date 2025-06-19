import { Trash } from 'lucide-react';
import { FC } from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@shadcn-ui/ui';

interface IProps {
  name: string;
  onDelete: () => void;
  imageUrl?: string;
}

const DeleteDialog: FC<IProps> = ({ imageUrl, name, onDelete }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' className='size-8' size='sm'>
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
          <DialogClose asChild>
            <div className='flex items-center gap-2'>
              <Button variant='destructive' type='submit' onClick={onDelete}>
                삭제
              </Button>
              <Button variant='outline'>취소</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
