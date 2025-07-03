import React from 'react'
import Swal from 'sweetalert2';

const PacientesAlta = () => {
        const nombres = [//esta  es para usar una lista, alternatica sin peticion 
        "Mario Lira Zamora",
        "David Jezhuah Ramirez Alvarado",
        "Ricardo Luna Unzueta",
        "Diego Daher Diaz Contreraz",
        "Edson Burceaga Govea",
        "Alejandro Puentes de Busk",
        "Angel Hernandez",
        "Oscar Perez Romer",
        ]
    function handleAlert(e) {
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
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire({
                    title: "Borrado Exitosamente!",
                    text: "Tu paciente ha sido borrado correctamente",
                    icon: "success"
                });
            } else if (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelado",
                    text: "Tu Paciente se ah mantenido ( >v°)",
                    icon: "error"
                });
            }
        })
            
    }
    return (
        <div className='caja_1'>
                                <div className='scroll'>
                                    {/*
                                    {pacientes.map((paciente, index) => {
                                        const nombreCompleto = `${paciente.nombre} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`;
                                        const inicial = paciente.nombre.charAt(0);
                                        return (
                                            <div key={index} className='prueba_tabla'>
                                                <div className='inicial-circulo'>
                                                    <p className='letra-circulo'>{inicial}</p>
                                                </div>
                                                <div>
                                                    <p className='prueba-name'>{nombreCompleto}</p>
                                                </div>
                                                <div className='acomodar-iconos'>
                                                    <img src="/basura.png" alt="borrar" className='iconos' />
                                                </div>
                                            </div>
                                        );
                                    })}
                                    */}
                                    {nombres.map((nombreCompleto,index) => {
                                        const inicial = nombreCompleto.charAt(0);
                                        return(
                                            <div key={index} className='prueba_tabla'>
                                                <div className='inicial-circulo'>
                                                    <p className='letra-circulo'>{inicial}</p>
                                                </div>
                                                <div>
                                                    <div className='acomodar-iconos'>
                                                        <img src="/basura.png" alt="borrar" className='icono-borrar' onClick={handleAlert}/>
                                                    </div>
                                                    <p className='prueba-name'>{nombreCompleto}</p>                                
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
    )
}

export default PacientesAlta