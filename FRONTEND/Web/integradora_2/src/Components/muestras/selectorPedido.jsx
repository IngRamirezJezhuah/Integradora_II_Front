//import CargaBarras from '../elementos/CargaBarras';
//import { requireTokenOrRedirect } from '../../utils/auth';
import React, { useEffect, useState } from 'react';

const SelectorPedidos = ({ token, apiUrl, onSeleccionarPedido }) => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

    useEffect(() => {
        if (!token) return;

        const fetchPedidos = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("API URL:", apiUrl);
                const res = await fetch(`${apiUrl}/pedidos/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.status === 401) {
                    setError('Sesión expirada redirigiendo...');
                    setTimeout(() => (window.location.href = '/'), 1500);
                    return;
                }

                if (!res.ok) throw new Error('Error al obtener pedidos');

                const { data } = await res.json();
                setPedidos(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message || 'Error al obtener pedidos');
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, [apiUrl, token]);

    const handleSeleccionar = (pedido) => {
        setPedidoSeleccionado(pedido._id);
        onSeleccionarPedido(pedido);
    };

    if (loading) return <p>Cargando pedidos...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!pedidos.length) return <p>No hay pedidos disponibles</p>;

    return (
        <div>
            <h3>Selecciona un pedido</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {pedidos.map((pedido) => (
                    <li
                        key={pedido._id}
                        onClick={() => handleSeleccionar(pedido)}
                        style={{
                            padding: '10px',
                            marginBottom: '5px',
                            border: '1px solid #ccc',
                            cursor: 'pointer',
                            backgroundColor: pedidoSeleccionado === pedido._id ? '#cceeff' : '#fff',
                        }}
                    >
                        <strong>ID:</strong> {pedido._id.slice(-6).toUpperCase()} <br />
                        <strong>Paciente:</strong> {pedido.paciente?.nombre || 'Sin nombre'} <br />
                        <strong>Status:</strong> {pedido.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SelectorPedidos;
