import { useState } from 'react';
import {BaseEdge, EdgeLabelRenderer, getBezierPath, useReactFlow} from 'reactflow';
   
const CustomReactFlowEdge = ({ id, sourceX, sourceY, targetX, targetY, label }) => {
    const [labelState, setLabelState] = useState(label ?? "")
    const {setEdges} = useReactFlow()
    const [edgePath, labelX, labelY] = getBezierPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });

    return (
      <>
        <BaseEdge id={id} path={edgePath} />
        <EdgeLabelRenderer>
          <p
            style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            {<input style={{border: "0px"}} size={labelState.length + 1} value={labelState} onChange={(e) => {
                const val = e.target.value
                setLabelState(val)
                setEdges(prev => {
                    const tempEdges = [...prev]
                    const index = tempEdges.findIndex((tempEdge) => tempEdge.id === id)
                    if(index < 0) return prev
                    tempEdges[index].label = val
                    return tempEdges
                })
            }} />}
          </p>
        </EdgeLabelRenderer>
      </>
    );
}

export default CustomReactFlowEdge