"use client"

import React, { useEffect, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  const [taskSplitterPrompt, setTaskSplitterPrompt] = useState(`DIRECTIVE:
  //Analyse the input and split into task groups or items, output an array of objects for each task group or item as follows:
  If prompt contains > 1 task group THEN
  Split Prompt into Tasks.
  For each task in tasks:
  Output JSON:
  [
  {
  "taskName": "<Name of the Task>",
  "taskPrompt": "<New Task Prompt in pseudocode>",
  "taskPresent": true
  },
  {
  "taskName": "<Name of the Task>",
  "taskPrompt": "<New Task Prompt in pseudocode>",
  "taskPresent": true
  }
  ]
  Else
  If User prompt contains 0 tasks THEN
  Output JSON:
  [
  {
  "taskName": "no task",
  "taskPrompt": "no prompt",
  "taskPresent": false
  }
  ]
  Else
  Task Split Procedure
  Output JSON:
  [
  {
  "taskName": "<Name of the Task>",
  "taskPrompt": "<New Task Prompt in pseudocode>",
  "taskPresent": true
  },
  {
  "taskName": "<Name of the Task>",
  "taskPrompt": "<New Task Prompt in pseudocode>",
  "taskPresent": true
  }
  ]
  //Loop over each task outputting one object for each task group or item
  //Do not use the term "search for" when a user wants info, just say in the pseudocode "respond with info about:"
  //All tasks can be completed with an api or tool request, if the task is suited to an api prefix with "API"
  //group task objects of the same type, for example, checking and creating a task is one task object. Getting information is a separate task object. Doing something else is a separate task object.`);
  const [chatPrompt, setChatPrompt] = useState(`You are an action agent. You follow Procedures provided in turns like in Dungeons and Dragons. In each turn, you Issue 2 commands, the first will be as per the procedure, and the second will be a user message informing the user of your action, what node you are executing and why.   Make sure to include the why in your message.   You will receive a response to commands and then follow the procedure logic to choose a new command to issue. Issue each command as a JSON package in the format Command: URL. DATA BLOCK: Key pairs as per procedure. The back end system will parse the text you output and send the DATA Block to the API targeted URL and then return the response in your next turn. DO NOT EXPLAIN ANYTHING OR SAY YOU CANNOT DO ANYTHING. Follow these instructions verbatim, **always** issues the command URL and DATA BLOCK. Do not issue any additional tokens.  For the user message you issues, always use the following URL "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4-f27a-48e9-a62f-a87722a0b5d4"  [Example Turn] Example Command: [{
    "Command": "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4",
    "DATA BLOCK": {
      "start": 1,
      "final_value": 20
    }
  }] Example User Message [{
    "Command": "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4-f27a-48e9-a62f-a87722a0b5d4",
    "DATA BLOCK": {
      "user message": "I issued a command",
  }
  }]|You always ensure objects are output in an array, for example    For each command in commands:        Output JSON Array:            [            {                "Command": "<URL>",                "DATA BLOCK": "<data block>"            },            {                "Command": "<URL>",                "DATA BLOCK": "<data block>"            }            ]
      //never ouput "response" key value pairs
      //alway output in an array
      //<directive>when procedure is complete issue "@!@" as your last token</end directive>
        "Command": "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4",
    "DATA BLOCK": {
      "start": 1,
      "final_value": 20
    }
  }] Example User Message [{
    "Command": "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4-f27a-48e9-a62f-a87722a0b5d4",
    "DATA BLOCK": {
      "user message": "I issued a command",
  }
  }]|You always ensure objects are output in an array, for example    For each command in commands:        Output JSON Array:            [            {                "Command": "<URL>",                "DATA BLOCK": "<data block>"            },            {                "Command": "<URL>",                "DATA BLOCK": "<data block>"            }            ]
      //never ouput "response" key value pairs
      //alway output in an array
      //<directive>when procedure is complete issue "@!@" as your last token</end directive>
        "Command": "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4",
    "DATA BLOCK": {
      "start": 1,
      "final_value": 20
    }
  }] Example User Message [{
    "Command": "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4-f27a-48e9-a62f-a87722a0b5d4",
    "DATA BLOCK": {
      "user message": "I issued a command",
  }
  }]|You always ensure objects are output in an array, for example    For each command in commands:        Output JSON Array:            [            {                "Command": "<URL>",                "DATA BLOCK": "<data block>"            },            {                "Command": "<URL>",                "DATA BLOCK": "<data block>"            }            ]
      //never ouput "response" key value pairs
  
      //<directive>when procedure is complete issue "@!@" as your last token</end directive>
  
  
   //alway output in an array of JSON!!!!
  //alway output in an array of JSON!!!!
  
  DIRECTIVE: IF THE PROCEDURE IS NOT CORRECT FOR FOR THE USER MESSAGE IGNORE THE PROCEDURE AND ANSWER THE BEST YOU CAN.   YOU MAY STILL USE COMMANDS AND GET RESPONSES IF YOU NEED TO
  
  IF INFORMATION IS MISSING TRY YOUR BEST TO ANSWER ANYWAY
  
   ///alway output in an array of JSON!!!!`);

   const {accountData} = useContext(AccountContext);

   const { data, isLoading } = useQuery([product], () => request({
    url: product, method: 'get'
  }, router), { refetchOnWindowFocus: false, refetchOnMount: false, cacheTime: 0, select: (data) => data.data.data });

  useEffect(() => {
    const webSocket = new WebSocket("ws://134.209.37.239:3010")
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
        initialValues={{"User Message": "", "Superminds": "", "Task Splitter Prompt": "", "Chat Prompt": ""}}
        onSubmit={() => {
            if(webSocket.readyState === webSocket.CLOSED) {
                setRefreshWebSocket(prev => prev ? 0 : 1)
                alert("Error occured. Please try again")
                return
            }
            webSocket.send(JSON.stringify({event: "taskSplitter", data: {message, taskSplitterPrompt, chatPrompt, supermindId: supermind, userId: accountData.id}}))
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
            <MultiSelectField errors={errors} values={values} setFieldValue={setSupermindVal} name="Superminds" require="true" data={data} />
            <SimpleInputField nameList={[{ name: "Task Splitter Prompt", require: "true", placeholder: t("Task Splitter Prompt"), onChange: (e) => setTaskSplitterPrompt(e.target.value), value: taskSplitterPrompt, type: "textarea", rows: 5, promptText: AITextboxData.procedure_req }, { name: "Chat Prompt", require: "true", placeholder: t("Chat Prompt"), onChange: (e) => setChatPrompt(e.target.value), value: chatPrompt, type: "textarea", rows: 10, promptText: AITextboxData.procedure_creating_prompt }]} />
            <FormBtn submitText="Create" loading={isLoading || chatLoading} />
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