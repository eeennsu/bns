'use client';

import { sanitizeHtml } from '@shared/libs/html';
import { FC } from 'react';

interface IProps {
  description: string;
}

const EventLongDescription: FC<IProps> = ({ description }) => {
  return (
    <article className='mt-2 lg:mt-4'>
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }} />
    </article>
  );
};

export default EventLongDescription;
