import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput,Image, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useFocusField } from '../../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

const QuimSangResultados = ({ visible, sample, onClose }) => {
  const [resultados, setResultados] = useState({
    glucosa: '',
    glucosaPost: '',
    acidoUrico: '',
    urea: '',
    creatinina: '',
    colesterol: '',
    LDR: '',
    gGT: '',
    trigliceridos: '',
    observaciones: ''
  });

  const [loading, setLoading] = useState(false);

  // Usar el hook personalizado para manejar el focus
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();

  // Cargar datos existentes cuando se abre el modal
  useEffect(() => {
    if (visible && sample?.quimicaSanguinea) {
      const quimicaData = sample.quimicaSanguinea;
      setResultados({
        glucosa: quimicaData.glucosa?.toString() || '',
        glucosaPost: quimicaData.glucosaPost?.toString() || '',
        acidoUrico: quimicaData.acidoUrico?.toString() || '',
        urea: quimicaData.urea?.toString() || '',
        creatinina: quimicaData.creatinina?.toString() || '',
        colesterol: quimicaData.colesterol?.toString() || '',
        LDR: quimicaData.LDR?.toString() || '',
        gGT: quimicaData.gGT?.toString() || '',
        trigliceridos: quimicaData.trigliceridos?.toString() || '',
        observaciones: quimicaData.observaciones || ''
      });
    }
  }, [visible, sample]);

  const handleInputChange = (field, value) => {
    setResultados(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!sample?._id) {
      Alert.alert('Error', 'No se encontró el ID de la muestra');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        Alert.alert('Error', 'No se encontró el token de autenticación');
        setLoading(false);
        return;
      }

      // Convertir strings a números donde sea necesario
      const formattedResults = {
        quimicaSanguinea: {
          glucosa: resultados.glucosa ? parseFloat(resultados.glucosa) : null,
          glucosaPost: resultados.glucosaPost ? parseFloat(resultados.glucosaPost) : null,
          acidoUrico: resultados.acidoUrico ? parseFloat(resultados.acidoUrico) : null,
          urea: resultados.urea ? parseFloat(resultados.urea) : null,
          creatinina: resultados.creatinina ? parseFloat(resultados.creatinina) : null,
          colesterol: resultados.colesterol ? parseFloat(resultados.colesterol) : null,
          LDR: resultados.LDR ? parseFloat(resultados.LDR) : null,
          gGT: resultados.gGT ? parseFloat(resultados.gGT) : null,
          trigliceridos: resultados.trigliceridos ? parseFloat(resultados.trigliceridos) : null,
          observaciones: resultados.observaciones || ''
        }
      };

      const response = await fetch(`${API_URL}/muestras/resultados/${sample._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formattedResults),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Resultados guardados exitosamente:', responseData);
        Alert.alert('Éxito', 'Los resultados se han guardado correctamente');
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error al guardar resultados:', errorData);
        Alert.alert('Error', 'No se pudieron guardar los resultados');
      }
    } catch (error) {
      console.error('Error al guardar resultados:', error);
      Alert.alert('Error', 'Error de conexión al guardar los resultados');
    } finally {
      setLoading(false);
    }
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

          <Text style={styles.label}>Glucosa Post (mg/dL)</Text>
          <TextInput
            style={getFieldStyle('glucosaPost', styles.input, styles.inputFocus)}
            value={resultados.glucosaPost}
            onChangeText={(value) => handleInputChange('glucosaPost', value)}
            onFocus={() => setFocus('glucosaPost')}
            onBlur={clearFocus}
            placeholder="< 140"
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

          <Text style={styles.label}>LDR (mg/dL)</Text>
          <TextInput
            style={getFieldStyle('LDR', styles.input, styles.inputFocus)}
            value={resultados.LDR}
            onChangeText={(value) => handleInputChange('LDR', value)}
            onFocus={() => setFocus('LDR')}
            onBlur={clearFocus}
            placeholder="< 100"
            keyboardType="numeric"
          />

          <Text style={styles.label}>GGT (U/L)</Text>
          <TextInput
            style={getFieldStyle('gGT', styles.input, styles.inputFocus)}
            value={resultados.gGT}
            onChangeText={(value) => handleInputChange('gGT', value)}
            onFocus={() => setFocus('gGT')}
            onBlur={clearFocus}
            placeholder="9-48"
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
          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Guardando...' : 'Guardar'}
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
  buttonDisabled: {
    backgroundColor: '#ccc',
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
    quimicaSanguinea: PropTypes.shape({
      glucosa: PropTypes.number,
      glucosaPost: PropTypes.number,
      acidoUrico: PropTypes.number,
      urea: PropTypes.number,
      creatinina: PropTypes.number,
      colesterol: PropTypes.number,
      LDR: PropTypes.number,
      gGT: PropTypes.number,
      trigliceridos: PropTypes.number,
      observaciones: PropTypes.string,
    }),
  }),
  onClose: PropTypes.func.isRequired
};

export default QuimSangResultados;
