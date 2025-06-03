import { STRING_LENGTH } from '@db/consts/commons';
import { z } from 'zod';

import { SingleImageFileSchema } from '@contracts/common';

export const SauceFormDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: '빵 이름을 입력해주세요.' })
    .max(STRING_LENGTH.NAME, { message: `최대 ${STRING_LENGTH.NAME}자 까지 입력할 수 있습니다.` }),
  description: z
    .string()
    .min(1, { message: '빵 설명을 입력해주세요.' })
    .max(STRING_LENGTH.DESCRIPTION, {
      message: `최대 ${STRING_LENGTH.DESCRIPTION}자 까지 입력할 수 있습니다.`,
    }),
  imageFiles: SingleImageFileSchema,
  isSigniture: z.boolean(),
  isNew: z.boolean(),
  isHidden: z.boolean(),
  price: z
    .string()
    .refine(val => val !== '', { message: '가격을 입력해주세요.' })
    .refine(val => val === '0' || !val.startsWith('0'), {
      message: '0으로 시작하는 숫자는 입력할 수 없습니다. (0원은 입력 가능)',
    })
    .refine(val => !isNaN(Number(val)), { message: '가격은 0원 이상이어야 합니다.' }),
  sortOrder: z
    .string()
    .refine(val => val !== '', { message: '순서를 입력해주세요.' })
    .refine(
      val => {
        const num = Number(val);
        return !isNaN(num) && Number.isInteger(num) && num > 0;
      },
      { message: '순서는 1 이상의 정수여야 합니다.' },
    ),
});
