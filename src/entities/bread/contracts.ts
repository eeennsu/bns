import { STRING_LENGTH } from '@db/consts/commons';
import { z } from 'zod';

import { SingleImageFileSchema } from '@contracts/common';

export const BreadFormDtoSchema = z.object({
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
  price: z.number().min(1, { message: '가격을 입력해주세요.' }),
  mbti: z.string().min(1, { message: 'MBTI를 선택해주세요.' }),
  imageFiles: SingleImageFileSchema,
  isSigniture: z.boolean(),
  isNew: z.boolean(),
  isHidden: z.boolean(),
  sortOrder: z.number().min(1, { message: '순서를 입력해주세요.' }),
});
