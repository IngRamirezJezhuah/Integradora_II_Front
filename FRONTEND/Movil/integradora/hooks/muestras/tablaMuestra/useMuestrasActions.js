import { useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

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
            try {
              const token = await AsyncStorage.getItem('userToken');
              if (!token) {
                Alert.alert('Error', 'No se encontró token de autenticación');
                return;
              }

              const response = await fetch(`${API_URL}/muestras/${item.id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
              });

              if (response.ok) {
                Alert.alert('Éxito', 'La muestra ha sido eliminada correctamente');
                // Llamar a la función original para actualizar el estado local
                if (deleteMuestra) {
                  await deleteMuestra(item._id);
                }
              } else {
                const errorData = await response.json();
                const errorMessage = errorData.message || 'Error al eliminar la muestra';
                console.error('❌ Error del servidor:', errorData);
                Alert.alert('Error del servidor', errorMessage);
              }
            } catch (error) {
              console.error('❌ Error al eliminar muestra:', error);
              Alert.alert('Error', 'Error de conexión al eliminar la muestra');
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
