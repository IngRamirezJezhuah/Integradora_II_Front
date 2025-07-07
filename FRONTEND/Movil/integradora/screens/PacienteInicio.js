import { View, StyleSheet} from "react-native";
import React, { useState, useEffect } from 'react';
import {TablaMuestrasPaciente, InfoPaciente} from "../components";
// import axios from 'axios';

const muestrasEjemplo = [
  {"__v": 0, "_id": "6860648b90d32bcde0828eb3", "createDate": "2025-06-28T21:54:19.417Z", "deleteDate": "2025-06-28T21:55:08.074Z", "fechaTomaMuestra": "2025-06-28T21:54:19.417Z", "idusuario": "6650e3ab1234567890abcdef", "nombrePaciente": "Juan Pablo Pérez", "observaciones": "Actualizado por el Dr. González", "pedidoId": "6650e5cd1234567890abcdef", "quimicaSanguinea": {}, "status": true, "statusShowClient": true, "tipoMuestra": "quimicaSanguinea"}, 
  {"__v": 0, "_id": "6860cd358930eb0dc235f2ee", "createDate": "2025-06-29T05:20:53.410Z", "fechaTomaMuestra": "2025-06-29T05:20:53.410Z", "idusuario": "6650e3ab1234567890abcdef", "nombrePaciente": "Juan Pérez", "observaciones": "Muestra tomada correctamente", "pedidoId": "6650e5cd1234567890abcdef", "status": true, "statusShowClient": true, "tipoMuestra": "quimicaSanguinea"}, 
  {"__v": 0, "_id": "6861579c8930eb0dc235f2f2", "createDate": "2025-06-29T15:11:24.097Z", "fechaTomaMuestra": "2025-06-29T15:11:24.097Z", "idusuario": "685c3712978fa098a3769589", "nombrePaciente": "Diego Pérez", "observaciones": "Muestra tomada correctamente", "pedidoId": "6650e5cd1234567890abcdef", "status": true, "statusShowClient": true, "tipoMuestra": "biometriaHematica"}
];

const PacienteInicio = () => {
  const [muestras, setMuestras] = useState([]);

  useEffect(() => {
    // Usar datos de ejemplo
    setMuestras(muestrasEjemplo);
  }, []);

  const handleView = (item) => {
    console.log('View muestra', item);
  };

  const handleDelete = (item) => {
    console.log('Delete/Download muestra', item);
  };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                     <InfoPaciente/>
                </View>
            </View>
            <TablaMuestrasPaciente data={muestras} onView={handleView} onDelete={handleDelete} />
        </View>
    );
    }
const styles = StyleSheet.create({
    container: {    
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    headerContent: {
        flex: 1,
    },
});
export default PacienteInicio;