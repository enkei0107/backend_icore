import { UserContactProviderEnum } from 'src/config/enum/user/user-contact-provider.enum';
import { string, z } from 'zod';
export const CreateUserContactDtoSchema = z.object({
  provider: z.enum(
    Object.values(UserContactProviderEnum) as [string, ...string[]],
  ),
  address: z.string(),
});

export type CreateUserContactDto = z.infer<typeof CreateUserContactDtoSchema>;
