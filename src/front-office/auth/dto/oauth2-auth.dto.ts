import { OauthProviderEnum } from 'src/config/enum/auth/oauth-provider.enum';
import { string, z } from 'zod';

export const Oauth2DtoSchema = z.object({
  provider: z.enum(Object.values(OauthProviderEnum) as [string, ...string[]]),
  token: z.string(),
});

export type Oauth2Dto = z.infer<typeof Oauth2DtoSchema>;
