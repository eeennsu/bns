import { z } from 'zod';

import { adminLoginFormDtoSchema } from './contracts';

export type AdminLoginFormDto = z.infer<typeof adminLoginFormDtoSchema>;
