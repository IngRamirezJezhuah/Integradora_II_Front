import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

const ComboBoxSample = ({ onSelect, selectedValue }) => {
  const [selected, setSelected] = useState('quimica');

  // Función para convertir el nombre del análisis al valor interno
  const convertirNombreAValor = (nombreAnalisis) => {
    if (!nombreAnalisis) return 'quimica';
    
    if (nombreAnalisis === 'Biometria Hematica' || nombreAnalisis === 'Biometría Hemática') {
      return 'biometria';
    }
    if (nombreAnalisis === 'Quimica Sanguinea' || nombreAnalisis === 'Química Sanguínea') {
      return 'quimica';
    }
    return 'quimica'; // Por defecto
  };

  // Efecto para actualizar el valor seleccionado cuando cambia selectedValue
  useEffect(() => {
    if (selectedValue) {
      const valorConvertido = convertirNombreAValor(selectedValue);
      setSelected(valorConvertido);
      console.log('ComboBox valor convertido:', selectedValue, '->', valorConvertido);
    }
  }, [selectedValue]);

  const handleSelect = (option) => {
    setSelected(option);
    
    // Convertir el valor interno al nombre del análisis
    let nombreAnalisis = '';
    if (option === 'biometria') {
      nombreAnalisis = 'Biometria Hematica';
    } else if (option === 'quimica') {
      nombreAnalisis = 'Quimica Sanguinea';
    }
    
    onSelect(nombreAnalisis);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Prueba</Text>
      <View style={styles.comboBox}>
        <TouchableOpacity
          style={[
            styles.option,
            selected === 'biometria' ? styles.selected : styles.unselected
          ]}
          onPress={() => handleSelect('biometria')}
        >
          {/* eslint-disable-next-line */}
          <Image source={require('../../assets/biometriahematica.png')} style={styles.icon} />
          <Text style={[
            styles.optionText,
            selected === 'biometria' ? styles.textSelected : styles.textUnselected
          ]}>
            Biometría Hemática
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            selected === 'quimica' ? styles.selected : styles.unselected
          ]}
          onPress={() => handleSelect('quimica')}
        >
          {/* eslint-disable-next-line */}
          <Image source={require('../../assets/quimicasanguinea.png')} style={styles.icon} />
          <Text style={[
            styles.optionText,
            selected === 'quimica' ? styles.textSelected : styles.textUnselected
          ]}>
            Química Sanguínea
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { textAlign: 'center', fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  comboBox: { flexDirection: 'row', justifyContent: 'space-around' },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 2,
  },
  selected: {
    backgroundColor: '#BF1E2D'
  },
  unselected: {
    backgroundColor: '#E0E0E0'
  },
  textSelected: {
    color: 'white'
  },
  textUnselected: {
    color: '#333'
  },
  optionText: {
    marginLeft: 8
  },
  icon: {
    width: 20,
    height: 20
  }
});

ComboBoxSample.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
};

export default ComboBoxSample;
