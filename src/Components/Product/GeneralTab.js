import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import request from "../../Utils/AxiosUtils";
import { store, Category } from "../../Utils/AxiosUtils/API";
import SimpleInputField from "../InputFields/SimpleInputField";
import SearchableSelectInput from "../InputFields/SearchableSelectInput";
import CheckBoxField from "../InputFields/CheckBoxField";
import DescriptionInput from "./DescriptionInput";
import SettingContext from "../../Helper/SettingContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import MultiSelectField from "../InputFields/MultiSelectField";
import ImageUploadFieldGPT from "../InputFields/ImageUploadFieldGPT";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";

const GeneralTab = ({ values, setFieldValue, errors, updateId }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { state } = useContext(SettingContext)
  const { data: StoreData } = useQuery([store], () => request({ url: store, params: { status: 1 } }), { refetchOnWindowFocus: false, select: (data) => data.data.data.map((item) => ({ id: item.id, name: item.store_name })) });
  // Getting Category Data with type products
  const { data: categoryData } = useQuery([Category], () => request({ url: Category, params: { type: "product" } }), { refetchOnWindowFocus: false, select: (data) => data.data.data });

  return (
    <>
      <SimpleInputField nameList={[{ name: "name", require: "true", placeholder: t("EnterName") }, { name: "short_description", require: "true", title: "ShortDescription", type: "textarea", rows: 3, placeholder: t("EnterShortDescription"), helpertext: "*Maximum length should be 300 characters." }]} />
      <DescriptionInput values={values} setFieldValue={setFieldValue} title={t('Description')} nameKey="description" errorMessage={"Descriptionisrequired"} />
      <SimpleInputField nameList={[{ name: "greetings", require: "false", title: "Greetings", type: "textarea", rows: 3, placeholder: t("Enter greetings"), helpertext: "*Maximum length should be 300 characters." }]} />
      <ImageUploadFieldGPT errors={errors} name="product_thumbnail_id" galleryName="product_galleries_id" id="product_thumbnail_id" title="Thumbnail" type="file" values={values} setFieldValue={setFieldValue} updateId={updateId} helpertext={getHelperText('600x600px')} />
      <CheckBoxField name="is_picture" title="picture" />
      <MultiSelectField errors={errors} values={values} setFieldValue={setFieldValue} name="categories" require="true" data={categoryData} />
    </>
  );
};

export default GeneralTab;
