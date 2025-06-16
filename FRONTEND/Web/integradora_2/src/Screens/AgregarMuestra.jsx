import React, { useState } from 'react';
import chemistryIcon from './icons/chemistry.png';
import bloodTestIcon from './icons/blood-test.png';

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
    <div className="sample-form-container">
      <div className="form-section">
        <h2>Pruebas</h2>
        <div className="test-options">
          <div
            className={`test-option ${selectedTest === 'Quimica Sanguinea' ? 'selected' : ''}`}
            onClick={() => handleTestChange('Quimica Sanguinea')}
          >
            <img src={chemistryIcon} alt="Quimica Sanguinea" />
            <span>Quimica Sanguinea</span>
          </div>
          <div
            className={`test-option ${selectedTest === 'Biometria Hematica' ? 'selected' : ''}`}
            onClick={() => handleTestChange('Biometria Hematica')}
          >
            <img src={bloodTestIcon} alt="Biometria Hematica" />
            <span>Biometria Hematica</span>
          </div>
        </div>
      </div>
      <form className="form-section" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pedido</label>
          <input
            type="text"
            name="pedido"
            value={formData.pedido}
            onChange={handleInputChange}
            placeholder="P1285"
          />
        </div>
        <div className="form-group">
          <label>Tipo de muestra</label>
          <input
            type="text"
            name="tipoMuestra"
            value={formData.tipoMuestra}
            onChange={handleInputChange}
            placeholder="Sangre"
          />
        </div>
        <div className="form-group">
          <label>Paciente (id)</label>
          <input
            type="text"
            name="paciente"
            value={formData.paciente}
            onChange={handleInputChange}
            placeholder="Ej. P123"
          />
        </div>
        <div className="form-group">
          <label>Resultados</label>
          <input
            type="text"
            name="resultados"
            value={formData.resultados}
            onChange={handleInputChange}
            placeholder="Ej. archivo.pdf"
          />
        </div>
        <div className="form-actions">
          <button type="button" className="cancel-btn">Cancelar</button>
          <button type="submit" className="register-btn">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarMuestra;
