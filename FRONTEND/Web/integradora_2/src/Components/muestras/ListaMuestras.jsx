import React from 'react'
import { Link } from 'react-router-dom'

const ListaMuestras = () => {
    return (
        <div className='scroll_pruebas'>
            <div>
                <div className='caja_pedidos'>
                    <div className='titulo'>
                        <img src="/bioHem.png" alt="ajustes" className='imgMuestra'/>
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
                        <img src="/prueba-de-sangre.png" alt="ajustes" className='imgMuestra'/>
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
    )
}

export default ListaMuestras