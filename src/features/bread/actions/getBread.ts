import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { tryCatchAction } from '@shared/libs/serverAction';
import { and, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchBread = async ({ id }: IParams) => {
  throw new Error('TEST_ERROR');

  const breadQuery = db
    .select({
      id: breads.id,
      name: breads.name,
      description: breads.description,
      price: breads.price,
      mbti: breads.mbti,
      isSignature: breads.isSignature,
      isNew: breads.isNew,
      image: images.url,
    })
    .from(breads)
    .innerJoin(
      imageReferences,
      and(
        eq(breads.id, imageReferences.refId),
        eq(imageReferences.refTable, IMAGE_REF_VALUES.BREAD),
      ),
    )
    .innerJoin(images, eq(imageReferences.imageId, images.id))
    .where(eq(breads.id, id))
    .limit(1);

  return (await breadQuery).at(0);
};

const getBread = ({ id }: IParams) => tryCatchAction('getBread', fetchBread, { id });

export default getBread;
