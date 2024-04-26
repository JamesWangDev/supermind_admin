import React, { memo, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { CloseButton } from 'reactstrap';

export default memo(({ data, id }) => {
    const [labelState, setLabelState] = useState(data.label ?? "")
    const {setNodes} = useReactFlow()
    const targetPositions = [Position.Top, Position.Left, Position.Bottom, Position.Right]
    const sourcePositions = [Position.Bottom, Position.Right, Position.Top, Position.Left]
    return (
        <div style={{border: "1px solid black", padding: 5, borderRadius: 5}}>
        {Array(data.targetHandleCount).fill(0).map((_, i) => <Handle
            type="target"
            position={targetPositions[i % 4]}
            id={`${i}`}
        />)}
        <div>
            <input style={{border: "0px"}} size={labelState.length + 1} value={labelState} onChange={(e) => {
                const val = e.target.value
                setLabelState(val)
                setNodes(prev => {
                    const tempNodes = [...prev]
                    const index = tempNodes.findIndex((tempNode) => tempNode.id === id)
                    if(index < 0) return prev
                    tempNodes[index].data.label = val
                    return tempNodes
                })
            }} />
            <CloseButton style={{position: "absolute", top: -10, left: -10}} onClick={() => data.deleteNode(id)} />
        </div>
        {Array(data.sourceHandleCount).fill(0).map((_, i) => <Handle
            type="source"
            position={sourcePositions[i % 4]}
            id={`${i}`}
        />)}
        </div>
    );
});