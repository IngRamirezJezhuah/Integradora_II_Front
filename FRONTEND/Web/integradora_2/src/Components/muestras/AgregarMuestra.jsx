import React, { useState } from 'react';
//import chemistryIcon from './icons/chemistry.png';
//import bloodTestIcon from './icons/blood-test.png';

const AgregarMuestra = () => {
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
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2>Pruebas</h2>
        <div className="test-options">
          <div
            className={`test-option ${selectedTest === 'Quimica Sanguinea' ? 'selected' : ''}`}
            onClick={() => handleTestChange('Quimica Sanguinea')}
          >
            <img src="/chemistry.png" alt="Quimica Sanguinea" />
            <span>Quimica Sanguinea</span>
          </div>
          <div
            className={`test-option ${selectedTest === 'Biometria Hematica' ? 'selected' : ''}`}
            onClick={() => handleTestChange('Biometria Hematica')}
          >
            <img src='/blood-test.png' alt="Biometria Hematica" />
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
          <button type="button" className="btn cancel">Cancelar</button>
          <button type="submit" className="btn submit">Registrar</button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AgregarMuestra;
