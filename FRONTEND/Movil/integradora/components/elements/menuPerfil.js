import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import Modal from 'react-native-modal';
import EditarPerfil from '../../screens/EditarPerfil';
import { menuButtonStyles } from '../../themes';
import { useMenuPerfil } from '../../hooks';

const MenuPerfil = () => {
  const {
    isOpen,
    showEditProfile,
    menuHeight,
    handleLogout,
    toggleMenu,
    handleEditProfile,
    handleCloseEditProfile,
    handleSaveProfile,
  } = useMenuPerfil();

  return (
    <View style={menuButtonStyles.container}>
      <TouchableOpacity style={menuButtonStyles.button} onPress={toggleMenu}>
        <Text style={menuButtonStyles.buttonText}>☰</Text>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View style={[menuButtonStyles.menu, { height: menuHeight }]}>
          <TouchableOpacity style={menuButtonStyles.menuItem} onPress={handleEditProfile}>
            <Text style={menuButtonStyles.menuItemText}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity style={menuButtonStyles.menuItem} onPress={handleLogout}>
            <Text style={menuButtonStyles.menuItemText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      
      {/* Modal para Editar Perfil */}
      <Modal
        isVisible={showEditProfile}
        onBackdropPress={handleCloseEditProfile}
        onSwipeComplete={handleCloseEditProfile}
        swipeDirection="down"
        style={menuButtonStyles.modal}
      >
        <EditarPerfil 
          onSave={handleSaveProfile} 
          onClose={handleCloseEditProfile} 
        />
      </Modal>
    </View>
  );
};



export default MenuPerfil;