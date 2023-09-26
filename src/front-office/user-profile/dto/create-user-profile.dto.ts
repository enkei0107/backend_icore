import { GenderEnum } from "src/config/enum/user/user-gender.enum";
import { isEpochTimestamp } from "src/config/helpers";
import { z } from "zod";

export const CreateUserProfileDtoSchema = z.object({
    name: z.string().nonempty(),
    gender: z.any().refine((value) => {
        return Object.values(GenderEnum).includes(value);
    }, {
        message: "Invalid gender value",
    }),
    place_of_birth: z.string().nonempty().max(50),
    date_of_birth: z.number().refine(isEpochTimestamp, {
        message: "Invalid date_of_birth value, it must be a valid Epoch Unix timestamp",
    }),
    religion: z.string().nonempty(),
});

export type CreateUserProfileDto = z.infer<typeof CreateUserProfileDtoSchema>;
