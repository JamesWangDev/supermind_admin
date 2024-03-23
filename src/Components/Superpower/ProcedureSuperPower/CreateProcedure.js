import React, { useEffect, useContext, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import SimpleInputField from "../../InputFields/SimpleInputField";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import MultiSelectField from "../../InputFields/MultiSelectField";
import FormBtn from "@/Elements/Buttons/FormBtn";
import { Form, Formik } from "formik";
import { Spinner } from "reactstrap";
import {XMLParser} from 'fast-xml-parser'
import CustomReactFlowNode from "@/Helper/CustomReactFlowNode";
import Btn from "@/Elements/Buttons/Btn";
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix : "@_"
});

const nodeTypes = {
  customNode: CustomReactFlowNode,
};

const CreateProcedure = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [procedureName, setProcedureName] = useState("")
  const [actions, setActions] = useState([])
  const [procedureRequirement, setProcedureRequirement] = useState("");
  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])

  const { error, data: actionsInfo, isLoading } = useQuery(["actions"], async () => {
    const resp = await fetch("http://134.209.37.239:3010/getDescriptions?paginate=100&page=1&sort=asc", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
    })
    const respJson = await resp.json()
    if(respJson.success) return respJson
    throw respJson.message
  }, { refetchOnWindowFocus: false, select: (data) => data.data });
  
  const {mutate: createProcedureMutate, isLoading: createProcedureLoading, data: procedureData} = useMutation(async ({actions, procedureRequirement, name}) => {
    const resp = await fetch("http://134.209.37.239:3010/createProcedure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({name, actions, requirement: procedureRequirement})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        alert("Procedure created")
        return respJson
    }
    throw respJson.message
  },{ refetchOnWindowFocus: false, select: (data) => data.data });
  
  const {mutate: saveProcedureMutate, isLoading: saveProcedureLoading} = useMutation(async ({description, procedure, name}) => {
    const resp = await fetch("http://134.209.37.239:3010/saveProcedure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({name, description, procedure})
    })
    const respJson = await resp.json()
    if(respJson.success) {
        alert("Procedure saved")
        return respJson
    }
    throw respJson.message
  },{ refetchOnWindowFocus: false, select: (data) => data.data });

  const createProcedure = () => {
    if(!actions?.length || !procedureRequirement){
        alert("Please Fill all fields.")
    } else {
        createProcedureMutate({name: procedureName, actions, procedureRequirement})
    }
  }

  useEffect(() => {
    if(procedureData?.data?.procedure){
      const parsedData = xmlParser.parse(procedureData?.data?.procedure)
      const graphData = parsedData.graph || parsedData.procedure?.graph || parsedData.commandBlock?.graph || parsedData.commandBlock?.command?.graph
      const edgeData = graphData?.edge?.edge || graphData?.edge
      const sourceNodeCount = {}
      const targetNodeCount = {}
      const edges = []
      for(let i = 0; i < edgeData?.length; i++){
        const e = edgeData[i]
        if(typeof e !== "object") continue
        if(sourceNodeCount[e["@_source"]]) sourceNodeCount[e["@_source"]]++
        else sourceNodeCount[e["@_source"]] = 1

        if(targetNodeCount[e["@_target"]]) targetNodeCount[e["@_target"]]++
        else targetNodeCount[e["@_target"]] = 1

        edges.push({id: i, source: e["@_source"], sourceHandle: `${sourceNodeCount[e["@_source"]] - 1}`, target: e["@_target"], targetHandle: `${targetNodeCount[e["@_target"]] - 1}`, label: e?.edgeLogic?.condition?.returnValue ?? ""})
      }
      const nodes = graphData?.node?.map((n, i) => {
        return {id: n["@_id"], type: "customNode", position: {x: 100 * i, y: i * 100}, data: {label: n["#text"], sourceHandleCount: sourceNodeCount[n["@_id"]] ?? 1, targetHandleCount: targetNodeCount[n["@_id"]] ?? 1}}
      })
      setNodes(nodes ?? [])
      setEdges(edges ?? [])
    }
  }, [procedureData])

  if(isLoading) return <Spinner/>
  return (
    <>
      <Formik
        initialValues={{"Name": "", "Actions": [], "Procedure Requirement": ""}}
        onSubmit={createProcedure}>
        {({ values, setFieldValue, errors, handleSubmit }) => {
          const setActionVal = (label, value) => {
              setFieldValue(label, value);
              setActions(value)
          }
          return <Form onSubmit={handleSubmit}>
            <SimpleInputField nameList={[{ name: "Name", require: "true", placeholder: t("Name"), onChange: (e) => setProcedureName(e.target.value), value: procedureName }]} />
            <MultiSelectField errors={errors} values={values} setFieldValue={setActionVal} name="Actions" require="true" data={actionsInfo.map(({name}) => ({name, id:name}))} />
            <SimpleInputField nameList={[{ name: "Procedure Requirement", require: "true", placeholder: t("Procedure Requirement"), onChange: (e) => setProcedureRequirement(e.target.value), value: procedureRequirement, type: "textarea", rows: 5, }]} />
            <FormBtn submitText="Create" loading={isLoading || createProcedureLoading || saveProcedureLoading} />
          </Form>
        }}
      </Formik>
      {procedureData?.data && <>
        <p>{procedureData.data.description}</p>
        <div style={{ width: '75vw', height: '100vh' }}>
          <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} >
            <Controls />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <div className="ms-auto justify-content-end dflex-wgap mt-sm-4 my-2 save-back-button">
          <Btn onClick={() => {saveProcedureMutate({name: procedureName, procedure: procedureData.data.procedure, description: procedureData.data.description})}} className="btn-primary btn-lg" type="submit" title="Save" loading={isLoading || createProcedureLoading || saveProcedureLoading} />
        </div>
      </>}
    </>
  );
};

export default CreateProcedure;