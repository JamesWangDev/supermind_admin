import { useCallback, useContext, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, addEdge, useNodesState, useEdgesState } from 'reactflow';
import {XMLParser} from 'fast-xml-parser'
import CustomReactFlowNode from "@/Helper/CustomReactFlowNode";
import CustomReactFlowEdge from "@/Helper/CustomReactFlowEdge";
import Btn from '@/Elements/Buttons/Btn';
import 'reactflow/dist/style.css';
import { useMutation } from '@tanstack/react-query';
import { Toast, ToastHeader, ToastBody } from "reactstrap";
import { useRef } from 'react';
import { MdClose } from 'react-icons/md';
import AccountContext from './AccountContext';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix : "@_",
  processEntities: false,
});

const nodeTypes = {
    customNode: CustomReactFlowNode,
};

const edgeTypes = {
    customEdge: CustomReactFlowEdge,
}

const ReactFlowChart = ({procedure, description, procedureId, width='75vw', height='100vh'}) => {
    const [webSocket, setWebSocket] = useState(null)
    const [refreshWebSocket, setRefreshWebSocket] = useState(0)
    const [stateProcedure, setStateProcedure] = useState(procedure)
    const [chatMessage, setChatMessage] = useState("")
    const [openToast, setOpenToast] = useState(false);
    const [prompt, setPrompt] = useState(`You are an action agent. You follow Procedures provided in turns like in Dungeons and Dragons. In each turn, you Issue 2 commands, the first will be as per the procedure, and the second will be a user message informing the user of your action, what node you are executing and why.   Make sure to include the why in your message.   You will receive a response to commands and then follow the procedure logic to choose a new command to issue. Issue each command as a JSON package in the format Command: URL. DATA BLOCK: Key pairs as per procedure. The back end system will parse the text you output and send the DATA Block to the API targeted URL and then return the response in your next turn. DO NOT EXPLAIN ANYTHING OR SAY YOU CANNOT DO ANYTHING. Follow these instructions verbatim, **always** issues the command URL and DATA BLOCK. Do not issue any additional tokens.  For the user message you issues, always use the following URL "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4-f27a-48e9-a62f-a87722a0b5d4"  [Example Turn] Example Command: [{
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
      
       ///alway output in an array of JSON!!!!`)
    const [chatLoading, setChatLoading] = useState(false)
    const [chatData, setChatData] = useState([])
    const [chatLogs, setChatLogs] = useState([])
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [prevNodes, setPrevNodes] = useState([])
    const [prevEdges, setPrevEdges] = useState([])
    const [selectedEdges, setSelectedEdges] = useState([])
    const editRef = useRef()
    const {accountData} = useContext(AccountContext);

    const onConnect = useCallback(
        (params) => {
            const connectEdge = async () => {
                const graphEndIndex = stateProcedure.indexOf("</graph>")
                const contentToAdd = `<edge source="${params.source}" target="${params.target}" />\n`
                setStateProcedure(stateProcedure.slice(0, graphEndIndex) + contentToAdd + stateProcedure.slice(graphEndIndex))
                if(!openToast) setOpenToast(true);
                if(!editRef.current) await new Promise((res) => setTimeout(res, 200))
                if(editRef.current.selectionStart !== graphEndIndex || editRef.current.selectionEnd !== graphEndIndex + contentToAdd.length) {
                    setTimeout(() => {
                        editRef.current.focus()
                        editRef.current.selectionStart = graphEndIndex
                        editRef.current.selectionEnd = graphEndIndex + contentToAdd.length
                    }, 10);
                }
                return addEdge({...params, type: "customEdge", label: ""}, edges)
            }
            connectEdge().then((e) => setEdges(e))
            
        },
        [edges],
    );

    const {mutate: updateProcedureWithJsonMutate, isLoading: updateProcedureWithJsonLoading} = useMutation(async ({prevNodes, prevEdges, edges, nodes, procedure, procedureId}) => {
        const resp = await fetch("http://134.209.37.239:3010/updateProcedureWithJson", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },

            body: JSON.stringify({procedure, id: procedureId, prevJSON: {nodes: prevNodes, edges: prevEdges}, newJSON: {nodes: nodes, edges: edges}})
        })
        const respJson = await resp.json()
        if(respJson.success) {
            alert("Procedure updated")
            return respJson
        }
        throw respJson.message
    }, { refetchOnWindowFocus: false, select: (data) => data.data });

    const {mutate: updateProcedureMutate, isLoading: updateProcedureLoading} = useMutation(async ({procedure, procedureId}) => {
        const resp = await fetch("http://134.209.37.239:3010/updateProcedure", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({procedure, id: procedureId})
        })
        const respJson = await resp.json()
        if(respJson.success) {
            setStateProcedure(respJson.data)
        }
        throw respJson.message
    }, { refetchOnWindowFocus: false, select: (data) => data.data });

    useEffect(() => {
        if(stateProcedure){
            const parsedData = xmlParser.parse(stateProcedure)
            const graphData = parsedData.graph || parsedData.procedure?.graph || parsedData.commandBlock?.graph || parsedData.commandBlock?.command?.graph
            const edgeData = graphData?.edge?.edge || graphData?.edge
            const sourceNodeCount = {}
            const targetNodeCount = {}
            const edges = []
            const handleEdgeInclude = (e, i) => {
                if(sourceNodeCount[e["@_source"]]) sourceNodeCount[e["@_source"]]++
                else sourceNodeCount[e["@_source"]] = 1
    
                if(targetNodeCount[e["@_target"]]) targetNodeCount[e["@_target"]]++
                else targetNodeCount[e["@_target"]] = 1
    
                edges.push({id: i, type: "customEdge", source: e["@_source"], sourceHandle: `${sourceNodeCount[e["@_source"]] - 1}`, target: e["@_target"], targetHandle: `${targetNodeCount[e["@_target"]] - 1}`, label: e?.edgeLogic?.condition?.returnValue || e?.edgeLogic?.condition?.returnValueLogic || ""})
            }
            if(Array.isArray(edgeData)){
                for(let i = 0; i < edgeData?.length; i++){
                    const e = edgeData[i]
                    if(typeof e !== "object") continue
                    handleEdgeInclude(e, i)
                }
            } else if (typeof edgeData === "object") {
                handleEdgeInclude(edgeData, 0)
            }
            const nodes = graphData?.node?.map((n, i) => {
                return {id: n["@_id"], type: "customNode", position: {x: 100 * (i % 2 === 0 ? -1 : 1), y: i * 100}, data: {label: n["#text"] || n["@_id"], sourceHandleCount: sourceNodeCount[n["@_id"]] ?? 1, targetHandleCount: targetNodeCount[n["@_id"]] ?? 1}}
            })
            setNodes([])
            setEdges([])
            setTimeout(() => {
                setNodes(nodes ?? [])
                setEdges(edges ?? [])
            }, 0);
            setPrevNodes(nodes ?? [])
            setPrevEdges(edges ?? [])
        }
    }, [stateProcedure])

    useEffect(() => {
        const webSocket = new WebSocket("ws://134.209.37.239:3010")
        setWebSocket(webSocket);
        webSocket.onmessage = (event) => {
            try {
                const jsonData = JSON.parse(event.data)
                if(jsonData.event === "chatWithProcedureMessage") {
                    setChatData(prev => [...prev, jsonData.data])
                    if(jsonData.isEnd) setChatLoading(false)
                }
                if(jsonData.event === "chatWithProcedureLog") {
                    setChatLogs(prev => [...prev, jsonData.data])
                }
                if(jsonData.event === "chatWithProcedureError") {
                    alert(jsonData.message)
                    setChatLoading(false)
                }
            } catch (e) {
                console.log(e)
            }
        };
    }, [refreshWebSocket])

    const handleNodeChange = async (val) => {
        if(val.length === 1 && (val[0].type === "select" || val[0].type === "position")){
            const nodeId = val[0].id

            if(!openToast) setOpenToast(true);
            if(!editRef.current) await new Promise((res) => setTimeout(res, 200))
            const node = nodes.find((node) => node.id === nodeId)
            if(node) {
                const nodeName = node.data.label
                const nodeIndexDoubleQuotes = editRef.current.value.indexOf(`<node id="${nodeId}"`)
                const nodeIndexSingleQuotes = editRef.current.value.indexOf(`<node id='${nodeId}'`)
                const nodeIndex = nodeIndexDoubleQuotes >= 0 ? nodeIndexDoubleQuotes : nodeIndexSingleQuotes
                const editIndex = editRef.current.value.slice(nodeIndex).indexOf(nodeName)
                editRef.current.focus()
                editRef.current.selectionStart = nodeIndex + editIndex
                editRef.current.selectionEnd = nodeIndex + editIndex + nodeName.length
            }
        }
        onNodesChange(val)
    }

    const handleEdgeChange = async (val) => {
        console.log(val)
        let filteredVal = val
        if(filteredVal.length > 1) filteredVal = filteredVal.filter((v) => v.selected || (selectedEdges.length > 0 && selectedEdges[0].id !== v[0].id))
        if(filteredVal.length === 1 && (filteredVal[0].type === "select" || filteredVal[0].type === "position")){
            setSelectedEdges(filteredVal[0])
            const edgeId = filteredVal[0].id
            if(!openToast) setOpenToast(true);
            if(!editRef.current) await new Promise((res) => setTimeout(res, 200))
            const edge = edges.find((edge) => edge.id === edgeId)
            if(edge) {
                const edgeName = edge.label
                const edgeSource = edge.source
                const edgeTarget = edge.target
                const edgeDoubleQuotes = `<edge source="${edgeSource}" target="${edgeTarget}"`
                const edgeSingleQuotes = `<edge source='${edgeSource}' target='${edgeTarget}'`
                const edgeIndexDoubleQuotes = editRef.current.value.indexOf(edgeDoubleQuotes)
                const edgeIndexSingleQuotes = editRef.current.value.indexOf(edgeSingleQuotes)
                const edgeIndex = edgeIndexDoubleQuotes >= 0 ? edgeIndexDoubleQuotes : edgeIndexSingleQuotes
                const editIndex = editRef.current.value.slice(edgeIndex).indexOf(edgeName)
                editRef.current.focus()
                editRef.current.selectionStart = edgeIndex + editIndex
                editRef.current.selectionEnd = edgeIndex + editIndex + edgeName.length
                if(editRef.current.selectionEnd === editRef.current.selectionStart) editRef.current.selectionEnd += edgeDoubleQuotes.length
            }
        } else if(filteredVal.length === 1 && filteredVal[0].type === "remove"){
            if(!openToast) setOpenToast(true);
            if(!editRef.current) await new Promise((res) => setTimeout(res, 200))
            const edgeId = filteredVal[0].id
            const edge = edges.find((edge) => edge.id === edgeId)
            if(edge) {
                const edgeSource = edge.source
                const edgeTarget = edge.target
                const edgeStartIndexDoubleQuotes = editRef.current.value.indexOf(`<edge source="${edgeSource}" target="${edgeTarget}"`)
                const edgeStartIndexSingleQuotes = editRef.current.value.indexOf(`<edge source='${edgeSource}' target='${edgeTarget}'`)
                const edgeStartIndex = edgeStartIndexDoubleQuotes >= 0 ? edgeStartIndexDoubleQuotes : edgeStartIndexSingleQuotes
                const edgeEnd = `</edge>`
                const edgeEndIndex = editRef.current.value.slice(edgeStartIndex).indexOf(edgeEnd)
                setStateProcedure(stateProcedure.slice(0, edgeStartIndex) + stateProcedure.slice(edgeStartIndex + edgeEndIndex + edgeEnd.length))
                setTimeout(() => {
                    editRef.current.focus()
                    editRef.current.selectionStart = edgeStartIndex
                    editRef.current.selectionEnd = edgeStartIndex
                }, 10);
            }
        }
        onEdgesChange(val)
    }

    const toggleToast = () => setOpenToast((prev) => !prev);

    return <>
        <div>
            <h3>Description:</h3>
            <p>{description}</p>
        </div>
        <div>
            <h3>Procedure:</h3>
            <textarea style={{width: "100%"}} rows="10" type="text" value={stateProcedure} onChange={(e) => setStateProcedure(e.target.value)} />
            <Btn
                title="Update Procedure"
                className="align-items-center btn-theme add-button"
                loading={updateProcedureLoading}
                onClick={() => updateProcedureMutate({procedure: stateProcedure, procedureId})}
            />
        </div>
        <div style={{marginBottom: "10px"}}>
            <h3>Chat With Procedure:</h3>
            <div style={{display: "flex", gap: 10, justifyContent: "space-around", alignItems: "center"}}>
                <textarea style={{flex: 2}} placeholder='User Message' rows={5}  value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
                <textarea style={{flex: 2}} placeholder='Prompt' rows={5}  value={prompt} onChange={(e) => setPrompt(e.target.value)} />
                <Btn
                    title="Chat With Procedure"
                    className="align-items-center btn-theme add-button"
                    loading={chatLoading}
                    onClick={() => {
                        if(webSocket.readyState === webSocket.CLOSED) {
                            setRefreshWebSocket(prev => prev ? 0 : 1)
                            alert("Error occured. Please try again")
                            return
                        }
                        webSocket.send(JSON.stringify({event: "chatWithProcedure", data: {procedure: `${description}\n${stateProcedure}`, message: chatMessage, prompt, userId: accountData.id}}))
                        setChatLoading(true)
                        setChatData([])
                        setChatLogs([])
                    }}
                />
            </div>
            {chatLogs.length > 0 && <div>
                <h3>Logs: </h3>
                {chatLogs.map((chatLog, i) => <p key={i}>{chatLog}</p>)}
            </div>}
           {chatData.length > 0 && <div>
                <h3>Response: </h3>
                <p>{chatData.map((data, i) => <p key={i}>{data}</p>)}</p>
            </div>}
        </div>
        <div style={{ width, height, display: "flex", justifyContent: "space-between", gap: 10 }}>
            <ReactFlow style={{}} nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} onNodesChange={handleNodeChange} onEdgesChange={handleEdgeChange} onConnect={onConnect} fitView >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
            <Toast style={{width: "500px"}} isOpen={openToast}>
                <ToastHeader close={<div style={{cursor:"pointer"}} onClick={toggleToast}>
                    {MdClose()}
                </div>} toggle={toggleToast}>Edit</ToastHeader>
                <ToastBody>
                    <textarea ref={editRef} rows="20" style={{"width": "100%"}} type="text" value={stateProcedure} onChange={(e) => setStateProcedure(e.target.value)} />
                </ToastBody>
            </Toast>
        </div>
        <div style={{display:"flex", gap: 5, marginBottom: "20px", marginTop: "20px"}}>
            <Btn
                title="Add New Node"
                className="align-items-center btn-theme add-button"
                onClick={() => {
                    setNodes(prev => {
                        const i = prev.length
                        return [...prev, {id: Math.random().toString(16).slice(2), type: "customNode", position: {x: 50 * i * (i % 2 === 0 ? -1 : 1), y: i * 100}, data: {label: "New Node", sourceHandleCount: 1, targetHandleCount: 1}}]
                    });
                }}
            />
            <Btn
                title="Save Changes"
                className="align-items-center"
                loading={updateProcedureWithJsonLoading}
                onClick={() => updateProcedureMutate({procedure, procedureId})}
            />
        </div>
    </> 
}

export default ReactFlowChart