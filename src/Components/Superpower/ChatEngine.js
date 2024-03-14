import { useState, useEffect } from 'react'

const ChatEngine = ({ partitions, currentPartition }) => {
    const [query, setQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const [partitionStatus, setPartitionStatus] = useState('invalid')
    const [referenceDocuments, setReferenceDocuments] = useState([])
    const [componentState, setComponentState] = useState('chat')

    useEffect(() => {
        partitions.map(p => p.partition_name).filter(name => name === currentPartition).length > 0 
            ? setPartitionStatus('valid') 
            : setPartitionStatus('invalid')
    }, [currentPartition])

    const handleQueryInput = (e) => {
        const textQuery = e.currentTarget.value
        setQuery(textQuery)
    }

    const queryChatEngine = () => {
        const newResults = [...queryResults, query]
        try {
            fetch("https://sea-turtle-app-qcwo5.ondigitalocean.app/chat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'query': query,
                    'partition_names': [currentPartition]
                })
            })
            .then(res => res.json())
            .then(data => {
                setQueryResults([...newResults, data.answer])
                setReferenceDocuments(data.documents)
            })
        } catch (error) {
            alert("Error while fetching from API!")
            setQueryResults(prevResults => [...prevResults, "Fetch Error..."])
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '46px' }}>
                <div
                    onClick={() => setComponentState('chat')}
                    style={{ color: componentState === 'chat' ? 'lightgray' : 'black', cursor: 'pointer' }}
                >Chat</div>
                <div 
                    onClick={() => setComponentState('context')}
                    style={{ color: componentState === 'context' ? 'lightgray' : 'black', cursor: 'pointer' }}
                >View Context</div>
            </div>
            {componentState === 'chat' &&
            <div>
                <div>{`You are currently chatting about ${currentPartition}`}</div>
                <div className="mt-3">
                    <label className="block text-base mb-2">Enter a query.</label>
                    <div className="mt-3 flex">
                        <input placeholder="Enter query" value={query} onChange={e => handleQueryInput(e)} />
                    </div>
                </div>
                {partitionStatus === 'valid' && <button className="mt-3" onClick={queryChatEngine}>Chat</button>}
                {queryResults.length > 0 && 
                    <div>
                        <div>Results:</div>
                        <div>
                            {queryResults.map((text, i) => {
                                return (
                                    <div key={i}>{text}</div>
                                )
                            })}
                        </div>
                    </div>
                }
            </div>}
            {componentState === 'context' &&
            <div>
                {referenceDocuments.length > 0 &&
                    <div>
                        <div style={{ marginBottom: '24px' }}>{`Showing context for query "${queryResults[queryResults.length - 2]}"`}</div>
                        {referenceDocuments.map(doc => (
                            <div key={doc.id} style={{ border: '1px solid gray' }}>
                                <div style={{ margin: '24px 0px 6px 0px' }}>{`The following data was returned from document titled ${doc.metadata.document_name}, with a cosine similarity score of ${doc.score}`}</div>
                                <div>{`"${doc.text}"`}</div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            }
        </>
    )
}

export default ChatEngine