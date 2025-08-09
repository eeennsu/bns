import Image from 'next/image';
import type { FC } from 'react';

interface IProps {
  title: string;
  summary: string;
  description: string;
  image: string;
}

const ListHead: FC<IProps> = ({ title, summary, description, image }) => {
  return (
    <section className='flex flex-col-reverse items-center justify-between gap-6 px-4 lg:flex-row lg:gap-20 lg:px-8'>
      <div className='flex max-w-xl flex-col gap-4 text-center lg:gap-6 lg:text-left'>
        <h1 className='text-4xl font-bold text-black lg:text-6xl'>{title}</h1>
        <h2 className='hidden text-2xl font-semibold text-neutral-700 lg:block'>{summary}</h2>
        <p className='text-base text-neutral-600 lg:text-lg'>{description}</p>
      </div>

      <figure className='relative aspect-[4/3] w-full max-w-lg overflow-hidden rounded-xl bg-gray-100 shadow-2xl'>
        <Image
          src={image || ''}
          alt='illustration'
          fill
          className='border-border rounded-2xl border object-cover p-1'
        />
      </figure>
    </section>
  );
};

export default ListHead;
