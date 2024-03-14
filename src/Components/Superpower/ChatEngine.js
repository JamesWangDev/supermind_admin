import { useState, useEffect } from 'react'

const ChatEngine = ({ partitions, currentPartition }) => {
    const [query, setQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const [partitionStatus, setPartitionStatus] = useState('invalid')

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
            if (data.answer.length > 1) {
                newResults.push(data.answer)
            } else {
                newResults.push(data.answer)
            }
            console.log(`To answer the following question: ${query}\nThe following context was sent to the LLM:\n${data.context}`)
            setQueryResults(newResults)
        })
    }

    return (
        <>
            <div>{`Chatting about ${currentPartition}`}</div>
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
        </>
    )
}

export default ChatEngine