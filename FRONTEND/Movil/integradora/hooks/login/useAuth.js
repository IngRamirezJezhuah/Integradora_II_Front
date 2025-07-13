import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

/**
 * Hook simple para manejar la autenticación
 * @returns {Object} - Función de login
 */
const useAuth = () => {
  
  /**
   * Realizar login con credenciales
   * @param {string} correo - Email del usuario
   * @param {string} contraseña - Contraseña del usuario
   * @param {Function} onSuccess - Callback en caso de éxito
   */
  const login = async (correo, contraseña, onSuccess) => {
    try {
      const credentials = { correo, contraseña };

      const response = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const responseData = await response.json();
        
        if (responseData.login === 'successful' && responseData.usuario) {
          // Guardar datos en AsyncStorage
          await AsyncStorage.setItem('userToken', responseData.token);
          await AsyncStorage.setItem('userData', JSON.stringify(responseData.usuario));
          
          Alert.alert('Éxito', 'Inicio de sesión exitoso');
          
          // Ejecutar callback de éxito
          if (onSuccess) {
            onSuccess();
          }
        } else {
          const errorMessage = responseData?.message || 'Credenciales incorrectas';
          Alert.alert('Error', errorMessage);
        }
      } else {
        Alert.alert('Error', 'Error en el servidor. Intenta de nuevo.');
      }
    } catch (error) {
      Alert.alert('Error', 'Algo salió mal. Por favor, intenta de nuevo.');
      console.error('Login error:', error);
    }
  };

  return {
    login
  };
};

export default useAuth;
