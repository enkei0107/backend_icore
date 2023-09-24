import { GenderEnum } from "src/config/enum/user/user-gender.enum";
import { z } from "zod";

export const CreateUserProfileDtoSchema = z.object({
    name: z.string().nonempty(),
    gender: z.any().refine((value) => {
        return Object.values(GenderEnum).includes(value);
    }, {
        message: "Invalid gender value",
    }),
    place_of_birth: z.string().nonempty().max(50),
    date_of_birth: z.string(),
    religion: z.string().nonempty(),
});

export type CreateUserProfileDto = z.infer<typeof CreateUserProfileDtoSchema>;
