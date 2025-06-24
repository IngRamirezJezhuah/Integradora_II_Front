//rafc para hacer una plantilla rapida
import React from 'react'
import { FilterBar, SearchBar } from '../Components';
import { Link } from 'react-router-dom';
//import Component from './Component'
//import { Outlet } from 'react-router-dom'


const Pedidos =() => {
    
    
    return (
        <div>
            <h1>Pedidos </h1>
            <div className='buscador'>
                <Link to="/AgregarMuestras">
                <button className='btn-agregar'>+Agregar</button>
                </Link>
                <SearchBar />
            </div>
            <div className='margen'>
                <div className='Box-muestras'>
                    <FilterBar/>
                </div>
                <div >
                    coso 1  
                </div>
            </div>
        </div>
    )
}

export default Pedidos;