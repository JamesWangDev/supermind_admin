import { useState } from 'react'

const ChatEngine = () => {
    const [query, setQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])

    const handleQueryInput = (e) => {
        const textQuery = e.currentTarget.value
        setQuery(textQuery)
    }

    const queryChatEngine = () => {
        const newResults = [...queryResults, query]
        fetch("https://supermind-n396.onrender.com/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'query': query,
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.length > 1) {
                newResults.push(data)
            } else {
                newResults.push(data)
            }
            setQueryResults(newResults)
            console.log({data})
        })
    }

    return (
        <>
            <div className="mt-3">
                <label className="block text-base mb-2">Enter a query.</label>
                <div className="mt-3 flex">
                    <input placeholder="Enter query" value={query} onChange={e => handleQueryInput(e)} />
                </div>
            </div>
            <button className="mt-3" onClick={queryChatEngine}>Chat</button>
            {queryResults.length > 0 && 
                <div>
                    <div>Results:</div>
                    <div>
                        {queryResults.map((text, i) => {
                            return (
                                <div>{text}</div>
                            )
                        })}
                    </div>
                </div>
            }
        </>
    )
}

export default ChatEngine