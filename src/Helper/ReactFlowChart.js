import { useCallback, useEffect, useState } from 'react';
import ReactFlow, { Background, Controls, addEdge, useNodesState, useEdgesState } from 'reactflow';
import {XMLParser} from 'fast-xml-parser'
import CustomReactFlowNode from "@/Helper/CustomReactFlowNode";
import CustomReactFlowEdge from "@/Helper/CustomReactFlowEdge";
import Btn from '@/Elements/Buttons/Btn';
import 'reactflow/dist/style.css';
import { useMutation } from '@tanstack/react-query';

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix : "@_"
});

const nodeTypes = {
    customNode: CustomReactFlowNode,
};

const edgeTypes = {
    customEdge: CustomReactFlowEdge,
}

const ReactFlowChart = ({procedure, description, name, width='75vw', height='100vh'}) => {
    const [webSocket, setWebSocket] = useState(null)
    const [refreshWebSocket, setRefreshWebSocket] = useState(0)
    const [stateProceudre, setStateProceudre] = useState(procedure)
    const [chatMessage, setChatMessage] = useState("")
    const [prompt, setPrompt] = useState(`You are an action agent. You follow Procedures provided in turns like in Dungeons and Dragons. In each turn, you Issue 2 commands, the first will be as per the procedure, and the second will be a user message informing the user of your action.   You wil receive a response to commands and then follow the procedure logic to choose a new command to issue. Issue each command as a JSON package in the format Command: URL. DATA BLOCK: Key pairs as per procedure. The back end system will parse the text you output and send the DATA Block to the API targeted URL and then return the response in your next turn. DO NOT EXPLAIN ANYTHING OR SAY YOU CANNOT DO ANYTHING. Follow these instructions verbatim, **always** issues the command URL and DATA BLOCK. Do not issue any additional tokens.  For the user message you issues, always use the following URL "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4-f27a-48e9-a62f-a87722a0b5d4"  [Example Turn] Example Command: [{\n  "Command": "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4",\n  "DATA BLOCK": {\n    "start": 1,\n    "final_value": 20\n  }\n}] Example User Message [{\n  "Command": "https://n8n-production-9c96.up.railway.app/webhook/0669bfa4-f27a-48e9-a62f-a87722a0b5d4",\n  "DATA BLOCK": {\n    "user message": "I issued a command",\n}\n}]|You always ensure objects are output in an array, for example    For each command in commands:        Output JSON Array:            [            {                "Command": "<URL>",                "DATA BLOCK": "<data block>"            },            {                "Command": "<URL>",                "DATA BLOCK": "<data block>"            }            ]
    //never ouput "response" key value pairs
    //alway output in an array
    //<directive>when procedure is complete issue "@!@" as your last token</end directive>
    `)
    const [chatLoading, setChatLoading] = useState(false)
    const [chatData, setChatData] = useState([])
    const [chatLogs, setChatLogs] = useState([])
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [prevNodes, setPrevNodes] = useState([])
    const [prevEdges, setPrevEdges] = useState([])

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({...params, type: "customEdge"}, eds)),
        [],
    );

    const {mutate: updateProcedureWithJsonMutate, isLoading: updateProcedureWithJsonLoading} = useMutation(async ({prevNodes, prevEdges, edges, nodes, procedure, name}) => {
        const resp = await fetch("http://134.209.37.239:3010/updateProcedureWithJson", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },

            body: JSON.stringify({procedure, name, prevJSON: {nodes: prevNodes, edges: prevEdges}, newJSON: {nodes: nodes, edges: edges}})
        })
        const respJson = await resp.json()
        if(respJson.success) {
            alert("Procedure updated")
            return respJson
        }
        throw respJson.message
    }, { refetchOnWindowFocus: false, select: (data) => data.data });

    const {mutate: updateProcedureMutate, isLoading: updateProcedureLoading} = useMutation(async ({procedure, name}) => {
        const resp = await fetch("http://134.209.37.239:3010/updateProcedure", {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },

            body: JSON.stringify({procedure, name})
        })
        const respJson = await resp.json()
        if(respJson.success) {
            setStateProceudre(respJson.data)
        }
        throw respJson.message
    }, { refetchOnWindowFocus: false, select: (data) => data.data });

    useEffect(() => {
        if(procedure){
            const parsedData = xmlParser.parse(procedure)
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
    
                edges.push({id: i, type: "customEdge", source: e["@_source"], sourceHandle: `${sourceNodeCount[e["@_source"]] - 1}`, target: e["@_target"], targetHandle: `${targetNodeCount[e["@_target"]] - 1}`, label: e?.edgeLogic?.condition?.returnValue ?? ""})
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
                return {id: n["@_id"], type: "customNode", position: {x: 100 * (i % 2 === 0 ? -1 : 1), y: i * 100}, data: {label: n["#text"], sourceHandleCount: sourceNodeCount[n["@_id"]] ?? 1, targetHandleCount: targetNodeCount[n["@_id"]] ?? 1}}
            })
            setNodes(nodes ?? [])
            setEdges(edges ?? [])
            setPrevNodes(nodes ?? [])
            setPrevEdges(edges ?? [])
        }
    }, [procedure])

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
    

    return <>
        <div>
            <h3>Description:</h3>
            <p>{description}</p>
        </div>
        <div>
            <h3>Procedure:</h3>
            <textarea style={{width: "100%"}} rows="10" type="text" value={stateProceudre} onChange={(e) => setStateProceudre(e.target.value)} />
            <Btn
                title="Update Procedure"
                className="align-items-center btn-theme add-button"
                loading={updateProcedureLoading}
                onClick={() => updateProcedureMutate({procedure: stateProceudre, name})}
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
                        webSocket.send(JSON.stringify({event: "chatWithProcedure", data: {procedure, message: chatMessage, prompt}}))
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
           {chatData &&  <div>
                <h3>Response: </h3>
                <p>{chatData.map((data, i) => <p key={i}>{data}</p>)}</p>
            </div>}
        </div>
        <div style={{ width, height }}>
            <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView >
                <Controls />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
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
                onClick={() => updateProcedureWithJsonMutate({nodes, edges, prevEdges, prevNodes, procedure, name})}
            />
        </div>
    </> 
}

export default ReactFlowChart