import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useComboBoxSample } from '../../hooks';

const ComboBoxSample = ({ onSelect, selectedValue }) => {
  const {
    options,
    handleSelect,
    getOptionStyles,
    getTextStyles
  } = useComboBoxSample(onSelect, selectedValue);

  // Función para obtener la imagen según el tipo
  const getImage = (imagePath) => {
    if (imagePath === 'biometriahematica') {
      // eslint-disable-next-line
      return require('../../assets/biometriahematica.png');
    } else if (imagePath === 'quimicasanguinea') {
      // eslint-disable-next-line
      return require('../../assets/quimicasanguinea.png');
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo de Prueba</Text>
      <View style={styles.comboBox}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.option,
              getOptionStyles(option.value, styles.selected, styles.unselected)
            ]}
            onPress={() => handleSelect(option.value)}
          >
            <Image source={getImage(option.imagePath)} style={styles.icon} />
            <Text style={[
              styles.optionText,
              getTextStyles(option.value, styles.textSelected, styles.textUnselected)
            ]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
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
