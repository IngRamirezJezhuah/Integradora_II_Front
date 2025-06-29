import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

const ListaPedidos = () => {
    const pedidos = [
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Mario Alberto Lira Zamora' },
        { id: 'P-123', descripcion: 'Biometría Hepática', paciente: 'David Jezhuah Ramirez Alvarado' },
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Ricardo Luna Unzueta' },
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Mario Alberto Lira Zamora' },
        { id: 'P-123', descripcion: 'Biometría Hepática', paciente: 'David Jezhuah Ramirez Alvarado' },
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Ricardo Luna Unzueta' },
        // puedes agregar más...
        ];

        function dividirEnFilas(data, tam) {
            const filas = [];
            for (let i = 0; i < data.length; i += tam) {
                filas.push(data.slice(i, i + tam));
            } return filas;
        }

        const filas = dividirEnFilas(pedidos, 3);
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
                {fila.map((pedido, j) => (
                    <div key={j} className='caja_pedidos'>{/*Segundo .map(): recorre cada pedido individual dentro de esa fila ,j es el índice dentro de la fila. */}
                        <div className='titulo'>{/*key={i} y key={j} son importantes en React para que sepa cómo actualizar el DOM eficientemente. */}
                            <img src="/quimica.png" alt="química" className='imgMuestra' />
                        </div>
                        <h1 className='centrar'>{pedido.id}</h1>
                        <p className='texto'>{pedido.descripcion}</p>
                        <p className='texto'>{pedido.paciente}</p>
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

export default ListaPedidos
