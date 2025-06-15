import { STRING_LENGTH } from '@db/consts/commons';
import { z } from 'zod';

import { getMultipleImageFileSchema } from '@entities/image/contracts';

import { SortOrderSchema } from '@contracts/common';

import { BUNDLE_ITEM_TYPES, FAIL_MIN_QUANTITY_MESSAGE } from './consts';

export const BundleProductSchema = z.object({
  type: z.enum(BUNDLE_ITEM_TYPES),
  id: z.string(),
  quantity: z.number().default(1),
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
  productsList: z
    .array(BundleProductSchema)
    .refine(val => val.reduce((sum, item) => sum + item?.quantity || 0, 0) >= 2, {
      message: FAIL_MIN_QUANTITY_MESSAGE,
    }),
});
