'use client';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, type FC, type PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogOverlay, DialogTitle } from '@shadcn-ui/ui';
import { cn } from '@shadcn-ui/utils';

interface IProps {
  className?: string;
}

const ModalShell: FC<PropsWithChildren<IProps>> = ({ className, children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '';

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onCloseModal = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (!open) router.back();
    },
    [router],
  );

  useEffect(() => {
    if (!page) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [page, onCloseModal]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseModal}>
      <DialogOverlay>
        <DialogContent
          showCloseButton
          closeButtonClassName='cursor-pointer hover:bg-gray-100 p-1.5 focus:ring-0 focus:ring-offset-0'
          className={cn(
            'max-h-[90vh] max-w-[80vw] overflow-y-auto rounded-xs sm:max-h-[85vdh] sm:max-w-[65vw]',
            className,
          )}
        >
          <VisuallyHidden>
            <DialogTitle>숨김 제목</DialogTitle>
          </VisuallyHidden>
          {children}
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default ModalShell;
