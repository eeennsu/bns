import db from '@db/index';
import { drinks } from '@db/schemas/drinks';
import { imageReferences, images } from '@db/schemas/image';
import { actionWithCapture } from '@shared/libs/serverAction';
import { and, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchDrink = async ({ id }: IParams) => {
  const drinkQuery = db
    .select({
      id: drinks.id,
      name: drinks.name,
      description: drinks.description,
      price: drinks.price,
      isSignature: drinks.isSignature,
      isNew: drinks.isNew,
      image: images.url,
    })
    .from(drinks)
    .innerJoin(
      imageReferences,
      and(
        eq(drinks.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.DRINK),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(eq(drinks.id, id))
    .limit(1);
  return (await drinkQuery).at(0);
};

const getDrink = (params: IParams) =>
  actionWithCapture({
    context: 'GET_DRINK',
    fn: fetchDrink,
    args: [params],
  });

export default getDrink;
