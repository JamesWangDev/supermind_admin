import React, { Fragment, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import Btn from "../../Elements/Buttons/Btn";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { attributeValues, nameSchema, YupObject } from "../../Utils/Validation/ValidationSchemas";
import SimpleInputField from "../InputFields/SimpleInputField";
import Loader from "../CommonComponent/Loader";
import PromptInputs from "./PromptInputs";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const PromptForm = ({ mutate, updateId, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data: oldData, isLoading, refetch } = useQuery(["role/id"], () => request({ url: `prompt/${updateId}` }), {
    refetchOnMount: false, enabled: false, select: (data) => data.data,
  });
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);
  if (updateId && isLoading) return <Loader />;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.name || "" : "",
        prompt_text: updateId ? oldData?.prompt_text : "",
        status: updateId ? Boolean(Number(oldData?.status)) : true,
      }}
      validationSchema={YupObject({ name: nameSchema })}
      onSubmit={(values) => mutate({ ...values, status: Number(values.status) })}>
      {() => (
        <Form className="theme-form theme-form-2 mega-form">
          <PromptInputs />
          <div className="align-items-start value-form">
            <div className="d-flex">
              <FormBtn loading={Boolean(loading)} />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PromptForm;
