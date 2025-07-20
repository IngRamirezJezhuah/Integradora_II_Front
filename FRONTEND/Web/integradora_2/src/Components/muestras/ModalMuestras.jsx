import React, { useEffect, useState } from 'react';
import PacientesAlta from '../pacientes/PacientesAlta';
import DetallesPacienteAlta from '../pacientes/DetallesPacienteAlta';
import { FromMuesBiometira } from '..';
import { FormMuesSangre } from '..';
import { requireTokenOrRedirect } from "../../utils/auth";
import CrearMuestra from './CrearMuestra';
//import IdPedidos from './IdPedidos';
import SelectorPedidos from './selectorPedido';

const ModalMuestras = ({ onClose }) => {
  const [paso, setPaso] = useState(1);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [analisisId, setAnalisisId] = useState(null);
  const [muestraId, setMuestraId] = useState(null);
  const [observaciones, setObs] = useState("");
  const [pedidoId, /*setPedidoId*/] = useState("");
  const [mostrarCrear, setMostrarCrear] = useState(false);

  const [pedidosPaciente, setPedidosPaciente] = useState([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState([]);

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = requireTokenOrRedirect();

  const avanzar = () => setPaso((p) => p + 1);
  const retroceder = () => setPaso((p) => p - 1);

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

        const pedidos = Array.isArray(data.data) ? data.data : [data.data].filter(Boolean);
        setPedidosPaciente(pedidos);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setPedidosPaciente([]);
      }
    };

    cargarPedidos();
  }, [pacienteSeleccionado, apiUrl, token]);

  // ✅ Filtrar pedidos según tipo de análisis
  useEffect(() => {
    if (!analisisId || !pedidosPaciente.length) {
      setPedidosFiltrados([]);
      return;
    }

    const filtrados = pedidosPaciente.filter((pedido) =>
      pedido.analisis?.some((a) => a._id === analisisId)
    );

    setPedidosFiltrados(filtrados);
  }, [analisisId, pedidosPaciente]);

  // Determinar tipo de muestra
  const tipoMuestra = (() => {
    const pedido = pedidosPaciente.find(p => p._id === pedidoId);
    return pedido?.analisis?.[0]?.nombre === "Biometría Hemática"
      ? "biometriaHematica"
      : "quimicaSanguinea";
  })();

  const renderResultados = () => {
    const pedido = pedidosPaciente.find(p => p._id === pedidoId);
    const tipo = pedido?.analisis?.[0]?.nombre;

    if (tipo === "Biometría Hemática") {
      return <FromMuesBiometira muestraId={muestraId} onSuccess={onClose} />;
    }

    if (tipo === "Química Sanguínea") {
      return <FormMuesSangre muestraId={muestraId} onSuccess={onClose} />;
    }

    return <p>Tipo de muestra no válido</p>;
  };

  
  return (
    <div className="modal-overlay">
      <div className="scale-in-hor-center">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>×</button>

          {/* PASO 1 */}
          {paso === 1 && (
            <>
              <p className="titulo">Paciente</p>
              <div className="modal-arreglado">
                <button className="btn" onClick={avanzar} disabled={!pacienteSeleccionado}>Siguiente</button>
              </div>
              <PacientesAlta seleccionado={pacienteSeleccionado} onSelect={setPacienteSeleccionado} />
            </>
          )}

          {/* PASO 2 */}
          {paso === 2 && (
            <>
              <p className="titulo">Tipo de muestra</p>
              <div className="modal-arreglado">
                <button className="btn" onClick={avanzar} disabled={!analisisId}>Siguiente</button>
                <button className="btn" onClick={retroceder}>Regresar</button>
              </div>
              <DetallesPacienteAlta seleccionado={analisisId} onSelect={setAnalisisId} />
            </>
          )}

          {/* PASO 3 */}
          {/*<IdPedidos
          userSeleccionado={pacienteSeleccionado}
          tipoMuestra={tipoMuestra}
          seleccionado={pedidoId}
          onSelect={setPedidoId}
          />*/}
          {/*paso === 3 && (
            <>
              <p className="titulo">Tomar muestra</p>

              <div className="form-field">
                <label>Observaciones</label>
                <textarea value={observaciones} onChange={(e) => setObs(e.target.value)} />
              </div>

              <div className="form-field">
                <label>Selecciona un pedido asociado</label>
                {pedidosFiltrados.length > 0 ? (
                  <SelectorPedidos
                    analisisId={analisisId}
                    seleccionado={pedidoId}
                    onSelect={setPedidoId}
                  />
                ) : (
                  <p>No hay pedidos disponibles de este análisis para este paciente.</p>
                )}
              </div>

              <button
                className="btn"
                disabled={!pedidoId}
                onClick={() => setMostrarCrear(true)}
              >
                Tomar muestra
              </button>

              {mostrarCrear && (
                <CrearMuestra
                  user={pacienteSeleccionado}
                  pedidoId={pedidoId}
                  tipoMuestra={tipoMuestra}
                  observaciones={observaciones}
                  onMuestraCreada={(id) => {
                    setMuestraId(id);
                    avanzar();
                  }}
                />
              )}

              <div style={{ marginTop: "1rem" }}>
                <button className="btn" onClick={retroceder}>Regresar</button>
              </div>
            </>
          )*/}

            {paso === 3 && (
            <>
              <p className="titulo">Tomar muestra</p>

              <div className="form-field">
                <label>Observaciones</label>
                <textarea value={observaciones} onChange={(e) => setObs(e.target.value)} />
              </div>

              <div className="form-field">
                <label>Selecciona un pedido asociado</label>

                {pedidosFiltrados.length > 0 ? (
                  <SelectorPedidos
                      token={token}
                      apiUrl={apiUrl}
                      onSeleccionarPedido={(pedido) => {
                          console.log('Pedido seleccionado:', pedido);
                          // Aquí puedes actualizar el estado para ligarlo con el paciente seleccionado
                      }}
                  />
                ) : (
                  <p>No hay pedidos disponibles de este análisis para este paciente.</p>
                )}
              </div>

              <button
                className="btn"
                disabled={!pedidoId}
                onClick={() => setMostrarCrear(true)}
              >
                Tomar muestra
              </button>

              {mostrarCrear && (
                <CrearMuestra
                  user={pacienteSeleccionado}
                  pedidoId={pedidoId}
                  tipoMuestra={tipoMuestra}
                  observaciones={observaciones}
                  onMuestraCreada={(id) => {
                    setMuestraId(id);
                    avanzar();
                  }}
                />
              )}

              <div style={{ marginTop: "1rem" }}>
                <button className="btn" onClick={retroceder}>Regresar</button>
              </div>
            </>
          )}

          {/* PASO 4 */}
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
