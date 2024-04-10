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
import AttributeInputs from "./AttributeInputs";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const AttributeForm = ({ mutate, updateId, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { data: oldData, isLoading, refetch } = useQuery(["role/id"], () => request({ url: `attribute/${updateId}` }), {
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
        style: updateId ? oldData?.style || '' : "rectangle",
        value: updateId ? oldData?.attribute_values || [] : [{ value: "", hex_color: "" }],
      }}
      validationSchema={YupObject({
        name: nameSchema,
        value: attributeValues,
      })}
      onSubmit={(values) => {
        values["status"] = 1;
        mutate(values);
      }}>
      {({ values }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <AttributeInputs />
          <Row className="mb-4 align-items-center">
            <Col sm="12">
              <FieldArray
                name="value"
                render={(arrayHelpers) => {
                  return (
                    <>
                      {values["value"].map((item, i) => (
                        <Fragment key={i}>
                          <Row className="g-sm-4 g-3 align-items-center attribute-row">
                            <Col sm="10" xs="9" className="custom-row">
                              <SimpleInputField nameList={[{ name: `value[${i}][value]`, title: "Value", require: "true", placeholder: t("EnterValue") }]} />
                              <div className="invalid-feedback feedback-right"><ErrorMessage name={`value[${i}][value]`} render={(msg) => <div className="invalid-feedback d-block">{t("Values")} {t("IsRequired")}</div>} /></div>
                            </Col>
                            {
                              values.style == "color" && <SimpleInputField nameList={[{ name: `value[${i}][hex_color]`, type: "color", title: "Value", placeholder: t("EnterValue") }]} />
                            }
                            {values["value"].length > 1 && (
                              <Col sm="2" xs="3" className="mt-0 ps-sm-2 ps-0 attribute-remove">
                                <a className="h-100 w-100 cursor-pointer text-danger" onClick={() => arrayHelpers.remove(i)}>
                                  {t("Remove")}
                                </a>
                              </Col>
                            )}
                          </Row>
                        </Fragment>
                      ))}
                      <Col xs="4" className="offset-2">
                        <Btn className="btn-theme" onClick={() => arrayHelpers.push({ value: "" })} title="AddAttribute" />
                      </Col>
                    </>
                  );
                }}
              />
            </Col>
          </Row>
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

export default AttributeForm;
