import { z } from 'zod';

export const SearchFormDtoSchema = z.object({
  search: z.string(),
});

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

export const getDateSchema = (label: string) => {
  return z
    .date()
    .nullable()
    .refine(date => date !== null, { message: `${label} 날짜를 선택해주세요.` });
};

export const ProductCategorySchema = z.enum(['all', 'signature', 'new']);
