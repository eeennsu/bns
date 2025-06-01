import { z } from 'zod';

export const SauceFormDtoSchema = z.object({
  name: z
    .string()
    .min(1, { message: '소스 이름을 입력해주세요.' })
    .max(64, { message: '최대 64자 까지 입력할 수 있습니다.' }),
  description: z
    .string()
    .min(1, { message: '소스 설명을 입력해주세요.' })
    .max(1000, { message: '최대 1000자 까지 입력할 수 있습니다.' }),
  imageFiles: z
    .array(z.instanceof(File), { message: '이미지가 선택되어야 합니다.' })
    .refine(files => files.length > 0, { message: '이미지를 선택해주세요.' })
    .refine(files => files.length <= 3, { message: '최대 3개의 이미지까지 선택 가능합니다.' })
    .refine(files => files.every(file => file.size <= 1024 * 1024 * 4), {
      message: '최대 6MB의 이미지까지 선택 가능합니다.',
    }),
  isSigniture: z.boolean(),
  isNew: z.boolean(),
  isHidden: z.boolean(),
  sortOrder: z.string().min(1, { message: '순서를 입력해주세요.' }),
});
