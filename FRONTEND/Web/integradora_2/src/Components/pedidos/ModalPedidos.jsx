//import React, { useState } from 'react'
//import { Link } from 'react-router-dom';

const ModalPedidos = ({onClose}) => {


    return (
        <div className='modal-overlay'>
            <div className='scale-in-hor-center'>
                <div className='modal-content'>
                    <h2>registrar nuevo pedido</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                    <form action="">
                        <label>Pedido</label>
                        <input
                            type="text"
                            name="pedido"
                            className="input-field"
                            
                            placeholder="P1285"
                            />
                        <label>Tipo de muestra</label>
                        <input
                            type="text"
                            name="tipoMuestra"
                            className="input-field"
                            value=""
                            placeholder="Sangre"
                            />
                        <label>Paciente (id)</label>
                        <input
                            className="input-field"
                            type="text"
                            name="paciente"
                            value=""
                            placeholder="Ej. P123"
                        />
                        <label>Resultados</label>
                        <input
                            className="input-field"
                            type="file"
                            name="resultados"
                            value=""
                        />
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default ModalPedidos
