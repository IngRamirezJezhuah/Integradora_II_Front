import { useState } from "react";
import PacientesAlta from "../pacientes/PacientesAlta"
import DetallesPacienteAlta from "../pacientes/DetallesPacienteAlta";
//import FormsPedidos from "./FormsPedidos";
import FormBiometrica from "./FormBiometrica";
import FormSanguinea from "./FormSanguinea";



const ModalPedidos = ({onClose}) => {
    const [pasoActual, setPasoActual] = useState(1);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [tipoPruebaSeleccionado, setTipoPruebaSeleccionado] = useState(null);
    const avanzarPaso = () => setPasoActual(prev => prev + 1);
    const retrocederPaso = () => setPasoActual(prev => prev - 1);

    
    /* ——— helper interno ——— */
    const QS_ID = "686e0163fd380d4018dddcde";
    const BH_ID = "686734c0dbf9fa679be0958c";

    const renderForm = () => {
    switch (tipoPruebaSeleccionado) {
        case BH_ID:
        return <FormBiometrica fixedUserId={pacienteSeleccionado} />;    
        case QS_ID:
        return <FormSanguinea fixedUserId={pacienteSeleccionado} />;    
        default:
        return <p>Selecciona una prueba válida</p>;    
    }    
    };

    /*const renderForm = () => {
    if (tipoPruebaSeleccionado === "bh") {
        return <FormBiometrica fixedUserId={pacienteSeleccionado} />;
    }    
    if (tipoPruebaSeleccionado === "qs") {
        return <FormSanguinea fixedUserId={pacienteSeleccionado} />;
    }    
    return <p>Selecciona una prueba válida</p>;
    };*/


    
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
                        tipos={["Biometría Hemática", "Pruebas de Sangre"]}
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
                <button className="close-btn" onClick={onClose}>x</button>
                {renderForm()}
                <button className="btn" onClick={retrocederPaso}>Regresar</button>
                </div>
            </div>
            )}
        </div>
    )
}

export default ModalPedidos

/*
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