import { STRING_LENGTH } from '@db/consts/commons';
import { z } from 'zod';

import { SingleImageFileSchema } from '@entities/image/contracts';

import { PriceSchema, SortOrderSchema } from '@contracts/common';

export const DessertFormDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: '디저트 이름을 입력해주세요.' })
    .max(STRING_LENGTH.NAME, { message: `최대 ${STRING_LENGTH.NAME}자 까지 입력할 수 있습니다.` }),
  description: z
    .string()
    .min(1, { message: '디저트 설명을 입력해주세요.' })
    .max(STRING_LENGTH.DESCRIPTION, {
      message: `최대 ${STRING_LENGTH.DESCRIPTION}자 까지 입력할 수 있습니다.`,
    }),
  imageFiles: SingleImageFileSchema,
  isSignature: z.boolean(),
  isNew: z.boolean(),
  isHidden: z.boolean(),
  price: PriceSchema,
  sortOrder: SortOrderSchema,
});
