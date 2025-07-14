import React, { useState } from 'react';
import PacientesAlta from '../pacientes/PacientesAlta';
import DetallesPacienteAlta from '../pacientes/DetallesPacienteAlta';
import { FromMuesBiometira } from '..';
import { FormMuesSangre } from '..';

  

const ModalMuestras = ({ onClose, muestraId, analisisIdInicial }) => {
    const [paso, setPaso] = useState(1);
    const [pacienteId, setPacienteId] = useState(null);
    const [analisisId, setAnalisisId] = useState(analisisIdInicial|| null);   // ← guarda ID real
    const QS_ID = "686e0163fd380d4018dddcde";
    const BH_ID = "686734c0dbf9fa679be0958c";

    /* ——— helpers ——— */
    const avanzar     = () => setPaso((p) => p + 1);
    const retroceder  = () => setPaso((p) => p - 1);

    const renderForm = () => {
      switch (analisisId) {
        case BH_ID: return <FromMuesBiometira fixedUserId={pacienteId} muestraId={muestraId}/>;
        case QS_ID: return <FormMuesSangre fixedUserId={pacienteId} muestraId={muestraId}/>;
        default   : return <p>Selecciona un tipo de muestra válido</p>;
      }
    };


  return (
    <div className="modal-overlay">
      <div className="scale-in-hor-center">
        <div className="modal-content">
          <p className="titulo">Registrar nueva muestra</p>
          <button className="close-btn" onClick={onClose}>X</button>
          {/* ——— Paso 1 ——— */}
          {paso === 1 && (
            <>
              <p>Seleccione el paciente:</p>
              <PacientesAlta
                seleccionado={pacienteId}
                onSelect={setPacienteId}
              />
              <button
                className="btn"
                onClick={avanzar}
                disabled={!pacienteId}
              >
                Siguiente
              </button>
            </>
          )}
          {/* ——— Paso 2 ——— */}
          {paso === 2 && (
            <>
              <p>Seleccione el tipo de muestra:</p>
              <DetallesPacienteAlta
                seleccionado={analisisId}
                onSelect={setAnalisisId}
              />
              <button
                className="btn"
                onClick={avanzar}
                disabled={!analisisId}
              >
                Siguiente
              </button>
              <button className="btn" onClick={retroceder}>Regresar</button>
            </>
          )}
          {/* ——— Paso 3 ——— */}
          {paso === 3 && (
            <>
              {renderForm()}
              <button className="btn" onClick={retroceder}>Regresar</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalMuestras;
/*
  
<div className='modal-overlay'>
  <div className='scale-in-hor-center'>
    <div className='modal-content'>
      <p className='titulo'>Registrar nueva muestra </p>
      <button className='close-btn' onClick={onClose}>X</button>
      {pasoActual ===1 &&(
        <div>
          <p>Seleccione el paciente:</p>
          <PacientesAlta/>
          <button className='btn' onClick={paciente => {
            setPacienteSeleccionado (paciente);
            avanzarPaso();
          }}>Siguiente</button>
        </div>
      )}
      {pasoActual === 2 &&(
        <div>
          <p>Selecione el tipo de muestra:</p>
          <DetallesPacienteAlta />
          <button className='btn'
          tipos={["Biometria Hepatica", "Pruebas de sangre"]}
          onClick={tipo => {
            setTipoMuestrasSeleccionada(tipo);
            avanzarPaso();
          }}> Siguiente</button>
          <button className='btn' onClick={retrocederPaso}>Regresar</button>
        </div>
      )}
      {pasoActual === 3 &&(
        <div>
          
          <AgregarMuestra />
            <FormMuestras/>
            <FromMuesBiometira/>
          
            <FormMuesSangre />
        </div>
      )}
    </div>
  </div>
</div>
*/
