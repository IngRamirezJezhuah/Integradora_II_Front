import React, { useState } from 'react';
import PacientesAlta from '../pacientes/PacientesAlta';
import DetallesPacienteAlta from '../pacientes/DetallesPacienteAlta';
//import AgregarMuestra from './AgregarMuestra';
//import FormMuestras from './FormMuestras';
//import { FromMuesBiometira } from '..';
import { FormMuesSangre } from '..';

const ModalMuestras = ({ onClose }) => {
    const [pasoActual, setPasoActual] = useState(1);
    const [, setTipoMuestrasSeleccionada] = useState(null);
    const [, setPacienteSeleccionado] = useState(null);

    const avanzarPaso = () => setPasoActual(prev => prev +1);
    const retrocederPaso = () => setPasoActual(prev => prev -1);


  return (
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
              {/*
              <AgregarMuestra />
                <FormMuestras/>
                <FromMuesBiometira/>
               */}
                <FormMuesSangre />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalMuestras;
