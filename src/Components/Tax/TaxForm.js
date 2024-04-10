import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React, { useContext, useEffect } from "react";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { tax } from "../../Utils/AxiosUtils/API";
import { nameSchema, roleIdSchema, YupObject } from "../../Utils/Validation/ValidationSchemas";
import Loader from "../CommonComponent/Loader";
import CheckBoxField from "../InputFields/CheckBoxField";
import SimpleInputField from "../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const TaxForm = ({ mutate, updateId, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data: oldData, isLoading, refetch } = useQuery([updateId], () => request({ url: tax + "/" + updateId }), { refetchOnMount: false, enabled: false });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  if (updateId && isLoading) return <Loader />

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        rate: updateId ? oldData?.data?.rate || "" : "",
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
      }}
      validationSchema={YupObject({
        name: nameSchema,
        rate: roleIdSchema,
      })}
      onSubmit={(values) => {
        mutate({ ...values, status: Number(values.status) });
      }}>
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <SimpleInputField nameList={[{ name: "name", placeholder: t("EnterTaxTitle"), require: "true" }, { name: "rate", type: "number", placeholder: t("EnterRate"), require: "true", inputaddon: "true", postprefix: "%", min: "0", max: "100" }]} />
          <CheckBoxField name="status" />
          <FormBtn loading={loading} />
        </Form>
      )}
    </Formik>
  );
};

export default TaxForm;
