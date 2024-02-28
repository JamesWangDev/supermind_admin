import { useEffect, useState } from 'react'

const FileUpload = () => {
    const [apiResponseMessageObject, setApiResponseMessageObject] = useState({ message: '', type: '' })
    const [inputObject, setInputObject] = useState({
        partitionName: '',
        file: '',
        content: '',
    })
    let fileReader

    useEffect(() => {
        if (inputObject.file) {
            fileReader = new FileReader()
            fileReader.onloadend = handleFileRead
            fileReader.readAsText(inputObject.file)
        } 
    }, [inputObject.file])

    // Handler for updating input fields
    const handleChange = (event, key) => {
        const newInputObject = { ...inputObject, [key]: event.target.value }
        setInputObject(newInputObject)
    }

    const handleFileRead = (e) => {
        const content = fileReader.result
        setInputObject({ ...inputObject, content })
      };

    // Handle uploading of the file
    const uploadFile = (e) => {
        e.preventDefault()
        let file = e.target.files[0];
        const newInputObject = { ...inputObject, "file": file }
        setInputObject(newInputObject)
    }

    // Put request to /document with the partition name and content
    const putFile = async (inputObject) => {
        const url = "https://supermind-n396.onrender.com/document"
        const partitionName = `${inputObject.partitionName}:${inputObject.file.name}`
    
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
            .then(() => {
                setApiResponseMessageObject({
                    message:`Successfully uploaded file ${inputObject.file.name}`,
                    type: 'success'
                })
            })
        } catch (error) {
            setApiResponseMessageObject({
                message:`The following error occurred: ${error}`,
                type: 'error'
            })
        }
    }

    return (
        <>
            <div className="mt-3">
                <label className="block text-base mb-2">Enter a partition name. Or choose one from the dropdown.</label>
                <input className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-md" placeholder="Enter name" value={inputObject.partitionName} onChange={e => handleChange(e, "partitionName")} />
            </div>
            <div className="mt-3">
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
            <button 
                disabled={!inputObject.partitionName.length || !inputObject.file || !inputObject.file.name}
                className="mt-3"
                onClick={() => putFile(inputObject)}
            >
            Upload
            </button>
            {apiResponseMessageObject.message.length > 0 && <div>{apiResponseMessageObject.message}</div>}
        </>
    )
}

export default FileUpload