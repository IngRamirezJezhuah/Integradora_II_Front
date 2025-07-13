import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { InputGroup } from '../components/';
import { useFocusField } from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

/* eslint-disable react/prop-types */
const EditarPerfil = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);
  
  // Estados para validación en tiempo real
  const [validationStatus, setValidationStatus] = useState({
    email: { isValid: null, message: '' },
    oldPassword: { isValid: null, message: '' },
    newPassword: { isValid: null, message: '' },
    confirmPassword: { isValid: null, message: '' }
  });
  const [isValidating, setIsValidating] = useState({});
  const debounceTimers = useRef({});

  // Usar el hook personalizado para manejar el focus
  const { setFocus, clearFocus, getFieldStyle } = useFocusField();

  // Regex para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    const loadCurrentUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          setCurrentUserData(user);
          // Pre-cargar el email actual
          setFormData(prev => ({
            ...prev,
            email: user.correo || user.email || ''
          }));
        }
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error);
      }
    };

    loadCurrentUserData();
  }, []);

  // Limpiar timers al desmontar el componente
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(timer => {
        if (timer) clearTimeout(timer);
      });
    };
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpiar errores de validación en tiempo real
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }

    // Limpiar timer anterior si existe
    if (debounceTimers.current[field]) {
      clearTimeout(debounceTimers.current[field]);
    }

    // Reset validation status mientras el usuario está escribiendo
    setValidationStatus(prev => ({
      ...prev,
      [field]: { isValid: null, message: '' }
    }));

    // Solo validar si el campo no está vacío
    if (value.trim()) {
      setIsValidating(prev => ({ ...prev, [field]: true }));
      
      // Establecer nuevo timer de 2 segundos
      debounceTimers.current[field] = setTimeout(() => {
        validateFieldRealTime(field, value);
      }, 2000);
    } else {
      // Si el campo está vacío, limpiar validación
      setValidationStatus(prev => ({
        ...prev,
        [field]: { isValid: null, message: '' }
      }));
      setIsValidating(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateFieldRealTime = async (field, value) => {
    try {
      setIsValidating(prev => ({ ...prev, [field]: true }));
      let isValid = false;
      let message = '';

      console.log(`🔍 Validando campo ${field} con valor:`, value);

      switch (field) {
        case 'email':
          if (value && value !== currentUserData?.correo) {
            const emailError = await validateEmail(value);
            isValid = !emailError;
            message = emailError || 'Email válido ✓';
            console.log(`📧 Email validation result:`, { isValid, message });
          } else {
            isValid = true;
            message = 'Email sin cambios';
          }
          break;

        case 'oldPassword':
          if (value) {
            // Solo validar que no esté vacío
            // La validación real se hará en el backend
            isValid = true;
            message = 'Contraseña ingresada ✓';
            console.log(`🔐 Old password validation result:`, { isValid, message });
          }
          break;

        case 'newPassword':
          if (value) {
            const passwordError = validatePassword(value);
            if (passwordError && typeof passwordError === 'object') {
              // Es un objeto con checks, así que la contraseña no es válida aún
              isValid = false;
              message = 'Completa todos los requisitos de contraseña';
            } else if (passwordError) {
              // Es un string de error
              isValid = false;
              message = passwordError;
            } else {
              // No hay error, contraseña válida
              isValid = true;
              message = 'Nueva contraseña válida ✓';
            }
            console.log(`🆕 New password validation result:`, { isValid, message });
            
            // Si hay confirmación de contraseña, re-validarla
            if (formData.confirmPassword) {
              setTimeout(() => validateFieldRealTime('confirmPassword', formData.confirmPassword), 100);
            }
          }
          break;

        case 'confirmPassword':
          if (value) {
            isValid = value === formData.newPassword;
            message = isValid ? 'Las contraseñas coinciden ✓' : 'Las contraseñas no coinciden';
            console.log(`🔄 Confirm password validation result:`, { isValid, message });
          }
          break;

        default:
          console.log(`⚠️ Campo no reconocido para validación: ${field}`);
      }

      setValidationStatus(prev => ({
        ...prev,
        [field]: { isValid, message }
      }));

      console.log(`✅ Validación completada para ${field}:`, { isValid, message });

    } catch (error) {
      console.error(`❌ Error en validación de ${field}:`, error);
      setValidationStatus(prev => ({
        ...prev,
        [field]: { isValid: false, message: 'Error en validación' }
      }));
    } finally {
      setIsValidating(prev => ({ ...prev, [field]: false }));
    }
  };

  const validateEmail = async (email) => {
    if (!email) return '';
    
    if (!emailRegex.test(email)) {
      return 'El formato del email no es válido';
    }

    // Verificar si el email ya está en uso por otro usuario
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return 'No se encontró token de autenticación';

      const response = await fetch(`${API_URL}/usuarios/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ correo: email, currentUserId: currentUserData?._id }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          return 'Este email ya está en uso por otro usuario';
        }
      }
    } catch (error) {
      console.error('Error al verificar email:', error);
      return 'Error al verificar la disponibilidad del email';
    }

    return '';
  };

  const validatePassword = (password) => {
    if (!password) return '';
    
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      symbols: /[@#$!%*?&]/.test(password)
    };

    const allValid = Object.values(checks).every(check => check);
    
    if (!allValid) {
      return { checks, isValid: false };
    }
    
    return '';
  };

  // Componente para mostrar el estado de validación
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

  // Componente para mostrar la validación de contraseña como lista
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

  const handleSave = async () => {
    const errors = {};
    setLoading(true);

    try {
      // Validar email si se proporcionó
      if (formData.email && formData.email !== currentUserData?.correo) {
        const emailError = await validateEmail(formData.email);
        if (emailError) {
          errors.email = emailError;
        }
      }

      // Validar contraseñas si se va a cambiar
      const isChangingPassword = formData.oldPassword || formData.newPassword || formData.confirmPassword;
      
      if (isChangingPassword) {
        // Todos los campos de contraseña son obligatorios
        if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
          Alert.alert('Error', 'Todos los campos de contraseña son obligatorios para cambiar la contraseña');
          setLoading(false);
          return;
        }

        // Validar nueva contraseña
        const newPasswordError = validatePassword(formData.newPassword);
        if (newPasswordError) {
          if (typeof newPasswordError === 'object') {
            errors.newPassword = 'La contraseña no cumple con todos los requisitos';
          } else {
            errors.newPassword = newPasswordError;
          }
        }

        // Validar que las contraseñas coincidan
        if (formData.newPassword !== formData.confirmPassword) {
          errors.confirmPassword = 'Las contraseñas nuevas no coinciden';
        }
      }

      // Si hay errores de validación, mostrarlos
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        const firstError = Object.values(errors)[0];
        Alert.alert('Error de validación', firstError);
        setLoading(false);
        return;
      }

      // Si llegamos aquí, todas las validaciones pasaron
      // Proceder con el envío al servidor
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Error', 'No se encontró token de autenticación');
        setLoading(false);
        return;
      }

      const userId = currentUserData?._id;
      if (!userId) {
        Alert.alert('Error', 'No se encontró ID de usuario');
        setLoading(false);
        return;
      }

      // Preparar datos para enviar
      const updateData = {};
      
      if (formData.email && formData.email !== currentUserData?.correo) {
        updateData.correo = formData.email;
      }
      
      if (isChangingPassword) {
        updateData.anteriorContraseña = formData.oldPassword;
        updateData.contraseña = formData.newPassword;
      }

      // Si no hay cambios, no enviar nada
      if (Object.keys(updateData).length === 0) {
        Alert.alert('Información', 'No se han realizado cambios');
        setLoading(false);
        return;
      }

      console.log('🚀 Enviando datos al servidor:', updateData);

      const response = await fetch(`${API_URL}/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        
        // Actualizar datos en AsyncStorage si el email cambió
        if (updateData.correo) {
          const updatedUserData = { ...currentUserData, correo: updateData.correo };
          await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
        }
        
        if (onSave) {
          onSave(formData);
        }
        
        if (onClose) {
          onClose();
        }
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al actualizar el perfil';
        console.error('❌ Error del servidor:', errorData);
        
        // Manejar errores específicos
        if (errorMessage.includes('Credenciales incorrectas')) {
          setValidationErrors(prev => ({
            ...prev,
            oldPassword: 'La contraseña anterior no es correcta'
          }));
          Alert.alert('Error', 'La contraseña anterior no es correcta');
        } else if (errorMessage.includes('correo ya está registrado')) {
          setValidationErrors(prev => ({
            ...prev,
            email: 'Este email ya está en uso por otro usuario'
          }));
          Alert.alert('Error', 'Este email ya está en uso por otro usuario');
        } else {
          Alert.alert('Error del servidor', errorMessage);
        }
      }
    } catch (error) {
      console.error('❌ Error al actualizar perfil:', error);
      Alert.alert('Error', 'Error de conexión al actualizar el perfil');
    } finally {
      setLoading(false);
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
    
    // Limpiar validaciones
    setValidationStatus({
      email: { isValid: null, message: '' },
      oldPassword: { isValid: null, message: '' },
      newPassword: { isValid: null, message: '' },
      confirmPassword: { isValid: null, message: '' }
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
  helpText: {
    color: '#666',
    fontSize: 11,
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 5,
    fontStyle: 'italic',
  },
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
