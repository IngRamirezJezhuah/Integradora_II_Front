import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const BiomHemResultados = ({ visible, sample, onClose }) => {
  const [resultados, setResultados] = useState({
    hemoglobina: '',
    hematocrito: '',
    globulosRojos: '',
    globulosBlancos: '',
    plaquetas: '',
    neutrofilos: '',
    linfocitos: '',
    monocitos: '',
    eosinofilos: '',
    basofilos: '',
    observaciones: ''
  });

  const handleInputChange = (field, value) => {
    setResultados(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Resultados de Biometría Hemática:', {
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
            <Text style={styles.title}>Biometría Hemática</Text>
            <Text style={styles.subtitle}>ID: {sample._id ? sample._id.slice(-8) : 'N/A'}</Text>
            <Text style={styles.subtitle}>Paciente: {sample.nombrePaciente}</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Parámetros Hematológicos</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Hemoglobina (g/dL)</Text>
              <TextInput
                style={styles.input}
                value={resultados.hemoglobina}
                onChangeText={(value) => handleInputChange('hemoglobina', value)}
                placeholder="12.0 - 15.5"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Hematocrito (%)</Text>
              <TextInput
                style={styles.input}
                value={resultados.hematocrito}
                onChangeText={(value) => handleInputChange('hematocrito', value)}
                placeholder="36 - 46"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Glóbulos Rojos (x10⁶/μL)</Text>
              <TextInput
                style={styles.input}
                value={resultados.globulosRojos}
                onChangeText={(value) => handleInputChange('globulosRojos', value)}
                placeholder="4.2 - 5.4"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Glóbulos Blancos (x10³/μL)</Text>
              <TextInput
                style={styles.input}
                value={resultados.globulosBlancos}
                onChangeText={(value) => handleInputChange('globulosBlancos', value)}
                placeholder="4.5 - 11.0"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Plaquetas (x10³/μL)</Text>
              <TextInput
                style={styles.input}
                value={resultados.plaquetas}
                onChangeText={(value) => handleInputChange('plaquetas', value)}
                placeholder="150 - 450"
                keyboardType="numeric"
              />
            </View>

            <Text style={styles.sectionTitle}>Diferencial Leucocitario (%)</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Neutrófilos</Text>
              <TextInput
                style={styles.input}
                value={resultados.neutrofilos}
                onChangeText={(value) => handleInputChange('neutrofilos', value)}
                placeholder="50 - 70"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Linfocitos</Text>
              <TextInput
                style={styles.input}
                value={resultados.linfocitos}
                onChangeText={(value) => handleInputChange('linfocitos', value)}
                placeholder="20 - 40"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Monocitos</Text>
              <TextInput
                style={styles.input}
                value={resultados.monocitos}
                onChangeText={(value) => handleInputChange('monocitos', value)}
                placeholder="2 - 8"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Eosinófilos</Text>
              <TextInput
                style={styles.input}
                value={resultados.eosinofilos}
                onChangeText={(value) => handleInputChange('eosinofilos', value)}
                placeholder="1 - 4"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Basófilos</Text>
              <TextInput
                style={styles.input}
                value={resultados.basofilos}
                onChangeText={(value) => handleInputChange('basofilos', value)}
                placeholder="0 - 1"
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Observaciones</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={resultados.observaciones}
                onChangeText={(value) => handleInputChange('observaciones', value)}
                placeholder="Observaciones adicionales..."
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Guardar Resultados</Text>
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
    maxHeight: '95%',
  },
  backArrow: {
    marginBottom: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  formContainer: {
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DA0C15',
    marginTop: 20,
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
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
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#DA0C15',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

// PropTypes para validación de props
BiomHemResultados.propTypes = {
  visible: PropTypes.bool.isRequired,
  sample: PropTypes.shape({
    _id: PropTypes.string,
    nombrePaciente: PropTypes.string,
    tipoMuestra: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired
};

export default BiomHemResultados;
