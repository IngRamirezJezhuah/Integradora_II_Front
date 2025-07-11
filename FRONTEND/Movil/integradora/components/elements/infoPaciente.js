import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MenuPerfil from './menuPerfil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InfoPaciente = () => {
  const [userInfo, setUserInfo] = useState({
    nombreCompleto: 'Cargando...',
    email: 'Cargando...',
    fechaNacimiento: 'Cargando...'
  });

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        // Obtener datos del usuario desde AsyncStorage
        const userData = await AsyncStorage.getItem('userData');
        
        if (userData) {
          const user = JSON.parse(userData);
          const nombreCompleto = `${user.nombre || ''} ${user.apellidoPaterno || ''} ${user.apellidoMaterno || ''}`.trim();
          
          setUserInfo({
            nombreCompleto: nombreCompleto || 'Usuario',
            email: user.email || user.correo || 'Sin email',
            fechaNacimiento: user.fechaNacimiento ? 
              new Date(user.fechaNacimiento).toLocaleDateString('es-ES') : 
              'Sin fecha'
          });
        }
      } catch (error) {
        console.error('Error al cargar información del usuario:', error);
        setUserInfo({
          nombreCompleto: 'Error al cargar',
          email: 'Error al cargar',
          fechaNacimiento: 'Error al cargar'
        });
      }
    };

    loadUserInfo();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{userInfo.nombreCompleto}</Text>
        <MenuPerfil token={null} />
      </View>
      <Text style={styles.email}>{userInfo.email}</Text>
      <Text style={styles.birthDate}>{userInfo.fechaNacimiento}</Text>
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

export default InfoPaciente;