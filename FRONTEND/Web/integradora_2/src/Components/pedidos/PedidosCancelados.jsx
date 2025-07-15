import { useEffect, useState } from "react";
import CargaBarras from "../elementos/CargaBarras";
import { requireTokenOrRedirect } from "../../utils/auth";

const PedidosCancelados = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]   = useState(null);
    const token  = requireTokenOrRedirect();
    const apiUrl = process.env.REACT_APP_API_URL;

    /* ——— FETCH ——— */
    useEffect(() => {
        if (!token) return;
        const fetchPedidos = async () => {
        try{
            const res = await fetch(`${apiUrl}/pedidos`,{
            headers:{ "Content-Type":"application/json", Authorization:`Bearer ${token}` }
            });
            if(!res.ok) throw new Error("Error al obtener pedidos");
            const { pedidosList = [] , data = [] } = await res.json();   // por si tu backend retorna otra llave
            const lista = pedidosList.length ? pedidosList : data;
            setPedidos(lista.filter(p => p.estado === 'cancelado' || p.estado === "Cancelado"));
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
        };
        fetchPedidos();
    },[apiUrl, token]);

    /* ——— AGRUPADOR DE 3 ——— */
    const agrupar = (arr, tam = 3) =>
        arr.reduce((rows, itm, i) => {
        const r = Math.floor(i / tam);
        rows[r] = [...(rows[r] || []), itm];
        return rows;
        }, []);

    /* ——— RENDER ——— */
    if (loading) return <CargaBarras />;
    if (error)   return <p className="error">{error}</p>;

    return (
        <div className="scroll_pruebas">
        {pedidos.length === 0 && 
        <div className="fila3">
            <div className="caja_1">
                <br /><br /><br /><br /><br /><br />
                <p className="centrar">No hay pedidos cancelados.</p>
            </div>
        </div>
        }

        {agrupar(pedidos).map((fila, i) => (
            <div key={i} className="fila3">
            {fila.map((p) => (
                <div key={p._id} className="caja_pedidos">
                <div className="titulo">
                    <img src="/quimica.png" alt="icon" className="imgMuestra" />
                </div>

                <p className="centrar">{p._id.slice(-6).toUpperCase()}</p>
                {/* primer nombre de muestra si existe */}
                <p className="texto_pedidos">
                    Estado: { p.estado|| "--"}
                </p>
                {/* nombre cliente si lo traes poblado */}
                <p className="texto_pedidos">
                    {p.usuarioId?.nombre
                    ? `${p.usuarioId.nombre} ${p.usuarioId.apellidoPaterno || ""}`
                    : "--"}
                </p>
                </div>
            ))}
            </div>
        ))}
        </div>
    );
};

export default PedidosCancelados;
