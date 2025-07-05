import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuPerfil from './menuPerfil';

const InfoPatient = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>Mario Alberto Lira Zamora</Text>
        <MenuPerfil token={null} />
      </View>
      <Text style={styles.email}>mario_3141230104@utd.edu.mx</Text>
      <Text style={styles.birthDate}>09/12/2004</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    width: 24,
    height: 24,
    backgroundColor: '#ff0000',
    borderRadius: 4,
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  birthDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default InfoPatient;