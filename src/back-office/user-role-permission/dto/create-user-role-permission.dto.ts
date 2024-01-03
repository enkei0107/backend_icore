import { z } from 'zod';

export const CreateUserRoleDtoSchema = z
  .object({
    role_id: z.string().uuid(),
    permission_id: z.string().uuid(),
  })
  .required();

  export type CreateUserRoleDto = z.infer<typeof CreateUserRoleDtoSchema>;
