
const DetallesPacienteAlta = () => {
    const pruebas = [
        "Quimica sanguinea",
        "Biometrica Hepatica"
    ]
    return (
        
        <div className='caja_2'>
            <h1 className='titulo'>Detalles</h1>
            {/**aqui empieza lo chido */}
            {pruebas.map((prueba, index) => (
                <div key={index} className='tabla-detalles'>
                <div className='icono'>
                    <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                </div>
                <p className='prueba-name'>{prueba}</p>
                    <div className='acomodar-iconos-2'>
                        <img src="/descargas.png" alt="descargar" className='icono-correo' />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DetallesPacienteAlta
import React from 'react'

const DetallesPacienteAlta = () => {
    const pruebas = [
        "Quimica sanguinea",
        "Biometrica Hepatica"
    ]
    return (
        
        <div className='caja_2'>
            <h1 className='titulo'>Detalles</h1>
            {/**aqui empieza lo chido */}
            {pruebas.map((prueba, index) => (
                <div key={index} className='tabla-detalles'>
                <div className='icono'>
                    <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                </div>
                <p className='prueba-name'>{prueba}</p>
                    <div className='acomodar-iconos-2'>
                        <img src="/sobre-mas.png" alt="enviar" className='icono-correo' />
                        <img src="/descargas.png" alt="descargar" className='icono-correo' />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DetallesPacienteAlta