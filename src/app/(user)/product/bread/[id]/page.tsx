import type { FC } from 'react';

interface IParams {
  params: Promise<{ id: string }>;
}

const DetailBreadPage: FC<IParams> = async ({ params }) => {
  const breadId = (await params).id;

  return (
    <div>
      <div>
        <h2>Bread ID: {breadId}</h2>
        <p>This is the modal content for bread {breadId}.</p>
      </div>
    </div>
  );
};

export default DetailBreadPage;
