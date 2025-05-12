'use client';

import { useRouter } from 'next/navigation';
import { FC } from 'react';

interface IParams {
  params: Promise<{ id: string }>;
}

const BreadDetailPage: FC<IParams> = async ({ params }) => {
  const breadId = (await params).id;

  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  return (
    <div className='modal-overlay' onClick={closeModal}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <h2>Bread ID: {breadId}</h2>
        <p>This is the modal content for bread {breadId}.</p>
      </div>
    </div>
  );
};

export default BreadDetailPage;
