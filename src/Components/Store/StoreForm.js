import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row } from "reactstrap";
import request from "../../Utils/AxiosUtils";
import { store } from "../../Utils/AxiosUtils/API";
import { passwordConfirmationSchema, passwordSchema, YupObject } from "../../Utils/Validation/ValidationSchemas";
import AddressComponent from "../InputFields/AddressComponent";
import FileUploadField from "../InputFields/FileUploadField";
import SimpleInputField from "../InputFields/SimpleInputField";
import CheckBoxField from "../InputFields/CheckBoxField";
import FormBtn from "../../Elements/Buttons/FormBtn";
import Loader from "../CommonComponent/Loader";
import { StoreInitialValue } from "./StoreInitialValue";
import { StoreValidationSchema } from "./StoreValidationSchema";
import UserPassword from "../User/UserPassword";
import StoreVendor from "./StoreVendor";
import { getHelperText } from '../../Utils/CustomFunctions/getHelperText';
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const StoreForm = ({ mutate, updateId, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data: oldData, isLoading, refetch } = useQuery(["store/id"], () => request({ url: store + "/" + updateId }), {
    refetchOnMount: false, refetchOnWindowFocus: false, enabled: false, select: (data) => (data?.data),
  });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && isLoading) return <Loader />
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ ...StoreInitialValue(updateId, oldData) }}
        validationSchema={YupObject({
          ...StoreValidationSchema,
          password: !updateId && passwordSchema,
          password_confirmation: !updateId && passwordConfirmationSchema,
        })}
        onSubmit={(values) => {
          if (updateId) {
            delete values["password"];
            delete values["password_confirmation"];
            typeof values["store_logo"] == "string" && delete values["store_logo"];
            values["_method"] = "put";
          }
          delete values["store_logo"];
          values["status"] = Number(values["status"]);
          values["hide_vendor_phone"] = Number(values["hide_vendor_phone"]);
          values["hide_vendor_email"] = Number(values["hide_vendor_email"]);
          if (values['store_logo_id'] == undefined) values['store_logo_id'] = null
          mutate(values);
        }}>
        {({ setFieldValue, values, errors, touched }) => (
          <Form className="theme-form theme-form-2 mega-form">
            <Row>
              <FileUploadField values={values} setFieldValue={setFieldValue} title="StoreLogo" type="file" id="store_logo_id" name="store_logo_id" updateId={updateId} errors={errors} touched={touched} helpertext={getHelperText('500x500px')} />
              <SimpleInputField nameList={[{ name: "store_name", placeholder: t("EnterStoreName"), require: "true" }, { name: "description", title: "StoreDescription", type: "textarea", placeholder: t("EnterDescription"), require: "true" }]} />
              <AddressComponent values={values} />
              <StoreVendor />
              <UserPassword updateId={updateId} />
              <SimpleInputField nameList={[
                { name: "facebook", type: "url", placeholder: t("EnterFacebookurl") },
                { name: "pinterest", type: "url", placeholder: t("EnterPinteresturl") },
                { name: "instagram", type: "url", placeholder: t("EnterInstagramurl") },
                { name: "twitter", type: "url", placeholder: t("EnterTwitterurl") },
                { name: "youtube", type: "url", placeholder: t("EnterYoutubeurl") },
              ]} />
              <CheckBoxField name="hide_vendor_email" title="HideEmail" />
              <CheckBoxField name="hide_vendor_phone" title="HidePhone" />
              <CheckBoxField name="status" />
              <FormBtn loading={loading} />
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default StoreForm;
