import { GenderEnum } from 'src/config/enum/user/user-gender.enum';
import { ReligionEnum } from 'src/config/enum/user/user-religion.enum';
import { isEpochTimestamp } from 'src/config/helpers';
import { z } from 'zod';

export const CreateUserProfileDtoSchema = z.object({
  name: z.string().nonempty(),
  gender: z.enum(Object.values(GenderEnum) as [string, ...string[]]),
  place_of_birth: z.string().nonempty().max(50),
  date_of_birth: z.number().refine(isEpochTimestamp, {
    message:
      'Invalid date_of_birth value, it must be a valid Epoch Unix timestamp',
  }),
  religion: z.enum(Object.values(ReligionEnum) as [string, ...string[]]),
  avatar: z.string().url().optional().nullable(),
});

export type CreateUserProfileDto = z.infer<typeof CreateUserProfileDtoSchema>;
