import React from 'react';
import {  Modal, View, Text, TextInput, ScrollView, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const BiomHemResultados = ({ visible, onClose }) => {
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
              source={require('../../assets/biometriahematica.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <Text style={styles.title}>Biometría Hemática</Text>

            {[
              'Hemoglobina',
              'Hematocrito',
              'Eritrocito',
              'Con. Media Hb',
              'Volumen Globular medio',
              'HB. Cospucular Media',
              'Cta. Leucocitaria',
              'Linfocitos',
              'Monocitos',
              'Segmentados',
              'En banda',
              'Neutrófilos T.',
              'Eosinófilos',
              'Basófilos',
              'Plaquetas',
            ].map((label, i) => (
              <TextInput
                key={i}
                placeholder={label}
                style={styles.input}
                placeholderTextColor="#555"
              />
            ))}

            <TextInput
              placeholder="Observaciones"
              style={styles.textArea}
              placeholderTextColor="#555"
              multiline
              numberOfLines={4}
            />

            <Text style={styles.vsgLabel}>VSG</Text>
            <View style={styles.row}>
              <TextInput
                placeholder="30 min"
                style={styles.vsgInput}
                placeholderTextColor="#555"
              />
              <Text style={styles.unit}>mm</Text>
            </View>
            <View style={styles.row}>
              <TextInput
                placeholder="60 min"
                style={styles.vsgInput}
                placeholderTextColor="#555"
              />
              <Text style={styles.unit}>mm</Text>
            </View>

            <TouchableOpacity style={styles.button}>
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 6,
    paddingHorizontal: 10,
    height: 40,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 6,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textAlignVertical: 'top',
  },
  vsgLabel: {
    marginTop: 12,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  vsgInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  unit: {
    marginLeft: 8,
    fontSize: 16,
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
  closeButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 10,
  },
  closeText: {
    fontSize: 24,
    color: '#333',
  },
});