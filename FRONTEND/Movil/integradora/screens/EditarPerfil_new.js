import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { InputGroup } from '../components/';
import { useFocusField } from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

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
  
  // Regex para validar contraseña: mínimo 8 caracteres, mayúsculas, minúsculas, números y símbolos
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

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
        console.log(`🔍 Iniciando validación para ${field}:`, value);
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
            const passwordError = await validateCurrentPassword(value);
            isValid = !passwordError;
            message = passwordError || 'Contraseña anterior correcta ✓';
            console.log(`🔐 Old password validation result:`, { isValid, message });
          }
          break;

        case 'newPassword':
          if (value) {
            const passwordError = validatePassword(value);
            isValid = !passwordError;
            message = passwordError || 'Nueva contraseña válida ✓';
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
    
    if (!passwordRegex.test(password)) {
      return 'La contraseña debe tener mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos';
    }
    
    return '';
  };

  const validateCurrentPassword = async (oldPassword) => {
    if (!oldPassword) return '';

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) return 'No se encontró token de autenticación';

      const response = await fetch(`${API_URL}/usuarios/verify-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          usuarioId: currentUserData?._id,
          contraseña: oldPassword 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (!data.valid) {
          return 'La contraseña anterior no es correcta';
        }
      } else {
        return 'Error al verificar la contraseña anterior';
      }
    } catch (error) {
      console.error('Error al verificar contraseña:', error);
      return 'Error al verificar la contraseña anterior';
    }

    return '';
  };

  // Componente para mostrar el estado de validación
  const ValidationIndicator = ({ status, isValidating, field }) => {
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

        // Validar contraseña anterior
        const oldPasswordError = await validateCurrentPassword(formData.oldPassword);
        if (oldPasswordError) {
          errors.oldPassword = oldPasswordError;
        }

        // Validar nueva contraseña
        const newPasswordError = validatePassword(formData.newPassword);
        if (newPasswordError) {
          errors.newPassword = newPasswordError;
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
        Alert.alert('Error del servidor', errorMessage);
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
          field="email" 
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
          field="oldPassword" 
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
        <Text style={styles.helpText}>
          Mínimo 8 caracteres, incluir mayúsculas, minúsculas, números y símbolos
        </Text>
        <ValidationIndicator 
          status={validationStatus.newPassword} 
          isValidating={isValidating.newPassword} 
          field="newPassword" 
        />
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
          field="confirmPassword" 
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
