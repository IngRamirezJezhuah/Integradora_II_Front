import React, { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import Dashboard from './Dashboard';
//import styles from './Component.module.css';

const Component=() => {
    const location = useLocation();
    const [showMenu,setShowMenu] = useState(true);
    const isActive = (path) => location.pathname === path;

    const HandleMenuDinamico = () => setShowMenu(!showMenu) ;
    return (
        <section className='contenedor' >
            <div className='tabNavigator'>
                <div>
                    <img className='menu' src="/menu.png" alt='icon-menu' onClick={HandleMenuDinamico}/>
                    {showMenu && (
                    <div className='sidebar'>
                        <Link to="/Dashboard">
                            <li className={`bordes ${isActive('/Dashboard') ? 'active' : ''}`}><img src="/dash.png" alt="" /></li>
                            <li className='textbarra'>Dashboard</li>
                        </Link>
                        <Link to="/Pacientes">
                            <li className={`bordes ${isActive('/Pacientes') ? 'active' : ''}`}><img src="/usuario.png" alt="" /></li>
                        </Link>
                            <li>Pacientes</li>
                        <Link to="/Pedidos">
                            <li className={`bordes ${isActive('/Pedidos') ? 'active' : ''}`}><img src="/pedido.png" alt="" /></li>
                        </Link>
                            <li>Pedido</li>
                        <Link to="/Muestras">
                            <li className={`bordes ${isActive('/Muestras') ? 'active' : ''}`}><img src="/muestras.png" alt="" /></li>
                        </Link>
                            <li>Muestras</li>
                        <Link to="/Analisis">
                            <li className={`bordes ${isActive('/Analisis') ? 'active' : ''}`}><img src="/analisis.png" alt="" /></li>
                        </Link>
                            <li>analisis</li>
                        <Link to='/login'>
                            <div className='cerrar-sesion'>
                                <li className="bordes"><img src="/salida.png" alt="" /></li>
                            </div>
                        </Link>
                    </div>
                    )}
                    
                </div>
                {/* <div className='plantilla'>
                    <Outlet /> 
                    
                    */}
                    <section className='plantilla'>
                        {location.pathname === '/' ? (
                            <Dashboard />
                        ) : (<Outlet/>)}
                    </section>  
            </div>
        </section>
    )
}

export default Component;
