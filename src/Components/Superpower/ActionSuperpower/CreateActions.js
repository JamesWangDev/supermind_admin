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

const apiTypeOptions = [
    {
      name: "OpenApi Spec",
      id: "spec"
    },
    {
      name: "Rapid Api Options",
      id: "rapidapi",
    },
];

const CreateActions = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [spec, setSpec] = useState("")
  const [specType, setSpecType] = useState("spec")
  const [authKey, setAuthKey] = useState("second")
  const [refetchApiInfo, setRefetchApiInfo] = useState(0)

  const { error, data: apiInfo, isLoading } = useQuery(["apiInfo", refetchApiInfo, specType], async () => {
    if(!spec || !specType || ! authKey) throw "Please Fill All Fields"
    const resp = await fetch("http://134.209.37.239:3010/getNodeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({data: spec, specType})
    })
    const respJson = await resp.json()
    if(respJson.success) return respJson
    throw respJson.message
  }, { refetchOnWindowFocus: false, select: (data) => data.data });
  
  const {mutate, error: mutationError, isLoading: mutationLoading} = useMutation(async () => {
    const resp = await fetch("http://134.209.37.239:3010/createNode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({apiSpec: spec, specType, authKey})
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

  const createNode = () => {
    if(apiInfo){
        mutate()
    } else {
        alert("Check spec and try again")
    }
  }

  return (
    <Formik
      initialValues={{"ApiSpecType": "", "AuthToken": "", "API_SPEC": ""}}
      onSubmit={createNode}>
      {({ values, setFieldValue, errors, handleSubmit }) => {
        const setSpecTypeVal = (label, value) => {
          setFieldValue(label, value);
          setSpecType(value)
        }
        return <Form onSubmit={handleSubmit}>
          <MultiSelectField errors={errors} values={values} setFieldValue={setSpecTypeVal} name="ApiSpecType" require="true" data={apiTypeOptions} />
          <SimpleInputField nameList={[{ name: "AuthToken", require: "true", placeholder: t("AuthToken"), onChange: (e) => setAuthKey(e.target.value), value: authKey }, { name: "API_SPEC", require: "true", title: "API_SPEC", type: "textarea", rows: 10, placeholder: t("ENTER_API_SPEC"), onChange: (e) => {
            setSpec(e.target.value)
            showApiInfo()
          }, value: spec}]} />
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

export default CreateActions;
