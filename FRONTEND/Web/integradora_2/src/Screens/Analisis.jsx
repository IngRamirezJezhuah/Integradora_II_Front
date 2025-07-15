import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { SearchBar } from '../Components';
import { ModalAnalisis } from '../Components';
import Swal from 'sweetalert2';

const Analisis=()=> {
    const Pruebas= [
        "Quimica Sanguinea",
        "BIometrica Hepatica"
    ]

    function handleAlert(AnalisisId) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Estas Seguro de borrarlo?",
                text: "No podras Revertirlo una vez lo borres!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, borralo!",
                cancelButtonText: "No, cancelar!",
                reverseButtons: true
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const headers = {
                            'Content-Type': 'application/json',
                        };
                        const response = await fetch(`http://vps-5127231-x.dattaweb.com:3500/analisis/${AnalisisId}`, {
                            method: 'DELETE',
                            headers
                        });
                        if (!response.ok) {
                            throw new Error('Error al borrar paciente');
                        }
                        swalWithBootstrapButtons.fire({
                            title: "Borrado Exitosamente!",
                            text: "Tu paciente ha sido borrado correctamente",
                            icon: "success",
                            timer : 1300,
                            showConfirmButton: false
                        });
                    } catch (error) {
                        swalWithBootstrapButtons.fire({
                            title: "Error!",
                            text: "No se pudo borrar el Analisis",
                            icon: "error",
                            timer : 1300,
                            showConfirmButton: false
                        });
                    }
                } else if(result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "!Cancelado!",
                        text: "Regresando a la pagina",
                        icon: "success",
                        timer : 1000,
                        showConfirmButton: false
                    });
                }
            })
        }
    const [modalAbierto,setModalAbierto] = useState(false)
    return (
        <div>
            <p className='titulo'>Analisis</p>
                <div className='buscador'>
                    <button className='btn-agregar' onClick={() => setModalAbierto(true)}>+Agregar</button>
                    {modalAbierto && <ModalAnalisis onClose={()=> setModalAbierto(false)} />}
                    <SearchBar/>
                </div>
            <div className='analisis'>
                <div className='contenedor_pedidos'>
                        <div className='scale-up-ver-center'>
                            <div className='caja_1'>
                                <h1 className='titulo'>Pruebas</h1>
                                    {Pruebas.map((prueba,index) => (
                                        <div key={index} className='prueba_tabla'>
                                            <div className='icono'>
                                                <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                                            </div>
                                            <p className='prueba-name'>{prueba}</p> 
                                            <div className='margen'>
                                                <Link to='/Editar-Analisis'>
                                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                                </Link>
                                                <img src="/basura.png" alt="editar" className='iconos' onClick={handleAlert}/>
                                            </div>
                                        </div>
                                    ))}
                                <div className='prueba_tabla'>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <div className='scale-up-ver-center'>
                        <div className='caja_2'>
                            <h1 className='titulo'>Detalles</h1>
                            <p className='detall-tex'>Quimica sanguinea</p>
                            <h2 className='prueba-name'>Titulo</h2>
                            <p className='detall-tex'>305.00$ pesos</p>
                            <h2 className='prueba-name'>Costos</h2>
                            <p className='detall-tex'>5 dias</p>
                            <h2 className='prueba-name'>Dias de espera</h2>
                            <h2 className='prueba-name'>Descripcion</h2>
                            <p className='descr-tex'>
                                    venir en ayunas
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analisis;
