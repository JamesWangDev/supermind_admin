import React, { Fragment, useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorMessage, FieldArray, Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import Btn from "../../Elements/Buttons/Btn";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { nameSchema, YupObject, descriptionSchema } from "../../Utils/Validation/ValidationSchemas";
import Loader from "../CommonComponent/Loader";
import GptmodelInputs from "./GptmodelInputs";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const GptmodelForm = ({ mutate, updateId, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data: oldData, isLoading, refetch } = useQuery(["gptmodel/id"], () => request({ url: `gptmodel/${updateId}` }), {
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
        description: updateId ? oldData?.description : "",
        api_url: updateId ? oldData?.api_url : "",
        api_key: updateId ? oldData?.api_key : "",
        status: updateId ? Boolean(Number(oldData?.status)) : true,
      }}
      validationSchema={YupObject({ name: nameSchema, description: descriptionSchema, api_url: nameSchema, api_key: nameSchema })}
      onSubmit={(values) => mutate({ ...values, status: Number(values.status) })}>
      {() => (
        <Form className="theme-form theme-form-2 mega-form">
          <GptmodelInputs />
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

export default GptmodelForm;
