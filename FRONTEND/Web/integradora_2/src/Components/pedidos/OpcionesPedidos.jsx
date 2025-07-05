import React, { useState } from 'react'
import EnProcesoPedidos from './EnProcesoPedidos';


const OpcionesPedidos = ({ buttonLabels = ['En proceso', 'Completadas', 'Canceladas'] }) => {
    const [activeButton, setActiveButton] = useState(buttonLabels[0]);

    const handleButtonClick = (label) => {
        setActiveButton(label);
    };

    return (
        <div>
            <div className="filter-bar">
                <div className="filter-buttons">
                    {buttonLabels.map((label, index) => (
                    
                    <button
                        key={index}
                        className={`filter-button ${activeButton === label ? 'active' : ''}`}
                        onClick={() => handleButtonClick(label)}>
                        {label}
                    </button>
                    ))}
                </div>
            </div>
                <div>
                    {activeButton === buttonLabels[0] ? (
                        <div className='margen'>
                            <div className='scale-up-ver-center'>
                                <EnProcesoPedidos/>
                            </div>
                        </div>
                    ) : activeButton === buttonLabels[1] ? (
                        <div>
                            <p className='texto'>Pedidos completados</p>
                            <div className='margen'>
                                <div className='scale-up-ver-center'>
                                    <EnProcesoPedidos/>
                                </div>
                            </div>
                        </div>
                    ) : activeButton === buttonLabels[2] ? (
                        <p className='texto'>Pedido cancelado</p>
                    ) : null}
                </div>
        </div>
    );
};

export default OpcionesPedidos