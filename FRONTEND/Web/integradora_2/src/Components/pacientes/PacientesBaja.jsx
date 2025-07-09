import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { requireTokenOrRedirect } from "../../utils/auth";

const PacientesBaja = () => {
    const [pacientes, setPacientes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;
    const [token, setToken] = useState(null);

    useEffect(() => {
        const tk = requireTokenOrRedirect();
        setToken(tk);
    }, []);

    useEffect(() => {
        if (!token) return;
        const fetchPacientes = async () => {
            setLoading(true);
            setError(null);
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };
                const response = await fetch(`${apiUrl}/usuarios`, {
                    method: 'GET',
                    headers
                });
                if (response.status === 401) {
                    setError('Sesión expirada, redirigiendo...');
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                    return;
                }
                if (!response.ok) {
                    throw new Error('Error al obtener pacientes');
                }
                const data = await response.json();
                setPacientes(data.usuarios || []);
            } catch (error) {
                setError('Error al obtener pacientes');
            } finally {
                setLoading(false);
            }
        };
        fetchPacientes();
    }, [apiUrl, token]);

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
                    icon: "success",
                    timer : 1300,
                    showConfirmButton: false
                });
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

    const pacientesFiltrados = pacientes.filter(p => p.status === false);
    if (loading) return <div>Cargando pacientes...</div>;
    if (error) return <div>{error}</div>;
    return (
        <div className='caja_1'>
            <div className='scroll'>
                {pacientesFiltrados.map((paciente, index) => {
                    const nombreCompleto = `${paciente.nombre} ${paciente.apellidoPaterno} ${paciente.apellidoMaterno}`;
                    const inicial = paciente.nombre.charAt(0);
                    return(
                        <div key={paciente._id || index} className='prueba_tabla'>
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
                    )
                })}
            </div>
        </div>
    )
}

export default PacientesBaja