//rfce para hacer una plantilla
//import React, { useEffect, useState } from 'react'
//import { Link } from 'react-router-dom';
import { SearchBar } from '../Components';
import { ModalPaciente } from '../Components';
import {  useState } from 'react';

const Pacientes =() => {

    const nombres = [//esta  es para usar una lista, alternatica sin peticion 
    "Mario Lira Zamora",
    "David Jezhuah Ramirez Alvarado",
    "Racardo Luna Unzueta",
    "Diego Daher Diaz Contreraz",]
    const [modalAbierto, setModalAbierto] = useState(false);

    const pruebas = [
        "Quimica sanguinea",
        "Biometrica Hepatica"
    ]
    /*Verison con servidor
    const [pacientes, setPacientes] = useState([]);
    useEffect(() => {
        const getPacientes = async () => {
            try {
                const res = await fetch("https://8d5e-189-197-191-34.ngrok-free.app/usuarios", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Respuesta del servidor inválida: ${res.status} - ${errorText}`);
                }
                const data = await res.json();
                console.log("Pacientes desde backend:", data);
                setPacientes(data.usuarios);
            } catch (error) {
                console.error("Error al obtener pacientes:", error);
            }
        };
        getPacientes();
    }, []);*/

    return (
            <div>
                <h1>Pacientes </h1>
                <div className='buscador'>
                    <button className='btn-agregar' onClick={() => setModalAbierto(true)}>+Agregar</button>
                    {modalAbierto && <ModalPaciente onClose={() => setModalAbierto(false)} />}
                    < SearchBar />
                </div>
                <div className='margen'>
                    <div className='scale-up-ver-center'>
                            <div className='caja_1'>
                                <div className='scroll'>
                                    {/*
                                    {pacientes.map((paciente, index) => {
                                        const nombreCompleto = `${paciente.nombre} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`;
                                        const inicial = paciente.nombre.charAt(0);
                                        return (
                                            <div key={index} className='prueba_tabla'>
                                                <div className='inicial-circulo'>
                                                    <p className='letra-circulo'>{inicial}</p>
                                                </div>
                                                <div>
                                                    <p className='prueba-name'>{nombreCompleto}</p>
                                                </div>
                                                <div className='acomodar-iconos'>
                                                    <img src="/basura.png" alt="borrar" className='iconos' />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    */}
                                    {nombres.map((nombreCompleto,index) => {
                                        const inicial = nombreCompleto.charAt(0);
                                        return(
                                            <div key={index} className='prueba_tabla'>
                                                <div className='inicial-circulo'>
                                                    <p className='letra-circulo'>{inicial}</p>
                                                </div>
                                                <div>
                                                    <p className='prueba-name'>{nombreCompleto}</p>                                
                                                </div>
                                                <div className='acomodar-iconos'>
                                                    <img src="/basura.png" alt="borrar" className='iconos' />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    
                                </div>
                            </div>
                        </div>
                        <div className='scale-up-ver-center'>
                            <div className='caja_2'>
                                <h1 className='titulo'>Detalles</h1>
                                
                                    {/**aqui empieza lo chido */}
                                    {pruebas.map((prueba, index) => (
                                        <div key={index} className='tabla-detalles'>
                                        <div className='icono'>
                                            <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                                        </div>
                                        <p className='prueba-name'>{prueba}</p>
                                        <div className='acomodar-iconos'>
                                            <img src="/sobre-mas.png" alt="editar" className='iconos' />
                                        </div>
                                        <div className='acomodar-iconos-2'>
                                            <img src="/descargas.png" alt="borrar" className='iconos' />
                                        </div>
                                        </div>
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default Pacientes;
/* 
en consola da un error para recibir n el back 
main.ff0e15bcc3380cc32ddd.hot-update.js:49 error al obtener pacientes SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
*/