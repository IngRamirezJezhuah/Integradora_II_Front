// OrderModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

const OrderModal = ({ visible, order, onClose }) => {
  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={styles.iconContainer}>
            <Ionicons name="flask" size={48} color="black" />
            <Text style={styles.idText}>{order.id}</Text>
          </View>

          <Text style={styles.label}>Cliente</Text>
          <Text style={styles.value}>{order.nameUsuario}</Text>

          <Text style={styles.label}>Procedimiento</Text>
          {order.procedimientos?.map((proc, index) => (
            <Text key={index} style={styles.value}>• {proc.titulo}</Text>
          ))}

          <Text style={styles.label}>Información extra</Text>
          <Text style={styles.value}>Comió hace 5 horas</Text>

          <Text style={styles.label}>Fecha de pedido</Text>
          <Text style={styles.value}>{order.createDate}</Text>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={() => console.log("Ir a otro modal")}>
          <Text style={styles.buttonText}>Registrar muestra</Text>
        </TouchableOpacity>
      </View>
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
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  value: {
    fontSize: 15,
    marginBottom: 5,
    color: '#555',
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

export default OrderModal;
