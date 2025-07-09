import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Image, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import InputGroup from '../../components';
import useFocusField from '../../hooks/useFocusField';

const BiomHemResultados = ({ visible, sample, onClose }) => {
  const [resultados, setResultados] = useState({
    hemoglobina: '',
    hematocrito: '',
    eritrocito: '',
    globulosRojos: '',
    ConMediaHb: '',
    globulosBlancos: '',
    volumenGlobularMedio: '',
    HbGCospucularMedio: '',
    cuentaLeucitoria: '',
    monocitos: '',
    segmentados: '',
    neutrofilos: '',
    plaquetas: '',
    linfocitos: '',
    eosinofilos: '',
    basofilos: '',
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

            <Image
            // eslint-disable-next-line
              source={require('../../assets/biometriahematica.png')}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>Biometría Hemática</Text>
            <Text style={styles.subtitle}>ID: {sample._id ? sample._id.slice(-8) : 'N/A'}</Text>
            <Text style={styles.subtitle}>Paciente: {sample.nombrePaciente}</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Parámetros Hematológicos</Text>
            
            <InputGroup
              labelTitle="Hemoglobina (g/dL)"
              value={resultados.hemoglobina}
              onChangeText={(value) => handleInputChange('hemoglobina', value)}
              placeholder="12.0 - 15.5"
              onFocus={() => setFocus('hemoglobina')}
              onBlur={clearFocus}
              style={getFieldStyle('hemoglobina', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Hematocrito (%)"
              value={resultados.hematocrito}
              onChangeText={(value) => handleInputChange('hematocrito', value)}
              placeholder="36 - 46"
              onFocus={() => setFocus('hematocrito')}
              onBlur={clearFocus}
              style={getFieldStyle('hematocrito', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Eritrocitos (x10⁶/μL)"
              value={resultados.eritrocito}
              onChangeText={(value) => handleInputChange('eritrocito', value)}
              placeholder="4.2 - 5.4"
              onFocus={() => setFocus('eritrocito')}
              onBlur={clearFocus}
              style={getFieldStyle('eritrocito', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Glóbulos Rojos (x10⁶/μL)"
              value={resultados.globulosRojos}
              onChangeText={(value) => handleInputChange('globulosRojos', value)}
              placeholder="4.2 - 5.4"
              onFocus={() => setFocus('globulosRojos')}
              onBlur={clearFocus}
              style={getFieldStyle('globulosRojos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Concentración Media de Hb"
              value={resultados.ConMediaHb}
              onChangeText={(value) => handleInputChange('ConMediaHb', value)}
              placeholder="32 - 36"
              onFocus={() => setFocus('ConMediaHb')}
              onBlur={clearFocus}
              style={getFieldStyle('ConMediaHb', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Glóbulos Blancos (x10³/μL)"
              value={resultados.globulosBlancos}
              onChangeText={(value) => handleInputChange('globulosBlancos', value)}
              placeholder="4.5 - 11.0"
              onFocus={() => setFocus('globulosBlancos')}
              onBlur={clearFocus}
              style={getFieldStyle('globulosBlancos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Volumen Globular Medio (fL)"
              value={resultados.volumenGlobularMedio}
              onChangeText={(value) => handleInputChange('volumenGlobularMedio', value)}
              placeholder="80 - 100"
              onFocus={() => setFocus('volumenGlobularMedio')}
              onBlur={clearFocus}
              style={getFieldStyle('volumenGlobularMedio', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Hb Corpuscular Medio (pg)"
              value={resultados.HbGCospucularMedio}
              onChangeText={(value) => handleInputChange('HbGCospucularMedio', value)}
              placeholder="27 - 32"
              onFocus={() => setFocus('HbGCospucularMedio')}
              onBlur={clearFocus}
              style={getFieldStyle('HbGCospucularMedio', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Cuenta Leucocitaria"
              value={resultados.cuentaLeucitoria}
              onChangeText={(value) => handleInputChange('cuentaLeucitoria', value)}
              placeholder="4.5 - 11.0"
              onFocus={() => setFocus('cuentaLeucitoria')}
              onBlur={clearFocus}
              style={getFieldStyle('cuentaLeucitoria', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Plaquetas (x10³/μL)"
              value={resultados.plaquetas}
              onChangeText={(value) => handleInputChange('plaquetas', value)}
              placeholder="150 - 450"
              onFocus={() => setFocus('plaquetas')}
              onBlur={clearFocus}
              style={getFieldStyle('plaquetas', {}, styles.inputFocus)}
            />

            <Text style={styles.sectionTitle}>Diferencial Leucocitario (%)</Text>

            <InputGroup
              labelTitle="Neutrófilos"
              value={resultados.neutrofilos}
              onChangeText={(value) => handleInputChange('neutrofilos', value)}
              placeholder="50 - 70"
              onFocus={() => setFocus('neutrofilos')}
              onBlur={clearFocus}
              style={getFieldStyle('neutrofilos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Segmentados"
              value={resultados.segmentados}
              onChangeText={(value) => handleInputChange('segmentados', value)}
              placeholder="50 - 70"
              onFocus={() => setFocus('segmentados')}
              onBlur={clearFocus}
              style={getFieldStyle('segmentados', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Linfocitos"
              value={resultados.linfocitos}
              onChangeText={(value) => handleInputChange('linfocitos', value)}
              placeholder="20 - 40"
              onFocus={() => setFocus('linfocitos')}
              onBlur={clearFocus}
              style={getFieldStyle('linfocitos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Monocitos"
              value={resultados.monocitos}
              onChangeText={(value) => handleInputChange('monocitos', value)}
              placeholder="2 - 8"
              onFocus={() => setFocus('monocitos')}
              onBlur={clearFocus}
              style={getFieldStyle('monocitos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Eosinófilos"
              value={resultados.eosinofilos}
              onChangeText={(value) => handleInputChange('eosinofilos', value)}
              placeholder="1 - 4"
              onFocus={() => setFocus('eosinofilos')}
              onBlur={clearFocus}
              style={getFieldStyle('eosinofilos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Basófilos"
              value={resultados.basofilos}
              onChangeText={(value) => handleInputChange('basofilos', value)}
              placeholder="0 - 1"
              onFocus={() => setFocus('basofilos')}
              onBlur={clearFocus}
              style={getFieldStyle('basofilos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Observaciones"
              value={resultados.observaciones}
              onChangeText={(value) => handleInputChange('observaciones', value)}
              placeholder="Observaciones adicionales..."
              multiline={true}
              numberOfLines={4}
              onFocus={() => setFocus('observaciones')}
              onBlur={clearFocus}
              style={getFieldStyle('observaciones', {}, styles.inputFocus)}
            />
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
  image: {
    alignSelf: 'center',
    width: 50,
    height: 50,
    marginVertical: 10,
  },
  formContainer: {
    paddingHorizontal: 10,
  },
  inputFocus: {
    borderColor: '#DA0C15',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DA0C15',
    marginTop: 20,
    marginBottom: 15,
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
