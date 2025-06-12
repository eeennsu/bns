import { z } from 'zod';

import { MAX_FILE_SIZE } from '@consts/commons';

export const SearchFormDtoSchema = z.object({
  search: z.string(),
});

export const imageFileSchema = z.object({
  id: z.string(),
  url: z.string().optional(),
  order: z.number().optional(),
});

export const SingleImageFileSchema = z
  .array(z.union([z.instanceof(File), imageFileSchema]), { message: '이미지가 선택되어야 합니다.' })
  .refine(files => files.length > 0, { message: '이미지를 선택해주세요.' })
  .refine(files => files.length <= 1, { message: '최대 1개의 이미지까지 선택 가능합니다.' })
  .refine(files => files.every(file => file.size <= 1024 * 1024 * +MAX_FILE_SIZE.charAt(0)), {
    message: `최대 ${MAX_FILE_SIZE}의 이미지까지 선택 가능합니다.`,
  })
  .refine(files => files.every(file => file.type.startsWith('image/')), {
    message: '이미지 파일만 업로드 가능합니다.',
  });

export const getMultipleImageFileSchema = (minCount: number = 1, maxCount: number = 10) =>
  z
    .array(z.union([z.instanceof(File), imageFileSchema]), {
      message: '이미지가 선택되어야 합니다.',
    })
    .refine(files => files.length >= minCount, {
      message: `최소 ${minCount}개의 이미지를 선택해주세요.`,
    })
    .refine(files => files.length <= maxCount, {
      message: `최대 ${maxCount}개의 이미지까지 선택 가능합니다.`,
    })
    .refine(
      files =>
        files.every(file => {
          if (file instanceof File) {
            return file.size <= 1024 * 1024 * 4;
          }
          return true;
        }),
      {
        message: '최대 4MB의 이미지까지 선택 가능합니다.',
      },
    );

export const SortOrderSchema = z
  .union([z.string(), z.number()])
  .refine(val => val !== '', { message: '순서를 입력해주세요.' })
  .refine(
    val => {
      const num = Number(val);
      return !isNaN(num) && Number.isInteger(num) && num > 0;
    },
    { message: '순서는 1 이상의 정수여야 합니다.' },
  );

export const PriceSchema = z
  .union([z.string(), z.number()])
  .refine(val => val !== '', { message: '가격을 입력해주세요.' })
  .refine(val => !String(val).startsWith('0'), {
    message: '0으로 시작하는 숫자는 입력할 수 없습니다. (0원은 입력 가능)',
  })
  .refine(val => Number(val) > 0, { message: '정수를 입력해 주세요.' })
  .refine(val => !isNaN(Number(val)), { message: '숫자를 입력해 주세요.' });

export const DiscountedPriceSchema = z
  .union([z.string(), z.number()])
  .optional()
  .refine(val => !String(val).startsWith('0'), {
    message: '0으로 시작하는 숫자는 입력할 수 없습니다. (0원은 입력 가능)',
  });
