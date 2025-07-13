
//import React, { useState } from 'react'

const DetallesPacienteAlta = ({seleccionado,onSelect = () => {}}) => {
    /*const pruebas = [
        "Quimica sanguinea",
        "Biometrica Hepatica"
    ]*/
    const pruebas = [
        { id: 'qs', nombre: 'Química Sanguínea', precio: 350 },
        { id: 'bh', nombre: 'Biométrica Hepática', precio: 211 },
    ];
    
    return (
        <div className="caja_2">
            {/*
        <div className='caja_2'>
            <h1 className='titulo'>Detalles</h1>
            {pruebas.map((p, index) => {
                const isSelected = seleccionado === p._id;
                return(
                    <div key={index} className='tabla-detalles'>
                            <div className={`prueba_tabla ${seleccionado ? 'seleccionado' : ''}`}
                                onClick={() => onSelect(p._id)}>
                            <div className='icono'>
                                <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                            </div>
                            <p className='prueba-name'>{p.nombre}</p>
                            <div className='acomodar-iconos-2'>
                                <img src="/descargas.png" alt="descargar" className='icono-correo' onClick={() => onSelect(p._id)}/>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
            */}
        <h1 className="titulo">Detalles</h1>
        {pruebas.map((p, index)=> {
            const isSelected = seleccionado === p.id;
            return (
                <div key={index} className='tabla-detalles'>
                <div
                    key={p.id}
                    className={`prueba_tabla ${isSelected ? 'seleccionado' : ''}`}
                    onClick={(e) =>{e.stopPropagation(); onSelect(p.id)} }  
                >   
                    <div className="icono">
                    <img src="/prueba-de-sangre.png" alt="prueba" className="imagen-prueba" />
                    </div>
                    <p className="prueba-name">{p.nombre}</p>
                    <div className="acomodar-iconos-2">
                    <img src="/descargas.png" alt="descargar" className="icono-correo" />
                    </div>
                </div>
                </div>
            );
        })}
        </div>
    )
}

export default DetallesPacienteAlta