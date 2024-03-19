import React from 'react'

const KnowledgeSummaryPage = ({ summary, setAppState }) => {
    return (
        <>
            {summary.length > 0 ? <div>{summary}</div> : <div>Loading...</div>}
            {summary.length > 0 && <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <button onClick={() => setAppState('upload')}>Upload More Content</button>
                <button onClick={() => setAppState('chat')}>Chat!</button>
            </div>}
        </>
    )
}

export default KnowledgeSummaryPage