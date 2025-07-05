import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard';
import Swal from 'sweetalert2';

const Component=() => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const [showMenu,setShowMenu] = useState(true);
    const isActive = (path) => location.pathname === path;

    function handleAlert(e) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Estas Seguro de Salir?",
                text: "Tendras que iniciar sesion nuevamente!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, Salir!",
                cancelButtonText: "No, Quedarme!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "Bye bye ( >v°)!",
                        text: "Redirigiendo a la pagina de inicio de sesion...",
                        icon: "success"
                    }).then(() => {
                        navigate('/login'); 
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {}
            })
                
        }
    const HandleMenuDinamico = () => setShowMenu(!showMenu) ;
    
    const [img] = useState({
        name: 'Niki de Saint Phalle',
        image: '/dash.png',
    });
    
    
    return (
        <section className='contenedor'>
            <div className='tabNavigator'>
                <div className={`sidebar ${showMenu ? 'sidebar-open' : 'sidebar-closed'}`}>
                    <img className='menu' src="/logo-iic.png" alt='icon-menu' onClick={HandleMenuDinamico}/>
                    <nav className="nav">
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
                            <li className={`bordes ${isActive('/login') ? 'active' : ''}`}>
                                <img className='iconos' src="/salida.png" alt="Salir" />
                                {showMenu && <span className='bordes'>Salir</span>}
                            </li>
                        </Link>
                    </nav>
                </div>
                <section className={`plantilla ${showMenu ? 'content-expanded' : 'content-collapsed'}`}>
                    {location.pathname === '/' ? (
                        <Dashboard />
                    ) : (<Outlet />)}
                </section>
                    <div className='perfil'>
                        <p>perfil</p>
                        <div className='inicial-circulo'>
                            <img
                            src={img.image}
                            alt={img.name}
                            />
                        </div>
                    </div>
            </div>
        </section>
    )
}

export default Component;
/*
<section className='contenedor' >
            <div className='tabNavigator'>
                    <img className='menu' src="/logo-iic.png" alt='icon-menu' onClick={HandleMenuDinamico}/>
                    <nav className='nav'>
                        
                        <Link to="/Dashboard">
                            <li className='textbarra'>Dashboard</li>
                            <li className={`bordes ${isActive('/Dashboard') ? 'active' : ''}`}><img src="/dash.png" alt="" /></li>
                        </Link>
                        <Link to="/Pacientes">
                            <li className='textbarra'>Pacientes</li>
                            <li className={`bordes ${isActive('/Pacientes') ? 'active' : ''}`}><img src="/usuario.png" alt="" /></li>
                        </Link>
                        <Link to="/Pedidos">
                            <li className='textbarra'>Pedido</li>
                            <li className={`bordes ${isActive('/Pedidos') ? 'active' : ''}`}><img src="/pedido.png" alt="" /></li>
                        </Link>
                        <Link to="/Muestras">
                            <li className='textbarra'>Muestras</li>
                            <li className={`bordes ${isActive('/Muestras') ? 'active' : ''}`}><img src="/muestras.png" alt="" /></li>
                        </Link>
                        <Link to="/Analisis">
                            <li className='textbarra'>analisis</li>
                            <li className={`bordes ${isActive('/Analisis') ? 'active' : ''}`}><img src="/analisis.png" alt="" /></li>
                        </Link>
                        <Link to='/login'>
                            <div className='cerrar-sesion'>
                                <li className="bordes"><img src="/salida.png" alt="" /></li>
                            </div>
                        </Link>
                    </nav>
                    <div className={`sidebar ${showMenu ? 'sidebar-open' : 'sidebar-closed'}`}>
                        
                </div>
                    <section className='plantilla'>
                        {location.pathname === '/' ? (
                            <Dashboard />
                        ) : (<Outlet/>)}
                    </section>  
            </div>
        </section>                  
*/