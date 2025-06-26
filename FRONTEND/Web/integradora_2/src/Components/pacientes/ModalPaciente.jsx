import React, { useState } from 'react';


const ModalPaciente = ({ onClose }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        correo: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.apellidoPaterno || !formData.apellidoMaterno || !formData.fechaNacimiento || !formData.correo) {
        setError('Por favor, completa todos los campos requeridos');
        return;
        }

        setError('');

        try {
        const response = await fetch("https://8d5e-189-197-191-34.ngrok-free.app/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            correo: formData.correo,
            rol: {
                Admin:'',
                Cliente:'',
                Secretaria:''
            },//['admin','Cliente','Secretaria','Empleado']
            nombre: formData.nombre,
            apellidoPaterno: formData.apellidoPaterno,
            apellidoMaterno: formData.apellidoMaterno,
            fechaNacimiento: formData.fechaNacimiento
            })
        });
        
        const result = await response.json();

        if (response.ok) {
            alert("Paciente registrado exitosamente.");
            onClose(); // Cierra el modal
        } else {
            setError(result.message || "Hubo un error al registrar al paciente.");
        }

        } catch (error) {
        console.error("Error de red:", error);
        setError("No se pudo conectar al servidor.");
        }
    };

    return (
        <div className="modal-overlay">
        <div className="modal-content">
            <h2>Registrar nuevo paciente</h2>
            <button className="close-btn" onClick={onClose}>X</button>

            <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            
            <label htmlFor="nombre">Nombre</label>
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
            
            <label htmlFor="apellidoPaerno">ApellidoPaterno</label>
            <input type="text" name="apellidoPaterno" placeholder="Apellido Paterno" value={formData.apellidoPaterno} onChange={handleChange} />
            
            <label htmlFor="apellidoMaterno">Apellido Materno</label>
            <input type="text" name="apellidoMaterno" placeholder="Apellido Materno" value={formData.apellidoMaterno} onChange={handleChange} />

            <label>
                Rol:{''}
                <select>
                <option id='Admin' value="Admin">Admin</option>
                <option id='Cliente' value="Cliente">Cliente</option>
                <option id='Secretaria' value="Secretaria">Secretaria</option>
                <option id='Empleado' value="Empleado">Empleado</option>
                </select>
            </label>
            
            <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
            
            <label htmlFor="Correo">Correo</label>
            <input type="email" name="correo" placeholder="Correo" value={formData.correo} onChange={handleChange} />

            <button type="submit" className="btn submit">Registrar</button>
            </form>
        </div>
        </div>
    );
};

export default ModalPaciente;
