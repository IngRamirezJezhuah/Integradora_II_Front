//rfce para hacer una plantilla
import React from 'react'

const Pacientes =() => {
    return (
            <div className='margen'>
                <div className='buscador'>
                    <input type="text" placeholder='Buscar Paciente' className='buscador' />
                    <button className='btn-agregar'>+Agregar</button>
                    <p>asa</p>
                </div>
                <div>
                </div>
                <div className='scale-up-ver-center'>
                    <div className='caja_1'>
                        <div className='prueba_tabla'>
                            <img src="/user-nat.png" alt="prueba imagen" className='icono-user' />
                            <p className='prueba-name'>Mario Lira Zamora</p>
                            <img src="/ajustes-deslizadores.png" alt="editar" className='iconos' />
                            <img src="/basura.png" alt="borrar" className='iconos' />
                        </div>
                    </div>
                </div>
                <div className='scale-up-ver-center'>
                    <div className='caja_2'>
                        <h1 className='titulo'>Detalles</h1>
                        <div className='tabla-detalles'>
                            <div className='icono'>
                                <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen"/>
                            </div>
                                <p className='prueba-name'>Quimica Sangiunea</p>
                            <div>
                                <img src="/sobre-mas.png" alt="editar" className='iconos' />
                                <img src="/descargas.png" alt="borrar" className='iconos' />
                            </div>
                        </div>
                        <div className='tabla-detalles'>
                            <div className='icono'>
                                <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen"/>
                            </div>
                                <p className='prueba-name'>Biometrica Hepatica</p>
                            <div>
                                <img src="/sobre-mas.png" alt="editar" className='iconos' />
                                <img src="/descargas.png" alt="borrar" className='iconos' />
                            </div>
                        </div>
                </div>
                </div>
            </div>
    )
}

export default Pacientes;
