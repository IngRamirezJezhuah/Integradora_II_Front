import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Image, StyleSheet, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import InputGroup from '../../components';

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
            />

            <InputGroup
              labelTitle="Hematocrito (%)"
              value={resultados.hematocrito}
              onChangeText={(value) => handleInputChange('hematocrito', value)}
              placeholder="36 - 46"
            />

            <InputGroup
              labelTitle="Eritrocitos (x10⁶/μL)"
              value={resultados.eritrocito}
              onChangeText={(value) => handleInputChange('eritrocito', value)}
              placeholder="4.2 - 5.4"
            />

            <InputGroup
              labelTitle="Glóbulos Rojos (x10⁶/μL)"
              value={resultados.globulosRojos}
              onChangeText={(value) => handleInputChange('globulosRojos', value)}
              placeholder="4.2 - 5.4"
            />

            <InputGroup
              labelTitle="Concentración Media de Hb"
              value={resultados.ConMediaHb}
              onChangeText={(value) => handleInputChange('ConMediaHb', value)}
              placeholder="32 - 36"
            />

            <InputGroup
              labelTitle="Glóbulos Blancos (x10³/μL)"
              value={resultados.globulosBlancos}
              onChangeText={(value) => handleInputChange('globulosBlancos', value)}
              placeholder="4.5 - 11.0"
            />

            <InputGroup
              labelTitle="Volumen Globular Medio (fL)"
              value={resultados.volumenGlobularMedio}
              onChangeText={(value) => handleInputChange('volumenGlobularMedio', value)}
              placeholder="80 - 100"
            />

            <InputGroup
              labelTitle="Hb Corpuscular Medio (pg)"
              value={resultados.HbGCospucularMedio}
              onChangeText={(value) => handleInputChange('HbGCospucularMedio', value)}
              placeholder="27 - 32"
            />

            <InputGroup
              labelTitle="Cuenta Leucocitaria"
              value={resultados.cuentaLeucitoria}
              onChangeText={(value) => handleInputChange('cuentaLeucitoria', value)}
              placeholder="4.5 - 11.0"
            />

            <InputGroup
              labelTitle="Plaquetas (x10³/μL)"
              value={resultados.plaquetas}
              onChangeText={(value) => handleInputChange('plaquetas', value)}
              placeholder="150 - 450"
            />

            <Text style={styles.sectionTitle}>Diferencial Leucocitario (%)</Text>

            <InputGroup
              labelTitle="Neutrófilos"
              value={resultados.neutrofilos}
              onChangeText={(value) => handleInputChange('neutrofilos', value)}
              placeholder="50 - 70"
            />

            <InputGroup
              labelTitle="Segmentados"
              value={resultados.segmentados}
              onChangeText={(value) => handleInputChange('segmentados', value)}
              placeholder="50 - 70"
            />

            <InputGroup
              labelTitle="Linfocitos"
              value={resultados.linfocitos}
              onChangeText={(value) => handleInputChange('linfocitos', value)}
              placeholder="20 - 40"
            />

            <InputGroup
              labelTitle="Monocitos"
              value={resultados.monocitos}
              onChangeText={(value) => handleInputChange('monocitos', value)}
              placeholder="2 - 8"
            />

            <InputGroup
              labelTitle="Eosinófilos"
              value={resultados.eosinofilos}
              onChangeText={(value) => handleInputChange('eosinofilos', value)}
              placeholder="1 - 4"
            />

            <InputGroup
              labelTitle="Basófilos"
              value={resultados.basofilos}
              onChangeText={(value) => handleInputChange('basofilos', value)}
              placeholder="0 - 1"
            />

            <InputGroup
              labelTitle="Observaciones"
              value={resultados.observaciones}
              onChangeText={(value) => handleInputChange('observaciones', value)}
              placeholder="Observaciones adicionales..."
              multiline={true}
              numberOfLines={4}
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
