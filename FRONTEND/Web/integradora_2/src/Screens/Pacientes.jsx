//rfce para hacer una plantilla
import React from 'react'
//import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { SearchBar } from '../Components';

const Pacientes =() => {

    
    const nombres = [//esta  es para usar una lista, alternatica sin peticion 
    "Mario Lira Zamora",
    "David Jezhuah Ramirez Alvarado",
    "Racardo Luna Unzueta",
    "Diego Daher Diaz Contreraz"
    ];

    const pruebas = [
        "Quimica sanguinea",
        "Biometrica Hepatica"
    ]
    /* version con servidor, no funciona de manera local
    const [pacientes, setPacientes] = useState([])
    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await fetch("https://8d5e-189-197-191-34.ngrok-free.app/usuarios", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const data = await response.json()
                if (response.ok) {
                    setPacientes(data) // aquí asumimos que data es un array de pacientes
                    console.log("Pacientes cargados:", data)
                } else {
                    console.error("Error:", data.message)
                    alert("Error al obtener pacientes")
                }
            } catch (error) {
                console.error("Error en la petición:", error)
                alert("No se pudo conectar al servidor")
            }
        }

        fetchPacientes()
    }, [])*/
    return (
            <div className='margen'>
                {/*
                <div className='buscador'>
                    <input type="text" placeholder='Buscar Paciente' className='buscador' />
                    <Link to="/Registrar-paciente">
                    <button className='btn-agregar'>+Agregar</button>
                    </Link>
                    <p className='prueba-name'>asa</p>
                </div>
                */}
                <div className='buscador'>
                    < SearchBar />
                    <Link to="/Registrar-paciente">
                    <button className='btn-agregar'>+Agregar</button>
                    </Link>
                </div>
                <div className='scale-up-ver-center'>
                        <div className='caja_1'>
                            <div className='scroll'>
                                {/* version con servidor, no funciona en local
                                    {pacientes.map((paciente, index) => {
                                        const nombreCompleto = `${paciente.nombre} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`;
                                        const inicial = paciente.nombre.charAt(0);
                                        return (
                                            <div key={index} className='prueba_tabla'>
                                                <div className='inicial-circulo'>
                                                    {inicial}
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
                                {nombres.map((nombreCompleto,index) => {/*se usa map para iterar la lista y generar un bloque prueba_tabla por cada nombre tambien la usare en chechbox*/
                                    const inicial = nombreCompleto.charAt(0);/*se obtiene la inicial con .charAt(0) para cada nombre dentro del map. recordar esta mamada*/
                                    return(
                                        <div key={index} className='prueba_tabla'>{/*cada hijo renderizado con map debe tener una key, por eso usé el índice index. */}
                                            <div className='inicial-circulo'>
                                                {inicial}
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
    )
}

export default Pacientes;
