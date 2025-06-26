//rafc para hacer una plantilla rapida
import { useState } from 'react'
import { SearchBar } from '../Components';
import { Link } from 'react-router-dom';
import { OpcionesPedidos } from '../Components';
import { ModalPedidos } from '../Components';
//import Component from './Component'
//import { Outlet } from 'react-router-dom'


const Pedidos =() => {
    const [modalAbierto, setModalAbierto] = useState(false);

    return (
        <div>
            <h1>Pedidos </h1>
            <div className='buscador'>
                
                <button className='btn-agregar'>+Agregar</button>
                
                <button className='btn-agregar'  onClick={() => setModalAbierto(true)}>+Agregar</button>
                {modalAbierto && <ModalPedidos onClose={() => setModalAbierto(false)} />}
                <Link to="/AgregarMuestras">
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
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="ajustes" className='imgMuestra'/>
                                </div>
                                <h1 className='centrar'>P-123</h1>
                                <p className='texto'>analisis de sangre</p>
                                <p className='texto'>Mario Alberto Lira Zamora</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="ajustes" className='imgMuestra'/>
                                </div>
                                <h1 className='centrar'>P-123</h1>
                                <p className='texto'>Biometrica Hepatica</p>
                                <p className='texto'>David Jezhuah Ramirez Alvarado</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="ajustes" className='imgMuestra'/>
                                </div>
                                <h1 className='centrar'>P-123</h1>
                                <p className='texto'>analisis de sangre</p>
                                <p className='texto'>Ricardo Luna Unzueta</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className='caja_pedidos'>
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="ajustes" className='imgMuestra'/>
                                </div>
                                <h1 className='centrar'>P-123</h1>
                                <p className='texto'>analisis de sangre</p>
                                <p className='texto'>Mario Alberto Lira Zamora</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="ajustes" className='imgMuestra'/>
                                </div>
                                <h1 className='centrar'>P-123</h1>
                                <p className='texto'>Biometrica Hepatica</p>
                                <p className='texto'>David Jezhuah Ramirez Alvarado</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="ajustes" className='imgMuestra'/>
                                </div>
                                <h1 className='centrar'>P-123</h1>
                                <p className='texto'>analisis de sangre</p>
                                <p className='texto'>Ricardo Luna Unzueta</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className='caja_pedidos'>
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="ajustes" className='imgMuestra'/>
                                </div>
                                <h1 className='centrar'>P-123</h1>
                                <p className='texto'>analisis de sangre</p>
                                <p className='texto'>Mario Alberto Lira Zamora</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="ajustes" className='imgMuestra'/>
                                </div>
                                <h1 className='centrar'>P-123</h1>
                                <p className='texto'>Biometrica Hepatica</p>
                                <p className='texto'>David Jezhuah Ramirez Alvarado</p>
                                <Link to='/RecibosPedidos'>
                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                </Link>
                            </div>
                            <div className='caja_pedidos'>
                                <div className='titulo'>
                                    <img src="/quimica.png" alt="ajustes" className='imgMuestra'/>
                                </div>
                                <h1 className='centrar'>P-123</h1>
                                <p className='texto'>analisis de sangre</p>
                                <p className='texto'>Ricardo Luna Unzueta</p>
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