import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data }) => {
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
            {data.label}
        </div>
        {Array(data.sourceHandleCount).fill(0).map((_, i) => <Handle
            type="source"
            position={sourcePositions[i % 4]}
            id={`${i}`}
        />)}
        </div>
    );
});