import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const ModalCodigo = ({ isVisible, onClose, onSubmit }) => {
  const [codigo, setCodigo] = useState('');

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <Text style={styles.label}>Introduce el código</Text>
        <TextInput
          placeholder="Ej: ABC123"
          value={codigo}
          onChangeText={setCodigo}
          style={styles.input}
        />
        <Button title="Enviar" onPress={() => {
          onSubmit(codigo);
          setCodigo('');
        }} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    height: 40,
  },
});

export default ModalCodigo;
