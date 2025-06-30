import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
            <MaterialCommunityIcons name="test-tube" size={30} color="black" />
            <Text style={styles.orderText}>{item.nameUsuario}</Text>
            <TouchableOpacity onPress={(orderModal) => handleView(item)}>
              <MaterialCommunityIcons name="file-search-outline" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item)}>
              <MaterialCommunityIcons name="trash-can" size={30} color="black" />
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
    alignItems: 'center',
    padding: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  orderText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});

export default OrdersTable;
