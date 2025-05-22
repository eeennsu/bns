import { z } from 'zod';

export const adminLoginFormDtoSchema = z.object({
  username: z
    .string()
    .min(5, { message: '아이디는 최소 5자 이상이어야 합니다.' })
    .max(20, { message: '아이디는 최대 20자 이하여야 합니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    .max(20, { message: '비밀번호는 최대 20자 이하여야 합니다.' }),
});
