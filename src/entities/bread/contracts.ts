import { z } from 'zod';

export const BreadFormDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: '빵 이름을 입력해주세요.' })
    .max(64, { message: '최대 64자 까지 입력할 수 있습니다.' }),
  description: z
    .string()
    .min(1, { message: '빵 설명을 입력해주세요.' })
    .max(256, { message: '최대 256자 까지 입력할 수 있습니다.' }),
  price: z.number().min(1, { message: '가격을 입력해주세요.' }),
  mbti: z.string().min(1, { message: 'MBTI를 선택해주세요.' }),
  isSigniture: z.boolean(),
  isNew: z.boolean(),
  sortOrder: z.number().min(1, { message: '순서를 선택해주세요.' }),
});
