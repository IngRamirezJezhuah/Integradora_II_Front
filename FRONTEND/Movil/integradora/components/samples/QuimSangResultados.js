import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const QuimSangResultados = ({ visible, sample, onClose }) => {
  const [resultados, setResultados] = useState({
    glucosa: '',
    colesterol: '',
    trigliceridos: '',
    urea: '',
    creatinina: '',
    acidoUrico: '',
    observaciones: ''
  });

  const handleInputChange = (field, value) => {
    setResultados(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Resultados de Química Sanguínea:', {
      sampleId: sample?._id,
      resultados
    });
    // Aquí puedes agregar la lógica para enviar los resultados al backend
    onClose();
  };

  if (!sample) return null;

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={styles.modal}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={styles.iconContainer}>
            <Ionicons name="flask" size={48} color="#DA0C15" />
            <Text style={styles.title}>Química Sanguínea</Text>
            <Text style={styles.subtitle}>ID: {sample._id ? sample._id.slice(-8) : 'N/A'}</Text>
            <Text style={styles.subtitle}>Paciente: {sample.nombrePaciente}</Text>
          </View>

          <Text style={styles.label}>Glucosa (mg/dL)</Text>
          <TextInput
            style={styles.input}
            value={resultados.glucosa}
            onChangeText={(value) => handleInputChange('glucosa', value)}
            placeholder="70-100"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Colesterol Total (mg/dL)</Text>
          <TextInput
            style={styles.input}
            value={resultados.colesterol}
            onChangeText={(value) => handleInputChange('colesterol', value)}
            placeholder="< 200"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Triglicéridos (mg/dL)</Text>
          <TextInput
            style={styles.input}
            value={resultados.trigliceridos}
            onChangeText={(value) => handleInputChange('trigliceridos', value)}
            placeholder="< 150"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Urea (mg/dL)</Text>
          <TextInput
            style={styles.input}
            value={resultados.urea}
            onChangeText={(value) => handleInputChange('urea', value)}
            placeholder="15-40"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Creatinina (mg/dL)</Text>
          <TextInput
            style={styles.input}
            value={resultados.creatinina}
            onChangeText={(value) => handleInputChange('creatinina', value)}
            placeholder="0.6-1.2"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Ácido Úrico (mg/dL)</Text>
          <TextInput
            style={styles.input}
            value={resultados.acidoUrico}
            onChangeText={(value) => handleInputChange('acidoUrico', value)}
            placeholder="3.5-7.2"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Observaciones</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={resultados.observaciones}
            onChangeText={(value) => handleInputChange('observaciones', value)}
            placeholder="Observaciones adicionales..."
            multiline
            numberOfLines={4}
          />
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#DA0C15',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

QuimSangResultados.propTypes = {
  visible: PropTypes.bool.isRequired,
  sample: PropTypes.shape({
    _id: PropTypes.string,
    nombrePaciente: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired
};

export default QuimSangResultados;
