import { FC } from 'react';

import PageModal from '@components/PageModal';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBreadModalPage: FC<IParams> = async ({ params }) => {
  const breadId = (await params).id;

  return (
    <PageModal>
      <div className='modal-overlay'>
        <div className='modal-content'>
          <h2>Bread ID: {breadId}</h2>
          <p>This is the modal content for bread {breadId}.</p>
        </div>
      </div>
    </PageModal>
  );
};

export default DetailBreadModalPage;
