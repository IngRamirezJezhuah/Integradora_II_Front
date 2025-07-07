import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import InputGroup from '../components/elements/InputGroup';

const EditProfile = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Validar que todos los campos estén llenos si se va a cambiar la contraseña
    if (formData.oldPassword || formData.newPassword || formData.confirmPassword) {
      if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
        Alert.alert('Error', 'Todos los campos de contraseña son obligatorios');
        return;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        Alert.alert('Error', 'Las contraseñas nuevas no coinciden');
        return;
      }
      
      if (formData.newPassword.length < 6) {
        Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
        return;
      }
    }
    
    // Validar email si se cambió
    if (formData.email && !formData.email.includes('@')) {
      Alert.alert('Error', 'El email no tiene un formato válido');
      return;
    }
    
    console.log('Datos del perfil:', formData);
    if (onSave) {
      onSave(formData);
    }
  };

  const handleCancel = () => {
    // Limpiar el formulario al cancelar
    setFormData({
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    if (onClose) {
      onClose();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Editar Perfil</Text>
        <InputGroup
          labelTitle="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Ingresa tu email"
          keyboardType="email-address"
        />
        <InputGroup
          labelTitle="Contraseña Anterior"
          value={formData.oldPassword}
          onChangeText={(value) => handleInputChange('oldPassword', value)}
          placeholder="Ingresa tu antigua contraseña"
          keyboardType="default"
          secureTextEntry
        />
        <InputGroup
          labelTitle="Nueva Contraseña"
          value={formData.newPassword}
          onChangeText={(value) => handleInputChange('newPassword', value)}
          placeholder="Ingresa tu nueva contraseña"
          keyboardType="default"
          secureTextEntry
        />
        <InputGroup
          labelTitle="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          placeholder="Confirma tu nueva contraseña"
          keyboardType="default"
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
            <Text style={styles.submitButtonText}>Guardar cambios</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
    ); 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '95%',
  },
  scroll: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#DA0C15',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

// PropTypes para validación de props
EditProfile.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default EditProfile;