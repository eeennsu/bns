import db from '@db/index';
import { imageReferences, images } from '@db/schemas/image';
import { sauces } from '@db/schemas/sauces';
import { actionWithCapture } from '@shared/libs/serverAction';
import { and, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchSauce = async ({ id }: IParams) => {
  const sauceQuery = db
    .select({
      id: sauces.id,
      name: sauces.name,
      description: sauces.description,
      price: sauces.price,
      isSignature: sauces.isSignature,
      isNew: sauces.isNew,
      image: images.url,
    })
    .from(sauces)
    .innerJoin(
      imageReferences,
      and(
        eq(sauces.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.SAUCE),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(eq(sauces.id, id))
    .limit(1);
  return (await sauceQuery).at(0);
};

const getSauce = (params: IParams) =>
  actionWithCapture({
    context: 'GET_SAUCE',
    fn: fetchSauce,
    args: [params],
  });

export default getSauce;
