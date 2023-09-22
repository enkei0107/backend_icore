import { z } from 'zod';
export const LoginAuthDtoSchema = z
  .object({
    email: z.string().email().nonempty(),
    password: z.string().nonempty(),
  });

export type LoginAuthDto = z.infer<typeof LoginAuthDtoSchema>;
