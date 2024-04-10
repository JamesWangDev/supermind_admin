import { useContext } from "react";
import { Form, Formik } from "formik";
import FileUploadField from "../InputFields/FileUploadField";
import { Row } from "reactstrap";
import SimpleInputField from "../InputFields/SimpleInputField";
import AddressComponent from "../InputFields/AddressComponent";
import CheckBoxField from "../InputFields/CheckBoxField";
import FormBtn from "../../Elements/Buttons/FormBtn";
import useCreate from "../../Utils/Hooks/useCreate";
import { VendorSettingAPI } from "../../Utils/AxiosUtils/API";
import AccountContext from "../../Helper/AccountContext";
import { YupObject, nameSchema } from "../../Utils/Validation/ValidationSchemas";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const VendorProfile = () => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    const { mutate, isLoading } = useCreate(VendorSettingAPI, false, false, "Vendor setting updated")
    const { accountData } = useContext(AccountContext)
    return (
        <Formik
            enableReinitialize
            initialValues={{
                store_name: accountData?.store?.store_name ?? "",
                description: accountData?.store?.description ?? "",
                country_id: accountData?.store?.country_id ?? '',
                state_id: accountData?.store?.state_id ?? '',
                city: accountData?.store?.city ?? "",
                address: accountData?.store?.address ?? "",
                pincode: accountData?.store?.pincode ?? "",
                facebook: accountData?.store?.facebook ?? "",
                twitter: accountData?.store?.twitter ?? "",
                instagram: accountData?.store?.instagram ?? "",
                youtube: accountData?.store?.youtube ?? "",
                pinterest: accountData?.store?.pinterest ?? "",
                store_logo_id: accountData?.store?.store_logo_id ?? '',
                store_logo: accountData?.store?.store_logo ?? '',
                hide_vendor_email: accountData?.store?.hide_vendor_email ? Boolean(accountData?.store?.hide_vendor_email) : false,
                hide_vendor_phone: accountData?.store?.hide_vendor_phone ? Boolean(accountData?.store?.hide_vendor_phone) : false
            }}
            validationSchema={YupObject({
                store_name: nameSchema,
                description: nameSchema,
                country_id: nameSchema,
                state_id: nameSchema,
                city: nameSchema,
                address: nameSchema,
                pincode: nameSchema,
            })}
            onSubmit={(values) => {
                values["_method"] = "put";
                delete values["store_logo"];
                if (values['store_logo_id'] == undefined) values['store_logo_id'] = null
                values["hide_vendor_phone"] = Number(values["hide_vendor_phone"]);
                values["hide_vendor_email"] = Number(values["hide_vendor_email"]);
                mutate(values);
            }}>
            {({ setFieldValue, values, errors, touched }) => (
                <Form className="theme-form theme-form-2 mega-form">
                    <Row>
                        <FileUploadField values={values} setFieldValue={setFieldValue} title="StoreLogo" type="file" id="store_logo_id" name="store_logo_id" errors={errors} touched={touched} />
                        <SimpleInputField nameList={[{ name: "store_name", placeholder: t("EnterStoreName"), require: "true" }, { name: "description", title: "StoreDescription", type: "textarea", placeholder: t("EnterDescription"), require: "true" }]} />
                        <AddressComponent values={values} />
                        <SimpleInputField nameList={[
                            { name: "facebook", type: "url", placeholder: t("EnterFacebookurl") },
                            { name: "pinterest", type: "url", placeholder: t("EnterPinteresturl") },
                            { name: "instagram", type: "url", placeholder: t("EnterInstagramurl") },
                            { name: "twitter", type: "url", placeholder: t("EnterTwitterurl") },
                            { name: "youtube", type: "url", placeholder: t("EnterYoutubeurl") },
                        ]} />
                        <CheckBoxField name="hide_vendor_email" title="HideEmail" />
                        <CheckBoxField name="hide_vendor_phone" title="HidePhone" />
                        <FormBtn loading={Number(isLoading)} />
                    </Row>
                </Form>
            )}
        </Formik>
    )
}

export default VendorProfile