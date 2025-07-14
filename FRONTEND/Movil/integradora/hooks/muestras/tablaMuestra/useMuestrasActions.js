import { useState } from 'react';
import { Alert } from 'react-native';

export const useMuestrasActions = (deleteMuestra) => {
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

  return {
    selectedSample,
    showSampleModal,
    handleView,
    handleCloseModal,
    handleDelete,
  };
};
