import React, { useContext, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { Row } from "reactstrap";
import request from "../../Utils/AxiosUtils";
import {nameSchema,YupObject,} from "../../Utils/Validation/ValidationSchemas";
import SimpleInputField from "../InputFields/SimpleInputField";
import FileUploadField from "../InputFields/FileUploadField";
import FormBtn from "../../Elements/Buttons/FormBtn";
import CheckBoxField from "../InputFields/CheckBoxField";
import MultiSelectField from "../InputFields/MultiSelectField";
import Loader from "../CommonComponent/Loader";
import CategoryContext from "../../Helper/CategoryContext";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const CategoryForm = ({ mutate, updateId, loading, type }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { categoryState } = useContext(CategoryContext)
  const { data: oldData, isLoading, refetch,
  } = useQuery(["category/" + updateId], () => request({ url: `category/${updateId}` }), { enabled: false }
  );
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);
  const updatedData = useMemo(() => {
    return categoryState
  }, [categoryState])

  if (updateId && isLoading) return <Loader />;

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: updateId ? oldData?.data?.name || "" : "",
        description: updateId ? oldData?.data?.description || "" : "",
        category_image_id: updateId ? oldData?.data?.category_image?.id : "",
        category_icon_id: updateId ? oldData?.data?.category_icon?.id : "",
        category_image: updateId ? oldData?.data?.category_image : "",
        category_icon: updateId ? oldData?.data?.category_icon : "",
        commission_rate: updateId ? oldData?.data?.commission_rate : "",
        type: type,
        status: updateId ? Boolean(Number(oldData?.data?.status)) : true,
        parent_id: updateId
          ? Number(oldData?.data?.parent_id) || undefined
          : undefined,
      }}
      validationSchema={YupObject({
        name: nameSchema,
      })}
      onSubmit={(values, helpers) => {
        values.status = Number(values.status);
        if (!values["category_image_id"]) {
          delete values["category_image_id"];
        }
        if (!values["category_icon_id"]) {
          delete values["category_icon_id"];
        }
        if (!values["parent_id"]) {
          values["parent_id"] = null;
        }
        delete values["category_image"];
        delete values["category_icon"];
        values["type"] = type;
        if (updateId) values["_method"] = "put";

        mutate(updateId ? { ...values, id: updateId } : values);
      }}
    >
      {({ setFieldValue, values, errors }) => (
        <Form className="theme-form theme-form-2 mega-form">
          <Row>
            <SimpleInputField
              nameList={[
                {
                  name: "name",
                  title: "Name",
                  placeholder: t("EnterCategoryName"),
                  require: "true",
                },
                {
                  name: "description",
                  placeholder: t("EnterCategoryDescription"),
                },
              ]}
            />
            {type == "product" && (
              <SimpleInputField
                nameList={[
                  {
                    name: "commission_rate",
                    title: "CommissionRate",
                    postprefix: "%",
                    inputaddon: "true",
                    placeholder: t("EnterCommissionRate"),
                    min: "0",
                    max: "100",
                    type: "number",
                    helpertext:
                      "*Define the percentage of earnings retained as commission.",
                  },
                ]}
              />
            )}
            <MultiSelectField
              errors={errors}
              values={values}
              setFieldValue={setFieldValue}
              name="parent_id"
              title={"SelectParent"}
              data={updatedData}
            />
            <FileUploadField
              name="category_image_id"
              id="category_image_id"
              title="Image"
              updateId={updateId}
              type="file"
              values={values}
              setFieldValue={setFieldValue}
              loading={loading}
            />
            <FileUploadField
              name="category_icon_id"
              id="category_icon_id"
              title="Icon"
              updateId={updateId}
              type="file"
              values={values}
              setFieldValue={setFieldValue}
              loading={loading}
            />
            <CheckBoxField name="status" />
            <FormBtn loading={loading} />
          </Row>
        </Form>
      )}
    </Formik>
  );
};
export default CategoryForm;
