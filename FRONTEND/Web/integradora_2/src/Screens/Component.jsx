import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Component = () => {
  const [activePage, setActivePage] = useState('Dashboard');

  const menuItems = [
    { path: '/Dashboard', icon: '/dash.png', label: 'Dashboard' },
    { path: '/Pacientes', icon: '/usuario.png', label: 'Paciente' },
    { path: '/Pedidos', icon: '/pedido.png', label: 'Pedidos' },
    { path: '/Muestras', icon: '/muestras.png', label: 'Muestras' },
    { path: '/Analisis', icon: '/analisis.png', label: 'Analisis' },
  ];

  return (
    <>
      <style>
        {`
          .container {
            display: flex;
            height: 100vh;
            width: 100vw;
          }
          .sidebar {
            width: 6rem;
            background-color: #ff4242;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 1.25rem;
            padding-bottom: 1.25rem;
            justify-content: space-between;
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            transition: transform 0.3s ease-in-out;
          }
          .sidebar.collapsed {
            transform: translateX(-100%);
          }
          .nav {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            align-items: center;
            width: 100%;
          }
          .nav-link {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #333;
            text-decoration: none;
            font-size: 0.75rem;
            position: relative;
            width: 100%;
          }
          .nav-link img {
            width: 2rem;
            height: 2rem;
            z-index: 2;
          }
          .nav-link span {
            margin-top: 0.25rem;
            z-index: 2;
          }
          .nav-link .active-bg {
            position: absolute;
            top: -1rem;
            left: 50%;
            transform: translateX(-50%);
            width: 5rem;
            height: 4rem;
            background-color: #ff837e;
            border-radius: 15px;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            color : white;
          }
          .logout-btn {
            margin-bottom: 1.25rem;
            cursor: pointer;
          }
          .logout-btn img {
            width: 2.5rem;
            height: 2.5rem;
          }
          .content {
            flex: 1;
            margin-left: 5rem;
            padding: 1.25rem;
            width: calc(100% - 5rem);
            transition: margin-left 0.3s ease-in-out;
          }
          @media (max-width: 48rem) { /* ~768px */
            .sidebar {
              width: 4rem;
              transform: translateX(-100%);
            }
            .sidebar.collapsed {
              transform: translateX(0);
            }
            .content {
              margin-left: 0;
            }
            .content.shifted {
              margin-left: 4rem;
            }
          }
        `}
      </style>
      <div className="container">
        <div className="sidebar">
          <nav className="nav">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setActivePage(item.label)}
                className="nav-link"
              >
                {activePage === item.label && <span className="active-bg"></span>}
                <img src={item.icon} alt={item.label} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          <div className="logout-btn">
            <img src="/salida.png" alt="Logout" />
          </div>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Component;