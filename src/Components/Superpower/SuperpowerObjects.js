import { descriptionSchema, discountSchema, dropDownScheme, ifTypeSimpleSchema, nameSchema, variationSchema, externalUrlSchema } from "../../Utils/Validation/ValidationSchemas";

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
    llm_prompt: updateId ? oldData?.llm_prompt || "" : "",
    categories: updateId ? oldData?.categories?.map((item) => item.id) || [] : [],
    prompts: updateId ? oldData?.prompts?.map((item) => item.id) || [] : [],
    gpt_model: updateId ? oldData?.gpt_model || "" : "",
    product_thumbnail: updateId ? oldData?.product_thumbnail || "" : "",
    product_thumbnail_id: updateId ? oldData?.product_thumbnail?.id || "" : "",
    product_galleries: updateId ? oldData?.product_galleries?.map((img) => img) || "" : "",
    product_galleries_id: updateId ? oldData?.product_galleries?.map((elem) => elem.id) || "" : "",
    always_knowledges: updateId && oldData?.always_knowledges ? oldData.always_knowledges.split(',') || [] : [],
    library_knowledges: updateId && oldData?.library_knowledges ? oldData.library_knowledges.split(',') || [] : [],
  };
}
