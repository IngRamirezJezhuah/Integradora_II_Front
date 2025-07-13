import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import ReciboPedidos from './ReciboPedidos';
import { requireTokenOrRedirect } from '../../utils/auth';
import CargaBarras from '../elementos/CargaBarras';

const ListaPedidos = () => {
    const [pedidos, setPedidos] = useState([])
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)
    const [modalAbierto, setModalAbierto] = useState(null)
    const [token, setToken] = useState(null)
    const apiUrl = process.env.REACT_APP_API_URL

    /*________________obtener token________________*/
    useEffect(() => {
        const tk = requireTokenOrRedirect();
        setToken(tk);
    }, []);

    /*__________________Peticion a pedidos__________________*/
    useEffect(() => {
        if (!token) return;
        const fecthPedidos = async () => {
            setLoading(true);
            setError(null);
            try{
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer $(token)`,
                };
                const res = await fetch(`${apiUrl}/pedidos`, { method: 'GET',headers});
                const raw = await res.text();
                if (res.status===401) {
                    setError('sesion expirada, redirigiendo ...');
                    setTimeout(() => {window.location.href = '/'}, 1500 );//1500
                    return;
                }
                if (!res.ok) throw new Error("Error al obtener pedidos");
                const parsed = JSON.parse(raw);
                setPedidos(Array.isArray(parsed.data)? parsed.data : []);
            } catch (err){
                setError(err.message||'Error al obtener pedido');
            } finally {
                setLoading(false);
            }
        };
        fecthPedidos();
    }, [apiUrl,token]);

    /*_____________________Borrar pedido __________________*/
    //sweet alert
    function handleAlert(pedidoId) {
        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
        });
            swalWithBootstrapButtons.fire({
            title: "¿Estas deguro de borrarlo?",
            text: "!No podras revertirlo una vez lo borres¡",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Si, borralo!",
            cancelButtonText: "No, cancelar!",
            reverseButtons: true
        }).then(async (result) => {
            if (!result.isConfirmed || !token) return;
            try {
                setLoading(true);
                const headers ={
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                };
                const res = await fetch(`${apiUrl}/pedidos/`,{
                    method:'DELETE',
                    headers,
                    body: JSON.stringify({ status:false}),
                });
                if (!res.ok) throw new Error();
                setPedidos((prev) => prev.filter((p) => p._id));
                /*___________Aqui empieza el estilo de swal_____________ */
                swalWithBootstrapButtons.fire({
                title: "!Borrado Exitosamente¡",
                text: "Tu pedido ha sido borrado correctamente",
                icon: "success",
                timer : 1300,
                showConfirmButton: false
                });
            } catch {
                swalWithBootstrapButtons.fire({
                    title: "!Cancelado!",
                    text: "Regresando a la pagina",
                    icon: "success",
                    timer : 1000,
                    showConfirmButton: false
                });
            }finally {
                setLoading(false);
            }
        });
    }
    
    /*function dividirEnFilas(data, tam) {
        const filas = [];
        for (let i = 0; i < data.length; i += tam) {
            filas.push(data.slice(i, i + tam));
        } return filas;
    }
    const filas = dividirEnFilas(pedidos, 3);*/
    /* ──────────────────── coso para acomodar 3 por fila──────────────────── */
    const agrupar = (arr, tam = 3) =>
        arr.reduce((rows, item, idx) => {
        const rowIdx = Math.floor(idx / tam);
        rows[rowIdx] = [...(rows[rowIdx] || []), item];
        return rows;
        }, []);
    /* ──────────────────── vista de cargando ──────────────────── */
    if (loading)
    return (
        <div className='scale-up-ver-center'>
        <div className='caja_1 margen'>
            <br />
            <CargaBarras />
        </div>
        </div>
    );
    if (error) return <div className='error'>{error}</div>;

    return (
        <div className='scroll_pruebas'>
            {agrupar(pedidos).map((fila, i) => ( 
                <div key={i} className='fila'> {/*Primer .map(): recorre cada fila de pedidos (es decir, cada array de 3 pedidos) i es el índice de la fila. */}
                {fila.map((p, j) => (
                    <div key={j} className='caja_pedidos'>{/*Segundo .map(): recorre cada pedido individual dentro de esa fila ,j es el índice dentro de la fila. */}
                        <div className='titulo'>{/*key={i} y key={j} son importantes en React para que sepa cómo actualizar el DOM eficientemente. */}
                            <img src="/quimica.png" alt="química" className='imgMuestra' />
                        </div>
                        <h1 className='centrar'>{p.id.slice(-6).toUpperCase()}</h1>
                        <p className='texto'>{p.analisis?.[0]?.nombre || '--'}</p>
                        {/*esta madre no supe hacerla se la pedi a chat segun el id que tienes agarra el dato y te lo muestra ya que es lista*/}
                        <p className='texto'>
                            {/*p.paciente*/}
                            {`${p.usuarioId?.nombre} ${p.usuarioId?.apellidoPaterno} ${p.usuarioId?.apellidoMaterno}`}
                        </p>
                        <div className='margen'>
                            <img src="/editar.png" alt="editar" className='iconos'  onClick={() => setModalAbierto(true)} />
                            <Link to='/Analisis'>
                                <img src="/detalles.png" alt="detalles" className='iconos' />
                            </Link>
                                <img src="/basura.png" alt="detalles" className='iconos' onClick={handleAlert(p._id)}/>
                        </div>
                    </div>
                ))}
                </div>
            ))}
            {modalAbierto && <ReciboPedidos onClose={() => setModalAbierto(false)} />}
        
        </div>
    );
};

export default ListaPedidos
