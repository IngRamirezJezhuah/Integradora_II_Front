import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import OrderModal from './orderModal';

const OrdersTable = ({ data, onView, onDelete }) => {
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  const handleView = (item) => {
    setSelectedOrder(item);
    if (onView) onView(item);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <MaterialCommunityIcons name="test-tube" size={30} color="#DA0C15" />
            <Text style={styles.orderText}>{item.nameUsuario}</Text>
            <TouchableOpacity onPress={() => handleView(item)}>
              <MaterialCommunityIcons name="file-search-outline" size={30} color="#DA0C15" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item)}>
              <MaterialCommunityIcons name="trash-can" size={30} color="#DA0C15" />
            </TouchableOpacity>
          </View>
        )}
      />
      {selectedOrder && (
        <OrderModal
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
  orderText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});

// PropTypes para validación de props
OrdersTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    nameUsuario: PropTypes.string.isRequired,
  })).isRequired,
  onView: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
};

export default OrdersTable;
