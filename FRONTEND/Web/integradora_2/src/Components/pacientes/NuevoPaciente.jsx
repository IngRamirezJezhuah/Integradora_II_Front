import React, { useState, useEffect } from 'react';

const NuevoPacienteForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    correo: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate initial data fetch
    const initialData = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      fechaNacimiento: 'dd/mm/yyyy',
      correo: '',
    };
    setFormData(initialData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellidoPaterno || !formData.apellidoMaterno || !formData.fechaNacimiento || !formData.correo) {
      setError('Por favor, completa todos los campos requeridos');
    } else {
      setError('');
      console.log('Datos enviados:', formData);
      // Here you would typically send data to a backend
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      fechaNacimiento: '',
      correo: '',
    });
    setError('');
  };

  return (
    <div className="container">
      <div className="header">
        <h2 className="title">Nuevo Paciente</h2>
        <button className="btn cancel" onClick={handleCancel}>Cancelar</button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {error && <p className="error-msg">{error}</p>}

        <label>Nombre</label>
        <input
          className="input-field"
          type="text"
          name="nombre"
          placeholder="Nombre del paciente"
          value={formData.nombre}
          onChange={handleChange}
        />

        <label>Apellido Paterno</label>
        <input
          className="input-field"
          type="text"
          name="apellidoPaterno"
          placeholder="Apellido Paterno del paciente"
          value={formData.apellidoPaterno}
          onChange={handleChange}
        />

        <label>Apellido Materno</label>
        <input
          className="input-field"
          type="text"
          name="apellidoMaterno"
          placeholder="Apellido Materno del paciente"
          value={formData.apellidoMaterno}
          onChange={handleChange}
        />

        <label>Fecha de nacimiento</label>
        <input
          className="input-field"
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          placeholder="dd/mm/yyyy"
        />

        <label>Correo</label>
        <input
          className="input-field"
          type="email"
          name="correo"
          placeholder="Correo electrónico del paciente"
          value={formData.correo}
          onChange={handleChange}
        />

        <div className="buttons">
          <button type="submit" className="btn submit">Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export default NuevoPacienteForm;