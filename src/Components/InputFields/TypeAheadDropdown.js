import React, { useState, useEffect } from 'react';

const TypeAheadDropDown = ({ items, message, onChange }) => {
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [suggestions, setSuggestions] = useState(items)
    const [text, setText] = useState('')
    
    useEffect(() => {
        if (items.length) {
            const regex = new RegExp(`^${text}`, `i`);
            const newSuggestions = items.sort().filter(v => regex.test(v));
            setSuggestions(newSuggestions)
        }
    }, [items])

    useEffect(() => {
        setSuggestions(items)
    }, [message])

    const onTextChange = (e) => {
        const value = e.target.value;
        const regex = new RegExp(`^${value}`, `i`);
        const newSuggestions = items.sort().filter(v => regex.test(v));
        setText(value)
        setSuggestions(newSuggestions)
        onChange(value)
    }
    
    
    const renderSuggestions = () => {
        if (suggestions.length === 0) {
            return null;
        }

        return (
            <ul>
                {suggestions.map(suggestion => <li key={Math.random()} onClick={()=> {
                    setText(suggestion)
                    setShowSuggestions(false)
                    onChange(suggestion)
                }}>{suggestion}</li>)}
            </ul>
        )
    }
    
    
    return (
        <div className="TypeAheadDropDown">
            <input 
                onChange={e => onTextChange(e)} 
                placeholder={message}
                value={text} 
                type="text" 
                onClick={() => setShowSuggestions(!showSuggestions)}
            />
            {showSuggestions && renderSuggestions()}
        </div>
    );
}

export default TypeAheadDropDown;