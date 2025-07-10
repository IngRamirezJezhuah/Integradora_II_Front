
import React, { useState } from 'react'

const DetallesPacienteAlta = () => {
    const pruebas = [
        "Quimica sanguinea",
        "Biometrica Hepatica"
    ]
    const [pruebaSeleccionado, setPruebaSeleccionado] = useState(null);
    const handleSeleccionarPrueba = (pruebas) => {
    setPruebaSeleccionado(pruebas);
    };
    /*
    
    */
    return (
        
        <div className='caja_2'>
            <h1 className='titulo'>Detalles</h1>
            {/**aqui empieza lo chido */}
            {pruebas.map((prueba, index) => {
                const isSelected = pruebaSeleccionado === prueba._id;
                return(
                    <div key={index} className='tabla-detalles'>
                            <div className={`prueba_tabla ${isSelected ? 'seleccionado' : ''}`} onClick={() => handleSeleccionarPrueba(prueba._id)}>
                            <div className='icono'>
                                <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                            </div>
                            <p className='prueba-name'>{prueba}</p>
                            <div className='acomodar-iconos-2'>
                                <img src="/descargas.png" alt="descargar" className='icono-correo' />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DetallesPacienteAlta