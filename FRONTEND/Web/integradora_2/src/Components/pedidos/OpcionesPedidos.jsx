import React, { useState } from 'react'

const OpcionesPedidos = ({ buttonLabels = ['En proceso', 'Completadas', 'Canceladas'] }) => {
    const [activeButton, setActiveButton] = useState(buttonLabels[0]);

    const handleButtonClick = (label) => {
        setActiveButton(label);
    };

    return (
        <div className="filter-bar">
        <div className="filter-buttons">
            {buttonLabels.map((label, index) => (
            
            <button
                key={index}
                className={`filter-button ${activeButton === label ? 'active' : ''}`}
                onClick={() => handleButtonClick(label)}
            >
                {label}
            </button>
            
            ))}
        </div>
        </div>
    );
};

export default OpcionesPedidos