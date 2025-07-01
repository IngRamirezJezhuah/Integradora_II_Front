import React, { useState } from 'react'

const OpcionesPaciente = ({buttonLabels =["Paciente Alta", "Paciente Baja"]}) => {
    const [activeButton,setActiveButton]= useState(buttonLabels[0]);
    //fa para fast arrow
    const handleBUttonClick = (label) => {
        setActiveButton(label);
    };

    return (
        <div className='filter-bar'>
            <div className='filter-buttons'>
                {buttonLabels.map((label, index) => (
                    <button
                    key={index}
                    className={`filter-button ${activeButton === label ? 'active' : ''}`}
                    onClick={() => handleBUttonClick(label)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div>
                {activeButton === buttonLabels[0] ? (
                    <p className='texto'>Dar de alta a un paciente</p>
                    
                ) : (
                    <p className='texto'>Dar de baja a un paciente</p>
                )}
            </div>
        </div>
    )
}

export default OpcionesPaciente