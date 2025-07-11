import { useState } from 'react'
import Swal from 'sweetalert2'

const ModalAnalisis = ({onClose}) => {
    const [formData, setFormData]= useState({
        tipoPrueba:'',
        costo: '',
        diasEspera: '',
        descripcion: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData, [name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.tipoPrueba || !formData.costo || !formData.diasEspera || !formData.descripcion) {
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
        <div className='modal-overlay'>
            <div className='scale-in-hor-center'>
                <div className='modal-content'>
                    <h2>Registrar Analisis</h2>
                    <button className='close-btn' onClick={onClose}>X</button>
                    <form onSubmit={handleSubmit}>
                        {error && <p className="error-msg">{error}</p>}
                        <label>
                            TipoPrueba:{''}
                            <select name='tipoPrueba' value={formData.tipoPrueba} onChange={handleChange}>
                                <option value="">Selecciona una opción</option>
                                <option value="BiometriaHepatica">Biometria hepatica</option>
                                <option value="PruebaSangre">Prueba Sangre</option>
                            </select>
                        </label>
                        <label>Costo</label>
                        <input
                            type="text"
                            name="costo"
                            className="input-field"
                            placeholder="350$"
                            value={formData.costo}
                            onChange={handleChange}
                        />
                        <label>Dias de espera</label>
                        <input
                            type="text"
                            name="diasEspera"
                            className="input-field"
                            placeholder="2"
                            value={formData.diasEspera}
                            onChange={handleChange}
                        />
                        <label>Descripcion</label>
                        <input
                            type="text"
                            name="descripcion"
                            className="input-field textarea"
                            placeholder="muestras de biometria del paciente"
                            value={formData.descripcion}
                            onChange={handleChange}
                        />
                        <button type='sumbit'>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalAnalisis