import { type } from "os";
import { z } from "zod";

export const CreateUserAddressDtoSchema = z.object({
    address: z.string().nonempty(),
    sub_district: z.string().nonempty(),
    district: z.string().nonempty(),
    postal_code: z.string().nonempty(),
    country: z.string().nonempty(),
});
export type CreateUserAddressDto = z.infer<typeof CreateUserAddressDtoSchema>;
