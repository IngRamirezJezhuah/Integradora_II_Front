import { useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useDeleteMuestra = () => {
  // Función para realizar la eliminación de la muestra en el servidor
  const deleteMuestra = useCallback(async (sampleId, onDelete) => {
    try {
      // Obtener el token de autenticación
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        return;
      }

      console.log(`🗑️ Eliminando muestra con ID: ${sampleId}`);

      const response = await fetch(`${API_URL}/muestras/${sampleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Alert.alert(
          'Éxito', 
          'La muestra ha sido eliminada correctamente',
          [
            {
              text: 'OK',
              onPress: () => {
                // Llamar al callback de eliminación del componente padre si existe
                if (onDelete) {
                  onDelete(sampleId);
                }
              }
            }
          ]
        );
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al eliminar la muestra';
        console.error('Error del servidor:', errorData);
        Alert.alert('Error del servidor', errorMessage);
      }
    } catch (error) {
      console.error('Error al eliminar muestra:', error);
      Alert.alert('Error', 'Error de conexión al eliminar la muestra');
    }
  }, []);

  // Función para manejar la eliminación de muestras con confirmación
  const handleDelete = useCallback(async (item, onDelete, getStatusText) => {
    // Mostrar alerta de confirmación
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que quieres eliminar esta muestra?\n\nPaciente: ${item.nombrePaciente || 'N/A'}\nTipo: ${item.tipoMuestra || 'N/A'}\nEstado: ${getStatusText(item.status)}\n\nEsta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteMuestra(item._id || item.id, onDelete)
        }
      ]
    );
  }, [deleteMuestra]);

  return {
    handleDelete,
    deleteMuestra
  };
};
