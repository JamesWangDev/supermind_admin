import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import SimpleInputField from "../../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import MultiSelectField from "../../InputFields/MultiSelectField";
import { useDebouncedCallback } from 'use-debounce';
import { UncontrolledAccordion, AccordionBody, AccordionHeader, AccordionItem} from 'reactstrap'
import FormBtn from "@/Elements/Buttons/FormBtn";
import { Form, Formik } from "formik";
import AccountContext from "@/Helper/AccountContext";
import { AITextboxData } from "@/Data/AITextboxData";
import { ACTION_CATEGORIES } from "@/Utils/ActionCategories";

const apiTypeOptions = [
    {
      name: "OpenApi Spec",
      id: "spec"
    },
    {
      name: "Rapid Api Options",
      id: "rapidapi",
    },
    {
      name: "Serp Api url",
      id: "serpapi",
    },
];

const CreateActionsApi = () => {
  const { i18Lang } = useContext(I18NextContext);
  const {accountData} = useContext(AccountContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [spec, setSpec] = useState("")
  const [specType, setSpecType] = useState("spec")
  const [authType, setAuthType] = useState("")
  const [authKey, setAuthKey] = useState("");
  const [functionName, setFunctionName] = useState("")
  const [categories, setCategories] = useState([])
  const [description, setDescription] = useState("")
  const [refetchApiInfo, setRefetchApiInfo] = useState(0)

  const { data: integrationProviderOptions } = useQuery([], async () => {
    const resp = await fetch("https://auth.supermind.bot/integration-provider/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    if(resp.status < 200 || resp.status >= 300) throw respJson.message
    const respJson = await resp.json()
    return [...respJson, {name: "authToken", providerName: "authToken"}]
  }, { refetchOnWindowFocus: false });

  const { error, data: apiInfo, isLoading } = useQuery(["apiInfo", refetchApiInfo, specType, description, categories, functionName, authKey], async () => {
    if(!spec || !specType || (authType === "authToken" && !authKey) || !description || (specType === "serpapi" && !functionName) || !categories) throw "Please Fill All Fields"
    const resp = await fetch("https://nodeapi.supermind.bot/nodeapi/getNodeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({data: spec, specType, functionName})
    })
    const respJson = await resp.json()
    if(respJson.success) return respJson
    throw respJson.message
  }, { refetchOnWindowFocus: false, select: (data) => data.data });
  
  const {mutate, error: mutationError, isLoading: mutationLoading} = useMutation(async () => {
    const resp = await fetch("https://nodeapi.supermind.bot/nodeapi/createNode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({apiSpec: spec, specType, authType, email: accountData.email, authKey, description, functionName, categories})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        alert("Action created")
        return respJson
    }
    throw respJson.message
  },{ refetchOnWindowFocus: false, select: (data) => data.data });

  const showApiInfo = useDebouncedCallback(async () => {
    setRefetchApiInfo(prev => prev === 0 ? 1 : 0)
  }, 2000)

  const createNode = async () => {
    if(apiInfo){
      mutate()
    } else {
      alert("Check spec and try again")
    }
  }

  return (
    <Formik
      initialValues={{"ApiSpecType": specType, "AuthType": authType, "AuthToken": authKey, "FunctionName": functionName, "Categories": categories, "Description": description, "API_SPEC": spec}}
      onSubmit={createNode}>
      {({ values, setFieldValue, errors, handleSubmit }) => {
        const setSpecTypeVal = (label, value) => {
          setFieldValue(label, value);
          setSpecType(value)
        }
        const setAuthTypeVal = (label, value) => {
          setFieldValue(label, value);
          setAuthType(value)
        }
        const setCategoriesVal = (label, value) => {
          setFieldValue(label, value);
          setCategories(value)
        }
        return <Form onSubmit={handleSubmit}>
          <MultiSelectField errors={errors} values={values} setFieldValue={setSpecTypeVal} name="ApiSpecType" require="true" data={apiTypeOptions} />
          <MultiSelectField errors={errors} values={values} setFieldValue={setAuthTypeVal} name="AuthType" require="true" data={integrationProviderOptions?.map((prov) => ({name: prov.name, id: prov.providerName}))} />
          {authType === "authToken" && <SimpleInputField nameList={[{ name: "AuthToken", require: "true", placeholder: t("AuthToken"), onChange: (e) => setAuthKey(e.target.value), value: authKey }]} />}
          {specType === "serpapi" && <SimpleInputField nameList={[{ name: "FunctionName", require: "true", placeholder: t("FunctionName"), onChange: (e) => setFunctionName(e.target.value), value: functionName }]} />}
          <MultiSelectField errors={errors} values={values} setFieldValue={setCategoriesVal} name="Categories" require="true" data={ACTION_CATEGORIES.map((cate) => ({name: cate, id: cate}))} />
          <SimpleInputField nameList={[{ name: "Description", require: "true", placeholder: t("Description"), onChange: (e) => setDescription(e.target.value), value: description }, { name: "API_SPEC", require: "true", title: "API_SPEC", type: "textarea", rows: 10, placeholder: t("ENTER_API_SPEC"), onChange: (e) => {
            setSpec(e.target.value)
            showApiInfo()
          }, value: spec, promptText: AITextboxData.api_spec}]} />
          {
              apiInfo?.map((info, i) => <UncontrolledAccordion key={i}>
                  <AccordionItem>
                  <AccordionHeader targetId={i}>{info.split("Node Name: ")[1].split("\n")[0]}</AccordionHeader>
                  <AccordionBody accordionId={i}>
                      {
                          info.split("\n").map((inf, j) => <p key={j}>{inf}</p>)
                      }
                  </AccordionBody>
                  </AccordionItem>
              </UncontrolledAccordion>)
          }
          <FormBtn loading={isLoading || mutationLoading} />
        </Form>
      }}
    </Formik>
  );
};

export default CreateActionsApi;
