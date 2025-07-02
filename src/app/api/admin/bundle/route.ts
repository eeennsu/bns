import db from '@db/index';
import { bundles } from '@db/schemas/bundles';
import { BUNDLE_ERRORS, IMAGE_ERRORS } from '@shared/api/errorMessage';
import { WithImageIds } from '@shared/api/typings';
import { withAuth } from '@shared/api/withAuth';
import { NextRequest, NextResponse } from 'next/server';

import { BundleFormDto } from '@entities/bundle/types';

export const POST = withAuth(async (request: NextRequest) => {
  const body = (await request.json()) as WithImageIds<BundleFormDto>;

  const { name, description, price, discountedPrice, productsList, imageIds, isHidden, sortOrder } =
    body;

  let newBundle;

  if (!imageIds || imageIds.length === 0) {
    return NextResponse.json({ error: IMAGE_ERRORS.MISSING_IMAGE_FILES }, { status: 400 });
  }

  if (!Array.isArray(productsList) || productsList?.length === 0) {
    return NextResponse.json({ error: BUNDLE_ERRORS.MISSING_PRODUCT }, { status: 400 });
  }

  try {
    [newBundle] = await db
      .insert(bundles)
      .values({
        name,
        description,
        price: Number(price),
        discountedPrice: Number(discountedPrice),
        sortOrder: Number(sortOrder),
        isHidden,
      })
      .returning();

    const bundleId = newBundle.id;

    const breadsToInsert = productsList
      .filter(product => product.type === 'bread')
      .map(bread => ({
        bundleId,
        breadId: bread.id,
        sortOrder: bread.sortOrder,
      }));

    console.log(breadsToInsert);
  } catch (error) {
    console.error(error);
  }
});
