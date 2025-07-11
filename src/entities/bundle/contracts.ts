import { STRING_LENGTH } from '@db/consts/commons';
import { z } from 'zod';

import { getMultipleImageFileSchema } from '@entities/image/contracts';

import { SortOrderSchema } from '@contracts/common';

import { FAIL_MIN_QUANTITY_MESSAGE } from './consts';

export const BundleProductSelectItemSchema = z.object({
  id: z.union([z.string(), z.number()]), // number id
  quantity: z.number(),
  sortOrder: z.number(),
});

export const BundleProductGroupSchema = z.object({
  breads: z.array(BundleProductSelectItemSchema).optional(),
  sauces: z.array(BundleProductSelectItemSchema).optional(),
  dishes: z.array(BundleProductSelectItemSchema).optional(),
  drinks: z.array(BundleProductSelectItemSchema).optional(),
});

export const BundleProductSchema = z.object({
  id: z.union([z.string(), z.number()]), // number id
  name: z.string(),
  price: z.number(),
});

export const BundleFormDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: '세트 구성 이름을 입력해주세요.' })
    .max(STRING_LENGTH.NAME, {
      message: `최대 ${STRING_LENGTH.NAME}자 까지 입력할 수 있습니다.`,
    }),
  description: z
    .string()
    .min(1, { message: '세트 구성 설명을 입력해주세요.' })
    .max(STRING_LENGTH.DESCRIPTION, {
      message: `최대 ${STRING_LENGTH.DESCRIPTION}자 까지 입력할 수 있습니다.`,
    }),
  price: z.union([z.string(), z.number()]).optional(),
  discountedPrice: z.union([z.string(), z.number()]).optional(),
  sortOrder: SortOrderSchema,
  isHidden: z.boolean(),
  imageFiles: getMultipleImageFileSchema(1, 5),
  productsList: BundleProductGroupSchema.refine(
    val => {
      const totalQuantity = Object.values(val)
        .flat()
        .reduce((sum, item) => sum + item?.quantity || 0, 0);

      return totalQuantity >= 2;
    },
    { message: FAIL_MIN_QUANTITY_MESSAGE },
  ),
});
