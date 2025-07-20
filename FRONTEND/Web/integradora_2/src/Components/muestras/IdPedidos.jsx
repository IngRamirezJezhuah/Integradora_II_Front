// src/components/pedidos/IdPedidos.jsx
import { useEffect, useState } from "react";
import { requireTokenOrRedirect } from "../../utils/auth";
import CargaBarras from "../elementos/CargaBarras";

const IdPedidos = ({ userSeleccionado, tipoMuestra, seleccionado, onSelect }) => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = requireTokenOrRedirect();

    useEffect(() => {
        if (!token) return;
        const fetchPedidos = async () => {
            try {
                const res = await fetch(`${apiUrl}/pedidos/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) throw new Error("Error al obtener pedidos");
                const { data } = await res.json();
                setPedidos(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPedidos();
    }, [apiUrl, token]);

    if (loading) return <CargaBarras />;
    if (error) return <p className="error">{error}</p>;

    // --- Filtro principal ---
    const pedidosFiltrados = pedidos.filter((p) => {
        const idUsuarioPedido = typeof p.idusuario === "object" ? p.idusuario._id : p.idusuario;
        const tipo = p.tipoMuestra || p.muestras?.[0]?.tipoMuestra || "";

        return (
            idUsuarioPedido === userSeleccionado?._id &&
            tipo.toLowerCase() === tipoMuestra?.toLowerCase()
        );
    });

    // --- Debug Console ---
    
    return (
        <select value={seleccionado} onChange={(e) => onSelect(e.target.value)}>
            <option value="">-- Selecciona un pedido --</option>
            {pedidosFiltrados.map((p) => (
                <option key={p._id} value={p._id}>
                    {p._id.slice(-6).toUpperCase()} · {p.analisis?.[0]?.nombre || "Sin análisis"}
                    {" - "}
                    {p.nombrePaciente || p.idusuario?.nombre}
                </option>
            ))}
        </select>
    );
};

export default IdPedidos;
