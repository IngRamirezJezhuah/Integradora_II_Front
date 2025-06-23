import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

  //conexion se supone que esto hace que te tome los datos y los suba al servidor donde esta el back opr medio de la ruta
  //esto lo hago ya que se va a repetir con las demas consultas
  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!formData.nombre || !formData.apellidoPaterno || !formData.apellidoMaterno || !formData.fechaNacimiento || !formData.correo) {//esta es para que antes de enviar los datos tenga que revisar que alla colocado todo los campos
    setError('Por favor, completa todos los campos requeridos');
  } else {
    setError('');

    try {
      const response = await fetch("https://8d5e-189-197-191-34.ngrok-free.app/usuarios", {//esto llama a la Api es como hacer una peticion en postman pero en java
        method: "POST",//el metodo que queremos usar ya sea POST,GET,DELETE,PATCH
        headers: {
          "Content-Type": "application/json"//esto es para que cambie el formato de a fuerzas a json
        },
        body: JSON.stringify({//convierte el objeto js a un strin json para que el server lo jale
          correo: formData.correo,
          rol: "admin", // Puedes cambiarlo según lo que queramos lo definiremos despues en equipo
          nombre: formData.nombre,
          apellidoPaterno: formData.apellidoPaterno,
          apellidoMaterno: formData.apellidoMaterno,
          fechaNacimiento: formData.fechaNacimiento
        })
      });

      const result = await response.json();

      if (response.ok) {//es la forma mas rapuda de saber el status sin usar el status 200 oh eso que no recuerdo
        alert("Paciente registrado exitosamente.");//luego le agregamos estilos al alert
        console.log("Respuesta del backend:", result);
        handleCancel(); // Limpia el formulario
      } else {
        console.error("Error al registrar:", result);
        setError(result.message || "Hubo un error al registrar al paciente.");
      }

    } catch (error) {
      console.error("Error de red:", error);
      setError("No se pudo conectar al servidor.");
    }
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
        <Link to="/Pacientes">
          <button className='btn'>Regresar</button>
        </Link>
        <button className='btn' onClick={handleCancel}>Cancelar</button>
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

        
        <label>Rol</label>
          <select name="selectedFruit">
            <option value="Admin">Admin</option>
            <option value="Secretaria">Secretaria</option>
            <option value="Cliente">Cliente</option>
            <option value="Trabajador">Trabajador</option>
          </select>

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
          <button type="submit" className="btn submit">Registrar</button>
        </div>
      </form>
    </div>
  );
};

export default NuevoPacienteForm;