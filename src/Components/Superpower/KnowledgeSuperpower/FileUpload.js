import { useEffect, useState, useContext } from 'react'
import TypeAheadDropDown from "../../InputFields/TypeAheadDropdown";
import ToggleSwitch from '../../InputFields/Toggleswitch';
import ChunkSizingSlider from '../../Product/ChunkSizingSlider';
import ShowModal from '@/Elements/Alerts&Modals/Modal';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Row,
  } from "reactstrap"
import Btn from "@/Elements/Buttons/Btn";

const FileUpload = ({ partitions, setAppState, setSummary, currentPartition, setCurrentPartition, updatePartitions }) => {
    const [isChecked, setIsChecked] = useState(true)
    const [isPublic, setIsPublic] = useState(false)
    const [partitionStatus, setPartitionStatus] = useState({ status: '', message: '' })
    const [partitionDocuments, setPartitionDocuments] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [apiResponseMessageObject, setApiResponseMessageObject] = useState({ message: '', type: '' })
    const [showDropdown, setShowDropdown] = useState(false)
    const [inputObject, setInputObject] = useState({
        file: '',
        content: '',
        description: '',
        chunkSize: 512,
        topK: 3,
        maxContextTokens: 512
    })
    let fileReader

    useEffect(() => {
        if (inputObject.file) {
            fileReader = new FileReader()
            fileReader.onloadend = handleFileRead
            fileReader.readAsText(inputObject.file)
        } 
    }, [inputObject.file])

    useEffect(() => {
        if (!isChecked && partitions.filter(((part) => part.partition_name === currentPartition)).length > 0) {
            setPartitionStatus({ status: 'alreadyExists', message: `A partition with the name ${name} already exists. Please enter a new name` })
        } else {
            setPartitionStatus({ status: 'validNewPartition', message: '' })
        }
    }, [isChecked])

    // Handler for updating input fields
    const handleChange = (event, key) => {
        const newInputObject = { ...inputObject, [key]: event.target.value }
        setInputObject(newInputObject)
    }

    const fetchPartitionDocuments = (matchingPartitions) => {
        if (matchingPartitions.length === 0) return
        const partitionId = matchingPartitions[0].partition_id
        fetch(`https://sea-turtle-app-qcwo5.ondigitalocean.app/documents/${partitionId}`)
            .then(res => res.json())
            .then(data => setPartitionDocuments(data))
    }

    const setPartitionName = name => {
        setCurrentPartition(name)
        const matchingPartitions = partitions.filter((n) => n.partition_name.toLowerCase() === name.toLowerCase())
        if (isChecked && matchingPartitions.length > 0) {
            const desc = matchingPartitions[0].partition_description
            const newInputObject = { ...inputObject, "description": desc }
            setInputObject(newInputObject)
            setPartitionStatus({ status: 'validExistingPartition', message: '' })
            fetchPartitionDocuments(matchingPartitions)
        } else if (isChecked && matchingPartitions.length === 0) {
            const newInputObject = { ...inputObject, "description": '' }
            setInputObject(newInputObject)
            setPartitionStatus({ status: 'invalidExistingName', message: 'Please choose a valid existing partition' })
        } else if (!isChecked && matchingPartitions.length > 0) {
            setPartitionStatus({ status: 'alreadyExists', message: `A partition with the name ${name} already exists. Please enter a new name` })
        } else (
            setPartitionStatus({ status: 'validNewPartition', message: '' })
        )
    }

    const handleFileRead = (e) => {
        const content = fileReader.result
        setInputObject({ ...inputObject, content })
    };

    const handleSliderMovement = (e) => {
        const newInputObject = { ...inputObject, "chunkSize": e.target.value }
        setInputObject(newInputObject)
    }

    // Handle uploading of the file
    const uploadFile = (e) => {
        e.preventDefault()
        let file = e.target.files[0];
        console.log({file})
        const newInputObject = { ...inputObject, "file": file }
        setInputObject(newInputObject)
    }

    const updatePartitionDatabase = () => {
        fetch('https://sea-turtle-app-qcwo5.ondigitalocean.app/partition', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "partition_name": currentPartition,
                'partition_description': inputObject.description,
                'partition_summary': 'The summary for this partition is currently unavailable',
                'is_public': isPublic,
                'created_by_user_id': 1,
                'top_k': inputObject.topK,
                'max_context_tokens': inputObject.maxContextTokens
            })
        })
        .then(res => res.json())
        .then(() => updatePartitions())
      }

    // Put request to /document with the partition name and content
    const putFile = async (inputObject) => {
        const url = "https://sea-turtle-app-qcwo5.ondigitalocean.app/document"
        const partitionName = `${currentPartition}:${inputObject.file.name}`
    
        setAppState("summary")
        const payload = {
            'content': inputObject.content,
            'partition_name': partitionName,
            'chunk_size': inputObject.chunkSize
        }
    
        try {
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then((data) => {
                if (!isChecked) {
                    updatePartitionDatabase()
                }
                setApiResponseMessageObject({
                    message:`Successfully uploaded file ${inputObject.file.name}`,
                    type: 'success'
                })
                setCurrentPartition(currentPartition)
                setSummary(data)
            })
        } catch (error) {
            setApiResponseMessageObject({
                message:`The following error occurred: ${error}`,
                type: 'error'
            })
        }
    }

    const deletePartition = () => {
        console.log({currentPartition})
        const partitionId = partitions.filter(n => n.partition_name === currentPartition)[0].partition_id
        console.log({partitionId})
        fetch(`https://sea-turtle-app-qcwo5.ondigitalocean.app/partition/${partitionId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(() => {
            updatePartitions()
            setShowDeleteModal(false)
            setCurrentPartition('')
            setPartitionStatus({ status: 'invalidExistingName', message: 'Please choose a valid existing partition' })
            setInputObject({
                file: '',
                content: '',
                description: '',
                chunkSize: 512,
                topK: 3,
                maxContextTokens: 512
            })
        })
    }


    return (
        <>
            <div style={{ display: 'flex' }}>
                {/* Checkbox to indicate if this is a new partition or not */}
                <div className="checkbox-wrapper">
                    <label>
                        <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
                        <span>{'Existing Partition'}</span>
                    </label>
                </div>
                <div style={{ display: 'block', width: '100%' }}>
                    {/* Component to select an old partition, or select a new one */}
                    <TypeAheadDropDown 
                        items={isChecked ? partitions.map(part => part.partition_name) : []} 
                        message={isChecked ? 'Select a partition' : 'Enter a new partition'} 
                        onChange={setPartitionName}
                    />
                    {/* Error message if New Partition is selected, but partition name already exists */}
                    {partitionStatus.message.length > 0 && <div>{partitionStatus.message}</div>}
                </div>
            </div>
            {/* Partition description. Is disabled if this is an existing partition */}
            {(!isChecked || inputObject.description.length > 0) && <Row>
                <label>Enter a description for your partition below</label>
                <textarea value={inputObject.description} disabled={isChecked} className="NewPartitionDescription" onChange={e => handleChange(e, "description")}/>
            </Row>}
            {/* A toggle to allow the user to make their partition public */}
            <div className="toggle-wrapper">
                <div style={{ paddingTop: '6px', marginRight: '10px' }}>Make Public?</div>
                <ToggleSwitch 
                    label="Make Public?" 
                    checked={isChecked && partitions.filter(part => part.partition_name === currentPartition).length > 0 
                                ? partitions.filter(part => part.partition_name === currentPartition)[0].is_public 
                                : isPublic
                            } 
                    disabled={isChecked}
                    onToggle={() => setIsPublic((prev) => !prev)}
                />
            </div>
            {/* Component for uploading a file */}
            <div className="file-upload-container">
                <div className="file-upload-input">
                    <label className="block text-base mb-2">Choose a file</label>
                    <div className="mt-3 flex">
                        <input 
                            type="file" 
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md" 
                            placeholder="Upload file" 
                            value={inputObject.password} 
                            onChange={ e => uploadFile(e)} 
                        />
                    </div>
                </div>
                <div className="partition-documents">
                    <div>Previously Uploaded Files:</div>
                    {partitionDocuments.length > 0 && <ul style={{ height: '100px', overflowY: 'scroll' }}>
                        {partitionDocuments.map((document, idx) => 
                            <li>{document.name}</li>
                        )}
                    </ul>}
                </div>
            </div>
            {/* Chunk slider component for determining chunk sizes */}
            <ChunkSizingSlider chunkSize={inputObject.chunkSize} handleSliderMovement={handleSliderMovement}/>
            {/* Inputs for Top K and Max Context Tokens */}
            <div>
                <div style={{ marginTop: '16px' }}>
                    <div>Select the default number of results you'd like to return for Context during chat:</div>
                    <Dropdown isOpen={showDropdown && !isChecked} toggle={() => !isChecked ? setShowDropdown(prev => !prev) : {}}>
                        <DropdownToggle
                            caret
                            variant="dark"
                            className="dropdown-toggle-chat"
                            type="button"
                            size="sm"
                        >
                            {inputObject.topK}
                        <DropdownMenu className="dropdown-menu-end sm-dropdown-menu w-100">
                            {[1, 2, 3, 4, 5].map((item, index) => (
                                <DropdownItem
                                    id={`${item}${index}-1`}
                                    key={`${item}${index}-1`}
                                    onClick={(e) => {
                                        setInputObject({ ...inputObject, 'topK': item })
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
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label>Enter default number of context tokens for chat:</label>
                    <input
                        disabled={isChecked} 
                        value={inputObject.maxContextTokens} 
                        style={{ width: '25%' }}
                        onChange={e => handleChange(e, 'maxContextTokens')}
                    />
                </div>
            </div>
            {/* Upload Button */}
            <div>
                <button 
                    disabled={
                        !currentPartition || 
                        !inputObject.file || 
                        !inputObject.file.name || 
                        (partitionStatus.status === 'invalidExistingName' || partitionStatus.status === 'alreadyExists')
                    }
                    className="mt-3"
                    onClick={() => putFile(inputObject)}
                >
                Upload
                </button>
                <button onClick={() => setShowDeleteModal(true)}>
                    Delete Partition
                </button>
            </div>
            {/* Display API Response */}
            {apiResponseMessageObject.message.length > 0 && <div>{apiResponseMessageObject.message}</div>}
            <ShowModal 
                title={"DeletePartition"} 
                open={showDeleteModal} 
                setModal={setShowDeleteModal}
                buttons={
                    <>
                        <Btn title="Cancel" onClick={() => setShowDeleteModal(false)} className="btn--no btn-md fw-bold" />
                        <Btn title="Delete" onClick={() => deletePartition()} className="btn-theme btn-md fw-bold"/>
                    </>
                }
            >
                <div>This will delete the current partition. Are you sure you want to proceed?</div>
            </ShowModal>
        </>
    )
}

export default FileUpload