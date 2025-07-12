import { useState } from "react";
import PacientesAlta from "../pacientes/PacientesAlta"
import DetallesPacienteAlta from "../pacientes/DetallesPacienteAlta";
import FormsPedidos from "./FormsPedidos";



const ModalPedidos = ({onClose}) => {
    const [pasoActual, setPasoActual] = useState(1);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [tipoPruebaSeleccionado, setTipoPruebaSeleccionado] = useState(null);
    


    const avanzarPaso = () => setPasoActual(prev => prev + 1);
    const retrocederPaso = () => setPasoActual(prev => prev - 1);

    
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
                        onClick={paciente => {setPacienteSeleccionado(paciente); avanzarPaso();}} 
                        disabled={!pacienteSeleccionado}
                        >Siguiente</button>
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
                        onClick={tipo => {setTipoPruebaSeleccionado(tipo); avanzarPaso();}} 
                        disabled={!tipoPruebaSeleccionado}
                        >Siguiente</button>
                        <button className="btn" onClick={retrocederPaso}>
                            Regresar
                        </button>
                    </div>
                </div>
            )}
            {pasoActual === 3 && (
                <div className="scale-in-hor-center">
                    <div className="modal-content">
                        <p className='titulo'>Registrar Pedido</p>
                        <button className="close-btn" onClick={onClose}>x</button>
                            <div>
                            <FormsPedidos/>
                            </div>
                        <button className="btn" onClick={retrocederPaso}>
                            Regresar
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalPedidos
