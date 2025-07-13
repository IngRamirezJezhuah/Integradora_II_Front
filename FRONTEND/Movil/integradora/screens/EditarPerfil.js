import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { InputGroup } from '../components/';
import { useFocusField, useEditarPerfil, usePerfilValidationComponents } from '../hooks';

const EditarPerfil = ({ onSave, onClose }) => {
  // Hooks principales
  const {
    formData,
    validationErrors,
    loading,
    validationStatus,
    isValidating,
    handleInputChange,
    handleSave,
    handleCancel
  } = useEditarPerfil(onSave, onClose);

  const { setFocus, clearFocus, getFieldStyle } = useFocusField();
  const { ValidationIndicator, PasswordValidationList } = usePerfilValidationComponents();

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
          onFocus={() => setFocus('email')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('email', {}, styles.inputFocus),
            validationErrors.email ? styles.inputError : {}
          ]}
        />
        <ValidationIndicator 
          status={validationStatus.email} 
          isValidating={isValidating.email} 
        />
        {validationErrors.email ? (
          <Text style={styles.errorText}>{validationErrors.email}</Text>
        ) : null}

        <InputGroup
          labelTitle="Contraseña Anterior"
          value={formData.oldPassword}
          onChangeText={(value) => handleInputChange('oldPassword', value)}
          placeholder="Ingresa tu antigua contraseña"
          keyboardType="default"
          secureTextEntry
          onFocus={() => setFocus('oldPassword')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('oldPassword', {}, styles.inputFocus),
            validationErrors.oldPassword ? styles.inputError : {}
          ]}
        />
        <ValidationIndicator 
          status={validationStatus.oldPassword} 
          isValidating={isValidating.oldPassword} 
        />
        {validationErrors.oldPassword ? (
          <Text style={styles.errorText}>{validationErrors.oldPassword}</Text>
        ) : null}

        <InputGroup
          labelTitle="Nueva Contraseña"
          value={formData.newPassword}
          onChangeText={(value) => handleInputChange('newPassword', value)}
          placeholder="Ingresa tu nueva contraseña"
          keyboardType="default"
          secureTextEntry
          onFocus={() => setFocus('newPassword')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('newPassword', {}, styles.inputFocus),
            validationErrors.newPassword ? styles.inputError : {}
          ]}
        />
        <PasswordValidationList password={formData.newPassword} />
        {validationErrors.newPassword ? (
          <Text style={styles.errorText}>{validationErrors.newPassword}</Text>
        ) : null}

        <InputGroup
          labelTitle="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          placeholder="Confirma tu nueva contraseña"
          keyboardType="default"
          secureTextEntry
          onFocus={() => setFocus('confirmPassword')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('confirmPassword', {}, styles.inputFocus),
            validationErrors.confirmPassword ? styles.inputError : {}
          ]}
        />
        <ValidationIndicator 
          status={validationStatus.confirmPassword} 
          isValidating={isValidating.confirmPassword} 
        />
        {validationErrors.confirmPassword ? (
          <Text style={styles.errorText}>{validationErrors.confirmPassword}</Text>
        ) : null}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.submitButton,
              loading ? styles.submitButtonDisabled : {}
            ]} 
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  ); 
};

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
  inputFocus: {
    borderColor: '#BF1E2D',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#ff4444',
    borderWidth: 2,
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 5,
    fontStyle: 'italic',
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
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

// PropTypes para validación de props
EditarPerfil.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default EditarPerfil;
