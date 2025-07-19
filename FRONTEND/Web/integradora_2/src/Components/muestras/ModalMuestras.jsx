import React, { useEffect, useState } from 'react';
import PacientesAlta from '../pacientes/PacientesAlta';
import DetallesPacienteAlta from '../pacientes/DetallesPacienteAlta';
import { FromMuesBiometira } from '..';
import { FormMuesSangre } from '..';
import { requireTokenOrRedirect } from "../../utils/auth";
import Swal from 'sweetalert2';
//import IdPedidos from './IdPedidos';

const QS_ID = "686e0163fd380d4018dddcde";
const BH_ID = "686734c0dbf9fa679be0958c";

const ModalMuestras = ({ onClose }) => {
  const [paso, setPaso] = useState(1);
  const avanzar = () => setPaso((p) => p + 1);
  const retroceder = () => setPaso((p) => p - 1);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [analisisId, setAnalisisId] = useState(null);

  const [muestraId, setMuestraId] = useState(null);
  const [pedidosPaciente, setPedidosPaciente] = useState([]);

  const [observaciones, setObs] = useState("");
  const [pedidoId, setPedidoId] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = requireTokenOrRedirect();

  // ✅ Cargar pedidos del paciente
  useEffect(() => {
    if (!pacienteSeleccionado) return;

    const cargarPedidos = async () => {
      try {
        const res = await fetch(`${apiUrl}/pedidos/${pacienteSeleccionado._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Error al obtener pedidos");

        // Convertimos a array aunque sea un solo objeto
        /*const pedido = data.data;
        if (pedido) {
          setPedidosPaciente([pedido]);
        } else {
          setPedidosPaciente([]);
        }
        const pedido = data.data;
        if (Array.isArray(pedido)) {
          setPedidosPaciente(pedido);
        } else if (pedido) {
          setPedidosPaciente([pedido]);
        } else {
          setPedidosPaciente([]);
        }
          */
        const pedidos = Array.isArray(data.data) ? data.data : [data.data].filter(Boolean);
        setPedidosPaciente(pedidos);


      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setPedidosPaciente([]);
      }
    };

    cargarPedidos();
  }, [apiUrl, pacienteSeleccionado, token]);

  // Crear muestra
  const tomarMuestra = async () => {
    try {
      /*if (!pacienteSeleccionado || !pacienteSeleccionado.nombre || !pacienteSeleccionado._id) {
        Swal.fire('Selecciona un paciente válido antes de crear la muestra');
        return;
      }*/
      /*if (!pacienteSeleccionado || typeof pacienteSeleccionado !== 'object' || !pacienteSeleccionado._id) {
        Swal.fire('Selecciona un paciente válido antes de crear la muestra');
        return;
      }


      if (!pedidoId) {
        Swal.fire("Selecciona un pedido válido antes de continuar");
        return;
      }

      const tipoMuestra = analisisId === BH_ID ? "biometriaHematica" : "quimicaSanguinea";

      const body = {
        observaciones: observaciones,
        nombrePaciente: pacienteSeleccionado.nombre,
        idusuario: pacienteSeleccionado._id,
        tipoMuestra: tipoMuestra,
        pedidoId: pedidoId,
      };

      console.log("Body:", body);*/
      console.log("Paciente seleccionado:", pacienteSeleccionado);

      if (!pacienteSeleccionado || typeof pacienteSeleccionado !== 'object' || !pacienteSeleccionado._id) {
        Swal.fire('Selecciona un paciente válido antes de crear la muestra');
        return;
      }

      if (!pedidoId) {
        Swal.fire("Selecciona un pedido válido antes de continuar");
        return;
      }

      const tipoMuestra = analisisId === BH_ID ? "biometriaHematica" : "quimicaSanguinea";

      const body = {
        observaciones,
        nombrePaciente: pacienteSeleccionado.nombre || "Sin nombre",
        idusuario: pacienteSeleccionado._id,
        tipoMuestra,
        pedidoId,
      };

      console.log("Body:", body);

      const res = await fetch(`${apiUrl}/muestras/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.message || "No se pudo crear la muestra");
      }

      const resData = await res.json();
      if (!resData || !resData.data || !resData.data._id) {
        throw new Error("Respuesta inválida del servidor al crear muestra");
      }

      setMuestraId(resData.data._id);
      await Swal.fire({ icon: "success", title: "Muestra registrada", timer: 1200, showConfirmButton: false });
      avanzar(); // → paso 4
    } catch (err) {
      Swal.fire({ icon: "error", title: err.message || "Error", timer: 1500 });
    }
  };

  // ✅ Mostrar resultados según tipo de análisis
  const renderResultados = () => {
    switch (analisisId) {
      case BH_ID: return <FromMuesBiometira muestraId={muestraId} onSuccess={onClose} />;
      case QS_ID: return <FormMuesSangre muestraId={muestraId} onSuccess={onClose} />;
      default: return <p>Tipo de muestra no válido</p>;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="scale-in-hor-center">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>×</button>

          {/* PASO 1 - Paciente */}
          {paso === 1 && (
            <>
              <p className="titulo">Paciente</p>
              <div className='modal-arreglado'>
                <button className="btn" onClick={avanzar} disabled={!pacienteSeleccionado}>Siguiente</button>
              </div>
              <PacientesAlta seleccionado={pacienteSeleccionado} onSelect={setPacienteSeleccionado} />
            </>
          )}

          {/* PASO 2 - Tipo de muestra */}
          {paso === 2 && (
            <>
              <p className="titulo">Tipo de muestra</p>
              <div className='modal-arreglado'>
                <button className="btn" onClick={avanzar} disabled={!analisisId}>Siguiente</button>
                <button className="btn" onClick={retroceder}>Regresar</button>
              </div>
              <DetallesPacienteAlta seleccionado={analisisId} onSelect={setAnalisisId} />
            </>
          )}

          {/* PASO 3 - Tomar muestra */}
          {paso === 3 && (
            <div className="form-field">
              <p className="titulo">Tomar muestra</p>
  
                <div className="form-field">
                  <label>Observaciones</label>
                  <textarea value={observaciones} onChange={(e) => setObs(e.target.value)} />
                </div>
  
                <div className="form-field">
                  {/*<IdPedidos />*/}
                  <label>ID Pedido (opcional)</label>
                  <input  onChange={(e) => setPedidoId(e.target.value)} />
                </div>

              <label>Selecciona un pedido asociado</label>
              {console.log("PEDIDOS DISPONIBLES:", pedidosPaciente)}
              {console.log("ANALISIS SELECCIONADO:", analisisId)}

              <select value={pedidoId} onChange={(e) => setPedidoId(e.target.value)}>
                <option value="">— Selecciona —</option>
                {pedidosPaciente
                  .map(p => (
                    <option key={p._id} value={p._id}>
                      {p.analisis[0]?.nombre || `Pedido #${p._id.slice(-4)}`}
                    </option>
                  ))}
              </select>

              <div>
                <button className="btn" onClick={tomarMuestra}>Guardar y capturar resultados</button>
                <button className="btn" onClick={retroceder}>Regresar</button>
                <button className="btn" onClick={avanzar} disabled={!pacienteSeleccionado}>Siguiente</button>
              </div>
            </div>
          )}

          {/* PASO 4 - Resultados */}
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
