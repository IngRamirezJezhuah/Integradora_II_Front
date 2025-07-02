import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import ComboBoxSample from './comboBoxSample';

const nuevaMuestra = ({ isVisible, onClose, onSubmit }) => {
  const [selectedTipo, setSelectedTipo] = useState('');
  const [pedido, setPedido] = useState('');
  const [pacienteId, setPacienteId] = useState('');
  const [nombre, setNombre] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [focusField, setFocusField] = useState(null);

  const handleSubmit = () => {
    onSubmit({ selectedTipo, pedido, pacienteId, nombre, observaciones });
    onClose();
  };

  const getInputStyle = (field) => [
    styles.input,
    focusField === field && styles.inputFocus
  ];

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Muestra</Text>

        <ComboBoxSample onSelect={setSelectedTipo} />

        <TextInput
          style={getInputStyle('pedido')}
          placeholder="Pedido"
          value={pedido}
          onFocus={() => setFocusField('pedido')}
          onBlur={() => setFocusField(null)}
          onChangeText={setPedido}
        />
        <TextInput
          style={getInputStyle('pacienteId')}
          placeholder="Paciente ID"
          value={pacienteId}
          onFocus={() => setFocusField('pacienteId')}
          onBlur={() => setFocusField(null)}
          onChangeText={setPacienteId}
        />
        <TextInput
          style={getInputStyle('nombre')}
          placeholder="Nombre Paciente"
          value={nombre}
          onFocus={() => setFocusField('nombre')}
          onBlur={() => setFocusField(null)}
          onChangeText={setNombre}
        />
        <TextInput
          style={[getInputStyle('observaciones'), styles.textArea]}
          placeholder="Observaciones"
          multiline
          numberOfLines={4}
          value={observaciones}
          onFocus={() => setFocusField('observaciones')}
          onBlur={() => setFocusField(null)}
          onChangeText={setObservaciones}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrar Muestras</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 10,
    height: 40
  },
  inputFocus: {
    borderColor: '#BF1E2D'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  button: {
    backgroundColor: '#BF1E2D',
    padding: 14,
    borderRadius: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default nuevaMuestra;
