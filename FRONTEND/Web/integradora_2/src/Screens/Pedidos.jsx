//rafc para hacer una plantilla rapida
import React from 'react'
import { SearchBar } from '../Components';
import { Link } from 'react-router-dom';
//import Component from './Component'
//import { Outlet } from 'react-router-dom'


const Pedidos =() => {
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
                    <div className='prueba_tabla'>
                        <img src="/prueba-de-sangre.png" alt="prueba imagen" className='imagen-prueba' />
                        <p className='prueba-name'>Quimica Sangiunea</p>
                        <div  className='acomodar-iconos'>
                            <p>100 $</p>
                        </div>
                    </div>
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