import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ListaMuestras = () => {
    const muestras = [
            { id: 'M1321', descripcion: 'Análisis de sangre', paciente: 'Mario Alberto Lira Zamora' },
            { id: 'M1322', descripcion: 'Biometría Hepática', paciente: 'David Jezhuah Ramirez Alvarado' },
            { id: 'M1323', descripcion: 'Análisis de sangre', paciente: 'Ricardo Luna Unzueta' },
            { id: 'M1324', descripcion: 'Análisis de sangre', paciente: 'Mario Alberto Lira Zamora' },
            { id: 'M1325', descripcion: 'Biometría Hepática', paciente: 'David Jezhuah Ramirez Alvarado' },
            { id: 'M1326', descripcion: 'Análisis de sangre', paciente: 'Ricardo Luna Unzueta' },
            // puedes agregar más...
            ];
    
            function dividirEnFilas(data, tam) {
                const filas = [];
                for (let i = 0; i < data.length; i += tam) {
                    filas.push(data.slice(i, i + tam));
                } return filas;
            }
    
            const filas = dividirEnFilas(muestras, 3);
            //aqui llamo el dato que tomara y la cantidad de filas a hacer para que dividir en filas hacga su logica
            const [message] = useState('Usuario Borrado');
            
                function handleSubmit(e) {
                    e.preventDefault();
                    setTimeout(() => {
                    alert(message);
                    }, 100);
                }
        return (
            <div className='scroll_pruebas'>
                {filas.map((fila, i) => ( 
                    <div key={i} className='fila'> {/*Primer .map(): recorre cada fila de pedidos (es decir, cada array de 3 pedidos) i es el índice de la fila. */}
                    {fila.map((muestras, j) => (
                        <div key={j} className='caja_pedidos'>
                            <div className='titulo'>
                                <img src="/bioHem.png" alt="ajustes" className='imgMuestra'/>
                            </div>
                            <h1 className='centrar'>{muestras.id}</h1>
                            <p className='texto'>{muestras.descripcion}</p>
                            <p className='texto'>{muestras.paciente}</p>
                            <div className='margen'>
                                <Link to='/RecibosPedidos'>
                                    <img src="/editar.png" alt="editar" className='iconos' />
                                </Link>
                                <Link to='/RecibosPedidos'>
                                    <img src="/detalles.png" alt="detalles" className='iconos' />
                                </Link>
                                <Link to='/RecibosPedidos'>
                                    <img src="/basura.png" alt="detalles" className='iconos' onClick={handleSubmit} />
                                </Link>
                            </div>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
        );
    };
    

export default ListaMuestras

/*
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
*/