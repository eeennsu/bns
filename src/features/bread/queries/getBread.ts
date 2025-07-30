import 'server-only';

import db from '@db/index';
import { breads } from '@db/schemas/breads';
import { imageReferences, images } from '@db/schemas/image';
import { actionWithCapture } from '@shared/libs/serverAction';
import { and, eq } from 'drizzle-orm';

import { IMAGE_REF_VALUES } from '@entities/image/consts';

interface IParams {
  id: number;
}

const fetchBread = async ({ id }: IParams) => {
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

const getBread = (params: IParams) =>
  actionWithCapture({
    context: 'GET_BREAD',
    fn: fetchBread,
    args: [params],
  });

export default getBread;
