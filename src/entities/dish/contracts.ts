import { STRING_LENGTH } from '@db/consts/commons';
import { z } from 'zod';

import { SingleImageFileSchema } from '@entities/image/contracts';

import { PriceSchema, SortOrderSchema } from '@contracts/common';

export const DishFormDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: '디쉬 이름을 입력해주세요.' })
    .max(STRING_LENGTH.NAME, { message: `최대 ${STRING_LENGTH.NAME}자 까지 입력할 수 있습니다.` }),
  description: z
    .string()
    .min(1, { message: '디쉬 설명을 입력해주세요.' })
    .max(STRING_LENGTH.DESCRIPTION, {
      message: `최대 ${STRING_LENGTH.DESCRIPTION}자 까지 입력할 수 있습니다.`,
    }),
  ingredients: z
    .array(z.string())
    .min(1, { message: '재료를 최소 한가지 입력해주세요.' })
    .transform(values => values.filter(value => value.trim().length > 0))
    .refine(values => values.length === new Set(values).size, {
      message: '중복된 재료는 입력할 수 없습니다.',
    })
    .refine(values => values.length <= 20, { message: '최대 20개의 재료까지 입력할 수 있습니다.' }),
  imageFiles: SingleImageFileSchema,
  isSignature: z.boolean(),
  isNew: z.boolean(),
  isHidden: z.boolean(),
  price: PriceSchema,
  sortOrder: SortOrderSchema,
});
