import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ComboBoxSample = ({ onSelect }) => {
  const [selected, setSelected] = useState('quimica');

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
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
    paddingHorizontal: 14
  },
  selected: {
    backgroundColor: '#BF1E2D'
  },
  unselected: {
    backgroundColor: '#E0E0E0'
  },
  textSelected: {
    color: 'white',
    fontWeight: 'bold'
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

export default ComboBoxSample;
