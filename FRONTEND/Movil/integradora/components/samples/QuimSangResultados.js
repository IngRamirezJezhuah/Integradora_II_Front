import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { InputGroup } from '../elements/inputGroup';
import { useFocusField, useQuimicaSanguinea } from '../../hooks';
import { resultadosStyles } from '../../themes';

const QuimSangResultados = ({ visible, sample, onClose }) => {
  // Usar el hook personalizado para manejar el focus
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();
  
  // Usar el hook para manejo de química sanguínea
  const {
    resultados,
    loading,
    handleInputChange,
    handleSubmit,
  } = useQuimicaSanguinea(visible, sample, onClose);

  if (!sample) return null;

  return (
    <Modal isVisible={visible} onBackdropPress={onClose} swipeDirection="down" style={resultadosStyles.modal}>
      <View style={resultadosStyles.container}>
        <TouchableOpacity onPress={onClose} style={resultadosStyles.backArrow}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView>
          <View style={resultadosStyles.iconContainer}>
            <Image
              // eslint-disable-next-line
              source={require('../../assets/quimicasanguinea.png')}
              style={resultadosStyles.image}
              resizeMode="cover"
            />
            <Text style={resultadosStyles.title}>Química Sanguínea</Text>
            <Text style={resultadosStyles.subtitle}>ID: {sample._id ? sample._id.slice(-8) : 'N/A'}</Text>
            <Text style={resultadosStyles.subtitle}>Paciente: {sample.nombrePaciente}</Text>
          </View>

          <InputGroup
            labelTitle="Glucosa (mg/dL)"
            value={resultados.glucosa}
            onChangeText={(value) => handleInputChange('glucosa', value)}
            placeholder="70-100"
            keyboardType="numeric"
            onFocus={() => setFocus('glucosa')}
            onBlur={clearFocus}
            style={getFieldStyle('glucosa', {}, resultadosStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Glucosa Post (mg/dL)"
            value={resultados.glucosaPost}
            onChangeText={(value) => handleInputChange('glucosaPost', value)}
            placeholder="< 140"
            keyboardType="numeric"
            onFocus={() => setFocus('glucosaPost')}
            onBlur={clearFocus}
            style={getFieldStyle('glucosaPost', {}, resultadosStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Ácido Úrico (mg/dL)"
            value={resultados.acidoUrico}
            onChangeText={(value) => handleInputChange('acidoUrico', value)}
            placeholder="3.5-7.2"
            keyboardType="numeric"
            onFocus={() => setFocus('acidoUrico')}
            onBlur={clearFocus}
            style={getFieldStyle('acidoUrico', {}, resultadosStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Urea (mg/dL)"
            value={resultados.urea}
            onChangeText={(value) => handleInputChange('urea', value)}
            placeholder="15-40"
            keyboardType="numeric"
            onFocus={() => setFocus('urea')}
            onBlur={clearFocus}
            style={getFieldStyle('urea', {}, resultadosStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Creatinina (mg/dL)"
            value={resultados.creatinina}
            onChangeText={(value) => handleInputChange('creatinina', value)}
            placeholder="0.6-1.2"
            keyboardType="numeric"
            onFocus={() => setFocus('creatinina')}
            onBlur={clearFocus}
            style={getFieldStyle('creatinina', {}, resultadosStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Colesterol Total (mg/dL)"
            value={resultados.colesterol}
            onChangeText={(value) => handleInputChange('colesterol', value)}
            placeholder="< 200"
            keyboardType="numeric"
            onFocus={() => setFocus('colesterol')}
            onBlur={clearFocus}
            style={getFieldStyle('colesterol', {}, resultadosStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="LDR (mg/dL)"
            value={resultados.LDR}
            onChangeText={(value) => handleInputChange('LDR', value)}
            placeholder="< 100"
            keyboardType="numeric"
            onFocus={() => setFocus('LDR')}
            onBlur={clearFocus}
            style={getFieldStyle('LDR', {}, resultadosStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="GGT (U/L)"
            value={resultados.gGT}
            onChangeText={(value) => handleInputChange('gGT', value)}
            placeholder="9-48"
            keyboardType="numeric"
            onFocus={() => setFocus('gGT')}
            onBlur={clearFocus}
            style={getFieldStyle('gGT', {}, resultadosStyles.inputFocus)}
          />

          <InputGroup
            labelTitle="Triglicéridos (mg/dL)"
            value={resultados.trigliceridos}
            onChangeText={(value) => handleInputChange('trigliceridos', value)}
            placeholder="< 150"
            keyboardType="numeric"
            onFocus={() => setFocus('trigliceridos')}
            onBlur={clearFocus}
            style={getFieldStyle('trigliceridos', {}, resultadosStyles.inputFocus)}
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
            style={getFieldStyle('observaciones', {}, resultadosStyles.inputFocus)}
          />
        </ScrollView>

        <View style={resultadosStyles.buttonContainer}>
          <TouchableOpacity style={[resultadosStyles.button, resultadosStyles.cancelButton]} onPress={onClose}>
            <Text style={resultadosStyles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[resultadosStyles.button, loading && resultadosStyles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={resultadosStyles.buttonText}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

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
