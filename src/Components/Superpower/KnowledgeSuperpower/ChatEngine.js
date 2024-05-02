import { useState, useEffect } from 'react'
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from "reactstrap"

const ChatEngine = ({ partitions, currentPartition }) => {
    const [query, setQuery] = useState('')
    const [queryResults, setQueryResults] = useState([])
    const [partitionStatus, setPartitionStatus] = useState('invalid')
    const [referenceDocuments, setReferenceDocuments] = useState([])
    const [componentState, setComponentState] = useState('chat')
    const [maxContextLength, setMaxContextLength] = useState(512)
    const [topKResults, setTopKResults] = useState(3)
    const [showDropdown, setShowDropdown] = useState(false)

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
                    'partition_names': [currentPartition],
                    'max_context_tokens': maxContextLength,
                    'top_k': topKResults
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
                <div style={{ marginTop: '16px' }}>
                    <div>Select the number of results you'd like to return for Context:</div>
                    <Dropdown isOpen={showDropdown} toggle={() => setShowDropdown(prev => !prev)}>
                        <DropdownToggle
                            caret
                            variant="dark"
                            className="dropdown-toggle-chat"
                            type="button"
                            size="sm"
                        >
                            {topKResults}
                        <DropdownMenu className="dropdown-menu-end sm-dropdown-menu w-100">
                            {[1, 2, 3, 4, 5].map((item, index) => (
                                <DropdownItem
                                    id={`${item}${index}-1`}
                                    key={`${item}${index}-1`}
                                    onClick={() => {
                                        setTopKResults(item)
                                        setShowDropdown(false)
                                    }}
                                >
                                    {item}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                        </DropdownToggle>
                    </Dropdown>
                </div>
                <div style={{ marginTop: '16px' }}>
                    <div>Enter max context length:</div>
                    <input type="number" value={maxContextLength} onChange={e => setMaxContextLength(e.target.value)}/>
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
                {referenceDocuments?.length > 0 &&
                    <div>
                        <div style={{ marginBottom: '24px' }}>{`Showing context for query "${queryResults[queryResults.length - 2]}"`}</div>
                        {referenceDocuments.map((doc, index) => (
                            <div key={`doc${index}}`} style={{ border: '1px solid gray' }}>
                                <div style={{ margin: '24px 0px 6px 0px' }}>{`The following data was returned from document titled ${doc.source}, with a cosine similarity score of ${doc?.score}`}</div>
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