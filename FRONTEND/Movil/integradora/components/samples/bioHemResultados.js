import React, { useState } from 'react';
import { Modal, View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import InputGroup from '../elements/InputGroup';

const BiomHemResultados = ({ visible, sample, onClose }) => {
  const [resultados, setResultados] = useState({
    hemoglobina: '',
    hematocrito: '',
    eritrocito: '',
    ConMediaHb: '',
    volumenGlobularMedio: '',
    HbGCospucularMedio: '',
    cuentaLeucitoria: '',
    linfocitos: '',
    monocitos: '',
    segmentados: '',
    enBanda: '',
    neutrofilosT: '',
    eosinofilos: '',
    basofilos: '',
    plaquetas: '',
    vsg30: '',
    vsg60: '',
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
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <TouchableOpacity onPress={onClose} style={styles.backArrow}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Image
              // eslint-disable-next-line
              source={require('../../assets/biometriahematica.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.title}>Biometría Hemática</Text>
            <Text style={styles.subtitle}>ID: {sample._id ? sample._id.slice(-8) : 'N/A'}</Text>
            <Text style={styles.subtitle}>Paciente: {sample.nombrePaciente}</Text>

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
              labelTitle="Concentración Media de Hb"
              value={resultados.ConMediaHb}
              onChangeText={(value) => handleInputChange('ConMediaHb', value)}
              placeholder="32 - 36"
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
              labelTitle="Segmentados"
              value={resultados.segmentados}
              onChangeText={(value) => handleInputChange('segmentados', value)}
              placeholder="50 - 70"
            />

            <InputGroup
              labelTitle="En Banda"
              value={resultados.enBanda}
              onChangeText={(value) => handleInputChange('enBanda', value)}
              placeholder="3 - 5"
            />

            <InputGroup
              labelTitle="Neutrófilos Totales"
              value={resultados.neutrofilosT}
              onChangeText={(value) => handleInputChange('neutrofilosT', value)}
              placeholder="50 - 70"
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

            <Text style={styles.sectionTitle}>VSG</Text>

            <InputGroup
              labelTitle="VSG 30 min (mm)"
              value={resultados.vsg30}
              onChangeText={(value) => handleInputChange('vsg30', value)}
              placeholder="0 - 15"
            />

            <InputGroup
              labelTitle="VSG 60 min (mm)"
              value={resultados.vsg60}
              onChangeText={(value) => handleInputChange('vsg60', value)}
              placeholder="0 - 20"
            />

            <InputGroup
              labelTitle="Observaciones"
              value={resultados.observaciones}
              onChangeText={(value) => handleInputChange('observaciones', value)}
              placeholder="Observaciones adicionales..."
              multiline={true}
              numberOfLines={4}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Registrar Resultados</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default BiomHemResultados;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    maxHeight: '95%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backArrow: {
    marginBottom: 10,
  },
  scroll: {
    paddingBottom: 30,
  },
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#DA0C15',
    marginTop: 20,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#C62828',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
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