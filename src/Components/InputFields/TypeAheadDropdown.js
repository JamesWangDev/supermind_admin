import React, { useState } from 'react';

const TypeAheadDropDown = ({ items, message, onChange, partitionName }) => {
    const [showSuggestions, setShowSuggestions] = useState(false)

    const onTextChange = (e) => {
        e.preventDefault()
        const value = e.target.value;
        if (value.length > 0) {
            onChange(value)
        } else {
            onChange(value)
        }
    }
    
    const renderSuggestions = () => {
        if (items.length === 0) {
            return null;
        }

        return (
            <ul>
                {items.map(suggestion => <li key={suggestion} onClick={()=> onChange(suggestion)}>{suggestion}</li>)}
            </ul>
        )
    }
    
    
    return (
        <div className="TypeAheadDropDown">
            <input 
                onChange={e => onTextChange(e)} 
                placeholder={message}
                value={partitionName} 
                type="text" 
                onClick={() => setShowSuggestions(!showSuggestions)}
            />
            {showSuggestions && renderSuggestions()}
        </div>
    );
}

export default TypeAheadDropDown;