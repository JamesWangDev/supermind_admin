import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import SimpleInputField from "../../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import FormBtn from "@/Elements/Buttons/FormBtn";
import { Form, Formik } from "formik";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import ReactFlowChart from "@/Helper/ReactFlowChart";
import { AITextboxData } from "@/Data/AITextboxData";
import dynamic from "next/dynamic";
import { ACTION_CATEGORIES } from "@/Utils/ActionCategories";
import ActionCategoryComp from "@/Helper/ActionCategoryComp";
import Btn from "@/Elements/Buttons/Btn";
import AccountContext from "@/Helper/AccountContext";
const Markdown = dynamic(() => import("react-markdown"), {
  loading: () => <p>Loading...</p>,
});

const CreateProcedure = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [procedureName, setProcedureName] = useState("")
  const [actions, setActions] = useState([])
  const [procedureRequirement, setProcedureRequirement] = useState("");
  const [procedurePrompt, setProcedurePrompt] = useState(``);
  const [vectorQueryPrompt, setVectorQueryPrompt] = useState(``)
  const {accountData} = useContext(AccountContext);

  const [showModal, setShowModal] = useState(null)

  const {mutate: createProcedureMutate, isLoading: createProcedureLoading, data: procedureData} = useMutation(async ({actions, procedureRequirement, procedurePrompt, name, vectorQueryPrompt}) => {
    const resp = await fetch("https://nodeapi.supermind.bot/nodeapi/createProcedure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({name, actions, requirement: procedureRequirement, prompt: procedurePrompt, vectorQueryPrompt})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        alert("Procedure created")
        return respJson.data
    }
    throw respJson.message
  }, { refetchOnWindowFocus: false });

  const { isLoading: promptsLoading, data: promptsData } = useQuery([], async() => {
    const resp = await fetch("https://nodeapi.supermind.bot/nodeapi/getPrompts", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    })
    const respJson = await resp.json()
    if(respJson.success) {
      setVectorQueryPrompt(respJson.data.vector_query_creating)
      setProcedurePrompt(respJson.data.procedure_creating)
      return respJson
    }
    throw respJson.message
  }, { refetchOnWindowFocus: false, refetchOnMount: false, cacheTime: 0, select: (data) => data.data });

  const {mutate: updatePromptsMutate, isLoading: updatePromptsLoading} = useMutation(async () => {
    const resp = await fetch("https://nodeapi.supermind.bot/nodeapi/updatePrompts", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...promptsData, vector_query_creating: vectorQueryPrompt, procedure_creating: procedurePrompt})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        alert(`Procedure ${procedureId ? "updated" : "saved"}`)
        setStateProcedureId(respJson.data)
    }
    throw respJson.message
  }, { refetchOnWindowFocus: false });
  
  const createProcedure = () => {
    const filteredValActions = actions.filter((action) => !ACTION_CATEGORIES.includes(action))
    if(!filteredValActions.length || !procedureRequirement){
        alert("Please Fill all fields.")
    } else {
        createProcedureMutate({name: procedureName, actions: filteredValActions, procedureRequirement, procedurePrompt, vectorQueryPrompt})
    }
  }

  return (
    <>
      <Formik
        initialValues={{"Name": procedureName, "Actions": actions, "ProcedureRequirement": procedureRequirement}}
        onSubmit={createProcedure}>
        {({ values, setFieldValue, errors, handleSubmit }) => {
          return <Form onSubmit={handleSubmit}>
            <SimpleInputField nameList={[{ name: "Name", require: "true", placeholder: t("Name"), onChange: (e) => setProcedureName(e.target.value), value: procedureName }]} />
            <ActionCategoryComp name="Select Actions" getSelectedActions={(actions) => setActions(actions)} />
            <SimpleInputField nameList={[{ name: "ProcedureRequirement", require: "true", placeholder: t("ProcedureRequirement"), onChange: (e) => setProcedureRequirement(e.target.value), value: procedureRequirement, type: "textarea", rows: 5, promptText: AITextboxData.procedure_req }, { name: "ProcedureCreatingPrompt", require: "true", placeholder: t("ProcedureCreatingPrompt"), onChange: (e) => setProcedurePrompt(e.target.value), value: procedurePrompt, type: "textarea", rows: 10, promptText: AITextboxData.procedure_creating_prompt }, , { name: "VectorQueryCreatingPrompt", require: "true", placeholder: t("VectorQueryCreatingPrompt"), onChange: (e) => setVectorQueryPrompt(e.target.value), value: vectorQueryPrompt, type: "textarea", rows: 10, promptText: AITextboxData.procedure_creating_prompt }]} />
            {accountData.system_reserve && <SimpleInputField nameList={[{ name: "ProcedureCreatingPrompt", require: "true", placeholder: t("ProcedureCreatingPrompt"), onChange: (e) => setProcedurePrompt(e.target.value), value: procedurePrompt, type: "textarea", rows: 10, promptText: AITextboxData.procedure_creating_prompt }, , { name: "VectorQueryCreatingPrompt", require: "true", placeholder: t("VectorQueryCreatingPrompt"), onChange: (e) => setVectorQueryPrompt(e.target.value), value: vectorQueryPrompt, type: "textarea", rows: 10, promptText: AITextboxData.procedure_creating_prompt }]} />}
            {accountData.system_reserve && <Btn
              title="Update Prompts"
              className="align-items-center btn-theme add-button"
              loading={createProcedureLoading || updatePromptsLoading || promptsLoading}
              onClick={updatePromptsMutate}
            />}
            <FormBtn submitText="Create" loading={ createProcedureLoading || promptsLoading || updatePromptsLoading } />
          </Form>
        }}
      </Formik>
      {procedureData && <>
        <ReactFlowChart name={procedureData.name} procedure={procedureData.procedure} description={procedureData.description} vectorQuery={procedureData.vectorQuery} width="75vw" />
      </>}
      <Modal fullscreen isOpen={!!showModal?.name} toggle={() => setShowModal(null)}>
            <ModalHeader toggle={() => setShowModal(null)}>{showModal?.name}</ModalHeader>
            <ModalBody>
                <Markdown>
                  {showModal?.description}
                </Markdown>
            </ModalBody>
      </Modal>
    </>
  );
};

export default CreateProcedure;