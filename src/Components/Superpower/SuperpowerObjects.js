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
    superpower_thumbnail: updateId ? oldData?.superpower_thumbnail || "" : "",
    superpower_thumbnail_id: updateId ? oldData?.superpower_thumbnail?.id || "" : "",
    superpower_galleries: updateId ? oldData?.superpower_galleries?.map((img) => img) || "" : "",
    superpower_galleries_id: updateId ? oldData?.superpower_galleries?.map((elem) => elem.id) || "" : "",
    always_knowledges: updateId && oldData?.always_knowledges ? oldData.always_knowledges.split(',') || [] : [],
    library_knowledges: updateId && oldData?.library_knowledges ? oldData.library_knowledges.split(',') || [] : [],
  };
}
