import { useContext } from "react";
import { useTranslation } from "@/app/i18n/client";
import { Form, Formik } from "formik";
import { Row } from "reactstrap";
import Btn from "../../Elements/Buttons/Btn";
import { shippingRule } from "../../Utils/AxiosUtils/API";
import useDelete from "../../Utils/Hooks/useDelete";
import { ifShippingTypeIsFree, nameSchema, YupObject } from "../../Utils/Validation/ValidationSchemas";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import DeleteButton from "../Table/DeleteButton";
import FormContent from './FormContent'
import I18NextContext from "@/Helper/I18NextContext";

const FormsShippingRuleCreation = ({ rules, mutate, shipping_id, loading, refetch }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { mutate: deleteMutate, isLoading } = useDelete(shippingRule, refetch ? refetch() : "");
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: rules?.name || "",
        rule_type: rules?.rule_type || "",
        min: rules?.min || "",
        max: rules?.max || "",
        shipping_type: rules?.shipping_type || "",
        amount: rules?.amount || "",
        status: rules?.status ? Boolean(Number(rules?.status)) : true,
        shipping_id: rules ? shipping_id : shipping_id.create,
      }}
      validationSchema={YupObject({
        name: nameSchema,
        min: nameSchema,
        max: nameSchema,
        shipping_type: nameSchema,
        amount: ifShippingTypeIsFree,
        status: nameSchema,
      })}
      onSubmit={(values) => {
        if (values["shipping_type"] == "free") {
          delete values["amount"];
        }
        mutate({ ...values, status: Number(values.status) });
      }}>
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            <FormContent />
            {values["shipping_type"] !== "free" && <SimpleInputField nameList={[{ name: "amount", type: "number", placeholder: t("EnterAmount"), require: "true" }]} />}
            <CheckBoxField name="status" />
          </Row>
          <div className="dflex-wgap justify-content-end ms-auto mt-0 save-back-button">
            {rules?.id && <DeleteButton id={rules.id} mutate={deleteMutate} noImage={true} loading={isLoading} />}
            <Btn className="btn-primary" type="submit" title="Save" loading={Number(loading)} />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormsShippingRuleCreation;
