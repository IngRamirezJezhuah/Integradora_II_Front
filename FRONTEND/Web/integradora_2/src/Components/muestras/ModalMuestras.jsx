import React, { useState } from 'react';
import PacientesAlta from '../pacientes/PacientesAlta';
import DetallesPacienteAlta from '../pacientes/DetallesPacienteAlta';
import AgregarMuestra from './AgregarMuestra';

const ModalMuestras = ({ onClose }) => {

  /*const [formData, setFormData] = useState({
    pedido: '',
    tipoMuestra: 'Sangre',
    paciente: '',
    resultados: ''
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
    };*/

    const [pasoActual, setPasoActual] = useState(1);
    const [, setTipoMuestrasSeleccionada] = useState(null);
    const [, setPacienteSeleccionado] = useState(null);

    const avanzarPaso = () => setPasoActual(prev => prev +1);
    const retrocederPaso = () => setPasoActual(prev => prev -1);


  return (
    <div className='modal-overlay'>
      <div className='scale-in-hor-center'>
        <div className='modal-content'>
          <p className='titulo'>Registrar nueva muestra </p>
          <button className='close-btn' onClick={onClose}>X</button>
          {pasoActual ===1 &&(
            <div>
              <p>Seleccione el paciente:</p>
              <PacientesAlta/>
              <button className='btn' onClick={paciente => {
                setPacienteSeleccionado (paciente);
                avanzarPaso();
              }}>Siguiente</button>
            </div>
          )}
          {pasoActual === 2 &&(
            <div>
              <p>Selecione el tipo de muestra:</p>
              <DetallesPacienteAlta />
              <button className='btn'
              tipos={["Biometria Hepatica", "Pruebas de sangre"]}
              onClick={tipo => {
                setTipoMuestrasSeleccionada(tipo);
                avanzarPaso();
              }}> Siguiente</button>
              <button className='btn' onClick={retrocederPaso}>Regresar</button>
            </div>
          )}
          {pasoActual === 3 &&(
            <div>
              <AgregarMuestra />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalMuestras;


/*
<h2>Registrar Nueva Muestra</h2>
          <button className="close-btn" onClick={onClose}>X</button>
          
          <div className="form-section">
            <h3>Tipo de Prueba</h3>
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
            <form onSubmit={handleSubmit}>
              {error && <p className='error-msg'>{error}</p>}
              <label>Pedido</label>
              <input
                type="text"
                name="pedido"
                className="input-field"
                placeholder="P1285"
                value={formData.pedido}
                onChange={handleChange}
              />
              
              <label>
                  Tipo Muestra:{''}
                  <select name='tipoMuestra' value={formData.tipoMuestra} onChange={handleChange}>
                      <option value="">Selecciona una opción</option>
                      <option value="BiometriaHepatica">Biometria hepatica</option>
                      <option value="PruebaSangre">Prueba Sangre</option>
                  </select>
              </label>
              
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
                onChange={handleChange}
              />
              
              <div className="form-actions">
                <button type="submit" className="btn">Registrar</button>
              </div>
            </form>
*/