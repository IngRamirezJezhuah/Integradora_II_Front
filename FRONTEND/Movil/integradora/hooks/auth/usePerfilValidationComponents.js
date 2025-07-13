import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

/**
 * Hook que proporciona componentes para mostrar el estado de validación del perfil
 * Incluye indicadores de validación y lista de requisitos para contraseñas
 */
export const usePerfilValidationComponents = () => {
  
  // Componente para mostrar el estado de validación de un campo
  const ValidationIndicator = ({ status, isValidating }) => {
    if (!status || status.isValid === null) return null;

    const iconColor = status.isValid ? '#4CAF50' : '#f44336';
    const icon = status.isValid ? '✓' : '✗';
    const bgColor = status.isValid ? '#E8F5E8' : '#FFEBEE';

    return (
      <View style={[styles.validationIndicator, { backgroundColor: bgColor }]}>
        <Text style={[styles.validationIcon, { color: iconColor }]}>
          {isValidating ? '⏳' : icon}
        </Text>
        <Text style={[styles.validationMessage, { color: iconColor }]}>
          {isValidating ? 'Validando...' : status.message}
        </Text>
      </View>
    );
  };

  // Componente para mostrar la validación de contraseña como lista de requisitos
  const PasswordValidationList = ({ password }) => {
    if (!password) return null;

    const checks = {
      length: {
        valid: password.length >= 8,
        text: 'Mínimo 8 caracteres'
      },
      uppercase: {
        valid: /[A-Z]/.test(password),
        text: 'Al menos una mayúscula (A-Z)'
      },
      lowercase: {
        valid: /[a-z]/.test(password),
        text: 'Al menos una minúscula (a-z)'
      },
      numbers: {
        valid: /\d/.test(password),
        text: 'Al menos un número (0-9)'
      },
      symbols: {
        valid: /[@#$!%*?&]/.test(password),
        text: 'Al menos un símbolo (@#$!%*?&)'
      }
    };

    return (
      <View style={styles.passwordValidationList}>
        <Text style={styles.passwordValidationTitle}>Requisitos de contraseña:</Text>
        {Object.entries(checks).map(([key, check]) => (
          <View key={key} style={styles.passwordCheckItem}>
            <Text style={[
              styles.passwordCheckIcon,
              { color: check.valid ? '#4CAF50' : '#ff4444' }
            ]}>
              {check.valid ? '✓' : '✗'}
            </Text>
            <Text style={[
              styles.passwordCheckText,
              { color: check.valid ? '#4CAF50' : '#666' }
            ]}>
              {check.text}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  // PropTypes para ValidationIndicator
  ValidationIndicator.propTypes = {
    status: PropTypes.shape({
      isValid: PropTypes.bool,
      message: PropTypes.string
    }),
    isValidating: PropTypes.bool
  };

  // PropTypes para PasswordValidationList
  PasswordValidationList.propTypes = {
    password: PropTypes.string
  };

  return {
    ValidationIndicator,
    PasswordValidationList,
  };
};

// Estilos para los componentes de validación
const styles = StyleSheet.create({
  validationIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  validationIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  validationMessage: {
    fontSize: 12,
    flex: 1,
    fontWeight: '500',
  },
  passwordValidationList: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginTop: -10,
    marginBottom: 15,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  passwordValidationTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  passwordCheckItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  passwordCheckIcon: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
    width: 16,
  },
  passwordCheckText: {
    fontSize: 12,
    flex: 1,
  },
});
