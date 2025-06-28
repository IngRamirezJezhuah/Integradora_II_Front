import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../elementos/searchBar'
import DetallesPedidos from './DetallesPedidos'

const ReciboPedidos = () => {
    const Pruebas= [
        "Quimica Sanguinea",
        "BIometrica Hepatica",
    ]
    const precios=[
        "500",
        "300"
    ]
    return (
        <div>
            <h1>Recibos Pedidos </h1>
            <div className='buscador'>
                <Link to="/AgregarMuestras">
                <button className='btn-agregar'>+Agregar</button>
                </Link>
                <SearchBar />
            </div>
            <div className='margen'>
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
                                <p className='prueba-name'>{precios[index]}</p>
                                <input type="checkbox" name="" id=""  className='acomodar-iconos'/>
                                
                            </div>
                            ))}
                        <hr />
                    </div>
                </div>
                <div className='scale-up-ver-center'>
                    <DetallesPedidos/>
                </div>
            </div>
        </div>
    )
}

export default ReciboPedidos