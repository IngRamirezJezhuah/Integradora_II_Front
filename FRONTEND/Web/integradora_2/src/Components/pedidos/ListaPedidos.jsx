import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ListaPedidos = () => {
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
        // puedes agregar más...
        // puedes agregar más...
        ];
        
    function dividirEnFilas(data, tam) {
        const filas = [];
        for (let i = 0; i < data.length; i += tam) {
            filas.push(data.slice(i, i + tam));
        } return filas;
    }
    const filas = dividirEnFilas(pedidos, 3);

    //sweet alert
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

    );
};

export default ListaPedidos
