import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { SearchBar } from '../Components';
import { ModalAnalisis } from '../Components';
import { requireTokenOrRedirect } from '../utils/auth';
import CargaBarras from '../Components/elementos/CargaBarras';
import Swal from 'sweetalert2';

const Analisis=()=> {
    const [analisis, setAnalisis] = useState([]);
    const [analisisSeleccionado, setAnalisisSeleccionado] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    // Obtener token
    useEffect(() => {
        const tk = requireTokenOrRedirect();
        setToken(tk);
    }, []);

    // Fetch analisis
    useEffect(() => {
        if (!token) return;

        const fetchAnalisis = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`${apiUrl}/analisis`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.status === 401) {
                    setError('Sesión expirada, redirigiendo…');
                    setTimeout(() => (window.location.href = '/'), 1500);
                    return;
                }

                if (!response.ok) {
                    throw new Error('Error al obtener análisis');
                }

                const data = await response.json();
                const analisisList = Array.isArray(data.analisysList) ? data.analisysList : [];
                setAnalisis(analisisList);
                
                // Seleccionar el primer análisis por defecto
                if (analisisList.length > 0) {
                    setAnalisisSeleccionado(analisisList[0]);
                }
            } catch (err) {
                setError(err.message || 'Error al obtener análisis');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalisis();
    }, [apiUrl, token]);

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
                            'Authorization': `Bearer ${token}`
                        };
                        const response = await fetch(`${apiUrl}/analisis/${AnalisisId}`, {
                            method: 'DELETE',
                            headers
                        });
                        if (!response.ok) {
                            throw new Error('Error al borrar análisis');
                        }
                        
                        // Actualizar el estado local
                        setAnalisis(prev => {
                            const nuevaLista = prev.filter(analisis => analisis._id !== AnalisisId);
                            // Si el análisis eliminado era el seleccionado, seleccionar el primero de la nueva lista
                            if (analisisSeleccionado?._id === AnalisisId) {
                                setAnalisisSeleccionado(nuevaLista.length > 0 ? nuevaLista[0] : null);
                            }
                            return nuevaLista;
                        });
                        
                        swalWithBootstrapButtons.fire({
                            title: "Borrado Exitosamente!",
                            text: "El análisis ha sido borrado correctamente",
                            icon: "success",
                            timer : 1300,
                            showConfirmButton: false
                        });
                    } catch (error) {
                        swalWithBootstrapButtons.fire({
                            title: "Error!",
                            text: "No se pudo borrar el Análisis",
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
    
    // Manejar cuando se agrega un nuevo análisis
    const handleAnalisisCreated = (nuevoAnalisis) => {
        setAnalisis(prev => {
            const nuevaLista = [...prev, nuevoAnalisis];
            // Si no hay análisis seleccionado, seleccionar el nuevo
            if (!analisisSeleccionado) {
                setAnalisisSeleccionado(nuevoAnalisis);
            }
            return nuevaLista;
        });
    };

    // Vista de carga
    if (loading) {
        return (
            <div className="scale-up-ver-center">
                <br />
                <CargaBarras />
            </div>
        );
    }

    // Vista de error
    if (error) {
        return <div className='error'>{error}</div>;
    }

    return (
        <div>
            <p className='titulo'>Analisis</p>
                <div className='buscador'>
                    <button className='btn-agregar' onClick={() => setModalAbierto(true)}>+Agregar</button>
                    {modalAbierto && (
                        <ModalAnalisis 
                            onClose={() => setModalAbierto(false)} 
                            onAnalisisCreated={handleAnalisisCreated}
                        />
                    )}
                    <SearchBar/>
                </div>
            <div className='analisis'>
                <div className='contenedor_pedidos'>
                        <div className='scale-up-ver-center'>
                            <div className='caja_1'>
                                <h1 className='titulo'>Pruebas</h1>
                                    {analisis.map((analisisItem) => (
                                        <div 
                                            key={analisisItem._id} 
                                            className={`prueba_tabla ${analisisSeleccionado?._id === analisisItem._id ? 'seleccionado' : ''}`}
                                            onClick={() => setAnalisisSeleccionado(analisisItem)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className='icono'>
                                                <img className='imagen-prueba' src="/prueba-de-sangre.png" alt="prueba imagen" />
                                            </div>
                                            <p className='prueba-name'>{analisisItem.nombre}</p> 
                                            <div className='margen'>
                                                <Link to='/Editar-Analisis'>
                                                    <img src="/ajustes.png" alt="ajustes" className='iconos' />
                                                </Link>
                                                <img src="/basura.png" alt="editar" className='iconos' onClick={(e) => {
                                                    e.stopPropagation(); // Prevenir que se seleccione al hacer clic en eliminar
                                                    handleAlert(analisisItem._id);
                                                }}/>
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
                            {analisisSeleccionado ? (
                                <>
                                    <p className='detall-tex'>{analisisSeleccionado.nombre}</p>
                                    <h2 className='prueba-name'>Titulo</h2>
                                    <p className='detall-tex'>${analisisSeleccionado.costo} pesos</p>
                                    <h2 className='prueba-name'>Costos</h2>
                                    <p className='detall-tex'>{analisisSeleccionado.diasEspera} dias</p>
                                    <h2 className='prueba-name'>Dias de espera</h2>
                                    <h2 className='prueba-name'>Descripcion</h2>
                                    <p className='descr-tex'>
                                        {analisisSeleccionado.descripcion}
                                    </p>
                                </>
                            ) : (
                                <p className='detall-tex'>Selecciona un análisis para ver sus detalles</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analisis;
