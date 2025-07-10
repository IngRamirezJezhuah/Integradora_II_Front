import React from 'react'
import Swal from "sweetalert2";
import { useState } from "react";

const FormsPedidos = ({onClose}) => {
    const [formData, setFormData]= useState({
            pedido:'',
            tipoMuestra: '',
            paciente: '',
            resultados: '',
        });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData, [name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.pedido || !formData.tipoMuestra || !formData.paciente) {
        setError('Por favor, completa todos los campos requeridos');
        } else {
        setError('');
        console.log('Datos enviados:', formData);
        await Swal.fire({
        title: "¡ Envidao Correctamente !",
        icon: "success",
        timer : 1500,
        showConfirmButton: false
        });
        onClose();
        }
    };

    return (
        <div >
            <div className='scale-in-hor-center'>
                <div >
                    <h2>registrar nuevo pedido</h2>
                    
                    <form onSubmit={handleSubmit}>
                        {error && <p className="error-msg">{error}</p>}
                        <label>Pedido</label>
                        <input
                            type="text"
                            name="pedido"
                            className="input-field"
                            placeholder="P1285"
                            value={formData.pedido}
                            onChange={handleChange}
                            />
                        <label>Tipo de muestra</label>
                        <input
                            type="text"
                            name="tipoMuestra"
                            className="input-field"
                            value={formData.tipoMuestra}
                            placeholder="Sangre"
                            onChange={handleChange}
                            />
                        <label>Paciente (nombre)</label>
                        <input
                            className="input-field"
                            type="text"
                            name="paciente"
                            placeholder="Ej. P123"
                            value={formData.paciente}
                            onChange={handleChange}
                        />
                        <label>Resultados</label>
                        <input
                            className="input-field"
                            type="file"
                            name="resultados"
                            value={formData.resultados}
                            onChange={handleChange}
                        />
                        <button type='sumbit'>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default FormsPedidos