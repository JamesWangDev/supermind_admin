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

const ReactFlowChart = ({procedure, name, width='75vw', height='100vh'}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])
    const [prevNodes, setPrevNodes] = useState([])
    const [prevEdges, setPrevEdges] = useState([])

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge({...params, type: "customEdge"}, eds)),
        [],
    );

    const {mutate: updateProcedureMutate, isLoading: updateProcedureLoading} = useMutation(async ({prevNodes, prevEdges, edges, nodes, procedure, name}) => {
        const resp = await fetch("http://134.209.37.239:3010/updateProcedure", {
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
            console.log(edges)
        }
    }, [procedure])

    return <div style={{ width, height }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView >
            <Controls />
            <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        <div style={{display:"flex", gap: 5, marginBottom: "10px"}}>
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
                loading={updateProcedureLoading}
                onClick={() => updateProcedureMutate({nodes, edges, prevEdges, prevNodes, procedure, name})}
            />
        </div>
  </div>
}

export default ReactFlowChart