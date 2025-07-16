import React from 'react'
import { SearchBar } from '../Components'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const PerfilPaciente = () => {
    const pedidos = [
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Mario Alberto Lira Zamora' },
        { id: 'P-123', descripcion: 'Biometría Hepática', paciente: 'David Jezhuah Ramirez Alvarado' },
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Ricardo Luna Unzueta' },
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Mario Alberto Lira Zamora' },
        { id: 'P-123', descripcion: 'Biometría Hepática', paciente: 'David Jezhuah Ramirez Alvarado' },
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Ricardo Luna Unzueta' },
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Mario Alberto Lira Zamora' },
        { id: 'P-123', descripcion: 'Biometría Hepática', paciente: 'David Jezhuah Ramirez Alvarado' },
        { id: 'P-123', descripcion: 'Análisis de sangre', paciente: 'Ricardo Luna Unzueta' },
        ];
        function dividirEnFilas(data, tam) {
            const filas = [];
            for (let i = 0; i < data.length; i += tam) {
                filas.push(data.slice(i, i + tam));
            } return filas;
        }
        const filas = dividirEnFilas(pedidos, 1);
        function handleAlert(e) {
                const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
                });
                    swalWithBootstrapButtons.fire({
                    title: "¿Estas deguro de borrarlo?",
                    text: "!No podras Revertirlo una vez lo borres¡",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si, borralo!",
                    cancelButtonText: "No, cancelar!",
                    reverseButtons: true
                    }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                    title: "!Borrado Exitosamente¡",
                    text: "Tu pedido ha sido borrado correctamente",
                    icon: "success",
                    timer : 1300,
                    showConfirmButton: false
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                            title: "!Cancelado!",
                            text: "Regresando a la pagina",
                            icon: "success",
                            timer : 1000,
                            showConfirmButton: false
                        });
                }
                });
            }
    return (
        <div className='contenedor'>
            <div className='plantilla'>
                <h1>perfil</h1>
                <p>Mario ALberto Lira Zamora</p>
                <SearchBar/>
                <Link to='/' className='btn-agregar'>
                        <img src="/salida.png" alt="" />
                        <p>cerrar sesion</p>
                </Link>
                    <div className=''>
                        <Link to={'/Dashboard'}>
                            <button className='btn'>Regresar</button>
                        </Link>
                        <Link to={'/EditarInfoPaciente'}>
                        <button className='btn'>Editar</button>
                        </Link>
                    </div>
                <div>
                <p>09/12/2004</p>
                <p>mario_3141230104@utd.edu.mx</p>
                <div>
                    <div className='scroll_pruebas'>
                {filas.map((fila, i) => ( 
                    <div key={i} className='fila'> {/*Primer .map(): recorre cada fila de pedidos (es decir, cada array de 3 pedidos) i es el índice de la fila. */}
                    {fila.map((pedido, j) => (
                        <div key={j} className='margen'>{/*Segundo .map(): recorre cada pedido individual dentro de esa fila ,j es el índice dentro de la fila. */}
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
                                <Link to='/'>
                                    <img src="/detalles.png" alt="detalles" className='iconos' />
                                </Link>
                                    <img src="/basura.png" alt="detalles" className='iconos' onClick={handleAlert} />
                            </div>
                        </div>
                    ))}
                    </div>
                ))}
            </div>
                </div>
                    
                </div>
            </div>
        </div>
    )
}

export default PerfilPaciente