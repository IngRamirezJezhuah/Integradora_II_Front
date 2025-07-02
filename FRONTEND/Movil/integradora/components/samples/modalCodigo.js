import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
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
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onSubmit(codigo);
                    setCodigo('');
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Enviar</Text>
            </TouchableOpacity>
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
  button: {
    backgroundColor: '#DA0C15',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
});

export default ModalCodigo;
