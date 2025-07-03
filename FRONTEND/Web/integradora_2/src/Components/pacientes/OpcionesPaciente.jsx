import React, { useState } from 'react'
import PacientesAlta from './PacientesAlta';
import DetallesPacienteAlta from './DetallesPacienteAlta';

const OpcionesPaciente = ({buttonLabels =["Paciente Alta", "Paciente Baja"]}) => {
    const [activeButton,setActiveButton]= useState(buttonLabels[0]);
    //fa para fast arrow
    const handleBUttonClick = (label) => {
        setActiveButton(label);
    };

    return (
        <div>
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
            </div>
                <div>
                    {activeButton === buttonLabels[0] ? (
                        <div className='margen'>
                            <div className='scale-up-ver-center'>
                                <PacientesAlta />
                                    
                            </div>
                            <div className='scale-up-ver-center'>    
                                <DetallesPacienteAlta/>
                            </div>
                        </div>
                    
                    ) : (
                        <p className='texto'>Dar de baja a un paciente</p>
                    )}
                </div>
        </div>
    )
}

export default OpcionesPaciente