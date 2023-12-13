import { UserAccountTypeEnum } from 'src/config/enum/user/user-account-type.enum';
import { z } from 'zod';
export const CreateAuthDtoSchema = z
  .object({
    username: z.string().min(3).max(50).nonempty(),
    email: z.string().email().nonempty(),
    account_type: z.any().refine(
      (value) => {
        return Object.values(UserAccountTypeEnum).includes(value);
      },
      {
        message: 'Invalid account type value',
      },
    ),
    avatar:z.string().url().nullable(),
    password: z.string().nonempty(),
    password_confirmation: z.string().nonempty(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password confirmation doesn't match the password",
  })
  .refine(
    (data) => {
      return (
        data.password !== undefined && data.password_confirmation !== undefined
      );
    },
    {
      message: 'Password and password confirmation must both be provided',
    },
  );

export type CreateAuthDto = z.infer<typeof CreateAuthDtoSchema>;
