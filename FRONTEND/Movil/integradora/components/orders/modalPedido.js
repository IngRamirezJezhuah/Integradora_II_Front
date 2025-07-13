import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import NuevaMuestra from '../samples/nuevaMuestra';

const ModalPedido = ({ visible, order, onClose, onNuevaMuestra }) => {
  const [showNuevaMuestraModal, setShowNuevaMuestraModal] = useState(false);

  // Función para manejar la apertura del modal de nueva muestra
  const handleNuevaMuestra = () => {
    setShowNuevaMuestraModal(true);
  };

  // Función para cerrar el modal de nueva muestra
  const handleCloseNuevaMuestra = () => {
    setShowNuevaMuestraModal(false);
  };

  // Función para manejar el envío de nueva muestra
  const handleSubmitNuevaMuestra = (muestraData) => {
    console.log('Nueva muestra registrada:', muestraData);
    console.log('Para la orden:', order._id);
    
    // Si existe la prop onNuevaMuestra, la ejecutamos
    if (typeof onNuevaMuestra === 'function') {
      onNuevaMuestra({ order, muestra: muestraData });
    }
    
    setShowNuevaMuestraModal(false);
  };

  // Función para completar el pedido
  const handleCompletarPedido = () => {
    Alert.alert(
      "Completar Pedido",
      `¿Estás seguro de que quieres marcar este pedido como completado?\n\nPedido: #${order._id?.slice(-8) || 'N/A'}\nCliente: ${
        order.usuarioId && typeof order.usuarioId === 'object' && order.usuarioId.nombre ? 
        `${order.usuarioId.nombre || ''} ${order.usuarioId.apellidoPaterno || ''} ${order.usuarioId.apellidoMaterno || ''}`.trim()
        : 'Sin nombre'
      }\nTotal: $${order.total || 0}\n\nEsta acción cambiará el estado del pedido a "pagado".`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Completar",
          style: "default",
          onPress: () => updatePedidoEstado("pagado")
        }
      ]
    );
  };

  // Función para cancelar el pedido
  const handleCancelarPedido = () => {
    Alert.alert(
      "Cancelar Pedido",
      `¿Estás seguro de que quieres cancelar este pedido?\n\nPedido: #${order._id?.slice(-8) || 'N/A'}\nCliente: ${
        order.usuarioId && typeof order.usuarioId === 'object' && order.usuarioId.nombre ? 
        `${order.usuarioId.nombre || ''} ${order.usuarioId.apellidoPaterno || ''} ${order.usuarioId.apellidoMaterno || ''}`.trim()
        : 'Sin nombre'
      }\nTotal: $${order.total || 0}\n\nEsta acción cambiará el estado del pedido a "cancelado".`,
      [
        {
          text: "No cancelar",
          style: "cancel"
        },
        {
          text: "Cancelar pedido",
          style: "destructive",
          onPress: () => updatePedidoEstado("cancelado")
        }
      ]
    );
  };

  // Función para actualizar el estado del pedido
  const updatePedidoEstado = async (nuevoEstado) => {
    try {
      // Obtener el token de autenticación
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        return;
      }

      console.log(` Actualizando pedido ${order._id} a estado: ${nuevoEstado}`);

      const response = await fetch(`${API_URL}/pedidos/${order._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: nuevoEstado
        }),
      });

      if (response.ok) {
        const estadoTexto = nuevoEstado === 'pagado' ? 'completado' : 'cancelado';
        Alert.alert(
          'Éxito', 
          `El pedido ha sido ${estadoTexto} correctamente`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Cerrar el modal después de la actualización exitosa
                onClose();
              }
            }
          ]
        );
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al actualizar el estado del pedido';
        console.error('❌ Error del servidor:', errorData);
        Alert.alert('Error del servidor', errorMessage);
      }
    } catch (error) {
      console.error('❌ Error al actualizar pedido:', error);
      Alert.alert('Error', 'Error de conexión al actualizar el pedido');
    }
  };

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={styles.iconContainer}>
            <Ionicons name="flask" size={48} color="black" />
            <Text style={styles.idText}>#{order._id?.slice(-8) || 'N/A'}</Text>
          </View>

          {/* Información del Cliente */}
          <Text style={styles.sectionTitle}>INFORMACIÓN DEL CLIENTE</Text>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>
            {order.usuarioId && typeof order.usuarioId === 'object' && order.usuarioId.nombre ? 
              `${order.usuarioId.nombre || ''} ${order.usuarioId.apellidoPaterno || ''} ${order.usuarioId.apellidoMaterno || ''}`.trim()
              : 'No disponible'}
          </Text>
          
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{order.usuarioId?.correo || 'No disponible'}</Text>

          {/* Análisis */}
          <Text style={styles.sectionTitle}>ANÁLISIS</Text>
          {order.analisis?.map((analisis, index) => (
            <View key={index} style={styles.analysisItem}>
              <Text style={styles.analysisName}>• {analisis.nombre}</Text>
              <Text style={styles.analysisPrice}>${analisis.precio}</Text>
              <Text style={styles.analysisDescription}>{analisis.descripcion}</Text>
            </View>
          ))}

          {/* Información Financiera */}
          <Text style={styles.sectionTitle}>INFORMACIÓN FINANCIERA</Text>
          <View style={styles.financialRow}>
            <Text style={styles.label}>Subtotal:</Text>
            <Text style={styles.value}>${order.subtotal || 0}</Text>
          </View>
          
          <View style={styles.financialRow}>
            <Text style={styles.label}>Descuento:</Text>
            <Text style={styles.value}>{order.porcentajeDescuento || 0}%</Text>
          </View>
          
          <View style={styles.financialRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${order.total || 0}</Text>
          </View>

          {/* Anticipo */}
          <Text style={styles.sectionTitle}>ANTICIPO</Text>
          <View style={styles.financialRow}>
            <Text style={styles.label}>Monto:</Text>
            <Text style={styles.value}>${order.anticipo?.monto || 0}</Text>
          </View>
          
          <View style={styles.financialRow}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={[styles.value, order.anticipo?.estado === 'pendiente' ? styles.pending : styles.paid]}>
              {order.anticipo?.estado || 'No definido'}
            </Text>
          </View>
          
          {order.anticipo?.fechaPago && (
            <View style={styles.financialRow}>
              <Text style={styles.label}>Fecha de Pago:</Text>
              <Text style={styles.value}>{new Date(order.anticipo.fechaPago).toLocaleDateString()}</Text>
            </View>
          )}

          {/* Estado y Fechas */}
          <Text style={styles.sectionTitle}>INFORMACIÓN GENERAL</Text>
          <Text style={styles.label}>Estado del Pedido</Text>
          <Text style={[styles.value, order.estado === 'pendiente' ? styles.pending : styles.completed]}>
            {order.estado || 'No definido'}
          </Text>

          {order.notas && (
            <>
              <Text style={styles.label}>Notas</Text>
              <Text style={styles.value}>{order.notas}</Text>
            </>
          )}

          <Text style={styles.label}>Fecha de Creación</Text>
          <Text style={styles.value}>
            {order.fechaCreacion ? new Date(order.fechaCreacion).toLocaleString() : 'No disponible'}
          </Text>

          <Text style={styles.label}>Última Actualización</Text>
          <Text style={styles.value}>
            {order.fechaActualizacion ? new Date(order.fechaActualizacion).toLocaleString() : 'No disponible'}
          </Text>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.completarButton} onPress={handleCompletarPedido}>
            <Ionicons name="checkmark-circle" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Completado</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelarButton} onPress={handleCancelarPedido}>
            <Ionicons name="close-circle" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registrarButton} onPress={handleNuevaMuestra}>
          <Ionicons name="add-circle" size={20} color="white" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Registrar muestra</Text>
        </TouchableOpacity>
      </View>
      <NuevaMuestra
        isVisible={showNuevaMuestraModal}
        onClose={handleCloseNuevaMuestra}
        onSubmit={handleSubmitNuevaMuestra}
        orderData={order}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  backArrow: {
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  idText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#B91C1C',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 5,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
    color: '#333',
  },
  value: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  analysisItem: {
    backgroundColor: '#F9F9F9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  analysisName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  analysisPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B91C1C',
    marginBottom: 4,
  },
  analysisDescription: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
  },
  financialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 4,
  },
  totalLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  totalValue: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#B91C1C',
  },
  pending: {
    color: '#F59E0B',
    fontWeight: '600',
  },
  paid: {
    color: '#10B981',
    fontWeight: '600',
  },
  completed: {
    color: '#10B981',
    fontWeight: '600',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 10,
  },
  completarButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
  },
  cancelarButton: {
    backgroundColor: '#EF4444',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
  },
  registrarButton: {
    backgroundColor: '#B91C1C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  button: {
    backgroundColor: '#B91C1C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

// PropTypes para validación de props
ModalPedido.propTypes = {
  visible: PropTypes.bool.isRequired,
  order: PropTypes.shape({
    _id: PropTypes.string,
    status: PropTypes.bool,
    estado: PropTypes.string,
    usuarioId: PropTypes.shape({
      _id: PropTypes.string,
      correo: PropTypes.string,
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
    }),
    analisis: PropTypes.arrayOf(PropTypes.shape({
      analisisId: PropTypes.string,
      nombre: PropTypes.string,
      precio: PropTypes.number,
      descripcion: PropTypes.string,
      _id: PropTypes.string,
    })),
    anticipo: PropTypes.shape({
      monto: PropTypes.number,
      fechaPago: PropTypes.string,
      estado: PropTypes.string,
    }),
    subtotal: PropTypes.number,
    porcentajeDescuento: PropTypes.number,
    total: PropTypes.number,
    notas: PropTypes.string,
    fechaCreacion: PropTypes.string,
    fechaActualizacion: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onNuevaMuestra: PropTypes.func
};

export default ModalPedido;
