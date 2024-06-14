"use client"

import React, { useEffect, useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import MultiSelectField from "@/Components/InputFields/MultiSelectField";
import FormBtn from "@/Elements/Buttons/FormBtn";
import { Form, Formik } from "formik";
import { Spinner } from "reactstrap";
import { AITextboxData } from "@/Data/AITextboxData";
import { product } from "@/Utils/AxiosUtils/API";
import request from "@/Utils/AxiosUtils";
import { useRouter } from 'next/navigation';
import AccountContext from "@/Helper/AccountContext";
import Btn from "@/Elements/Buttons/Btn";

const SupermindBackend = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const [message, setMessage] = useState("")
  const [supermind, setSupermind] = useState("")
  const [webSocket, setWebSocket] = useState(null)
  const [refreshWebSocket, setRefreshWebSocket] = useState(0)
  const [chatLoading, setChatLoading] = useState(false)
  const [chatData, setChatData] = useState([])
  const [chatLogs, setChatLogs] = useState([])
  const [taskSplitterPrompt, setTaskSplitterPrompt] = useState(``);
  const [chatPrompt, setChatPrompt] = useState(``);
  const [vectorQueryPrompt, setVectorQueryPrompt] = useState(``)
  const [procedureSelectorPrompt, setProcedureSelectorPrompt] = useState(``)
  const {accountData} = useContext(AccountContext);

  const { data: supermindsData, isLoading } = useQuery([product], () => request({
    url: product, method: 'get'
  }, router), { refetchOnWindowFocus: false, refetchOnMount: false, cacheTime: 0, select: (data) => data.data.data });

  const { isLoading: promptsLoading, data: promptsData } = useQuery([], async() => {
    const resp = await fetch("https://nodeapi.supermind.bot/nodeapi/getPrompts", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
    })
    const respJson = await resp.json()
    if(respJson.success) {
      setVectorQueryPrompt(respJson.data.vector_query)
      setChatPrompt(respJson.data.chat)
      setProcedureSelectorPrompt(respJson.data.procedure_selector)
      setTaskSplitterPrompt(respJson.data.task_splitter)
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
        body: JSON.stringify({...promptsData, task_splitter: taskSplitterPrompt, chat: chatPrompt, vector_query: vectorQueryPrompt, procedure_selector: procedureSelectorPrompt})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        alert(`Procedure ${procedureId ? "updated" : "saved"}`)
        setStateProcedureId(respJson.data)
    }
    throw respJson.message
  }, { refetchOnWindowFocus: false });

  useEffect(() => {
    const webSocket = new WebSocket("wss://nodeapi.supermind.bot/nodeapi")
    setWebSocket(webSocket);
    webSocket.onmessage = (event) => {
        try {
            const jsonData = JSON.parse(event.data)
            if(jsonData.event === "chatWithProcedureMessage" || jsonData.event === "taskSplitterMessage") {
                setChatData(prev => [...prev, jsonData.data])
                if(jsonData.isEnd) setChatLoading(false)
            }
            if(jsonData.event === "chatWithProcedureLog" || jsonData.event === "taskSplitterLog") {
                setChatLogs(prev => [...prev, jsonData.data])
            }
            if(jsonData.event === "chatWithProcedureError" || jsonData.event === "taskSplitterError") {
                alert(jsonData.message)
                setChatLoading(false)
            }
        } catch (e) {
            console.log(e)
        }
    };
}, [refreshWebSocket])

  if(isLoading) return <Spinner/>
  return (
    <>
      <Formik
        initialValues={{"User Message": "", "Superminds": "", "TaskSplitterPrompt": taskSplitterPrompt, "ChatPrompt": chatPrompt}}
        onSubmit={() => {
            if(webSocket.readyState === webSocket.CLOSED) {
                setRefreshWebSocket(prev => prev ? 0 : 1)
                alert("Error occured. Please try again")
                return
            }
            webSocket.send(JSON.stringify({event: "taskSplitter", data: {message, taskSplitterPrompt, chatPrompt, vectorQueryPrompt, procedureSelectorPrompt, supermindId: supermind, userId: accountData.id}}))
            setChatLoading(true)
            setChatData([])
            setChatLogs([])
        }}>
        {({ values, setFieldValue, errors, handleSubmit }) => {
          const setSupermindVal = (label, value) => {
              setFieldValue(label, value);
              setSupermind(value)
          }
          return <Form onSubmit={handleSubmit}>
            <SimpleInputField nameList={[{ name: "User Message", require: "true", placeholder: t("User Message"), onChange: (e) => setMessage(e.target.value), value: message }]} />
            <MultiSelectField errors={errors} values={values} setFieldValue={setSupermindVal} name="Superminds" require="true" data={supermindsData} />
            {accountData?.system_reserve === 1 && <SimpleInputField nameList={[{ name: "TaskSplitterPrompt", require: "true", placeholder: t("Task Splitter Prompt"), onChange: (e) => setTaskSplitterPrompt(e.target.value), value: taskSplitterPrompt, type: "textarea", rows: 5, promptText: AITextboxData.procedure_req }, { name: "ChatPrompt", require: "true", placeholder: t("Chat Prompt"), onChange: (e) => setChatPrompt(e.target.value), value: chatPrompt, type: "textarea", rows: 10, promptText: AITextboxData.procedure_creating_prompt }, { name: "VectorQueryPrompt", require: "true", placeholder: t("Vector Query Prompt"), onChange: (e) => setVectorQueryPrompt(e.target.value), value: vectorQueryPrompt, type: "textarea", rows: 10, promptText: AITextboxData.procedure_creating_prompt }, { name: "ProcedureSelectorPrompt", require: "true", placeholder: t("Procedure Selector Prompt"), onChange: (e) => setProcedureSelectorPrompt(e.target.value), value: procedureSelectorPrompt, type: "textarea", rows: 10, promptText: AITextboxData.procedure_creating_prompt }]} />}
            {accountData?.system_reserve === 1 && <Btn
              title="Update Prompts"
              className="align-items-center btn-theme add-button"
              loading={isLoading || chatLoading || updatePromptsLoading || promptsLoading}
              onClick={updatePromptsMutate}
            />}
            <FormBtn submitText="Create" loading={isLoading || chatLoading || updatePromptsLoading || promptsLoading} />
          </Form>
        }}
      </Formik>
        {chatLogs.length > 0 && <div>
            <h3>Logs: </h3>
            {chatLogs.map((chatLog, i) => <p key={i}>{chatLog}</p>)}
        </div>}
        {chatData.length > 0 && <div>
            <h3>Response: </h3>
            <p>{chatData.map((data, i) => <p key={i}>{data}</p>)}</p>
        </div>}
    </>
  );
};

export default SupermindBackend;