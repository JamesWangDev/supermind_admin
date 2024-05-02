import { descriptionSchema, emailSchema, nameSchema, passwordConfirmationSchema, passwordSchema, phoneSchema } from "../../Utils/Validation/ValidationSchemas";

export const RegistrationValidationSchema = { name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    password_confirmation: passwordConfirmationSchema,
   //  store_name: nameSchema,
   //  description: descriptionSchema,
   //  city: nameSchema,
   //  address: descriptionSchema,
   //  pincode: nameSchema,
   //  phone: phoneSchema,
   //  country_id: nameSchema,
   //  state_id: nameSchema
 }

 export const RegistrationInitialValues = {
    name: "",
    password: "",
    email: "",
    password_confirmation: "",
    store_name: "",
    description: "",
    city: "",
    address: "",
    pincode: "",
    phone: "",
    country_id: "",
    state_id: "",
    country_code:"91"
  }