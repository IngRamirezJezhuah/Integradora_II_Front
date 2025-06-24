//rafc para hacer una plantilla rapida
import React from 'react'
import { SearchBar } from '../Components';
import { Link } from 'react-router-dom';
import { OpcionesPedidos } from '../Components';
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
                <div className='Box-muestras'>
                    <OpcionesPedidos/>
                </div>
            </div>
            <div className='margen'>
                <div className='plantilla'>
                    <div className='scroll_pruebas'>
                        <div>
                            <div className='caja_pedidos'>
                                <img src="/quimica.png" alt="ajustes" />
                                <h1>P-123</h1>
                                <p>analisis de sangre</p>
                                <p>Mario Alberto Lira Zamora</p>
                                    <Link to='/RecibosPedidos'>
                                        <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                    </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <img src="/quimica.png" alt="ajustes" />
                                <h1>P-123</h1>
                                <p>Biometrica Hepatica</p>
                                <p>David Jezhuah Ramirez Alvarado</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <img src="/quimica.png" alt="ajustes" />
                                <h1>P-123</h1>
                                <p>analisis de sangre</p>
                                <p>Ricardo Luna Unzueta</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className='caja_pedidos'>
                                <img src="/quimica.png" alt="ajustes" />
                                <h1>P-123</h1>
                                <p>analisis de sangre</p>
                                <p>Mario Alberto Lira Zamora</p>
                                    <Link to='/RecibosPedidos'>
                                        <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                    </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <img src="/quimica.png" alt="ajustes" />
                                <h1>P-123</h1>
                                <p>Biometrica Hepatica</p>
                                <p>David Jezhuah Ramirez Alvarado</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <img src="/quimica.png" alt="ajustes" />
                                <h1>P-123</h1>
                                <p>analisis de sangre</p>
                                <p>Ricardo Luna Unzueta</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className='caja_pedidos'>
                                <img src="/quimica.png" alt="ajustes" />
                                <h1>P-123</h1>
                                <p>analisis de sangre</p>
                                <p>Mario Alberto Lira Zamora</p>
                                    <Link to='/RecibosPedidos'>
                                        <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                    </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <img src="/quimica.png" alt="ajustes" />
                                <h1>P-123</h1>
                                <p>Biometrica Hepatica</p>
                                <p>David Jezhuah Ramirez Alvarado</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <img src="/quimica.png" alt="ajustes" />
                                <h1>P-123</h1>
                                <p>analisis de sangre</p>
                                <p>Ricardo Luna Unzueta</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pedidos;