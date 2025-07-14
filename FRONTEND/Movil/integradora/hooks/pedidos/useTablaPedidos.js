import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

export const useTablaPedidos = (onDelete, onRefresh) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Función para manejar la visualización de un pedido
  const handleView = useCallback((item) => {
    console.log('👁️ TablaPedidos: Visualizando pedido:', item._id?.slice(-8));
    setSelectedOrder(item);
  }, []);

  // Función para cerrar el modal
  const handleCloseModal = useCallback(() => {
    console.log('🔒 TablaPedidos: Cerrando modal de pedido');
    setSelectedOrder(null);
  }, []);

  // Función para obtener el nombre completo del cliente
  const getClientName = useCallback((order) => {
    if (order.usuarioId && typeof order.usuarioId === 'object' && order.usuarioId.nombre) {
      const { nombre, apellidoPaterno, apellidoMaterno } = order.usuarioId;
      return `${nombre || ''} ${apellidoPaterno || ''} ${apellidoMaterno || ''}`.trim();
    }
    return `Pedido #${order._id?.slice(-8) || 'N/A'}`;
  }, []);

  // Función para obtener información del cliente para mostrar
  const getClientDisplayName = useCallback((order) => {
    if (order.usuarioId && typeof order.usuarioId === 'object' && order.usuarioId.nombre) {
      const { nombre, apellidoPaterno, apellidoMaterno } = order.usuarioId;
      return `${nombre || ''} ${apellidoPaterno || ''} ${apellidoMaterno || ''}`.trim();
    }
    return `Pedido #${order._id?.slice(-8) || 'N/A'}`;
  }, []);

  // Función para manejar eliminación con confirmación
  const handleDelete = useCallback(async (item) => {
    const clientName = getClientName(item);
    const orderId = item._id?.slice(-8) || 'N/A';
    
    console.log('🗑️ TablaPedidos: Iniciando eliminación de pedido:', orderId);
    
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que quieres eliminar este pedido?\n\nPedido: #${orderId}\nCliente: ${clientName}\nTotal: $${item.total || 0}\n\nEsta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel",
          onPress: () => console.log(' TablaPedidos: Eliminación cancelada por el usuario')
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deletePedido(item._id)
        }
      ]
    );
  }, [getClientName]);

  // Función para eliminar pedido del servidor
  const deletePedido = useCallback(async (pedidoId) => {
    try {
      console.log(`🚀 TablaPedidos: Eliminando pedido con ID: ${pedidoId}`);
      
      // Obtener el token de autenticación
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        console.error(' TablaPedidos: No se encontró token de autenticación');
        Alert.alert('Error', 'No se encontró token de autenticación');
        return;
      }

      const response = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('✅ TablaPedidos: Pedido eliminado exitosamente');
        Alert.alert(
          'Éxito', 
          'El pedido ha sido eliminado correctamente',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('🔄 TablaPedidos: Ejecutando callbacks de eliminación');
                // Llamar al callback de eliminación del componente padre si existe
                if (onDelete) {
                  onDelete(pedidoId);
                }
                // Refrescar la lista si la función existe
                if (onRefresh) {
                  onRefresh();
                }
              }
            }
          ]
        );
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al eliminar el pedido';
        console.error(' TablaPedidos: Error del servidor:', errorData);
        Alert.alert('Error del servidor', errorMessage);
      }
    } catch (error) {
      console.error(' TablaPedidos: Error de conexión al eliminar pedido:', error);
      Alert.alert('Error', 'Error de conexión al eliminar el pedido');
    }
  }, [onDelete, onRefresh]);

  // Función para formatear información de estado y total
  const getStatusText = useCallback((order) => {
    return `Estado: ${order.estado || 'Sin estado'} | Total: $${order.total || 0}`;
  }, []);

  console.log('📋 TablaPedidos: Estado actual:', {
    hasSelectedOrder: !!selectedOrder,
    selectedOrderId: selectedOrder?._id?.slice(-8) || 'N/A'
  });

  return {
    selectedOrder,
    handleView,
    handleCloseModal,
    handleDelete,
    getClientDisplayName,
    getStatusText,
    setSelectedOrder
  };
};
