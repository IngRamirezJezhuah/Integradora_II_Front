import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

const Component=() => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [showMenu,setShowMenu] = useState(true);
    const isActive = (path) => location.pathname === path;
    const apiUrl = process.env.REACT_APP_API_URL;

    function handleAlert() {
    const swal = Swal.mixin({
        customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        },
        buttonsStyling: false,
    });

    swal
        .fire({
        title: '¿Estás seguro de salir?',
        text: 'Tendrás que iniciar sesión de nuevo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'No, quedarme',
        reverseButtons: true,
        })
        .then(async (result) => {
        if (!result.isConfirmed) return;

        await handleLogout();                 // 1) petición al backend
        swal.fire({
            title: '¡Hasta luego!',
            text: 'Redirigiendo al inicio de sesión…',
            icon: 'success',
            timer: 1000,
            showConfirmButton: false,
        });
        navigate('/', { replace: true });     // 2) redirige
        });
    }

    const HandleMenuDinamico = () => setShowMenu(!showMenu) ;
    
    const [img] = useState({
        name: 'Niki de Saint Phalle',
        image: '/dash.png',
    });
    /* ——— LOGOUT ——— */
    const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
        await fetch(`${apiUrl}/usuarios/logout`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        });
    } catch (err) {
        console.error('Error al cerrar sesión', err);
        // aquí podrías mostrar un toast, pero no bloquees el logout local
    } finally {
        localStorage.removeItem('token');  // limpia token en cualquier caso
    }
    };

    
    
    return (
        <section className='contenedor'>
            {location.pathname === '/'}
            <div className='tabNavigator'>
                <div className={`sidebar ${showMenu ? 'sidebar-open' : 'sidebar-closed'}`}>
                    <img className='menu' src="/logo-iic.png" alt='icon-menu' onClick={HandleMenuDinamico}/>
                    <nav className="nav">
                        
                        <div className="nav-link">
                            <li className={`bordes ${isActive('/') ? 'active' : ''}`}>
                                <div className='inicial-circulo'>
                                    <img
                                    src={img.image}
                                    alt={img.name}
                                    className='iconos'
                                    />
                                </div>
                                <div className='dropdown'>
                                    <div className='dropdown'>
                                    {showMenu && <span className='bordes'> Perfil</span>}
                                    </div>
                                    <div className='dropdown-content'>
                                        <Link to={'/Perfil'} className="paciente-link">
                                        <p>Ver Pedidos</p>
                                        </Link>
                                        <Link to={'/EditarInfoPaciente'} className="paciente-link">
                                        <p>Editar info</p>
                                        </Link>
                                    </div>  
                                </div>
                            </li>
                        </div>
                        
                        <Link to="/Dashboard" className="nav-link">
                            <li className={`bordes ${isActive('/Dashboard') ? 'active' : ''}`}>
                                <img className='iconos' src="/dash.png" alt="" />
                                {showMenu && <span className='bordes'> Dashboard</span>}
                            </li>
                        </Link>
                        <Link to="/Pacientes" className="nav-link">
                            <li className={`bordes ${isActive('/Pacientes') ? 'active' : ''}`}>
                                <img className='iconos' src="/usuario.png" alt="" />
                                {showMenu &&<span className='bordes'>Pacientes</span>}
                            </li>
                        </Link>
                        <Link to="/Pedidos" className="nav-link">
                            <li className={`bordes ${isActive('/Pedidos') ? 'active' : ''}`}>
                                <img className='iconos' src="/pedido.png" alt="" />
                                {showMenu && <span className='bordes'>Pedido</span>}
                            </li>
                        </Link>
                        <Link to="/Muestras" className="nav-link">
                            <li className={`bordes ${isActive('/Muestras') ? 'active' : ''}`}>
                                <img className='iconos' src="/muestras.png" alt="" />
                                {showMenu && <span className='bordes'>Muestras</span>}
                            </li>
                        </Link>
                        <Link to="/Analisis" className="nav-link">
                            <li className={`bordes ${isActive('/Analisis') ? 'active' : ''}`}>
                                <img className='iconos' src="/analisis.png" alt="" />
                                {showMenu && <span className='bordes'>Análisis</span>}
                            </li>
                        </Link>
                        <Link className="nav-link" onClick={handleAlert}>
                            <li className="bordes" onClick={handleAlert}>
                                <img className="iconos" src="/salida.png" alt="Salir" />
                                {showMenu && <span className="bordes">Salir</span>}
                            </li>
                        </Link>
                    </nav>
                </div>
                    
                <section className={`plantilla ${showMenu ? 'content-expanded' : 'content-collapsed'}`}>
                    <Outlet />
                </section>
                
            </div>
        </section>
    )
}

export default Component;