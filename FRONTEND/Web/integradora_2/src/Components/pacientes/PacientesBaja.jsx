import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { requireTokenOrRedirect } from "../../utils/auth";
import CargaBarras from '../elementos/CargaBarras';


const PacientesBaja = () => {   
    const [pacientes,setPacientes] = useState([]);
    const [error, setError] = useState(null);
    const [loading,setLoading] = useState(null);
    const [token, setToken ] = useState(null);
    // const [setRawResponse] = useState(null);
    const apiUrl = process.env.REACT_APP_API_URL

    useEffect( () => {
        const tk = requireTokenOrRedirect();
        setToken(tk);
    }, []);

    useEffect(() => {
        if (!token) return;
        const fetchPacientes = async () => {
            setLoading(true);
            setError(null);
            try{
                console.log("API URL", apiUrl);
                console.log("TOKEN", token);
                const headers ={
                    'Content-Type':'application/json',
                    'Authorization':`Bearer ${token}`,
                };
                const response = await fetch(`${apiUrl}/usuarios`,{
                    method:'GET',
                    headers
                });
                const text = await response.text();
                if (response.status === 401) {
                    setError('Sesion expirada, redirigiendo...');
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1500);
                    return;
                }
                if (!response.ok) {
                    throw new Error('Error al obtener pacientes');
                }
                const dataUsr = JSON.parse(text);
                setPacientes(Array.isArray(dataUsr) ? dataUsr : (dataUsr.usuarios|| []));
            } catch (error){
                setError('Error al obtener pacientes');
            } finally{
                setLoading(false)
            }
        };
        fetchPacientes();
    }, [apiUrl, token]);
    
    function handleAlert(pacienteId) {
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
                    const response = await fetch(`http://vps-5127231-x.dattaweb.com:3500/usuarios/${pacienteId}`, {
                        method: 'DELETE',
                        headers
                    });
                    if (!response.ok) {
                        throw new Error('Error al borrar paciente');
                    }
                    // Actualiza la lista localmente quitando el paciente borrado
                    setPacientes(prev => prev.filter(p => p._id !== pacienteId));
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
                        text: "No se pudo borrar el paciente",
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

    const pacientesFiltrados = pacientes.filter(
        p => p.status === false || p.status === 'false'
    );
    if (loading) return (
        <div className='scale-up-ver-center'>
            <div className='caja_1'>
                <div className='margen'>
                    <br />
                    <br />
                    <CargaBarras />
                </div>
            </div>
        </div>
        );

    if (error) return <div>{error}</div>;
    return(
        <div className='caja_1'>
            <div className='scroll'>
                {/*
                esto es para ver si funciona correctamente
                <div>
                    <h3>Respuesta cruda del backend:</h3>
                    <pre>{rawResponse}</pre>
                    <h3>Pacientes parseados:</h3>
                    <pre>{JSON.stringify(pacientes, null, 2)}</pre>
                </div>
                */}
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
                                    <img src="/basura.png" alt="borrar" className='icono-borrar' onClick={() => handleAlert(paciente._id)}/>
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