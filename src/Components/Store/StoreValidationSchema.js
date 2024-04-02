import { emailSchema, nameSchema, phoneSchema } from "../../Utils/Validation/ValidationSchemas";

export const StoreValidationSchema = {
    store_name: nameSchema,
    description: nameSchema,
    country_id: nameSchema,
    state_id: nameSchema,
    city: nameSchema,
    address: nameSchema,
    pincode: nameSchema,
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
}