import { STRING_LENGTH } from '@db/consts/commons';
import { z } from 'zod';

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
  price: z.string().min(1, { message: '가격을 입력해주세요.' }),
  mbti: z.string().min(1, { message: 'MBTI를 선택해주세요.' }),
  imageFiles: z
    .array(z.instanceof(File), { message: '이미지가 선택되어야 합니다.' })
    .refine(files => files.length > 0, { message: '이미지를 선택해주세요.' })
    .refine(files => files.length <= 3, { message: '최대 3개의 이미지까지 선택 가능합니다.' })
    .refine(files => files.every(file => file.size <= 1024 * 1024 * 4), {
      message: '최대 6MB의 이미지까지 선택 가능합니다.',
    }),
  isSigniture: z.boolean(),
  isNew: z.boolean(),
  sortOrder: z.string().min(1, { message: '순서를 입력해주세요.' }),
});
