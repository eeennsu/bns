import db from '@db/index';
import { dishes } from '@db/schemas/dishes';
import { imageReferences, images } from '@db/schemas/image';
import { executeWithCapture } from '@shared/libs/serverAction';
import { and, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchDish = async ({ id }: IParams) => {
  const dishQuery = db
    .select({
      id: dishes.id,
      name: dishes.name,
      description: dishes.description,
      price: dishes.price,
      isSignature: dishes.isSignature,
      isNew: dishes.isNew,
      image: images.url,
    })
    .from(dishes)
    .innerJoin(
      imageReferences,
      and(
        eq(dishes.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.DISH),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(eq(dishes.id, id))
    .limit(1);
  return (await dishQuery).at(0);
};

const getDish = ({ id }: IParams) => executeWithCapture('getDish', fetchDish, { id });

export default getDish;
