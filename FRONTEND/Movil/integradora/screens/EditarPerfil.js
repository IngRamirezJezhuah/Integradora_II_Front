import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { InputGroup } from '../components/';
import { useFocusField, useEditarPerfil, usePerfilValidationComponents } from '../hooks';
import { perfilStyles } from '../themes';

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
    <View style={perfilStyles.container}>
      <ScrollView contentContainerStyle={perfilStyles.scroll}>
        <Text style={perfilStyles.title}>Editar Perfil</Text>
        
        <InputGroup
          labelTitle="Email"
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Ingresa tu email"
          keyboardType="email-address"
          onFocus={() => setFocus('email')}
          onBlur={clearFocus}
          style={[
            getFieldStyle('email', {}, perfilStyles.inputFocus),
            validationErrors.email ? perfilStyles.inputError : {}
          ]}
        />
        <ValidationIndicator 
          status={validationStatus.email} 
          isValidating={isValidating.email} 
        />
        {validationErrors.email ? (
          <Text style={perfilStyles.errorText}>{validationErrors.email}</Text>
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
            getFieldStyle('oldPassword', {}, perfilStyles.inputFocus),
            validationErrors.oldPassword ? perfilStyles.inputError : {}
          ]}
        />
        <ValidationIndicator 
          status={validationStatus.oldPassword} 
          isValidating={isValidating.oldPassword} 
        />
        {validationErrors.oldPassword ? (
          <Text style={perfilStyles.errorText}>{validationErrors.oldPassword}</Text>
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
            getFieldStyle('newPassword', {}, perfilStyles.inputFocus),
            validationErrors.newPassword ? perfilStyles.inputError : {}
          ]}
        />
        <PasswordValidationList password={formData.newPassword} />
        {validationErrors.newPassword ? (
          <Text style={perfilStyles.errorText}>{validationErrors.newPassword}</Text>
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
            getFieldStyle('confirmPassword', {}, perfilStyles.inputFocus),
            validationErrors.confirmPassword ? perfilStyles.inputError : {}
          ]}
        />
        <ValidationIndicator 
          status={validationStatus.confirmPassword} 
          isValidating={isValidating.confirmPassword} 
        />
        {validationErrors.confirmPassword ? (
          <Text style={perfilStyles.errorText}>{validationErrors.confirmPassword}</Text>
        ) : null}

        <View style={perfilStyles.buttonContainerRow}>
          <TouchableOpacity style={perfilStyles.cancelButton} onPress={handleCancel}>
            <Text style={perfilStyles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              perfilStyles.submitButton,
              loading ? perfilStyles.submitButtonDisabled : {}
            ]} 
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={perfilStyles.submitButtonText}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  ); 
};



// PropTypes para validación de props
EditarPerfil.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};

export default EditarPerfil;
