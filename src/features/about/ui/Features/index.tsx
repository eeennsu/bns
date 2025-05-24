import { Award, ChefHat, Clock } from 'lucide-react';
import type { FC } from 'react';

const Features: FC = () => {
  return (
    <section className='space-y-12 pb-24'>
      <div className='text-center'>
        <h2 className='text-wood text-3xl font-bold tracking-tight'>Why Our Bread Is Special</h2>
        <p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
          We combine traditional baking methods with the finest ingredients to create bread that's
          truly exceptional.
        </p>
      </div>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
        <div className='flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-md'>
          <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100'>
            <Award className='h-6 w-6 text-amber-600' />
          </div>
          <h3 className='mb-2 text-xl font-medium'>Premium Ingredients</h3>
          <p className='text-muted-foreground'>
            We use only organic flour, natural starters, and the highest quality ingredients in all
            our breads.
          </p>
        </div>
        <div className='flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-md'>
          <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100'>
            <Clock className='h-6 w-6 text-amber-600' />
          </div>
          <h3 className='mb-2 text-xl font-medium'>Slow Fermentation</h3>
          <p className='text-muted-foreground'>
            Our dough ferments for up to 24 hours, developing complex flavors and a perfect texture.
          </p>
        </div>
        <div className='flex flex-col items-center rounded-lg bg-white p-8 text-center shadow-md'>
          <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100'>
            <ChefHat className='h-6 w-6 text-amber-600' />
          </div>
          <h3 className='mb-2 text-xl font-medium'>Master Bakers</h3>
          <p className='text-muted-foreground'>
            Our artisan bakers have decades of experience and passion for the craft of breadmaking.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
