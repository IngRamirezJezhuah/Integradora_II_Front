import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import EditarPerfil from '../../screens/EditarPerfil';


const MenuPerfil = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  
  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          onPress: async () => {
            try {
              // Cerrar el menú inmediatamente
              setIsOpen(false);
              
              // Remover tokens y datos del usuario
              await AsyncStorage.removeItem('userToken');
              await AsyncStorage.removeItem('userData');
              
              console.log('Logout exitoso - tokens removidos');
              
              // Mostrar mensaje de éxito
              Alert.alert('Éxito', 'Sesión cerrada correctamente');
              
              // El TabNavigator detectará automáticamente que no hay token
              // y redirigirá al AuthStack en el próximo render (máximo 10 segundos)
              
            } catch (error) {
              console.error('Error durante logout:', error);
              Alert.alert('Error', 'Hubo un problema al cerrar sesión. Intenta de nuevo.');
            }
          },
        },
      ]
    );
  };

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const handleEditProfile = () => {
    console.log('Abrir Modal de Editar Perfil');
    setShowEditProfile(true);
    setIsOpen(false);
  };

  const handleCloseEditProfile = () => {
    setShowEditProfile(false);
  };

  const handleSaveProfile = (profileData) => {
    console.log('Guardar perfil:', profileData);
    // Aquí puedes agregar la lógica para guardar el perfil
    Alert.alert('Éxito', 'Perfil actualizado correctamente');
    setShowEditProfile(false);
  };


  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleMenu}>
        <Text style={styles.buttonText}>☰</Text>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View style={[styles.menu, { height }]}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <Text style={styles.menuItemText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuItemText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      
      {/* Modal para Editar Perfil */}
      <Modal
        isVisible={showEditProfile}
        onBackdropPress={handleCloseEditProfile}
        onSwipeComplete={handleCloseEditProfile}
        swipeDirection="down"
        style={styles.modal}
      >
        <EditarPerfil 
          onSave={handleSaveProfile} 
          onClose={handleCloseEditProfile} 
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1000,
  },
  button: {
    backgroundColor: '#DA0C15',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  menu: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default MenuPerfil;