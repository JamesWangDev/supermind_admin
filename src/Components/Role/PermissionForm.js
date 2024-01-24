import { useQuery } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { useContext, useEffect } from "react";
import FormBtn from "../../Elements/Buttons/FormBtn";
import request from "../../Utils/AxiosUtils";
import { YupObject, nameSchema, permissionsSchema } from "../../Utils/Validation/ValidationSchemas";
import Loader from "../CommonComponent/Loader";
import SimpleInputField from "../InputFields/SimpleInputField";
import PermissionsCheckBoxForm from "./PermissionsCheckBoxForm";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const PermissionForm = ({ mutate, updateId, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const getPermissionsIdsArray = (data) => {
    const { permissions, name, errors } = data;
    return permissions ? { name, permissions: permissions?.map((permissionsData) => permissionsData.id) } : console.log(errors[0]?.message);
  };
  const { data: oldData, isLoading, refetch } = useQuery(["role/id"], () => request({ url: `role/${updateId}` }), { refetchOnMount: false, enabled: false, select: (data) => getPermissionsIdsArray(data?.data) });
  useEffect(() => {
    updateId && refetch();
  }, [updateId]);

  if (updateId && isLoading) return <Loader />;

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          name: updateId ? oldData?.name || "" : "",
          permissions: updateId ? oldData?.permissions || [] : [],
        }}
        validationSchema={YupObject({
          name: nameSchema,
          permissions: permissionsSchema,
        })}
        onSubmit={(values) => mutate({ name: values.name, permissions: values.permissions })}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <div className="theme-form theme-form-2 mega-form">
              <SimpleInputField nameList={[{ name: "name", placeholder: t("RoleName"), require: 'true' }]} />
            </div>
            <PermissionsCheckBoxForm values={values} errors={errors} touched={touched} setFieldValue={setFieldValue} />
            <FormBtn loading={loading} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PermissionForm;
