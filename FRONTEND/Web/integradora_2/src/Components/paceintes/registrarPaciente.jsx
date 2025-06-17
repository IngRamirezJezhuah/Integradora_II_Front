import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegistrarPaciente = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        fechaNacimiento: '',
        correo: '',
        contraseña: 'admin',  
        rol: 'client' // o el que sea por defecto
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("https://8d5e-189-197-191-34.ngrok-free.app/usuarios", {//ruta del servidor
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)//tipo de form que soporta
            })
            const data = await response.json()
            if (response.ok) {
                alert("Registro exitoso")
                console.log(data)
            } else {
                alert("Error: " + data.message)
                console.error(data)
            }
        } catch (err) {
            console.error("Error en la petición:", err)
            alert("Error en la petición")
        }
    }

    return (
        <div className='scale-up-center'>
            <div className='registrar-user'>
                <form onSubmit={handleSubmit}>
                    <label className='precios' htmlFor="nombre">Nombre(s):</label>
                    <input className='label-form' type="text" name="nombre" value={formData.nombre} onChange={handleChange} required  placeholder="David Jezhuah" />

                    <label className='precios' htmlFor="apellidoPaterno">Apellido Paterno:</label>
                    <input className='label-form' type="text" name="apellidoPaterno" value={formData.apellidoPaterno} onChange={handleChange} required  placeholder="Ramirez"/>

                    <label className='precios' htmlFor="apellidoMaterno">Apellido Materno:</label>
                    <input className='label-form' type="text" name="apellidoMaterno" value={formData.apellidoMaterno} onChange={handleChange} required  placeholder="Alvarado"/>

                    <label className='precios' htmlFor="fechaNacimiento">Fecha Nacimiento:</label>
                    <input className='label-form' type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} required />

                    <label className='precios' htmlFor="correo">Correo:</label>
                    <input className='label-form' type="email" name="correo" value={formData.correo} onChange={handleChange} required   placeholder="Correo@gmail.com"/>
                    <input className='btn' type="submit" value="Registrar" />
                    <Link to='/Pacientes'>  
                    <button className='btn'>Regresar</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default RegistrarPaciente
