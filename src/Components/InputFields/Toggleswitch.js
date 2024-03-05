import React, { Component } from 'react';

const ToggleSwitch = ({ label, checked, onToggle }) => {
    return (
        <div className="toggle-switch">
            <input
                type="checkbox"
                className="toggle-switch-checkbox"
                name={label}
                id={label}
                checked={checked}
                onChange={e => onToggle(e.target.checked)}
            />
            <label className="toggle-switch-label" htmlFor={label}>
                <span className="toggle-switch-inner" />
                <span className="toggle-switch-switch" />
            </label>
        </div>
    );
}

export default ToggleSwitch;