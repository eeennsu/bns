import { STRING_LENGTH } from '@db/consts/commons';
import { z } from 'zod';

import {
  DiscountedPriceSchema,
  MultipleImageFileSchema,
  PriceSchema,
  SortOrderSchema,
} from '@contracts/common';

export const BundleFormDtoSchema = z
  .object({
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
    price: PriceSchema,
    discountedPrice: DiscountedPriceSchema,
    sortOrder: SortOrderSchema,
    isHidden: z.boolean(),
    imageFiles: MultipleImageFileSchema(1, 5),
    breads: z
      .array(
        z.object({
          id: z.string(),
          quantity: z.number().default(1),
        }),
      )
      .optional(),
    sauces: z
      .array(
        z.object({
        id: z.number(),
          quantity: z.number().default(1),
        }),
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.price && Number(data.discountedPrice) >= Number(data.price)) {
      ctx.addIssue({
        path: ['discountedPrice'],
        code: z.ZodIssueCode.custom,
        message: '할인된 가격은 원래 가격보다 낮아야 합니다.',
      });
    }
  });
