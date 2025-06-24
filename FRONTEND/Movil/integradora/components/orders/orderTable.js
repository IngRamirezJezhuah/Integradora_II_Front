import React from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OrdersTable = ({ orders, onView, onDelete }) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <MaterialCommunityIcons name="test-tube" size={30} color="black" />
          <Text style={styles.orderText}>{item.id}</Text>
          <TouchableOpacity onPress={() => onView(item)}>
            <MaterialCommunityIcons name="file-search-outline" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDelete(item)}>
            <MaterialCommunityIcons name="trash-can" size={30} color="black" />
          </TouchableOpacity>
        </View>
      )}
    />
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
