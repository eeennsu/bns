import db from '@db/index';
import { desserts } from '@db/schemas/desserts';
import { imageReferences, images } from '@db/schemas/image';
import { executeWithCapture } from '@shared/libs/serverAction';
import { and, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchDessert = async ({ id }: IParams) => {
  const dessertQuery = db
    .select({
      id: desserts.id,
      name: desserts.name,
      description: desserts.description,
      price: desserts.price,
      isSignature: desserts.isSignature,
      isNew: desserts.isNew,
      image: images.url,
    })
    .from(desserts)
    .innerJoin(
      imageReferences,
      and(
        eq(desserts.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.DESSERT),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(eq(desserts.id, id))
    .limit(1);
  return (await dessertQuery).at(0);
};

const getDessert = ({ id }: IParams) => executeWithCapture('getDessert', fetchDessert, { id });

export default getDessert;
