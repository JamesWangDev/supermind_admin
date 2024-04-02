import { descriptionSchema, dropDownScheme, nameSchema } from "@/Utils/Validation/ValidationSchemas";
export const SuperpowerValidationSchema = {
  name: nameSchema,
  short_description: nameSchema,
  description: descriptionSchema,
  categories: dropDownScheme,
};

export function SuperpowerInitValues(oldData, updateId) {
  return {
    // General
    name: updateId ? oldData?.name || "" : "",
    short_description: updateId ? oldData?.short_description || "" : "",
    description: updateId ? oldData?.description || "" : "",
    categories: updateId ? oldData?.categories?.map((item) => item.id) || [] : [],
    product_thumbnail: updateId ? oldData?.product_thumbnail || "" : "",
    product_thumbnail_id: updateId ? oldData?.product_thumbnail?.id || "" : "",
    product_galleries: updateId ? oldData?.product_galleries?.map((img) => img) || "" : "",
    product_galleries_id: updateId ? oldData?.product_galleries?.map((elem) => elem.id) || "" : "",
    uis: updateId && oldData?.uis ? oldData.uis.split(',') || [] : [],
  };
}
