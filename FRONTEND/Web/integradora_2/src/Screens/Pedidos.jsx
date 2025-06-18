//rafc para hacer una plantilla rapida
import React from 'react'
import { SearchBar } from '../Components';
import { Link } from 'react-router-dom';
//import Component from './Component'
//import { Outlet } from 'react-router-dom'


const Pedidos =() => {
    const Pruebas= [
        "Quimica Sanguinea",
        "BIometrica Hepatica",
    ]
    const precios=[
        "500",
        "300"
    ]
    return (
        <div className='margen'>
            <div className='buscador'>
                <Link to="/">
                <button className='btn-agregar'>+Agregar</button>
                </Link>
            <SearchBar />
            </div>
            <div className='scale-up-ver-center'>
                <div className='caja_1'>
                    <div className='acomodar'>
                        <p className='precios'>pruebas</p>
                        <p className='precios'>precio</p>
                    </div>
                    {Pruebas.map((prueba,index) => (
                        <div key={index} className='prueba_tabla'>
                            <div className='icono'>
                                <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                            </div>
                            <p className='prueba-name'>{prueba}</p>
                            
                            <div className='acomodar-iconos-2'>
                                
                                <p>{precios[index]}</p>{/*se deja dentro el index para que muestre el valor 1 en 1 */}
                            </div>
                        </div>
                        ))}
                    <hr />
                </div>
            </div>
            <div className='scale-up-ver-center'>
                <div className='pedidos-form'>
                    <h1 className='titulo'>Detalles</h1>
                </div>
            </div>
        </div>
    )
}

export default Pedidos;