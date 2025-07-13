import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import ComboBoxSample from './comboBoxSample';
import { InputGroup } from '../';
import { useFocusField, useNuevaMuestra } from '../../hooks';

const nuevaMuestra = ({ isVisible, onClose, onSubmit, orderData }) => {
  // Hook para manejar la lógica de nueva muestra
  const {
    selectedTipo,
    pedido,
    pacienteId,
    nombre,
    observaciones,
    loading,
    setSelectedTipo,
    setObservaciones,
    enviarMuestra,
  } = useNuevaMuestra(isVisible, orderData);

  // Hook para manejar el focus de los campos
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();

  // Función para manejar el envío del formulario
  const handleSubmit = async () => {
    await enviarMuestra(onSubmit, onClose);
  };

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Registrar Muestra</Text>

        <ComboBoxSample 
          onSelect={setSelectedTipo} 
          selectedValue={selectedTipo}
        />

        <InputGroup
          labelTitle="Pedido"
          value={pedido}
          placeholder="ID del pedido"
          onFocus={() => setFocus('pedido')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('pedido', {}, styles.inputFocus),
            styles.inputDisabled
          ]}
          keyboardType="default"
          editable={false}
        />

        <InputGroup
          labelTitle="ID del Paciente"
          value={pacienteId}
          placeholder="Identificador del paciente"
          onFocus={() => setFocus('pacienteId')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('pacienteId', {}, styles.inputFocus),
            styles.inputDisabled
          ]}
          keyboardType="default"
          editable={false}
        />

        <InputGroup
          labelTitle="Nombre del Paciente"
          value={nombre}
          placeholder="Nombre completo del paciente"
          onFocus={() => setFocus('nombre')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('nombre', {}, styles.inputFocus),
            styles.inputDisabled
          ]}
          keyboardType="default"
          editable={false}
        />

        <InputGroup
          labelTitle="Observaciones"
          value={observaciones}
          onChangeText={setObservaciones}
          placeholder="Observaciones adicionales sobre la muestra"
          multiline={true}
          numberOfLines={4}
          onFocus={() => setFocus('observaciones')}
          onBlur={clearFocus}
          style={getFieldStyle('observaciones', {}, styles.inputFocus)}
          keyboardType="default"
        />

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Registrando...' : 'Registrar Muestras'}
          </Text>
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
  backArrow: {
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  inputFocus: {
    borderColor: '#BF1E2D',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
    color: '#666',
  },
  button: {
    backgroundColor: '#BF1E2D',
    padding: 14,
    borderRadius: 10,
    marginTop: 10
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

// PropTypes para validación
nuevaMuestra.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  orderData: PropTypes.shape({
    _id: PropTypes.string,
    analisis: PropTypes.arrayOf(PropTypes.shape({
      nombre: PropTypes.string,
      precio: PropTypes.number,
      descripcion: PropTypes.string,
    })),
    usuarioId: PropTypes.shape({
      _id: PropTypes.string,
      nombre: PropTypes.string,
      apellidoPaterno: PropTypes.string,
      apellidoMaterno: PropTypes.string,
      correo: PropTypes.string,
    }),
  }),
};

export default nuevaMuestra;
