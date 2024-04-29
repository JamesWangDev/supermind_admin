import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import SimpleInputField from "../../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import FormBtn from "@/Elements/Buttons/FormBtn";
import { Form, Formik } from "formik";
import AccountContext from "@/Helper/AccountContext";

const CreateActionsFunction = () => {
  const { i18Lang } = useContext(I18NextContext);
  const {accountData} = useContext(AccountContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [func, setFunc] = useState("")
  const [description, setDescription] = useState("")
  const [authKey, setAuthKey] = useState("");

  const {mutate, error: mutationError, isLoading: mutationLoading} = useMutation(async ({authKey, description, func}) => {
    const resp = await fetch("ws://134.209.37.239:3010/createNodeFromFunction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({func, description, authKey, email: accountData.email})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        alert("Action created")
        return respJson
    }
    throw respJson.message
  },{ refetchOnWindowFocus: false, select: (data) => data.data });

  const createNode = () => {
    if(authKey && description && func){
        mutate({authKey, description, func})
    } else {
        alert("Please fill all fields")
    }
  }

  return (
    <Formik
      initialValues={{"ApiSpecType": "", "AuthToken": "", "API_SPEC": ""}}
      onSubmit={createNode}>
      {({ values, setFieldValue, errors, handleSubmit }) => {
        return <Form onSubmit={handleSubmit}>
          <SimpleInputField nameList={[{ name: "AuthToken", require: "true", placeholder: t("AuthToken"), onChange: (e) => setAuthKey(e.target.value), value: authKey }, { name: "Description", require: "true", title: "Description", type: "textarea", rows: 5, placeholder: t("Enter Description"), onChange: (e) => setDescription(e.target.value), value: description}, { name: "Function", require: "true", title: "Function", type: "textarea", rows: 5, placeholder: t("Enter Function"), onChange: (e) => setFunc(e.target.value), value: func}]} />
          <FormBtn loading={mutationLoading} />
        </Form>
      }}
    </Formik>
  );
};

export default CreateActionsFunction;
