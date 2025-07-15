import React, { useState } from 'react';
import PacientesAlta from '../pacientes/PacientesAlta';
import DetallesPacienteAlta from '../pacientes/DetallesPacienteAlta';
import { FromMuesBiometira } from '..';
import { FormMuesSangre } from '..';
import { requireTokenOrRedirect } from "../../utils/auth";
import Swal from 'sweetalert2';
import IdPedidos from './IdPedidos';
  
const QS_ID = "686e0163fd380d4018dddcde";
const BH_ID = "686734c0dbf9fa679be0958c";

const ModalMuestras = ({ onClose }) => {//, muestraId, analisisIdInicial
  /*
    const [paso, setPaso] = useState(1);
    const [pacienteId, setPacienteId] = useState(null);
    const [analisisId, setAnalisisId] = useState(analisisIdInicial|| null);   // ← guarda ID real
    const [subPaso, setSubPaso] = useState("tomar"); // "tomar" | "resultados"
    const [muestraId, setMuestraId] = useState(null);*/


    /* ——— helpers ——— 
    const avanzar     = () => setPaso((p) => p + 1);
    const retroceder  = () => setPaso((p) => p - 1);

    const renderForm = () => {
      switch (analisisId) {
        case BH_ID: return <FromMuesBiometira fixedUserId={pacienteId} muestraId={muestraId}/>;
        case QS_ID: return <FormMuesSangre fixedUserId={pacienteId} muestraId={muestraId}/>;
        default   : return <p>Selecciona un tipo de muestra válido</p>;
      }
    };

      // Paso 3‑A: confirmar y tomar muestra
  const tomarMuestra = async () => {
    const body = {
      observaciones,
      nombrePaciente,      // o trae el nombre desde paciente
      idusuario: pacienteId,
      tipoMuestra: analisisId === BH_ID ? "biometriaHematica" : "quimicaSanguinea",
      pedidoId,            // puedes pedirlo en un input o traerlo de props
    };
    const res = await fetch(`${apiUrl}/muestras`, { … });
    const { data } = await res.json();
    setMuestraId(data._id);     // nuevo estado
    setSubPaso("resultados");   // ahora muestra el formulario de resultados
  };

  // Paso 3‑B: mostrar FormResultadosBH/QS con muestraId*/
  
    /* navegación */
    const [paso, setPaso]     = useState(1);         // 1‑paciente | 2‑tipo | 3‑tomar | 4‑resultados
    const avanzar    = () => setPaso((p) => p + 1);
    const retroceder = () => setPaso((p) => p - 1);
    /* datos seleccionados */
    const [pacienteId, setPacienteId]   = useState(null);
    const [analisisId, setAnalisisId]   = useState(null);

    /* después del primer POST */
    const [muestraId, setMuestraId]     = useState(null);

    /* campos para “tomar muestra” */
    const [observaciones, setObs]       = useState("");
    const [pedidoId, setPedidoId]       = useState([]);

    const apiUrl = process.env.REACT_APP_API_URL;
    const token  = requireTokenOrRedirect();

    /* ——— 1er POST: crear muestra ——— */
  const tomarMuestra = async () => {
    try {
      const body = {
        observaciones,
        nombrePaciente : "‑",                 // opcional; o trae el nombre real
        idusuario      : pacienteId,
        tipoMuestra    : analisisId === BH_ID ? "biometriaHematica" : "quimicaSanguinea",
        pedidoId       : pedidoId || undefined,
      };

      const res = await fetch(`${apiUrl}/muestras`, {
        method : "POST",
        headers: { "Content-Type":"application/json", Authorization:`Bearer ${token}` },
        body   : JSON.stringify(body),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "No se pudo crear la muestra");
      }
      const { data } = await res.json();
      setMuestraId(data._id);
      await Swal.fire({ icon:"success", title:"Muestra registrada", timer:1200, showConfirmButton:false });
      avanzar();                          // → paso 4
    } catch (err) {
      Swal.fire({ icon:"error", title:err.message || "Error", timer:1500 });
    }
  };

  /* ——— elegir qué formulario ——— */
  const renderResultados = () => {
    switch (analisisId) {
      case BH_ID: return <FromMuesBiometira muestraId={muestraId} onSuccess={onClose} />;
      case QS_ID: return <FormMuesSangre muestraId={muestraId} onSuccess={onClose} />;
      default   : return <p>Tipo de muestra no válido</p>;
    }
  };
    


  return (
    <div className="modal-overlay">
      <div className="scale-in-hor-center">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>×</button>

          {/* PASO 1 · Paciente */}
          {paso === 1 && (
            <>
              <p className="titulo">Paciente</p>
              <PacientesAlta seleccionado={pacienteId} onSelect={setPacienteId} />
              <button className="btn" onClick={avanzar} disabled={!pacienteId}>Siguiente</button>
            </>
          )}

          {/* PASO 2 · Tipo de muestra */}
          {paso === 2 && (
            <>
              <p className="titulo">Tipo de muestra</p>
              <DetallesPacienteAlta seleccionado={analisisId} onSelect={setAnalisisId} />
              <button className="btn" onClick={avanzar} disabled={!analisisId}>Siguiente</button>
              <button className="btn" onClick={retroceder}>Regresar</button>
            </>
          )}

          {/* PASO 3 · Tomar muestra */}
          {paso === 3 && (
            <>
              <p className="titulo">Tomar muestra</p>

              <div className="form-field">
                <label>Observaciones</label>
                <textarea value={observaciones} onChange={(e) => setObs(e.target.value)} />
              </div>

              <div className="form-field">
                <IdPedidos />
                <label>ID Pedido (opcional)</label>
                <input value={pedidoId} onChange={(e) => setPedidoId(e.target.value)} />
              </div>

              <button className="btn" onClick={tomarMuestra}>Guardar y capturar resultados</button>
              <button className="btn" onClick={retroceder}>Regresar</button>
            </>
          )}

          {/* PASO 4 · Resultados */}
          {paso === 4 && (
            <>
              <p className="titulo">Resultados</p>
              {renderResultados()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalMuestras;
/*
    <div className="modal-overlay">
      <div className="scale-in-hor-center">
        <div className="modal-content">
          <p className="titulo">Registrar nueva muestra</p>
          <button className="close-btn" onClick={onClose}>X</button>
          {/* ——— Paso 1 ——— 
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
          {/* ——— Paso 2 ——— 
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
          {/* ——— Paso 3 ——— 
          {paso === 3 && (
            <>
              {renderForm()}
              <button className="btn" onClick={retroceder}>Regresar</button>
            </>
          )}
        </div>
      </div>
    </div>
    */