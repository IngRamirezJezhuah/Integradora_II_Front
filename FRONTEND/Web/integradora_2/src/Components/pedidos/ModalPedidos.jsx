import { useState } from "react";
import PacientesAlta from "../pacientes/PacientesAlta"
import DetallesPacienteAlta from "../pacientes/DetallesPacienteAlta";
import FormBiometrica from "./FormBiometrica";
import FormSanguinea from "./FormSanguinea";
import { FromMuesBiometira } from "..";
import { FormMuesSangre } from "..";
import { requireTokenOrRedirect } from "../../utils/auth";
import CargaBarras from "../elementos/CargaBarras";

/* ——— helper interno ——— */
const QS_ID = "686e0163fd380d4018dddcde";
const BH_ID = "686734c0dbf9fa679be0958c";

const ModalPedidos = ({onClose}) => {
    const [pasoActual, setPasoActual] = useState(1);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [tipoPruebaSeleccionado, setTipoPruebaSeleccionado] = useState(null);
    
    const [/*pedidoId*/,  setPedidoId]  = useState(null); 
    const [muestraId, setMuestraId] = useState(null); 
    
    const avanzarPaso = () => setPasoActual(prev => prev + 1);
    const retrocederPaso = () => setPasoActual(prev => prev - 1);

    /**  POST /muestras   (genera “muestra vacía”) */
    const crearMuestraBase = async (paciente, tipo, pedidoId) => {
        const token = requireTokenOrRedirect();
        const apiUrl = process.env.REACT_APP_API_URL;

        const body = {
        observaciones: "",
        nombrePaciente: paciente?.nombre || "-",
        idusuario: paciente?._id,
        tipoMuestra: tipo === BH_ID ? "biometriaHematica" : "quimicaSanguinea",
        pedidoId,
        };

        const res = await fetch(`${apiUrl}/muestras`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error("No se pudo crear la muestra");

        const { _id } = await res.json(); // ajusta según tu backend
        return _id;
    };

    /* ---------- paso 3: formulario de pedido ---------- */
    const renderFormPedido = () => {
        /** callback común: 1) guarda pedido  2) crea muestra  3) pasa a paso 4 */
        const handleSuccess = async (nuevoPedidoId) => {
        try {
            setPedidoId(nuevoPedidoId);
            const id = await crearMuestraBase(
            pacienteSeleccionado,
            tipoPruebaSeleccionado,
            nuevoPedidoId
            );
            setMuestraId(id);
            avanzarPaso();
        } catch (err) {
            alert(err.message);
        }
        };

        const commonProps = {
        fixedUserId: pacienteSeleccionado,
        onSuccess: handleSuccess,
        };

        switch (tipoPruebaSeleccionado) {
        case BH_ID:
            return <FormBiometrica {...commonProps} />;
        case QS_ID:
            return <FormSanguinea {...commonProps} />;
        default:
            return <p>Selecciona una prueba válida</p>;
        }
    };

    /* ---------- paso 4: formulario de resultados ---------- */
    const renderFormResultados = () => {
        if (!muestraId) {
        return (
            <div className="scale-up-ver-center">
            <CargaBarras className="plantilla" />
            </div>
        );
        }

        switch (tipoPruebaSeleccionado) {
        case BH_ID:
            return (
            <FromMuesBiometira
                muestraId={muestraId}
                onSuccess={onClose}
            />
            );
        case QS_ID:
            return (
            <FormMuesSangre
                muestraId={muestraId}
                onSuccess={onClose}
            />
            );
        default:
            return <p>Selecciona una prueba válida</p>;
        }
    };
    return(
        <div className="modal-overlay">
            {pasoActual === 1 && (
                
                <div className="scale-in-hor-center">
                    <div className="modal-content">
                        <p className='titulo'>Registrar Pedido</p>
                        <button className="close-btn" onClick={onClose}>x</button>
                        <p>Selecione el paciente:</p>
                        <PacientesAlta seleccionado={pacienteSeleccionado} onSelect={id => setPacienteSeleccionado(id)}/>
                        <button className="btn" 
                            onClick={avanzarPaso} 
                        disabled={!pacienteSeleccionado}
                        >Siguiente</button>{/*onClick={paciente => {setPacienteSeleccionado(paciente); avanzarPaso();}} */} 
                    </div>
                </div>
            )}
            {/* Paso 2: Selección de tipo de prueba */}
            {pasoActual === 2 && (
                <div className="scale-in-hor-center">
                    <div className="modal-content">
                        <p className='titulo'>Registrar Pedido</p>
                        
                        <button className="close-btn" onClick={onClose}>x</button>
                        <p>Selecione el tipo de prueba:</p>
                        
                        <DetallesPacienteAlta seleccionado={tipoPruebaSeleccionado} onSelect={prueba => setTipoPruebaSeleccionado(prueba)}/>
                        
                        <button className="btn"
                        onClick={avanzarPaso} 
                        disabled={!tipoPruebaSeleccionado}
                        >Siguiente</button>{/*onClick={tipo => {setTipoPruebaSeleccionado(tipo); avanzarPaso();}}  */}
                        
                        <button className="btn" onClick={retrocederPaso}>Regresar</button>
                    </div>
                </div>
            )}
            {pasoActual === 3 && (
            <div className="scale-in-hor-center">
            <div className="modal-content">
                <p className="titulo">Registrar Pedido</p>
                <button className="close-btn" onClick={onClose}>
                x
                </button>

                {renderFormPedido()}

                <button className="btn" onClick={retrocederPaso}>
                Regresar
                </button>
            </div>
            </div>
        )}

        {/* Paso 4 */}
        {pasoActual === 4 && (
            <div className="modal-content scale-in-hor-center">
            <p className="titulo">Registrar Resultados</p>
            {renderFormResultados()}
            </div>
        )}
        </div>
    )
}

export default ModalPedidos

/*
{pasoActual === 3 && (
<div className="scale-in-hor-center">
    <div className="modal-content">
    <p className="titulo">Registrar Pedido</p>
    <button className="close-btn" onClick={onClose}>x</button>
    <button className="btn" onClick={retrocederPaso}>Regresar</button>
    </div>
</div>
)}
{pasoActual === 4 && (
    <div>
        <p className="titulo">Registrar pedidos</p>
        {RenderFormMuestra()}
    </div>
)}
{pasoActual === 3 && (
    
)}
<div className="scale-in-hor-center">
    <div className="modal-content">
        <p className='titulo'>Registrar Pedido</p>
        <button className="close-btn" onClick={onClose}>x</button>
            <div>
            {
            <FormsPedidos/> 
            <FormBiometrica/>
            
            <FormSanguinea />;
            </div>
        <button className="btn" onClick={retrocederPaso}>
            Regresar
        </button>
    </div>
</div>
     */