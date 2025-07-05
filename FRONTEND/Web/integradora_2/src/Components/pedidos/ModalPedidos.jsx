//import React, { useState } from 'react'
//import { Link } from 'react-router-dom';

const ModalPedidos = ({onClose}) => {
    /*
    const [selectedTest, setSelectedTest] = useState('');
    const [formData, setFormData] = useState({
        pedido: '',
        tipoMuestra: 'Sangre',
        paciente: '',
        resultados: ''
    });

    const handleTestChange = (test) => {
        setSelectedTest(test);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { selectedTest, ...formData });
        // Aquí puedes agregar la lógica para enviar los datos
    };*/



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
/*    
<div className="container">
<div className="form-section">
    <h2>Pruebas</h2>
    <div className="test-options">
    <div
        className={`test-option ${selectedTest === 'Quimica Sanguinea' ? 'selected' : ''}`}
        onClick={() => handleTestChange('Quimica Sanguinea')}
    >
        <img src="/prueba-de-sangre.png" alt="Quimica Sanguinea" className='imagen-prueba' />
        <span>Quimica Sanguinea</span>
    </div>
    <div
        className={`test-option ${selectedTest === 'Biometria Hematica' ? 'selected' : ''}`}
        onClick={() => handleTestChange('Biometria Hematica')}
    >
        <img src='/quimica.png' alt="Biometria Hematica" className='imagen-prueba'/>
        <span>Biometria Hematica</span>
    </div>
    </div>
</div>
<div className='Form-section-a'>
    
<form className="form" onSubmit={handleSubmit}>
    <label>Pedido</label>
    <input
        type="text"
        name="pedido"
        className="input-field"
        value={formData.pedido}
        onChange={handleInputChange}
        placeholder="P1285"
        />
    <label>Tipo de muestra</label>
    <input
        type="text"
        name="tipoMuestra"
        className="input-field"
        value={formData.tipoMuestra}
        onChange={handleInputChange}
        placeholder="Sangre"
        />
    <label>Paciente (id)</label>
    <input
        className="input-field"
        type="text"
        name="paciente"
        value={formData.paciente}
        onChange={handleInputChange}
        placeholder="Ej. P123"
    />
    <label>Resultados</label>
    <input
        className="input-field"
        type="file"
        name="resultados"
        value={formData.resultados}
        onChange={handleInputChange}
        placeholder="Ej. archivo.pdf"
    />
    <div className="form-actions">
    <button type="submit" className="btn">Registrar</button>
    <button type="button" className="btn">Cancelar</button>
    <Link to="/Pacientes">
        <button className='btn'>Regresar</button>
    </Link>
    </div>
</form>
</div>
</div>
    */