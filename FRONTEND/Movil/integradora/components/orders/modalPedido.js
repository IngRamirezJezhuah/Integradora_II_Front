import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import NuevaMuestra from '../samples/nuevaMuestra';
import { useModalPedido } from '../../hooks';

const ModalPedido = ({ visible, order, onClose, onNuevaMuestra }) => {
  const {
    showNuevaMuestraModal,
    orderInfo,
    handleNuevaMuestra,
    handleCloseNuevaMuestra,
    handleSubmitNuevaMuestra,
    handleCompletarPedido,
    handleCancelarPedido,
    getStatusStyle
  } = useModalPedido(order, onClose);

  // Función para manejar envío de nueva muestra con callback
  const handleSubmitWithCallback = (muestraData) => {
    handleSubmitNuevaMuestra(muestraData, onNuevaMuestra);
  };

  if (!orderInfo) return null;

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={styles.iconContainer}>
            <Ionicons name="flask" size={48} color="black" />
            <Text style={styles.idText}>#{orderInfo._id?.slice(-8) || 'N/A'}</Text>
          </View>

          {/* Información del Cliente */}
          <Text style={styles.sectionTitle}>INFORMACIÓN DEL CLIENTE</Text>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>
            {orderInfo.usuarioId && typeof orderInfo.usuarioId === 'object' && orderInfo.usuarioId.nombre ? 
              `${orderInfo.usuarioId.nombre || ''} ${orderInfo.usuarioId.apellidoPaterno || ''} ${orderInfo.usuarioId.apellidoMaterno || ''}`.trim()
              : 'No disponible'}
          </Text>
          
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{orderInfo.usuarioId?.correo || 'No disponible'}</Text>

          {/* Análisis */}
          <Text style={styles.sectionTitle}>ANÁLISIS</Text>
          {orderInfo.analisis?.map((analisis, index) => (
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
            <Text style={styles.value}>${orderInfo.subtotal || 0}</Text>
          </View>
          
          <View style={styles.financialRow}>
            <Text style={styles.label}>Descuento:</Text>
            <Text style={styles.value}>{orderInfo.porcentajeDescuento || 0}%</Text>
          </View>
          
          <View style={styles.financialRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>${orderInfo.total || 0}</Text>
          </View>

          {/* Anticipo */}
          <Text style={styles.sectionTitle}>ANTICIPO</Text>
          <View style={styles.financialRow}>
            <Text style={styles.label}>Monto:</Text>
            <Text style={styles.value}>${orderInfo.anticipo?.monto || 0}</Text>
          </View>
          
          <View style={styles.financialRow}>
            <Text style={styles.label}>Estado:</Text>
            <Text style={[styles.value, orderInfo.anticipo?.estado === 'pendiente' ? styles.pending : styles.paid]}>
              {orderInfo.anticipo?.estado || 'No definido'}
            </Text>
          </View>
          
          {orderInfo.anticipo?.fechaPago && (
            <View style={styles.financialRow}>
              <Text style={styles.label}>Fecha de Pago:</Text>
              <Text style={styles.value}>{new Date(orderInfo.anticipo.fechaPago).toLocaleDateString()}</Text>
            </View>
          )}

          {/* Estado y Fechas */}
          <Text style={styles.sectionTitle}>INFORMACIÓN GENERAL</Text>
          <Text style={styles.label}>Estado del Pedido</Text>
          <Text style={[styles.value, getStatusStyle(orderInfo.estado)]}>
            {orderInfo.estado || 'No definido'}
          </Text>

          {orderInfo.notas && (
            <>
              <Text style={styles.label}>Notas</Text>
              <Text style={styles.value}>{orderInfo.notas}</Text>
            </>
          )}

          <Text style={styles.label}>Fecha de Creación</Text>
          <Text style={styles.value}>
            {orderInfo.fechaCreacion ? new Date(orderInfo.fechaCreacion).toLocaleString() : 'No disponible'}
          </Text>

          <Text style={styles.label}>Última Actualización</Text>
          <Text style={styles.value}>
            {orderInfo.fechaActualizacion ? new Date(orderInfo.fechaActualizacion).toLocaleString() : 'No disponible'}
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
        onSubmit={handleSubmitWithCallback}
        orderData={orderInfo}
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
