import { useState } from 'react';
import { Alert } from 'react-native';

export const useMuestrasActions = (deleteMuestra, updateMuestraStatus) => {
  const [selectedSample, setSelectedSample] = useState(null);
  const [showSampleModal, setShowSampleModal] = useState(false);

  const handleView = (item) => {
    console.log('👁️ Viewing sample:', item._id);
    setSelectedSample(item);
    setShowSampleModal(true);
  };

  const handleCloseModal = () => {
    setShowSampleModal(false);
    setSelectedSample(null);
  };

  const handleDelete = async (item) => {
    // Mostrar alerta de confirmación
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que quieres eliminar esta muestra?\n\nPaciente: ${item.nombrePaciente || 'N/A'}\nTipo: ${item.tipoMuestra || 'N/A'}\nID: ${item._id?.slice(-8) || 'N/A'}\n\nEsta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const success = await deleteMuestra(item._id);
            if (success) {
              Alert.alert('Éxito', 'La muestra ha sido eliminada correctamente');
            }
          }
        }
      ]
    );
  };

  const handleCompletarMuestra = (muestra) => {
    Alert.alert(
      "Completar Muestra",
      `¿Estás seguro de que quieres marcar esta muestra como completada?\n\nPaciente: ${muestra.nombrePaciente || 'N/A'}\nTipo: ${muestra.tipoMuestra || 'N/A'}\nID: ${muestra._id?.slice(-8) || 'N/A'}\n\nEsta acción cambiará el estado de la muestra a "completado".`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Completar",
          style: "default",
          onPress: async () => {
            const success = await updateMuestraStatus(muestra._id, true);
            if (success) {
              Alert.alert(
                'Éxito', 
                'La muestra ha sido marcada como completada',
                [
                  {
                    text: 'OK',
                    onPress: () => handleCloseModal()
                  }
                ]
              );
            }
          }
        }
      ]
    );
  };

  const handleMarcarEnProceso = (muestra) => {
    Alert.alert(
      "Marcar En Proceso",
      `¿Estás seguro de que quieres marcar esta muestra como en proceso?\n\nPaciente: ${muestra.nombrePaciente || 'N/A'}\nTipo: ${muestra.tipoMuestra || 'N/A'}\nID: ${muestra._id?.slice(-8) || 'N/A'}\n\nEsta acción cambiará el estado de la muestra a "en proceso".`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Marcar En Proceso",
          style: "default",
          onPress: async () => {
            const success = await updateMuestraStatus(muestra._id, false);
            if (success) {
              Alert.alert(
                'Éxito', 
                'La muestra ha sido marcada como en proceso',
                [
                  {
                    text: 'OK',
                    onPress: () => handleCloseModal()
                  }
                ]
              );
            }
          }
        }
      ]
    );
  };

  const handleRegistrarResultado = (muestra, onResultadoRegistrado) => {
    console.log('📋 Registrando resultado para muestra:', muestra._id);
    // Esta función puede ser extendida para manejar la lógica de registro de resultados
    if (onResultadoRegistrado) {
      onResultadoRegistrado(muestra);
    }
  };

  return {
    selectedSample,
    showSampleModal,
    handleView,
    handleCloseModal,
    handleDelete,
    handleCompletarMuestra,
    handleMarcarEnProceso,
    handleRegistrarResultado,
    setSelectedSample,
    setShowSampleModal,
  };
};
