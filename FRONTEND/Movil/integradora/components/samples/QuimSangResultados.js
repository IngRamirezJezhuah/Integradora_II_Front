import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput,Image } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import useFocusField from '../../hooks';

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

  // Usar el hook personalizado para manejar el focus
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();

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
            <Image
              // eslint-disable-next-line
              source={require('../../assets/quimicasanguinea.png')}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title}>Química Sanguínea</Text>
            <Text style={styles.subtitle}>ID: {sample._id ? sample._id.slice(-8) : 'N/A'}</Text>
            <Text style={styles.subtitle}>Paciente: {sample.nombrePaciente}</Text>
          </View>

          <Text style={styles.label}>Glucosa (mg/dL)</Text>
          <TextInput
            style={getFieldStyle('glucosa', styles.input, styles.inputFocus)}
            value={resultados.glucosa}
            onChangeText={(value) => handleInputChange('glucosa', value)}
            onFocus={() => setFocus('glucosa')}
            onBlur={clearFocus}
            placeholder="70-100"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Colesterol Total (mg/dL)</Text>
          <TextInput
            style={getFieldStyle('colesterol', styles.input, styles.inputFocus)}
            value={resultados.colesterol}
            onChangeText={(value) => handleInputChange('colesterol', value)}
            onFocus={() => setFocus('colesterol')}
            onBlur={clearFocus}
            placeholder="< 200"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Triglicéridos (mg/dL)</Text>
          <TextInput
            style={getFieldStyle('trigliceridos', styles.input, styles.inputFocus)}
            value={resultados.trigliceridos}
            onChangeText={(value) => handleInputChange('trigliceridos', value)}
            onFocus={() => setFocus('trigliceridos')}
            onBlur={clearFocus}
            placeholder="< 150"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Urea (mg/dL)</Text>
          <TextInput
            style={getFieldStyle('urea', styles.input, styles.inputFocus)}
            value={resultados.urea}
            onChangeText={(value) => handleInputChange('urea', value)}
            onFocus={() => setFocus('urea')}
            onBlur={clearFocus}
            placeholder="15-40"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Creatinina (mg/dL)</Text>
          <TextInput
            style={getFieldStyle('creatinina', styles.input, styles.inputFocus)}
            value={resultados.creatinina}
            onChangeText={(value) => handleInputChange('creatinina', value)}
            onFocus={() => setFocus('creatinina')}
            onBlur={clearFocus}
            placeholder="0.6-1.2"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Ácido Úrico (mg/dL)</Text>
          <TextInput
            style={getFieldStyle('acidoUrico', styles.input, styles.inputFocus)}
            value={resultados.acidoUrico}
            onChangeText={(value) => handleInputChange('acidoUrico', value)}
            onFocus={() => setFocus('acidoUrico')}
            onBlur={clearFocus}
            placeholder="3.5-7.2"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Observaciones</Text>
          <TextInput
            style={getFieldStyle('observaciones', [styles.input, styles.textArea], styles.inputFocus)}
            value={resultados.observaciones}
            onChangeText={(value) => handleInputChange('observaciones', value)}
            onFocus={() => setFocus('observaciones')}
            onBlur={clearFocus}
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
  image: {
    alignSelf: 'center',
    width: 80,
    height: 80,
    marginVertical: 10,
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
  inputFocus: {
    borderColor: '#DA0C15',
    borderWidth: 2,
    backgroundColor: '#fff',
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
