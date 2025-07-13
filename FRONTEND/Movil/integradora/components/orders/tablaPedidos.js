import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import ModalPedido from './modalPedido';
import { useTablaPedidos } from '../../hooks';

const TablaPedidos = ({ data, onView, onDelete, refreshing, onRefresh }) => {
  const {
    selectedOrder,
    handleView,
    handleCloseModal,
    handleDelete,
    getClientDisplayName,
    getStatusText
  } = useTablaPedidos(onDelete, onRefresh);

  // Función para manejar la visualización con callback opcional
  const handleViewWithCallback = (item) => {
    handleView(item);
    if (onView) onView(item);
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
                {getClientDisplayName(item)}
              </Text>
              <Text style={styles.statusText}>
                {getStatusText(item)}
              </Text>
            </View>
            <TouchableOpacity style={styles.actionButton} onPress={() => handleViewWithCallback(item)}>
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
