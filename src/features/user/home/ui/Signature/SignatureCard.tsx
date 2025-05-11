import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';
import { USER_PATHS } from 'src/shared/configs/routes/userPaths';

import { Card, CardContent } from '@shadcn-ui/ui/card';

interface IProps {
  bread: any;
  index: number;
}

const SignatureCard: FC<IProps> = ({ bread, index }) => {
  return (
    <Card className='h-full rounded-2xl p-0'>
      <CardContent className='flex aspect-square items-center justify-center p-0'>
        <Link
          href={USER_PATHS.product.bread.detail({ slug: bread.name })}
          key={bread.name}
          className='group relative overflow-hidden rounded-lg'
        >
          <div className='aspect-square overflow-hidden'>
            <Image
              src={`https://picsum.photos/id/${index + 24}/500/500`}
              alt={bread.name}
              width={500}
              height={500}
              className='object-cover transition-transform group-hover:scale-105'
            />
          </div>
          <div className='bg-ivory space-y-2 p-4'>
            <h3 className='text-wood line-clamp-1 truncate font-semibold'>{bread.name}</h3>
            <p className='text-sm font-semibold text-black'>
              {bread.description.length > 50
                ? `${bread.description.slice(0, 50)}...`
                : bread.description}
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default SignatureCard;
