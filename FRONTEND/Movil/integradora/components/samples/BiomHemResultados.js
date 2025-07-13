import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { InputGroup } from '../';
import { useFocusField, useBiometriaHematica } from '../../hooks';

const BiomHemResultados = ({ visible, sample, onClose }) => {
  // Usar el hook personalizado para manejar el focus
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();
  
  // Usar el hook para manejo de biometría hemática
  const {
    resultados,
    loading,
    handleInputChange,
    handleSubmit,
  } = useBiometriaHematica(visible, sample, onClose);

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
              value={resultados.eritrocitos}
              onChangeText={(value) => handleInputChange('eritrocitos', value)}
              placeholder="4.2 - 5.4"
              onFocus={() => setFocus('eritrocitos')}
              onBlur={clearFocus}
              style={getFieldStyle('eritrocitos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Concentración Media de Hb (g/dL)"
              value={resultados.conMediaHb}
              onChangeText={(value) => handleInputChange('conMediaHb', value)}
              placeholder="32 - 36"
              onFocus={() => setFocus('conMediaHb')}
              onBlur={clearFocus}
              style={getFieldStyle('conMediaHb', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Volumen Globular Medio (fL)"
              value={resultados.volGlobularMedia}
              onChangeText={(value) => handleInputChange('volGlobularMedia', value)}
              placeholder="80 - 100"
              onFocus={() => setFocus('volGlobularMedia')}
              onBlur={clearFocus}
              style={getFieldStyle('volGlobularMedia', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="HB Corpuscular Media (pg)"
              value={resultados.HBCorpuscularMedia}
              onChangeText={(value) => handleInputChange('HBCorpuscularMedia', value)}
              placeholder="27 - 32"
              onFocus={() => setFocus('HBCorpuscularMedia')}
              onBlur={clearFocus}
              style={getFieldStyle('HBCorpuscularMedia', {}, styles.inputFocus)}
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

            <InputGroup
              labelTitle="Cuenta Leucocitaria (x10³/μL)"
              value={resultados.cuentaLeucocitaria}
              onChangeText={(value) => handleInputChange('cuentaLeucocitaria', value)}
              placeholder="4.5 - 11.0"
              onFocus={() => setFocus('cuentaLeucocitaria')}
              onBlur={clearFocus}
              style={getFieldStyle('cuentaLeucocitaria', {}, styles.inputFocus)}
            />

            <Text style={styles.sectionTitle}>Diferencial Leucocitario (%)</Text>

            <InputGroup
              labelTitle="Linfocitos (%)"
              value={resultados.linfocitos}
              onChangeText={(value) => handleInputChange('linfocitos', value)}
              placeholder="20 - 40"
              onFocus={() => setFocus('linfocitos')}
              onBlur={clearFocus}
              style={getFieldStyle('linfocitos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Monocitos (%)"
              value={resultados.monocitos}
              onChangeText={(value) => handleInputChange('monocitos', value)}
              placeholder="2 - 8"
              onFocus={() => setFocus('monocitos')}
              onBlur={clearFocus}
              style={getFieldStyle('monocitos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Segmentados (%)"
              value={resultados.segmentados}
              onChangeText={(value) => handleInputChange('segmentados', value)}
              placeholder="50 - 70"
              onFocus={() => setFocus('segmentados')}
              onBlur={clearFocus}
              style={getFieldStyle('segmentados', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="En Banda (%)"
              value={resultados.enBanda}
              onChangeText={(value) => handleInputChange('enBanda', value)}
              placeholder="0 - 5"
              onFocus={() => setFocus('enBanda')}
              onBlur={clearFocus}
              style={getFieldStyle('enBanda', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Neutrófilos Totales (%)"
              value={resultados.neutrofilosT}
              onChangeText={(value) => handleInputChange('neutrofilosT', value)}
              placeholder="50 - 75"
              onFocus={() => setFocus('neutrofilosT')}
              onBlur={clearFocus}
              style={getFieldStyle('neutrofilosT', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Eosinófilos (%)"
              value={resultados.eosinofilos}
              onChangeText={(value) => handleInputChange('eosinofilos', value)}
              placeholder="1 - 4"
              onFocus={() => setFocus('eosinofilos')}
              onBlur={clearFocus}
              style={getFieldStyle('eosinofilos', {}, styles.inputFocus)}
            />

            <InputGroup
              labelTitle="Basófilos (%)"
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
          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar Resultados'}
            </Text>
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
  buttonDisabled: {
    backgroundColor: '#ccc',
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
    biometriaHematica: PropTypes.shape({
      formulaRoja: PropTypes.shape({
        hemoglobina: PropTypes.number,
        hematocrito: PropTypes.number,
        eritrocitos: PropTypes.number,
        conMediaHb: PropTypes.number,
        volGlobularMedia: PropTypes.number,
        HBCorpuscularMedia: PropTypes.number,
        plaqutas: PropTypes.number, // Nota: API usa "plaqutas" sin 'e'
      }),
      formulaBlanca: PropTypes.shape({
        cuentaLeucocitaria: PropTypes.number,
        linfocitos: PropTypes.number,
        monocitos: PropTypes.number,
        segmentados: PropTypes.number,
        enBanda: PropTypes.number,
        neutrofilosT: PropTypes.number,
        eosinofilos: PropTypes.number,
        basofilos: PropTypes.number,
      }),
      observaciones: PropTypes.string,
    }),
  }),
  onClose: PropTypes.func.isRequired
};

export default BiomHemResultados;
