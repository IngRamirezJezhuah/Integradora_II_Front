import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import ModalPedido from './modalPedido';

const TablaPedidos = ({ data, onView, onDelete, refreshing, onRefresh }) => {
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleView = (item) => {
    setSelectedOrder(item);
    if (onView) onView(item);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  const handleDelete = async (item) => {
    // Mostrar alerta de confirmación
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que quieres eliminar este pedido?\n\nPedido: #${item._id?.slice(-8) || 'N/A'}\nCliente: ${
        item.usuarioId && typeof item.usuarioId === 'object' && item.usuarioId.nombre ? 
        `${item.usuarioId.nombre || ''} ${item.usuarioId.apellidoPaterno || ''} ${item.usuarioId.apellidoMaterno || ''}`.trim()
        : 'Sin nombre'
      }\nTotal: $${item.total || 0}\n\nEsta acción no se puede deshacer.`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deletePedido(item._id)
        }
      ]
    );
  };

  const deletePedido = async (pedidoId) => {
    try {
      // Obtener el token de autenticación
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        return;
      }

      console.log(`🗑️ Eliminando pedido con ID: ${pedidoId}`);

      const response = await fetch(`${API_URL}/pedidos/${pedidoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Alert.alert(
          'Éxito', 
          'El pedido ha sido eliminado correctamente',
          [
            {
              text: 'OK',
              onPress: () => {
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
        console.error('❌ Error del servidor:', errorData);
        Alert.alert('Error del servidor', errorMessage);
      }
    } catch (error) {
      console.error('❌ Error al eliminar pedido:', error);
      Alert.alert('Error', 'Error de conexión al eliminar el pedido');
    }
  };

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <MaterialCommunityIcons name="test-tube" size={30} color="#DA0C15" />
            <View style={styles.orderInfo}>
              <Text style={styles.orderText}>
                {item.usuarioId && typeof item.usuarioId === 'object' && item.usuarioId.nombre ? 
                  `${item.usuarioId.nombre || ''} ${item.usuarioId.apellidoPaterno || ''} ${item.usuarioId.apellidoMaterno || ''}`.trim()
                  : `Pedido #${item._id?.slice(-8) || 'N/A'}`}
              </Text>
              <Text style={styles.statusText}>
                Estado: {item.estado || 'Sin estado'} | Total: ${item.total || 0}
              </Text>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleView(item)}>
              <MaterialCommunityIcons name="file-search-outline" size={30} color="#DA0C15" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleDelete(item)}>
              <MaterialCommunityIcons name="trash-can" size={30} color="#DA0C15" />
            </TouchableOpacity>
          </View>
        )}
      />
      {selectedOrder && (
        <ModalPedido
          visible={!!selectedOrder}
          order={selectedOrder}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 10,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actionButton: {
    padding: 8,
    marginVertical: 2,
  },
});

// PropTypes para validación de props
TablaPedidos.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    usuarioId: PropTypes.shape({
      _id: PropTypes.string,
      correo: PropTypes.string,
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
    }),
    status: PropTypes.bool,
    estado: PropTypes.string,
    analisis: PropTypes.array,
    anticipo: PropTypes.object,
    subtotal: PropTypes.number,
    porcentajeDescuento: PropTypes.number,
    total: PropTypes.number,
    notas: PropTypes.string,
    fechaCreacion: PropTypes.string,
    fechaActualizacion: PropTypes.string,
  })).isRequired,
  onView: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  refreshing: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default TablaPedidos;
